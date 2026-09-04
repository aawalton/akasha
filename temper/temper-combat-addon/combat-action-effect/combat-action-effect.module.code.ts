import { LEVEL_LOW_THRESHOLD, LEVEL_TAIL } from "@akasha/temper-combat-addon/combat-action-levels"
import type { Ability, Effect } from "@akasha/temper-combat-addon/combat-action-types"

export function normalizeUnitTag(tag: string): string {
  return tag.includes("player") ? tag : "others"
}

export function buildEffect(p: {
  ability: Ability
  unitTag: string
  unitId: number
  startTime: number
  endTime: number
  stackCount?: number
  tickRate?: number
  combatEventId?: number
}): Effect {
  const duration = Math.max(0, p.endTime - p.startTime)
  const level = LEVEL_TAIL
  const effect: Effect = {
    ability: p.ability,
    unitTag: normalizeUnitTag(p.unitTag),
    unitId: p.unitId,
    startTime: p.startTime,
    endTime: p.endTime,
    duration,
    stackCount: p.stackCount !== undefined ? p.stackCount : 0,
    level,
    levelIsLow: level >= LEVEL_LOW_THRESHOLD,
    isCrux: p.ability.icon.includes("arcanist_crux"),
    ignored: false,
    ignorableDebuff: false,
    activated: false,
  }
  if (p.tickRate !== undefined) {
    effect.tickRate = p.tickRate
  }
  if (p.combatEventId !== undefined) {
    effect.combatEventId = p.combatEventId
  }
  return effect
}
