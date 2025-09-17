export default function NotFound() {
  return (
    <section className="py-20">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn’t exist or may have been moved.
        </p>

        <a
          href="/"
          className="px-6 py-2 rounded-2xl bg-black text-white hover:bg-gray-600 transition"
        >
          Go back to Home
        </a>
      </div>
    </section>
  );
}
