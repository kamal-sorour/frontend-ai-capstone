export default function Studio() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in zoom-in-95 duration-1000">
      <div className="text-center mb-12">
        <p className="text-apple-subtext text-sm font-medium uppercase tracking-widest mb-4">Live Session</p>
        <h1 className="text-3xl font-semibold tracking-tight">Listening...</h1>
      </div>
      
      {/* Voice Visualizer Placeholder */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        <div className="absolute inset-0 bg-apple-accent/10 rounded-full animate-ping"></div>
        <div className="relative z-10 w-32 h-32 bg-gradient-to-b from-blue-400 to-apple-accent rounded-full shadow-[0_0_40px_rgba(0,113,227,0.4)]"></div>
      </div>

      {/* Controls Placeholder */}
      <div className="mt-16 flex gap-6">
        <div className="h-14 w-14 rounded-full bg-gray-200 animate-pulse"></div>
        <div className="h-14 w-14 rounded-full bg-red-100 animate-pulse"></div>
      </div>
    </div>
  );
}