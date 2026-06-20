import type { Area } from "@/lib/types";

type AreaSeoCopy = {
  intro: string;
  highlights: string[];
  nearby: Area[];
  faqs: { question: string; answer: string }[];
};

const sharedFaqSuffix = " Listings are designed for adults 18+ and keep contact, privacy, and local relevance clear.";

export const areaSeoCopy: Record<Area, AreaSeoCopy> = {
  "Banjara Hills": {
    intro:
      "Banjara Hills is one of Hyderabad's best-known premium neighborhoods, with luxury hotels, lounges, dining rooms, and private social venues close together.",
    highlights: ["Luxury hotel access", "Upscale dinner plans", "Central Hyderabad routes"],
    nearby: ["Jubilee Hills", "Begumpet", "Ameerpet"],
    faqs: [
      {
        question: "Why browse Banjara Hills profiles?",
        answer: `Banjara Hills works well for visitors who want refined Hyderabad nightlife, dining, and hotel-friendly access.${sharedFaqSuffix}`
      },
      {
        question: "Which areas are close to Banjara Hills?",
        answer: "Jubilee Hills, Begumpet, Ameerpet, and Hitech City are useful nearby discovery pages."
      }
    ]
  },
  "Jubilee Hills": {
    intro:
      "Jubilee Hills is a high-demand Hyderabad area for premium lounges, film-city social circuits, boutique dining, and polished evening plans.",
    highlights: ["Premium lounges", "Private dining", "Film Nagar access"],
    nearby: ["Banjara Hills", "Madhapur", "Hitech City"],
    faqs: [
      {
        question: "Is Jubilee Hills a premium Hyderabad location?",
        answer: `Yes. Jubilee Hills is a core luxury and nightlife area, making it a strong landing page for premium companion discovery.${sharedFaqSuffix}`
      },
      {
        question: "What should I compare with Jubilee Hills?",
        answer: "Banjara Hills, Madhapur, and Hitech City are the closest high-intent alternatives."
      }
    ]
  },
  "Hitech City": {
    intro:
      "Hitech City is Hyderabad's technology and business hub, with hotels, coworking districts, restaurants, and late-evening travel links.",
    highlights: ["Business hotel proximity", "Tech corridor demand", "Fast access to Gachibowli"],
    nearby: ["Gachibowli", "Madhapur", "Kondapur"],
    faqs: [
      {
        question: "Who searches Hitech City profiles?",
        answer: `Business travelers, tech professionals, and visitors around Cyber Towers often search Hitech City first.${sharedFaqSuffix}`
      },
      {
        question: "Which pages support Hitech City SEO?",
        answer: "Gachibowli, Madhapur, Kondapur, and Financial District pages support the same western Hyderabad search cluster."
      }
    ]
  },
  Gachibowli: {
    intro:
      "Gachibowli is a major business, sports, and residential district with strong demand around hotels, offices, and weekend plans.",
    highlights: ["Business district coverage", "Hotel-friendly discovery", "Financial District access"],
    nearby: ["Hitech City", "Financial District", "Kondapur"],
    faqs: [
      {
        question: "Why is Gachibowli important for local SEO?",
        answer: `Gachibowli captures high-intent searches from the western Hyderabad business corridor.${sharedFaqSuffix}`
      },
      {
        question: "What areas are near Gachibowli?",
        answer: "Financial District, Hitech City, Kondapur, and Manikonda are nearby location pages."
      }
    ]
  },
  Madhapur: {
    intro:
      "Madhapur connects Jubilee Hills, Hitech City, and the Hyderabad startup corridor, making it a practical local landing page for evening discovery.",
    highlights: ["Startup corridor", "Dining and lounge access", "Close to Hitech City"],
    nearby: ["Hitech City", "Jubilee Hills", "Kondapur"],
    faqs: [
      {
        question: "Is Madhapur good for Hyderabad nightlife searches?",
        answer: `Yes. Madhapur sits between premium residential and technology districts, so it attracts strong local-intent searches.${sharedFaqSuffix}`
      },
      {
        question: "Which neighborhoods should I browse after Madhapur?",
        answer: "Hitech City, Jubilee Hills, Kondapur, and Gachibowli are the most relevant next pages."
      }
    ]
  },
  Kondapur: {
    intro:
      "Kondapur is a western Hyderabad residential and business-access area, useful for people searching near Hitech City and Gachibowli.",
    highlights: ["Residential demand", "Western corridor access", "Nearby hotels and offices"],
    nearby: ["Hitech City", "Gachibowli", "Miyapur"],
    faqs: [
      {
        question: "Why create a Kondapur location page?",
        answer: `Kondapur captures searches from people who want western Hyderabad access without browsing only the main tech hubs.${sharedFaqSuffix}`
      },
      {
        question: "Which areas are close to Kondapur?",
        answer: "Hitech City, Gachibowli, Miyapur, and Madhapur are useful nearby pages."
      }
    ]
  },
  Kukatpally: {
    intro:
      "Kukatpally is a large residential and commercial zone with strong local search demand from shoppers, commuters, and nearby tech workers.",
    highlights: ["Metro-connected access", "Residential search volume", "Shopping district proximity"],
    nearby: ["Miyapur", "Hitech City", "Ameerpet"],
    faqs: [
      {
        question: "What makes Kukatpally useful for Hyderabad SEO?",
        answer: `Kukatpally has broad residential reach and strong local intent, especially for users searching beyond central Hyderabad.${sharedFaqSuffix}`
      },
      {
        question: "What areas should I compare with Kukatpally?",
        answer: "Miyapur, Ameerpet, Hitech City, and Kondapur are relevant comparison pages."
      }
    ]
  },
  Begumpet: {
    intro:
      "Begumpet is a central Hyderabad district with business hotels, older commercial streets, and easy access toward Banjara Hills and Secunderabad.",
    highlights: ["Central access", "Business hotel demand", "Airport-road familiarity"],
    nearby: ["Banjara Hills", "Ameerpet", "Secunderabad"],
    faqs: [
      {
        question: "Why browse Begumpet profiles?",
        answer: `Begumpet is practical for central Hyderabad users who want quick access to premium and business districts.${sharedFaqSuffix}`
      },
      {
        question: "Which nearby pages support Begumpet?",
        answer: "Banjara Hills, Ameerpet, and Secunderabad are the strongest nearby pages."
      }
    ]
  },
  Secunderabad: {
    intro:
      "Secunderabad serves the northern twin-city side of Hyderabad, with railway access, hotels, markets, and long-established commercial zones.",
    highlights: ["Railway and hotel access", "North Hyderabad reach", "Established commercial demand"],
    nearby: ["Begumpet", "Uppal", "Ameerpet"],
    faqs: [
      {
        question: "Is Secunderabad part of the Hyderabad SEO structure?",
        answer: `Yes. Secunderabad is essential for north-side searches and twin-city local discovery.${sharedFaqSuffix}`
      },
      {
        question: "Which areas are close to Secunderabad?",
        answer: "Begumpet, Uppal, and Ameerpet are useful internal links from Secunderabad."
      }
    ]
  },
  Ameerpet: {
    intro:
      "Ameerpet is a busy metro-connected district known for education, shopping, offices, and quick access to central Hyderabad.",
    highlights: ["Metro connectivity", "High local search volume", "Central shopping streets"],
    nearby: ["Begumpet", "Banjara Hills", "Kukatpally"],
    faqs: [
      {
        question: "Why does Ameerpet need its own page?",
        answer: `Ameerpet has distinct search demand from commuters, students, and nearby office users.${sharedFaqSuffix}`
      },
      {
        question: "What pages connect with Ameerpet?",
        answer: "Begumpet, Banjara Hills, Kukatpally, and Secunderabad are natural internal links."
      }
    ]
  },
  Dilsukhnagar: {
    intro:
      "Dilsukhnagar covers a major eastern Hyderabad residential and commercial audience, with strong local search demand around shopping and transit.",
    highlights: ["East Hyderabad coverage", "Residential density", "Transit-driven searches"],
    nearby: ["LB Nagar", "Uppal", "Ameerpet"],
    faqs: [
      {
        question: "Why target Dilsukhnagar?",
        answer: `Dilsukhnagar expands the crawlable Hyderabad structure beyond west and central neighborhoods.${sharedFaqSuffix}`
      },
      {
        question: "Which areas are near Dilsukhnagar?",
        answer: "LB Nagar and Uppal are the most relevant east-side pages to compare."
      }
    ]
  },
  "LB Nagar": {
    intro:
      "LB Nagar is a key eastern Hyderabad gateway with residential demand, highway access, and strong locality-based search behavior.",
    highlights: ["East Hyderabad gateway", "Residential discovery", "Highway access"],
    nearby: ["Dilsukhnagar", "Uppal", "Miyapur"],
    faqs: [
      {
        question: "What search intent does LB Nagar capture?",
        answer: `LB Nagar captures users looking for eastern Hyderabad profiles and local access around major roads.${sharedFaqSuffix}`
      },
      {
        question: "What nearby pages should be linked?",
        answer: "Dilsukhnagar, Uppal, and Secunderabad are useful supporting pages."
      }
    ]
  },
  Miyapur: {
    intro:
      "Miyapur is a north-west Hyderabad locality with metro access, residential growth, and useful links toward Kukatpally and Kondapur.",
    highlights: ["Metro endpoint access", "Residential growth", "North-west Hyderabad reach"],
    nearby: ["Kukatpally", "Kondapur", "Hitech City"],
    faqs: [
      {
        question: "Why include Miyapur in the Hyderabad SEO map?",
        answer: `Miyapur helps cover north-west Hyderabad searches and connects well with Kukatpally and Kondapur.${sharedFaqSuffix}`
      },
      {
        question: "Which pages should users compare with Miyapur?",
        answer: "Kukatpally, Kondapur, and Hitech City are the closest supporting pages."
      }
    ]
  },
  Uppal: {
    intro:
      "Uppal serves eastern and north-eastern Hyderabad search demand, with stadium access, metro routes, and residential neighborhoods.",
    highlights: ["East-side reach", "Metro access", "Stadium and event traffic"],
    nearby: ["Secunderabad", "Dilsukhnagar", "LB Nagar"],
    faqs: [
      {
        question: "What makes Uppal useful for SEO?",
        answer: `Uppal adds north-east Hyderabad coverage and helps users find area-specific profile pages.${sharedFaqSuffix}`
      },
      {
        question: "Which locations are close to Uppal?",
        answer: "Secunderabad, Dilsukhnagar, and LB Nagar are the most relevant nearby pages."
      }
    ]
  },
  Manikonda: {
    intro:
      "Manikonda is a growing residential area near the western business corridor, connecting users toward Gachibowli and Financial District.",
    highlights: ["Residential growth", "Western business access", "Close to Gachibowli"],
    nearby: ["Gachibowli", "Financial District", "Madhapur"],
    faqs: [
      {
        question: "Why browse Manikonda profiles?",
        answer: `Manikonda works for users around western Hyderabad residential communities and office corridors.${sharedFaqSuffix}`
      },
      {
        question: "Which areas are close to Manikonda?",
        answer: "Gachibowli, Financial District, and Madhapur are the most useful nearby pages."
      }
    ]
  },
  "Financial District": {
    intro:
      "Financial District is a high-value Hyderabad business zone, serving premium hotel, office, and executive search intent near Gachibowli.",
    highlights: ["Executive business demand", "Premium hotels", "Gachibowli access"],
    nearby: ["Gachibowli", "Manikonda", "Hitech City"],
    faqs: [
      {
        question: "Why target Financial District?",
        answer: `Financial District captures business-travel and executive local intent in western Hyderabad.${sharedFaqSuffix}`
      },
      {
        question: "What areas support Financial District SEO?",
        answer: "Gachibowli, Manikonda, Hitech City, and Kondapur form the strongest supporting cluster."
      }
    ]
  }
};

export const cityFaqs = [
  {
    question: "Which Hyderabad areas are covered?",
    answer:
      "The directory covers Banjara Hills, Jubilee Hills, Hitech City, Gachibowli, Madhapur, Kondapur, Kukatpally, Begumpet, Secunderabad, Ameerpet, Dilsukhnagar, LB Nagar, Miyapur, Uppal, Manikonda, and Financial District."
  },
  {
    question: "Are Hyderabad profile pages crawlable?",
    answer:
      "Yes. City, area, profile, and approved listing pages are server-rendered with canonical URLs, metadata, and sitemap entries."
  },
  {
    question: "Is the website for adults only?",
    answer:
      "Yes. The site is structured for adults 18+ and presents profiles with privacy-focused, non-explicit directory content."
  }
];
