export function HomeCinematicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="viewport-screen relative bg-[var(--background)]">
      {children}
    </div>
  );
}
