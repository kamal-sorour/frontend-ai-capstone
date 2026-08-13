// src/playground/components/Disclosure.tsx
import { useState } from 'react';

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
}

export default function Disclosure({ title, children }: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = `disclosure-content-${title.replace(/\s+/g, '-')}`;

  return (
    <div className="border rounded-md p-4 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full text-left font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {title}
      </button>
      <div id={contentId} hidden={!isOpen} className="mt-2 text-gray-700">
        {children}
      </div>
    </div>
  );
}