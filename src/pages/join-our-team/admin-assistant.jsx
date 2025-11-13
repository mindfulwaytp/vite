import { useNavigate } from 'react-router-dom';

export default function AdminJob() {
  const navigate = useNavigate();
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="inline-block mb-6 bg-sky-700 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition"
        aria-label="Go back"
      >
        ← Back to Job Listings
      </button>
      <h1 className="text-2xl text-center font-bold text-sky-700 mb-4">
        Virtual Administrative Assistant
      </h1>

      <h3 className="text-xl text-center font-bold text-sky-700 mt-8 mb-2">Description</h3>
      <p className="text-xl text-gray-700 mb-6">
        Mindful Way Therapy is looking to hire a virtual administrative assistant to support our rapidly growing mental health practice. 
        This role begins as a per diem position for the first 6 months while we assess call volume, referral flow, and administrative workload. After 6 months, we will evaluate the workload and may offer permanent hours based on need.
      </p>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Benefits</h3>
        <ul className="text-xl list-disc list-outside ml-6 text-gray-700 mb-6 space-y-2">
          <li>Work from home</li>
          <li>All employees are entitled to the applicable laws in Washington (1 hour per 40 hours worked)</li>
                 </ul>


      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Position Hours</h3>
      <ul className="text-xl list-disc list-outside ml-6 text-gray-700 mb-6 space-y-1">
        <li>Per-diem, mast of 15 hours per week; after 6 months, will evaluate workload for permanent hours.</li>
      </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-6 mb-2">Location</h3>
      <ul className="text-xl list-disc list-outside ml-6 text-gray-700 mb-6 space-y-1">
        <li className="italic">Work from home-private/confidential space required</li>
      </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Salary</h3>
      <ul className="text-xl list-disc list-outside ml-6 text-gray-700 mb-6 space-y-1">
        <li>$25/hour</li>
      </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-6 mb-2">Primary Responsibilities</h3>
      <ul className="text-xl list-disc list-outside ml-6 text-gray-700 mb-6 space-y-1">
        <li>Serve as the first point of contact for incoming calls, voicemails, and emails.</li>
        <li>Conduct brief phone intakes and match clients to appropriate providers.</li>
        <li>Assist clients/clinicians with scheduling, rescheduling, and navigating our onboarding process.</li>
        <li>Track incoming referrals, gather necessary client information, and enter new clients into our Electronic Health Record (EHR).</li>
        <li>Send and monitor intake paperwork (consent forms, policies, assessment packets).</li>
        <li>Manage waitlists and coordinate openings with providers.</li>
      </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-6 mb-2">Minimum Requirements</h3>
      <ul className="text-xl list-disc list-outside ml-6 text-gray-700 mb-6 space-y-1">
        <li>Strong communication skills; warm, professional, clear, and patient.</li>
        <li>Highly organized, proactive, and comfortable managing multiple tasks.</li>
        <li>Able to work independently with minimal supervision once trained.</li>
        <li>Ability to maintain strict confidentiality and follow HIPAA guidelines.</li>
        <li>Prior experience working in a medical office setting.</li>
      </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-6 mb-2">Preferred</h3>
      <ul className="text-xl list-disc list-outside ml-6 text-gray-700 mb-6 space-y-1">
        <li>Prior experience working in a mental health office setting.</li>
        <li>Experience working with medical billing and insurance.</li>
        <li>Marketing/design, website management (for special projects)</li>
      </ul>

      <p className="text-gray-600 mt-4 italic">
        Note: In compliance with Seattle's Fair Chance Employment Ordinance, we do not inquire about criminal backgrounds in the hiring process.
      </p>

      <div className="mt-8">
        <a
          href="https://form.jotform.com/253166011840145"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-sky-700 text-white px-6 py-3 rounded-lg  hover:bg-sky-700 transition"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}

