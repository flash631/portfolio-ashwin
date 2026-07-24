# Portfolio redesign direction

## Pass 1 — extracted system

The reference presents Ashwin as an aerospace systems engineer through a precise technical dossier, not a conventional personal landing page. The opening view should feel like one composed engineering sheet: a strong nameplate, a real portrait, compact evidence, and structured data below it.

### Color tokens

- `#FFFFFF` — sheet white; the locked default background from the reference.
- `#080A0D` — ink; headings, navigation, and structural emphasis.
- `#0757E8` — signal blue; links, rules, labels, and the portrait edge.
- `#003CB8` — deep signal; contact-band depth and active states.
- `#D9DEE7` — drafting line; borders, grid lines, and dividers.
- `#F3F5F8` — instrument wash; quiet section and media backgrounds.

### Typography roles

- **Archivo, 800–900:** display name, section titles, and numeric evidence. Its broad, squared grotesk forms match the reference’s assertive nameplate.
- **IBM Plex Sans, 400–700:** body copy, navigation, labels, metadata, and controls. Its technical clarity keeps dense information readable.

### Layout concept

Desktop keeps a 104 px technical rail and a single bordered canvas. The hero uses a seven-column information field and a five-column portrait/quote field. Below it, publications, projects, and skills form one continuous evidence band rather than disconnected cards. The simulation feature and contact band provide the final visual shift.

```text
┌──────┬──────────────────────────────────────────────────────────────┐
│ AM • │ aerospace engineer          about  work  projects  ...      │
├──────┼───────────────────────────────┬──────────────────────────────┤
│ VER- │ HELLO / ASHWIN M R            │ portrait        quote        │
│ TI-  │ discipline + evidence         │                             │
│ CAL  │                               │                             │
├──────┼─────────────────┬─────────────┴──────────────┬───────────────┤
│ RAIL │ publications    │ featured projects         │ skills        │
├──────┼─────────────────┴────────────────────────────┼───────────────┤
│      │ featured simulation                          │ contact       │
└──────┴──────────────────────────────────────────────┴───────────────┘
```

Tablet collapses the hero to copy beside portrait, then stacks the evidence band in two columns. Mobile becomes a clean vertical dossier: compact header, name, portrait, proof strip, and content sections with no horizontal scrolling.

```text
┌──────────────────────┐
│ AM •          menu   │
├──────────────────────┤
│ HELLO, I'M           │
│ ASHWIN M R           │
│ aerospace systems    │
├──────────────────────┤
│ portrait             │
├──────────────────────┤
│ evidence 2 × 2       │
├──────────────────────┤
│ experience           │
│ publications         │
│ projects             │
│ simulations          │
│ skills               │
│ contact              │
└──────────────────────┘
```

### Signature element

The **engineering datum rail** combines the vertical discipline statement with a live scroll-progress rule. It turns the reference’s left margin into a useful orientation device and visually ties every section to one measured coordinate system.

## Pass 2 — brief check and revisions

The first pass risked reading like a generic portfolio dashboard if every project became an equal card. The reference is more specific: it treats work as evidence in a technical publication layout. The revised direction therefore:

- keeps the first viewport dominated by the oversized split name and portrait;
- uses the repository’s CFD plots and project captures as working evidence, not decorative stock imagery;
- presents the VSSC apprenticeship as a dated field note rather than adding another card family;
- continues the drafting rules and sharp corners throughout instead of introducing fashionable rounded containers;
- uses one orchestrated entrance sequence and a scroll-progress datum, removing decorative animation elsewhere;
- keeps repository-backed detail below the reference-like overview so accuracy does not compromise the opening composition.

Success means the 1448 × 1086 desktop capture retains the reference’s composition and tone, while 1024 px, 768 px, 390 px, and 360 px views remain readable, keyboard-operable, and free of clipping or horizontal overflow.

## Content-expansion direction

### Pass 1 — extension system

The expanded portfolio keeps the existing engineering dossier intact. New content should look like another sheet in the same technical record, not a second visual identity.

#### Locked color tokens

- `#FFFFFF` — sheet white for the main reading surface and figure plates.
- `#080A0D` — ink for headings, rules, and case-study structure.
- `#0757E8` — signal blue for navigation, indexes, and active controls.
- `#003CB8` — deep signal for the final contact band.
- `#D9DEE7` — drafting line for grids, form fields, and figure boundaries.
- `#F3F5F8` — instrument wash for alternating sections and quiet metadata.

#### Typography roles

- **Archivo, 700–900:** section statements, case-study titles, and large numeric identifiers.
- **IBM Plex Sans, 400–700:** biography, methods, captions, navigation, form controls, and simulation prose.
- **IBM Plex Sans, 600 with tracked capitals:** compact metadata and technical labels. Skill labels increase to a readable body-caption size without changing their compact geometry.

#### Layout concept

About becomes the first full-width record after the landing summary. The biography occupies the broad reading column while three laboratory images form a staggered evidence rail. The compact contact prompt remains in the opening summary, while Contact becomes the final numbered section and combines a practical message form with direct details and research profiles.

```text
┌──────────────────────────────────────────────────────────────────┐
│ LANDING SUMMARY — unchanged                                     │
├──────┬────────────────────────────────┬──────────────────────────┤
│ 01   │ ABOUT / five-part biography    │ chamber test article     │
│      │                                ├───────────┬──────────────┤
│      │ signature                      │ IR heater │ vacuum test  │
├──────┴────────────────────────────────┴───────────┴──────────────┤
│ EXPERIENCE → PUBLICATIONS → PROJECTS → SIMULATIONS → SKILLS      │
├──────┬────────────────────────────────┬──────────────────────────┤
│ 07   │ CONTACT FORM                   │ direct details + profiles│
└──────┴────────────────────────────────┴──────────────────────────┘
```

Each simulation opens as its own hash route so static hosting and direct links remain reliable. The detail page retains the global header and datum rail, then changes the canvas into a case ledger: case navigation, title and summary, primary video, complete narrative, equations, and every captioned figure.

```text
┌──────┬───────────────────────────────────────────────────────────┐
│ rail │ ← all studies       CASE 03 / 07                         │
│      │ NASA WALL-MOUNTED HUMP                                   │
│      ├───────────────────────────────────────────────────────────┤
│      │ 01  02 [03] 04  05  06  07                              │
│      ├───────────────────────────┬───────────────────────────────┤
│      │ VIDEO / alternate view    │ objective + methodology      │
│      ├───────────────────────────┴───────────────────────────────┤
│      │ RESULTS — figure plates, captions, significance          │
└──────┴───────────────────────────────────────────────────────────┘
```

#### Signature element

The existing datum rail remains the only global signature. Simulation pages extend it with a **case coordinate strip**—seven numbered positions that reveal the active study and provide direct access to its neighbours.

### Pass 2 — brief comparison and revisions

The first exploration removed the compact contact prompt near the simulation spotlight. That changed the opening summary despite the brief asking to keep it intact, so the prompt was retained as a teaser without the `contact` anchor. The complete Contact section now owns that anchor and closes the page after Technical Skills.

The simulation concept initially introduced a new card family. That could belong to any engineering portfolio and weakened the dossier character. It was replaced by open figure plates, hard drafting rules, large case numbers, and the existing square-corner geometry. Visual inspection also showed that the old About page mislabeled its three laboratory photographs as portraits. The new section identifies the chamber article, radiant-heating setup, and vacuum test accurately, using one wide lead frame and two measured supporting frames.

The revised direction keeps the landing summary unchanged, preserves the current palette and typography, reuses every source simulation figure, makes each case directly addressable, and adds no decorative element that competes with the datum rail.
