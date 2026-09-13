import { cn } from "@/lib/utils";

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function SpecimenPlate({
  seed,
  className,
  label,
}: {
  seed: string;
  className?: string;
  label?: string;
}) {
  const h = hash(seed);
  const b = ((h >>> 8) % 40) + 18;
  const c = ((h >>> 16) % 30) + 10;
  const rot = (h >>> 4) % 24;
  const rx = 28 + ((h >>> 12) % 36);
  const ry = 34 + ((h >>> 20) % 28);
  const innerRx = Math.max(8, rx - 12);
  const innerRy = Math.max(10, ry - 10);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-elevated outline outline-1 -outline-offset-1 outline-white/10",
        className,
      )}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <svg viewBox="0 0 160 200" className="h-full w-full">
        <rect width="160" height="200" fill="#111318" />
        <ellipse
          cx="80"
          cy="108"
          rx={rx}
          ry={ry}
          fill="none"
          stroke="#d4c4a8"
          strokeOpacity="0.35"
          strokeWidth="1.2"
          transform={`rotate(${rot} 80 108)`}
        />
        <ellipse
          cx="80"
          cy="108"
          rx={innerRx}
          ry={innerRy}
          fill="#5d6b58"
          fillOpacity="0.22"
        />
        <path
          d={`M80 40 C ${60 + (h % 20)} ${70 + c}, ${40 + b} ${120}, 80 ${160 + (h % 8)} C ${120 - b} ${120}, ${100 - (h % 20)} ${70 + c}, 80 40`}
          fill="none"
          stroke="#eee6d6"
          strokeOpacity="0.55"
          strokeWidth="1.4"
        />
        <circle cx="80" cy={88 + (h % 16)} r="3" fill="#eee6d6" fillOpacity="0.7" />
        <line x1="24" y1="24" x2="136" y2="24" stroke="#eee6d6" strokeOpacity="0.16" />
        <line x1="24" y1="176" x2="136" y2="176" stroke="#eee6d6" strokeOpacity="0.16" />
      </svg>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-bg/50" />
    </div>
  );
}
