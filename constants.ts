

import { Project, Service, Machine } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Aura Brand Identity',
    category: 'Branding',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    year: '2024'
  },
  {
    id: '2',
    title: 'Neon Flux Interface',
    category: 'UI/UX Design',
    imageUrl: 'https://picsum.photos/800/800?random=2',
    year: '2023'
  },
  {
    id: '3',
    title: 'Mono Architecture',
    category: 'Art Direction',
    imageUrl: 'https://picsum.photos/800/1000?random=3',
    year: '2024'
  },
  {
    id: '4',
    title: 'Echo Commerce',
    category: 'Development',
    imageUrl: 'https://picsum.photos/800/500?random=4',
    year: '2023'
  },
  {
    id: '5',
    title: 'Vortex Motion',
    category: 'Motion Design',
    imageUrl: 'https://picsum.photos/800/700?random=5',
    year: '2024'
  },
  {
    id: '6',
    title: 'Cipher Editorial',
    category: 'Print',
    imageUrl: 'https://picsum.photos/800/900?random=6',
    year: '2022'
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Digital Product Design',
    description: 'Crafting intuitive and engaging interfaces for web and mobile applications with a focus on user experience and conversion.',
    tags: ['UI/UX', 'Prototyping', 'Design Systems']
  },
  {
    id: 's2',
    title: 'Brand Identity',
    description: 'Building cohesive brand narratives through logo design, typography, and visual strategy that stands the test of time.',
    tags: ['Logo', 'Strategy', 'Guidelines']
  },
  {
    id: 's3',
    title: 'Creative Development',
    description: 'Bringing designs to life with robust, scalable front-end architecture using modern frameworks and performance best practices.',
    tags: ['React', 'WebGL', 'Three.js']
  }
];

export const MACHINES: Machine[] = [
  {
    id: 1,
    title: "VR Moto Racer X",
    category: "VR Simulator",
    manufacturer: "VR Tech Global",
    available: true,
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80",
    players: 1,
    tags: ["Premium", "Immersive"],
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?si=demo",
    price: 12500,
    description: "Der ultimative VR-Rennsimulator für Arcade-Hallen. Bietet haptisches Feedback, 4K-Auflösung und über 20 Strecken. Inklusive Wind-Effekten und Motion-Platform.",
    revenue: "€4.500",
    dimensions: "220 x 110 x 180 cm",
    weight: "280 kg",
    power: "1500W",
    condition: "Neu"
  },
  {
    id: 2,
    title: "Galactic Claw Master",
    category: "Claw Machine",
    manufacturer: "Arcade Pro Systems",
    available: true,
    image: "https://images.unsplash.com/photo-1579309401389-a240d7236d30?auto=format&fit=crop&w=800&q=80",
    players: 2,
    tags: ["Bestseller"],
    videoUrl: "https://www.youtube.com/embed/5D2z5Zt8y9k?si=demo",
    price: 4200,
    description: "Ein moderner Klassiker. Helle LED-Beleuchtung und anpassbare Gewinnchancen machen diesen Greifautomaten zum Umsatzgaranten. Doppelte Steuerung für zwei Spieler gleichzeitig.",
    revenue: "€3.200",
    dimensions: "180 x 160 x 210 cm",
    weight: "180 kg",
    power: "300W",
    condition: "Neu"
  },
  {
    id: 3,
    title: "Rhythm Dance Revolution",
    category: "Music & Rhythm",
    manufacturer: "Beat Systems",
    available: true,
    image: "https://images.unsplash.com/photo-1563298258-c9c0064e7c7a?auto=format&fit=crop&w=800&q=80",
    players: 2,
    tags: ["Neuheit"],
    videoUrl: "https://www.youtube.com/embed/yJg-Y5byMMw?si=demo",
    price: 8900,
    description: "Das beliebteste Tanzspiel der Welt in der neuesten Version. Inklusive massiver Soundanlage, Bass-Shaker und sensitiven Step-Pads.",
    revenue: "€3.100",
    dimensions: "240 x 200 x 230 cm",
    weight: "450 kg",
    power: "800W",
    condition: "Neu"
  },
  {
    id: 4,
    title: "Retrocade Cabinet 4000",
    category: "Classic",
    manufacturer: "Retro Corp",
    available: false,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    players: 2,
    tags: ["Klassiker"],
    videoUrl: "https://www.youtube.com/embed/XqWJ38qG9wU?si=demo",
    price: 3500,
    description: "Über 4000 klassische Spiele in einem Gehäuse. Perfekt für Bars und Wartebereiche. Hochwertiger LCD-Screen mit Scanlines-Filter für echten Retro-Look.",
    revenue: "€2.800",
    dimensions: "70 x 80 x 170 cm",
    weight: "85 kg",
    power: "150W",
    condition: "Refurbished"
  },
  {
    id: 5,
    title: "Hoop Shot Pro",
    category: "Sports",
    manufacturer: "Sport Games Inc",
    available: true,
    image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=800&q=80",
    players: 1,
    tags: [],
    videoUrl: "https://www.youtube.com/embed/K81Fj8i_p4c?si=demo",
    price: 5400,
    description: "Basketball-Automat mit beweglichem Korb und Link-Funktion für Multiplayer-Turniere. Robustes Metallgehäuse für hohe Beanspruchung.",
    revenue: "€2.100",
    dimensions: "100 x 240 x 260 cm",
    weight: "220 kg",
    power: "200W",
    condition: "Neu"
  },
  {
    id: 6,
    title: "Zombie Sniper VR",
    category: "VR Shooter",
    manufacturer: "VR Tech Global",
    available: true,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80",
    players: 4,
    tags: ["Multiplayer"],
    videoUrl: "https://www.youtube.com/embed/H374n5y0m4Q?si=demo",
    price: 15900,
    description: "4-Spieler VR-Erlebnis auf freier Fläche. Kooperatives Gameplay gegen Zombie-Horden. Inklusive 4 VR-Brillen und haptischen Waffen.",
    revenue: "€3.800",
    dimensions: "400 x 400 x 240 cm",
    weight: "120 kg (Equipment)",
    power: "3000W",
    condition: "Neu"
  }
];
