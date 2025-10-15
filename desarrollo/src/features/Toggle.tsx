import { useState } from 'react';
import type { ReactNode } from 'react';

interface ToggleProps {
  children: ReactNode;
  title: string;
  style?: string;
  defaultOpen?: boolean;
}

export const Toggle = ({ children, title, style, defaultOpen = false }: ToggleProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  const toggleStyles = style
    ? `w-full cursor-pointer px-4 py-3 text-left transition-colors duration-200 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primaryEvent focus:ring-inset ${style}`
    : "w-full cursor-pointer px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between focus:outline-none";

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden bg-white shadow-sm">
      {/* Header del toggle - siempre visible */}
      <button
        onClick={toggleOpen}
        className={toggleStyles}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>

        {/* Icono de flecha */}
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Contenido expandible */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 text-gray-700 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};
