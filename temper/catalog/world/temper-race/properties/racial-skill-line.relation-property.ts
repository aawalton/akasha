import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const racialSkillLine = {
  id: "01a0deec-4a5c-714c-8641-cac857769f36",
  type: "page-type/relation-property",
  slug: "racial-skill-line",
  propertySlug: "racial-skill-line",
  definition: "the skill line a race's own people are born to",
  targetPageType: "page-type/temper-skill-line",
  types: "ts",
} as const satisfies RelationProperty
