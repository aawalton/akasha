import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const skillLines = {
  id: "01a0d8a2-9a9e-7ccd-915e-4d09fa54b831",
  type: "page-type/multi-relation-property",
  slug: "skill-lines",
  propertySlug: "skill-lines",
  definition: "the skill lines a character test names",
  targetPageType: "page-type/temper-skill-line",
  types: "ts",
} as const satisfies MultiRelationProperty
