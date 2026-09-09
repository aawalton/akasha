import { isNumber } from "../quiet-narrow/quiet-narrow.module.code.ts"
import { safePrint } from "../quiet-print/quiet-print.module.code.ts"
import { getSavedVariables } from "../quiet-saved-variables/quiet-saved-variables.module.code.ts"
import {
  ENTERING_GROUP_AREA,
  LEAVING_GROUP_AREA,
} from "../quiet-strings/quiet-strings.module.code.ts"

export function hookAvAMessages(this: void): undefined {
  const savedVars = getSavedVariables()
  const handlers = ZO_CenterScreenAnnounce_GetEventHandlers()
  const avaEvents = [
    EVENT_ARTIFACT_CONTROL_STATE,
    EVENT_KEEP_GATE_STATE_CHANGED,
    EVENT_CORONATE_EMPEROR_NOTIFICATION,
    EVENT_DEPOSE_EMPEROR_NOTIFICATION,
    EVENT_IMPERIAL_CITY_ACCESS_GAINED_NOTIFICATION,
    EVENT_IMPERIAL_CITY_ACCESS_LOST_NOTIFICATION,
  ]

  function hookAvAEventHandler(this: void, event: number): undefined {
    const original = handlers[event]
    if (original === undefined) {
      return
    }
    handlers[event] = function (
      this: void,
      ...args: unknown[]
    ): CenterScreenMessageParams | undefined {
      if (IsPlayerInAvAWorld()) {
        return original(...args)
      }
      if (savedVars.ava === 1) {
        const messageParams = original(...args)
        if (messageParams !== undefined) {
          safePrint(messageParams.mainText)
        }
        return undefined
      }
      if (savedVars.ava === 2) {
        return undefined
      }
      return original(...args)
    }
  }

  for (const event of avaEvents) {
    hookAvAEventHandler(event)
  }
}

export function hookGroupZoneMessages(this: void): undefined {
  const savedVars = getSavedVariables()
  const handlers = ZO_CenterScreenAnnounce_GetEventHandlers()
  const groupEvents = [EVENT_DISPLAY_ANNOUNCEMENT]

  const groupValues = [ENTERING_GROUP_AREA, LEAVING_GROUP_AREA]

  function hookGroupZoneEventHandler(this: void, event: number): undefined {
    const original = handlers[event]
    if (original === undefined) {
      return
    }
    handlers[event] = function (
      this: void,
      ...args: unknown[]
    ): CenterScreenMessageParams | undefined {
      const title = args[0]
      const description = args[1]
      for (const stringValue of groupValues) {
        if (title === stringValue || description === stringValue) {
          if (savedVars.groupZone === 1) {
            safePrint(stringValue)
            return undefined
          }
          if (savedVars.groupZone === 2) {
            return undefined
          }
          return original(...args)
        }
      }
      return original(...args)
    }
  }

  for (const event of groupEvents) {
    hookGroupZoneEventHandler(event)
  }
}

export function enlightenedAlertHook(this: void): undefined {
  const savedVars = getSavedVariables()
  const handlers = ZO_CenterScreenAnnounce_GetEventHandlers()

  function eventHook(this: void): boolean {
    return savedVars.enlightened
  }
  ZO_PreHook(handlers, EVENT_PLAYER_ACTIVATED, eventHook)
}

export function dontShowLoreDiscoveries(this: void): undefined {
  const savedVars = getSavedVariables()
  const handlers = ZO_CenterScreenAnnounce_GetEventHandlers()
  const loreEvents = [
    EVENT_LORE_BOOK_ALREADY_KNOWN,
    EVENT_LORE_BOOK_LEARNED,
    EVENT_LORE_BOOK_LEARNED_SKILL_EXPERIENCE,
    EVENT_LORE_COLLECTION_COMPLETED,
    EVENT_LORE_COLLECTION_COMPLETED_SKILL_EXPERIENCE,
  ]

  function hookLoreLibraryEventHandler(this: void, event: number): undefined {
    const original = handlers[event]
    if (original === undefined) {
      return
    }
    handlers[event] = function (
      this: void,
      ...args: unknown[]
    ): CenterScreenMessageParams | undefined {
      if (savedVars.dontShowLoreDiscoveries === 1) {
        const messageParams = original(...args)
        if (messageParams !== undefined) {
          safePrint(messageParams.mainText)
        }
        return undefined
      }
      if (savedVars.dontShowLoreDiscoveries === 2) {
        return undefined
      }
      return original(...args)
    }
  }

  for (const event of loreEvents) {
    hookLoreLibraryEventHandler(event)
  }
}

export function dontShowSkillProgression(this: void): undefined {
  const savedVars = getSavedVariables()
  const handlers = ZO_CenterScreenAnnounce_GetEventHandlers()
  const skillEvents = [EVENT_ABILITY_PROGRESSION_RANK_UPDATE]

  function hookSkillProgressionEventHandler(this: void, event: number): undefined {
    const original = handlers[event]
    if (original === undefined) {
      return
    }
    handlers[event] = function (
      this: void,
      ...args: unknown[]
    ): CenterScreenMessageParams | undefined {
      const progressionIndex = args[0]
      if (!isNumber(progressionIndex)) {
        return original(...args)
      }
      const [, , , atMorph] = GetAbilityProgressionXPInfo(progressionIndex)

      if (!atMorph) {
        if (savedVars.dontShowSkillProgression === 1) {
          const messageParams = original(...args)
          if (messageParams !== undefined) {
            safePrint(messageParams.mainText)
          }
          return undefined
        }
        if (savedVars.dontShowSkillProgression === 2) {
          return undefined
        }
        return original(...args)
      }
      return original(...args)
    }
  }

  for (const event of skillEvents) {
    hookSkillProgressionEventHandler(event)
  }
}
