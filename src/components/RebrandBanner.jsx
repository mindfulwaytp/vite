import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Rebrand notice: Mindful Way Therapy → Kaleidospark Therapy.
// The wording flips on its own on SWITCH_DATE, and the banner disappears after
// HIDE_AFTER, so nobody has to remember to edit this on the day.
const SWITCH_DATE = new Date('2027-01-01T00:00:00');
const HIDE_AFTER = new Date('2027-07-01T00:00:00');
const INFO_PATH = '/our-new-name';

const PHASES = {
  before: {
    // Separate keys per phase: closing the "becoming" notice in December
    // shouldn't hide the "formerly" notice in January.
    storageKey: 'rebrand-banner-dismissed-before',
    text: (
      <>
        Mindful Way Therapy is becoming <strong>Kaleidospark Therapy</strong> in
        January 2027. Same therapists, same care.
      </>
    ),
  },
  after: {
    storageKey: 'rebrand-banner-dismissed-after',
    text: (
      <>
        <strong>Kaleidospark Therapy</strong>, formerly Mindful Way Therapy. Same
        therapists, same care.
      </>
    ),
  },
};

function readDismissed(key) {
  try {
    return window.localStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

export default function RebrandBanner() {
  const now = new Date();
  const phase = PHASES[now < SWITCH_DATE ? 'before' : 'after'];
  const [dismissed, setDismissed] = useState(() => readDismissed(phase.storageKey));

  if (now >= HIDE_AFTER || dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(phase.storageKey, '1');
    } catch {
      // Private browsing etc. It just won't stay closed next visit.
    }
  };

  return (
    <div
      role="region"
      aria-label="Name change announcement"
      className="bg-[#3A2340] text-[#FBF6EE] text-sm"
    >
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-3">
        <p className="flex-1 text-center leading-snug">
          {phase.text}{' '}
          <Link to={INFO_PATH} className="underline underline-offset-2 whitespace-nowrap text-[#F08A6B] hover:opacity-80">
            Learn more
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss name change announcement"
          className="shrink-0 text-xl leading-none px-1 hover:opacity-70"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
