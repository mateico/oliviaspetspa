const MARKDOWN = `# Servicios y precios

Precios claros, sin sorpresas. El traslado siempre va incluido dentro de la ciudad. Los precios dependen del tamaño y tipo de manto de la mascota.

## Baño pelo corto

Servicio básico para perros de pelo corto.

Incluye: Baño, Corte de uñas, Limpieza de oídos, Corte higiénico, Perfume canino.

| Peso | Precio |
|---|---|
| 0–10 kg | $800 |
| 10–20 kg | $1,100 |
| 20–30 kg | $1,400 |
| 30+ kg | $1,700 |

## Baño razas de pelo largo

Servicio especializado para razas de pelo largo.

Incluye: Baño, Corte de uñas, Limpieza de oídos, Corte higiénico, Perfume canino.

| Peso | Precio |
|---|---|
| 0–10 kg | $1,100 |
| 10–20 kg | $1,300 |
| 20–30 kg | $1,600 |
| 30+ kg | $1,900 |

## Mantenimiento para pelo largo

Exclusivo para clientes con mantenimiento mensual.

Incluye: Baño, Cepillado, Corte higiénico, Corte de uñas, Limpieza de oídos, Perfume.

| Peso | Precio |
|---|---|
| 0–10 kg | $800 |
| 10–20 kg | $1,100 |
| 20–30 kg | $1,400 |
| 30+ kg | $1,700 |

> Importante: disponible para clientes que realizan mantenimiento al menos una vez por mes.

## Servicio completo de estética

Servicio premium con corte personalizado.

Incluye: Baño, Corte de uñas, Limpieza de oídos, Corte higiénico, Perfume, Corte a elección (largo, pulido o carita).

| Peso | Precio |
|---|---|
| 0–10 kg | $1,400 |
| 10–20 kg | $1,600 |
| 20–30 kg | $2,100 |
| 30+ kg | $2,700 |

> Importante: el pelaje debe estar en buen estado y correctamente mantenido para cortes largos.

## Deslanado

Extracción profunda de pelo muerto.

Incluye: Extracción de pelo muerto, Baño, Corte higiénico, Corte de uñas, Limpieza de oídos, Perfume.

| Peso | Precio |
|---|---|
| 0–10 kg | $1,500 |
| 10–20 kg | $1,900 |
| 20–30 kg | $2,200 |
| 30+ kg | $2,700 |

## Servicios adicionales

Agrégalos a cualquier servicio principal. Los precios pueden variar según el estado del pelaje y el comportamiento de la mascota; el valor final se confirma antes de empezar.

| Adicional | Precio |
|---|---|
| Antipulgas | +$200 |
| Shampoo hipoalergénico | +$200 |
| Shampoo para realzar blancos | +$200 |
| Tratamiento nutritivo de manto | +$250 |
| Enredos severos | +$300 a $500 |
| Perros muy reactivos | +$300 |
| Vaciado de glándulas anales | +$400 |

## Promociones

### Día de Spa por Barrio

Coordina con tus vecinos y ahorra.

- 2 perros el mismo día → 10% OFF
- 3 o más perros el mismo día → 20% OFF
- Válido para mascotas del mismo barrio y horario
- Coordina con una semana de anticipación

## Importante

Las reservas se coordinan con al menos una semana de anticipación para asegurar disponibilidad.

[Agendar ahora](/contact)
`;

export function GET() {
  return new Response(MARKDOWN, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
