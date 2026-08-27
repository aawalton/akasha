"use client"

import { useMemo, useState } from "react"

interface EquipmentIconProps {
  primarySrc?: string | null
  fallbackSrc?: string | null
  alt: string
  size?: number
  className?: string
}

export function EquipmentIcon({
  primarySrc,
  fallbackSrc,
  alt,
  size = 48,
  className,
}: EquipmentIconProps) {
  const [useFallback, setUseFallback] = useState(false)

  const src = useMemo(() => {
    if (!useFallback && primarySrc != null && primarySrc !== "") return primarySrc
    if (fallbackSrc != null && fallbackSrc !== "") return fallbackSrc
    return "/placeholder.svg"
  }, [fallbackSrc, primarySrc, useFallback])

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      className={className ?? "h-full w-full object-cover"}
      onError={() => {
        if (!useFallback) setUseFallback(true)
      }}
    />
  )
}
