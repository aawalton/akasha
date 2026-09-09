import type { NumberProperty } from "@akasha/pages/number-property"

export type SkillRank = number

export const skillRank = {
  id: "01a05fca-cb87-7d7e-afd6-495b5195642e",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "skill-rank",
  propertySlug: "rank",
  definition: "which rank of its ability a skill is",
  max: null,
} as const satisfies NumberProperty
