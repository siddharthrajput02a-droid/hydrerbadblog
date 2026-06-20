export function HomeCinematicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[var(--background)]">
      {children}
    </div>
  );
}
