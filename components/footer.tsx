import Link from "next/link";
import { hyderabadAreas } from "@/data/profiles";
import { slugifyArea } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-14">
      <div className="container-shell grid gap-12 px-3 md:grid-cols-[1.25fr,1fr] md:px-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Hyderabad directory</p>
          <h3 className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-gray-900 md:text-3xl">
            Curated profiles, clear areas, fast browsing.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600">
            A modern frontend for companion discovery across Hyderabad. Area pages and profiles stay SEO-aware and sync with your
            API when it&apos;s live.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Areas</h4>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <Link
              href="/hyderabad"
              className="rounded-lg px-2 py-2 font-medium text-gray-800 transition hover:bg-white hover:text-blue-700"
            >
              All Hyderabad
            </Link>
            {hyderabadAreas.map((area) => (
              <Link
                key={area}
                href={`/hyderabad/${slugifyArea(area)}`}
                className="rounded-lg px-2 py-2 font-medium text-gray-800 transition hover:bg-white hover:text-blue-700"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
