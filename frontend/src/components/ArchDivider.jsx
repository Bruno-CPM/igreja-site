import './ArchDivider.css';

/** Divisor decorativo — fileira de arcos, como janelas de capela,
 *  o elemento assinatura visual do site. */
export default function ArchDivider({ tone = 'gold', flip = false }) {
  const arches = 14;
  const width = 1200;
  const height = 46;
  const step = width / arches;
  let d = `M0,${height} `;
  for (let i = 0; i < arches; i++) {
    const x1 = i * step + step / 2;
    const x2 = (i + 1) * step;
    d += `Q${x1},0 ${x2},${height} `;
  }

  return (
    <div className={`arch-divider ${flip ? 'arch-divider--flip' : ''}`} aria-hidden="true">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <path d={d} className={`arch-divider__path arch-divider__path--${tone}`} />
      </svg>
    </div>
  );
}
