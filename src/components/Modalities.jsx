import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const sections = [
  {
    title: "CBT For Neurodivergent Individuals: A Flexible, Affimring Approach",
    content: (
      <>
      <p className="text-lg"> 
        Taditional Cognitive Behavioral Therapy (CBT) often assumes that everyone experiences emotions, thoughts, and behaviors in the same way — but for 
        neurodivergent individuals, this approach can fall short. Many CBT strategies focus on identifying “distorted” thoughts or changing behaviors to fit societal norms, 
        which can unintentionally reinforce ableism or overlook the unique ways neurodivergent people process the world.
      </p>
        <h4 className="text-2xl text-center font-semibold mt-2">We tailor CBT to meet you where you are by:</h4>
        <ul className="list-disc ml-6 mb-4 text-lg">
          <li>Validating your experiences instead of labeling thoughts as wrong or distorted.</li>
          <li>Focusing on practical coping strategies that work for your unique brain, including managing executive functioning challenges and sensory sensitivities.</li>
          <li>PEncouraging self-acceptance by recognizing that your way of processing the world is valid.</li>
          </ul>
        </>
    )
  },
  {
    title: "Somatic Therapy",
    content: (
      <>
      <p className="text-lg"> 
        Somatic therapy focuses on the connection between mind and body. It helps you become more aware of how emotions, stress, and past experiences live in your body—so 
        you can begin to release tension, regulate your nervous system, and feel more grounded. This approach is especially helpful for individuals who have experienced trauma, sensory overwhelm, 
        or disconnection from their physical selves. We use body-based practices gently and respectfully, always at your pace.
      </p>
      <h4 className="text-2xl text-center font-semibold mt-2">How Does Somatic Therapy Work?:</h4>
        <ul className="list-disc ml-6 mb-4 text-lg">
          <li>Focuses on the connection between your body, brain, and emotions.</li>
          <li>Helps you notice how stress, trauma, and overwhelm live in the body.</li>
          <li>Supports nervous system regulation through movement, grounding, or sensory practices.</li>
          <li>Affirms your sensory needs without judgment or pressure to “tolerate more."</li>
          <li>Encourages reconnection with your body at a pace that feels safe.</li>
          <li>Especially helpful for those who experience shutdowns, sensory overload, or chronic physical tension.</li>
          </ul>
        </>
    )
  },
  {
    title: "Narrative Therapy",
    content: (
      <>
      <p className="text-lg"> 
        Narrative therapy helps you explore and rewrite the stories you’ve internalized about yourself—often shaped by systems, labels, or past experiences. Rather than seeing problems as 
        something within you, narrative therapy externalizes them and focuses on your strengths, values, and preferred identity. This approach is powerful for clients who’ve been 
        marginalized or misunderstood, especially those with ADHD, autism, or queer identities.
      </p>
      <h4 className="text-2xl text-center font-semibold mt-2">What does Narrative Therapy Look Like?:</h4>
        <ul className="list-disc ml-6 mb-4 text-lg">
          <li>Helps you explore and rewrite the stories you’ve internalized about yourself.</li>
          <li>Views problems as separate from the person—not something wrong with you.</li>
          <li>Highlights strengths, values, and identity over pathology or deficits.</li>
          <li>Affirms the impact of systemic oppression, ableism, and neurotypical norms.</li>
          </ul>
        </>
    )
  },
  {
    title: "Compassion-Focused Therapy",
    content: (
      <>
      <p className="text-lg"> 
        Self-compassion therapy encourages a kind, understanding relationship with yourself—especially in moments of struggle. Rooted in the idea that you are not broken, 
        this approach helps neurodivergent individuals move away from shame, masking, and internalized ableism.
      </p>
        <h4 className="text-2xl text-center font-semibold mt-2">What does Compassion-Focused Therapy Look Like?:</h4>
        <ul className="list-disc ml-6 mb-4 text-lg">
          <li>Focuses on building kindness toward yourself—especially during moments of stress or struggle.</li>
          <li>Helps reduce internalized shame, self-criticism, and pressure to mask.</li>
          <li>Supports emotional regulation through gentle, non-judgmental practicesd.</li>
          </ul>
        </>
    )
  },
]

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