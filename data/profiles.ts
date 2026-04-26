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
  "https://randomuser.me/api/portraits/women/11.jpg",
  "https://randomuser.me/api/portraits/women/12.jpg",
  "https://randomuser.me/api/portraits/women/13.jpg",
  "https://randomuser.me/api/portraits/women/14.jpg",
  "https://randomuser.me/api/portraits/women/15.jpg",
  "https://randomuser.me/api/portraits/women/16.jpg",
  "https://randomuser.me/api/portraits/women/17.jpg",
  "https://randomuser.me/api/portraits/women/18.jpg",
  "https://randomuser.me/api/portraits/women/19.jpg",
  "https://randomuser.me/api/portraits/women/20.jpg"
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
