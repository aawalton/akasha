import type { BuffOrDebuffEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"

export function getBuffOrDebuffId(effect: BuffOrDebuffEffect): string {
  return "buffId" in effect ? effect.buffId : effect.debuffId
}
