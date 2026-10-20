type NumberPerSeconds = {
  value: number
  seconds: number
}

type NumberForSeconds = {
  value: number
  seconds: number
}

type FractionalChangeForSeconds = {
  value: number
  seconds: number
}

type ConditionalChance = {
  value: number
  chance: number
  trigger: "on-ultimate-gain" | "on-damage-taken" | "on-ability-use"
}

type SlottedBehavior = "either-bar" | "active-bar-only"

type MetricEffectBase = {
  metricId: string
  slottedBehavior?: SlottedBehavior
  whileBuffs?: readonly string[]
  higherOf?: readonly string[]
}

export type MetricEffect =
  | (MetricEffectBase & { effectType: "integer"; effectValue: number })
  | (MetricEffectBase & { effectType: "integer-per-stack"; effectValue: number })
  | (MetricEffectBase & { effectType: "integer-per-ten-ultimate"; effectValue: number })
  | (MetricEffectBase & { effectType: "integer-per-missing-health"; effectValue: number })
  | (MetricEffectBase & { effectType: "fractional-change"; effectValue: number })
  | (MetricEffectBase & { effectType: "number"; effectValue: number })
  | (MetricEffectBase & { effectType: "number-per-seconds"; effectValue: NumberPerSeconds })
  | (MetricEffectBase & { effectType: "number-for-seconds"; effectValue: NumberForSeconds })
  | (MetricEffectBase & {
      effectType: "fractional-change-for-seconds"
      effectValue: FractionalChangeForSeconds
    })
  | (MetricEffectBase & { effectType: "conditional-chance"; effectValue: ConditionalChance })

export type MetricEffectType = MetricEffect["effectType"]

const METRIC_EFFECT_TYPES: { readonly [Type in MetricEffectType]: true } = {
  integer: true,
  "integer-per-stack": true,
  "integer-per-ten-ultimate": true,
  "integer-per-missing-health": true,
  "fractional-change": true,
  number: true,
  "number-per-seconds": true,
  "number-for-seconds": true,
  "fractional-change-for-seconds": true,
  "conditional-chance": true,
}

export function isMetricEffectType(named: unknown): named is MetricEffectType {
  return typeof named === "string" && Object.hasOwn(METRIC_EFFECT_TYPES, named)
}

type BaseBuffOrDebuffEffect = {
  seconds?: number
  slottedBehavior?: "either-bar" | "active-bar-only"
}

type BuffEffect = BaseBuffOrDebuffEffect & {
  buffId: string
}

type DebuffEffect = BaseBuffOrDebuffEffect & {
  debuffId: string
}

export type BuffOrDebuffEffect = BuffEffect | DebuffEffect

export type ArmorPieceScalingEffect = {
  metricId: string
  effectType: "armor-piece-scaling"
  armorWeight: string
  valuePerPiece: number
  valueType: "integer" | "fractional-change"
  perPiece?: boolean
}

export type SlottedAbilityScalingEffect = {
  metricId: string
  effectType: "slotted-ability-scaling"
  skillLineId: string
  valuePerAbility: number
  valueType: "integer" | "fractional-change"
  perAbility?: boolean
}

export type WeaponTypeConditionalEffect = {
  metricId: string
  effectType: "weapon-type-conditional"
  weaponTypes: readonly string[]
  effectValue: number
  valueType: "integer" | "fractional-change"
  perWeapon?: boolean
}

export type Effect =
  | MetricEffect
  | BuffOrDebuffEffect
  | ArmorPieceScalingEffect
  | SlottedAbilityScalingEffect
  | WeaponTypeConditionalEffect

export function isMetricEffect<T>(effect: T): effect is T & MetricEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "metricId" in effect &&
    "effectType" in effect &&
    isMetricEffectType(effect.effectType)
  )
}

export function isBuffOrDebuffEffect<T>(effect: T): effect is T & BuffOrDebuffEffect {
  if (typeof effect !== "object" || effect === null) return false
  if ("buffId" in effect && effect.buffId) return true
  if ("debuffId" in effect && effect.debuffId) return true
  return false
}

export function isArmorPieceScalingEffect(effect: Effect): effect is ArmorPieceScalingEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "effectType" in effect &&
    effect.effectType === "armor-piece-scaling"
  )
}

export function isSlottedAbilityScalingEffect(
  effect: Effect
): effect is SlottedAbilityScalingEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "effectType" in effect &&
    effect.effectType === "slotted-ability-scaling"
  )
}

export function isWeaponTypeConditionalEffect(
  effect: Effect
): effect is WeaponTypeConditionalEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "effectType" in effect &&
    effect.effectType === "weapon-type-conditional"
  )
}
