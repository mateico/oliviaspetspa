"use client";

import { useEffect } from "react";

const GET_SERVICES_TOOL = {
  name: "get_services",
  description:
    "Get the list of dog grooming services and prices offered by Olivia's Pet Spa, a mobile pet grooming service in Maldonado, Uruguay.",
  inputSchema: { type: "object", properties: {} },
  execute: async () => ({
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
  }),
};

const BOOK_APPOINTMENT_TOOL = {
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
  execute: async (input: Record<string, unknown>) => {
    const res = await fetch("/api/reserva", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return res.json();
  },
};

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<unknown>;
}

interface ModelContextApi {
  registerTool?: (tool: WebMcpTool) => unknown;
  provideContext?: (config: { tools: WebMcpTool[] }) => unknown;
}

declare global {
  interface Navigator {
    modelContext?: ModelContextApi;
  }
  interface Document {
    modelContext?: ModelContextApi;
  }
}

const TOOLS: WebMcpTool[] = [GET_SERVICES_TOOL, BOOK_APPOINTMENT_TOOL];

export default function WebMcpTools() {
  useEffect(() => {
    // The WebMCP API is an active draft; different sources describe different
    // shapes (navigator vs document, registerTool vs provideContext). Try each
    // known variant — this is a no-op if none of them exist.
    const modelContext = navigator.modelContext ?? document.modelContext;
    if (!modelContext) return;

    if (modelContext.registerTool) {
      TOOLS.forEach((tool) => modelContext.registerTool!(tool));
    } else if (modelContext.provideContext) {
      modelContext.provideContext({ tools: TOOLS });
    }
  }, []);

  return null;
}
