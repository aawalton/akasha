import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EsoSkillId = number

export const esoSkillId = {
  id: "01a05fca-cb82-711d-a6fe-131002d73bf9",
  pageTypeSlug: "number-property",
  slug: "eso-skill-id",
  propertySlug: "eso-skill-id",
  definition: "the number The Elder Scrolls Online names a skill by",
  max: null,
} as const satisfies NumberProperty
