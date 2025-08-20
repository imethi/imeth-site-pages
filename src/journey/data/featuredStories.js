const BASE = import.meta.env.BASE_URL

export default [
  {
    key: 'stanford',
    title: 'Stanford Fellowship: Molecular Imaging of the Brain–Gut Axis',
    when: '2025',
    blurb:
      'How molecular imaging and multi-omics can reveal early gut–brain biomarkers linked to dementia risk.',
    img: `${BASE}images/journey-featured/stanford.jpg`,
    href: '#/journey/stanford',
    tags: ['Imaging', 'Brain–gut'],
  },
  {
    key: 'naloxone',
    title: 'The Naloxone Project: Saving Lives on Campus',
    when: '2024–2025',
    blurb:
      '32+ emergency naloxone kits placed across McMaster to strengthen overdose response.',
    img: `${BASE}images/journey-featured/naloxone.jpg`,
    href: '#/journey/naloxone',
    tags: ['Harm reduction', 'Student safety'],
  },
  {
    key: 'camh',
    title: 'CAMH Public Health Research',
    when: 'Ongoing',
    blurb:
      'Harm-reduction + culturally informed models for more equitable mental health strategies.',
    img: `${BASE}images/journey-featured/camh.jpg`,
    href: '#/journey/camh',
    tags: ['Policy', 'Equity'],
  },
  {
    key: 'manitoba',
    title: 'University of Manitoba Paediatric Research (INGAUGE Lab)',
    when: '2024',
    blurb:
      'Child/youth navigation of complex care; inclusion-centred design and qualitative methods.',
    img: `${BASE}images/journey-featured/manitoba.jpg`,
    href: '#/journey/manitoba',
    tags: ['Child health', 'Qualitative'],
  },
  {
    key: 'jcc',
    title: 'HHS — Juravinski Cancer Centre',
    when: 'Earlier',
    blurb:
      'Clinical operations exposure: multidisciplinary teams, safety culture, and patient flow.',
    img: `${BASE}images/journey-featured/jcc.jpg`,
    href: '#/journey',
    tags: ['Clinical ops'],
  },
  {
    key: 'mcmaster-med',
    title: 'McMaster Department of Medicine — Research Student',
    when: 'Earlier',
    blurb:
      'Early detection and prevention-first approaches within clinical and academic settings.',
    img: `${BASE}images/journey-featured/mcmaster-medicine.jpg`,
    href: '#/journey',
    tags: ['Prevention', 'Operations'],
  },
]
