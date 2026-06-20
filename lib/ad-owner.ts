const OWNER_KEY = "hyd-afterglow-owner-id";

export function getAdOwnerId() {
  if (typeof window === "undefined") {
    return "";
  }

  const current = window.localStorage.getItem(OWNER_KEY);
  if (current) {
    return current;
  }

  const next =
    typeof window.crypto?.randomUUID === "function"
      ? window.crypto.randomUUID()
      : `owner-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  window.localStorage.setItem(OWNER_KEY, next);
  return next;
}
