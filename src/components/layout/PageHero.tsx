import Image from "next/image";
import type { ReactNode } from "react";

interface PageHeroProps {
  image: string;
  imageWebp?: string;
  imageAlt: string;
  eyebrow: string;
  badge: ReactNode;
  title: string;
  subtitle: string;
  action?: ReactNode;
}

export function PageHero({
  image,
  imageWebp,
  imageAlt,
  eyebrow,
  badge,
  title,
  subtitle,
  action,
}: PageHeroProps) {
  return (
    <section className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] bg-slate-950 overflow-hidden flex flex-col justify-between">
      <picture className="absolute inset-0 w-full h-full">
        {imageWebp && <source srcSet={imageWebp} type="image/webp" />}
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </picture>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/80 z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 w-full flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
          <span className="px-2 py-0.5 rounded bg-[#C59341] text-slate-950 font-black">
            01
          </span>
          <span className="drop-shadow-sm">{eyebrow}</span>
        </div>

        <div className="flex items-center gap-2">
          {badge}
          {action}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-14 sm:pb-16 flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-black text-white tracking-tighter drop-shadow-xl select-none leading-none">
          {title}
        </h1>
        <p className="mt-2 text-xs sm:text-sm font-mono text-slate-300 uppercase tracking-widest drop-shadow-md">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
