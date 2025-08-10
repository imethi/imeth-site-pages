import React from 'react'

const BASE = import.meta.env.BASE_URL
const DIR = `${BASE}images/journey/stanford/`
const DL  = `${BASE}downloads/stanford/`

const StanfordStory = {
  slug: 'stanford',
  shortTitle: 'Stanford Fellowship',
  title: 'Stanford Fellowship: Molecular Imaging of the Brain–Gut Axis',
  dek: 'Investigating how PET/MRI and multi-omics can surface early gut–brain biomarkers linked to dementia risk—shifting prevention years upstream.',
  hero: `${DIR}hero.jpg`,
  fallbackImg: `${DIR}_fallback.jpg`,
  chips: ['2025', 'Molecular Imaging Fellow', 'Stanford Radiology'],
  atAGlance: [
    { label: 'Duration', value: 'Summer 2025' },
    { label: 'Focus', value: 'Early GBA inflammatory/metabolic signals' },
    { label: 'Outputs', value: 'Talk • Poster • Slide deck' },
    { label: 'Mentors', value: 'F. Habte • A. Natarajan • L.J. Pisani' },
  ],
  downloads: [
    { label: 'Slides (PDF)', href: `${DL}stanford_slides.pdf` },
    { label: 'Poster (PDF)', href: `${DL}stanford_poster.pdf` },
    { label: 'One-pager (PDF)', href: `${DL}stanford_onepager.pdf` },
  ],
  sections: [
    {
      id: 'why-this-program-mattered',
      title: 'Why this program mattered',
      content: (
        <>
          <p>
            I was selected for the prestigious 2025 Stanford Radiology Summer Mini-Fellowship—an intensive, mentor-led program that deliberately bridges <strong>study</strong>, <strong>research</strong>, and <strong>clinical translation</strong>. Each week built from fundamentals to practice: imaging technologies; agents/tracers & radiochemistry; physics of luminescence; cellular and preclinical workflows; clinical applications; and image analysis with AI. Having the chance to learn with Stanford's state of the art reserach institute was an opportunity that I was definitely excited to be a part of.
          </p>
          <p>
          </p>
        </>
      ),
    },
    {
      id: 'what-i-learned',
      title: 'What I learned (highlights)',
      content: (
        <ul>
          <li><strong>Foundations & technologies:</strong> what PET, SPECT, MRI, and optical imaging each reveal about biology.</li>
          <li><strong>Agents & radiochemistry:</strong> designing tracers; half-life and SNR trade-offs that shape clinical use.</li>
          <li><strong>Physics of luminescence:</strong> where signal models help—and where they limit study design.</li>
          <li><strong>Preclinical → clinical:</strong> good animal data, acquisition & quantification—then translation to people.</li>
          <li><strong>Clinical applications:</strong> how molecular imaging informs oncology, cardiology, neurology decisions.</li>
          <li><strong>Analysis & AI:</strong> QC → registration → segmentation → features → modeling; when classical beats deep learning.</li>
        </ul>
      ),
    },
    {
      id: 'relevance',
      title: 'Why molecular imaging matters',
      content: (
        <>
          <p>
            Molecular imaging shows <em>biology in motion</em> rather than late structural change. That enables earlier screening, sharper risk stratification, and quantitative treatment response—exactly what prevention needs.
          </p>
        </>
      ),
      figure: {
        src: `${DIR}figure_pipeline.png`,
        caption: 'Integrated imaging–omics pipeline linking clinical data, microbiome/metabolomic profiling, and brain imaging.',
        alt: 'Integrated imaging–omics pipeline diagram',
      }
    },
    {
      id: 'capstone',
      title: 'My Research Project: Molecular Imagining Predictors for Alzheimers the Brain Gut-Axis',
      content: (
        <>
          <p>
            Over the past months I’ve grown a real interest in nutrition—not as rules, but as a conversation between gut and brain. The fellowship gave me methods to test it. I designed a project using <strong>molecular imaging + multi-omics</strong> to look for <strong>early inflammatory and metabolic signals</strong> along the brain–gut axis that might forecast cognitive decline.
          </p>
          <ul>
            <li><strong>Motivation:</strong> Symptoms arrive late; gut-derived metabolites & immune mediators may precede them.</li>
            
            <li><strong>Concept:</strong> Pair PET/MRI readouts with microbiome/metabolomics & cognitive indices; test compact features against brain activity/risk.</li>
            
            <li><strong>Build:</strong> Blueprint for QC, ROI definition, feature engineering, CCA/PLS integration, validation + an illustrative figure.</li>
          </ul>
        </>
      ),
      figure: {
        src: `${DIR}figure_gba.png`,
        caption: 'Concept sketch linking gut signals to region-specific brain activity as a prevention-first strategy.',
        alt: 'Brain–gut axis concept figure',
      }
    },
    {
      id: 'impact-next',
      title: 'Impact & next steps',
      content: (
        <>
          <p>
            The fellowship recalibrated my lens: I think in mechanisms first, findings second. A “normal MRI” is now a cue to ask a molecular question.
          </p>
          <ol>
            <li>Prototype the pipeline on a small curated dataset.</li>
            <li>Iterate metabolite/cytokine & imaging ROI features with mentors; pre-register analysis.</li>
            <li>Present → refine with imaging + neurogastroenterology groups.</li>
            <li>Pilot study or a methods paper (data-dependent).</li>
          </ol>
        </>
      ),
    },
  ],
  gallery: [`${DIR}gallery_01.jpg`, `${DIR}gallery_02.jpg`, `${DIR}gallery_03.jpg`],
}

export default StanfordStory

