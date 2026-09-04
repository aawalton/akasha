import type { TextProperty } from "@akasha/pages-system/text-property"

export type UpgradeCardName = string

export const upgradeCardName = {
  id: "01a06153-0ea9-7006-b19d-80f29674a96e",
  pageTypeSlug: "text-property",
  slug: "upgrade-card-name",
  propertySlug: "upgrade-card-name",
  definition: "the name a card is shown under once it is upgraded",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
