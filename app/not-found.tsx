import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container page-content empty-state">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>A little outside the lattice.</h1>
      <p>
        This page does not exist. Return to the toolkit to continue exploring.
      </p>
      <Link href="/tools/" className="button">
        Explore Tools →
      </Link>
    </div>
  );
}
