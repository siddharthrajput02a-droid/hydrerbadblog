"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  MessageCircle,
  Sparkles,
  Star,
  X
} from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";
import { MagneticWrap } from "@/components/magnetic-wrap";
import type { Profile } from "@/lib/types";
import { currency } from "@/lib/utils";

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }
};

export function ProfileLuxuryClient({ profile }: { profile: Profile }) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 420], [0, 80]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.08]);
  const panelOpacity = useTransform(scrollY, [0, 200], [1, 0.92]);

  const gallery = useMemo(() => Array.from(new Set([profile.image, ...profile.images])), [profile]);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSent, setBookingSent] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    contact: "",
    date: "",
    time: "Evening",
    plan: profile.category,
    notes: ""
  });

  function openBooking() {
    setBookingOpen(true);
    setBookingSent(false);
  }

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBookingSent(true);
  }

  const reviews = [
    { who: "Verified member", quote: "Poised, punctual, and effortlessly warm — the room leaned in when she spoke.", stars: 5 },
    { who: "Travel guest", quote: "Handled the itinerary like a concierge. Soft glamour without performance.", stars: 5 },
    { who: "Hyderabad regular", quote: "The kind of presence that makes time feel slower — in the best way.", stars: 5 }
  ];

  return (
    <div className="relative min-h-screen bg-[var(--background)] pb-32 pt-0">
      <section className="relative min-h-[min(92svh,900px)] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <Image
            src={profile.image}
            alt={profile.name}
            fill
            priority
            className="object-cover brightness-[0.65] contrast-[1.05] saturate-[1.05]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-[#08060a]/75 to-[var(--background)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_20%,rgba(212,175,55,0.12),transparent_55%)]" />
        </motion.div>

        <div className="container-shell relative z-10 flex min-h-[min(92svh,900px)] flex-col justify-end pb-16 pt-28 md:pb-20 md:pt-32">
          <Link
            href="/hyderabad"
            className="mb-10 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-xl transition hover:border-[rgba(212,175,55,0.45)] hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Lounge
          </Link>

          <motion.div style={{ opacity: panelOpacity }} className="max-w-3xl">
            <p className="pill inline-flex border-[rgba(212,175,55,0.35)] bg-black/40 text-[#f5e5ba] shadow-[0_12px_48px_rgba(0,0,0,0.45)]">
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent-bright)]" />
              {profile.area} · Hyderabad
            </p>
            <h1 className="headline-display mt-7 text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white drop-shadow-[0_8px_48px_rgba(0,0,0,0.65)]">
              {profile.name}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">{profile.tagline}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 ring-1 ring-white/10">
                <Star className="h-4 w-4 fill-[#c9a24d] text-[#c9a24d]" />
                {profile.rating} rating
              </span>
              <span className="rounded-full bg-white/[0.06] px-4 py-2 ring-1 ring-white/10">Age {profile.age}</span>
              <span className="rounded-full bg-white/[0.06] px-4 py-2 ring-1 ring-white/10">{profile.category}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-shell relative z-10 -mt-16 grid gap-12 pb-8 md:-mt-24 lg:grid-cols-[1fr,min(360px,34%)] lg:items-start lg:gap-14">
        <div className="space-y-20">
        <motion.section {...fade} className="luxury-glass relative overflow-hidden rounded-[2rem] p-8 md:p-11">
          <div className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.18),transparent_70%)] blur-2xl" />
          <h2 className="headline-display text-2xl font-semibold text-[var(--foreground)] md:text-3xl">About</h2>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.04 } }
            }}
            className="section-copy mt-6 max-w-3xl text-[1.08rem]"
          >
            {profile.description.split(/(?<=[.!?])\s+/).map((sentence, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 }
                }}
                className="inline"
              >
                {sentence}{" "}
              </motion.span>
            ))}
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-2">
            {profile.languages.map((language) => (
              <span
                key={language}
                className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-[var(--muted)] ring-1 ring-white/[0.04]"
              >
                {language}
              </span>
            ))}
          </div>
        </motion.section>

        <section>
          <motion.div {...fade} className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="headline-display text-2xl font-semibold text-[var(--foreground)] md:text-3xl">Gallery</h2>
              <p className="section-copy mt-2 max-w-xl">Tap to immerse — slow fades, full bleed, no harsh cuts.</p>
            </div>
          </motion.div>

          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {gallery.map((src, i) => (
              <motion.button
                key={`${src}-${i}`}
                type="button"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
                className="relative mb-4 break-inside-avoid overflow-hidden rounded-2xl ring-1 ring-white/[0.08] w-full"
                onClick={() => setLightbox(i)}
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image src={src} alt="" fill className="object-cover transition duration-700 hover:scale-[1.04]" sizes="(max-width:768px)100vw,33vw" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70" />
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        <motion.section {...fade} className="luxury-glass rounded-[2rem] p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="headline-display text-2xl font-semibold text-[var(--foreground)] md:text-3xl">Availability</h2>
              <p className="section-copy mt-2 max-w-xl text-sm md:text-base">
                Timeline preview — connect your calendar API to light these slots in real time.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              <CalendarClock className="h-4 w-4 text-[var(--accent)]" />
              This week
            </div>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-7">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
              <div
                key={d}
                className={`rounded-2xl border px-3 py-4 text-center ${
                  i === 2 || i === 4 || i === 5
                    ? "border-[rgba(212,175,55,0.35)] bg-[linear-gradient(180deg,rgba(212,175,55,0.12),rgba(8,6,10,0.35))] text-[var(--foreground)]"
                    : "border-white/[0.08] bg-white/[0.02] text-[var(--muted)]"
                }`}
              >
                <div className="text-[0.65rem] font-semibold uppercase tracking-[0.2em]">{d}</div>
                <div className="mt-3 text-sm">{i === 2 || i === 4 || i === 5 ? "Open" : "—"}</div>
              </div>
            ))}
          </div>
        </motion.section>

        <section>
          <motion.h2 {...fade} className="headline-display text-2xl font-semibold text-[var(--foreground)] md:text-3xl">
            Reviews
          </motion.h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {reviews.map((r, i) => (
              <motion.div
                key={r.who}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="luxury-glass rounded-3xl p-6"
              >
                <div className="flex items-center gap-1 text-[#e8d5a3]">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[var(--foreground)]/90">&ldquo;{r.quote}&rdquo;</p>
                <p className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">{r.who}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          {...fade}
          className="relative overflow-hidden rounded-[2rem] border border-[rgba(212,175,55,0.22)] bg-[linear-gradient(135deg,rgba(22,18,26,0.92),rgba(40,20,34,0.55))] p-10 text-center shadow-[0_40px_120px_rgba(0,0,0,0.55)] md:p-14"
        >
          <h2 className="headline-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-[var(--foreground)]">
            Ready when you are
          </h2>
          <p className="section-copy mx-auto mt-4 max-w-xl">
            Close the distance — book through concierge or return to the lounge to keep browsing.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" className="button-primary min-w-[12rem] px-10 py-3" onClick={openBooking}>
              Book privately
            </button>
            <Link href="/hyderabad" className="button-secondary min-w-[12rem] px-10 py-3 text-center">
              Back to lounge
            </Link>
          </div>
        </motion.section>
        </div>

        <aside className="relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="sticky top-28 luxury-glass rounded-3xl p-7 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Reserve</p>
            <p className="headline-display mt-3 text-3xl font-semibold text-[var(--foreground)]">{currency(profile.price)}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">Starting rate · bespoke itineraries on request</p>
            <div className="mt-6 flex flex-col gap-2.5">
              <MagneticWrap className="block">
                <button type="button" className="button-primary w-full py-3 text-sm" onClick={openBooking}>
                  Request evening
                </button>
              </MagneticWrap>
              <button type="button" className="button-secondary w-full py-3 text-sm" onClick={openBooking}>
                <span className="inline-flex items-center justify-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Concierge message
                </span>
              </button>
            </div>
          </motion.div>
        </aside>
      </div>

      <AnimatePresence>
        {lightbox !== null ? (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white"
              aria-label="Close"
              onClick={() => setLightbox(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[min(88vh,900px)] w-full max-w-4xl overflow-hidden rounded-3xl ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[3/4] w-full md:aspect-video">
                <Image src={gallery[lightbox]} alt="" fill className="object-cover" sizes="100vw" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/80 to-transparent p-4">
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-black/45 text-white"
                  onClick={() => setLightbox((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length))}
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  {lightbox + 1} / {gallery.length}
                </span>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-black/45 text-white"
                  onClick={() => setLightbox((i) => (i === null ? i : (i + 1) % gallery.length))}
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {bookingOpen ? (
          <motion.div
            className="fixed inset-0 z-[130] flex items-center justify-center bg-black/78 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setBookingOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-[rgba(212,175,55,0.26)] bg-[linear-gradient(155deg,rgba(18,14,22,0.96),rgba(8,6,10,0.96))] shadow-[0_40px_120px_rgba(0,0,0,0.72)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-5 border-b border-white/[0.08] px-5 py-5 md:px-7">
                <div>
                  <p className="inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent-bright)]">
                    <CalendarClock className="h-3.5 w-3.5" />
                    Private request
                  </p>
                  <h2 className="headline-display mt-3 text-2xl font-semibold text-[var(--foreground)] md:text-3xl">
                    Request {profile.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    Share the timing and contact details. The final schedule can be confirmed by concierge.
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[var(--muted)] transition hover:border-[rgba(212,175,55,0.35)] hover:text-[var(--foreground)]"
                  aria-label="Close request"
                  onClick={() => setBookingOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {bookingSent ? (
                <div className="px-5 py-7 md:px-7">
                  <div className="rounded-[1.35rem] border border-[rgba(212,175,55,0.22)] bg-white/[0.04] p-6">
                    <CheckCircle2 className="h-10 w-10 text-[var(--accent-bright)]" />
                    <h3 className="headline-display mt-4 text-2xl font-semibold text-[var(--foreground)]">
                      Request preview created
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                      {profile.name} in {profile.area} has been matched with your preferred {bookingForm.time.toLowerCase()} slot.
                    </p>
                    <div className="mt-5 grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2">
                      <div className="rounded-2xl bg-black/24 p-4 ring-1 ring-white/[0.06]">
                        <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted-deep)]">
                          Contact
                        </span>
                        <span className="mt-1 block truncate text-[var(--foreground)]">{bookingForm.contact}</span>
                      </div>
                      <div className="rounded-2xl bg-black/24 p-4 ring-1 ring-white/[0.06]">
                        <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted-deep)]">
                          Date
                        </span>
                        <span className="mt-1 block text-[var(--foreground)]">{bookingForm.date}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="button-primary mt-5 w-full py-3"
                    onClick={() => setBookingOpen(false)}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form className="space-y-4 px-5 py-6 md:px-7" onSubmit={submitBooking}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                        Your name
                      </span>
                      <input
                        className="input-surface"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm((current) => ({ ...current, name: e.target.value }))}
                        placeholder="Display name"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                        Contact
                      </span>
                      <input
                        className="input-surface"
                        value={bookingForm.contact}
                        onChange={(e) => setBookingForm((current) => ({ ...current, contact: e.target.value }))}
                        placeholder="Phone or email"
                        required
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                        <CalendarClock className="h-3.5 w-3.5 text-[var(--accent)]" />
                        Date
                      </span>
                      <input
                        className="input-surface"
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm((current) => ({ ...current, date: e.target.value }))}
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                        <Clock className="h-3.5 w-3.5 text-[var(--accent)]" />
                        Time
                      </span>
                      <select
                        className="input-surface"
                        value={bookingForm.time}
                        onChange={(e) => setBookingForm((current) => ({ ...current, time: e.target.value }))}
                      >
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                        <option value="Late night">Late night</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                        Plan
                      </span>
                      <select
                        className="input-surface"
                        value={bookingForm.plan}
                        onChange={(e) => setBookingForm((current) => ({ ...current, plan: e.target.value as Profile["category"] }))}
                      >
                        <option value="Dinner Date">Dinner Date</option>
                        <option value="Party Partner">Party Partner</option>
                        <option value="Travel Companion">Travel Companion</option>
                      </select>
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                      Notes
                    </span>
                    <textarea
                      className="input-surface min-h-28 resize-none"
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm((current) => ({ ...current, notes: e.target.value }))}
                      placeholder="Area, venue preference, or any concierge notes"
                    />
                  </label>

                  <div className="flex flex-col gap-3 border-t border-white/[0.08] pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-5 text-[var(--muted-deep)]">
                      18+ only. Availability and details are confirmed before scheduling.
                    </p>
                    <button type="submit" className="button-primary shrink-0 px-7 py-3">
                      Send request
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 z-[90] border-t border-white/[0.08] bg-[rgba(6,5,8,0.82)] p-4 backdrop-blur-2xl md:hidden">
        <div className="container-shell flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">From</p>
            <p className="headline-display text-xl font-semibold text-[var(--accent-bright)]">{currency(profile.price)}</p>
          </div>
          <div className="flex flex-1 justify-end gap-2">
            <button type="button" className="button-secondary flex-1 py-3 text-sm" onClick={openBooking}>
              Chat
            </button>
            <button type="button" className="button-primary flex-1 py-3 text-sm" onClick={openBooking}>
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
