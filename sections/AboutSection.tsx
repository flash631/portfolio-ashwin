import { assetUrl } from '../portfolioData';
import { DetailHeader } from './DetailSections';

const ABOUT_PARAGRAPHS = [
  'Hey there! I’m Aswin (pronounced “Ash.wn”; I go by Ashwin). My graduate work brought me to the MEng programme in Aerospace Systems Engineering at the University of Illinois Urbana–Champaign.',
  'I chose aerospace engineering as an undergraduate because the International Space Station made the field feel tangible: modules assembled in microgravity, repeated thermal cycles, and closed-loop systems working together. That interest led me to satellite-thruster work and experience with fluid, thermal, electric, and multiphase simulations.',
  'My engineering experience spans both industry and academia. At the Indian Space Research Organisation, I worked with thermal systems in controlled and ablative vacuum chambers. I contributed to a new High-Performance Radiant Heater for infrared heating and supported CO₂ laser-heating tests.',
  'At UIUC, I have continued developing my systems perspective through model-based systems engineering and finite-element methods. I am still learning, testing ideas, and building the breadth needed to connect detailed analysis with complete aerospace systems.',
  'If this work overlaps with your research or engineering interests, I would be glad to learn from your experience and contribute with the same commitment to the work.',
];

const ABOUT_IMAGES = [
  {
    src: 'images/about_pic1.jpg',
    alt: 'Instrumented cylindrical test article inside a thermal test chamber',
    caption: 'Instrumented chamber test article',
    className: 'about-photo about-photo--lead',
  },
  {
    src: 'images/about_pic2.JPG',
    alt: 'Radiant-heating test illuminating a specimen and insulated test hardware',
    caption: 'Radiant-heating test in progress',
    className: 'about-photo',
  },
  {
    src: 'images/about_pic3.JPG',
    alt: 'Illuminated thermal test setup viewed through a vacuum-chamber window',
    caption: 'Vacuum-chamber thermal test',
    className: 'about-photo',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="detail-section about-section">
      <DetailHeader
        index="01"
        title="About me"
        description="The questions, laboratory work, and systems perspective that shaped my path through aerospace engineering."
      />

      <div className="about-layout">
        <article className="about-copy">
          {ABOUT_PARAGRAPHS.map((paragraph, index) => (
            <div className="about-copy-row" key={paragraph}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{paragraph}</p>
            </div>
          ))}
          <p className="about-signoff">
            <span>Sincerely,</span>
            <strong>Ashwin M R</strong>
          </p>
        </article>

        <div className="about-gallery" aria-label="Thermal engineering gallery">
          {ABOUT_IMAGES.map((image) => (
            <figure className={image.className} key={image.src}>
              <img src={assetUrl(image.src)} alt={image.alt} loading="lazy" />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
