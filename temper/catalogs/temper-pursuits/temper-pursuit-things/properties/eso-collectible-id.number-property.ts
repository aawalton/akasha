import type { NumberProperty } from "@akasha/pages/number-property"

export type EsoCollectibleId = number

export const esoCollectibleId = {
  id: "01a06153-0ea9-7001-b53f-073db3a36aa1",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "eso-collectible-id",
  propertySlug: "eso-collectible-id",
  definition: "the number The Elder Scrolls Online names a collectible by",
  max: null,
} as const satisfies NumberProperty
