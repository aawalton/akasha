import type { DurationCtx } from "@akasha/temper-combat-addon/combat-action-duration"
import {
  getDuration,
  getEndTime,
  getStackEffect2,
  optEffect,
} from "@akasha/temper-combat-addon/combat-action-duration"
import type { Action, Effect } from "@akasha/temper-combat-addon/combat-action-types"

const ABILITY_TYPE_AREAEFFECT = 22

function isLongDuration(effect: Effect): boolean {
  return effect.duration > 39000
}

function peekLongDurationEffect(action: Action): Effect | undefined {
  for (const effect of action.effectList) {
    if (isLongDuration(effect)) {
      return effect
    }
  }
  return undefined
}

function getMaxOriginEffectDuration(action: Action): number {
  let max = action.duration
  for (const effect of action.effectList) {
    if (Math.abs(effect.startTime - action.startTime) < 500) {
      if (effect.duration > max) {
        max = effect.duration
      }
    }
  }
  return max
}

export function getAreaEffectCount(action: Action): number {
  let count = 0
  for (const effect of action.effectList) {
    if (effect.ability.type === ABILITY_TYPE_AREAEFFECT) {
      count = count + 1
    }
  }
  return count
}

export function needEndingAlert(action: Action): boolean {
  const channeling = action.channelStartTime !== undefined && action.channelStartTime > 0
  return action.tickEffect === undefined && !channeling
}

export function getStageInfo(action: Action, ctx: DurationCtx): string | undefined {
  if (action.stackEffect !== undefined && action.stackEffect.stageInfo !== undefined) {
    return action.stackEffect.stageInfo
  }
  if (action.tickEffect !== undefined) {
    if (action.duration === 0) {
      return "∞"
    }
    const tickRate = action.tickEffect.tickRate ?? 0
    if (tickRate > 0) {
      const dur = getDurationValue(action, ctx)
      const total = Math.floor(dur / tickRate + 0.95)
      const remain = Math.ceil((getEndTime(action, ctx) - ctx.now) / tickRate)
      const done = Math.max(1, total - remain)
      return `${done}/${total}`
    }
  }
  const opt = optEffect(action, ctx)
  if (opt === undefined) {
    return undefined
  }

  if (action.data.firstStageId !== undefined) {
    if (
      action.data.firstStageId === opt.ability.id ||
      (opt.ignorableDebuff &&
        action.data.firstStageId === action.ability.id &&
        ctx.now < action.endTime)
    ) {
      return "1/2"
    }
  }
  if (
    opt.ability.id === action.ability.id &&
    Math.abs(opt.startTime - action.startTime) < 500 &&
    opt.duration * 5 > action.duration &&
    opt.duration * 7 < action.duration * 4
  ) {
    action.data.firstStageId = opt.ability.id
    return "1/2"
  }
  if (
    Math.abs(opt.startTime - action.startTime) < 500 &&
    opt.duration === action.duration &&
    opt.duration + 3000 <= getMaxOriginEffectDuration(action)
  ) {
    action.data.firstStageId = opt.ability.id
    return "1/2"
  }
  const longDurationEffect = peekLongDurationEffect(action)
  if (action.flags.forArea && !isLongDuration(opt) && longDurationEffect !== undefined) {
    action.data.firstStageId = opt.ability.id
    return "1/2"
  }
  if (action.data.firstStageId !== undefined && action.data.firstStageId !== opt.ability.id) {
    if (action.data.secondStageId === opt.ability.id) {
      return "2/2"
    }
    if (action.data.secondStageId === undefined) {
      if (Math.abs(opt.endTime - action.startTime - action.duration) < 700) {
        if (opt.duration * 5 > action.duration * 2 && opt.duration * 5 < action.duration * 4) {
          action.data.secondStageId = opt.ability.id
          return "2/2"
        }
      }
      if (action.flags.forArea && longDurationEffect === undefined) {
        action.data.secondStageId = opt.ability.id
        return "2/2"
      }
      if (action.duration === 0) {
        action.data.secondStageId = opt.ability.id
        return "2/2"
      }
      if (action.duration < opt.duration) {
        action.data.secondStageId = opt.ability.id
        return "2/2"
      }
    }
  }
  if (opt.activated) {
    return "@"
  }
  if (
    action.duration > 0 &&
    ((!action.flags.forGround && opt.startTime - action.startTime > 1500) ||
      (action.flags.forGround &&
        opt.ability.id !== action.groundFirstEffectId &&
        opt.startTime - action.startTime > 900)) &&
    opt.duration % 1000 === 0
  ) {
    opt.activated = true
    return "@"
  }
  if (action.targetOut) {
    return "#"
  }
  let duration = action.duration
  if (duration === 0) {
    duration = action.descriptionDuration ?? 0
  }
  if (duration > 0 && getEndTime(action, ctx) > action.startTime + duration + 1000) {
    return ">"
  }
  return undefined
}

export function getStageInfo2(action: Action, ctx: DurationCtx): string | undefined {
  const se2 = getStackEffect2(action, ctx)
  if (se2 !== undefined && se2.stackCount > 0) {
    return `${se2.stackCount}`
  }
  if (action.flags.forArea) {
    const unitsByAbility = new Map<number, Set<number>>()
    for (const effect of action.effectList) {
      const abilityId = effect.ability.id
      let units = unitsByAbility.get(abilityId)
      if (units === undefined) {
        units = new Set<number>()
        unitsByAbility.set(abilityId, units)
      }
      units.add(effect.unitId)
    }
    let maxCount = 0
    for (const units of unitsByAbility.values()) {
      if (units.size > maxCount) {
        maxCount = units.size
      }
    }
    if (maxCount > 1) {
      return `${maxCount}`
    }
  }
  return undefined
}

export function formatRemainLabel(
  remainMs: number,
  opts: { ignoreDecimal: boolean; ignoreDecimalThreshold: number }
): string {
  const seconds = remainMs / 1000
  if (opts.ignoreDecimal && seconds >= opts.ignoreDecimalThreshold) {
    return `${Math.trunc(seconds)}`
  }
  return formatOneDecimal(seconds)
}

function formatOneDecimal(x: number): string {
  const negative = x < 0
  const abs = negative ? -x : x
  const scaled = Math.round(abs * 10)
  let intPart = Math.floor(scaled / 10)
  let tenth = scaled - intPart * 10
  if (tenth >= 10) {
    intPart = intPart + 1
    tenth = 0
  }
  const sign = negative && (intPart !== 0 || tenth !== 0) ? "-" : ""
  return `${sign}${intPart}.${tenth}`
}

export function bracketLowPriority(label: string): string {
  return `<${label}>`
}

export function scaleCooldown(
  remainMs: number,
  durationMs: number
): { remain: number; duration: number } {
  if (remainMs > 7000 && durationMs > 8000) {
    const scale = durationMs / 1000 - 7
    const scaledTotal = durationMs * scale
    const scaledRemain = scaledTotal - (durationMs - remainMs)
    return { remain: scaledRemain, duration: scaledTotal }
  }
  return { remain: remainMs, duration: durationMs }
}

export function cooldownGeometry(
  remainMs: number,
  durationMs: number
): { topLeft: number; topRight: number; right: number; bottom: number; left: number } {
  if (durationMs <= 0) {
    return { topLeft: 0, topRight: 0, right: 0, bottom: 0, left: 0 }
  }
  const eighths = (remainMs * 8) / durationMs
  const topLeft = remainMs > 0 ? clamp01(eighths) : 0
  const left = remainMs > durationMs / 8 ? clamp01((eighths - 1) / 2) : 0
  const bottom = remainMs > (durationMs * 3) / 8 ? clamp01((eighths - 3) / 2) : 0
  const right = remainMs > (durationMs * 5) / 8 ? clamp01((eighths - 5) / 2) : 0
  const topRight = remainMs > (durationMs * 7) / 8 ? clamp01(eighths - 7) : 0
  return { topLeft, topRight, right, bottom, left }
}

function clamp01(x: number): number {
  if (x > 1) {
    return 1
  }
  if (x < 0) {
    return 0
  }
  return x
}

function getDurationValue(action: Action, ctx: DurationCtx): number {
  return getDuration(action, ctx).duration
}
