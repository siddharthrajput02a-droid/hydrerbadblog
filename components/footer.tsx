import Link from "next/link";
import { MapPin } from "lucide-react";
import { hyderabadAreas } from "@/data/profiles";
import { slugifyArea } from "@/lib/utils";

const quickLinks = [
  { label: "All Hyderabad profiles", href: "/hyderabad" },
  { label: "Member login",           href: "/login"      },
  { label: "Admin panel",            href: "/admin"      },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#0a0608]">

      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,77,141,0.08),transparent_65%)] blur-3xl" />

      <div className="container-shell relative z-10 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[2fr,1fr,1fr,1fr]">

          {/* brand */}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,77,141,0.45)] bg-[rgba(255,77,141,0.12)] px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#ffb7d6]">
              <MapPin className="h-3 w-3 text-[#ff4d8d]" />
              Hyderabad Directory
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
              Premium escort &amp; call girl directory for Hyderabad. Verified profiles, all areas, complete discretion.
            </p>
          </div>

          {/* areas */}
          <div>
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/30">Areas</h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/hyderabad" className="text-sm text-white/50 transition hover:text-[#ff4d8d]">All Hyderabad</Link></li>
              {hyderabadAreas.slice(0, 4).map((area) => (
                <li key={area}><Link href={`/hyderabad/${slugifyArea(area)}`} className="text-sm text-white/50 transition hover:text-[#ff4d8d]">{area}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/30 md:invisible">Areas</h4>
            <ul className="mt-4 space-y-2">
              {hyderabadAreas.slice(4).map((area) => (
                <li key={area}><Link href={`/hyderabad/${slugifyArea(area)}`} className="text-sm text-white/50 transition hover:text-[#ff4d8d]">{area}</Link></li>
              ))}
            </ul>
          </div>

          {/* quick links */}
          <div>
            <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/30">Quick links</h4>
            <ul className="mt-4 space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={href}><Link href={href} className="text-sm text-white/50 transition hover:text-[#ff4d8d]">{label}</Link></li>
              ))}
            </ul>
          </div>

        </div>

        {/* bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="text-xs text-white/25">© {new Date().getFullYear()} Hyderabad Afterglow. All rights reserved.</p>
          <p className="text-xs text-white/20">For adults 18+ only · All profiles are independently verified</p>
        </div>
      </div>
    </footer>
  );
}
