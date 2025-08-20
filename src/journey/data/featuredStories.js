// src/journey/data/featuredStories.js
// Single source of truth for the Journey "stories" shown in the hero carousel
// and in the "All stories" directory.

const BASE = import.meta.env.BASE_URL;
const img = (f) => `${BASE}images/journey-featured/${f}`;

const stories = [
  {
    id: 'stanford',
    title: 'Stanford Fellowship: Molecular Imaging of the Brain–Gut Axis',
    when: '2025',
    summary:
      'How PET/MRI + multi-omics can surface early gut–brain biomarkers linked to dementia risk.',
    href: '#/journey/stanford',
    cover: img('stanford.jpg'),
    tags: ['Imaging', 'Brain–gut'],
  },
  {
    id: 'naloxone',
    title: 'The Naloxone Project: Saving Lives on Campus',
    when: '2024–2025',
    summary:
      '32+ emergency naloxone kits placed across McMaster; training and response workflows.',
    href: '#/journey/naloxone',
    cover: img('naloxone.jpg'),
    tags: ['Harm reduction', 'Student safety'],
  },
  {
    id: 'camh',
    title: 'CAMH Public Health Research',
    when: 'Ongoing',
    summary:
      'Harm-reduction + culturally informed models for equitable access; policy & outreach.',
    href: '#/journey/camh',
    cover: img('camh.jpg'),
    tags: ['Policy', 'Equity'],
  },
  {
    id: 'manitoba',
    title: 'Paediatric Research (INGAUGE Lab)',
    when: '2024',
    summary:
      'Child/youth navigation of complex care; inclusion-centred qualitative design.',
    href: '#/journey/manitoba',
    cover: img('manitoba.jpg'),
    tags: ['Child health', 'Qualitative'],
  },
  {
    id: 'mcmaster-medicine',
    title: 'McMaster Department of Medicine — Research',
    when: '2025–present',
    summary:
      'Clinical research & analytics contributions across McMaster’s Department of Medicine.',
    href: '#/journey/mcmaster-medicine',
    cover: img('mcmaster-medicine.jpg'),
    tags: ['Research', 'Clinical'],
  },
  {
    id: 'jcc',
    title: 'HHS — Juravinski Cancer Centre',
    when: 'Earlier',
    summary:
      'Oncology department staff; multidisciplinary teams, safety culture, and clinical ops.',
    href: '#/journey/jcc',
    cover: img('jcc.jpg'),
    tags: ['Oncology', 'Ops'],
  },
];

export default stories;
