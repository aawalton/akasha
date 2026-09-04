import "@akasha/temper-eso-types/eso-enums-06"
import "@akasha/temper-eso-types/eso-enums-15"
import "@akasha/temper-eso-types/eso-event-manager"
import "@akasha/temper-eso-types/eso-events"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-09"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import "@akasha/temper-eso-types/tstl-language-extensions"
import { asNumber } from "../companion-qol-casts/companion-qol-casts.module.code.ts"
import { FCOCO } from "../companion-qol-state/companion-qol-state.module.code.ts"

export const INTERACTIONS: {
  companionWasSummonedBefore: boolean
  actualCompanionDefId: number | undefined
  currentStealthState: number
  wasFishing: boolean
  lastCompanionIdBeforeCrafting: number | undefined
  lastCompanionIdBeforeBank: number | undefined
  lastCompanionIdBeforeVendor: number | undefined
  lastCompanionIdBeforeFish: number | undefined
  lastCompanionIdBeforeCrouch: number | undefined
} = {
  companionWasSummonedBefore: false,
  actualCompanionDefId: undefined,
  currentStealthState: STEALTH_STATE_NONE,
  wasFishing: false,
  lastCompanionIdBeforeCrafting: undefined,
  lastCompanionIdBeforeBank: undefined,
  lastCompanionIdBeforeVendor: undefined,
  lastCompanionIdBeforeFish: undefined,
  lastCompanionIdBeforeCrouch: undefined,
}

export function checkForActiveCompanion(this: void): LuaMultiReturn<[boolean, boolean]> {
  INTERACTIONS.actualCompanionDefId = undefined
  let isPending = false
  let isActive = false
  if (HasPendingCompanion()) {
    INTERACTIONS.actualCompanionDefId = GetPendingCompanionDefId()
    isPending = true
  } else if (HasActiveCompanion() === true) {
    INTERACTIONS.actualCompanionDefId = GetActiveCompanionDefId()
    isActive = true
  }
  return $multi(isPending, isActive)
}

export function wasCompanionDismissedByOtherCollectible(
  this: void,
  _collectibleId?: number,
  _gamePlayActorCategory?: number
): boolean {
  const [isPending, isActive] = checkForActiveCompanion()
  if (isPending === true || isActive === true) {
    INTERACTIONS.companionWasSummonedBefore = true
  }
  return false
}

export function onCollectibleUseResult(
  this: void,
  _eventId: number,
  result: number,
  isAttemptingActivation: boolean
): undefined {
  if (result === 0 && isAttemptingActivation === true) {
    wasCompanionDismissedByOtherCollectible()
  }
  return undefined
}

export function isFishing(this: void): boolean {
  const isCurrentlyFishing = asNumber(GetInteractionType()) === INTERACTION_FISH
  return isCurrentlyFishing
}

export function onStartInteraction(this: void): undefined {
  zo_callLater(function (this: void): undefined {
    INTERACTIONS.wasFishing = false
    const isCurrentlyFishing = isFishing()
    if (!isCurrentlyFishing) {
      return undefined
    }

    INTERACTIONS.wasFishing = true
    const settings = FCOCO.settingsVars.settings
    if (!settings.unSummonAtFishing) {
      INTERACTIONS.lastCompanionIdBeforeFish = undefined
      return undefined
    }

    const [isPending, isActive] = checkForActiveCompanion()
    if (INTERACTIONS.actualCompanionDefId !== undefined) {
      if (isActive) {
        INTERACTIONS.companionWasSummonedBefore = true
        INTERACTIONS.lastCompanionIdBeforeFish = INTERACTIONS.actualCompanionDefId
        FCOCO.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeFish, false, true)
      } else if (isPending) {
        INTERACTIONS.companionWasSummonedBefore = true
        EVENT_MANAGER.RegisterForEvent(
          `${FCOCO.addonVars.addonName}_Fish`,
          EVENT_COMPANION_ACTIVATED,
          function (this: void): undefined {
            EVENT_MANAGER.UnregisterForEvent(
              `${FCOCO.addonVars.addonName}_Fish`,
              EVENT_COMPANION_ACTIVATED
            )
            if (!isFishing()) {
              INTERACTIONS.lastCompanionIdBeforeFish = undefined
              return undefined
            }
            INTERACTIONS.lastCompanionIdBeforeFish = INTERACTIONS.actualCompanionDefId
            FCOCO.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeFish, false, true)
            return undefined
          }
        )
      }
    }
    return undefined
  }, 1000)
  return undefined
}

export function setupFishEndTimerCallback(this: void): undefined {
  const eventUpdateNameFish = `${FCOCO.addonVars.addonName}_FishingReSummon`
  EVENT_MANAGER.UnregisterForUpdate(eventUpdateNameFish)

  if (
    INTERACTIONS.lastCompanionIdBeforeFish === undefined ||
    INTERACTIONS.companionWasSummonedBefore === false
  ) {
    return undefined
  }
  const settings = FCOCO.settingsVars.settings
  if (!settings.reSummonAfterFishing) {
    return undefined
  }

  const callbackFunc = function (this: void): undefined {
    EVENT_MANAGER.UnregisterForUpdate(eventUpdateNameFish)

    const isCurrentlyFishing = isFishing()
    if (isCurrentlyFishing === true) {
      return undefined
    }

    FCOCO.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeFish, true, true)
    INTERACTIONS.lastCompanionIdBeforeFish = undefined
    INTERACTIONS.companionWasSummonedBefore = false
    return undefined
  }

  const delay = settings.reSummonAfterFishingDelay
  if (delay <= 0) {
    callbackFunc()
    return undefined
  }

  EVENT_MANAGER.RegisterForUpdate(eventUpdateNameFish, delay, callbackFunc)
  return undefined
}

export function onEventInteractionEnded(
  this: void,
  _eventId: number,
  interactType: number,
  _cancelContext?: number
): undefined {
  if (interactType === INTERACTION_LOOT) {
    if (!INTERACTIONS.wasFishing) {
      return undefined
    }
  } else if (interactType !== INTERACTION_FISH) {
    return undefined
  }
  INTERACTIONS.wasFishing = false

  const settings = FCOCO.settingsVars.settings
  if (!settings.unSummonAtFishing || !settings.reSummonAfterFishing) {
    INTERACTIONS.lastCompanionIdBeforeFish = undefined
    return undefined
  }
  if (INTERACTIONS.lastCompanionIdBeforeFish === undefined) {
    if (
      INTERACTIONS.companionWasSummonedBefore === true &&
      settings.lastCompanionId !== undefined
    ) {
      INTERACTIONS.lastCompanionIdBeforeFish = settings.lastCompanionId
    } else {
      return undefined
    }
  }

  setupFishEndTimerCallback()
  return undefined
}

export function isCrouching(this: void): boolean {
  const isCurrentlyCrouching = INTERACTIONS.currentStealthState !== STEALTH_STATE_NONE
  return isCurrentlyCrouching
}

export function setupCrouchEndTimerCallback(this: void): undefined {
  const eventUpdateNameCrouch = `${FCOCO.addonVars.addonName}_CrouchingReSummon`
  EVENT_MANAGER.UnregisterForUpdate(eventUpdateNameCrouch)

  if (
    INTERACTIONS.lastCompanionIdBeforeCrouch === undefined ||
    INTERACTIONS.companionWasSummonedBefore === false
  ) {
    return undefined
  }
  const settings = FCOCO.settingsVars.settings
  if (!settings.reSummonAfterCrouching) {
    return undefined
  }

  const callbackFunc = function (this: void): undefined {
    EVENT_MANAGER.UnregisterForUpdate(eventUpdateNameCrouch)

    const isCurrentlyCrouching = isCrouching()
    if (isCurrentlyCrouching === true) {
      return undefined
    }

    FCOCO.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeCrouch, true, true)
    INTERACTIONS.lastCompanionIdBeforeCrouch = undefined
    INTERACTIONS.companionWasSummonedBefore = false
    return undefined
  }

  const delay = settings.reSummonAfterCrouchingDelay
  if (delay <= 0) {
    callbackFunc()
    return undefined
  }

  EVENT_MANAGER.RegisterForUpdate(eventUpdateNameCrouch, delay, callbackFunc)
  return undefined
}

export function onCrouchingStart(this: void): undefined {
  const isInCombat = IsUnitInCombat("player")

  const settings = FCOCO.settingsVars.settings
  if (!settings.unSummonAtCrouching) {
    INTERACTIONS.lastCompanionIdBeforeCrouch = undefined
    return undefined
  }
  if (!settings.unSummonAtCrouchingNoCombat && isInCombat) {
    INTERACTIONS.lastCompanionIdBeforeCrouch = undefined
    return undefined
  }

  const [isPending, isActive] = checkForActiveCompanion()
  if (INTERACTIONS.actualCompanionDefId !== undefined) {
    if (isActive) {
      INTERACTIONS.companionWasSummonedBefore = true
      INTERACTIONS.lastCompanionIdBeforeCrouch = INTERACTIONS.actualCompanionDefId
      FCOCO.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeCrouch, false, true)
    } else if (isPending) {
      INTERACTIONS.companionWasSummonedBefore = true
      EVENT_MANAGER.RegisterForEvent(
        `${FCOCO.addonVars.addonName}_Crouch`,
        EVENT_COMPANION_ACTIVATED,
        function (this: void): undefined {
          EVENT_MANAGER.UnregisterForEvent(
            `${FCOCO.addonVars.addonName}_Crouch`,
            EVENT_COMPANION_ACTIVATED
          )
          if (!isCrouching()) {
            INTERACTIONS.lastCompanionIdBeforeCrouch = undefined
            return undefined
          }
          INTERACTIONS.lastCompanionIdBeforeCrouch = INTERACTIONS.actualCompanionDefId
          FCOCO.ToggleCompanion(INTERACTIONS.lastCompanionIdBeforeCrouch, false, true)
          return undefined
        }
      )
    }
  }
  return undefined
}

export function onCrouchingEnded(this: void): undefined {
  const settings = FCOCO.settingsVars.settings
  if (!settings.unSummonAtCrouching || !settings.reSummonAfterCrouching) {
    INTERACTIONS.lastCompanionIdBeforeCrouch = undefined
    return undefined
  }
  if (INTERACTIONS.lastCompanionIdBeforeCrouch === undefined) {
    if (
      INTERACTIONS.companionWasSummonedBefore === true &&
      settings.lastCompanionId !== undefined
    ) {
      INTERACTIONS.lastCompanionIdBeforeCrouch = settings.lastCompanionId
    } else {
      return undefined
    }
  }

  setupCrouchEndTimerCallback()
  return undefined
}

export function onStealthStateChanged(
  this: void,
  _eventId: number,
  _unitTag: string,
  newStealthState: number
): undefined {
  INTERACTIONS.currentStealthState = newStealthState

  const stealthStatesToHideCompanion: Record<number, boolean | undefined> = {
    [STEALTH_STATE_NONE]: false,
    [STEALTH_STATE_DETECTED]: false,
    [STEALTH_STATE_HIDING]: false,
    [STEALTH_STATE_HIDDEN]: true,
    [STEALTH_STATE_HIDDEN_ALMOST_DETECTED]: false,
    [STEALTH_STATE_STEALTH]: false,
    [STEALTH_STATE_STEALTH_ALMOST_DETECTED]: false,
  }
  const hideCompanionNow = stealthStatesToHideCompanion[newStealthState] ?? false
  if (newStealthState === STEALTH_STATE_NONE) {
    onCrouchingEnded()
  } else if (hideCompanionNow === true) {
    onCrouchingStart()
  }
  return undefined
}
