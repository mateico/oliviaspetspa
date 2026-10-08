import { NextRequest, NextResponse } from "next/server";

const PROTOCOL_VERSION = "2025-06-18";

const SERVICES_DATA = {
  currency: "UYU",
  services: [
    {
      name: "Baño pelo corto",
      pricing: {
        "0-10kg": 800,
        "10-20kg": 1100,
        "20-30kg": 1400,
        "30kg+": 1700,
      },
    },
    {
      name: "Baño razas de pelo largo",
      pricing: {
        "0-10kg": 1100,
        "10-20kg": 1300,
        "20-30kg": 1600,
        "30kg+": 1900,
      },
    },
    {
      name: "Mantenimiento para pelo largo",
      pricing: {
        "0-10kg": 800,
        "10-20kg": 1100,
        "20-30kg": 1400,
        "30kg+": 1700,
      },
      note: "Solo para clientes con mantenimiento mensual",
    },
    {
      name: "Servicio completo de estética",
      pricing: {
        "0-10kg": 1400,
        "10-20kg": 1600,
        "20-30kg": 2100,
        "30kg+": 2700,
      },
    },
    {
      name: "Deslanado",
      pricing: {
        "0-10kg": 1500,
        "10-20kg": 1900,
        "20-30kg": 2200,
        "30kg+": 2700,
      },
    },
  ],
  moreInfo: "https://www.oliviaspetspa.com/services",
};

const TOOLS = [
  {
    name: "get_services",
    description:
      "Get the list of dog grooming services and prices offered by Olivia's Pet Spa, a mobile pet grooming service in Maldonado, Uruguay.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "book_appointment",
    description:
      "Submit a grooming appointment request for a dog at Olivia's Pet Spa. Does not confirm the appointment — a human reviews it and confirms availability afterward.",
    inputSchema: {
      type: "object",
      properties: {
        nombreDueno: { type: "string", description: "Owner's full name" },
        telefono: { type: "string", description: "Owner's phone number" },
        direccion: { type: "string", description: "Pickup/service address" },
        nombreMascota: { type: "string", description: "Dog's name" },
        peso: { type: "string", description: "Dog's weight, e.g. '0-10 kg'" },
        horario: { type: "string", description: "Preferred day/time" },
        servicios: {
          type: "array",
          items: { type: "string" },
          description: "At least one service name from get_services",
        },
        comentarios: {
          type: "string",
          description: "Optional additional comments",
        },
      },
      required: [
        "nombreDueno",
        "telefono",
        "direccion",
        "nombreMascota",
        "peso",
        "horario",
        "servicios",
      ],
    },
  },
];

type JsonRpcMessage = {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: Record<string, unknown>;
};

function result(id: string | number | null | undefined, value: unknown) {
  return NextResponse.json({ jsonrpc: "2.0", id, result: value });
}

function error(
  id: string | number | null | undefined,
  code: number,
  message: string,
) {
  return NextResponse.json(
    { jsonrpc: "2.0", id, error: { code, message } },
    { status: 200 },
  );
}

async function callTool(
  name: string,
  args: Record<string, unknown>,
  origin: string,
) {
  if (name === "get_services") {
    return {
      content: [{ type: "text", text: JSON.stringify(SERVICES_DATA) }],
      structuredContent: SERVICES_DATA,
      isError: false,
    };
  }

  if (name === "book_appointment") {
    try {
      const res = await fetch(`${origin}/api/reserva`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args),
      });
      const body = await res.json();
      return {
        content: [{ type: "text", text: JSON.stringify(body) }],
        isError: !res.ok,
      };
    } catch {
      return {
        content: [{ type: "text", text: "Failed to submit booking request." }],
        isError: true,
      };
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  if (request.headers.get("origin")) {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: { code: -32000, message: "Origin not allowed" },
      },
      { status: 403 },
    );
  }

  let message: JsonRpcMessage;
  try {
    message = await request.json();
  } catch {
    return error(null, -32700, "Parse error");
  }

  const { id, method, params } = message;
  const isNotification = id === undefined;

  if (method === "initialize") {
    return result(id, {
      protocolVersion: PROTOCOL_VERSION,
      capabilities: { tools: { listChanged: false } },
      serverInfo: {
        name: "olivias-pet-spa-mcp",
        title: "Olivia's Pet Spa",
        version: "1.0.0",
      },
    });
  }

  if (method === "notifications/initialized") {
    return new NextResponse(null, { status: 202 });
  }

  if (method === "ping") {
    return result(id, {});
  }

  if (method === "tools/list") {
    return result(id, { tools: TOOLS });
  }

  if (method === "tools/call") {
    const name = params?.name as string | undefined;
    const args = (params?.arguments as Record<string, unknown>) ?? {};
    if (!name) return error(id, -32602, "Missing tool name");

    const origin = new URL(request.url).origin;
    const callResult = await callTool(name, args, origin);
    if (!callResult) return error(id, -32602, `Unknown tool: ${name}`);
    return result(id, callResult);
  }

  if (isNotification) {
    return new NextResponse(null, { status: 202 });
  }

  return error(id, -32601, `Method not found: ${method}`);
}

export async function GET() {
  return new NextResponse(null, { status: 405 });
}
