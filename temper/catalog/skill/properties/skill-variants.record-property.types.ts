import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { EsoSkillId } from "akasha/temper/catalog/skill/properties/eso-skill-id.number-property.types.ts"
import type { SkillEquations } from "akasha/temper/catalog/skill/properties/skill-equations.text-property.types.ts"

export type SkillVariants = List<{
  esoSkillId: EsoSkillId
  equations?: SkillEquations
}>
