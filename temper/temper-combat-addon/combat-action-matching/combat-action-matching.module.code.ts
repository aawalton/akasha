import { matchIconPath } from "@akasha/temper-combat-addon/combat-action-icon-path"
import {
  EFFECT_FOLLOW_TOLERANCE_MS,
  STRICT_WINDOW_MS,
} from "@akasha/temper-combat-addon/combat-action-levels"
import type { Ability, Action, Effect } from "@akasha/temper-combat-addon/combat-action-types"

function matchFunc(s1: string, s2: string, full: boolean): boolean {
  if (s1.length === 0 || s2.length === 0) {
    return false
  }
  if (s1 === s2) {
    return true
  }
  if (!full && (s1.includes(s2) || s2.includes(s1))) {
    return true
  }
  return false
}

function isSimpleWord(s: string): boolean {
  if (s.includes(" ")) {
    return false
  }
  if (s.includes("(")) {
    return false
  }
  if (s.length > 0 && s.charCodeAt(0) > 128) {
    return s.length <= 6
  }
  return true
}

function descriptionSpacedMatch(description: string, otherName: string): boolean {
  if (!otherName.includes(" ")) {
    return false
  }
  const tokens = otherName.split(" ")
  for (let start = 0; start < description.length; start = start + 1) {
    if (matchSpacedTokensAt(description, start, tokens)) {
      return true
    }
  }
  return false
}

function isWordChar(c: string): boolean {
  if (c.length !== 1) {
    return false
  }
  return (c >= "0" && c <= "9") || (c >= "a" && c <= "z") || (c >= "A" && c <= "Z")
}

function consumeWord(s: string, pos: number): number {
  let i = pos
  while (i < s.length && isWordChar(s.charAt(i))) {
    i = i + 1
  }
  return i
}

function consumeSpacedGap(s: string, pos: number): number | undefined {
  let i = pos
  if (s.charAt(i) !== " ") {
    return undefined
  }
  i = i + 1
  const a = consumeWord(s, i)
  if (a === i) {
    return undefined
  }
  i = a
  if (s.charAt(i) !== " ") {
    return undefined
  }
  i = i + 1
  const b = consumeWord(s, i)
  if (b === i) {
    return undefined
  }
  i = b
  if (s.charAt(i) !== " ") {
    return undefined
  }
  return i + 1
}

function matchSpacedTokensAt(s: string, start: number, tokens: string[]): boolean {
  const first = tokens[0]
  if (first === undefined || s.slice(start, start + first.length) !== first) {
    return false
  }
  let pos = start + first.length
  for (let k = 1; k < tokens.length; k = k + 1) {
    const afterGap = consumeSpacedGap(s, pos)
    if (afterGap === undefined) {
      return false
    }
    pos = afterGap
    const token = tokens[k]
    if (token === undefined || s.slice(pos, pos + token.length) !== token) {
      return false
    }
    pos = pos + token.length
  }
  return true
}

export function matchesAbility(ability: Ability, other: Ability, strict: boolean): boolean {
  if (ability.id === other.id) {
    return true
  }
  if (matchIconPath(ability.icon, other.icon)) {
    return true
  }
  if (other.icon2 !== undefined && matchIconPath(ability.icon, other.icon2)) {
    return true
  }
  if (ability.icon3 !== undefined && matchIconPath(ability.icon3, other.icon)) {
    return true
  }
  if (matchFunc(ability.name, other.name, true)) {
    return true
  }
  if (
    ability.progressionName !== undefined &&
    matchFunc(ability.progressionName, other.name, true)
  ) {
    return true
  }
  if (!strict && !isSimpleWord(other.name) && ability.description.length > 0) {
    if (matchFunc(ability.description, other.name, false)) {
      return true
    }
    if (descriptionSpacedMatch(ability.description, other.name)) {
      return true
    }
  }
  return false
}

export function matchesNewEffect(action: Action, effect: Effect): boolean {
  if (
    !action.flags.forGround &&
    action.endTime > action.startTime &&
    action.endTime + EFFECT_FOLLOW_TOLERANCE_MS < effect.startTime
  ) {
    return false
  }

  if (effect.ability.icon.indexOf("quest_shield_001", 17) !== -1 && action.flags.forTank) {
    return true
  }

  const isBuff = effect.ability.icon.includes("ability_buff_m")
  if (!isBuff) {
    for (const existing of action.effectList) {
      if (effect.ability.id === existing.ability.id) {
        return true
      }
    }
  }

  let strict = effect.startTime > action.startTime + action.castTime + STRICT_WINDOW_MS

  if (effect.ability.icon.includes("ability_debuff_min")) {
    strict = false
  }

  if (strict) {
    for (const endTime of action.effectEndTimes) {
      if (Math.abs(effect.startTime - endTime) < EFFECT_FOLLOW_TOLERANCE_MS) {
        strict = false
      }
    }
  }

  strict = strict || (effect.duration > 0 && effect.duration < 4000)

  if (matchesAbility(action.ability, effect.ability, strict)) {
    if (
      strict &&
      effect.duration % 1000 > 0 &&
      action.duration > 0 &&
      effect.ability.name !== action.ability.name &&
      Math.floor(effect.duration / 1000 + 0.5) !== Math.floor(action.duration / 1000 + 0.5)
    ) {
      return false
    }
    return true
  }

  return false
}

export function matchesOldEffect(action: Action, effect: Effect): boolean {
  if (action.flags.forTank && effect.ability.icon.indexOf("quest_shield_001", 17) !== -1) {
    return true
  }
  if (action.tickEffect !== undefined && action.tickEffect.ability.id === effect.ability.id) {
    return true
  }
  for (const e of action.effectList) {
    if (e.ability.id === effect.ability.id && (e.unitId === effect.unitId || effect.unitId === 0)) {
      return true
    }
  }
  const s1 = action.stackEffect
  if (
    s1 !== undefined &&
    s1.ability.id === effect.ability.id &&
    (s1.unitId === effect.unitId || effect.unitId === 0)
  ) {
    return true
  }
  const s2 = action.stackEffect2
  if (
    s2 !== undefined &&
    s2.ability.id === effect.ability.id &&
    (s2.unitId === effect.unitId || effect.unitId === 0)
  ) {
    return true
  }
  return false
}
