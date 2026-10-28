import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { AbilityEquations } from "akasha/temper/catalog/ability/properties/ability-equations.text-property.types.ts"
import type { EsoAbilityId } from "akasha/temper/catalog/ability/properties/eso-ability-id.number-property.types.ts"

export type SkillVariants = List<{
  esoAbilityId: EsoAbilityId
  equations?: AbilityEquations
}>
