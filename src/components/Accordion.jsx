import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { TbHexagonNumber1Filled, TbHexagonNumber2Filled, TbHexagonNumber3Filled } from "react-icons/tb";


const sections = [
  {
    title: "Common Signs of Autism & ADHD: Understanding the Neurodivergent Profile",
    content: (
      <>
      <p className="text-lg"> 
        Autism and ADHD manifest uniquely in each individual, creating brain styles that offer distinct strengths and diverse ways of interacting with the world. 
      Below are some common signs and traits seen in autism and ADHD. Remember, these signs are simply characteristics—valuable aspects of a neurodivergent brain style that bring both 
      differences and strengths.
      </p>
        <h4 className="text-2xl text-center font-semibold mt-2">Autism</h4>
        <ul className="list-disc ml-6 mb-4 text-lg">
          <li><strong>Strengths</strong></li>
          <ul className="text-lg ml-6 list-disc">
          <li>Focused Expertise: Deep interest and knowledge in specialized areas.</li>
          <li>Honesty: Known for clarity, authenticity, and directness in relationships.</li>
          <li>Pattern Recognition: Skilled at identifying structures, systems, and routines.</li>
          <li>Creative Problem-Solving: Unique approaches to innovation and solutions.</li>
          </ul>
        </ul>
        <ul className="list-disc ml-6 mb-4 text-lg">
          <li><strong>Differences</strong></li>
          <ul className="text-lg ml-6 list-disc">
          <li>Sensory Sensitivities: Lights, sounds, and textures can feel overwhelming at times.</li>
          <li>Social Communication: Interpreting social cues can be difficult, leading to occasional misunderstandings.</li>
          <li>Routine Dependence: Unexpected changes can be unsettling, but manageable with planning.</li>
          <li>Executive Functioning: Organizing and transitioning between tasks may require supportive tools.</li>
          <li>Emotional Intensity: Strong emotions can be challenging to regulate but manageable with the right strategies.</li>
          </ul>
        </ul>

        <h4 className="text-2xl text-center font-semibold mt-2">ADHD</h4>
        <ul className="list-disc ml-6 mb-4 text-lg">
          <li><strong>Strengths</strong></li>
          <ul className="text-lg ml-6 list-disc">
          <li>Creative Thinking: Individuals with ADHD often approach problems from fresh angles, generating innovative ideas and solutions..</li>
          <li>Dynamic Focus: They excel in environments where they can shift attention, exploring multiple interests and projects with energy.</li>
          <li>Adaptability: Quick to think on their feet, they’re often comfortable in fast-paced or ever-changing settings.</li>
          <li>Passion and Drive: When engaged, individuals with ADHD can be highly motivated and dedicated, putting great energy into things they care about.</li>
          </ul>
        </ul>
        <ul className="list-disc ml-6 mb-4 text-lg">
          <li><strong>Differences</strong></li>
          <ul className="text-lg ml-6 list-disc">
          <li>Inconsistent Focus: Staying on task can be challenging, especially with activities that lack immediate interest or reward.</li>
          <li>Impulsivity: Quick decisions and actions may sometimes lead to unintended consequences, particularly in structured settings.</li>
          <li>Time Management: Organizing tasks and managing time can be difficult, often requiring additional strategies for planning..</li>
          <li>Emotional Sensitivity: Emotions can be experienced intensely, and regulating them may be challenging without support.</li>
          <li>Restlessness: Feeling the need to be active or engaged can sometimes disrupt activities that require stillness.</li>
          </ul>
        </ul>
        </>
    )
  },
  {
    title: "Our Autism & ADHD (Comobined) Assessment Process",
    content: (
      <div className="space-y-8">
        {/* Step 1 */}
        <div className="flex items-start gap-4">
          <div className="text-sky-700 text-4xl shrink-0">
            <TbHexagonNumber1Filled />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">
              Screening Questionnaire & Assessments:
            </p>
            <p className="text-lg text-gray-700 mt-2">
              Our process begins with a pre-screening questionnaire designed to gain a clear understanding
              of your or your child’s experiences and reason for seeking an assessment. Based on the screening questionnaire:
            </p>
            <ul className="list-disc pl-6 mt-3 text-lg text-gray-700 space-y-2">
              <li>
                <span className="font-semibold">For Adolescents:</span> After receicing your screening questionnaire, we will provide assessments tailored to your child,
                which may include input from teachers. Parents will also be asked to complete a developmental history
                questionnaire to provide important background information.
              </li>
              <li>
                <span className="font-semibold">For Adults:</span> We will provide assessments tailored to your specific needs.
                If available, we may ask parents to complete a developmental history questionnaire. If this is not possible,
                you or someone who knew you well during childhood can complete a history questionnaire to the best of your ability.
              </li>
            </ul>
          </div>
        </div>
        {/* Step 2 */}
        <div className="flex items-start gap-4">
          <div className="text-sky-700 text-4xl shrink-0">
            <TbHexagonNumber2Filled />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">
              Clinical Interview:
            </p>
            <p className="text-lg text-gray-700 mt-2">
              Through a supportive and collaborative process, we’ll explore your (or your child’s) strengths and differences, preferences, and experiences. 
              This collaborative process helps us crate tailored, strength-based recommendations. When possible, we invite informants, including parents or others 
              familiar with your experiences, to provide additional insights. (3–4 sessions, 60 minutes each). At the end of your last session, you will receive a preliminary diagnosis.
            </p>
        </div>
      </div>
      {/* Step 3 */}
      <div className="flex items-start gap-4">
          <div className="text-sky-700 text-4xl shrink-0">
            <TbHexagonNumber3Filled />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">
              Feedback Session:
            </p>
            <p className="text-lg text-gray-700 mt-2">
              Approximately 3-4 weeks after your interview, you will meet with your provider approximately to go over a comprehensive written report that details the results 
              of the assessment and discuss treatment recommendations, accommodations if applicable, and supports.
            </p>
        </div>
      </div>
      {/* Assessments */}
      <div className="flex items-start gap-4">
        <p className="text-lg mx-auto text-center font-semibold text-gray-900">
          Assessment Measurements We May Use
        </p>
        </div>
        <div>
        <ul className="list-disc pl-6 mt-3 text-lg text-gray-700 space-y-2">
          <li>MIGDAS-2 (Monteiro Interview Guidelines for Diagnosing the Autism Spectrum, Second Edition)</li>
          <li>SRS-2 (Social Responsiveness Scale, Second Edition)</li>
          <li>BRIEF-2/2A (Behavior Rating Inventory of Executive Function, Second Edition/Adult Version)</li>
          <li>Adaptive Behavior Assessment System, Third Edition (ABAS-3)</li>
          <li>CAT-Q (Camouflaging Autistic Traits Questionnaire)</li>
          <li>RAADS-R (Ritvo Autism Asperger Diagnostic Scale-Revised)</li>
          <li>Adolescent/Adult Sensory Profile</li>
        </ul>
      </div>
    </div>
      )
    },
  {
    title: "Our ADHD Assessment Process",
    content: (
      <div className="space-y-8">
        {/* Step 1 */}
        <div className="flex items-start gap-4">
          <div className="text-sky-700 text-4xl shrink-0">
            <TbHexagonNumber1Filled />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">
              Screening Questionnaire & Assessments:
            </p>
            <p className="text-lg text-gray-700 mt-2">
              Our process begins with a pre-screening questionnaire designed to gain a clear understanding
              of your or your child’s experiences and reason for seeking an assessment. Based on the screening questionnaire:
            </p>
            <ul className="list-disc pl-6 mt-3 text-lg text-gray-700 space-y-2">
              <li>
                <span className="font-semibold">For Adolescents:</span> After receicing your screening questionnaire, we will provide assessments tailored to your child,
                which may include input from teachers. Parents will also be asked to complete a developmental history
                questionnaire to provide important background information.
              </li>
              <li>
                <span className="font-semibold">For Adults:</span> We will provide assessments tailored to your specific needs.
                If available, we may ask parents to complete a developmental history questionnaire. If this is not possible,
                you or someone who knew you well during childhood can complete a history questionnaire to the best of your ability.
              </li>
            </ul>
          </div>
        </div>
        {/* Step 2 */}
        <div className="flex items-start gap-4">
          <div className="text-sky-700 text-4xl shrink-0">
            <TbHexagonNumber2Filled />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">
              Clinical Interview:
            </p>
            <p className="text-lg text-gray-700 mt-2">
              Through a supportive and collaborative process, we’ll explore your (or your child’s) strengths and differences, preferences, and experiences. 
              This collaborative process helps us crate tailored, strength-based recommendations. When possible, we invite informants, including parents or others 
              familiar with your experiences, to provide additional insights. (1-2 sessions, 60 minutes each). At the end of your last session, you will receive a preliminary diagnosis.
            </p>
        </div>
      </div>
      {/* Step 3 */}
      <div className="flex items-start gap-4">
          <div className="text-sky-700 text-4xl shrink-0">
            <TbHexagonNumber3Filled />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">
              Feedback Session:
            </p>
            <p className="text-lg text-gray-700 mt-2">
              Approximately 2-3 weeks after your interview, you will meet with your provider approximately to go over a comprehensive written report that details the results 
              of the assessment and discuss treatment recommendations, accommodations if applicable, and supports.
            </p>
        </div>
      </div>
      {/* Assessments */}
      <div className="flex items-start gap-4">
        <p className="text-lg mx-auto text-center font-semibold text-gray-900">
          Assessment Measurements We May Use
        </p>
        </div>
        <div>
        <ul className="list-disc pl-6 mt-3 text-lg text-gray-700 space-y-2">
          <li>BRIEF-2/2A (Behavior Rating Inventory of Executive Function, Second Edition/Adult Version)</li>
          <li>Adaptive Behavior Assessment System, Third Edition (ABAS-3)</li>
          <li>Barkley Adult ADHD Rating Scale (BAARS)</li>
        </ul>
      </div>
    </div>
      )
    },
  {
    title: "Asssment Costs, FAQs and Disclosures",
    content: (
      <div className="space-y-6">
        <h4 className="text-2xl text-center font-semibold mt-2">Assessment Costs</h4>
        <ul className="list-disc ml-6 mb-4 text-lg">
          <li><strong>Q: How much does an Autism (or combined Autism and ADHD) assessment costs?</strong></li>
          <ul className="text-lg ml-6 list-disc">
          <li><strong>Commercial Insurance:</strong> There are several factors that go into the costs for your assessment, including: deductible, copay's and co-insurance amounts. Additionally, as we are master's level clinicians, insurance does not reimburse us for scoring/interpreting assessments or report writing. Because of this, we charge <strong>$550</strong> for the report writing portion of your assessment.</li>
          <li><strong>Medicaid:</strong> There are no costs associated with your individual sessions with your provider, however, as with commercial insurance, Medicaid does not reimburse us for the scoring/interpretation of your assessments or report writing. Because of this, we charge a nomnial fee of <strong>$50-100</strong> to cover the costs of report writing.</li>
          <li><strong>Private Pay:</strong> For those choosing not to use insurance or who do not have insurance, the full cost of the assessment is <strong>$1,100</strong>, which includes 4 sessions with your provider (additional sessions are $125/each, and will be discussed with you first), report writing and the feedback session. All payments are due by the final individual session.</li>
          </ul>
        </ul>
        <ul className="list-disc ml-6 mb-4 text-lg">
          <li><strong>Q: How much does an ADHD only assessment costs?</strong></li>
          <ul className="text-lg ml-6 list-disc">
          <li><strong>Commercial Insurance:</strong> There are several factors that go into the costs for your assessment, including: deductible, copay's and co-insurance amounts. Additionally, as we are master's level clinicians, insurance does not reimburse us for scoring/interpreting assessments or report writing. Because of this, we charge <strong>$275</strong> for the report writing portion of your assessment.</li>
          <li><strong>Medicaid:</strong> There are no costs associated with your individual sessions with your provider, however, as with commercial insurance, Medicaid does not reimburse us for the scoring/interpretation of your assessments or report writing. Because of this, we charge a nomnial fee of <strong>$50-100</strong> to cover the costs of report writing.</li>
          <li><strong>Private Pay:</strong> For those choosing not to use insurance or who do not have insurance, the full cost of the assessment is <strong>$600</strong>, which includes 2 sessions with your provider (additional sessions are $125/each, and will be discussed with you first), report writing and the feedback session. All payments are due by the final individual session.</li>
          </ul>
        </ul>       
    </div>
    
      )
    },
  ];

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <div key={index} className="border border-gray-200 rounded-xl shadow-sm">
          <button
            onClick={() => toggleSection(index)}
            className="w-full flex justify-between items-center p-4 text-left text-lg font-semibold text-sky-800 hover:bg-gray-50 rounded-t-xl"
          >
            {section.title}
            {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {openIndex === index && (
            <div className="p-4 bg-white rounded-b-xl text-gray-700">{section.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}
