import { useRouter } from 'next/router';
import BookShelf from '../../../components/BookShelf';

export default function CategoryResourcePage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) return <p className="text-gray-500">Loading...</p>;

  const titleMap = {
    autism: 'Books on Autism',
    adhd: 'Books on ADHD',
    parents: 'Books for Parents',
    professionals: 'Books for Professionals',
    youth: 'Books for Children and Teens'
  };

  const subtitleMap = {
    autism:
      'Explore autistic experiences through books by autistic authors and trusted advocates.',
    adhd:
      'Discover empowering reads for navigating life with ADHD.',
    parents:
      'Support your child or teen with books that guide, inform, and validate your parenting journey.',
    professionals:
      'Recommended reading for clinicians, educators, and advocates working with neurodivergent populations.',
    youth:
      'Explore books written for (and even by!) autistic and ADHD voices that help .'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12 mb-6 scroll-smooth">
      <h1 className="text-4xl font-bold text-sky-700 mb-4">
        {titleMap[slug] || 'Resources'}
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        {subtitleMap[slug] ||
          'Browse selected resources tailored to this category.'}
      </p>
      <BookShelf category={slug} />
    </div>
  );
}
