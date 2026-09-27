import type { StaticImageData } from "next/image";
import seilbaten from "@/assets/gallery/seilbaten.jpg";
import familieferie from "@/assets/gallery/familieferie.jpg";
import fjelltur from "@/assets/gallery/fjelltur.jpg";
import arrkom from "@/assets/gallery/arrkom.jpg";
import grunderjakten from "@/assets/gallery/grunderjakten.jpg";
import pitching from "@/assets/gallery/pitching.jpg";
import cruise from "@/assets/gallery/cruise.jpg";
import gutta from "@/assets/gallery/gutta.jpg";

export const person = {
  firstName: "Fredrik Christopher",
  lastName: "Almnes",
  fullName: "Fredrik Christopher Almnes",
  title: "Masterstudent, Datateknologi NTNU",
  short: "Datateknologistudent ved NTNU i Trondheim",
  location: "Asker",
  email: "fredrik@almnes.no",
  phone: "484 67 792",
  github: "https://github.com/FredAlmnes",
  linkedin: "https://www.linkedin.com/in/fredrik-almnes-a36a60305/",
};

export const stats = [
  { value: "6", label: "pågående roller" },
  { value: "9", label: "erfaringer så langt" },
  { value: "67,5", label: "studiepoeng fullført" },
  { value: "1", label: "prosjekt i drift" },
];

export const nowTicker = [
  "Selger, Elkjøp Nordic",
  "Leder, ITDAGENE",
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
      "5-årig sivilingeniørstudium ved Institutt for datateknologi og informatikk (IDI). For tiden i andre studieår, og tar Moderne maskinlæring i praksis dette semesteret.",
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
    title: "ITDAGENE, Abakus og Kort Forklart",
    description:
      "Leder for ITDAGENE, nestleder i Abakus sin arrangementskomité og medlem av AbaInvest. Medutvikler på læringsplattformen Kort Forklart.",
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
  {
    tag: "Under utvikling",
    title: "NBA value bets med maskinlæring",
    link: "https://nba-ml-betting.vercel.app",
    linkLabel: "nba-ml-betting.vercel.app",
    repo: "https://github.com/FredAlmnes/Nba-ML-betting",
    description:
      "En bot som leter etter value bets i NBA. En kalibrert XGBoost-modell trent på historisk kampstatistikk anslår vinnersjansen, og boten flagger kamper der bookmakerens odds er for høye. Kamper der nøkkelspillere er skadet filtreres bort, innsatsen styres med halv Kelly, og strategien testes mot historiske odds. Kjører foreløpig bare med papirpenger.",
    stack: ["Python", "XGBoost", "scikit-learn", "pandas", "nba_api"],
    cta: "Åpne dashboardet",
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
    role: "Leder, ITDAGENE",
    place: "ITDAGENE, karrieredagene for IT-studenter ved NTNU",
    period: "2026 – nå",
    description:
      "Planlegging og administrering av itDAGENE, herunder budsjettering av aktiviteter, styring av ledergruppen, og nettverkskontakt med partnerbedrifter.",
  },
  {
    category: "Frivillig",
    role: "Medlem, AbaInvest",
    place: "AbaInvest, investeringsgruppen i Abakus",
    period: "2026 – nå",
    description:
      "Diskuterer aksjer og analyserer selskaper sammen med gruppen, og er med på å forvalte en portefølje på rundt 200 000 kr.",
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
        credits: 37.5,
        courses: [
          { code: "IT1901", name: "Informatikk prosjektarbeid I", credits: 7.5 },
          { code: "TDT4120", name: "Algoritmer og datastrukturer", credits: 7.5 },
          { code: "TDT4160", name: "Datamaskiner", credits: 7.5 },
          { code: "TMA4240", name: "Statistikk", credits: 7.5 },
          { code: "TDT4173", name: "Moderne maskinlæring i praksis", credits: 7.5 },
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

// Bildekarusellen over kontaktseksjonen. Nye bilder legges i src/assets/gallery/
// (gjerne maks ca. 1600 px og noen hundre KB) og importeres øverst i filen.
export const gallery: { src: StaticImageData; alt: string; caption: string }[] = [
  {
    src: seilbaten,
    alt: "Silhuett av en person i baugen på en seilbåt som ser ut over havet i solnedgang",
    caption: "Seilbåten",
  },
  {
    src: familieferie,
    alt: "Familien rundt et langbord med pizza på en fortauskafé i en spansk gate",
    caption: "Familien på ferie",
  },
  {
    src: fjelltur,
    alt: "Tre personer i turjakker og solbriller tar selfie på en steinete fjelltopp med utsikt over skog og vann",
    caption: "Fjelltur",
  },
  {
    src: arrkom,
    alt: "Fem personer fra Arrangementskomiteen rundt et bord med mat utenfor et hvitt trehus i kveldssol",
    caption: "Arrkom",
  },
  {
    src: grunderjakten,
    alt: "Fem personer jubler under et neonskilt med teksten Pitchers Corner, en av dem holder pokalen for seieren i pitchekonkurransen",
    caption: "Vant pitchekonkurransen i Gründerjakten",
  },
  {
    src: pitching,
    alt: "En person presenterer en app-idé foran en skjerm med overskriften Appen arrangerer",
    caption: "Pitching i Gründerjakten",
  },
  {
    src: cruise,
    alt: "To personer smiler ved et bord med champagneglass om bord på en båt, med en opplyst by i bakgrunnen",
    caption: "Cruise",
  },
  {
    src: gutta,
    alt: "Fem venner samlet i en sofa på en fest",
    caption: "Gutta",
  },
];
