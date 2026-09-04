import { isNumber, isStringOrNumber } from "../quiet-narrow/quiet-narrow.module.code.ts"
import { getSavedVariables } from "../quiet-saved-variables/quiet-saved-variables.module.code.ts"

let recentMessages: ZO_RecentMessagesInstance | undefined

export function bossAlertTextsHook(this: void): undefined {
  const savedVars = getSavedVariables()
  const handlers = ZO_AlertText_GetHandlers()

  const abilityErrorIds: Record<number, boolean> = {
    [162]: true,
    [177]: true,
  }

  function onAbilityRequirementFailHook(this: void, errorStringId: number): boolean | undefined {
    if (savedVars.boss) {
      return abilityErrorIds[errorStringId]
    }
    return undefined
  }
  ZO_PreHook(handlers, EVENT_ABILITY_REQUIREMENTS_FAIL, onAbilityRequirementFailHook)

  const actionResults: Record<number, boolean> = {
    [ACTION_RESULT_MISSING_EMPTY_SOUL_GEM]: true,
    [ACTION_RESULT_IMMUNE]: true,
  }
  function combatEventHook(this: void, result: number, isError: boolean): boolean | undefined {
    if (isError && savedVars.boss) {
      return actionResults[result]
    }
    return undefined
  }
  ZO_PreHook(handlers, EVENT_COMBAT_EVENT, combatEventHook)
}

export function screenshotAlertHook(this: void): undefined {
  const savedVars = getSavedVariables()
  const handlers = ZO_AlertText_GetHandlers()

  function eventHook(this: void): boolean {
    return savedVars.screenshot
  }
  ZO_PreHook(handlers, EVENT_SCREENSHOT_SAVED, eventHook)
}

export function craftingResultAlertsHook(this: void): undefined {
  const savedVars = getSavedVariables()
  const handlers = ZO_AlertText_GetHandlers()

  const blockedMessages: Record<number, boolean> = {
    [SI_TRADESKILLRESULT119]: true,
    [SI_SMITHING_EXTRACTION_FAILED]: true,
    [SI_SMITHING_DECONSTRUCTION_LEVEL_PENALTY]: true,
    [SI_ALCHEMY_NO_YIELD]: true,
    [SI_ENCHANT_NO_YIELD]: true,
  }

  function zoAlertNoSuppressionHook(this: void, ...args: unknown[]): boolean | undefined {
    const message = args[2]
    if (savedVars.craftingResults && isNumber(message)) {
      return blockedMessages[message]
    }
    return undefined
  }
  ZO_PreHook("ZO_AlertNoSuppression", zoAlertNoSuppressionHook)

  function craftFailedHook(this: void): boolean {
    return savedVars.craftingResults
  }
  ZO_PreHook(handlers, EVENT_CRAFT_FAILED, craftFailedHook)
}

export function repairAlertsHook(this: void): undefined {
  const savedVars = getSavedVariables()
  if (
    ZO_GamepadStoreManager !== undefined &&
    ZO_GamepadStoreManager.RepairMessageBox !== undefined
  ) {
    function repairMessageBoxHook(this: void): boolean {
      return savedVars.repair
    }
    ZO_PreHook(ZO_GamepadStoreManager, "RepairMessageBox", repairMessageBoxHook)
  }
}

export function alertTextThrottling(this: void): undefined {
  const savedVars = getSavedVariables()
  recentMessages = ZO_RecentMessages.New(savedVars.alertTextExpiryDelay * 1000)

  function zoAlertHook(this: void, ...args: unknown[]): boolean {
    const message = args[2]
    if (recentMessages !== undefined && isStringOrNumber(message) && message !== "") {
      return !recentMessages.ShouldDisplayMessage(message)
    }
    return true
  }
  ZO_PreHook("ZO_Alert", zoAlertHook)

  function zoSoundAlertHook(this: void, ...args: unknown[]): boolean {
    const soundId = args[1]
    if (recentMessages !== undefined && isStringOrNumber(soundId) && soundId !== "") {
      return !recentMessages.ShouldDisplayMessage(soundId)
    }
    return true
  }
  ZO_PreHook("ZO_SoundAlert", zoSoundAlertHook)
}

export function updateRecentMessagesExpiry(this: void, seconds: number): undefined {
  if (recentMessages !== undefined) {
    recentMessages.expiryDelayMilliseconds = seconds * 1000
  }
}

export function hookPlaySound(this: void): undefined {
  const savedVars = getSavedVariables()

  function playSoundHook(this: void, ...args: unknown[]): boolean | undefined {
    const soundId = args[0]
    if (soundId === SOUNDS.ABILITY_ULTIMATE_READY) {
      if (savedVars.ultimateSound === 1) {
        return !IsUnitInCombat("player")
      }
      if (savedVars.ultimateSound === 2) {
        return IsUnitInCombat("player")
      }
      if (savedVars.ultimateSound === 3) {
        return true
      }
      return undefined
    }
    if (soundId === SOUNDS.NEW_NOTIFICATION) {
      if (savedVars.notificationSound === false) {
        return true
      }
      return false
    }
    return undefined
  }
  ZO_PreHook("PlaySound", playSoundHook)
}
