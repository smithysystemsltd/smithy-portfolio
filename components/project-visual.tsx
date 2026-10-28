import Image from "next/image"
import type { ProjectCoverImage } from "@/app/data/case-studies"

type ProjectVisualProps = {
  image: ProjectCoverImage
  sizes: string
  priority?: boolean
  className?: string
}

export function ProjectVisual({
  image,
  sizes,
  priority = false,
  className = "",
}: ProjectVisualProps) {
  return (
    <div className={`project-visual ${className}`}>
      {image.src && image.width && image.height ? (
        <Image
          className="project-visual-image"
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
        />
      ) : (
        <div
          className="project-visual-placeholder"
          role="img"
          aria-label="Project preview unavailable. An approved image is needed."
        >
          <span>{image.placeholder.replace(/^\[|\]$/g, "")}</span>
        </div>
      )}
    </div>
  )
}
