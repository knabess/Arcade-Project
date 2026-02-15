import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'de' | 'en';

type Translations = {
  nav: {
    home: string;
    shop: string;
    models: string;
    contact: string;
    login: string;
    dashboard: string;
    backend: string;
    wishlist: string;
  };
  hero: {
    cta_consult: string;
    cta_machines: string;
    ticker: string[];
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
  };
  about: {
    badge: string;
    badge_sub: string;
    quote: string;
    title_pre: string;
    title: string;
    desc: string;
    feat1_title: string;
    feat1_text: string;
    feat2_title: string;
    feat2_text: string;
    mainImage: string;
  };
  showcase: {
    badge: string;
    title: string;
    subtitle: string;
    bestseller: string;
    revenue: string;
    play_trailer: string;
  };
  testimonials: {
    title: string;
    items: { name: string; role: string; text: string }[];
  };
  shop: {
    title: string;
    subtitle: string;
    search: string;
    filter_header: string;
    filter_cat: string;
    filter_players: string;
    filter_apply: string;
    sort_label: string;
    sort_new: string;
    sort_popular: string;
    available: string;
    sold_out: string;
    add_list: string;
    saved: string;
    on_request: string;
    roi_est: string;
    all_types: string;
  };
  product: {
    back: string;
    available: string;
    sold_out: string;
    video_btn: string;
    price_request: string;
    vat_shipping: string;
    roi_est: string;
    desc_title: string;
    add_request: string;
    on_wishlist: string;
    note_label: string;
    note_placeholder: string;
    guarantee: string;
    shipping: string;
    service: string;
    specs_title: string;
    dimensions: string;
    weight: string;
    power: string;
    manufacturer: string;
  };
  business: {
    title_prefix: string;
    title_suffix: string;
    subtitle: string;
    card_single_title: string;
    card_single_desc: string;
    card_single_btn: string;
    card_fec_title: string;
    card_fec_desc: string;
    card_fec_btn: string;
    points_single: string[];
    points_fec: string[];
  };
  process: {
    title: string;
    subtitle: string;
    steps: [
      {
        s1_title: string;
        s1_desc: string;
      },
      {
        s2_title: string;
        s2_desc: string;
      },
      {
        s3_title: string;
        s3_desc: string;
      }
    ];
  };
  booking: {
    title: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    type_single: string;
    type_single_desc: string;
    type_fec: string;
    type_fec_desc: string;
    industry_label: string;
    count_label: string;
    tip_start: string;
    tip_upgrade: string;
    tip_pro: string;
    tip_note: string;
    next_date: string;
    date_label: string;
    time_label: string;
    today: string;
    tomorrow: string;
    available_times: string;
    personal_label: string;
    name_label: string;
    email_label: string;
    submit_btn: string;
    summary_title: string;
    project_label: string;
    industry_sum_label: string;
    count_sum_label: string;
    wishlist_label: string;
    date_sum_label: string;
    machines_selected: string;
    free: string;
    next_btn: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    menu_overview: string;
    menu_requests: string;
    menu_settings: string;
    logout: string;
    welcome: string;
    welcome_sub: string;
    card_company: string;
    label_company: string;
    label_email: string;
    card_active: string;
    status_processing: string;
    submitted: string;
    step_info: string;
    wishlist_title: string;
    wishlist_count: string;
    available: string;
    sold_out: string;
    note_label: string;
    note_placeholder: string;
    add_more: string;
    empty_title: string;
    empty_text: string;
    to_catalog: string;
    remove: string;
  };
  auth: {
    login_title: string;
    register_title: string;
    login_desc: string;
    register_desc: string;
    demo_btn: string;
    or_manual: string;
    company_label: string;
    contact_label: string;
    email_label: string;
    password_label: string;
    b2b_note: string;
    b2b_check: string;
    login_btn: string;
    register_btn: string;
    switch_login: string;
    switch_register: string;
  };
  contact: {
    title_lines: string[];
    desc: string;
    services: string;
    resources: string;
    studio: string;
    newsletter: string;
    rights: string;
  }
};

const translations: Record<Language, Translations> = {
  de: {
    nav: {
      home: 'Home',
      shop: 'Maschinen Shop',
      models: 'Geschäftsmodelle',
      contact: 'Kontakt',
      login: 'Login / Registrieren',
      dashboard: 'Mein Account',
      backend: 'Backend Öffnen',
      wishlist: 'Wunschliste'
    },
    hero: {
      cta_consult: 'Kostenloses Erstgespräch',
      cta_machines: 'Zu den Maschinen',
      ticker: [
        "Buche dir jetzt dein kostenloses Erstgespräch",
        "Profitiere jetzt von der hohen Nachfrage",
        "Über 10 Jahre Branchenerfahrung"
      ],
      titleLine1: "MEHR UMSATZ.",
      titleLine2: "WENIG AUFWAND.",
      subtitle: "Verwandle ungenutzte Fläche in pures Geld. Wir bieten hoch-profitable Automatenlösungen für Kioske, Tankstellen, Gastronomie, Freizeitparks und viele mehr."
    },
    about: {
      badge: "K&L Entertainment Systems",
      badge_sub: "Seit 2015",
      quote: "\"Wir bringen das echte Arcade-Feeling zurück. Laut, bunt und profitabel.\"",
      title_pre: "Über Uns",
      title: "Entertainment Next Level.",
      desc: "Bei K&L Entertainment Systems verstehen wir Gaming nicht nur als Zeitvertreib, sondern als Business. Wir sind dein Partner für High-End Arcade-Lösungen – von der einzelnen \"Cash-Cow\" Maschine bis zum kompletten Entertainment-Center.",
      feat1_title: "Premium Hardware",
      feat1_text: "Nur Top-Marken und bewährte Systeme. Keine billigen Kopien, sondern langlebige Assets.",
      feat2_title: "Full Service",
      feat2_text: "Import, Aufbau, Wartung und Ersatzteile. Wir kümmern uns um die Technik, du dich um die Gäste.",
      mainImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
    },
    showcase: {
      badge: "Top Performer",
      title: "Maschinen, die für dich arbeiten",
      subtitle: "Entdecke unsere Umsatz-Champions. Von High-Tech VR bis zu klassischen Redemption Games – gebaut für maximalen ROI.",
      bestseller: "Bestseller",
      revenue: "Ø Umsatz / Monat",
      play_trailer: "Trailer abspielen"
    },
    testimonials: {
      title: "Was unsere Kunden sagen",
      items: [
        {
          name: "Luke A.",
          role: "FEC Besitzer",
          text: "Uns war wichtig, dass jemand versteht, wie unser Standort funktioniert. Die Beratung war ehrlich und realistisch – die Umsetzung entsprechend sauber."
        },
        {
          name: "Mohamed K.",
          role: "Sportsbar",
          text: "Mehr Aufenthaltsdauer, mehr Umsatz. Die Arcade-Maschinen werden von unseren Gästen sehr gut angenommen. Man merkt sofort, dass hier Erfahrung aus dem echten Betrieb dahintersteckt."
        },
        {
          name: "Sandy S.",
          role: "FEC im Freizeitpark",
          text: "Klare Empfehlung für Betreiber. Kein Verkaufsgespräch, sondern echte Beratung. Man merkt, dass hier nicht einfach Maschinen verkauft werden, sondern Konzepte umgesetzt werden."
        }
      ]
    },
    shop: {
      title: 'MASCHINEN',
      subtitle: 'Der Premium-Katalog für Arcade Hardware. Wähle deine Maschinen und fordere ein unverbindliches Angebot an.',
      search: 'Suchen...',
      filter_header: 'Filter',
      filter_cat: 'Kategorie',
      filter_players: 'Spieler',
      filter_apply: 'Filter anwenden',
      sort_label: 'Sortieren:',
      sort_new: 'Neueste',
      sort_popular: 'Beliebteste',
      available: 'Lieferbar',
      sold_out: 'Ausverkauft',
      add_list: 'Auf die Liste',
      saved: 'Gespeichert',
      on_request: 'Preis auf Anfrage',
      roi_est: 'ROI Schätzung',
      all_types: 'Alle Typen'
    },
    product: {
      back: 'Zurück zum Shop',
      available: 'Sofort Lieferbar',
      sold_out: 'Ausverkauft',
      video_btn: 'Video ansehen',
      price_request: 'Preis auf Anfrage',
      vat_shipping: 'zzgl. MwSt. & Versand',
      roi_est: 'ROI Schätzung',
      desc_title: 'Beschreibung',
      add_request: 'Zur Anfrage hinzufügen',
      on_wishlist: 'Auf der Wunschliste',
      note_label: 'Notiz für Anfrage (Optional)',
      note_placeholder: 'z.B. Branding gewünscht...',
      guarantee: '2 Jahre Garantie',
      shipping: 'Weltweiter Versand',
      service: '24h Service',
      specs_title: 'Technische Daten',
      dimensions: 'Maße',
      weight: 'Gewicht',
      power: 'Leistung',
      manufacturer: 'Hersteller'
    },
    business: {
      title_prefix: 'Wähle dein',
      title_suffix: 'Business',
      subtitle: 'Vom einzelnen Automaten bis zum kompletten Entertainment-Imperium.',
      card_single_title: 'Einzelne Maschinen',
      card_single_desc: 'Du hast bereits einen Store, ein Kino oder eine Bowlingbahn und möchtest deinen Umsatz steigern?',
      card_single_btn: 'Maschinen ansehen',
      card_fec_title: 'FEC eröffnen',
      card_fec_desc: 'Du planst ein komplettes Family Entertainment Center oder einen Arcade Park? Wir bauen dein Imperium.',
      card_fec_btn: 'Beratungstermin buchen',
      points_single: ['Hoher ROI auf kleiner Fläche', 'Plug & Play Lösungen', 'Attraktion für Neukunden'],
      points_fec: ['Ganzheitliche Raumplanung', 'Mix aus VR, Redemption & Skill', 'Support von Konzept bis Eröffnung']
    },
    process: {
      title: 'Unser Prozess',
      subtitle: 'Dein Weg zum Arcade-Business in 3 Schritten.',
      steps: [
        {
          s1_title: 'Kennenlernen & Zieldefinition',
          s1_desc: 'Wir verstehen dein Vorhaben, deine Location und dein Ziel – egal ob Kauf, Miete oder Eventeinsatz.'
        },
        {
          s2_title: 'Arcade-Konzept & Maschinenmix',
          s2_desc: 'Auf Basis der Analyse entwickeln wir ein passendes Gaming-Konzept und wählen die richtigen Maschinen aus.'
        },
        {
          s3_title: 'Lieferung, Setup & Service',
          s3_desc: 'Wir liefern, installieren und betreuen die Maschinen – inklusive Technik, Wartung und Ersatzteilen.'
        }
      ]
    },
    booking: {
      title: 'Projekt Starten',
      step1: '1. Wähle dein Vorhaben',
      step2: '2. Details zu deinem Business',
      step3: '3. Wunschtermin für Call',
      step4: '4. Deine Daten',
      type_single: 'Einzelne Maschinen',
      type_single_desc: 'Ideal um bestehende Geschäfte aufzuwerten. Perfekt für Kioske, Shisha-Bars, Kinos oder Wartebereiche.',
      type_fec: 'FEC Eröffnen',
      type_fec_desc: 'Planung eines kompletten Family Entertainment Centers oder einer Spielhalle. Full-Concept Lösung.',
      industry_label: 'In welcher Branche bist du tätig?',
      count_label: 'Geschätzte Anzahl an Maschinen',
      tip_start: 'Start-Paket: Ideal für kleine Flächen wie Kioske oder Wartebereiche.',
      tip_upgrade: 'Upgrade: Perfekt für Bars oder kleine Spiel-Ecken.',
      tip_pro: 'Profi-Level: Erzeuge einen echten Magneten für dein Geschäft.',
      tip_note: '*Du kannst die Anzahl später im Gespräch jederzeit anpassen.',
      next_date: 'Weiter zu Termin',
      date_label: 'Datum',
      time_label: 'Zeit',
      today: 'Heute',
      tomorrow: 'Morgen',
      available_times: 'Verfügbare Zeiten',
      personal_label: 'Deine Daten',
      name_label: 'Name',
      email_label: 'Email',
      submit_btn: 'Termin Bestätigen & Email Senden',
      summary_title: 'Deine Anfrage',
      project_label: 'Projekt',
      industry_sum_label: 'Branche',
      count_sum_label: 'Anzahl Maschinen',
      wishlist_label: 'Wunschliste',
      machines_selected: 'Maschinen ausgewählt',
      date_sum_label: 'Termin',
      free: 'Kostenlos',
      next_btn: 'Weiter'
    },
    dashboard: {
      title: 'Kundenportal',
      subtitle: 'B2B Dashboard',
      menu_overview: 'Übersicht',
      menu_requests: 'Anfragen',
      menu_settings: 'Einstellungen',
      logout: 'Abmelden',
      welcome: 'Hallo',
      welcome_sub: 'Willkommen zurück bei K&L Entertainment Systems.',
      card_company: 'Firmendaten',
      label_company: 'Unternehmen',
      label_email: 'Email Adresse',
      card_active: 'Aktuelle Anfragen',
      status_processing: 'In Bearbeitung',
      submitted: 'Eingereicht',
      step_info: 'Schritt 3/5: Angebotserstellung',
      wishlist_title: 'Gespeicherte Maschinen',
      wishlist_count: 'Maschinen auf der Liste',
      available: 'Verfügbar',
      sold_out: 'Ausverkauft',
      note_label: 'Notiz für Anfrage',
      note_placeholder: 'z.B. Branding gewünscht, Menge: 2...',
      add_more: 'Maschinen hinzufügen',
      empty_title: 'Deine Liste ist leer',
      empty_text: 'Speichere interessante Maschinen für dein Projekt, um sie später schnell wiederzufinden oder direkt anzufragen.',
      to_catalog: 'Zum Katalog',
      remove: 'Entfernen'
    },
    auth: {
      login_title: 'B2B Login',
      register_title: 'Händler Registrierung',
      login_desc: 'Loggen Sie sich in Ihr Firmenkonto ein.',
      register_desc: 'Erstellen Sie ein Geschäftskonto für Zugriff auf Preise und Details.',
      demo_btn: 'Test-Account nutzen (Demo)',
      or_manual: 'Oder manuell',
      company_label: 'Firmenname',
      contact_label: 'Ansprechpartner',
      email_label: 'Email',
      password_label: 'Passwort',
      b2b_note: 'Gewerblicher Hinweis',
      b2b_check: 'Ich bestätige, dass ich als Unternehmer (B2B) handle. Ich bin mir bewusst, dass kein Verkauf an Privatpersonen erfolgt.',
      login_btn: 'Einloggen',
      register_btn: 'Firma Registrieren',
      switch_login: 'Noch keinen Account? Hier registrieren',
      switch_register: 'Bereits registriert? Hier einloggen'
    },
    contact: {
      title_lines: ['K&L', 'Entertainment Systems'],
      desc: 'Wir realisieren Arcade-Träume mit erfahrenen Teams. Erzähl uns von deinem Projekt und wir melden uns innerhalb eines Werktages.',
      services: 'Leistungen',
      resources: 'Ressourcen',
      studio: 'Studio',
      newsletter: 'Newsletter',
      rights: 'Alle Rechte vorbehalten.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      shop: 'Machine Shop',
      models: 'Business Models',
      contact: 'Contact',
      login: 'Login / Register',
      dashboard: 'My Account',
      backend: 'Open Backend',
      wishlist: 'Wishlist'
    },
    hero: {
      cta_consult: 'Free Consultation',
      cta_machines: 'View Machines',
      ticker: [
        "Book your free consultation now",
        "Profit from high customer demand",
        "Over 10 years of industry experience"
      ],
      titleLine1: "MORE PROFIT.",
      titleLine2: "LESS EFFORT.",
      subtitle: "Turn unused space into pure cash. We offer high-profit arcade solutions for kiosks, gas stations, gastronomy, theme parks and many more."
    },
    about: {
      badge: "K&L Entertainment Systems",
      badge_sub: "Since 2015",
      quote: "\"We bring back the real arcade feeling. Loud, colorful and profitable.\"",
      title_pre: "About Us",
      title: "Entertainment Next Level.",
      desc: "At K&L Entertainment Systems, we understand gaming not just as a pastime, but as a business. We are your partner for high-end arcade solutions - from the single \"cash cow\" machine to the complete entertainment center.",
      feat1_title: "Premium Hardware",
      feat1_text: "Only top brands and proven systems. No cheap copies, but long-lasting assets.",
      feat2_title: "Full Service",
      feat2_text: "Import, assembly, maintenance and spare parts. We take care of the tech, you take care of the guests.",
      mainImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
    },
    showcase: {
      badge: "Top Performer",
      title: "Machines that work for you",
      subtitle: "Discover our revenue champions. From high-tech VR to classic redemption games - built for maximum ROI.",
      bestseller: "Bestseller",
      revenue: "Avg. Revenue / Month",
      play_trailer: "Play Trailer"
    },
    testimonials: {
      title: "What our customers say",
      items: [
        {
          name: "Luke A.",
          role: "FEC Owner",
          text: "It was important to us that someone understands how our location works. The advice was honest and realistic - the implementation accordingly clean."
        },
        {
          name: "Mohamed K.",
          role: "Sports Bar",
          text: "More dwell time, more turnover. The arcade machines are very well received by our guests. You can tell immediately that there is experience from real operation behind this."
        },
        {
          name: "Sandy S.",
          role: "FEC in Theme Park",
          text: "Clear recommendation for operators. No sales pitch, but real advice. You realize that machines are not simply sold here, but concepts are implemented."
        }
      ]
    },
    shop: {
      title: 'MACHINE',
      subtitle: 'The premium catalog for arcade hardware. Select your machines and request a non-binding offer.',
      search: 'Search...',
      filter_header: 'Filter',
      filter_cat: 'Category',
      filter_players: 'Players',
      filter_apply: 'Apply Filter',
      sort_label: 'Sort by:',
      sort_new: 'Newest',
      sort_popular: 'Most Popular',
      available: 'In Stock',
      sold_out: 'Sold Out',
      add_list: 'Add to List',
      saved: 'Saved',
      on_request: 'Price on Request',
      roi_est: 'Est. ROI',
      all_types: 'All Types'
    },
    product: {
      back: 'Back to Shop',
      available: 'In Stock',
      sold_out: 'Sold Out',
      video_btn: 'Watch Video',
      price_request: 'Price on Request',
      vat_shipping: 'excl. VAT & Shipping',
      roi_est: 'Est. ROI',
      desc_title: 'Description',
      add_request: 'Add to Request',
      on_wishlist: 'On Wishlist',
      note_label: 'Note for Request (Optional)',
      note_placeholder: 'e.g. Branding requested...',
      guarantee: '2 Years Warranty',
      shipping: 'Worldwide Shipping',
      service: '24h Service',
      specs_title: 'Technical Specifications',
      dimensions: 'Dimensions',
      weight: 'Weight',
      power: 'Power',
      manufacturer: 'Manufacturer'
    },
    business: {
      title_prefix: 'Choose your',
      title_suffix: 'Business',
      subtitle: 'From single machines to a complete entertainment empire.',
      card_single_title: 'Single Machines',
      card_single_desc: 'Already own a store, cinema, or bowling alley and want to increase revenue?',
      card_single_btn: 'View Machines',
      card_fec_title: 'Open an FEC',
      card_fec_desc: 'Planning a complete Family Entertainment Center or Arcade Park? We build your empire.',
      card_fec_btn: 'Book Consultation',
      points_single: ['High ROI on small footprint', 'Plug & Play solutions', 'Attraction for new customers'],
      points_fec: ['Holistic spatial planning', 'Mix of VR, Redemption & Skill', 'Support from concept to launch']
    },
    process: {
      title: 'Our Process',
      subtitle: 'Your path to the arcade business in 3 steps.',
      steps: [
        {
          s1_title: 'Intro & Goal Definition',
          s1_desc: 'We understand your project, location, and goal – whether purchase, rent, or event use.'
        },
        {
          s2_title: 'Arcade Concept & Mix',
          s2_desc: 'Based on analysis, we develop a suitable gaming concept and select the right machines.'
        },
        {
          s3_title: 'Delivery, Setup & Service',
          s3_desc: 'We deliver, install, and maintain the machines – including tech support and spare parts.'
        }
      ]
    },
    booking: {
      title: 'Start Project',
      step1: '1. Select Type',
      step2: '2. Business Details',
      step3: '3. Call Appointment',
      step4: '4. Your Details',
      type_single: 'Single Machines',
      type_single_desc: 'Ideal for upgrading existing shops. Perfect for kiosks, shisha bars, cinemas or waiting areas.',
      type_fec: 'Open FEC',
      type_fec_desc: 'Planning a complete Family Entertainment Center or Arcade. Full-concept solution.',
      industry_label: 'Which industry are you in?',
      count_label: 'Estimated number of machines',
      tip_start: 'Starter Pack: Ideal for small areas like kiosks or waiting areas.',
      tip_upgrade: 'Upgrade: Perfect for bars or small game corners.',
      tip_pro: 'Pro Level: Create a real magnet for your business.',
      tip_note: '*You can adjust the quantity later during the call.',
      next_date: 'Continue to Date',
      date_label: 'Date',
      time_label: 'Time',
      today: 'Today',
      tomorrow: 'Tomorrow',
      available_times: 'Available Times',
      personal_label: 'Your Details',
      name_label: 'Name',
      email_label: 'Email',
      submit_btn: 'Confirm Appointment & Send Email',
      summary_title: 'Your Request',
      project_label: 'Project',
      industry_sum_label: 'Industry',
      count_sum_label: 'Machine Count',
      wishlist_label: 'Wishlist',
      machines_selected: 'machines selected',
      date_sum_label: 'Appointment',
      free: 'Free',
      next_btn: 'Next'
    },
    dashboard: {
      title: 'Customer Portal',
      subtitle: 'B2B Dashboard',
      menu_overview: 'Overview',
      menu_requests: 'Requests',
      menu_settings: 'Settings',
      logout: 'Logout',
      welcome: 'Hello',
      welcome_sub: 'Welcome back to K&L Entertainment Systems.',
      card_company: 'Company Data',
      label_company: 'Company',
      label_email: 'Email Address',
      card_active: 'Active Requests',
      status_processing: 'Processing',
      submitted: 'Submitted',
      step_info: 'Step 3/5: Offer Creation',
      wishlist_title: 'Saved Machines',
      wishlist_count: 'Machines on list',
      available: 'Available',
      sold_out: 'Sold Out',
      note_label: 'Request Note',
      note_placeholder: 'e.g. Branding requested, Qty: 2...',
      add_more: 'Add Machines',
      empty_title: 'Your list is empty',
      empty_text: 'Save interesting machines for your project to find them quickly later or request them directly.',
      to_catalog: 'To Catalog',
      remove: 'Remove'
    },
    auth: {
      login_title: 'B2B Login',
      register_title: 'Dealer Registration',
      login_desc: 'Log in to your company account.',
      register_desc: 'Create a business account for access to prices and details.',
      demo_btn: 'Use Test Account (Demo)',
      or_manual: 'Or manually',
      company_label: 'Company Name',
      contact_label: 'Contact Person',
      email_label: 'Email',
      password_label: 'Password',
      b2b_note: 'Commercial Notice',
      b2b_check: 'I confirm that I am acting as an entrepreneur (B2B). I am aware that no sales to private individuals occur.',
      login_btn: 'Login',
      register_btn: 'Register Company',
      switch_login: 'No account yet? Register here',
      switch_register: 'Already registered? Login here'
    },
    contact: {
      title_lines: ['K&L', 'Entertainment Systems'],
      desc: 'We realize arcade dreams with experienced teams. Tell us about your project and we will get back to you within one business day.',
      services: 'Services',
      resources: 'Resources',
      studio: 'Studio',
      newsletter: 'Newsletter',
      rights: 'All rights reserved.'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
