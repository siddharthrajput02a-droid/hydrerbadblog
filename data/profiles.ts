import { Area, Profile } from "@/lib/types";

export const hyderabadAreas: Area[] = [
  "Banjara Hills",
  "Jubilee Hills",
  "Gachibowli",
  "Hitech City",
  "Madhapur",
  "Kukatpally",
  "Begumpet",
  "Secunderabad"
];

const profileBase: Omit<Profile, "id" | "slug" | "name" | "area" | "image" | "images" | "price" | "rating" | "age">[] = [
  {
    category: "Dinner Date",
    tagline: "Soft-spoken chemistry for memorable Hyderabad evenings.",
    description: "Known for refined conversation, elegant styling, and a warm presence for dinner dates, lounge meetups, and cultural nights around the city.",
    languages: ["English", "Hindi", "Telugu"]
  },
  {
    category: "Party Partner",
    tagline: "Nightlife energy with polished charm and poise.",
    description: "A polished match for rooftop lounges, premium parties, and memorable city nights with a soft romantic aura and confident social ease.",
    languages: ["English", "Hindi"]
  },
  {
    category: "Dinner Date",
    tagline: "Elegant company for fine dining and slow conversations.",
    description: "Ideal for upscale evenings and social appearances, bringing poise, charm, and easygoing chemistry to curated Hyderabad plans.",
    languages: ["English", "Telugu"]
  },
  {
    category: "Travel Companion",
    tagline: "City-smart company for drives, escapes, and curated plans.",
    description: "Graceful, thoughtful, and easy to be around, with a calm presence for coffee dates, city drives, and elegant weekend outings.",
    languages: ["English", "Hindi", "Urdu"]
  }
];

const names = [
  "Aarika",
  "Meher",
  "Saanvi",
  "Kiara",
  "Rhea",
  "Nayra",
  "Ira",
  "Misha",
  "Anaya",
  "Tara",
  "Aisha",
  "Sia",
  "Navya",
  "Ritika",
  "Myra",
  "Zoya",
  "Diya",
  "Ishani",
  "Veda",
  "Aadya"
];

const imagePool = [
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=2560&q=100",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=2560&q=100",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=2560&q=100",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=2560&q=100",
  "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=2560&q=100",
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=2560&q=100",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=2560&q=100",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=2560&q=100",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=2560&q=100",
  "https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=2560&q=100"
];

export const profiles: Profile[] = names.map((name, index) => {
  const area = hyderabadAreas[index % hyderabadAreas.length];
  const base = profileBase[index % profileBase.length];
  const slug = `${name.toLowerCase()}-${area.toLowerCase().replace(/\s+/g, "-")}`;
  const image = imagePool[index % imagePool.length];
  const images = [
    image,
    imagePool[(index + 3) % imagePool.length],
    imagePool[(index + 6) % imagePool.length]
  ];

  return {
    id: `profile-${index + 1}`,
    slug,
    name,
    age: 23 + (index % 6),
    area,
    category: base.category,
    price: 8500 + index * 700,
    rating: Number((4.4 + ((index % 5) * 0.1)).toFixed(1)),
    image,
    images,
    tagline: base.tagline,
    description: base.description,
    languages: base.languages
  };
});
