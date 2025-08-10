const BASE = import.meta.env.BASE_URL
const DIR = `${BASE}images/journey-featured/`

export default [
  {
    year: '2025',
    title: 'Stanford Fellowship: Molecular Imaging of the Brain–Gut Axis',
    desc: 'How molecular imaging and multi-omics can reveal early gut–brain biomarkers linked to dementia risk.',
    img: `${DIR}stanford.jpg`,
    link: '#/journey/stanford',
  },
  {
    year: '2024–2025',
    title: 'The Naloxone Project: Saving Lives on Campus',
    desc: 'Placed 32 emergency naloxone kits across McMaster to strengthen overdose response.',
    img: `${DIR}naloxone.jpg`,
    link: '#/journey/naloxone',
  },
  {
    year: '2024',
    title: 'University of Manitoba Paediatric Research',
    desc: 'INGAUGE Labs (Dr. Woodgate): research amplifying the voices of children and youth in care.',
    img: `${DIR}manitoba.jpg`,
    link: '#/journey/manitoba',
  },
  {
    year: 'Ongoing',
    title: 'CAMH Public Health Research',
    desc: 'Harm reduction + culturally informed care for more equitable mental health strategies.',
    img: `${DIR}camh.jpg`,
    link: '#/journey/camh',
  },
]

