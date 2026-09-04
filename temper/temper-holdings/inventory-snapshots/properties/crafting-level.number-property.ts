import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CraftingLevel = number

export const craftingLevel = {
  id: "01a0675a-f185-7e56-a6c0-0df2e6c5b864",
  pageTypeSlug: "number-property",
  slug: "crafting-level",
  propertySlug: "crafting-level",
  definition: "how far a character has come in one craft",
  max: null,
} as const satisfies NumberProperty
