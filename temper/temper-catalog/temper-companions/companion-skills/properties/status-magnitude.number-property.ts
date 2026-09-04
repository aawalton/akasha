import type { NumberProperty } from "@akasha/pages-system/number-property"

export type StatusMagnitude = number

export const statusMagnitude = {
  id: "01a06193-6cad-7c36-85ea-f127d8db3b2a",
  pageTypeSlug: "number-property",
  slug: "status-magnitude",
  propertySlug: "magnitude",
  definition: "how strongly a status holds",
  max: null,
} as const satisfies NumberProperty
