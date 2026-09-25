export type TypeSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl"

export type TypeWeight = 400 | 500 | 600 | 700

export type TypeFamily = "sans" | "mono"

const SIZES: Readonly<Record<TypeSize, number>> = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
}

const SANS: Readonly<Record<TypeWeight, string>> = {
  400: "Geist-Regular",
  500: "Geist-Medium",
  600: "Geist-SemiBold",
  700: "Geist-Bold",
}

const MONO: Readonly<Record<TypeWeight, string>> = {
  400: "GeistMono-Regular",
  500: "GeistMono-Medium",
  600: "GeistMono-Medium",
  700: "GeistMono-Medium",
}

const FONTS_AT = "Temper/bin/fonts"

export function sizeOf(size: TypeSize): number {
  return SIZES[size]
}

export function fontOf(size: TypeSize, weight: TypeWeight, family: TypeFamily = "sans"): string {
  const file = family === "mono" ? MONO[weight] : SANS[weight]
  return `${FONTS_AT}/${file}.slug|${SIZES[size]}`
}
