export interface MetricEffectEntry {
  metricId: string
  effectType: string
  effectValue: { value: number; seconds: number }
}

export interface BuffEffectEntry {
  buffId: string
  seconds: number
}

export interface DebuffEffectEntry {
  debuffId: string
  seconds: number
}

export type PoisonEffectEntry = MetricEffectEntry | BuffEffectEntry | DebuffEffectEntry

export interface PoisonEffect {
  id: string
  name: string
  cooldown?: number
  icon?: string
  isPositive?: boolean
  oppositeId?: string
  effects: readonly PoisonEffectEntry[]
}

import type { TEMPER_POISON_EFFECTS } from "./generated/temper-poison-effects.generated"

export type PoisonEffectId = (typeof TEMPER_POISON_EFFECTS)[number]["id"]
