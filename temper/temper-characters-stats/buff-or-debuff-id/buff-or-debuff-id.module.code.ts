import type { BuffOrDebuffEffect } from "../../formula-framework/effect/effect.module.code.ts"

export function getBuffOrDebuffId(effect: BuffOrDebuffEffect): string {
  return "buffId" in effect ? effect.buffId : effect.debuffId
}
