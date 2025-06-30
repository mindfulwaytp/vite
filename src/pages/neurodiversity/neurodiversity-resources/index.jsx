// pages/neurodiversity/neurodiversity-resources/index.js
import { Link } from 'react-router-dom';

const resourceCategories = [
  {
    slug: 'autism',
    title: 'Resources for Autism',
    description: 'Books, tools, and supports created by and for autistic individuals, families, and allies.',
    image: '/images/book_brain.jpg', // ✅ public path
  },
  {
    slug: 'adhd',
    title: 'Resources for ADHD',
    description: 'Guides and stories that support thriving with ADHD across age and identity.',
    image: '/images/adhd_blocks.jpg',
  },
  {
    slug: 'parents',
    title: 'Resources for Parents',
    description: 'Supportive resources for parenting neurodivergent kids and teens with care.',
    image: '/images/autism-parent.jpg',
  },
  {
    slug: 'professionals',
    title: 'Resources for Professionals',
    description: 'Curated books and guides for educators, therapists, and clinicians working with neurodivergent clients.',
    image: '/images/professionals-card.jpg',
  },
];

export default function NeurodiversityResources() {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-12 mb-6 scroll-smooth">
      {/* Hero Section */}
      <section className="bg-gray-200 py-10 px-4 rounded-lg mb-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 relative">
          {/* Video on the Left */}
          <div className="w-full md:w-2/3">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="rounded-xl shadow-lg w-full max-w-4xl mx-auto mb-4"
            >
              <source src="/videos/autism-loop.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Text box overlay */}
          <div className="w-full md:w-1/2 bg-white bg-opacity-95 rounded-lg shadow-lg p-8 -mt-12 md:-mt-0 md:absolute bottom-4 right-4 max-w-md md:max-w-sm">
            <h2 className="text-2xl font-bold mb-4">Understanding Autism</h2>
            <p className="text-gray-700 leading-relaxed text-base">
              Discover the richness of autistic experiences and the unique ways autistic individuals think, communicate, and engage with the world.
              By understanding autism, we can move toward greater acceptance and appreciation of the strengths, differences, and diversity within the autistic community.
            </p>
          </div>
        </div>
      </section>

      {/* Category Menu Grid */}
      <h1 className="text-4xl font-bold text-sky-700 mb-6">Neurodiversity Resource Library</h1>
      <p className="text-lg text-gray-700 mb-10">
        Explore resources curated for different communities within the neurodivergent spectrum. Select a category to find books,
        tools, and media that support learning, healing, and self-understanding.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {resourceCategories.map((category) => (
          <Link key={category.slug} to={`/neurodiversity/neurodiversity-resources/${category.slug}`}>
            <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col cursor-pointer">
              {category.image && (
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-2xl font-semibold text-sky-700 mb-2">{category.title}</h2>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </Link>

        ))}
      </div>
    </div>
  );
}
