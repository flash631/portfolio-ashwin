export interface SimulationFigure {
  src: string;
  caption: string;
}

export interface ContentBlock {
  type: 'paragraph' | 'equation' | 'heading' | 'figure' | 'figure-grid';
  text?: string;
  latex?: string;
  level?: number; // for heading
  figure?: SimulationFigure;
  figures?: SimulationFigure[]; // for figure-grid
}

export interface SimulationData {
  id: string;
  order: number;
  title: string;
  shortTitle: string;
  videoSrc: string;
  secondaryVideoSrc?: string;
  content: ContentBlock[];
}

const BASE = 'simulations';

export const SIMULATIONS: SimulationData[] = [
  // =================================================================
  // 1. Non-Newtonian Planar Poiseuille Flow
  // =================================================================
  {
    id: 'non-newtonian-poiseuille',
    order: 1,
    title: 'Non-Newtonian Planar Poiseuille Flow',
    shortTitle: 'Non-Newtonian Poiseuille',
    videoSrc: `${BASE}/1_non_newtonian_poiseuille/nonNewtonian_planar_poiseuille_10s.mp4`,
    content: [
      {
        type: 'heading',
        text: 'Objective',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'This simulation investigates the laminar, incompressible, and isothermal flow of a non-Newtonian fluid governed by the Herschel–Bulkley rheological model within a two-dimensional planar channel. The study was conducted to characterize the transient startup dynamics leading to the formation of a plug-like velocity profile and to extract the steady-state nonlinear relationship between the imposed pressure drop and the resulting volumetric flow rate.',
      },
      {
        type: 'heading',
        text: 'Methodology',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'The simulation was performed using OpenFOAM 13 with the incompressible fluid solver module and the generalized Newtonian rheology framework employing the Herschel–Bulkley viscosity model. The computational domain comprises a planar channel of length 0.12 m and height 0.008 m, discretized with a structured uniform hexahedral mesh of 160 × 48 × 1 cells (7,680 total). The apparent kinematic viscosity is computed according to the Herschel–Bulkley constitutive relation:',
      },
      {
        type: 'equation',
        latex: '\\nu = \\min\\left( \\nu_0,\\; \\frac{\\tau_0 + k \\dot{\\gamma}^n}{\\dot{\\gamma}} \\right)',
      },
      {
        type: 'paragraph',
        text: 'where the fluid density is ρ = 1000 kg/m³, the yield stress parameter τ₀/ρ = 0.004 m²/s², the consistency index k/ρ = 0.001 m² s^(n−2), the flow behavior index n = 0.5, and the zero-shear maximum viscosity ν₀ = 0.01 m²/s. The inlet boundary is specified with a fixed kinematic pressure value and zero-gradient velocity, while the outlet maintains zero kinematic pressure. No-slip conditions are enforced on both channel walls. The transient case employs Euler time integration with an adjustable time step constrained by a maximum Courant number of 0.5. Steady-state sweep cases utilize the SIMPLE algorithm with bounded Gauss linear-upwind momentum advection.',
      },
      {
        type: 'heading',
        text: 'Results',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'The transient simulation successfully completed to t = 0.8 s, capturing the full development of the non-Newtonian velocity profile. The velocity contour reveals a characteristic plug-like profile in the channel core, where the shear rate approaches zero and the apparent viscosity reaches its upper bounding limit. The viscosity contour further confirms this behavior, with the high-viscosity plateau region clearly delineating the unyielded plug core.',
      },
      {
        type: 'figure-grid',
        figures: [
          {
            src: `${BASE}/1_non_newtonian_poiseuille/final_velocity_contour.png`,
            caption: 'Final velocity contour Uₓ at t = 0.8 s',
          },
          {
            src: `${BASE}/1_non_newtonian_poiseuille/final_viscosity_contour.png`,
            caption: 'Apparent viscosity field ν at t = 0.8 s',
          },
        ],
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/1_non_newtonian_poiseuille/plug_core_overlay.png`,
          caption: 'Velocity contour with the unyielded plug core region outlined in red',
        },
      },
      {
        type: 'paragraph',
        text: 'The steady-state parametric sweep across pressure drops ranging from 150 to 550 Pa demonstrates the progressive reduction of the relative plug core width with increasing driving pressure. The volumetric flow rate versus pressure drop relationship exhibits pronounced nonlinear behavior — in contrast to Newtonian Poiseuille flow where Q is proportional to ΔP, the combined effect of the yield stress and shear-thinning index (n = 0.5) produces a distinctly nonlinear response curve.',
      },
      {
        type: 'figure-grid',
        figures: [
          {
            src: `${BASE}/1_non_newtonian_poiseuille/sweep_profiles.png`,
            caption: 'Velocity profiles for various pressure drops',
          },
          {
            src: `${BASE}/1_non_newtonian_poiseuille/Q_vs_DeltaP.png`,
            caption: 'Nonlinear flow rate vs. pressure drop relationship',
          },
        ],
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/1_non_newtonian_poiseuille/transient_centerline_U.png`,
          caption: 'Transient development of the centerline velocity',
        },
      },
      {
        type: 'heading',
        text: 'Significance',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'This study serves as a validation exercise for the generalized Newtonian rheology framework in OpenFOAM, demonstrating its capacity to accurately capture yield-stress fluid behavior including plug formation and nonlinear pressure–flow relationships. Such flows are of practical importance in polymer processing, food engineering, and biofluid mechanics applications.',
      },
    ],
  },

  // =================================================================
  // 2. Periodic Hill Flow
  // =================================================================
  {
    id: 'periodic-hill',
    order: 2,
    title: 'Periodic Hill Separated Flow',
    shortTitle: 'Periodic Hill',
    videoSrc: `${BASE}/2_periodic_hill/periodic_hill_concat.mp4`,
    content: [
      {
        type: 'heading',
        text: 'Objective',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'This study presents a compact transient simulation of incompressible periodic hill flow conducted with OpenFOAM 13 on a local computing platform. The case was designed to remain computationally practical while resolving the central features of separated internal flow — namely lower-wall separation, recirculation, shear-layer roll-up, and three-dimensional vortical structure. The setup follows the well-known periodic-hill benchmark family described by Breuer et al., adapted for a reduced-cost grid suitable for desktop-class hardware.',
      },
      {
        type: 'heading',
        text: 'Methodology',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'The computational domain consists of a channel with periodic streamwise hill constrictions separated by nine hill heights. A smooth cosine-profile lower wall defines the hill geometry, with the crest at x/h = 0 and a flat floor extending from x/h = 2 to x/h = 7. Streamwise and spanwise periodicity were enforced through cyclic boundary conditions. The Reynolds number based on hill height is defined as:',
      },
      {
        type: 'equation',
        latex: 'Re_h = \\frac{\\overline{U}_b \\, h}{\\nu} \\approx 5600',
      },
      {
        type: 'paragraph',
        text: 'with a target bulk velocity of 2.0 m/s, hill height h = 0.028 m, and kinematic viscosity ν = 1.0 × 10⁻⁵ m²/s. The structured mesh was generated using blockMesh with 272 × 60 × 16 = 261,120 hexahedral cells, featuring clustering around the hill crest, recirculation zone, and recovery region. A transient k–ω SST URANS closure was employed, with backward differencing time advancement and adjustable time stepping targeting a maximum Courant number of 0.45. The Q-criterion, defined as:',
      },
      {
        type: 'equation',
        latex: 'Q = \\frac{1}{2}\\left(\\|\\boldsymbol{\\Omega}\\|^2 - \\|\\mathbf{S}\\|^2\\right)',
      },
      {
        type: 'paragraph',
        text: 'was used as a visualization diagnostic for vortical structures, where Ω represents the antisymmetric rotation tensor and S the symmetric strain-rate tensor.',
      },
      {
        type: 'heading',
        text: 'Results',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'The mid-span analysis reveals an extended separated region over the descending lower wall, followed by downstream recovery toward the upper-channel bulk speed. The mean pressure field exhibits the expected pressure drop over the crest with a recovery downstream as the shear layer grows. The wall-shear analysis indicates separation onset near x/h ≈ 0.31 and flow reattachment between x/h ≈ 1.25 and x/h ≈ 1.73, consistent with expectations for the reduced Reynolds number employed. The Q-criterion field confirms sustained dynamic activity in the separated shear layer despite the moderate mesh resolution.',
      },
      {
        type: 'figure-grid',
        figures: [
          {
            src: `${BASE}/2_periodic_hill/midspan_ux_mean.png`,
            caption: 'Mean streamwise velocity at mid-span',
          },
          {
            src: `${BASE}/2_periodic_hill/midspan_speed_mean.png`,
            caption: 'Mean speed magnitude at mid-span',
          },
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          {
            src: `${BASE}/2_periodic_hill/midspan_p_mean.png`,
            caption: 'Mean pressure scaled by bulk velocity squared',
          },
          {
            src: `${BASE}/2_periodic_hill/midspan_vorticity_mag.png`,
            caption: 'Vorticity magnitude at mid-span',
          },
        ],
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/2_periodic_hill/recirculation_map.png`,
          caption: 'Mid-span recirculation map based on the sign of mean streamwise velocity',
        },
      },
      {
        type: 'figure-grid',
        figures: [
          {
            src: `${BASE}/2_periodic_hill/wall_shear_reattachment.png`,
            caption: 'Lower-wall streamwise shear with separation and reattachment markers',
          },
          {
            src: `${BASE}/2_periodic_hill/mean_velocity_profiles.png`,
            caption: 'Representative downstream velocity profiles',
          },
        ],
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/2_periodic_hill/mesh_overview.png`,
          caption: 'Structured mesh overview for the periodic hill case',
        },
      },
      {
        type: 'heading',
        text: 'Significance',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'The study demonstrates that a single desktop-oriented OpenFOAM simulation can recover the principal signatures of periodic hill separation — including a clear separated region, identifiable reversed-flow pocket, and reasonable downstream velocity recovery — without requiring an expensive mesh or prolonged averaging campaign. The case serves as a practical template for separated-flow analysis on consumer hardware.',
      },
    ],
  },

  // =================================================================
  // 3. NASA Wall-Mounted Hump
  // =================================================================
  {
    id: 'nasa-wall-hump',
    order: 3,
    title: 'NASA Wall-Mounted Hump Benchmark',
    shortTitle: 'NASA Wall-Mounted Hump',
    videoSrc: `${BASE}/3_nasa_wall_mounted_hump/nasa_hump_sim_10s.mp4`,
    content: [
      {
        type: 'heading',
        text: 'Objective',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'This study presents steady RANS computations of the NASA wall-mounted hump benchmark — a well-established two-dimensional test case for adverse-pressure-gradient separated flows. The benchmark, introduced by Greenblatt et al. and maintained by the AIAA/NASA Turbulence Modelling Resource (TMR), features a smooth hump profile (maximum height h/c ≈ 0.128) mounted on the lower wall of a wind-tunnel channel. At the design Reynolds number Re_c = 936,000, the flow separates near the hump crest and reattaches downstream on the flat floor, forming a closed separation bubble that is challenging for standard two-equation turbulence models.',
      },
      {
        type: 'heading',
        text: 'Methodology',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'The computations were conducted using OpenFOAM 13 with the incompressible fluid solver module and the SIMPLE algorithm. Three cases were evaluated: (A) Spalart–Allmaras on a coarse 205 × 55 grid, (B) k–ω SST on the same coarse grid, and (C) k–ω SST on a fine 409 × 109 grid. The computational domain extends from x/c = −6.39 to x/c = +4.0 in the streamwise direction, with wall-normal spacing maintaining y⁺ ≤ 0.01. The pressure coefficient is aligned using the experimental upstream reference:',
      },
      {
        type: 'equation',
        latex: 'C_p = \\frac{p_k}{\\frac{1}{2}U_\\infty^2} + \\Delta C_p',
      },
      {
        type: 'paragraph',
        text: 'where the alignment offset ΔC_p is computed by matching the simulation to the experimental data over the upstream window x/c ∈ [−0.8, −0.3]. The skin friction coefficient incorporates a tangential projection of the wall-shear stress onto the local surface tangent vector, ensuring accurate separation and reattachment detection.',
      },
      {
        type: 'heading',
        text: 'Results',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'All three computations correctly predict the separation location within 2% of the experimental value (x_sep/c = 0.665), confirming that separation is predominantly driven by the adverse pressure gradient imposed by the hump geometry. The SST model over-predicts the reattachment length by approximately 13–15%, yielding a bubble length L_b/c ≈ 0.60–0.62 versus the experimental value of 0.445 — a well-documented behavior of linear eddy-viscosity models in adverse-pressure-gradient flows. The aligned C_p RMSE remains below 4% for all cases.',
      },
      {
        type: 'figure-grid',
        figures: [
          {
            src: `${BASE}/3_nasa_wall_mounted_hump/Cp_comparison.png`,
            caption: 'Lower-wall Cₚ comparison against experimental data',
          },
          {
            src: `${BASE}/3_nasa_wall_mounted_hump/Cf_comparison.png`,
            caption: 'Lower-wall Cf comparison with experimental uncertainty band',
          },
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          {
            src: `${BASE}/3_nasa_wall_mounted_hump/Cf_bubble_main.png`,
            caption: 'Skin friction with separation bubble shading for Case C',
          },
          {
            src: `${BASE}/3_nasa_wall_mounted_hump/bubble_trends.png`,
            caption: 'Separation bubble metrics for all cases',
          },
        ],
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/3_nasa_wall_mounted_hump/Cp_raw_vs_aligned.png`,
          caption: 'Raw versus aligned Cₚ for Case C (SST, 409 × 109)',
        },
      },
      {
        type: 'heading',
        text: 'Significance',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'The study confirms that steady RANS computations in OpenFOAM can adequately reproduce the essential physics of the NASA hump benchmark, including the separation bubble location and the pressure/skin-friction profiles. The systematic comparison between the SA and SST turbulence models on two grid levels provides insight into model and grid sensitivity for engineering-level separated-flow analysis.',
      },
    ],
  },

  // =================================================================
  // 4. Backward-Facing Step
  // =================================================================
  {
    id: 'backward-facing-step',
    order: 4,
    title: 'Backward-Facing Step Separated Flow',
    shortTitle: 'Backward-Facing Step',
    videoSrc: `${BASE}/4_backward_facing_step/backward_facing_step_10s.mp4`,
    content: [
      {
        type: 'heading',
        text: 'Objective',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'This investigation examines the canonical backward-facing-step benchmark using a strictly two-dimensional structured mesh in OpenFOAM 13. Three steady RANS turbulence closures — standard k–ε, realizable k–ε, and k–ω SST — are systematically compared against the Driver–Seegmiller experimental reattachment target of x_r/H = 6.26 ± 0.10. The backward-facing step represents a fundamental separated-flow test case that combines adverse pressure gradients, shear-layer roll-up, recirculation, and downstream recovery within a geometrically simple configuration.',
      },
      {
        type: 'heading',
        text: 'Methodology',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'The geometry employs a step height H = 0.0127 m, upstream channel height of 8H, downstream channel height of 9H, upstream length of 118H, and downstream length of 39H. The structured mesh generated with blockMesh comprises 106,240 cells with wall-normal grading toward the lower wall, top wall, and step corner. The inlet velocity is fixed at U_ref = 44.2 m/s, yielding:',
      },
      {
        type: 'equation',
        latex: 'Re_H = \\frac{U_{\\text{ref}} \\cdot H}{\\nu} \\approx 3.82 \\times 10^4',
      },
      {
        type: 'paragraph',
        text: 'The SIMPLE algorithm with bounded convection is employed for all three turbulence models. Reattachment is detected via the first downstream negative-to-positive zero crossing in the smoothed skin friction coefficient signal along the lower wall, with linear interpolation providing sub-cell precision. An independent cross-check samples the streamwise velocity at y = 0.02H above the lower wall to confirm the reattachment estimate.',
      },
      {
        type: 'heading',
        text: 'Results',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'All three models capture the separated region and the subsequent downstream recovery, though each predicts the reattachment location with varying fidelity. The k–ω SST model achieves the closest agreement with the benchmark, at x_r/H = 5.64 (deviation of −0.62H). The standard k–ε model produces the shortest recirculation bubble and the largest under-prediction, while the realizable k–ε model falls intermediate. This ranking is consistent with the known sensitivity hierarchy of these closures for separated-flow configurations.',
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/4_backward_facing_step/wall_shear_comparison.png`,
          caption: 'Lower-wall skin friction comparison with zero-crossing markers and benchmark band',
        },
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/4_backward_facing_step/velocity_profiles_comparison.png`,
          caption: 'Normalized streamwise velocity profiles at x/H = 1, 4, 6, and 10',
        },
      },
      {
        type: 'figure-grid',
        figures: [
          {
            src: `${BASE}/4_backward_facing_step/kEpsilon_velocity_streamlines.png`,
            caption: 'k–ε: velocity streamlines',
          },
          {
            src: `${BASE}/4_backward_facing_step/realizableKE_velocity_streamlines.png`,
            caption: 'Realizable k–ε: velocity streamlines',
          },
          {
            src: `${BASE}/4_backward_facing_step/kOmegaSST_velocity_streamlines.png`,
            caption: 'k–ω SST: velocity streamlines',
          },
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          {
            src: `${BASE}/4_backward_facing_step/kEpsilon_pressure_contour.png`,
            caption: 'k–ε: pressure contour',
          },
          {
            src: `${BASE}/4_backward_facing_step/realizableKE_pressure_contour.png`,
            caption: 'Realizable k–ε: pressure contour',
          },
          {
            src: `${BASE}/4_backward_facing_step/kOmegaSST_pressure_contour.png`,
            caption: 'k–ω SST: pressure contour',
          },
        ],
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/4_backward_facing_step/comparison_slide.png`,
          caption: 'Side-by-side model comparison overview',
        },
      },
      {
        type: 'heading',
        text: 'Significance',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'This comparative study provides a clear picture of how the choice of RANS turbulence closure affects the predicted reattachment location for the canonical backward-facing step. The consistent under-prediction by all three models is a recognized limitation of two-dimensional steady RANS for inherently three-dimensional separated flows, yet the relative ranking among models remains physically meaningful and instructive.',
      },
    ],
  },

  // =================================================================
  // 5. Cylinder Vortex Shedding
  // =================================================================
  {
    id: 'cylinder-vortex-shedding',
    order: 5,
    title: 'Circular Cylinder Vortex Shedding',
    shortTitle: 'Cylinder Vortex Shedding',
    videoSrc: `${BASE}/5_cylinder_vortex_shedding/cylinder_vortex_shedding_10s.mp4`,
    content: [
      {
        type: 'heading',
        text: 'Objective',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'This study constructs a reproducible two-dimensional incompressible laminar CFD simulation of flow past a circular cylinder at Reynolds number Re = 100 to extract quantitative vortex-shedding metrics. The emphasis is placed on the lift and drag coefficient histories, their spectral content, and a physically grounded wake-mode identification supported by vorticity fields, probe correlation analysis, and phase-difference measurements.',
      },
      {
        type: 'heading',
        text: 'Methodology',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'The simulation employs the OpenFOAM 13 incompressible transient solver module with a laminar constitutive model. The domain extends sufficiently in both streamwise and cross-stream directions to minimize boundary effects. The Strouhal number characterizing the shedding frequency is defined as:',
      },
      {
        type: 'equation',
        latex: 'St = \\frac{f \\cdot D}{U_\\infty}',
      },
      {
        type: 'paragraph',
        text: 'where f is the dominant lift frequency, D is the cylinder diameter, and U∞ is the freestream velocity. The dominant shedding frequency was extracted using Welch power spectral density estimation after automatically trimming the initial transient. Wake probes were placed in symmetric pairs above and below the centerline to test for anti-phase behavior characteristic of von Kármán shedding. A small one-time transverse perturbation in the initial velocity field was introduced to break exact geometric symmetry and promote natural wake instability.',
      },
      {
        type: 'heading',
        text: 'Results',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'The simulation captures a well-defined periodic vortex shedding pattern. The lift coefficient exhibits sinusoidal oscillations at the primary shedding frequency, while the drag coefficient oscillates at twice the lift frequency — consistent with theoretical expectations. The signed-vorticity field reveals alternating positive and negative vortical structures convecting downstream in a staggered arrangement. The upper and lower wake probes exhibit strong anti-correlation, with a phase difference close to 180°, confirming the classical von Kármán (2S) shedding mode.',
      },
      {
        type: 'figure-grid',
        figures: [
          {
            src: `${BASE}/5_cylinder_vortex_shedding/cd_history.png`,
            caption: 'Drag coefficient time history',
          },
          {
            src: `${BASE}/5_cylinder_vortex_shedding/cl_history.png`,
            caption: 'Lift coefficient time history',
          },
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          {
            src: `${BASE}/5_cylinder_vortex_shedding/cl_psd.png`,
            caption: 'Lift coefficient power spectral density',
          },
          {
            src: `${BASE}/5_cylinder_vortex_shedding/cd_psd.png`,
            caption: 'Drag coefficient power spectral density',
          },
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          {
            src: `${BASE}/5_cylinder_vortex_shedding/vorticity_snapshot.png`,
            caption: 'Representative signed-vorticity field showing the von Kármán street',
          },
          {
            src: `${BASE}/5_cylinder_vortex_shedding/wake_probe_phase.png`,
            caption: 'Upper and lower wake-probe phase comparison',
          },
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          {
            src: `${BASE}/5_cylinder_vortex_shedding/centerline_velocity.png`,
            caption: 'Wake centerline velocity profile',
          },
          {
            src: `${BASE}/5_cylinder_vortex_shedding/mesh.png`,
            caption: 'Production mesh with full two-dimensional configuration',
          },
        ],
      },
      {
        type: 'heading',
        text: 'Significance',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'The study validates the OpenFOAM laminar solver\'s ability to reproduce the classical low-Reynolds-number vortex shedding phenomenon, with the computed Strouhal number, mean drag, and lift fluctuation levels all falling within established literature reference bands. The multi-diagnostic wake-mode identification approach — combining spectral, vorticity, and probe-phase evidence — provides a rigorous classification methodology applicable to more complex shedding configurations.',
      },
    ],
  },

  // =================================================================
  // 6. Buoyant Natural-Convection Cavity
  // =================================================================
  {
    id: 'buoyant-cavity',
    order: 6,
    title: 'Buoyant Natural-Convection Cavity',
    shortTitle: 'Buoyant Cavity',
    videoSrc: `${BASE}/6_buoyant_cavity/natural_convection_cavity.mp4`,
    content: [
      {
        type: 'heading',
        text: 'Objective',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'This investigation evaluates laminar natural convection in a differentially heated square cavity using a two-dimensional Boussinesq approximation. The objective is to reproduce benchmark trends across a Rayleigh-number sweep, quantify agreement using standard validation metrics, and establish a fully scripted OpenFOAM 13 workflow suitable for systematic parametric studies.',
      },
      {
        type: 'heading',
        text: 'Methodology',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'The governing equations consist of the steady continuity, momentum, and energy equations under the Boussinesq approximation:',
      },
      {
        type: 'equation',
        latex: '\\nabla \\cdot (\\mathbf{u}\\mathbf{u}) = -\\frac{1}{\\rho_0}\\nabla p + \\nu \\nabla^2 \\mathbf{u} + \\mathbf{g}\\,\\beta(T - T_{\\text{ref}})',
      },
      {
        type: 'paragraph',
        text: 'The cavity has a side length L = 0.1 m with a temperature difference ΔT = 10 K. The left wall is maintained at 305 K, the right wall at 295 K, and the horizontal walls are adiabatic. The Prandtl number is fixed at Pr = 0.71. The Rayleigh-number sweep varies the kinematic viscosity while maintaining fixed geometry and temperature difference. Each case employs a structured 99 × 99 × 1 mesh, and the local hot-wall Nusselt number is computed from:',
      },
      {
        type: 'equation',
        latex: 'Nu_{\\text{hot}}(Y) = -\\frac{L}{\\Delta T}\\left.\\frac{\\partial T}{\\partial x}\\right|_{\\text{hot}}',
      },
      {
        type: 'heading',
        text: 'Results',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'The simulation successfully tracks the benchmark trends across the Rayleigh-number range. At low Rayleigh numbers, the temperature field exhibits near-linear stratification with weak convective motion. As the Rayleigh number increases to 10⁶, the thermal boundary layers thin considerably and the convective circulation intensifies, producing characteristic corner vortices and a more complex temperature distribution. The computed average hot-wall Nusselt numbers show good quantitative agreement with the de Vahl Davis benchmark values.',
      },
      {
        type: 'figure-grid',
        figures: [
          {
            src: `${BASE}/6_buoyant_cavity/Ra1e3_temperature_vectors.png`,
            caption: 'Low Rayleigh (Ra = 10³): temperature field with velocity vectors',
          },
          {
            src: `${BASE}/6_buoyant_cavity/Ra1e6_temperature_vectors.png`,
            caption: 'High Rayleigh (Ra = 10⁶): temperature field with velocity vectors',
          },
        ],
      },
      {
        type: 'figure-grid',
        figures: [
          {
            src: `${BASE}/6_buoyant_cavity/nusselt_vs_rayleigh.png`,
            caption: 'Average hot-wall Nusselt number across the Rayleigh-number sweep',
          },
          {
            src: `${BASE}/6_buoyant_cavity/relative_error_vs_rayleigh.png`,
            caption: 'Relative validation error for benchmark metrics',
          },
        ],
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/6_buoyant_cavity/Ra1e6_local_nusselt.png`,
          caption: 'Local hot-wall Nusselt profile for the highest Rayleigh number case',
        },
      },
      {
        type: 'heading',
        text: 'Significance',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'The buoyant cavity benchmark is a cornerstone validation case in computational heat transfer. This study demonstrates the capability of the OpenFOAM Boussinesq solver to reproduce established benchmark results across a wide range of Rayleigh numbers while maintaining a practical and reproducible workflow on desktop hardware. The moderate structured mesh and conservative numerics represent an intentional trade-off between accuracy and computational accessibility.',
      },
    ],
  },

  // =================================================================
  // 7. NACA 4412 Trailing-Edge Separation
  // =================================================================
  {
    id: 'naca-4412-trailing-edge',
    order: 7,
    title: 'NACA 4412 Trailing-Edge Separation',
    shortTitle: 'NACA 4412 Separation',
    videoSrc: `${BASE}/7_naca_4412_trailing_edge/naca4412_airfoil_focus_10s_v8.mp4`,
    secondaryVideoSrc: `${BASE}/7_naca_4412_trailing_edge/naca4412_te_zoom_10s_v8.mp4`,
    content: [
      {
        type: 'heading',
        text: 'Objective',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'This simulation examines the NACA 4412 airfoil at a high angle of attack (α = 13.87°) and Reynolds number Re = 1.52 × 10⁶ — a classic benchmark configuration for trailing-edge separation. The case is taken from the NASA Turbulence Modeling Resource database and represents a challenging test for RANS turbulence models due to the gradual trailing-edge separation that develops under the strong adverse pressure gradient on the upper surface.',
      },
      {
        type: 'heading',
        text: 'Methodology',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'The simulation was performed using OpenFOAM 13 with the incompressible fluid solver module and the k–ω SST turbulence model. The structured mesh (449 × 129, totaling 57,344 cells) was obtained from the NASA TMR database in Plot3D format and converted using plot3dToFoam with a 2D extrusion thickness of 0.01. The airfoil surface employs no-slip wall boundary conditions, while freestream conditions are applied at the far-field. The flow parameters are:',
      },
      {
        type: 'equation',
        latex: 'Re = \\frac{U_\\infty \\cdot c}{\\nu} = 1.52 \\times 10^6, \\quad \\alpha = 13.87^\\circ',
      },
      {
        type: 'paragraph',
        text: 'with U∞ = 1.0, ν = 6.5789 × 10⁻⁷, and ρ = 1.0. The case is treated as purely incompressible without Mach-number matching. The simulation was advanced for 500 steady-state iterations with residuals for velocity and pressure converging below 10⁻⁵.',
      },
      {
        type: 'heading',
        text: 'Results',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'The pressure coefficient distribution over the airfoil surface captures the strong suction peak on the upper surface and the pressure recovery toward the trailing edge. The simulation successfully resolves the general flow features of the NACA 4412 trailing-edge region, including the adverse pressure gradient responsible for separation onset. Velocity profiles sampled at multiple chordwise stations along the upper surface reveal the progressive boundary-layer thickening associated with the trailing-edge separation process.',
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/7_naca_4412_trailing_edge/cp_distribution.png`,
          caption: 'Pressure coefficient (Cₚ) distribution on the NACA 4412 airfoil',
        },
      },
      {
        type: 'figure',
        figure: {
          src: `${BASE}/7_naca_4412_trailing_edge/verify_te_v3.png`,
          caption: 'Trailing-edge flow visualization confirming separation behavior',
        },
      },
      {
        type: 'heading',
        text: 'Significance',
        level: 2,
      },
      {
        type: 'paragraph',
        text: 'The NACA 4412 trailing-edge separation benchmark is among the most frequently cited validation cases in turbulence modeling research. This study provides a baseline steady-state RANS solution that captures the essential flow physics while highlighting the sensitivity of separation-point prediction to turbulence model selection and mesh resolution — key considerations for engineering-level aerodynamic analysis.',
      },
    ],
  },
];
