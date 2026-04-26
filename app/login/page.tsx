import type { Metadata } from "next";
import { LoginShell } from "@/components/login-shell";

export const metadata: Metadata = {
  title: "Login / Signup",
  description: "Join Hyderabad Daylight to explore premium daytime dating and companion discovery across Hyderabad."
};

export default function LoginPage() {
  return (
    <section className="section-spacing">
      <div className="container-shell">
        <LoginShell />
      </div>
    </section>
  );
}
