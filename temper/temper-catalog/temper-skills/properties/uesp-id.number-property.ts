import type { NumberProperty } from "@akasha/pages-system/number-property"

export type UespId = number

export const uespId = {
  id: "01a05fca-cb88-744d-a93b-5239aa02744a",
  pageTypeSlug: "number-property",
  slug: "uesp-id",
  propertySlug: "uesp-id",
  definition: "the number UESP names a thing by",
  max: null,
} as const satisfies NumberProperty
