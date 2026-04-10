type ComingSoonPageProps = {
  pageName: string;
};

const STAR_POSITIONS = [
  [12, 8],
  [55, 15],
  [80, 10],
  [92, 30],
  [8, 45],
  [70, 5],
  [30, 20],
  [85, 55],
  [5, 70],
  [60, 80],
  [40, 90],
  [95, 75],
  [20, 85],
  [75, 92],
  [48, 12],
  [18, 55],
  [65, 40],
  [88, 18],
  [35, 72],
  [33, 50],
];

const STAR_COLORS = ['#818cf8', '#a78bfa', '#fbbf24', '#c7d2fe', '#6d28d9'];

export default function ComingSoonPage({ pageName }: ComingSoonPageProps) {
  return (
    <div className="relative flex min-h-[calc(100vh-96px)] flex-col items-center justify-center overflow-hidden bg-linear-to-br from-violet-100 via-indigo-50 to-purple-100 px-4 py-10">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.5) rotate(0deg); }
          50% { opacity: 0.9; transform: scale(1) rotate(20deg); }
        }
        @keyframes zap {
          0%, 85%, 100% { opacity: 1; transform: rotate(0deg) scale(1); }
          90% { opacity: 0.3; transform: rotate(-15deg) scale(1.4); }
          95% { opacity: 1; transform: rotate(8deg) scale(0.9); }
        }
        .anim-float { animation: float 3s ease-in-out infinite; }
        .anim-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .anim-zap { animation: zap 3s ease-in-out infinite; }
      `}</style>

      {/* Twinkling stars */}
      <div className="pointer-events-none absolute inset-0">
        {STAR_POSITIONS.map(([left, top], i) => {
          const size = 6 + (i % 4) * 3;
          const duration = `${2.5 + (i % 5) * 0.7}s`;
          const delay = `${(i * 0.35) % 3}s`;
          const color = STAR_COLORS[i % STAR_COLORS.length];
          return (
            <span
              key={i}
              className="anim-twinkle absolute"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                background: color,
                clipPath:
                  'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                animationDuration: duration,
                animationDelay: delay,
              }}
            />
          );
        })}
      </div>

      {/* Floating crest */}
      <div className="anim-float mb-5">
        <svg
          className="h-20 w-20 drop-shadow-[0_0_12px_#7c3aed88]"
          viewBox="0 0 72 72"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="36,4 68,16 68,40 36,68 4,40 4,16"
            fill="#1e1b4b"
            stroke="#818cf8"
            strokeWidth="1.5"
          />
          <polygon
            points="36,4 52,16 52,34 36,50 20,34 20,16"
            fill="#312e81"
            stroke="#4338ca"
            strokeWidth="0.8"
          />
          <line x1="36" y1="10" x2="36" y2="62" stroke="#fbbf24" strokeWidth="0.8" opacity="0.6" />
          <line x1="10" y1="28" x2="62" y2="28" stroke="#fbbf24" strokeWidth="0.8" opacity="0.6" />
          <polygon
            points="36,15 39,24 49,24 41,30 44,39 36,33 28,39 31,30 23,24 33,24"
            fill="#fbbf24"
          />
          <circle cx="36" cy="10" r="2.5" fill="#c7d2fe" />
          <circle cx="62" cy="22" r="2" fill="#c7d2fe" />
          <circle cx="62" cy="40" r="2" fill="#c7d2fe" />
          <circle cx="36" cy="64" r="2.5" fill="#c7d2fe" />
          <circle cx="10" cy="40" r="2" fill="#c7d2fe" />
          <circle cx="10" cy="22" r="2" fill="#c7d2fe" />
        </svg>
      </div>

      {/* Badge */}
      <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-600 bg-indigo-950 px-4 py-1.5 text-xs tracking-widest text-indigo-200 uppercase shadow-sm">
        <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
        Work in progress
      </span>

      {/* Headline */}
      <h1 className="text-center font-serif text-3xl font-bold tracking-tight text-indigo-900 sm:text-4xl md:text-5xl">
        <span className="text-amber-400">{pageName}</span> page is
        <br />
        <span className="text-indigo-300">coming soon</span>{' '}
        <span className="anim-zap inline-block">⚡</span>
      </h1>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3 text-indigo-400 opacity-50">
        <div className="h-px w-14 bg-indigo-400" />
        ✦
        <div className="h-px w-14 bg-indigo-400" />
      </div>

      {/* Description */}
      <p className="max-w-md text-center text-base text-indigo-900 italic sm:text-lg">
        The wizards are still wiring up this section of the website. Check back later for more
        magical features. 🧙‍♀️⚡
      </p>

      <p className="mt-6 text-center text-xs text-indigo-600/70">
        (In the meantime, feel free to explore the other pages that are already live.)
      </p>
    </div>
  );
}
