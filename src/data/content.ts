export const person = {
  firstName: "Fredrik",
  lastName: "Almnes",
  fullName: "Fredrik Christopher Almnes",
  title: "Masterstudent, Datateknologi NTNU",
  short: "Datateknologistudent ved NTNU i Trondheim",
  location: "Asker",
  email: "fredrik@almnes.no",
  phone: "484 67 792",
};

export const stats = [
  { value: "4", label: "pågående roller" },
  { value: "7", label: "erfaringer så langt" },
  { value: "67,5", label: "studiepoeng fullført" },
  { value: "1", label: "prosjekt i drift" },
];

export const nowTicker = [
  "Selger, Elkjøp Nordic",
  "Nestleder, Arrangementskomiteen Abakus",
  "Medutvikler, Kort Forklart",
  "Prosjektleder, hjelpesendinger Bulgaria",
  "Masterstudent, NTNU",
];

export const nowCards = [
  {
    index: "01",
    eyebrow: "Studium",
    title: "Datateknologi, NTNU",
    description:
      "5-årig sivilingeniørstudium ved Institutt for datateknologi og informatikk (IDI). For tiden i andre studieår.",
    since: "siden aug 2025",
  },
  {
    index: "02",
    eyebrow: "Jobb ved siden av",
    title: "Selger og studass",
    description:
      "Selger hos Elkjøp Nordic, og studentassistent i øvingsgrupper for Informasjonsteknologi, grunnkurs (ITGK) ved IDI.",
    since: "siden aug 2024",
  },
  {
    index: "03",
    eyebrow: "Verv og sideprosjekt",
    title: "Arrangementskomiteen og Kort Forklart",
    description:
      "Nestleder i Abakus sin arrangementskomité, og medutvikler på læringsplattformen Kort Forklart.",
    since: "løpende",
  },
];

export const projects = [
  {
    tag: "I drift",
    title: "Kort Forklart",
    link: "https://kort-forklart.no",
    linkLabel: "kort-forklart.no",
    description:
      "Webapp for å lære fag ved NTNU raskere. Jeg er medutvikler med ansvar for frontend-arbeid og produktideer, bygget sammen med resten av teamet.",
    stack: ["Next.js", "React", "TypeScript"],
    cta: "Åpne appen",
  },
];

export type ExperienceCategory = "Betalt" | "Frivillig" | "Utdanning";

export const experience: {
  category: ExperienceCategory;
  role: string;
  place: string;
  period: string;
  description: string;
}[] = [
  {
    category: "Betalt",
    role: "Selger",
    place: "Elkjøp Nordic AS",
    period: "aug 2024 – nå",
    description:
      "Kunderådgivning og salg av elektronikk i en travel butikk, med fokus på service og produktkunnskap.",
  },
  {
    category: "Betalt",
    role: "Studentassistent (studass), ITGK",
    place: "NTNU, Institutt for datateknologi og informatikk (IDI)",
    period: "aug 2026 – nå",
    description:
      "Underviser og veileder studenter i øvingstimer for Informasjonsteknologi, grunnkurs (TDT4109).",
  },
  {
    category: "Betalt",
    role: "Salgsmedarbeider",
    place: "Cubus",
    period: "apr 2023 – feb 2024",
    description: "Kundebehandling, kassaarbeid og varepåfylling i klesbutikk.",
  },
  {
    category: "Betalt",
    role: "Anleggsgartner (sommerjobb)",
    place: "Agaia",
    period: "sommer 2023",
    description: "Praktisk utearbeid med anlegg og vedlikehold av grøntområder.",
  },
  {
    category: "Frivillig",
    role: "Nestleder / fungerende prosjektleder",
    place: "Arrangementskomiteen, Abakus (linjeforening ved IDI)",
    period: "nå",
    description:
      "Planlegger og leder gjennomføring av linjeforeningens arrangementer, blant annet gallaer og turer. Ansvar for budsjett, logistikk og koordinering av frivillige.",
  },
  {
    category: "Frivillig",
    role: "Prosjektleder, hjelpesendinger til Bulgaria",
    place: "Frivillig organisasjon",
    period: "2 gjennomførte turer",
    description:
      "Planla og ledet to hjelpesendingsturer som gruppeleder, med ansvar for logistikk og oppfølging av deltakere på stedet.",
  },
  {
    category: "Utdanning",
    role: "Sivilingeniørstudium, Datateknologi",
    place: "NTNU, Institutt for datateknologi og informatikk (IDI)",
    period: "2025 – 2030 (forventet)",
    description: "5-årig integrert masterstudium, for tiden 2. år.",
  },
  {
    category: "Utdanning",
    role: "Realfaglig studiespesialisering",
    place: "Asker videregående skole",
    period: "",
    description: "",
  },
];

export const studyPlan = [
  {
    year: "1. år",
    period: "2025–2026",
    status: "Fullført",
    semesters: [
      {
        term: "Høst 2025",
        credits: 30,
        courses: [
          { code: "TDT4109", name: "Informasjonsteknologi, grunnkurs", credits: 7.5 },
          { code: "TMA4400", name: "Matematikk 1: Kalkulus og lineær algebra", credits: 7.5 },
          { code: "TMA4412", name: "Matematikk 2C: Diskret matematikk", credits: 7.5 },
          { code: "EXPH0300", name: "Examen philosophicum", credits: 7.5 },
        ],
      },
      {
        term: "Vår 2026",
        credits: 37.5,
        courses: [
          { code: "TDT4100", name: "Objektorientert programmering", credits: 7.5 },
          { code: "TDT4180", name: "Menneske–maskin-interaksjon", credits: 7.5 },
          { code: "TMA4422", name: "Matematikk 3C: Lineær algebra og differensialligninger", credits: 7.5 },
          { code: "TTT4203", name: "Innføring i analog og digital elektronikk", credits: 7.5 },
          { code: "TFY4125", name: "Fysikk", credits: 7.5 },
        ],
      },
    ],
  },
  {
    year: "2. år",
    period: "2026–2027",
    status: "Pågår",
    semesters: [
      {
        term: "Høst 2026",
        credits: 30,
        courses: [
          { code: "IT1901", name: "Informatikk prosjektarbeid I", credits: 7.5 },
          { code: "TDT4120", name: "Algoritmer og datastrukturer", credits: 7.5 },
          { code: "TDT4160", name: "Datamaskiner", credits: 7.5 },
          { code: "TMA4240", name: "Statistikk", credits: 7.5 },
        ],
      },
      {
        term: "Vår 2027",
        credits: 30,
        courses: [
          { code: "TDT4140", name: "Programvareutvikling", credits: 7.5 },
          { code: "TDT4145", name: "Datamodellering og databasesystemer", credits: 7.5 },
          { code: "TDT4186", name: "Operativsystemer", credits: 7.5 },
          { code: "TTM4100", name: "Kommunikasjon – tjenester og nett", credits: 7.5 },
        ],
      },
    ],
  },
];

export const skillGroups = [
  {
    title: "Programmering",
    items: ["Python", "Java", "JavaScript", "TypeScript"],
  },
  {
    title: "Webutvikling",
    items: ["React", "Next.js"],
  },
  {
    title: "AI-verktøy",
    items: ["Claude Code", "ChatGPT", "Gemini", "Warp"],
  },
  {
    title: "Språk",
    items: ["Norsk — morsmål", "Engelsk — flytende"],
  },
];

export const profile =
  "Datateknologistudent (2. år av 5-årig integrert master) ved NTNU med bred teknisk kompetanse innen programmering og webutvikling, kombinert med solid erfaring fra prosjektledelse og verv. Jeg søker sommerjobb 2027 innen teknologi, konsulentvirksomhet eller økonomi, og trives i roller som kombinerer faglig problemløsning med struktur og samarbeid.";
