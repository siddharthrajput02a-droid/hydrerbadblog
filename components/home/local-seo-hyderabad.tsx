import Link from "next/link";
import { slugifyArea } from "@/lib/utils";

const AREAS = [
  "Banjara Hills",
  "Jubilee Hills",
  "Gachibowli",
  "Hitech City",
  "Madhapur",
  "Kukatpally",
  "Begumpet",
  "Secunderabad",
];

export function LocalSeoHyderabad() {
  return (
    <section className="border-t border-[#ffd6e8]/50 bg-white/60 py-10">
      <div className="container-shell">
        <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#9a6b82]">
          Explore Hyderabad
        </p>
        <nav aria-label="Hyderabad area directory">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {AREAS.map((area) => (
              <li key={area}>
                <Link
                  href={`/hyderabad/${slugifyArea(area)}`}
                  className="text-sm text-[#6b5060] underline-offset-2 hover:text-[#ff4d8d] hover:underline"
                >
                  {area} escorts &amp; dating
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/hyderabad"
                className="text-sm text-[#6b5060] underline-offset-2 hover:text-[#ff4d8d] hover:underline"
              >
                All Hyderabad profiles
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
