import { Link } from 'react-router-dom';
import employmentImage from '../../assets/employmentimage.avif'; // or whatever your file is named


const jobListings = [
  {
    id: 'lgbtq-therapist',
    title: 'LGBTQ+ Affirming Therapist',
    location: 'Remote (WA) | U-Disctrict',
    type: 'Part-Time or Full-Time',
    summary: 'Provide compassionate, affirming care for LGBTQ+ clients across the lifespan.',
  },
  {
    id: 'adhd-therapist',
    title: 'ADHD & Autism Therapist and Evaluator',
    location: 'Remote (WA) | U-Disctrict',
    type: 'Part-Time or Full-Time',
    summary: 'Provide specialized and neurodivergent-affimring therapy and evaluations for ADHD and Autism',
    },
 {
    id: 'internships',
    title: 'Master Level Student Intern',
    location: 'Remote (WA) | U-Disctrict',
    summary: 'Masters-level student internship/practicum experience (CMHC/LMFT/MSW)',
    },
  // You can add more jobs here
];

function JobBoard() {
  return (
    <div className="px-4 py-12 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl text-sky-700 mb-6">Employment & Internship Opportunities</h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-5xl mx-auto">
          Mindful Way Therapy is looking for highly qualified master's level mental health clinicians of all specialties
          (LMFT/A, LMHC/A, LICSW/LSWAIC), as well as masters level student interns, to join our expanding group practice. By working at Mindful Way, you will be part
          of a team of clinicians who are excited to work with historically underserved clinical populations, including the
          LGBTQ+ community, BIPOC, and neurodivergent individuals.
        </p>
        <div className="mt-8">
          <img
            src={employmentImage}
            alt="Therapist taking notes during session"
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>
        <h1 className="text-3xl md:text-4xl text-sky-700 mt-8 mb-6">About Mindful Way Therapy</h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-5xl mx-auto">
            Mindful Way Therapy is a queer-owned group practice in Seattle, WA, in the heart of the University District. We offer individual, family and couples therapy, as well as ADHD and Autism evaluations, as well as gender-affirming care letters for those seeking medical transition interventions. 
            
        </p>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-5 max-w-5xl mx-auto">
            Mindful Way was started in 2020 under the name of Mindfulway Psychotherapy, and rebranded in 2023 when Ryne, the practice owner, transitioned to a group practice. Since then, 
            Mindful Way has expanded rapidly, servicing more than 175 clients, many of whom are on Medicaid (Apple Health), with the support over over 10 clinicians and interns.
        </p>
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl  text-sky-700 mb-6 text-center">Voices from Our Team</h2>

      </div>
      
      {/* Job Listings Section */}
      <div className="text-center mt-16">
        <h2 className="text-2xl  text-sky-700 mb-6 text-center">Current Employment and Internship Openings</h2>
        <p className="italic text-lg md:text-xl text-gray-700 leading-relaxed max-w-5xl mx-auto mb-6">
            Our Fall 2025 internship positions are full. We are accepting applications for Winter 2025 (For a Nov-Jan start and begin interviewing in September)
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {jobListings.map((job) => (
            <Link
              key={job.id}
              to={`/join-our-team/${job.id}`}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition"
            >
              <h3 className="text-xl  text-gray-800 mb-1">{job.title}</h3>
              <p className="text-base  text-sky-700 mb-1">{job.location}</p>
              <p className="text-base  text-sky-700 mb-2">{job.type}</p>
              <p className="text-gray-700 text-base">{job.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobBoard;