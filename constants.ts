import { Project, Experience, Publication } from './types';

export const EXPERIENCES: Experience[] = [
  {
    role: "Graduate Apprentice",
    company: "VSSC — Indian Space Research Organisation",
    type: "Apprenticeship",
    duration: "7 months",
    dates: "Jan 2024 – Jul 2024",
    location: "Thiruvananthapuram, India",
    mode: "On-site",
    bullets: [
      "Performed IR thermal testing in vacuum and ambient conditions on various specimen models using IR lamps up to 100 W/cm² heat flux.",
      "Designed and executed ray-tracing analysis on a 500 mm filament IR lamp mounted on a High-Performance Radiant Heater (HPRH) to deliver ~130 W/cm² uniformly over a 200×200 mm specimen surface.",
      "Tested an 80 W CO₂ laser on a 50×50 mm specimen using a laser power meter and thermopile sensor.",
      "Built and tested improvised configurations on a parabolic reflector module with IR lamps to simulate concentrated-surface heating up to 180 W/cm²."
    ],
    image: "images/experiences_pic1.jpg",
    imageCaption: "IR thermal testing setup during apprenticeship at VSSC"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Adaptive Model Reduction (OpenFOAM + ROM)",
    year: "2025",
    images: ["images/fom_p1.png", "images/fom_p2.png", "images/fom_p3.png"],
    link: "https://github.com/flash631/adaptive-model-reduction-switch",
    linkText: "GitHub Link",
    tagColor: "default"
  },
  {
    title: "Integration of NLP and LLMs for Automated SysML Generation with Topological Robustness Benchmarking in MBSE",
    year: "2025",
    images: ["images/mbse_p1.png", "images/mbse_p2.png", "images/mbse_p3.png"],
    link: "https://drive.google.com/file/d/11JDh1Rm1tFSdWF1YgvQ-DZysIaQLB_Lb/view?usp=sharing",
    linkText: "Project Description",
    tag: "UIUC",
    tagColor: "uiuc"
  },
  {
    title: "2D Adaptive Mesh Refinement (AMR) (QuadTree)",
    year: "2025",
    images: ["images/amr_pic1.png", "images/amr_pic2.png", "images/amr_pic3.png"],
    link: "https://github.com/flash631/amr2",
    linkText: "GitHub Link",
    tagColor: "default"
  },
  {
    title: "High Performance Radiant Heater Design Configuration Analysis",
    year: "2024",
    images: ["images/hprh_p1.png", "images/hprh_p2.png", "images/hprh_p3.png"],
    link: "https://drive.google.com/file/d/1f7aZRZaI4Pqd_fedk61qruvrYWXlEn-s/view?usp=drive_link",
    linkText: "Project Description",
    tag: "VSSC",
    tagColor: "vssc"
  },
  {
    title: "TracePro CoordX — 3D Coordinate Data Consolidation",
    year: "2024",
    images: ["images/tracepro_p1.png", "images/tracepro_p2.png", "images/tracepro_p3.png"],
    link: "https://github.com/flash631/tracepro-coordx",
    linkText: "GitHub Link",
    tag: "VSSC",
    tagColor: "vssc"
  },
  {
    title: "Experimental, Numerical and CFD Testing of Improvised Resistojet Thruster",
    year: "2023",
    images: ["images/resistojet1.png", "images/resistojet2.png", "images/resistojet3.png"],
    link: "https://drive.google.com/file/d/11vk5BDrp3bqpBe1QyivYahm95EkygH4K/view?usp=drive_link",
    linkText: "Project Description",
    tagColor: "default"
  },
  {
    title: "Rutherford-EPSim (Electric Pump System Simulator)",
    year: "2022",
    images: ["images/ruth_pic1.png", "images/ruth_pic2.png", "images/ruth_pic3.png"],
    link: "https://github.com/flash631/rutherford-epsim",
    linkText: "GitHub Link",
    tagColor: "default"
  },
  {
    title: "Voice→Intent Digital Twin for Differential-Drive Robots",
    year: "2020",
    images: ["images/iot_pic1.jpg", "images/iot_pic2.jpg", "images/iot_pic3.png"],
    link: "https://github.com/flash631/VoxNav",
    linkText: "GitHub Link",
    tagColor: "default"
  }
];

export const JOURNAL_PAPERS: Publication[] = [
  {
    title: "Comparative analytical analysis and component selection of resistojet thruster for satellite propulsion",
    authors: "Aswin M R, Akshay Pavithran, Yash Mangrole, Shriya Shivaraman, Chinmay Sanjay Kulave, Amit Kumar Thakur, Balaji R",
    venue: "Journal of Space Safety Engineering, Volume 11, Issue 1, 2024, Pages 20–34, ISSN 2468-8967",
    link: "https://doi.org/10.1016/j.jsse.2024.01.002",
    type: "journal"
  }
];

export const CONFERENCE_PAPERS: Publication[] = [
  {
    title: "Integration of NLP and LLMs for Automated SysML Generation with Topological Robustness Benchmarking in MBSE",
    authors: "M. R. Aswin and Jason Merret",
    venue: "2026 AIAA Scitech, Upcoming conference presentation on Jan 8, 2026",
    type: "conference"
  },
  {
    title: "Structural and Thermal Analysis of a CubeSat",
    authors: "M.R. Aswin, Pavithran, A., Mangrole, Y., Ravi, B.",
    venue: "In: Deepak, B.B.V.L., et al. (eds) Intelligent Manufacturing Systems in Industry 4.0. Lecture Notes in Mechanical Engineering. Springer, Singapore. 2023",
    link: "https://doi.org/10.1007/978-981-99-1665-8_32",
    type: "conference"
  },
  {
    title: "Material selection based on joule heating simulation for resistojet thruster",
    authors: "M.R. Aswin, Akshay Pavithran, Yash Mangrole, Shriya Shivaraman, Chinmay Sanjay Kulave, R. Balaji",
    venue: "Materials Today: Proceedings, 2023, ISSN 2214‑7853",
    link: "https://doi.org/10.1016/j.matpr.2023.07.274",
    type: "conference"
  },
  {
    title: "Comparative study over double wedge and biconvex aerofoils for laminar flow using CFD",
    authors: "S. Athul Krishna and M. R. Aswin",
    venue: "Journal of Physics: Conference Series, vol. 2272, no. 1, p. 012003, 2022",
    link: "http://dx.doi.org/10.1088/1742-6596/2272/1/012003",
    type: "conference"
  }
];

export const PATENTS: Publication[] = [
  {
    title: "IN202411086101 — Method of testing the efficiency of Resistojet Thrusters with remodeled nozzle and flow chamber design",
    authors: "",
    venue: "",
    type: "patent",
    image: "images/patent_pic1.jpeg"
  },
  {
    title: "IN202311042412 — Propulsion performance monitoring apparatus",
    authors: "",
    venue: "",
    type: "patent",
    image: "images/patent_pic2.jpeg"
  }
];