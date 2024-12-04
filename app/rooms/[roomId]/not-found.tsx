import Link from "next/link";

function NotFound() {
  return (
    <main className="mt-4 space-y-6 text-center">
      <h1 className="text-3xl font-semibold">
        This room could not be found :(
      </h1>
      <Link
        href="/rooms"
        className="inline-block bg-accent-500 px-6 py-3 text-lg text-primary-800"
      >
        Back to all rooms
      </Link>
    </main>
  );
}

export default NotFound;