import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="pill">Private lounge</p>
      <h1 className="headline-display mt-8 text-4xl font-semibold text-[var(--foreground)] md:text-5xl">This room is empty</h1>
      <p className="section-copy mx-auto mt-5 max-w-md">
        The page you are looking for is not part of tonight&apos;s arrangement — return to the lounge.
      </p>
      <Link href="/" className="button-primary mt-10 inline-flex min-h-[3rem] items-center justify-center px-10">
        Back home
      </Link>
    </div>
  );
}
