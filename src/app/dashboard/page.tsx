export default function Dashboard() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <header className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight mb-2">Welcome back.</h1>
        <p className="text-apple-subtext text-lg">You have <span className="text-apple-text font-semibold">2</span> voice interviews remaining this month.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Start New Interview Card */}
        <div className="bg-apple-surface p-8 rounded-3xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-start justify-center">
          <div className="h-12 w-12 bg-apple-bg rounded-full mb-4 flex items-center justify-center">
            <span className="text-apple-accent text-xl">+</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">New Session</h2>
          <p className="text-apple-subtext text-sm mb-6">Upload JD and start a 15-minute voice evaluation.</p>
          <div className="h-10 bg-apple-text text-white w-full rounded-full animate-pulse opacity-20"></div>
        </div>

        {/* Analytics Skeleton */}
        <div className="bg-apple-surface p-8 rounded-3xl shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Recent Performance</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="h-10 w-10 rounded-full bg-apple-bg animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-100 rounded-md w-1/3 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-apple-bg rounded-md w-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}