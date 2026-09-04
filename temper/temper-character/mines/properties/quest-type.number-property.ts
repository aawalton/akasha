import type { NumberProperty } from "@akasha/pages-system/number-property"

export type QuestType = number

export const questType = {
  id: "01a05fcd-f553-70ca-826b-21fa83f0dffd",
  pageTypeSlug: "number-property",
  slug: "quest-type",
  propertySlug: "quest-type",
  definition: "the sort of quest a quest is",
  max: null,
} as const satisfies NumberProperty
