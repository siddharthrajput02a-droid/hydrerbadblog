export type Area =
  | "Banjara Hills"
  | "Jubilee Hills"
  | "Gachibowli"
  | "Hitech City"
  | "Madhapur"
  | "Kukatpally"
  | "Begumpet"
  | "Secunderabad";

export interface Profile {
  id: string;
  slug: string;
  name: string;
  age: number;
  area: Area;
  category: "Dinner Date" | "Party Partner" | "Travel Companion";
  price: number;
  rating: number;
  image: string;
  images: string[];
  description: string;
  languages: string[];
  tagline: string;
}

export interface AdDraft {
  id: string;
  title: string;
  area: Area;
  category: string;
  price: number;
  description: string;
  status: "Pending" | "Approved" | "Rejected";
}
