import type { NumberProperty } from "@akasha/pages-system/number-property"

export type RepeatableType = number

export const repeatableType = {
  id: "01a05fcd-f553-7f0c-93bb-05bec8327fe5",
  pageTypeSlug: "number-property",
  slug: "repeatable-type",
  propertySlug: "repeatable-type",
  definition: "how often a quest may be taken again",
  max: null,
} as const satisfies NumberProperty
