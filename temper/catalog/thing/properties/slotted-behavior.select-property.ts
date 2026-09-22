import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const slottedBehavior = {
  id: "01a0cb51-ae76-7c12-a111-705f0e49944c",
  type: "page-type/select-property",
  slug: "slotted-behavior",
  propertySlug: "slotted-behavior",
  definition: "which bar a slotted ability affects",
  values: ["active-bar-only", "either-bar"],
  types: "ts",
} as const satisfies SelectProperty
