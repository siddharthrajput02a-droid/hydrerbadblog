import { MessageCircle, Phone, Send } from "lucide-react";
import type { ReactNode } from "react";
import type { UserAd } from "@/lib/types";
import { currency } from "@/lib/utils";

const statusClass: Record<UserAd["status"], string> = {
  Approved: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
  Pending: "border-amber-300/30 bg-amber-400/10 text-amber-100",
  Rejected: "border-red-300/30 bg-red-400/10 text-red-100"
};

export function userAdWhatsappHref(ad: UserAd) {
  const message = encodeURIComponent(`Hi, I am interested in ${ad.title} in ${ad.area}.`);
  return `https://wa.me/${ad.whatsapp}?text=${message}`;
}

export function userAdSmsHref(ad: UserAd) {
  const message = encodeURIComponent(`Hi, I am interested in ${ad.title}.`);
  return `sms:${ad.phone}?body=${message}`;
}

export function UserAdCard({
  ad,
  actions,
  showStatus = true
}: {
  ad: UserAd;
  actions?: ReactNode;
  showStatus?: boolean;
}) {
  return (
    <article id={ad.id} className="group overflow-hidden rounded-[1.5rem] border border-[rgba(212,175,55,0.18)] bg-[linear-gradient(165deg,rgba(18,14,22,0.94),rgba(7,5,9,0.96))] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
      <div className="relative h-64 overflow-hidden">
        <img
          src={ad.image}
          alt={`${ad.name} profile`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        {showStatus ? (
          <span className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-semibold ${statusClass[ad.status]}`}>
            {ad.status}
          </span>
        ) : null}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="headline-display text-2xl font-semibold text-white">{ad.name}</h3>
          <p className="mt-1 text-sm text-white/72">
            Age {ad.age} | {ad.area}
          </p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-lg font-semibold text-[var(--foreground)]">{ad.title}</h4>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              {ad.category}
            </p>
          </div>
          <span className="shrink-0 text-base font-semibold text-[#e8d5a3]">{currency(ad.price)}</span>
        </div>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[var(--muted)]">{ad.description}</p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <a
            href={`tel:${ad.phone}`}
            className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-full bg-white/[0.06] text-xs font-semibold text-white ring-1 ring-white/[0.08] transition hover:bg-white/[0.1]"
          >
            <Phone className="h-3.5 w-3.5" />
            Call
          </a>
          <a
            href={userAdSmsHref(ad)}
            className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-full bg-white/[0.06] text-xs font-semibold text-white ring-1 ring-white/[0.08] transition hover:bg-white/[0.1]"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Chat
          </a>
          <a
            href={userAdWhatsappHref(ad)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-full bg-[#25d366] text-xs font-semibold text-[#04120a] transition hover:brightness-110"
          >
            <Send className="h-3.5 w-3.5" />
            WA
          </a>
        </div>

        {actions ? <div className="mt-3">{actions}</div> : null}
      </div>
    </article>
  );
}
