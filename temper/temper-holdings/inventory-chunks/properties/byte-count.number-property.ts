import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ByteCount = number

export const byteCount = {
  id: "01a06003-5404-76d0-97b9-c69dffbe2eaf",
  pageTypeSlug: "number-property",
  slug: "byte-count",
  propertySlug: "byte-count",
  definition: "how many bytes a piece of a capture held",
  max: null,
} as const satisfies NumberProperty
