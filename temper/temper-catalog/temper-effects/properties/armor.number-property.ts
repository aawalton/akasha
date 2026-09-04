import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Armor = number

export const armor = {
  id: "01a05fc5-94cd-70e6-aaf9-bd4eb8cb7733",
  pageTypeSlug: "number-property",
  slug: "armor",
  propertySlug: "armor",
  definition: "the resistance a target carries",
  max: null,
} as const satisfies NumberProperty
