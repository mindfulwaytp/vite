import { useNavigate } from 'react-router-dom';

export default function Internships() {
  const navigate = useNavigate();
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="inline-block mb-6 bg-sky-700 text-white px-4 py-2 rounded-md hover:bg-sky-800 transition"
        aria-label="Go back"
      >
        ← Back to Job Listings
      </button>
      <h1 className="text-2xl text-center font-bold text-sky-700 mb-4">
        Master's Level Student Internship
      </h1>

        <h2 className="text-xl text-center font-bold text-sky-700 mt-8 mb-2">About our Internships</h2>    
            <p className="text-gray-700 mb-6">
                Mindful Way Therapy is excted to invite Master's-level students in Clinical Mental Health Counseling (CMHC), Marriage (Couples) and Family Therapy (MFT/CFT) programs to apply
                for an internship with us and become part of a team that strives to meet the needs of our community in working with diverse and marginalized communities. We are a practice that 
                is committed to dismantling the systems of oppression within mental health care and fostering a learning environment for students to gain hands-on clinical experience in providing
                psychotherapy while working alongside experienced professsionals in a safe and supportive enviroment.
            </p>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">We Value Candidates Who:</h3>
        <ul className="list-disc list-outside pl-4 text-gray-700 mb-6 space-y-1">
            <li>Have a passion for learning and professional development</li>
            <li>Are interested and have a passioon for working with diverse and underserved communities</li>
            <li>Bring a collaborative mindset and willingess to contrinute to a dynamic team enviroment.</li>
            <li>Come with a willingness to learn challenge themselves.</li>
        </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">As a Student-Intern, You Will:</h3>
      <ul className="list-disc list-outside pl-4 text-gray-700 mb-6 space-y-1">
        <li>Provide direct counseling services, including group and/or couples and family therapy</li>
        <li>Participate in weekly individual and/or dyadic supervision with our owner, Ryne Evans, MA, LMFT or our Clinical Supervisor, Troy Weber, MA, LMFT</li>              
        <li>Complete documentation including: intakes, treatment plans and weekly progress notes.</li>
        </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Benefits</h3>
      <ul className="list-disc list-outside pl-4 text-gray-700 mb-6 space-y-1">
        <li>Training opportunities, including ADHD assessments (open to students during their last 6 months of placement)</li>
        <li>All marketing to ensure a steady stream of referrals, and front-office support!</li>
        <li>Weekly supervision (individual and/or dyadic)</li>
        <li>Ability to idenitfy and work with your preferred clientele (based on business needs)</li>
      </ul>

      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Hour Expectations and Requirements</h3>
      <ul className="list-disc list-outside ml-6 text-gray-700 mb-6 space-y-2">
        <li>Practicum: 3–5 clients per week with a minimum of 7 hours of availability.</li>
        <li>Internship: 12–15 clients per week with 15–20 hours of availability.</li>
        <li className="italic ml-6">These hour requirements help to account for training, shadowing, our business needs and cancellations during your internship experience.</li>
        <li className="italic ml-6">Minimum hour requirements may vary based on your specific program including any specialties, and
          the length of your placement. These are minimum expectations, even if they result in you having
          more than the minimum hour requirements.</li>
      </ul>


      <h3 className="text-xl font-semibold text-sky-700 mt-8 mb-2">Location</h3>
      <ul className="list-disc list-outside pl-4 text-gray-700 mb-6 space-y-1">
        <li>Hybrid</li>
      </ul>

      <h2 className="text-xl font-semibold text-sky-700 mt-8 mb-2">About Ryne, the Owner of Mindful Way Therapy</h2>
        <p className="text-gray-700 mb-6">
        Ryne Evans is a Licensed Marriage and Family Therapist in Washington. He graduated from NorthCentral University (Now National University) 
        in 2019 an started a part-time private practice in January 2020 while working in community mental health. In 2022, Ryne shifted to working full time 
        in his private practice, and became fully licensed in June 2022.
        </p>
  
        <p className="text-gray-700 mb-6">
        Since early in his education as a therapist, Ryne always wanted to own his own practice with a specialization of working with the LGBTQ+ community, 
        and when his husband joined the practice in the Fall of 2023, the focus expanded to working with the neurodivergent community. In his work, Ryne practices
        from a relational and psychodynamic lens, meaning he sees clients as part of a system, rather than just an indiviudal.
        </p>

      <p className="text-gray-600 mt-4 italic">
        Note: In compliance with Seattle's Fair Chance Employment Ordinance, we do not inquire about criminal backgrounds in the hiring process.
      </p>

      <div className="mt-8 flex justify-center">
        <a
          href="https://form.jotform.com/251684509750059"
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
