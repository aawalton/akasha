import { LIBCOMBAT_EVENT_DAMAGE_OUT, LIBCOMBAT_EVENT_MAX, LIBCOMBAT_EVENT_MIN } from "./constants"
import type { CombatEventCallback } from "./message-types"

const callbackLists: Record<number, CombatEventCallback[]> = {}

const activeCallbackTypes: Record<number, Record<string, CombatEventCallback>> = {}

let updateEventRegistrationsHook: ((this: void) => void) | undefined

export function setUpdateEventRegistrationsHook(fn: (this: void) => void): undefined {
  updateEventRegistrationsHook = fn
}

function registerCallback(callbacktype: number, callback: CombatEventCallback): undefined {
  let list = callbackLists[callbacktype]
  if (list === undefined) {
    list = []
    callbackLists[callbacktype] = list
  }
  list[list.length] = callback
}

function unregisterCallback(
  callbacktype: number,
  callback: CombatEventCallback | undefined
): undefined {
  if (callback === undefined) {
    return
  }
  const list = callbackLists[callbacktype]
  if (list === undefined) {
    return
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i] === callback) {
      table.remove(list, i + 1)
      return
    }
  }
}

function isLuaInvocable(
  callback: CombatEventCallback
): callback is CombatEventCallback & ((this: void, eventId: number, ...args: unknown[]) => void) {
  return typeof callback === "function"
}

export function fireCombatEvent(callbacktype: number, ...args: unknown[]): undefined {
  const list = callbackLists[callbacktype]
  if (list === undefined) {
    return
  }
  for (const callback of list) {
    if (isLuaInvocable(callback)) {
      callback(callbacktype, ...args)
    }
  }
}

function updateResources(
  name: string,
  callbacktype: number,
  callback?: CombatEventCallback
): LuaMultiReturn<[boolean, CombatEventCallback | undefined]> {
  const callbacks = activeCallbackTypes[callbacktype]
  if (callbacks === undefined) {
    error(`lib-combat: unknown callback type ${callbacktype}`)
  }
  const oldCallback = callbacks[name]

  if (callback !== undefined && oldCallback !== undefined) {
    return $multi(false, undefined)
  } else {
    if (callback !== undefined) {
      callbacks[name] = callback
    } else {
      delete callbacks[name]
    }
    if (updateEventRegistrationsHook !== undefined) {
      zo_callLater(updateEventRegistrationsHook, 0)
    }
  }

  return $multi(true, oldCallback)
}

export function initResources(): undefined {
  for (let i = LIBCOMBAT_EVENT_MIN; i <= LIBCOMBAT_EVENT_MAX; i++) {
    activeCallbackTypes[i] = {}
  }
}

export function registerForLogableCombatEvents(
  name: string,
  callback: CombatEventCallback
): undefined {
  for (let i = LIBCOMBAT_EVENT_DAMAGE_OUT; i <= LIBCOMBAT_EVENT_MAX; i++) {
    registerForCombatEvent(name, i, callback)
  }
}

export function registerForCombatEvent(
  name: string,
  callbacktype: number,
  callback: CombatEventCallback
): boolean {
  const [isRegistered] = updateResources(name, callbacktype, callback)
  if (isRegistered) {
    registerCallback(callbacktype, callback)
  }

  return isRegistered
}

export function unregisterForCombatEvent(name: string, callbacktype: number): boolean {
  const [isUnregistered, callback] = updateResources(name, callbacktype)
  unregisterCallback(callbacktype, callback)

  return isUnregistered
}

export function registerAllLogCallbacks(callback: CombatEventCallback, name: string): undefined {
  registerForLogableCombatEvents(name, callback)
}

export function registerCallbackType(
  callbacktype: number,
  callback: CombatEventCallback,
  name: string
): undefined {
  registerForCombatEvent(name, callbacktype, callback)
}

export function unregisterCallbackType(
  callbacktype: number,
  _callback: CombatEventCallback,
  name: string
): undefined {
  unregisterForCombatEvent(name, callbacktype)
}

export function hasActiveCallbackType(callbacktype: number): boolean {
  const consumers = activeCallbackTypes[callbacktype]
  if (consumers === undefined) {
    return false
  }
  return NonContiguousCount(consumers) > 0
}
