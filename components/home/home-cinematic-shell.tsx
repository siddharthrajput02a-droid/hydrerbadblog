export function HomeCinematicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[100svh] min-h-[100dvh] bg-[var(--background)]">
      {children}
    </div>
  );
}
