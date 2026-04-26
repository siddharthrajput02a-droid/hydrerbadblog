import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard-shell";

export const metadata: Metadata = {
  title: "My Listings",
  description: "Manage your Hyderabad daytime dating listings with a frontend-only dashboard."
};

export default function DashboardPage() {
  return (
    <section className="section-spacing">
      <div className="container-shell">
        <div className="mb-8">
          <p className="pill">User Dashboard</p>
          <h1 className="headline-display section-title mt-5">Manage your Hyderabad listings</h1>
        </div>
        <DashboardShell />
      </div>
    </section>
  );
}
