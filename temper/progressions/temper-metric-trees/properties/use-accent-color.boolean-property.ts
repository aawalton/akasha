import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const useAccentColor = {
  id: "01a05fcb-d655-7cba-895a-f1c3ce49463c",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "use-accent-color",
  propertySlug: "use-accent-color",
  definition: "whether a node is drawn in the accent color rather than the plain one",
  types: "ts",
} as const satisfies BooleanProperty
