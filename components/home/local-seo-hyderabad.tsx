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
    <section className="border-t border-white/[0.06] py-16">
      <div className="container-shell space-y-14">

        {/* SEO content block */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Left column */}
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,77,141,0.45)] bg-[rgba(255,77,141,0.12)] px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#ffb7d6] backdrop-blur-md">
              Hyderabad Escort Services
            </p>
            <h2 className="headline-display text-[clamp(1.5rem,2.8vw,2.2rem)] font-semibold leading-[1.1] text-white">
              Premium Call Girls &amp; Escort Services in Hyderabad
            </h2>
            <p className="text-[1rem] leading-[1.9] text-white/55">
              Hyderabad is home to some of the most elegant and verified call girls available for companionship, dinner dates, and private escort services. Our directory connects you with trusted, professional escorts across all major areas of Hyderabad — from the upscale lanes of Banjara Hills to the vibrant nightlife of Hitech City.
            </p>
            <p className="text-[1rem] leading-[1.9] text-white/55">
              Whether you are looking for a sophisticated companion for a corporate event, a travel partner for a weekend getaway, or a discreet escort service at your hotel or residence, our verified profiles ensure you find the perfect match. Every call girl listed on our platform is independently verified for authenticity, safety, and quality.
            </p>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,77,141,0.45)] bg-[rgba(255,77,141,0.12)] px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#ffb7d6] backdrop-blur-md">
              Why Choose Us
            </p>
            <h2 className="headline-display text-[clamp(1.5rem,2.8vw,2.2rem)] font-semibold leading-[1.1] text-white">
              Trusted Escort Directory for Hyderabad
            </h2>
            <p className="text-[1rem] leading-[1.9] text-white/55">
              Our escort service platform in Hyderabad is designed for those who value discretion, quality, and genuine connections. All call girls and female escorts listed here are real, verified individuals — no fake profiles, no bait-and-switch. Browse by area, price range, or category to find exactly what you are looking for.
            </p>
            <p className="text-[1rem] leading-[1.9] text-white/55">
              From independent escorts in Jubilee Hills to premium companion services in Gachibowli and Madhapur, our platform covers every corner of Hyderabad. New profiles are added regularly, ensuring you always have access to fresh, available escorts ready to meet your needs with elegance and professionalism.
            </p>
          </div>
        </div>

        {/* Area links */}
        <div className="border-t border-white/[0.06] pt-10">
          <p className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/30">
            Explore Hyderabad
          </p>
          <nav aria-label="Hyderabad area directory">
            <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
              {AREAS.map((area) => (
                <li key={area}>
                  <Link
                    href={`/hyderabad/${slugifyArea(area)}`}
                    className="text-sm text-white/40 underline-offset-2 transition hover:text-[#ff4d8d] hover:underline"
                  >
                    {area} escorts &amp; dating
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/hyderabad"
                  className="text-sm text-white/40 underline-offset-2 transition hover:text-[#ff4d8d] hover:underline"
                >
                  All Hyderabad profiles
                </Link>
              </li>
            </ul>
          </nav>
        </div>

      </div>
    </section>
  );
}
