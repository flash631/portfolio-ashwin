import React from 'react';
import Reveal from '../components/Reveal';

const About: React.FC = () => {
  const images = [
    "images/about_pic1.jpg",
    "images/about_pic2.JPG",
    "images/about_pic3.JPG"
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

        {/* Text Content */}
        <div>
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-4">
              <span className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]"></span>
              About me
            </h1>
          </Reveal>

          <div className="space-y-6 text-slate-600 dark:text-slate-200 text-lg leading-relaxed transition-colors">
            <Reveal delay={100}>
              <p>Hey there! I'm Aswin (pronounced Ash.wn and preferred name - Ashwin) currently pursuing my MEng degree on Aerospace Systems Engineering from the University of Illinois Urbana-Champaign.</p>
            </Reveal>

            <Reveal delay={200}>
              <p>I did my undergrad in Aerospace Engineering since I'm fascinated about the whole engineering concepts of ISS. I mean it's remarkable the work done on assembling modules in microgravity, thermal cycles, closed loop system — wait, I'm getting ahead of myself here. But you get the point. So, in my undergrad I closely worked on satellite thrusters which led me to be an experienced engineer in fluid-thermal-electric simulations. Other than that, I took my free time to learn more on fluid simulations and multiphase simulations.</p>
            </Reveal>

            <Reveal delay={300}>
              <p>I have experience in industry and academia side of engineering. From my experience at the Indian Space Research Organization, I got to deal with thermal systems in controlled and ablative vacuum chambers. I helped design new High Performance Radiant Heater for IR heating and also got to work on CO<sub>2</sub> LASER heating tests which was cool!</p>
            </Reveal>

            <Reveal delay={400}>
              <p>Now I'm at the University of Illinois at Urbana-Champaign to further expertise my knowledge on Systems Engineering done related to Aerospace systems. Here, I'm getting much more exposure onto MBSE and even FEM fields from the courses that I took. So, still in my development phase, I guess.</p>
            </Reveal>

            <Reveal delay={500}>
              <p>I know it's a long read, but if anyone found all these interesting and would like to help me grow, I'll be fully dedicated to help the research grow as well. Just have to guide me through it :)</p>
            </Reveal>

            <Reveal delay={600}>
              <div className="pt-4 opacity-90">
                Sincerely,<br />
                <strong className="text-slate-900 dark:text-white text-xl">Ashwin M R</strong>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Gallery */}
        <div className="flex flex-col items-center justify-center">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg"
            role="list"
            aria-label="Photo Gallery"
          >
            {images.map((src, idx) => (
              <Reveal
                key={idx}
                delay={700 + idx * 100}
                className={`relative aspect-[4/5] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md shadow-lg group focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 ${idx === 2 ? 'sm:col-span-2 sm:w-3/4 sm:mx-auto' : ''}`}
                role="listitem"
                tabIndex={0}
                aria-label={`Portrait of Ashwin ${idx + 1}`}
              >
                <img
                  src={src}
                  alt={`Ashwin portrait ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-focus:scale-105"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;