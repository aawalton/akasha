import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { CharacterConditionField } from "akasha/temper/player/progress/temper-inventory-rule/properties/character-condition-field.relation-property.types.ts"
import type { SkillLines } from "akasha/temper/player/progress/temper-inventory-rule/properties/skill-lines.multi-relation-property.types.ts"
import type { ConditionValue } from "akasha/temper/player/progress/temper-rule/properties/condition-value.text-property.types.ts"

export type CharacterConditions = List<{
  characterConditionField: CharacterConditionField
  conditionValue: ConditionValue
  skillLines?: SkillLines
}>
