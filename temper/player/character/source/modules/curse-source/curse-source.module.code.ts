import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Effect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import type { EffectSourceInterface } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import {
  entryEffectsOf,
  metricNodesOf,
} from "akasha/temper/player/character/source/modules/source-effects-reading/source-effects-reading.module.code.ts"
import type { VampireStageId } from "akasha/temper/player/character/source/modules/vampire-stages/vampire-stages.module.code.ts"

export interface CurseSource extends EffectSourceInterface {
  categoryId: "curse"
}

type StageEffects = ReadonlyMap<string, readonly Effect[]>

const UNREAD =
  "the vampire stage effects are read from pages, and nothing has read them yet — gate the screen on `MetricCatalogGate`, or hold them before the work starts"

class VampireStageEffectsUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "VampireStageEffectsUnread"
  }
}

export function vampireStageEffectsOf(
  stages: Iterable<Value>,
  nodes: Iterable<Value>
): StageEffects {
  const metricNodes = metricNodesOf(nodes)
  const found = new Map<string, readonly Effect[]>()
  for (const stage of stages) {
    const at = `the vampire stage page \`${String(stage.slug)}\``
    const effects = entryEffectsOf(stage, metricNodes, at)
    if (typeof stage.key === "string" && effects.length > 0) found.set(stage.key, effects)
  }
  return found
}

let held: StageEffects | null = null

export function holdVampireStageEffects(read: StageEffects): StageEffects {
  held = read
  return read
}

export function getCurseSource(stageId: VampireStageId): CurseSource | null {
  if (held === null) throw new VampireStageEffectsUnread()
  const effects = held.get(stageId)
  if (!effects) return null

  return {
    id: `vampire-${stageId}`,
    categoryId: "curse",
    effects,
  }
}
