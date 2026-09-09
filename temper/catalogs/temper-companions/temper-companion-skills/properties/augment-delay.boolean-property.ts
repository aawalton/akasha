import type { BooleanProperty } from "@akasha/pages/boolean-property"

export type AugmentDelay = boolean

export const augmentDelay = {
  id: "01a06193-6caf-7c8a-b920-962bd1e710a3",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "augment-delay",
  propertySlug: "augment-delay",
  definition: "whether a delayed effect waits on its augment",
} as const satisfies BooleanProperty
