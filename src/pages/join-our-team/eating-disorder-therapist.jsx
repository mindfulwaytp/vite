import { useNavigate } from 'react-router-dom';

export default function ADHDTherapistJob() {
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

      <h1 className="text-center text-2xl font-bold text-sky-700 mb-4">
        Eating Disorder Specialist
      </h1>

      <h3 className="text-xl text-center font-bold text-sky-700 mt-8 mb-2">Description</h3>
      <p className="text-xl text-gray-700 mb-6">
        At Mindful Way Therapy PLLC, we are seeking a compassionate and experienced therapist to join our team as an Eating Disorder Specialist. This role is ideal for a clinician 
        dedicated to supporting adolescents (14+) and adults navigating eating disorders, disordered eating, body image concerns, and related trauma. You will provide outpatient psychotherapy using a 
        weight-inclusive, HAES-aligned, and trauma-informed lens. Many of our clients have experienced shame, medical trauma, or invalidation in healthcare systems. You’ll play a key role in creating a 
        collaborative, affirming space where clients can explore their relationship with food and their bodies without fear of judgment or pathologizing. Experience working with co-occurring anxiety, 
        depression, trauma, neurodivergence, and LGBTQ+ identities is strongly preferred. Comfort collaborating with dietitians, medical providers, and higher levels of care is essential.
      </p>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Benefits</h3>
      <ul className="text-xl list-disc list-outside ml-6 text-gray-700 mb-6 space-y-1">
        <li className="font-extrabold">Make your own schedule!</li>
        <li>All employees are entitled to the applicable laws in Washington (1 hour per 40 hours worked)</li>
        <li>Paid admin time (1 hour per 5 client hours)</li>
        <li>CEU reimbursement (varies based on FTE status)</li>
        <li>Licensure reimbursement (varies based on FTE status)</li>
        <li>Health insurance: Beginning in 2026, we are offering a group health plan through Premera to full-time employees (we do not cover dependents or spouses at this time). The cost per pay period is approximately $125/pay period.</li>
        <li>PTO (up to 75 hours per year; full-time only. Restrictions apply on how much can be used on a given day. Will discuss during interview)</li>
        <li>Eligible site for WA Health Service Corps (loan repayment up to $75,000 over 3–5 years)</li>
        <li>All marketing to ensure a steady stream of referrals, and front-office support!</li>
        <li>Licensure supervision</li>
      </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Job Type</h3>
      <ul className="text-xl list-disc list-outside ml-6 text-gray-700 mb-6 space-y-1">
        <li>Part-time: minimum 12 clients per week (scheduling 15)</li>
        <li>Full-time: minimum 22 clients per week (scheduling 25)</li>
      </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Location</h3>
      <ul className="text-xl list-disc list-outside ml-6 text-gray-700 mb-6 space-y-1">
        <li className="italic">Remote/Hybrid to start with the possibility of in-person in the future</li>
      </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Salary Range</h3>
      <ul className="text-xl list-disc list-outside ml-6 text-gray-700 mb-6 space-y-1">
        <li>Starting at $42.75 for associates (increase after 9 months)</li>
        <li>Starting at $52.75 for fully-licensed (increase after 9 months)</li>
        <li>Admin rate: $30/hour (1 hour per 5 hours worked; max of 15 hours per month)</li>
        <li>Sliding scale and pro-bono is a reduced rate</li>
      </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Responsibilities</h3>
      <ul className="text-xl list-disc list-outside ml-6 text-gray-700 mb-6 space-y-1">
        <li>Provide outpatient psychotherapy to adolescents (14+) and adults experiencing eating disorders, disordered eating, body image concerns, and related trauma</li>
        <li>Support clients navigating co-occurring concerns such as anxiety, depression, trauma, neurodivergence (ADHD/autism), and LGBTQ+ identity-related stress</li>
        <li>Utilize a weight-inclusive, HAES-aligned, and trauma-informed approach to care</li>
        <li>Maintain timely, accurate clinical documentation in accordance with practice standards and Washington State regulations</li>
        <li>Collaborate with dietitians, medical providers, and higher levels of care as needed to support clients' holistic well-being</li>
        <li>Stay up-to-date on best practices and research in eating disorder treatment</li>
        <li>Participate in bi-weekly case consultation and supervision as required by state law</li>
      </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Minimum Requirements</h3>
      <ul className="text-xl list-disc list-outside ml-6 text-gray-700 mb-6 space-y-1">
        <li>Master's degree in Marriage and Family Therapy, Clinical Mental Health Counseling, or Social Work</li>
        <li>Associate license (LMFTA, LMHCA, LSWAIC) in the state of Washington</li>
        <li>Ability to work independently and as part of a team</li>
        <li>Experience working with clients with eating disorders and related concerns</li>
      </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Preferred</h3>
      <ul className="text-xl list-disc list-outside ml-6 text-gray-700 mb-6 space-y-1">
        <li>Fully licensed therapist in Washington</li>
        <li>Physically located in Washington State</li>
      </ul>

      <p className="text-gray-600 mt-4 italic">
        Note: In compliance with Seattle's Fair Chance Employment Ordinance, we do not inquire about criminal backgrounds in the hiring process.
      </p>

      <div className="mt-8 flex justify-center">
        <a
          href="https://form.jotform.com/251684509750059"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-sky-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-700 transition"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}
