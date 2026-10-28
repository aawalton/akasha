import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { AbilityEquations } from "akasha/temper/catalog/skill/properties/ability-equations.text-property.types.ts"
import type { EsoSkillId } from "akasha/temper/catalog/skill/properties/eso-skill-id.number-property.types.ts"

export type SkillVariants = List<{
  esoSkillId: EsoSkillId
  equations?: AbilityEquations
}>
