import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoSkillId = {
  id: "01a05fca-cb82-711d-a6fe-131002d73bf9",
  type: "page-type/number-property",
  slug: "eso-skill-id",
  propertySlug: "eso-skill-id",
  definition: "the number The Elder Scrolls Online gives a skill",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
