// Single source of truth for the Services and Specialties groupings.
//
// These lists previously lived in three places — Header.jsx, ServicesLayout.jsx
// and Services.jsx — which is how two pages ended up duplicated across the
// Neurodiversity and Services menus, and how a renamed page got missed.
//
// Two axes, deliberately separate:
//   SERVICES    = how care is delivered  (individual, couples, groups, assessments)
//   SPECIALTIES = what we help with      (autism/ADHD, queer, non-monogamy, ...)
//
// `path` is where the page actually lives, which is not always under the
// matching URL segment. Autism & ADHD therapy and assessments stay under
// /neurodiversity because they already have inbound links and a redirect
// pointing at them — moving them again would build a redirect chain. Where a
// page lives and which menu it appears in are independent.

export const SERVICE_LINKS = [
  {
    label: 'Individual Therapy',
    path: '/services/individual-therapy',
    image: 'images/individual-therapy-card.avif',
    description:
      'A supportive space to explore your identity, process life challenges, and build emotional resilience.',
  },
  {
    label: 'Couples & Family Therapy',
    path: '/services/couples-family-therapy',
    image: 'images/couples-family-therapy-card.jpg',
    description:
      'Support for deeper connection, improved communication, and authentic relationships.',
  },
  {
    label: 'Groups',
    path: '/services/groups',
    image: 'images/groups-hero.jpg',
    description:
      'Facilitated groups where you can connect with people navigating similar experiences.',
  },
  {
    label: 'Autism & ADHD Assessments',
    path: '/services/autism-adhd-assessments',
    image: 'images/autism-adhd-assessments-card.avif',
    description:
      'Comprehensive assessments for teens and adults using a strengths-based, affirming approach.',
  },
];

export const SPECIALTY_LINKS = [
  {
    label: 'Autism & ADHD',
    path: '/specialties/autism-adhd-therapy',
    image: 'images/autism-adhd-therapy-card.avif',
    description:
      'Neurodivergent-affirming therapy that works with your brain rather than against it.',
  },
  {
    label: 'Depression',
    path: '/specialties/depression',
    image: 'images/depression-card.jpg',
    description:
      'For exhaustion, numbness, and loss of interest — including depression that turns out to be something else.',
  },
  {
    label: 'LGBTQ+ & Queer',
    path: '/specialties/queer-affirming-therapy',
    image: 'images/queer-affirming-therapy-hero.jpg',
    description:
      'Affirming care from a queer-owned practice — identity, coming out, minority stress, and trauma.',
  },
  {
    label: 'Polyamory & Non-Monogamy',
    path: '/specialties/polyamory-non-monogamy',
    image: 'images/polyamory-non-monogamy-hero.jpeg',
    description:
      'For individuals, couples opening up, and existing polycules — without having to justify the structure.',
  },
];

export const SERVICES_INDEX = { label: 'All Services', path: '/services' };
export const SPECIALTIES_INDEX = { label: 'All Specialties', path: '/specialties' };

// `exact` matters for index links: /services is a prefix of every service URL,
// so a startsWith match would light the index up on every page in the section.
export const isActiveLink = (pathname, link, { exact = false } = {}) =>
  exact
    ? pathname === link.path || pathname === `${link.path}/`
    : pathname === link.path || pathname.startsWith(`${link.path}/`);
