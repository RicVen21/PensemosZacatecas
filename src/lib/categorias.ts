export interface Categoria {
  num: string;
  slug: string;
  nombre: string;
  corta: string;
  larga: string;
  ph: [string, string, string];
}

export const CATEGORIAS: Categoria[] = [
  {
    num: "01",
    slug: "zacatecas-seguro",
    nombre: "Zacatecas Seguro",
    corta: "Seguridad pública, justicia y la relación entre ciudadanos y autoridad.",
    larga:
      "Hablemos de seguridad pública, justicia y la relación entre ciudadanos y autoridad — desde la vigilancia en tu colonia hasta cómo se procesa una denuncia.",
    ph: [
      "En mi colonia, la falta de alumbrado hace que la gente evite salir de noche...",
      "Creo que no hay suficiente coordinación entre el municipio y la policía estatal para dar seguimiento...",
      "Un esquema de comités vecinales que reporten directo a un responsable de zona...",
    ],
  },
  {
    num: "02",
    slug: "zacatecas-que-crece",
    nombre: "Zacatecas que Crece",
    corta: "Negocios, empleo y economía en cada región del estado.",
    larga:
      "Hablemos de negocios, empleo y economía — desde cómo se abre y financia un negocio hasta qué necesita cada región para generar más oportunidades de trabajo.",
    ph: [
      "Conozco a varios jóvenes con ideas de negocio que no arrancan porque no encuentran cómo financiarlas...",
      "Creo que los trámites y requisitos para un crédito son muy complicados para alguien que empieza...",
      "Un fondo estatal de arranque con acompañamiento, no solo dinero...",
    ],
  },
  {
    num: "03",
    slug: "zacatecas-de-primera",
    nombre: "Zacatecas de Primera",
    corta: "Educación y salud: escuelas, hospitales y desarrollo de niños y jóvenes.",
    larga:
      "Hablemos de educación y salud — desde cómo funcionan las escuelas y los hospitales hasta qué necesitan niños y jóvenes para desarrollarse plenamente.",
    ph: [
      "La clínica de mi comunidad casi nunca tiene médico especialista...",
      "Creo que no hay incentivos suficientes para que los médicos se queden en zonas rurales...",
      "Un esquema de rotación con apoyo de vivienda o transporte para médicos en comunidades alejadas...",
    ],
  },
  {
    num: "04",
    slug: "zacatecas-sustentable",
    nombre: "Zacatecas Sustentable",
    corta: "Agua, campo y medio ambiente: abasto, producción y recursos naturales.",
    larga:
      "Hablemos de agua, campo y medio ambiente — desde el abasto de agua en tu comunidad hasta la modernización de la actividad agropecuaria y el cuidado de los recursos naturales.",
    ph: [
      "En temporada de secas, el agua no llega a mi comunidad varios días seguidos...",
      "Creo que la red de distribución es muy vieja y no se le da mantenimiento...",
      "Un programa de captación de agua de lluvia a nivel comunitario...",
    ],
  },
  {
    num: "05",
    slug: "zacatecas-sin-fronteras",
    nombre: "Zacatecas sin Fronteras",
    corta: "Cómo se conecta el estado por dentro y cómo se une con los zacatecanos que viven fuera.",
    larga:
      "Hablemos de dos cosas: cómo se conecta el estado internamente — caminos, transporte, movilidad rural, conectividad digital — y cómo se fortalece el vínculo con los zacatecanos que viven fuera del país — remesas, inversión y participación en sus comunidades de origen.",
    ph: [
      "El camino a mi rancho se pone intransitable en lluvias, y batallo para sacar mi cosecha...",
      "Creo que las zonas rurales no son prioridad en los presupuestos de infraestructura...",
      "Un programa de mantenimiento de caminos rurales con participación de las propias comunidades...",
    ],
  },
  {
    num: "06",
    slug: "zacatecas-rinde-cuentas",
    nombre: "Zacatecas que Rinde Cuentas",
    corta: "El uso del dinero público: cómo se gasta, se transparenta y se explica.",
    larga:
      "Hablemos del uso del dinero público — cómo se gasta, cómo se transparenta y cómo el gobierno explica sus decisiones a los ciudadanos.",
    ph: [
      "Nunca supe en qué se usó el presupuesto de la obra que hicieron en mi calle...",
      "Creo que no hay una forma sencilla para que un ciudadano común dé seguimiento a una obra pública...",
      "Una plataforma donde pueda ver el avance y el gasto de cualquier obra en mi municipio...",
    ],
  },
  {
    num: "07",
    slug: "zacatecas-del-futuro",
    nombre: "Zacatecas del Futuro",
    corta: "Innovación, nuevas industrias y las ideas que preparan al estado para lo que viene.",
    larga:
      "Hablemos de innovación y las ideas que preparan a Zacatecas para lo que viene — tecnología, nuevas industrias, inteligencia artificial, energías limpias, y todo lo que el estado todavía no tiene pero va a necesitar.",
    ph: [
      "Veo que otros estados ya están usando tecnología que aquí ni se conoce...",
      "Creo que Zacatecas no tiene un espacio claro para probar ideas nuevas antes de invertir en grande...",
      "Un laboratorio de innovación estatal donde se puedan pilotear ideas antes de escalarlas...",
    ],
  },
  {
    num: "08",
    slug: "gobierno-moderno",
    nombre: "Gobierno Moderno",
    corta: "Trámites y servicios: cómo se simplifican, se digitalizan y se agilizan.",
    larga:
      "Hablemos de trámites y servicios de gobierno — cómo se simplifican, se digitalizan y se vuelven más rápidos para quien los necesita.",
    ph: [
      "Para sacar una licencia tuve que ir tres veces a la misma oficina...",
      "Creo que muchos trámites todavía dependen de papel y firmas físicas que podrían digitalizarse...",
      "Que ese trámite se pueda hacer completo desde una app o página, sin tener que ir en persona...",
    ],
  },
];

export function getCategoria(slug: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.slug === slug);
}

export const MUNICIPIOS = [
  "Apozol", "Apulco", "Atolinga", "Benito Juárez", "Calera",
  "Cañitas de Felipe Pescador", "Concepción del Oro", "Cuauhtémoc", "Chalchihuites",
  "Fresnillo", "Trinidad García de la Cadena", "Genaro Codina", "General Enrique Estrada",
  "General Francisco R. Murguía", "El Plateado de Joaquín Amaro", "General Pánfilo Natera",
  "Guadalupe", "Huanusco", "Jalpa", "Jerez", "Jiménez del Teul", "Juan Aldama", "Juchipila",
  "Loreto", "Luis Moya", "Mazapil", "Melchor Ocampo", "Mezquital del Oro", "Miguel Auza",
  "Momax", "Monte Escobedo", "Morelos", "Moyahua de Estrada", "Nochistlán de Mejía",
  "Noria de Ángeles", "Ojocaliente", "Pánuco", "Pinos", "Río Grande", "Sain Alto",
  "El Salvador", "Sombrerete", "Susticacán", "Tabasco", "Tepechitlán", "Tepetongo",
  "Teúl de González Ortega", "Tlaltenango de Sánchez Román", "Valparaíso", "Vetagrande",
  "Villa de Cos", "Villa García", "Villa González Ortega", "Villa Hidalgo", "Villanueva",
  "Zacatecas", "Trancoso", "Santa María de la Paz",
];
