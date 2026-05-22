type Props = {
  items: string[];
  className?: string;
};

export default function Marquee({ items, className = "" }: Props) {
  const doubled = [...items, ...items];
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className="kaelo-marquee flex w-max gap-12 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight"
          >
            {item}
            <span className="text-accent">.</span>
          </span>
        ))}
      </div>
    </div>
  );
}
