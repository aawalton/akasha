import {
  slugAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Effect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import type { EffectSourceInterface } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import type { MetricId } from "akasha/temper/player/character/formula-framework/modules/metric-id/metric-id.module.code.ts"
import { sourceCategories } from "akasha/temper/player/character/formula-framework/modules/source-category/source-category.module.code.ts"

const CATEGORY = "base"

const SOURCE_ID = "base-stats"

type BaseSource = EffectSourceInterface & { readonly name: string }

const UNREAD =
  "the base stats are read from pages, and nothing has read them yet — gate the screen on `MetricCatalogGate`, or hold them before the work starts"

class BaseStatsUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "BaseStatsUnread"
  }
}

function effectOf(value: Value): Effect {
  const at = String(value.slug)
  const metricId = slugAt(value, "metric")
  if (metricId === null) throw new Error(`the base stat ${at} names no stat`)
  if (typeof value.value !== "number") throw new Error(`the base stat ${at} states no value`)
  if (value.effectType !== "integer" && value.effectType !== "fractional-change") {
    throw new Error(`the base stat ${at} states effect type \`${String(value.effectType)}\``)
  }
  return {
    metricId: metricId as MetricId,
    effectType: value.effectType,
    effectValue: value.value,
  } as Effect
}

export function baseStatsOf(pages: Iterable<Value>): readonly Effect[] {
  return [...pages]
    .sort((one, two) => String(one.slug).localeCompare(String(two.slug)))
    .map(effectOf)
}

let held: readonly Effect[] | null = null

export function holdBaseStats(read: readonly Effect[]): readonly Effect[] {
  held = read
  return read
}

export function baseSource(): BaseSource {
  if (held === null) throw new BaseStatsUnread()
  return {
    id: SOURCE_ID,
    name: sourceCategories().data[CATEGORY].name,
    categoryId: CATEGORY,
    effects: held,
  }
}
