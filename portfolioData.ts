export interface SkillGroup {
  title: string;
  skills: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Simulation & CFD',
    skills: ['ANSYS CFX', 'ANSYS Fluent', 'OpenFOAM', 'COMSOL', 'ABAQUS', 'ParaView', 'MeshLab', 'MATLAB'],
  },
  {
    title: 'Programming & AI',
    skills: ['Python', 'C++', 'JavaScript', 'React', 'Next.js', 'SQL', 'SysML 2', 'Papyrus', 'NLP (spaCy)', 'LaTeX'],
  },
  {
    title: 'Tools & platforms',
    skills: ['Git', 'Docker', 'AWS', 'OCI', 'Linux', 'PostgreSQL', 'Firebase', 'Google Cloud', 'Vercel'],
  },
  {
    title: 'Expertise areas',
    skills: ['Thermal systems', 'Multiphase flow', 'Heat transfer', 'Radiative heating', 'AMR', 'Reduced-order models', 'MBSE', 'Turbulence modelling'],
  },
  {
    title: 'Experimental methods',
    skills: ['IR thermography', 'Heat-flux mapping', 'Sensor calibration', 'TPS characterisation', 'Radiative-property testing'],
  },
];

export const SIMULATION_VISUALS: Record<string, string> = {
  'non-newtonian-poiseuille': 'simulations/1_non_newtonian_poiseuille/final_velocity_contour.png',
  'periodic-hill': 'simulations/2_periodic_hill/midspan_ux_mean.png',
  'nasa-wall-hump': 'simulations/3_nasa_wall_mounted_hump/Cp_comparison.png',
  'backward-facing-step': 'simulations/4_backward_facing_step/kOmegaSST_velocity_streamlines.png',
  'cylinder-vortex-shedding': 'simulations/5_cylinder_vortex_shedding/vorticity_snapshot.png',
  'buoyant-cavity': 'simulations/6_buoyant_cavity/Ra1e6_temperature_vectors.png',
  'naca-4412-trailing-edge': 'simulations/7_naca_4412_trailing_edge/cp_distribution.png',
};

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/ashwin-m-r-9a07841b6/',
  github: 'https://github.com/flash631',
  x: 'https://x.com/AswinMR15',
  instagram: 'https://www.instagram.com/ashwin.mkv/',
  researchgate: 'https://www.researchgate.net/profile/Aswin-M-R',
  scholar: 'https://scholar.google.com/citations?user=rgYx6gwAAAAJ&hl=en',
  orcid: 'https://orcid.org/0000-0001-6214-7129',
};

export const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'publication-index', label: 'Publications' },
  { id: 'project-index', label: 'Projects' },
  { id: 'simulation-index', label: 'Simulations' },
  { id: 'skill-index', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;

export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const simulationHref = (id: string) => (
  `${import.meta.env.BASE_URL}?simulation=${encodeURIComponent(id)}`
);

export const sectionHref = (id: string, fromSimulationPage = false) => (
  fromSimulationPage ? `${import.meta.env.BASE_URL}#${id}` : `#${id}`
);
