import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from '@phosphor-icons/react';
import type { CadModel } from '../cadModels';

/**
 * Configuration switcher for multi-state models (e.g. stowed -> deployed).
 * Owns the active state index; reports the chosen state file to the parent,
 * which passes it to CadViewer as fileOverride. Mount with key={model.id}
 * so it resets when the model changes.
 */
export default function CadStateBar({
  model,
  onStateFile,
}: {
  model: CadModel;
  onStateFile: (file: string | undefined) => void;
}) {
  const states = model.states ?? [];
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number | null>(null);

  const pick = (i: number) => {
    setIdx(i);
    onStateFile(states[i].file);
  };

  useEffect(() => {
    if (!playing) return;
    timer.current = window.setInterval(() => {
      setIdx((cur) => {
        if (cur >= states.length - 1) {
          setPlaying(false);
          return cur;
        }
        const next = cur + 1;
        onStateFile(states[next].file);
        return next;
      });
    }, 1100);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  if (states.length === 0) return null;
  const phase = idx === 0 ? 'Stowed' : idx === states.length - 1 ? 'Deployed' : 'Deploying';

  return (
    <div className="cad-statebar" role="group" aria-label={`${model.name} configuration`}>
      <span className="cad-statebar-label">Configuration</span>
      <div className="cad-statebar-states">
        {states.map((s, i) => (
          <button
            key={s.label}
            type="button"
            className={i === idx ? 'is-active' : ''}
            aria-pressed={i === idx}
            onClick={() => {
              setPlaying(false);
              pick(i);
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="cad-statebar-play"
        onClick={() => {
          if (!playing && idx === states.length - 1) pick(0);
          setPlaying(!playing);
        }}
      >
        {playing ? <Pause size={14} weight="fill" aria-hidden="true" /> : <Play size={14} weight="fill" aria-hidden="true" />}
        {playing ? 'Pause' : 'Play deployment'}
      </button>
      <span className="cad-statebar-current">
        {phase} · {states[idx].label}
      </span>
    </div>
  );
}
