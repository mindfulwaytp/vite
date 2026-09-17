import React from 'react';

// Full-bleed hero matching the /neurodiversity pages. Uses a real <img> rather
// than a CSS background so the photo carries alt text and can be indexed by
// image search — the visual result is the same.

export default function ServiceHero({ image, alt, title, subtitle, expectedFile }) {
  return (
    <div className="mt-20 relative w-full overflow-hidden h-[380px] md:h-[450px] bg-gray-200">
      {image ? (
        <img src={image} alt={alt || ''} className="w-full h-full object-cover object-center" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 border-b-2 border-dashed border-gray-300">
          <span className="text-gray-400 text-5xl mb-2" aria-hidden="true">
            &#128247;
          </span>
          <p className="text-sm font-semibold text-gray-500">Hero photo goes here</p>
          {expectedFile && (
            <code className="mt-1 text-xs text-gray-400">{expectedFile}</code>
          )}
          <p className="mt-1 text-xs text-gray-400">wide crop, roughly 1600 &times; 600</p>
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="bg-white/80 text-black px-6 py-8 rounded-xl shadow-md max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl mb-4">{title}</h1>
          {subtitle && <p className="text-base md:text-lg leading-relaxed">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
