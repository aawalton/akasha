import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { BuffId } from "akasha/temper/catalog/gear/thing/properties/buff-id.one-of-property.types.ts"
import type { DebuffId } from "akasha/temper/catalog/gear/thing/properties/debuff-id.relation-property.types.ts"
import type { ArmorWeight } from "akasha/temper/catalog/thing/properties/armor-weight.text-property.types.ts"
import type { EffectMetric } from "akasha/temper/catalog/thing/properties/effect-metric.relation-property.types.ts"
import type { EffectSeconds } from "akasha/temper/catalog/thing/properties/effect-seconds.number-property.types.ts"
import type { EffectType } from "akasha/temper/catalog/thing/properties/effect-type.text-property.types.ts"
import type { EffectValue } from "akasha/temper/catalog/thing/properties/effect-value.number-property.types.ts"
import type { EffectWeaponTypes } from "akasha/temper/catalog/thing/properties/effect-weapon-types.text-property.types.ts"
import type { PerWeapon } from "akasha/temper/catalog/thing/properties/per-weapon.boolean-property.types.ts"
import type { SkillLine } from "akasha/temper/catalog/thing/properties/skill-line.relation-property.types.ts"
import type { SlottedBehavior } from "akasha/temper/catalog/thing/properties/slotted-behavior.select-property.types.ts"
import type { ValuePerAbility } from "akasha/temper/catalog/thing/properties/value-per-ability.number-property.types.ts"
import type { ValuePerPiece } from "akasha/temper/catalog/thing/properties/value-per-piece.number-property.types.ts"
import type { ValueType } from "akasha/temper/catalog/thing/properties/value-type.text-property.types.ts"

export type Effects = "jsonl"

export type EffectsRow = {
  id: Id
  metricId?: EffectMetric
  type?: EffectType
  value?: EffectValue
  seconds?: EffectSeconds
  buffId?: BuffId
  debuffId?: DebuffId
  slottedBehavior?: SlottedBehavior
  valueType?: ValueType
  armorWeight?: ArmorWeight
  valuePerPiece?: ValuePerPiece
  valuePerAbility?: ValuePerAbility
  skillLineId?: SkillLine
  weaponTypes?: EffectWeaponTypes
  perWeapon?: PerWeapon
}
