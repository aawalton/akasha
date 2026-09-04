import {
  hasActiveCallbackType,
  setUpdateEventRegistrationsHook,
} from "@akasha/temper-combat-addon/combat-lib-callbacks"
import {
  LIB_EVENT_NAMESPACE,
  LIBCOMBAT_EVENT_MAX,
  LIBCOMBAT_EVENT_MIN,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { LOG_LEVEL_VERBOSE, log } from "@akasha/temper-combat-addon/combat-lib-log"
import { setSkillsGroupUpdateHook } from "@akasha/temper-combat-addon/combat-lib-skill-bars"
import {
  onAbilityFinished,
  onAbilityUsed,
} from "@akasha/temper-combat-addon/combat-lib-skill-casts"
import { DATA, EVENT_GROUP_ACTIVE, SLOT_SKILLS } from "@akasha/temper-combat-addon/combat-lib-state"

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

let TOTAL_EVENTS = 0

let REGISTERED_SKILLS: Record<number, boolean> = {}

export const EVENTS: Record<string, EventGroup> = {}

export function setGroupActive(group: EventGroup, active: boolean): undefined {
  group.active = active
  EVENT_GROUP_ACTIVE[group.name] = active
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
  EVENTS[name] = group
  EVENT_GROUP_ACTIVE[name] = false
  return group
}

export function registerEvent(
  group: EventGroup,
  event: number,
  callback: RegisteredEventCallback,
  ...filters: [] | [filterType: number, ...rest: EventFilterArg[]]
): boolean {
  TOTAL_EVENTS = TOTAL_EVENTS + 1

  const namespace = LIB_EVENT_NAMESPACE + TOTAL_EVENTS
  const active = EVENT_MANAGER.RegisterForEvent(namespace, event, callback)
  let filtered = false

  const [filterType, ...filterRest] = filters
  if (filterType !== undefined && filters.length % 2 === 0) {
    filtered = EVENT_MANAGER.AddFilterForEvent(namespace, event, filterType, ...filterRest)
  }

  group.registrations[group.registrations.length] = {
    id: TOTAL_EVENTS,
    event: event,
    callback: callback,
    active: active,
    filtered: filtered,
    filters: filters,
  }

  if (active) {
    TOTAL_EVENTS = TOTAL_EVENTS + 1
  }

  return active
}

export function registerPlayerActivatedEvent(
  group: EventGroup,
  callback: (this: void, eventCode: number, initial: boolean) => void
): boolean {
  const active = registerEvent(group, EVENT_PLAYER_ACTIVATED, callback)

  if (DATA.isUIActivated) {
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
    REGISTERED_SKILLS = {}
  }
  return undefined
}

export function updateEventRegistrations(this: void): undefined {
  for (const [, group] of pairs(EVENTS)) {
    updateEvents(group)
  }
  return undefined
}

setUpdateEventRegistrationsHook(updateEventRegistrations)

export function updateSkillEvents(group: EventGroup): undefined {
  for (const skill of SLOT_SKILLS) {
    const [id, result, id2, result2] = skill

    if (REGISTERED_SKILLS[id] !== true) {
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

      REGISTERED_SKILLS[id] = active
    }
  }
  return undefined
}

setSkillsGroupUpdateHook(() => {
  const skills = EVENTS["Skills"]
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
