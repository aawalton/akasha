import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Duration = number

export const duration = {
  id: "01a06193-6ca7-76f3-852f-0350fc8086c5",
  pageTypeSlug: "number-property",
  slug: "duration",
  propertySlug: "duration",
  definition: "how many seconds an effect lasts",
  max: null,
} as const satisfies NumberProperty
