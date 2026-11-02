import { useParams } from "@tanstack/react-router";

export type Lang = "en" | "fr";

// English lives at the bare URL (/slate); French under the /fr prefix (/fr/slate).
export function langFromParam(locale: string | undefined): Lang {
  return locale === "fr" ? "fr" : "en";
}

export function localeParam(lang: Lang): string | undefined {
  return lang === "fr" ? "fr" : undefined;
}

export function useLang(): Lang {
  const params = useParams({ strict: false }) as { locale?: string };
  return langFromParam(params.locale);
}

export function useT() {
  return dict[useLang()];
}

// Remembered by the language redirect edge function, so an explicit choice wins
// over the browser's language on later visits.
export const LANG_COOKIE = "lang";

export function rememberLang(lang: Lang) {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
}

const SITE_URL = "https://maimars.com";

// hreflang links so search engines pair the English and French versions of a page.
export function alternateLinks(path: string) {
  const suffix = path === "/" ? "" : path;
  return [
    { rel: "alternate", hrefLang: "en", href: `${SITE_URL}${path}` },
    { rel: "alternate", hrefLang: "fr", href: `${SITE_URL}/fr${suffix}` },
    { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}${path}` },
  ];
}

const en = {
  langName: "English",
  switchTo: "FR",
  switchLabel: "Voir le site en français",
  nav: { home: "Home", slate: "Slate", about: "About", contact: "Contact" },
  footer: { tagline: "Montréal, Québec · Auteur cinema, African & diasporic roots" },
  root: {
    title: "Les Productions du Mai Mars",
    description:
      "Montreal film production company — auteur cinema with African and diasporic roots.",
    notFoundTitle: "Page not found",
    notFoundBody: "The page you're looking for doesn't exist or has been moved.",
    goHome: "Go home",
    errorTitle: "This page didn't load",
    errorBody: "Something went wrong on our end. You can try refreshing or head back home.",
    tryAgain: "Try again",
  },
  home: {
    title: "Les Productions du Mai Mars — Auteur Cinema from Montréal",
    description:
      "Montreal production company crafting independent auteur cinema with African and diasporic roots, through international co-productions.",
    ogDescription:
      "Independent auteur cinema with African and diasporic roots, produced from Montréal.",
    regions: "North America · Africa",
    viewSlate: "View the slate",
    show: (title: string) => `Show ${title}`,
    statement:
      "We produce auteur cinema rooted in Africa and its diasporas — stories made across borders, for the world's screens.",
    aboutLink: "About the company →",
  },
  slate: {
    title: "Slate — Muntu, Inkoni, Scène de Rêve | Mai Mars",
    description:
      "Current slate of Les Productions du Mai Mars: Muntu, Inkoni and Scène de Rêve — loglines, status and trailers.",
    ogTitle: "The Slate — Les Productions du Mai Mars",
    ogDescription: "Muntu, Inkoni and Scène de Rêve: our current feature films.",
    eyebrow: "Current slate",
    heading: "Films",
    trailerSoon: "Trailer coming soon",
    watchTrailer: "Watch the trailer",
    trailerTitle: (title: string) => `${title} trailer`,
  },
  about: {
    title: "About — Les Productions du Mai Mars",
    description:
      "International co-productions between Canada, the Global South and Africa. Meet the producers of Les Productions du Mai Mars.",
    ogTitle: "About Les Productions du Mai Mars",
    ogDescription: "Co-producing auteur cinema between Canada, the Global South and Africa.",
    heroAlt: "Festival presentation at Vues d'Afrique, Montréal",
    eyebrow: "About us",
    heading: "Cinema made between worlds.",
    intro:
      "Les Productions du Mai Mars is an independent production company based in Montréal, dedicated to auteur cinema with African and diasporic roots.",
    mission:
      "We build international co-productions that connect Canada, the Global South and the African continent — pairing bold directorial voices with the financing, structure and festival reach their films deserve.",
    pillars: [
      {
        t: "Canada",
        d: "Montréal-based, eligible for Telefilm, SODEC and Canadian tax credits, with treaty access across 50+ countries.",
      },
      {
        t: "Africa",
        d: "Long-standing creative partnerships with producers and crews in Central, West and Southern Africa.",
      },
      {
        t: "Global South",
        d: "South–South collaboration that keeps creative authorship with the communities whose stories we tell.",
      },
    ],
    festivalEyebrow: "On the festival circuit",
    festivalAlt: "The team at a festival screening",
    festivalText:
      "Our films travel — from Montréal screens to festivals across Africa, Europe and the Americas.",
    producersEyebrow: "The producers",
    producers: [
      {
        name: "Yvette Umukundwa",
        role: "Founder & Producer",
        bio: 'An independent producer of Rwandan origin based in Montreal, specializing in fiction and documentary. Passionate about African and diasporic narratives, her work highlights the richness of diverse cultures and human experiences. Dedicated to building intercontinental bridges, she actively focuses on international co-production and distribution opportunities between Canada, the Global South, and Africa. She is an alumna of Orizon 9\'s "Projections!" program.',
      },
      {
        name: "Richard Mugwaneza",
        role: "Co-Founder & Director",
        bio: 'An award-winning Rwandan filmmaker based in Montreal with over 15 years of experience crafting powerful independent cinema. His work blends poetic visual imagery with raw emotional depth to uncover invisible inner worlds. An alumnus of elite global incubators including Berlinale Talents, L’INIS, Durban Talents, and the Maisha Screenwriting Labs, Richard was mentored by Oscar-nominated director Lee Isaac Chung. He is a laureate of the prestigious "Fonds Jeune Création Francophone."',
      },
    ],
  },
  contact: {
    title: "Contact — Les Productions du Mai Mars",
    description:
      "Get in touch with Les Productions du Mai Mars about co-productions, festival programming, financing or press.",
    eyebrow: "Contact",
    heading: "Let's talk cinema.",
    intro:
      "For co-production, festival programming, financing or press enquiries, write to us and we'll get back to you.",
    name: "Name",
    email: "Email",
    organization: "Organization (optional)",
    message: "Message",
    send: "Send message",
    sending: "Sending…",
    sent: "Thank you — your message has been sent. We'll be in touch soon.",
    sendAnother: "Send another message",
    failed: "Your message couldn't be sent. Please try again, or email us directly at",
    orEmail: "Or email us directly",
    subject: "New message from the Mai Mars website",
  },
};

const fr: typeof en = {
  langName: "Français",
  switchTo: "EN",
  switchLabel: "View the site in English",
  nav: { home: "Accueil", slate: "Projets", about: "À propos", contact: "Contact" },
  footer: { tagline: "Montréal, Québec · Cinéma d'auteur aux racines africaines et diasporiques" },
  root: {
    title: "Les Productions du Mai Mars",
    description:
      "Maison de production montréalaise — cinéma d'auteur aux racines africaines et diasporiques.",
    notFoundTitle: "Page introuvable",
    notFoundBody: "La page que vous cherchez n'existe pas ou a été déplacée.",
    goHome: "Retour à l'accueil",
    errorTitle: "Cette page n'a pas pu se charger",
    errorBody:
      "Une erreur s'est produite de notre côté. Essayez d'actualiser la page ou revenez à l'accueil.",
    tryAgain: "Réessayer",
  },
  home: {
    title: "Les Productions du Mai Mars — Cinéma d'auteur de Montréal",
    description:
      "Maison de production montréalaise qui crée un cinéma d'auteur indépendant aux racines africaines et diasporiques, par la coproduction internationale.",
    ogDescription:
      "Un cinéma d'auteur indépendant aux racines africaines et diasporiques, produit à Montréal.",
    regions: "Amérique du Nord · Afrique",
    viewSlate: "Voir les projets",
    show: (title: string) => `Afficher ${title}`,
    statement:
      "Nous produisons un cinéma d'auteur ancré en Afrique et dans ses diasporas — des histoires tissées par-delà les frontières, pour les écrans du monde entier.",
    aboutLink: "Découvrir la maison de production →",
  },
  slate: {
    title: "Projets — Muntu, Inkoni, Scène de Rêve | Mai Mars",
    description:
      "Projets en cours des Productions du Mai Mars : Muntu, Inkoni et Scène de Rêve — synopsis, étapes de production et bandes-annonces.",
    ogTitle: "Les projets — Les Productions du Mai Mars",
    ogDescription: "Muntu, Inkoni et Scène de Rêve : nos films en cours.",
    eyebrow: "Projets en cours",
    heading: "Films",
    trailerSoon: "Bande-annonce à venir",
    watchTrailer: "Voir la bande-annonce",
    trailerTitle: (title: string) => `Bande-annonce de ${title}`,
  },
  about: {
    title: "À propos — Les Productions du Mai Mars",
    description:
      "Coproductions internationales entre le Canada, le Sud global et l'Afrique. Découvrez l'équipe des Productions du Mai Mars.",
    ogTitle: "À propos des Productions du Mai Mars",
    ogDescription: "Coproduire un cinéma d'auteur entre le Canada, le Sud global et l'Afrique.",
    heroAlt: "Présentation en festival aux Vues d'Afrique, Montréal",
    eyebrow: "À propos",
    heading: "Un cinéma né entre les mondes.",
    intro:
      "Les Productions du Mai Mars est une maison de production indépendante établie à Montréal, consacrée au cinéma d'auteur aux racines africaines et diasporiques.",
    mission:
      "Nous montons des coproductions internationales qui relient le Canada, le Sud global et le continent africain — en donnant à des voix de cinéastes audacieuses le financement, la structure et le rayonnement en festival que leurs films méritent.",
    pillars: [
      {
        t: "Canada",
        d: "Établie à Montréal, admissible au financement de Téléfilm Canada et de la SODEC ainsi qu'aux crédits d'impôt canadiens, avec accès aux traités de coproduction dans plus de 50 pays.",
      },
      {
        t: "Afrique",
        d: "Des partenariats créatifs de longue date avec des producteurs et des équipes en Afrique centrale, de l'Ouest et australe.",
      },
      {
        t: "Sud global",
        d: "Une collaboration Sud-Sud qui laisse l'autorité créative aux communautés dont nous racontons les histoires.",
      },
    ],
    festivalEyebrow: "Sur le circuit des festivals",
    festivalAlt: "L'équipe lors d'une projection en festival",
    festivalText:
      "Nos films voyagent — des écrans de Montréal aux festivals d'Afrique, d'Europe et des Amériques.",
    producersEyebrow: "L'équipe",
    producers: [
      {
        name: "Yvette Umukundwa",
        role: "Fondatrice et productrice",
        bio: "Productrice indépendante d'origine rwandaise établie à Montréal, elle se spécialise en fiction et en documentaire. Passionnée par les récits africains et diasporiques, elle met en lumière, à travers son travail, la richesse des cultures et des expériences humaines. Résolue à bâtir des ponts entre les continents, elle se consacre activement aux occasions de coproduction et de distribution internationales entre le Canada, le Sud global et l'Afrique. Elle est issue du programme « Projections! » d'Orizon 9.",
      },
      {
        name: "Richard Mugwaneza",
        role: "Cofondateur et réalisateur",
        bio: "Cinéaste rwandais primé établi à Montréal, il cumule plus de 15 ans d'expérience dans la création d'un cinéma indépendant puissant. Son travail allie une imagerie visuelle poétique à une profondeur émotionnelle brute pour révéler des mondes intérieurs invisibles. Issu de prestigieux incubateurs internationaux, dont Berlinale Talents, L’INIS, Durban Talents et les Maisha Screenwriting Labs, Richard a été mentoré par le réalisateur Lee Isaac Chung, nommé aux Oscars. Il est lauréat du prestigieux « Fonds Jeune Création Francophone ».",
      },
    ],
  },
  contact: {
    title: "Contact — Les Productions du Mai Mars",
    description:
      "Joignez Les Productions du Mai Mars pour une coproduction, une programmation en festival, du financement ou une demande de presse.",
    eyebrow: "Contact",
    heading: "Parlons cinéma.",
    intro:
      "Pour une coproduction, une programmation en festival, du financement ou une demande de presse, écrivez-nous et nous vous répondrons rapidement.",
    name: "Nom",
    email: "Courriel",
    organization: "Organisation (facultatif)",
    message: "Message",
    send: "Envoyer le message",
    sending: "Envoi en cours…",
    sent: "Merci — votre message a bien été envoyé. Nous vous répondrons sous peu.",
    sendAnother: "Envoyer un autre message",
    failed: "Votre message n'a pas pu être envoyé. Veuillez réessayer ou nous écrire directement à",
    orEmail: "Ou écrivez-nous directement",
    subject: "Nouveau message du site Mai Mars",
  },
};

export const dict = { en, fr };

export const CONTACT_EMAIL = "production.maimars@gmail.com";
