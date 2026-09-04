import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type UseAccentColor = boolean

export const useAccentColor = {
  id: "01a05fcb-d655-7cba-895a-f1c3ce49463c",
  pageTypeSlug: "boolean-property",
  slug: "use-accent-color",
  propertySlug: "use-accent-color",
  definition: "whether a node is drawn in the accent color rather than the plain one",
} as const satisfies BooleanProperty
