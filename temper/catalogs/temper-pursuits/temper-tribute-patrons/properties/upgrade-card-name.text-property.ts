import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type UpgradeCardName = string

export const upgradeCardName = {
  id: "01a06153-0ea9-7006-b19d-80f29674a96e",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "upgrade-card-name",
  propertySlug: "upgrade-card-name",
  definition: "the name a card is shown under once it is upgraded",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
