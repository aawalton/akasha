import { hasActiveCallbackType, setUpdateEventRegistrationsHook } from "./callbacks"
import { LIB_EVENT_NAMESPACE, LIBCOMBAT_EVENT_MAX, LIBCOMBAT_EVENT_MIN } from "./constants"
import { LOG_LEVEL_VERBOSE, log } from "./log"
import { onAbilityFinished, onAbilityUsed } from "./skill-casts"
import { setSkillsGroupUpdateHook } from "./skill-casts-2"
import { data, eventGroupActive, slotSkills } from "./state"

export type RegisteredEventCallback = (this: void, eventCode: number, ...args: never[]) => void

type EventFilterArg = number | string | boolean

interface EventRegistration {
  id: number
  event: number
  callback: RegisteredEventCallback
  active: boolean
  filtered: boolean
  filters: EventFilterArg[]
}

export interface EventGroup {
  name: string
  registrations: EventRegistration[]
  callbacktypes: number[]
  active: boolean
  registerEvents: (this: void, group: EventGroup) => undefined
  update: ((this: void, group: EventGroup) => undefined) | undefined
  resetIds: boolean | undefined
}

let totalevents = 0

let registeredSkills: Record<number, boolean> = {}

export const events: Record<string, EventGroup> = {}

export function setGroupActive(group: EventGroup, active: boolean): undefined {
  group.active = active
  eventGroupActive[group.name] = active
  return undefined
}

export function createEventGroup(
  name: string,
  callbacktypes: number[],
  registerEvents: (group: EventGroup) => undefined
): EventGroup {
  const group: EventGroup = {
    name: name,
    registrations: [],
    callbacktypes: callbacktypes,
    active: false,
    registerEvents: registerEvents,
    update: undefined,
    resetIds: undefined,
  }
  events[name] = group
  eventGroupActive[name] = false
  return group
}

export function registerEvent(
  group: EventGroup,
  event: number,
  callback: RegisteredEventCallback,
  ...filters: [] | [filterType: number, ...rest: EventFilterArg[]]
): boolean {
  totalevents = totalevents + 1

  const namespace = LIB_EVENT_NAMESPACE + totalevents
  const active = EVENT_MANAGER.RegisterForEvent(namespace, event, callback)
  let filtered = false

  const [filterType, ...filterRest] = filters
  if (filterType !== undefined && filters.length % 2 === 0) {
    filtered = EVENT_MANAGER.AddFilterForEvent(namespace, event, filterType, ...filterRest)
  }

  group.registrations[group.registrations.length] = {
    id: totalevents,
    event: event,
    callback: callback,
    active: active,
    filtered: filtered,
    filters: filters,
  }

  if (active) {
    totalevents = totalevents + 1
  }

  return active
}

export function registerPlayerActivatedEvent(
  group: EventGroup,
  callback: (this: void, eventCode: number, initial: boolean) => void
): boolean {
  const active = registerEvent(group, EVENT_PLAYER_ACTIVATED, callback)

  if (data.isUIActivated) {
    callback(EVENT_PLAYER_ACTIVATED, false)
  }

  return active
}

function updateEvents(group: EventGroup): undefined {
  let condition = false

  for (const v of group.callbacktypes) {
    if (hasActiveCallbackType(v)) {
      condition = true
      break
    }
  }

  if (condition === true && group.active === false) {
    group.registerEvents(group)
  } else if (condition === false && group.active === true) {
    unregisterEvents(group)
  }
  return undefined
}

function unregisterEvents(group: EventGroup): undefined {
  const remaining: EventRegistration[] = []
  for (const reg of group.registrations) {
    const inactive = EVENT_MANAGER.UnregisterForEvent(LIB_EVENT_NAMESPACE + reg.id, reg.event)

    if (inactive) {
      ZO_ClearTable(reg)
    } else {
      remaining[remaining.length] = reg
    }
  }
  group.registrations = remaining

  setGroupActive(group, false)

  if (group.resetIds === true) {
    registeredSkills = {}
  }
  return undefined
}

export function updateEventRegistrations(this: void): undefined {
  for (const [, group] of pairs(events)) {
    updateEvents(group)
  }
  return undefined
}

setUpdateEventRegistrationsHook(updateEventRegistrations)

export function updateSkillEvents(group: EventGroup): undefined {
  for (const skill of slotSkills) {
    const [id, result, id2, result2] = skill

    if (registeredSkills[id] !== true) {
      log(
        "events",
        LOG_LEVEL_VERBOSE,
        "Skill registered: %d: %s (%s), End:  %d: %s (%s))",
        id,
        GetAbilityName(id),
        tostring(result),
        id2 ?? 0,
        GetAbilityName(id2 ?? 0),
        tostring(result2)
      )

      let active: boolean

      if (result !== undefined) {
        active = registerEvent(
          group,
          EVENT_COMBAT_EVENT,
          onAbilityUsed,
          REGISTER_FILTER_ABILITY_ID,
          id,
          REGISTER_FILTER_COMBAT_RESULT,
          result
        )
      } else {
        active = registerEvent(
          group,
          EVENT_COMBAT_EVENT,
          onAbilityUsed,
          REGISTER_FILTER_ABILITY_ID,
          id
        )
      }

      if (id2 !== undefined && result2 !== undefined) {
        registerEvent(
          group,
          EVENT_COMBAT_EVENT,
          onAbilityFinished,
          REGISTER_FILTER_ABILITY_ID,
          id2,
          REGISTER_FILTER_COMBAT_RESULT,
          result2
        )
      }

      registeredSkills[id] = active
    }
  }
  return undefined
}

setSkillsGroupUpdateHook(() => {
  const skills = events["Skills"]
  if (skills === undefined) {
    error("lib-combat: Skills event group missing")
  }
  updateSkillEvents(skills)
})

export function getAllCallbackTypes(): number[] {
  const t: number[] = []
  for (let i = LIBCOMBAT_EVENT_MIN; i <= LIBCOMBAT_EVENT_MAX; i++) {
    t[t.length] = i
  }
  return t
}
