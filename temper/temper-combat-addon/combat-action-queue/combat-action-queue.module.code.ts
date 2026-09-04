import type { Action } from "@akasha/temper-combat-addon/combat-action-types"

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

export const STATE: EngineState = {
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

let SN_COUNTER = 0

export function nextSn(): number {
  SN_COUNTER = SN_COUNTER + 1
  return SN_COUNTER
}

export function enqueueAction(action: Action): undefined {
  STATE.actionQueue.push(action)
  STATE.snActionMap.set(action.sn, action)
}

export function purgeQueue(now: number): undefined {
  const kept: Action[] = []
  for (const action of STATE.actionQueue) {
    if (action.saved || now - action.startTime <= ACTION_QUEUE_TTL_MS) {
      kept.push(action)
    } else {
      STATE.snActionMap.delete(action.sn)
    }
  }
  STATE.actionQueue = kept
}

export function removeAction(action: Action): undefined {
  const idx = STATE.actionQueue.indexOf(action)
  if (idx !== -1) STATE.actionQueue.splice(idx, 1)
  STATE.snActionMap.delete(action.sn)
  const current = STATE.idActionMap.get(action.ability.id)
  if (current !== undefined && current.sn === action.sn) {
    STATE.idActionMap.delete(action.ability.id)
  }
}

export function resetState(): undefined {
  STATE.actionQueue = []
  STATE.idActionMap.clear()
  STATE.timeActionMap.clear()
  STATE.snActionMap.clear()
  STATE.idDurationMap.clear()
  STATE.idFilteringMap.clear()
  STATE.lastAction = undefined
  STATE.lastEffectAction = undefined
  STATE.gallopAction = undefined
  STATE.lastQuickslotTime = 0
  STATE.targetId = undefined
}
