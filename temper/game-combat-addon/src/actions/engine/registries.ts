import type { Action } from "../model/types"

const ACTION_QUEUE_TTL_MS = 3000

interface EngineState {
  actionQueue: Action[]
  idActionMap: Map<number, Action>
  timeActionMap: Map<number, Action>
  snActionMap: Map<number, Action>
  idDurationMap: Map<number, number>
  idFilteringMap: Map<number, boolean>
  lastAction?: Action
  lastEffectAction?: Action
  gallopAction?: Action
  lastQuickslotTime: number
  targetId?: number
}

export const state: EngineState = {
  actionQueue: [],
  idActionMap: new Map<number, Action>(),
  timeActionMap: new Map<number, Action>(),
  snActionMap: new Map<number, Action>(),
  idDurationMap: new Map<number, number>(),
  idFilteringMap: new Map<number, boolean>(),
  lastAction: undefined,
  lastEffectAction: undefined,
  gallopAction: undefined,
  lastQuickslotTime: 0,
  targetId: undefined,
}

let snCounter = 0

export function nextSn(): number {
  snCounter = snCounter + 1
  return snCounter
}

export function enqueueAction(action: Action): undefined {
  state.actionQueue.push(action)
  state.snActionMap.set(action.sn, action)
}

export function purgeQueue(now: number): undefined {
  const kept: Action[] = []
  for (const action of state.actionQueue) {
    if (action.saved || now - action.startTime <= ACTION_QUEUE_TTL_MS) {
      kept.push(action)
    } else {
      state.snActionMap.delete(action.sn)
    }
  }
  state.actionQueue = kept
}

export function removeAction(action: Action): undefined {
  const idx = state.actionQueue.indexOf(action)
  if (idx !== -1) state.actionQueue.splice(idx, 1)
  state.snActionMap.delete(action.sn)
  const current = state.idActionMap.get(action.ability.id)
  if (current !== undefined && current.sn === action.sn) {
    state.idActionMap.delete(action.ability.id)
  }
}

export function resetState(): undefined {
  state.actionQueue = []
  state.idActionMap.clear()
  state.timeActionMap.clear()
  state.snActionMap.clear()
  state.idDurationMap.clear()
  state.idFilteringMap.clear()
  state.lastAction = undefined
  state.lastEffectAction = undefined
  state.gallopAction = undefined
  state.lastQuickslotTime = 0
  state.targetId = undefined
}
