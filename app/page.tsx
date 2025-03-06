import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Go to your <Link href="/profile">Profile</Link> to see Toggl data.</p>
    </div>
  );
}
