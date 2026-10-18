export type TypeSize = 13 | 16 | 18 | 20 | 24 | 30

export type TypeFace = "medium" | "bold"

export type TypeShadow = "thin" | "thick"

const FACES: Readonly<Record<TypeFace, string>> = {
  medium: "$(MEDIUM_FONT)",
  bold: "$(BOLD_FONT)",
}

const SHADOWS: Readonly<Record<TypeShadow, string>> = {
  thin: "soft-shadow-thin",
  thick: "soft-shadow-thick",
}

export function fontOf(size: TypeSize, face: TypeFace, shadow: TypeShadow = "thin"): string {
  return `${FACES[face]}|${size}|${SHADOWS[shadow]}`
}
