import { useNavigate } from 'react-router-dom';

export default function ADHDTherapistJob() {
  const navigate = useNavigate();
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="inline-block mb-6 bg-sky-700 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition"
        aria-label="Go back"
      >
        ← Back to Job Listings
      </button>

      <h1 className="text-center text-2xl font-bold text-sky-700 mb-4">
        ADHD & Autism Therapist and Evaluator
      </h1>

      <h3 className="text-xl text-center font-bold text-sky-700 mt-8 mb-2">Description</h3>
      <p className="text-gray-700 mb-6">
        At Mindful Way Therapy PLLC, we are seeking a passioante and experienced therapist to join our team in providing
        outpatient psychotherapy and evaluations for ADHD and Autism. This role is ideal for a clinician who is
        dedicated to supporting neurodivergent clients with compassion, cultural humility, and identity-affirming care.
        While this role is primarily focused on providing therapy and conducting comprehensive assessments to neurodivergent individuals, you will also work with other presenting concerns. 
        As part of providing assessments, you will be trained to utilize standardized questionnaires and clinical interviews to provide accurate diagnoses
        and recommendations under the supervision of Ryne Evans, MA, LMFT. Many of our clients exploring a neurodivergent identity for the first time or seeking clarity
        after years of misdiagnosis or being misunderstood. You'll play a key role in creating a safe, validating space
        where clients can show up authentically and access meaningful support without fear of judgment or pathologizing.
      </p>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Benefits</h3>
      <ul className="list-disc list-outside ml-6 text-gray-700 mb-6 space-y-1">
        <li className="font-extrabold">Make your own schedule!</li>
        <li>All employees are entitled to the applicable laws in Washington (1 hour per 40 hours worked)</li>
        <li>Paid admin time (1 hour per 5 client hours)</li>
        <li>CEU reimbursement (varies based on FTE status)</li>
        <li>Licensure reimbursement (varies based on FTE status)</li>
        <li>Health insurance reimbursement (Up to $400/month; We hope to begin offering a group health plan later in 2026; only full-time)</li>
        <li>PTO (up to 75 hours per year; full-time only. Restrictions apply on how much can be used on a given day. Will discuss during interview)</li>
        <li>Eligible site for WA Health Service Corps (loan repayment up to $75,000 over 3–5 years)</li>
        <li>All marketing to ensure a steady stream of referrals, and front-office support!</li>
        <li>Licensure supervision</li>
      </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Job Type</h3>
      <ul className="list-disc list-outside ml-6 text-gray-700 mb-6 space-y-1">
        <li>Part-time: minimum 12 clients per week (scheduling 15)</li>
        <li>Full-time: minimum 22 clients per week (scheduling 25)</li>
        <li className="italic ml-4">Note: providing assessments counts towards these minimum hours; exact ratio will be discussed during interview</li>
      </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Location</h3>
      <ul className="list-disc list-outside ml-6 text-gray-700 mb-6 space-y-1">
        <li className="italic">Remote/Hybrid to start with the possibility of in-person in the future</li>
      </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Salary Range</h3>
      <ul className="list-disc ml-6 list-outside text-gray-700 mb-6 space-y-1">
        <li>Starting at $42.75 for associates (increase after 6 months)</li>
        <li>Starting at $52.75 for fully-licensed (increase after 6 months)</li>
        <li>Admin rate: $30/hour (1 hour per 5 hours worked; max of 15 hours per month)</li>
        <li>Sliding scale and pro-bono is a reduced rate</li>
        <li className="italic ml-4">Assessments are paid at your hourly rate + a set rate per written evaluation</li>
      </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Responsibilities</h3>
      <ul className="list-disc ml-6 list-outside text-gray-700 mb-6 space-y-1">
        <li>Provide individual and couples therapy sessions to clients, with a focus on LGBTQ+ affirming care</li>
        <li>Conduct comprehensive patient assessments utilizing intake forms and assessment questionnaires</li>
        <li>Maintain accurate medical documentation and adhere to HIPAA regulations</li>
        <li>Educate clients and families about mental health resources and coping strategies</li>
        <li>Stay up-to-date on best practices and research in LGBTQ+ affirmative therapy</li>
        <li>Coordinate care and collaborate with community agencies or external providers when necessary</li>
      </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Minimum Requirements</h3>
      <ul className="list-disc ml-6 list-outside text-gray-700 mb-6 space-y-1">
        <li>Master's degree in Marriage and Family Therapy, Clinical Mental Health Counseling, or Social Work</li>
        <li>Must have completed an internship that meets state requirements</li>
        <li>Associate license (LMFTA, LMHCA, LSWAIC) in the state of Washington</li>
        <li>Experience working with LGBTQ+ clients and strong understanding of affirmative therapy</li>
        <li>Excellent communication and interpersonal skills</li>
        <li>Ability to work independently and as part of a team</li>
      </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Preferred</h3>
      <ul className="list-disc ml-6 list-outside text-gray-700 mb-6 space-y-1">
        <li>Fully licensed therapist in Washington</li>
        <li>Physically located in Washington State</li>
        <li>Personal/lived experience with the LGBTQ+ community</li>
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
