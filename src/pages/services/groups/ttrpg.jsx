import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../../components/SEO';

const classes = [
  { icon: '🎭', cls: 'The Bard', trait: "Aren't afraid to speak up", detail: 'even when their voice shakes' },
  { icon: '🛡️', cls: 'The Paladin', trait: 'Can hold their nerve', detail: 'when the dungeon gets dark and the stakes get real' },
  { icon: '🌿', cls: 'The Cleric', trait: 'Know that no quest is won alone', detail: 'and are ready to trust their party' },
  { icon: '🗡️', cls: 'The Rogue', trait: 'See what others miss', detail: 'and use it to change the outcome' },
  { icon: '🔮', cls: 'The Wizard', trait: 'Think before they act', detail: 'and adapt when the plan falls apart' },
  { icon: '⚔️', cls: 'The Fighter', trait: "Are ready to find out what they're made of", detail: 'one quest at a time' },
];

const xpGains = [
  { icon: '🗣️', label: 'Self-Expression', detail: 'Find your voice at the table — and beyond it' },
  { icon: '🤝', label: 'Trust & Teamwork', detail: 'Learn to rely on others and be relied upon' },
  { icon: '🧠', label: 'Emotional Regulation', detail: 'Navigate high-stakes moments with your whole nervous system' },
  { icon: '💡', label: 'Creative Problem Solving', detail: "There's no one right way through a dungeon" },
  { icon: '💬', label: 'Communication', detail: 'Negotiate, advocate, and speak up for yourself' },
  { icon: '🌟', label: 'Finding Your People', detail: 'A party that gets you, quirks and all' },
];

const details = [
  { icon: '📅', label: 'Your Adventure Starts', value: 'Friday, July 3rd' },
  { icon: '⏰', label: 'Session Time', value: '5:30 PM – 7:00 PM' },
  { icon: '🗺️', label: 'Where', value: 'The Virtual Tavern (Zoom)' },
  { icon: '📆', label: 'Duration', value: '6–8 weeks' },
  { icon: '🎂', label: 'Ages', value: '13–17' },
  { icon: '💰', label: 'The Toll', value: '$40 / session' },
];

function TTRPGGroup() {
  return (
    <div className="bg-[#f3f6f9] text-gray-800">
      <SEO
        title="The Adventuring Party | Groups | Mindful Way Therapy"
        description="A virtual tabletop RPG therapeutic group for neurodiverse teens ages 13-17. Fridays starting July 3rd via Zoom."
      />

      {/* Hero */}
      <div className="mt-20 relative w-full overflow-hidden max-h-[420px]">
        <img
          src="/images/dnd.jpg"
          alt="The Adventuring Party"
          className="w-full max-h-[420px] object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4 bg-black/30">
          <div className="bg-white/85 text-black px-6 py-8 rounded-xl shadow-lg max-w-2xl text-center">
            <p className="text-sm font-semibold text-sky-700 uppercase tracking-widest mb-2">Group Therapy</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">The Adventuring Party</h1>
            <p className="text-base md:text-lg italic text-gray-600">A Tabletop RPG for Neurodiverse Adolescents</p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="bg-white py-16 px-4 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl font-bold text-sky-700 mb-3">Adventurers Wanted.</p>
          <p className="text-lg leading-relaxed text-gray-700">
            The dungeon won't clear itself — and your party is still a few members short.
            The Adventuring Party is a virtual tabletop RPG campaign for neurodiverse teens ages 13–17 where your party will face
            dungeons, wild beasts, and dangerous traps that no one character can handle alone. The adventure <em>is</em> the point.
            Will you answer the call?
          </p>
        </div>
      </section>

      {/* Character Class Cards */}
      <section className="bg-[#f3f6f9] py-16 px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-sky-700 mb-2 text-center">We are looking for adventurers who...</h2>
          <p className="text-center text-gray-500 text-sm mb-10 italic">Every great party needs every kind of hero.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {classes.map((c, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition">
                <div className="bg-sky-700 px-4 py-3 flex items-center gap-2">
                  <span className="text-2xl">{c.icon}</span>
                  <span className="text-white font-bold text-sm tracking-wide">{c.cls}</span>
                </div>
                <div className="px-4 py-4">
                  <p className="font-semibold text-gray-800 text-sm">{c.trait}</p>
                  <p className="text-gray-500 text-sm mt-1 italic">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* XP You'll Earn */}
      <section className="bg-amber-50 border-t border-b border-amber-100 py-16 px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-amber-800 mb-2 text-center">XP You'll Earn</h2>
          <p className="text-center text-amber-700 text-sm mb-10 italic">Real skills. Real growth. Rolled for the long campaign.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {xpGains.map((x, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-5 border border-amber-100 flex gap-4 items-start">
                <span className="text-3xl flex-shrink-0">{x.icon}</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{x.label}</p>
                  <p className="text-gray-500 text-sm mt-1">{x.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quest Details */}
      <section className="bg-white py-16 px-4 md:px-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-sky-700 mb-10 text-center">Quest Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {details.map((d, i) => (
              <div key={i} className="flex items-start gap-4 bg-[#f3f6f9] rounded-xl p-4 border border-gray-100">
                <span className="text-3xl flex-shrink-0">{d.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{d.label}</p>
                  <p className="text-gray-800 font-medium">{d.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-start gap-4 bg-[#f3f6f9] rounded-xl p-4 border border-gray-100 mb-4">
            <span className="text-3xl flex-shrink-0">🧙</span>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Your Quest Guides</p>
              <p className="text-gray-800 font-medium">Ryne Evans, MA, LMFT &amp; Julian Macke, MA, LMHCA</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 italic text-center mt-6">
            Powered by Critical Core&#8482; &mdash; A therapeutic RPG system designed by Game to Grow
          </p>
        </div>
      </section>

      {/* Register CTA */}
      <section className="bg-sky-700 text-white py-16 px-4 md:px-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Join the Party?</h2>
        <p className="text-lg mb-8 max-w-xl mx-auto">
          Spots are limited. Reach out to reserve your place at the table.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <Link
            to="/contact/adventuring-party"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            Register Now
          </Link>
          <a
            href="mailto:support@mindfulway-therapy.com"
            className="bg-white text-sky-700 font-semibold py-2 px-6 rounded shadow hover:bg-gray-100 transition"
          >
            support@mindfulway-therapy.com
          </a>
        </div>
        <Link
          to="/services/groups"
          className="text-sky-200 underline text-sm hover:text-white transition"
        >
          Back to All Groups
        </Link>
      </section>
    </div>
  );
}

export default TTRPGGroup;
