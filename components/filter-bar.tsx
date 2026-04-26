"use client";

import { hyderabadAreas } from "@/data/profiles";

interface FilterBarProps {
  selectedArea: string;
  selectedCategory: string;
  priceBand: string;
  onAreaChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPriceBandChange: (value: string) => void;
}

export function FilterBar(props: FilterBarProps) {
  return (
    <div className="grid gap-5 rounded-2xl border border-white/40 bg-white/60 p-6 shadow-[0_10px_40px_rgba(255,105,135,0.12)] backdrop-blur-md md:grid-cols-3 md:gap-6">
      <select className="input-surface min-h-[3rem]" value={props.selectedArea} onChange={(e) => props.onAreaChange(e.target.value)}>
        <option value="All">All Hyderabad Areas</option>
        {hyderabadAreas.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </select>

      <select
        className="input-surface min-h-[3rem]"
        value={props.selectedCategory}
        onChange={(e) => props.onCategoryChange(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Dinner Date">Dinner Date</option>
        <option value="Party Partner">Party Partner</option>
        <option value="Travel Companion">Travel Companion</option>
      </select>

      <select className="input-surface min-h-[3rem]" value={props.priceBand} onChange={(e) => props.onPriceBandChange(e.target.value)}>
        <option value="All">All Price Bands</option>
        <option value="Under10000">Under 10k</option>
        <option value="10000to15000">10k - 15k</option>
        <option value="Above15000">15k+</option>
      </select>
    </div>
  );
}
