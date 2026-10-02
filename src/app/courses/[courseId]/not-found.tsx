import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Course Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        We couldn't find the course you were looking for. It may have been removed or the URL is incorrect.
      </p>
      <Link 
        href="/courses" 
        className="bg-[var(--color-accent)] hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        Return to Catalog
      </Link>
    </main>
  );
}
