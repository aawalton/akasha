import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type EsoVampireStageId = number

export const esoVampireStageId = {
  id: "01a05fc5-94ce-7081-93f6-d99c2d729a54",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "eso-vampire-stage-id",
  propertySlug: "eso-vampire-stage-id",
  definition: "the ability The Elder Scrolls Online marks a vampire stage by",
  max: null,
} as const satisfies NumberProperty
