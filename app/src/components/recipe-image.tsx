import Image from "next/image"

interface RecipeImageProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
}

export function RecipeImage({
  src,
  alt,
  fill = false,
  className = "",
  sizes,
  priority = false,
}: RecipeImageProps) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        className={`object-cover ${className}`}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      sizes={sizes || "(max-width: 768px) 100vw, 800px"}
      className={`w-full h-auto ${className}`}
      priority={priority}
    />
  )
}
