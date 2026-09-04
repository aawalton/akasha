import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type PerWeapon = boolean

export const perWeapon = {
  id: "01a05fe0-8429-776b-ac89-7dfabb984d17",
  pageTypeSlug: "boolean-property",
  slug: "per-weapon",
  propertySlug: "per-weapon",
  definition: "whether an effect counts once for each weapon held",
} as const satisfies BooleanProperty
