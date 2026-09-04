import type { NumberProperty } from "@akasha/pages-system/number-property"

export type PotionSeconds = number

export const potionSeconds = {
  id: "01a05fcc-41f3-7f13-b110-e613148c2a2d",
  pageTypeSlug: "number-property",
  slug: "potion-seconds",
  propertySlug: "seconds",
  definition: "how long what a drink grants lasts",
  max: null,
} as const satisfies NumberProperty
