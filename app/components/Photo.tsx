import Image from "next/image";
import { unsplashUrl, type Photo as PhotoT } from "../lib/images";

type Props = {
  photo: PhotoT;
  className?: string;
  /** Sizes attribute for responsive serving. Defaults to full viewport. */
  sizes?: string;
  /** If true, the image fills its parent with object-cover. Parent needs `relative`. */
  fill?: boolean;
  /** Optional priority (use for above-the-fold images only). */
  priority?: boolean;
  /** Show credit overlay at bottom-right. */
  showCredit?: boolean;
};

export default function Photo({
  photo,
  className = "",
  sizes = "100vw",
  fill = true,
  priority = false,
  showCredit = false,
}: Props) {
  return (
    <figure className={`relative overflow-hidden ${className}`}>
      {fill ? (
        <Image
          src={unsplashUrl(photo.src)}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <Image
          src={unsplashUrl(photo.src)}
          alt={photo.alt}
          width={1600}
          height={Math.round(1600 / (photo.aspect ?? 1.5))}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full object-cover"
        />
      )}
      {showCredit && (
        <figcaption className="pointer-events-auto absolute bottom-3 right-3 z-10 font-mono text-[10px] uppercase tracking-widest text-white/70 mix-blend-difference">
          <a href={photo.credit.href} target="_blank" rel="noopener noreferrer">
            Foto · {photo.credit.name} / Unsplash
          </a>
        </figcaption>
      )}
    </figure>
  );
}
