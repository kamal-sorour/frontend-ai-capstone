export default async function HealthCheck() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users/2', { cache: 'no-store' });
  const data = await res.json();

  return (
    <div className="max-w-2xl mx-auto bg-apple-surface p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-3 w-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse"></div>
        <h1 className="text-2xl font-semibold tracking-tight">All Systems Operational</h1>
      </div>
      
      <div className="bg-apple-bg rounded-2xl p-6 overflow-x-auto text-sm">
        <p className="text-apple-subtext mb-3 font-medium">Mock Services API Response:</p>
        <pre className="text-apple-text">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}