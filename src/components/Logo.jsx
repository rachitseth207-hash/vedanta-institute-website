import React from 'react';

export default function Logo({ light = false, size = 'md' }) {
  const isLarge = size === 'lg';
  return (
    <div className="flex items-center gap-3 select-none group">
      <div
        className={`relative flex items-center justify-center rounded-xl bg-[#0B2545] border-2 border-[#F59E0B]/80 shadow-md transition-transform duration-300 group-hover:scale-105 ${
          isLarge ? 'w-13 h-13' : 'w-11 h-11'
        }`}
      >
        <svg
          viewBox="0 0 64 64"
          className={isLarge ? 'w-9 h-9' : 'w-7 h-7'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 6L54 16V31C54 45.2 44.4 55 32 58.5C19.6 55 10 45.2 10 31V16L32 6Z"
            fill="#1D4ED8"
            stroke="#F59E0B"
            strokeWidth="3"
          />
          <path
            d="M20 21L32 46L44 21H38L32 35L26 21H20Z"
            fill="#F59E0B"
          />
          <circle cx="32" cy="15" r="2.8" fill="#FFFFFF" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span
          className={`font-serif-display font-extrabold tracking-tight leading-none ${
             isLarge ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
          } ${light ? 'text-[#FFFFFF]' : 'text-[#0B2545]'}`}
        >
          VEDANTA <span className={light ? 'text-[#F59E0B]' : 'text-[#1D4ED8]'}>INSTITUTE</span>
        </span>
        <span
          className={`text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase mt-0.5 ${
            light ? 'text-[#F59E0B]/90' : 'text-[#1D4ED8]'
          }`}
        >
          We Guide You to Achieve – Chase Excellence
        </span>
      </div>
    </div>
  );
}

