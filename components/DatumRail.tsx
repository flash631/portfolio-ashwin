interface DatumRailProps {
  progress: number;
}

export default function DatumRail({ progress }: DatumRailProps) {
  return (
    <aside className="datum-rail" aria-hidden="true">
      <p>SYSTEMS · THERMAL · FLUIDS · SPACE</p>
      <div className="datum-track">
        <span style={{ height: `${progress * 100}%` }} />
      </div>
      <p>RESEARCH · ANALYZE · SIMULATE · INNOVATE</p>
    </aside>
  );
}
