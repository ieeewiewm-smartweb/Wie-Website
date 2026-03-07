import { useEffect, useRef, useState } from "react";

type FactItem = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
};

const FACTS: FactItem[] = [
  { value: 100, label: "Members", suffix: "+" },
  { value: 10, label: "Events", suffix: "+" },
  { value: 5, label: "Awards", suffix: "+" },
  { value: 500, label: "Participations", suffix: "+" },
];

function CountUpNumber({
  end,
  duration = 3500,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            setAnimated(true);

            let start: number | null = null;

            const animate = (timestamp: number) => {
              if (!start) start = timestamp;
              const progress = Math.min((timestamp - start) / duration, 1);
              const eased = 1 - Math.pow(2, -10 * progress);
              setCount(Math.floor(end * eased));

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [end, duration, animated]);

  return (
    <div
      ref={ref}
      className="font-extrabold text-5xl md:text-6xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tabular-nums"
      style={{ lineHeight: '1.2' }}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export default function CountUpSection() {
  return (
    <section className="relative z-20 py-8 bg-purple-50/50">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FACTS.map((fact, i) => (
            <div
              key={i}
              className="relative z-10 px-6 py-10 text-center rounded-2xl bg-white/90 backdrop-blur-md border-2 border-purple-200 shadow-lg hover:shadow-xl hover:border-purple-400 transition-all duration-300 hover:-translate-y-2 hover:scale-105"
            >
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none" />
              <div className="relative z-10">
                <CountUpNumber
                  end={fact.value}
                  prefix={fact.prefix}
                  suffix={fact.suffix}
                />
                <p className="mt-4 text-sm uppercase tracking-widest text-gray-600 font-semibold">
                  {fact.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
