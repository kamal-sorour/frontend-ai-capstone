import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
      
      {/* Badge */}
      <div className="mb-6 px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm inline-flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-apple-accent animate-pulse"></span>
        <span className="text-xs font-semibold text-apple-subtext tracking-wide uppercase">VoxPrep AI Studio is Live</span>
      </div>

      {/* Hero Title */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-apple-text tracking-tighter mb-6 leading-tight max-w-4xl">
        Master the interview. <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
          Using just your voice.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-apple-subtext mb-10 max-w-2xl font-medium leading-relaxed">
        Experience 15-minute, hyper-realistic mock interviews tailored to your target Job Description. 
        Get instant AI feedback on your tone, logic, and code.
      </p>

      {/* Call to Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Link 
          href="/dashboard" 
          className="bg-apple-text text-white px-8 py-4 rounded-full font-medium text-lg hover:scale-105 hover:bg-black transition-all duration-300 shadow-[0_4px_14px_0_rgba(0,0,0,0.2)]"
        >
          Start Your Free Session
        </Link>
        <Link 
          href="/health" 
          className="bg-white text-apple-text px-8 py-4 rounded-full font-medium text-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300 shadow-sm"
        >
          View System Status
        </Link>
      </div>

      {/* Trust & Quota section */}
      <p className="mt-8 text-sm text-apple-subtext font-medium">
        Includes 3 free AI voice sessions per month. No credit card required.
      </p>
    </div>
  );
}