import {
  recordsIn,
  slugAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Effect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"

function effectOf(entry: Value, at: string): Effect {
  const metricId = slugAt(entry, "metric")
  if (metricId === null) throw new Error(`${at} states an effect naming no stat`)
  if (typeof entry.effectType !== "string") {
    throw new Error(`${at} states an effect on \`${metricId}\` with no effect type`)
  }
  if (typeof entry.value !== "number") {
    throw new Error(`${at} states an effect on \`${metricId}\` with no value`)
  }
  return { metricId, effectType: entry.effectType, effectValue: entry.value } as Effect
}

export function sourceEffectsOf(value: Value, at: string): readonly Effect[] {
  return recordsIn(value.effects).map((entry) => effectOf(entry, at))
}
