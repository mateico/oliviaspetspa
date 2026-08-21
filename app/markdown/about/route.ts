const MARKDOWN = `# Sobre nosotros

## No hacemos simplemente estética. Cuidamos salud.

En Olivia's Pet Spa creemos que un perro hermoso es, ante todo, un perro saludable.

## Nuestra historia

Nuestra historia nace de una pasión por los animales y de una profesión dedicada al cuidado. Soy Licenciada en Enfermería, graduada de la Universidad Católica, y encontré en la estética canina la manera de unir dos mundos que amo: la salud y los animales.

Porque para nosotros, no existe estética sin salud.

## Especialistas en recuperación de mantos

No esquilamos por comodidad ni porque sea la opción más rápida. Siempre que el manto pueda recuperarse, nuestro objetivo es conservarlo, porque el pelo de tu mascota no está ahí solamente para verse bonito: es parte de su protección natural frente al frío, el sol, la humedad y el ambiente. Por eso, trabajamos para recuperar, mantener y prevenir.

Cada mascota es única y merece un tratamiento pensado especialmente para ella. Evaluamos su manto, su piel y sus necesidades para ofrecer un servicio individualizado.

## Una peluquería que va hacia vos

Olivia's Pet Spa nació de una pregunta: ¿por qué tiene que ser el dueño quien lleve a su mascota a la peluquería? Así creamos nuestra propia peluquería canina móvil: un espacio profesional, equipado y diseñado para trabajar a domicilio.

Vamos hasta tu puerta para que vos no tengas que trasladarte y, al mismo tiempo, para que tu mascota pueda disfrutar de su servicio sin salir de su entorno habitual. Menos traslados. Menos esperas. Más comodidad. Más atención individual.

## Lo que nos mueve

- **Salud primero** — Evaluamos el manto, la piel y las necesidades de cada mascota antes de decidir cualquier tratamiento.
- **Recuperación de mantos** — No esquilamos por comodidad. Priorizamos recuperar, mantener y prevenir, porque el pelo protege del frío, el sol y la humedad.
- **Vamos hasta tu puerta** — Una peluquería canina móvil, equipada y profesional, para que tu mascota disfrute sin salir de su entorno.

[Agendar ahora](/contact)
`;

export function GET() {
  return new Response(MARKDOWN, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
