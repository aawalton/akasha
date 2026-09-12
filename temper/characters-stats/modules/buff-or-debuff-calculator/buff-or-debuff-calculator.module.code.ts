import { getBuffOrDebuffId } from "akasha/temper/characters-stats/modules/buff-or-debuff-id/buff-or-debuff-id.module.code.ts"
import { isBuffOrDebuffEffect } from "akasha/temper/formula-framework/effect/effect.module.code.ts"
import {
  type EffectSource,
  isNamedSource,
} from "akasha/temper/formula-framework/effect-source/effect-source.module.code.ts"
import {
  type BuffOrDebuffSource,
  buffOrDebuff,
} from "akasha/temper/formula-framework/modules/buff-or-debuff-source/buff-or-debuff-source.module.code.ts"

export function calculateBuffs(sources: readonly EffectSource[]): readonly BuffOrDebuffSource[] {
  const buffSources: BuffOrDebuffSource[] = []

  for (const source of sources) {
    if (isNamedSource(source)) {
      buffSources.push(source)
    }
  }

  for (const source of sources) {
    if (isNamedSource(source)) {
      continue
    }

    for (const effect of source.effects) {
      if (isBuffOrDebuffEffect(effect)) {
        const buffId = getBuffOrDebuffId(effect)
        if (buffOrDebuff.has(buffId)) {
          buffSources.push(buffOrDebuff.data[buffId])
        }
      }
    }
  }

  const buffMap = new Map<string, BuffOrDebuffSource>()
  for (const buff of buffSources) {
    if (!buffMap.has(buff.id)) {
      buffMap.set(buff.id, buff)
    }
  }

  return Array.from(buffMap.values())
}
