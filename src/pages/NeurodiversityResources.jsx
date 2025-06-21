import React from 'react';
import BookShelf from '../components/BookShelf';

function NeurodiversityResources() {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-12 mb-6 scroll-smooth">
      {/* Video & Intro Section */}
      <section className="bg-gray-200 py-10 px-4 rounded-lg mb-8">
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

      {/* In-Page Navigation */}
      <nav className="sticky top-4 z-10 bg-white shadow-sm rounded-lg p-4 mb-12 flex flex-wrap gap-6 justify-center md:justify-start">
        <a href="#autism-books" className="text-xl text-sky-700 font-semibold hover:underline">Autism Books</a>
        <a href="#adhd-books" className="text-xl text-sky-700 font-semibold hover:underline">ADHD Books</a>
        <a href="#podcasts" className="text-xl text-sky-700 font-semibold hover:underline">Podcasts</a>
        <a href="#websites" className="text-xl text-sky-700 font-semibold hover:underline">Websites</a>
      </nav>

      {/* Autism Books Section */}
      <section id="autism-books" className="scroll-mt-24 mb-16">
        <h2 className="text-3xl font-bold text-sky-700 mb-4">Books on Autism</h2>
        <p className="text-lg text-gray-700 mb-4">
          Whether you're beginning to explore your own neurodivergence, supporting a loved one, or seeking deeper understanding, this collection is for you. We’ve gathered books by autistic authors and trusted voices that offer insight, affirmation, and guidance for individuals, families, and allies alike.
        </p>
        <p className="text-base font-bold italic text-gray-700 mb-6">
          Note: This site contains affiliate links to products. We may receive a commission for purchases made through these links at no additional cost to you.
        </p>
        <BookShelf category="autism" />
      </section>

      {/* ADHD Books Section */}
      <section id="adhd-books" className="scroll-mt-24 mb-16">
        <h2 className="text-3xl font-bold text-sky-700 mb-4">Books on ADHD</h2>
        <p className="text-lg text-gray-700 mb-4">
          Explore a curated selection of books that validate, inform, and support those navigating ADHD—whether newly diagnosed, self-discovering, or advocating for someone they love.
        </p>
        <BookShelf category="adhd" />
      </section>

      {/* Podcasts Section */}
      <section id="podcasts" className="scroll-mt-24 mb-16">
        <h2 className="text-3xl font-bold text-sky-700 mb-4">Podcasts</h2>
        <p className="text-lg text-gray-700 mb-4">
          Listen to neurodivergent voices and learn through personal stories, interviews, and discussions with experts.
        </p>
        <div className="bg-white rounded-lg p-4 shadow-md">[Podcasts coming soon]</div>
      </section>

      {/* Websites Section */}
      <section id="websites" className="scroll-mt-24 mb-16">
        <h2 className="text-3xl font-bold text-sky-700 mb-4">Websites & Articles</h2>
        <p className="text-lg text-gray-700 mb-4">
          Explore helpful websites, communities, and articles that offer support and advocacy for neurodivergent individuals.
        </p>
        <div className="bg-white rounded-lg p-4 shadow-md">[Websites coming soon]</div>
      </section>
    </div>
  );
}

export default NeurodiversityResources;
