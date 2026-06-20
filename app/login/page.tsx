import type { Metadata } from "next";
import { LoginShell } from "@/components/login-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Login / Signup",
  description: "Join Hyderabad Daylight to explore premium daytime dating and companion discovery across Hyderabad.",
  path: "/login",
  noIndex: true
});

export default function LoginPage() {
  return (
    <section className="section-spacing">
      <div className="container-shell">
        <LoginShell />
      </div>
    </section>
  );
}
