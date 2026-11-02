import React from 'react';

export default function Logo({ light = false, size = 'md' }) {
  const isLarge = size === 'lg';
  return (
    <div className="flex items-center gap-3 select-none">
      <div
        className={`flex items-center justify-center rounded-lg bg-[#111827] border border-[#D6B66B]/60 ${
          isLarge ? 'w-11 h-11' : 'w-9 h-9'
        }`}
      >
        <svg
          viewBox="0 0 64 64"
          className={isLarge ? 'w-6 h-6' : 'w-5 h-5'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 16L32 48L46 16H39L32 33L25 16H18Z"
            fill="#D6B66B"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <span
          className={`font-serif-display font-bold tracking-tight leading-none ${
            isLarge ? 'text-xl' : 'text-lg'
          } ${light ? 'text-white' : 'text-[#111827]'}`}
        >
          Vedanta Institute
        </span>
        <span
          className={`text-[10px] font-medium tracking-wide mt-0.5 ${
            light ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          We Guide You to Achieve – Chase Excellence
        </span>
      </div>
    </div>
  );
}
