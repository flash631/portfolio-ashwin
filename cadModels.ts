export interface CadPartCount {
  name: string;
  count: number | null;
}

export interface CadModel {
  id: string;
  code: string;
  name: string;
  fullTitle: string;
  revision: string;
  file: string;
  sourceFile: string;
  thumbnail?: string;
  designedIn: string;
  states?: { label: string; file: string }[];
  description: string;
  shortDescription: string;
  specs: { label: string; value: string }[];
  highlights: string[];
  parts: CadPartCount[];
  fileProperties: { label: string; value: string }[];
}

export const CAD_MODELS: CadModel[] = [
  {
    id: 'csa-001',
    code: 'CSA-001',
    name: 'Control-Surface Actuation Assembly',
    fullTitle: 'CSA-001 | Control-surface actuation assembly | Revision B',
    revision: 'Revision B',
    file: 'models/csa-001.glb',
    sourceFile: 'CSA-001_B.step',
    thumbnail: 'images/csa-001_thumb.png',
    designedIn: 'FreeCAD',
    shortDescription:
      'A complete elevator actuation chain around a local tail structure: an Actuonix L12 linear actuator drives the elevator through a control horn and link pins, on a pedestal-mounted hinge shaft in plain bearings, with a stop bracket limiting surface travel.',
    description:
      'A complete elevator actuation chain built around a local tail structure: an Actuonix L12 linear actuator drives the elevator through a control horn and link pins, on a pedestal-mounted hinge shaft running in plain bearings. A stop bracket limits surface travel, and the assembly is fully fastened with modelled M3, M4 and M6 hardware so clearances and interfaces can be checked directly in the model.',
    specs: [
      { label: 'Components', value: '90 placed parts · 25 unique' },
      { label: 'Envelope', value: '220.4 × 240.2 × 78.8 mm' },
      { label: 'Actuator', value: 'Actuonix L12 linear actuator' },
      { label: 'Bearings', value: 'GFM-060806 plain bearings ×2' },
      { label: 'Source format', value: 'STEP AP242 (FreeCAD)' },
    ],
    highlights: [
      'Tail frame and elevator on a pedestal-mounted hinge shaft',
      'Control horn and link-pin drive from the L12 actuator',
      'Stop bracket limiting surface travel',
      'Supplier geometry for actuator, bearings, fasteners',
    ],
    parts: [
      { name: 'CSA-101 | Tail Frame', count: 1 },
      { name: 'CSA-102 | Elevator', count: 1 },
      { name: 'CSA-103 | Pedestal', count: 2 },
      { name: 'CSA-104 | Actuator Mount', count: 1 },
      { name: 'CSA-105 | Control Horn', count: 1 },
      { name: 'CSA-106 | Stop Bracket', count: 1 },
      { name: 'CSA-107 | Hinge Shaft', count: 1 },
      { name: 'CSA-108 | Link Pin', count: 2 },
      { name: 'CSA-109 | Shaft Cap', count: 2 },
      { name: 'Actuonix L12 actuator (fixed + rod)', count: 2 },
      { name: 'GFM-060806 plain bearing', count: 2 },
      { name: 'Fasteners, washers, nuts and leads', count: 74 },
    ],
    fileProperties: [
      { label: 'Name', value: 'CSA-001_B.step' },
      { label: 'Description', value: 'FreeCAD Model' },
      { label: 'Title', value: 'Open CASCADE Shape Model' },
      { label: 'Original System', value: 'FreeCAD' },
      { label: 'Preprocessor', value: 'Open CASCADE STEP processor 7.8' },
      { label: 'Creation Date', value: '2026-Sep-16 10:20:15' },
      { label: 'Authorisation', value: 'Unknown' },
    ],
  },  {
    id: 'epn-24',
    code: 'EPN24',
    name: 'Electric Propulsion Nacelle Assembly',
    fullTitle: 'EPN24 \u2014 NacelleAssembly (installed assembly)',
    revision: 'Installed assembly',
    file: 'models/epn-24.glb',
    sourceFile: 'EPN24_INSTALLED_ASSEMBLY_PCURVE_REPAIRED.step',
    thumbnail: 'images/epn-24_thumb.png',
    designedIn: 'FreeCAD',
    shortDescription:
      'An installed electric propulsion nacelle: an AT4120 KV500 motor on a front carrier with integral pylon and rail structure, an AT115A ESC on its tray, and a three-piece cowling with a removable nose. Phase wiring routes through tilted saddles and recessed guides, with upper-vent guides ducting cooling air.',
    description:
      'Installed electric propulsion nacelle built around purchased power components. The AT4120 KV500 motor sits on the front carrier with its factory X-mount and prop adapter interfaces; the structure carries through left and right rails, an integral pylon and a rear frame. The AT115A ESC mounts on a dedicated tray, with phase wiring routed as XT150 phase pairs through tilted phase saddles, a recessed centre wire guide and front phase allocations. Cooling is handled by upper-vent insulating guides over the power electronics, and the three-piece cowling \u2014 upper, lower and a removable nose \u2014 closes the installation with service access.',
    specs: [
      { label: 'Components', value: '38 placed parts \u00b7 26 unique' },
      { label: 'Envelope', value: '120.7 \u00d7 135.7 \u00d7 224.7 mm' },
      { label: 'Motor', value: 'AT4120 KV500' },
      { label: 'ESC', value: 'AT115A' },
      { label: 'Source format', value: 'STEP AP242 (FreeCAD)' },
    ],
    highlights: [
      'Integral pylon and rail-mounted carrier structure',
      'Three-piece cowling with removable nose for service',
      'Upper-vent guides ducting cooling air',
      'AT4120 motor and AT115A ESC interfaces',
    ],
    parts: [
      { name: 'Front carrier (EPN24-101)', count: 1 },
      { name: 'Rear frame (EPN24-102)', count: 1 },
      { name: 'Rails LH / RH (EPN24-103L/R)', count: 2 },
      { name: 'Integral pylon (EPN24-104)', count: 1 },
      { name: 'ESC tray (EPN24-105)', count: 1 },
      { name: 'Upper cowling (EPN24-106)', count: 1 },
      { name: 'Lower cowling (EPN24-107)', count: 1 },
      { name: 'Removable nose cowling (EPN24-108)', count: 1 },
      { name: 'Rail bridge spacers (EPN24-110)', count: 4 },
      { name: 'Tilted phase saddles (EPN24-113A/B)', count: 2 },
      { name: 'Upper-vent insulating guides (EPN24-114)', count: 2 },
      { name: 'Recessed centre wire guide (EPN24-115)', count: 1 },
      { name: 'Silicone connector seat blanks (EPN24-116)', count: 6 },
      { name: 'Motor interfaces \u2014 AT4120 KV500, X mount, prop adapter', count: 3 },
      { name: 'ESC interfaces and strip allocations', count: 5 },
      { name: 'Phase wiring \u2014 XT150 pairs and front phase routing', count: 6 },
    ],
    fileProperties: [
      { label: 'Name', value: 'EPN24_INSTALLED_ASSEMBLY_PCURVE_REPAIRED.step' },
      { label: 'Description', value: 'FreeCAD Model' },
      { label: 'Title', value: 'Open CASCADE Shape Model' },
      { label: 'Original System', value: 'FreeCAD' },
      { label: 'Preprocessor Version', value: 'Open CASCADE STEP processor 7.8' },
      { label: 'Creation Date', value: '2026-Oct-24 15:02:01' },
      { label: 'Authorisation', value: 'Unknown' },
    ],
  },  {
    id: 'lgr-r01',
    code: 'LGR',
    name: 'Landing-Gear Retraction Mechanism',
    fullTitle: 'LGR \u2014 Landing-gear retraction mechanism | Final deployed R01',
    revision: 'Final \u00b7 Deployed R01',
    file: 'models/lgr-r01.glb',
    sourceFile: 'LGR_final_deployed_R01.step',
    thumbnail: 'images/lgr-r01_thumb.png',
    designedIn: 'FreeCAD',
    shortDescription:
      'A landing-gear retraction mechanism in the deployed, gear-down position: strut geometry with attachment fittings and pivots, a link train and retraction actuator, down-lock features, and the wheel-bay boundary the gear retracts into.',
    description:
      'Landing-gear retraction mechanism shown in its final deployed configuration. The assembly carries the strut geometry on attachment fittings and pivot joints, with the linkage train and retraction actuator that fold the gear into the bay, locking features that hold the gear down, and a representation of the wheel-bay boundary for packaging. Note on the file: this STEP exported from FreeCAD as a single fused compound, so the viewer presents its 55 constituent solid bodies (Body 01\u201355, ordered by size) rather than the original part names \u2014 geometry, selection, section and explode all work per body.',
    specs: [
      { label: 'Components', value: '55 solid bodies' },
      { label: 'Envelope', value: '421.4 \u00d7 200.2 \u00d7 657.2 mm' },
      { label: 'Configuration', value: 'Deployed (gear down)' },
      { label: 'Source format', value: 'STEP AP242 (FreeCAD)' },
    ],
    highlights: [
      'Deployed, gear-down configuration',
      'Strut, pivot and link-train geometry',
      'Retraction actuator and down-lock features',
      'Wheel-bay boundary included for packaging',
    ],
    parts: [
      { name: 'Strut geometry', count: null },
      { name: 'Attachment fittings', count: null },
      { name: 'Pivots and hinge pins', count: null },
      { name: 'Linkage links', count: null },
      { name: 'Retraction actuator', count: null },
      { name: 'Locking features (down-lock)', count: null },
      { name: 'Wheel-bay boundary representation', count: null },
      { name: 'Fasteners, washers and spacers', count: null },
      { name: 'Solid bodies in the STEP export', count: 55 },
    ],
    fileProperties: [
      { label: 'Name', value: 'LGR_final_deployed_R01.step' },
      { label: 'Description', value: 'FreeCAD Model' },
      { label: 'Title', value: 'Open CASCADE Shape Model' },
      { label: 'Original System', value: 'FreeCAD' },
      { label: 'Preprocessor Version', value: 'Open CASCADE STEP processor 7.8' },
      { label: 'Creation Date', value: '2026-Sep-16 22:26:41' },
      { label: 'Authorisation', value: 'Unknown' },
    ],
  },  {
    id: 'tra-001',
    code: 'TRA-001',
    name: 'Turbomachinery Rotor Assembly',
    fullTitle: 'TRA-001 \u2014 Turbomachinery rotor assembly | R01',
    revision: 'R01',
    file: 'models/tra-001.glb',
    sourceFile: 'TRA-001_R01_Assembly36.step',
    thumbnail: 'images/tra-001_thumb.png',
    designedIn: 'Open CASCADE',
    shortDescription:
      'A turbomachinery rotor and bearing-support module: an impeller on a keyed shaft, carried by a pair of 6204 bearings in a support cartridge with spacers, retainers and lock hardware, inside a casing with an inlet cover.',
    description:
      'Turbomachinery rotor and bearing-support module. The impeller mounts on the shaft with twin 6\u00d76\u00d720 keys; the shaft is carried by two 6204 deep-groove bearings seated in the support cartridge, located by the spacer, clamp washer, KM4 locknut and MB4 lock washer, and closed by the front retainer and rear cap. The casing surrounds the module with a bolted inlet cover, and the joint faces are fastened with M4, M5, M6 and M8 socket and countersunk screws.',
    specs: [
      { label: 'Components', value: '36 placed parts \u00b7 18 unique' },
      { label: 'Envelope', value: '234.5 \u00d7 265.5 \u00d7 167.3 mm' },
      { label: 'Bearings', value: '6204 deep-groove \u00d72' },
      { label: 'Source format', value: 'STEP AP242 (Open CASCADE)' },
    ],
    highlights: [
      'Impeller on a keyed shaft (6\u00d76\u00d720 keys)',
      'Twin 6204 bearings in a support cartridge',
      'Front retainer, rear cap and clamp washer stack',
      'Casing with bolted inlet cover',
    ],
    parts: [
      { name: 'Impeller (TRA001_01)', count: 1 },
      { name: 'Shaft (TRA001_02)', count: 1 },
      { name: 'Bearing cartridge (TRA001_03)', count: 1 },
      { name: 'Front retainer (TRA001_04)', count: 1 },
      { name: 'Rear cap (TRA001_05)', count: 1 },
      { name: 'Spacer (TRA001_06)', count: 1 },
      { name: 'Clamp washer (TRA001_07)', count: 1 },
      { name: 'Casing (TRA001_08)', count: 1 },
      { name: 'Inlet cover (TRA001_09)', count: 1 },
      { name: 'Bearings \u2014 6204 deep-groove', count: 2 },
      { name: 'Shaft keys 6\u00d76\u00d720', count: 2 },
      { name: 'KM4 locknut and MB4 lock washer', count: 2 },
      { name: 'Socket and countersunk fasteners (M4\u2013M8)', count: 21 },
    ],
    fileProperties: [
      { label: 'Name', value: 'TRA-001_R01_Assembly36.step' },
      { label: 'Description', value: 'Open CASCADE Model' },
      { label: 'Title', value: 'Open CASCADE Shape Model' },
      { label: 'Original System', value: 'Open CASCADE 7.9' },
      { label: 'Preprocessor Version', value: 'Open CASCADE STEP processor 7.9' },
      { label: 'Creation Date', value: '2026-Oct-25 12:23:33' },
      { label: 'Authorisation', value: 'Unknown' },
    ],
  },  {
    id: 'p02-sdm',
    code: 'SDM001',
    name: 'Satellite Deployment Mechanism',
    fullTitle: 'SDM001 \u2014 Parameter-driven installed assembly | P02',
    revision: 'States 0\u00b0\u201390\u00b0',
    file: 'models/p02-state-00.glb',
    sourceFile: 'Assembly_P02_state_00\u201390.step (7 files)',
    thumbnail: 'images/p02-sdm_thumb.png',
    designedIn: 'FreeCAD',
    states: [
      { label: '0\u00b0', file: 'models/p02-state-00.glb' },
      { label: '15\u00b0', file: 'models/p02-state-15.glb' },
      { label: '30\u00b0', file: 'models/p02-state-30.glb' },
      { label: '45\u00b0', file: 'models/p02-state-45.glb' },
      { label: '60\u00b0', file: 'models/p02-state-60.glb' },
      { label: '75\u00b0', file: 'models/p02-state-75.glb' },
      { label: '90\u00b0', file: 'models/p02-state-90.glb' },
    ],
    shortDescription:
      'A satellite panel deployment mechanism on twin hinge lines: a fixed module with base, yokes, posts and hold-down hardware, and a moving module carrying the panel. Step through all seven states in the viewer \u2014 0\u00b0 stowed to 90\u00b0 deployed.',
    description:
      'Parameter-driven satellite deployment mechanism, supplied as seven installed states from 0\u00b0 (stowed) to 90\u00b0 (deployed) in 15\u00b0 steps. The fixed module carries the base, left and right yokes and posts with pivot hardware, hold-down and stop bolts, jam nuts and lock spacers; the moving module carries the panel on hinge leaves with bushes, moving contacts and panel ties. Torsion-spring elements on both hinge lines drive the deployment, thrust and pivot washers set the hinge stack, and a routed cable crosses the hinge line. Use the configuration bar under the viewer to step through the states or play the deployment.',
    specs: [
      { label: 'Components', value: '69 parts \u00b7 fixed + moving modules' },
      { label: 'Envelope', value: '240.3 \u00d7 538.9 mm \u00b7 height 181.9\u2013365.3 mm' },
      { label: 'Configurations', value: '7 states \u00b7 0\u00b0\u201390\u00b0 in 15\u00b0 steps' },
      { label: 'Source format', value: 'STEP AP242 (FreeCAD)' },
    ],
    highlights: [
      'Seven configurations, 0\u00b0 stowed to 90\u00b0 deployed',
      'Twin hinge lines with torsion-spring elements',
      'Hold-down, stop and lock hardware on both posts',
      'Cable routing and panel ties included',
    ],
    parts: [
      { name: 'Base', count: 1 },
      { name: 'Yokes, left / right', count: 2 },
      { name: 'Posts, left / right', count: 2 },
      { name: 'Pivots, left / right', count: 2 },
      { name: 'Hinge leaves, left / right', count: 2 },
      { name: 'Panel', count: 1 },
      { name: 'Torsion spring elements', count: 4 },
      { name: 'Contacts, fixed + moving, left / right', count: 4 },
      { name: 'Lock spacers, thrust washers, pivot washers, rings', count: 8 },
      { name: 'Locknuts, left / right', count: 2 },
      { name: 'Hinge bushes', count: 4 },
      { name: 'Cable', count: 1 },
      { name: 'Base ties and panel ties', count: 4 },
      { name: 'Bolts, washers, grub screws and jam nuts', count: 32 },
    ],
    fileProperties: [
      { label: 'Name', value: 'Assembly_P02_state_00.step (+ 6 state files)' },
      { label: 'Description', value: 'FreeCAD Model' },
      { label: 'Title', value: 'Open CASCADE Shape Model' },
      { label: 'Original System', value: 'FreeCAD' },
      { label: 'Preprocessor Version', value: 'Open CASCADE STEP processor 7.8' },
      { label: 'Creation Date', value: '2026-Oct-25 18:39:23' },
      { label: 'Authorisation', value: 'Unknown' },
    ],
  },  {
    id: 'smpcl-r01',
    code: 'SMPCL',
    name: 'Spacecraft Pumped Cooling Loop',
    fullTitle: 'SMPCL \u2014 Mechanically pumped cooling-loop assembly | Complete R01',
    revision: 'Complete \u00b7 R01',
    file: 'models/smpcl-r01.glb',
    sourceFile: 'SMPCL_Complete_Assembly_R01_0_awtb.step',
    thumbnail: 'images/smpcl-r01_thumb.png',
    designedIn: 'FreeCAD',
    shortDescription:
      'A spacecraft mechanically pumped cooling loop on its mounting frame: equipment cold plates and a fixed radiator on uprights, a circulation-pump module with supply and return manifolds, an accumulator for fluid expansion, control and isolation valves, temperature and pressure sensing, and the full tubing set.',
    description:
      'Complete mechanically pumped cooling loop for a spacecraft equipment deck. Two cold plates with spreaders and formed 316L coolant tubes pick up equipment heat; the circulation-pump module drives the loop through the supply and return headers and central junctions, with flow-control, bypass and isolation valves among the purchased fluid interfaces and catalog parts. The accumulator accommodates fluid expansion across the temperature range, and the fixed radiator \u2014 carried on left and right machined uprights \u2014 rejects the heat to space. Pressure pods P1 and P2 (P1 with an integral WIKA boss), the instrument and service manifold, and the pump hoses and sensor cordsets provide the temperature and pressure sensing, and 29 installed tube runs (SMPCL-4xx) connect everything on the mounting frame.',
    specs: [
      { label: 'Components', value: '75 assemblies & parts' },
      { label: 'Envelope', value: '700.9 \u00d7 483.0 \u00d7 710.7 mm' },
      { label: 'Radiator', value: 'Fixed panel on machined uprights' },
      { label: 'Source format', value: 'STEP AP242 (FreeCAD)' },
    ],
    highlights: [
      'Cold plates with formed 316L coolant tubes',
      'Accumulator accommodating fluid expansion',
      'Fixed radiator on machined uprights',
      'Pressure pods and sensor cordsets for T/P sensing',
    ],
    parts: [
      { name: 'Equipment deck (SMPCL-100)', count: 1 },
      { name: 'Radiator uprights and foot angles (SMPCL-101/102, L/R)', count: 4 },
      { name: 'Radiator assembly', count: 1 },
      { name: 'Cold plate spreaders (SMPCL-110)', count: 2 },
      { name: 'Formed 316L cold-plate tubes (SMPCL-111)', count: 2 },
      { name: 'Tube clamp bars (SMPCL-112)', count: 4 },
      { name: 'Cold-plate dry spacers (SMPCL-113)', count: 8 },
      { name: 'Accumulator (reservoir) with supports', count: 1 },
      { name: 'Pressure pods P1 / P2 (SMPCL-222)', count: 2 },
      { name: 'Instrument and service manifold (SMPCL-223)', count: 1 },
      { name: 'Supply / return headers and central junctions', count: null },
      { name: 'Circulation pump, valves and sensors (catalog parts)', count: null },
      { name: 'Purchased fluid interfaces', count: null },
      { name: 'Pump hoses and sensor cordsets', count: null },
      { name: 'Installed tube runs (SMPCL-4xx)', count: 29 },
      { name: 'Mounting frame, braces and service supports', count: null },
    ],
    fileProperties: [
      { label: 'Name', value: 'SMPCL_Complete_Assembly_R01_0_awtb.step' },
      { label: 'Description', value: 'FreeCAD Model' },
      { label: 'Title', value: 'Open CASCADE Shape Model' },
      { label: 'Original System', value: 'FreeCAD' },
      { label: 'Preprocessor Version', value: 'Open CASCADE STEP processor 7.8' },
      { label: 'Creation Date', value: '2026-Oct-29 09:44:39' },
      { label: 'Authorisation', value: 'Unknown' },
    ],
  },
];
