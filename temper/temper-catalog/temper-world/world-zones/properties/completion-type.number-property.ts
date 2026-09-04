import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CompletionType = number

export const completionType = {
  id: "01a06167-3f9b-7002-8497-0d807cc8fb98",
  pageTypeSlug: "number-property",
  slug: "completion-type",
  propertySlug: "completion-type",
  definition: "the number the game gives a kind of completion activity",
  max: null,
} as const satisfies NumberProperty
