import React, { useState } from 'react';

// Alternating image/text section, matching the rhythm of the /neurodiversity
// pages but sized to sit inside the ServicesLayout sidebar column.
//
// `image` is optional. Until a photo is supplied, a labelled placeholder renders
// in its place showing the expected filename — so the layout reads correctly
// while photos are still being gathered, instead of a broken image icon.

function ImagePlaceholder({ expectedFile }) {
  return (
    <div className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-center p-4">
      <span className="text-gray-400 text-4xl mb-2" aria-hidden="true">
        &#128247;
      </span>
      <p className="text-sm font-semibold text-gray-500">Photo goes here</p>
      {expectedFile && (
        <code className="mt-1 text-xs text-gray-400 break-all">{expectedFile}</code>
      )}
      <p className="mt-2 text-xs text-gray-400">roughly 800 &times; 600</p>
    </div>
  );
}

export default function ServiceSection({
  title,
  image,
  alt,
  expectedFile,
  reverse = false,
  tinted = false,
  footer,
  children,
}) {
  // A page can name the photo it wants before the file exists. If the file is
  // missing the <img> errors and we swap in the placeholder, so dropping the
  // file into public/images/ is all it takes to make the photo appear.
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(image) && !failed;

  return (
    <section
      className={`rounded-2xl shadow-sm p-6 md:p-8 ${tinted ? 'bg-gray-100' : 'bg-white'}`}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className={reverse ? 'md:order-2' : ''}>
          {showImage ? (
            <img
              src={image}
              alt={alt || ''}
              onError={() => setFailed(true)}
              className="w-full rounded-xl shadow-lg"
            />
          ) : (
            <ImagePlaceholder expectedFile={expectedFile || image} />
          )}
        </div>
        <div className={reverse ? 'md:order-1' : ''}>
          <h2 className="text-2xl font-semibold mb-4 text-sky-700">{title}</h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-4">{children}</div>
        </div>
      </div>
      {/* Buttons and the like span the full card — they look cramped squeezed
          into one half-width column next to the photo. */}
      {footer && <div className="mt-6">{footer}</div>}
    </section>
  );
}

// Full-width text block for sections that don't get a photo — keeps the same
// card treatment so the page still reads as one rhythm.
export function ServiceTextSection({ title, tinted = false, children }) {
  return (
    <section
      className={`rounded-2xl shadow-sm p-6 md:p-8 ${tinted ? 'bg-gray-100' : 'bg-white'}`}
    >
      <h2 className="text-2xl font-semibold mb-4 text-sky-700">{title}</h2>
      <div className="text-lg text-gray-700 leading-relaxed space-y-4">{children}</div>
    </section>
  );
}
