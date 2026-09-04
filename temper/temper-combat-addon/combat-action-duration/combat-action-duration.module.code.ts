import type {
  Action,
  DurationResult,
  Effect,
} from "@akasha/temper-combat-addon/combat-action-types"

export interface DurationCtx {
  now: number
  mounted?: boolean
  cruxFallback?: Effect
}

const MAJOR_GALLOP_ICON = "major_gallop"

export function getStackEffect(action: Action, ctx: DurationCtx): Effect | undefined {
  const crux = ctx.cruxFallback
  if (crux !== undefined) {
    const cruxLive = crux.duration === 0 || crux.endTime > ctx.now
    const noLocalStack = action.stackEffect === undefined || action.stackEffect.duration === 0
    if (cruxLive && noLocalStack) {
      return crux
    }
  }
  const se = action.stackEffect
  if (se !== undefined && (se.duration === 0 || se.endTime > ctx.now)) {
    return se
  }
  return undefined
}

export function getStackEffect2(action: Action, ctx: DurationCtx): Effect | undefined {
  const se2 = action.stackEffect2
  if (se2 !== undefined && (se2.duration === 0 || se2.endTime > ctx.now)) {
    return se2
  }
  return undefined
}

function isFilteredByDynamic(action: Action, effect: Effect, ctx: DurationCtx): boolean {
  if (ctx.now > effect.endTime) {
    effect.ignored = true
    return true
  }
  if (effect.ability.icon.includes(MAJOR_GALLOP_ICON)) {
    if (ctx.mounted !== true) {
      return true
    }
  }
  if (action.duration > 3000 && action.startTime + action.duration - 300 <= effect.startTime) {
    if (action.duration !== effect.duration) {
      return true
    }
  }
  if (effect.startTime + 1000 < action.startTime && ctx.now - action.startTime < 300) {
    return true
  }
  return false
}

export function optEffect(action: Action, ctx: DurationCtx): Effect | undefined {
  let lowLevelStackEffect: Effect | undefined

  const stackEffect = getStackEffect(action, ctx)
  if (stackEffect !== undefined && stackEffect.duration > 0) {
    if (stackEffect.levelIsLow) {
      lowLevelStackEffect = stackEffect
    } else {
      return stackEffect
    }
  }
  const stackEffect2 = getStackEffect2(action, ctx)
  if (stackEffect2 !== undefined && stackEffect2.duration > 0) {
    if (stackEffect2.levelIsLow) {
      lowLevelStackEffect = stackEffect2
    } else {
      return stackEffect2
    }
  }

  for (const effect of action.effectList) {
    if (effect.ability.icon.includes(MAJOR_GALLOP_ICON)) {
      if (ctx.mounted === true) {
        return effect
      }
    }
    if (!isFilteredByDynamic(action, effect, ctx)) {
      return effect
    }
  }

  if (lowLevelStackEffect !== undefined) {
    return lowLevelStackEffect
  }

  const crux = ctx.cruxFallback
  if (crux !== undefined && ctx.now <= crux.endTime) {
    return crux
  }

  return undefined
}

export function getStartTime(action: Action): number {
  if (action.tickEffect !== undefined && action.duration === 0) {
    return action.tickEffect.startTime
  }
  if (action.channelStartTime !== undefined && action.channelStartTime > 0) {
    return action.channelStartTime
  }
  return action.startTime
}

export function getEndTime(action: Action, ctx: DurationCtx): number {
  if (action.tickEffect !== undefined && action.duration === 0) {
    const tick = action.tickEffect
    const start = tick.startTime
    const rate = tick.tickRate ?? 0
    if (rate > 0) {
      const span = ctx.now - start
      const offset = span - (span % rate)
      return start + offset + rate
    }
  }
  if (action.channelEndTime !== undefined && action.channelEndTime > 0) {
    return action.channelEndTime
  }
  if (action.configDuration != null) {
    return action.startTime + action.configDuration
  }
  const opt = optEffect(action, ctx)
  if (opt !== undefined) {
    if (opt.ignorableDebuff && opt.endTime > action.endTime && action.endTime > ctx.now) {
      action.data.firstStageId = action.ability.id
      return action.endTime
    }
    return opt.endTime
  }
  if (action.endTime > 0) {
    return action.endTime
  }
  if (ctx.cruxFallback !== undefined && getStackEffect(action, ctx) === undefined) {
    return action.startTime
  }
  let maxEffectEndTime = 0
  for (const t of action.effectEndTimes) {
    if (t > maxEffectEndTime) {
      maxEffectEndTime = t
    }
  }
  if (maxEffectEndTime > 0) {
    return maxEffectEndTime
  }
  if (action.descriptionDuration != null && action.descriptionDuration > 0) {
    return action.startTime + action.descriptionDuration
  }
  return action.startTime
}

export function getDuration(action: Action, ctx: DurationCtx): DurationResult {
  if (action.tickEffect !== undefined && action.duration === 0) {
    return { duration: action.tickEffect.tickRate ?? 0, source: "tick" }
  }
  if (
    action.channelStartTime !== undefined &&
    action.channelStartTime > 0 &&
    action.channelEndTime !== undefined &&
    action.channelEndTime > 0
  ) {
    return { duration: action.channelEndTime - action.channelStartTime, source: "channel" }
  }
  if (action.configDuration != null) {
    return { duration: action.configDuration, source: "filter" }
  }
  const opt = optEffect(action, ctx)
  if (opt !== undefined) {
    return { duration: opt.duration, source: "priority" }
  }
  if (ctx.cruxFallback !== undefined && getStackEffect(action, ctx) === undefined) {
    return { duration: 0, source: "none" }
  }
  if (action.duration > 0) {
    return { duration: action.duration, source: "self" }
  }
  if (action.descriptionDuration != null && action.descriptionDuration > 0) {
    return { duration: action.descriptionDuration, source: "description" }
  }
  return { duration: 0, source: "none" }
}
