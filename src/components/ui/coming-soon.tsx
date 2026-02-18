import Link from 'next/link';

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="inline-block animate-bounce">
            <svg
              className="w-24 h-24 text-indigo-600 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Coming Soon!
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-8">
          Stay tuned, we are bringing more features for you!
        </p>
        
        <p className="text-gray-600 mb-8">
          We're working hard to bring you something amazing. Check back soon!
        </p>
        
        <Link
          href="/"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
