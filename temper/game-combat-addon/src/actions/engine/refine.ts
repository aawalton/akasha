import { getGallopEffect } from "../model/action"
import { getEndTime, getStackEffect } from "../model/duration"
import type { Action } from "../model/types"
import { fireEngineUpdate } from "./context"
import { buildActionCtx } from "./duration-ctx"
import { purgeQueue, removeAction, state } from "./registries"

const SECONDS_BEFORE_FADE_MS = 1000

const ACTION_LEAK_COUNT_VALVE = 20

function refineActions(now: number): undefined {
  const endLimit = now - SECONDS_BEFORE_FADE_MS
  const mounted = IsMounted()

  const live: Action[] = []
  for (const action of state.idActionMap.values()) {
    live.push(action)
  }

  for (const action of live) {
    const ctx = buildActionCtx(action, now, mounted)
    const endTime = getEndTime(action, ctx)
    const stack = getStackEffect(action, ctx)
    const stackCount = stack !== undefined ? stack.stackCount : 0
    const cutoff = action.fake ? now : endLimit
    if (stackCount === 0 && endTime < cutoff) {
      removeAction(action)
      const gallopEffect = getGallopEffect(action)
      if (gallopEffect !== undefined && gallopEffect.endTime > now) {
        state.gallopAction = action
      }
    }
  }
  return undefined
}

function checkActionLeaks(): undefined {
  const countById = new Map<number, number>()
  const maxSnById = new Map<number, number>()
  for (const action of state.snActionMap.values()) {
    const id = action.ability.id
    countById.set(id, (countById.get(id) ?? 0) + 1)
    const prevMax = maxSnById.get(id) ?? 0
    if (action.sn > prevMax) {
      maxSnById.set(id, action.sn)
    }
  }

  for (const [id, count] of countById) {
    if (count > ACTION_LEAK_COUNT_VALVE) {
      const maxSn = maxSnById.get(id) ?? 0
      const toRemove: Action[] = []
      for (const action of state.snActionMap.values()) {
        if (action.ability.id === id && action.sn < maxSn) {
          toRemove.push(action)
        }
      }
      for (const action of toRemove) {
        removeAction(action)
      }
    }
  }
  return undefined
}

export function refineTick(now: number): undefined {
  purgeQueue(now)
  refineActions(now)
  checkActionLeaks()
  fireEngineUpdate(now)
  return undefined
}
