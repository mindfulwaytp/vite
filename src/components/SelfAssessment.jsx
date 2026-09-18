import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Anonymous, client-side screening tool.
//
// COMPLIANCE NOTE — do not add network calls to this component.
// Responses are consumer health data under Washington's My Health My Data Act
// (RCW 19.373) and arguably PHI. The entire design depends on answers never
// leaving the browser: no fetch, no form post, no localStorage, no analytics
// events. State lives in memory and is gone when the tab closes. The page tells
// visitors this, so it has to stay true.

const OPTIONS = [
  { label: 'Not at all', value: 0 },
  { label: 'Several days', value: 1 },
  { label: 'More than half the days', value: 2 },
  { label: 'Nearly every day', value: 3 },
];

export default function SelfAssessment({
  name,
  prompt,
  items,
  bands,
  criticalItemIndex,
  criticalNote,
  attribution,
}) {
  const [answers, setAnswers] = useState(() => Array(items.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = answers.filter((a) => a !== null).length;
  const complete = answeredCount === items.length;
  const score = answers.reduce((sum, a) => sum + (a ?? 0), 0);
  const band = bands.find((b) => score >= b.min && score <= b.max);

  // Shown for ANY non-zero answer on the critical item, whatever the total —
  // someone can land in the lowest band and still endorse it.
  const criticalFlagged =
    criticalItemIndex != null && (answers[criticalItemIndex] ?? 0) > 0;

  const setAnswer = (i, value) =>
    setAnswers((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });

  const reset = () => {
    setAnswers(Array(items.length).fill(null));
    setSubmitted(false);
  };

  return (
    <div>
      <p className="mb-2">{prompt}</p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>This is a screening tool, not a diagnosis.</strong> It can help you put words to what
        you’re experiencing and give you somewhere to start.
      </p>
      <p className="text-sm text-gray-600 mb-6">
        Your answers stay on your device. Nothing is sent to us, saved, or recorded — closing this
        page erases them.
      </p>

      <ol className="space-y-5">
        {items.map((item, i) => (
          <li key={item}>
            <fieldset>
              <legend className="font-medium text-gray-900 mb-2">
                {i + 1}. {item}
              </legend>
              <div className="flex flex-wrap gap-2">
                {OPTIONS.map((opt) => {
                  const checked = answers[i] === opt.value;
                  return (
                    <label
                      key={opt.value}
                      className={`cursor-pointer text-sm rounded-full border px-4 py-1.5 transition ${
                        checked
                          ? 'bg-sky-700 text-white border-sky-700'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-sky-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`${name}-q${i}`}
                        value={opt.value}
                        checked={checked}
                        onChange={() => setAnswer(i, opt.value)}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={!complete}
          className={`font-semibold py-2 px-5 rounded-lg border-2 transition ${
            complete
              ? 'bg-sky-700 border-sky-700 text-white shadow hover:bg-sky-800 hover:border-sky-800'
              : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          See my result
        </button>
        {!complete && (
          <span className="text-sm text-gray-600">
            {answeredCount} of {items.length} answered
          </span>
        )}
        {(submitted || answeredCount > 0) && (
          <button
            type="button"
            onClick={reset}
            className="text-sm text-sky-700 underline"
          >
            Start over
          </button>
        )}
      </div>

      {submitted && complete && (
        <div className="mt-8" role="status">
          {criticalFlagged && (
            <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-5 mb-5">
              <p className="font-semibold text-gray-900 mb-2">{criticalNote}</p>
              <p className="text-gray-800">
                Call or text{' '}
                <a href="tel:988" className="text-sky-800 underline font-semibold">988</a> to reach the
                Suicide &amp; Crisis Lifeline — free, any time. If you are in immediate danger, call{' '}
                <a href="tel:911" className="text-sky-800 underline font-semibold">911</a>. You can also
                call us at{' '}
                <a href="tel:+13603472559" className="text-sky-800 underline font-semibold">
                  360-347-2559 x1
                </a>
                .
              </p>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">Your result</p>
            <p className="text-2xl font-bold text-sky-800 mb-1">
              {score} of {items.length * 3}
            </p>
            <p className="text-lg font-semibold text-gray-900 mb-3">{band.label}</p>
            <p className="text-gray-700 mb-4">{band.meaning}</p>

            <p className="text-gray-700 mb-4">
              <strong>This is a screening tool, not a diagnosis.</strong> It cannot tell you whether you
              have depression — only a conversation with a clinician can do that, and scores like this
              one are a starting point for that conversation rather than a substitute for it.
            </p>

            <p className="text-gray-700 mb-4">
              It is also worth mentioning persistent symptoms to a primary care provider. Some things
              that look like depression have medical contributors — thyroid, anemia, sleep disorders,
              medication side effects — that therapy alone will not address.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact/therapy"
                className="flex-1 text-center bg-sky-700 border-2 border-sky-700 text-white font-semibold py-2 px-5 rounded-lg shadow hover:bg-sky-800 hover:border-sky-800 transition"
              >
                Talk to Someone Here
              </Link>
              <a
                href="tel:+13603472559"
                className="flex-1 text-center border-2 border-sky-700 text-sky-700 font-semibold py-2 px-5 rounded-lg hover:bg-sky-50 transition"
              >
                Call 360-347-2559 x1
              </a>
            </div>
          </div>
        </div>
      )}

      {attribution && <p className="text-xs text-gray-500 mt-6">{attribution}</p>}
    </div>
  );
}
