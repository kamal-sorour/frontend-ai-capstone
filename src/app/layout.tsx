import './globals.css';
import Link from 'next/link';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: 'VoxPrep | AI Voice Interviews',
  description: 'Master your technical interviews with real-time AI voice sessions.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-apple-bg text-apple-text antialiased min-h-screen flex flex-col font-sans">
        {/* Apple-style frosted glass navbar */}
        <nav className="sticky top-0 z-50 bg-apple-surface/70 backdrop-blur-md border-b border-gray-200/50">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="font-semibold text-xl tracking-tight">VoxPrep</Link>
            <div className="space-x-8 text-sm font-medium text-apple-subtext">
              <Link href="/dashboard" className="hover:text-apple-text transition-colors">Dashboard</Link>
              <Link href="/studio" className="hover:text-apple-text transition-colors">Studio</Link>
              <Link href="/health" className="hover:text-apple-text transition-colors">System</Link>
            </div>
          </div>
        </nav>
        
        <main className="flex-1 w-full max-w-5xl mx-auto p-6 sm:p-10">
          {children}
        </main>
      </body>
    </html>
  );
}