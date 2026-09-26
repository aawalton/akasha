import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type Effect,
  isMetricEffect,
} from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import type { EffectSourceInterface } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import { sourceEffectsOf } from "akasha/temper/player/character/source/modules/source-effects-reading/source-effects-reading.module.code.ts"

const CATEGORY = "target"

type TargetSource = EffectSourceInterface & { readonly name: string }

const UNREAD =
  "the practice target is read from its page, and nothing has read it yet — gate the screen on `MetricCatalogGate`, or hold it before the work starts"

class TargetUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "TargetUnread"
  }
}

export function targetOf(pages: Iterable<Value>): TargetSource {
  const [page, ...more] = [...pages]
  if (page === undefined) throw new Error("no temper-target page states the practice target")
  if (more.length > 0) throw new Error("more than one temper-target page states a practice target")
  return {
    id: String(page.slug),
    name: String(page.title),
    categoryId: CATEGORY,
    effects: sourceEffectsOf(page, `the target page \`${String(page.slug)}\``),
  }
}

let held: TargetSource | null = null

export function holdTarget(read: TargetSource): TargetSource {
  held = read
  return read
}

function setTo(effect: Effect, armor: number, health: number): Effect {
  if (!isMetricEffect(effect)) return effect
  if (effect.metricId === "target-armor") {
    return {
      metricId: effect.metricId,
      effectType: effect.effectType,
      effectValue: armor,
    } as Effect
  }
  if (effect.metricId === "target-percent-health") {
    return {
      metricId: effect.metricId,
      effectType: effect.effectType,
      effectValue: health,
    } as Effect
  }
  return effect
}

export function createTargetSource(armor: number, health: number): TargetSource {
  if (held === null) throw new TargetUnread()
  return {
    ...held,
    effects: held.effects.map((effect) => setTo(effect, armor, health)),
  }
}
