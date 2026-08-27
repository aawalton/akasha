import { FCOCO } from "../state"
import {
  checkForActiveCompanion,
  interactions,
  OnEventInteractionEnded,
  OnStartInteraction,
  OnStealthStateChanged,
  onCollectibleUseResult,
} from "./state"

FCOCO.Player_Activated = function (this: void, _eventId: number, _waFirst?: boolean): undefined {
  FCOCO.UpdateCompass()

  const [isPending, isActive] = checkForActiveCompanion()
  if (isPending || isActive) {
    FCOCO.settingsVars.settings.lastCompanionId = interactions.actualCompanionDefId
  }

  FCOCO.playerActivatedDone = true
  return undefined
}

FCOCO.Companion_Activated = function (
  this: void,
  _eventId: number,
  companionId: number
): undefined {
  if (!FCOCO.settingsVars.settings) {
    return undefined
  }
  FCOCO.settingsVars.settings.companionIsSummoned = true
  FCOCO.settingsVars.settings.lastCompanionId = companionId
  return undefined
}

FCOCO.Companion_DeActivated = function (this: void, _eventId: number): undefined {
  if (!FCOCO.settingsVars.settings) {
    return undefined
  }
  FCOCO.settingsVars.settings.companionIsSummoned = false
  return undefined
}

FCOCO.CraftingTableInteract = function (
  this: void,
  _eventId: number,
  _craftSkill: number,
  _sameStation: boolean
): undefined {
  const settings = FCOCO.settingsVars.settings
  if (!settings.unSummonAtCraftingTables) {
    interactions.lastCompanionIdBeforeCrafting = undefined
    return undefined
  }
  const [isPending, isActive] = checkForActiveCompanion()
  if (interactions.actualCompanionDefId !== undefined) {
    if (isActive) {
      interactions.companionWasSummonedBefore = true
      interactions.lastCompanionIdBeforeCrafting = interactions.actualCompanionDefId
      FCOCO.ToggleCompanion(interactions.lastCompanionIdBeforeCrafting, false, true)
    } else if (isPending) {
      interactions.companionWasSummonedBefore = true
      EVENT_MANAGER.RegisterForEvent(
        `${FCOCO.addonVars.addonName}_CraftingTable`,
        EVENT_COMPANION_ACTIVATED,
        function (this: void): undefined {
          EVENT_MANAGER.UnregisterForEvent(
            `${FCOCO.addonVars.addonName}_CraftingTable`,
            EVENT_COMPANION_ACTIVATED
          )
          if (
            !ZO_CraftingUtils_IsCraftingWindowOpen() &&
            !ZO_CraftingUtils_IsPerformingCraftProcess()
          ) {
            interactions.lastCompanionIdBeforeCrafting = undefined
            return undefined
          }
          interactions.lastCompanionIdBeforeCrafting = interactions.actualCompanionDefId
          FCOCO.ToggleCompanion(interactions.lastCompanionIdBeforeCrafting, false, true)
          return undefined
        }
      )
    }
  }
  return undefined
}

FCOCO.CraftingTableInteractEnd = function (
  this: void,
  _eventId: number,
  _craftSkill: number
): undefined {
  const settings = FCOCO.settingsVars.settings
  if (
    !settings.unSummonAtCraftingTables ||
    !settings.reSummonAfterCraftingTables ||
    interactions.lastCompanionIdBeforeCrafting === undefined
  ) {
    interactions.lastCompanionIdBeforeCrafting = undefined
    return undefined
  }
  FCOCO.ToggleCompanion(interactions.lastCompanionIdBeforeCrafting, true, true)
  interactions.lastCompanionIdBeforeCrafting = undefined
  interactions.companionWasSummonedBefore = false
  return undefined
}

FCOCO.BankInteract = function (this: void, _eventId: number, _bankBagId?: number): undefined {
  const settings = FCOCO.settingsVars.settings
  if (!settings.unSummonAtBanks) {
    interactions.lastCompanionIdBeforeBank = undefined
    return undefined
  }
  const [isPending, isActive] = checkForActiveCompanion()
  if (interactions.actualCompanionDefId !== undefined) {
    if (isActive) {
      interactions.companionWasSummonedBefore = true
      interactions.lastCompanionIdBeforeBank = interactions.actualCompanionDefId
      FCOCO.ToggleCompanion(interactions.lastCompanionIdBeforeBank, false, true)
    } else if (isPending) {
      interactions.companionWasSummonedBefore = true
      EVENT_MANAGER.RegisterForEvent(
        `${FCOCO.addonVars.addonName}_Bank`,
        EVENT_COMPANION_ACTIVATED,
        function (this: void): undefined {
          EVENT_MANAGER.UnregisterForEvent(
            `${FCOCO.addonVars.addonName}_Bank`,
            EVENT_COMPANION_ACTIVATED
          )
          if (!IsBankOpen() && !IsGuildBankOpen()) {
            interactions.lastCompanionIdBeforeBank = undefined
            return undefined
          }
          interactions.lastCompanionIdBeforeBank = interactions.actualCompanionDefId
          FCOCO.ToggleCompanion(interactions.lastCompanionIdBeforeBank, false, true)
          return undefined
        }
      )
    }
  }
  return undefined
}

FCOCO.BankInteractEnd = function (this: void, _eventId: number): undefined {
  const settings = FCOCO.settingsVars.settings
  if (!settings.unSummonAtBanks || !settings.reSummonAfterBanks) {
    interactions.lastCompanionIdBeforeBank = undefined
    return undefined
  }
  if (interactions.lastCompanionIdBeforeBank === undefined) {
    if (
      interactions.companionWasSummonedBefore === true &&
      settings.lastCompanionId !== undefined
    ) {
      interactions.lastCompanionIdBeforeBank = settings.lastCompanionId
    } else {
      return undefined
    }
  }

  FCOCO.ToggleCompanion(interactions.lastCompanionIdBeforeBank, true, true)
  interactions.lastCompanionIdBeforeBank = undefined
  interactions.companionWasSummonedBefore = false
  return undefined
}

FCOCO.VendorInteract = function (
  this: void,
  _eventId: number,
  _allowSell?: boolean,
  _allowLaunder?: boolean
): undefined {
  const settings = FCOCO.settingsVars.settings
  if (!settings.unSummonAtVendors) {
    interactions.lastCompanionIdBeforeVendor = undefined
    return undefined
  }
  const [isPending, isActive] = checkForActiveCompanion()
  if (interactions.actualCompanionDefId !== undefined) {
    if (isActive) {
      interactions.companionWasSummonedBefore = true
      interactions.lastCompanionIdBeforeVendor = interactions.actualCompanionDefId
      FCOCO.ToggleCompanion(interactions.lastCompanionIdBeforeVendor, false, true)
    } else if (isPending) {
      interactions.companionWasSummonedBefore = true
      EVENT_MANAGER.RegisterForEvent(
        `${FCOCO.addonVars.addonName}_Vendor`,
        EVENT_COMPANION_ACTIVATED,
        function (this: void): undefined {
          EVENT_MANAGER.UnregisterForEvent(
            `${FCOCO.addonVars.addonName}_Vendor`,
            EVENT_COMPANION_ACTIVATED
          )
          if (!ZO_Store_IsShopping()) {
            interactions.lastCompanionIdBeforeVendor = undefined
            return undefined
          }
          interactions.lastCompanionIdBeforeVendor = interactions.actualCompanionDefId
          FCOCO.ToggleCompanion(interactions.lastCompanionIdBeforeVendor, false, true)
          return undefined
        }
      )
    }
  }
  return undefined
}

FCOCO.VendorInteractEnd = function (this: void, _eventId: number): undefined {
  const settings = FCOCO.settingsVars.settings
  if (!settings.unSummonAtVendors || !settings.reSummonAfterVendors) {
    interactions.lastCompanionIdBeforeVendor = undefined
    return undefined
  }
  if (interactions.lastCompanionIdBeforeVendor === undefined) {
    if (
      interactions.companionWasSummonedBefore === true &&
      settings.lastCompanionId !== undefined
    ) {
      interactions.lastCompanionIdBeforeVendor = settings.lastCompanionId
    } else {
      return undefined
    }
  }

  FCOCO.ToggleCompanion(interactions.lastCompanionIdBeforeVendor, true, true)
  interactions.lastCompanionIdBeforeVendor = undefined
  interactions.companionWasSummonedBefore = false
  return undefined
}

FCOCO.addonLoaded = function (this: void, eventName: string, addon: string): undefined {
  if (addon !== FCOCO.addonVars.addonName) {
    return undefined
  }
  EVENT_MANAGER.UnregisterForEvent(eventName, EVENT_ADD_ON_LOADED)

  FCOCO.getSettings()

  FCOCO.buildAddonMenu()

  SecurePostHook(
    FISHING_MANAGER ?? INTERACTIVE_WHEEL_MANAGER ?? {},
    "StartInteraction",
    OnStartInteraction
  )

  const addonName = FCOCO.addonVars.addonName
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_PLAYER_ACTIVATED, FCOCO.Player_Activated)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_COMPANION_ACTIVATED, FCOCO.Companion_Activated)
  EVENT_MANAGER.RegisterForEvent(
    addonName,
    EVENT_COMPANION_DEACTIVATED,
    FCOCO.Companion_DeActivated
  )
  EVENT_MANAGER.RegisterForEvent(
    addonName,
    EVENT_CRAFTING_STATION_INTERACT,
    FCOCO.CraftingTableInteract
  )
  EVENT_MANAGER.RegisterForEvent(
    addonName,
    EVENT_END_CRAFTING_STATION_INTERACT,
    FCOCO.CraftingTableInteractEnd
  )
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_OPEN_BANK, FCOCO.BankInteract)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_CLOSE_BANK, FCOCO.BankInteractEnd)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_OPEN_GUILD_BANK, FCOCO.BankInteract)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_CLOSE_GUILD_BANK, FCOCO.BankInteractEnd)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_OPEN_STORE, FCOCO.VendorInteract)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_OPEN_FENCE, FCOCO.VendorInteract)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_CLOSE_STORE, FCOCO.VendorInteractEnd)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_COLLECTIBLE_USE_RESULT, onCollectibleUseResult)
  EVENT_MANAGER.RegisterForEvent(addonName, EVENT_INTERACTION_ENDED, OnEventInteractionEnded)
  EVENT_MANAGER.RegisterForEvent(
    `${addonName}_STEALTH_STATE_CHANGED`,
    EVENT_STEALTH_STATE_CHANGED,
    OnStealthStateChanged
  )
  EVENT_MANAGER.AddFilterForEvent(
    `${addonName}_STEALTH_STATE_CHANGED`,
    EVENT_STEALTH_STATE_CHANGED,
    REGISTER_FILTER_UNIT_TAG,
    "player"
  )
  return undefined
}

FCOCO.initialize = function (this: void): undefined {
  EVENT_MANAGER.RegisterForEvent(
    FCOCO.addonVars.addonName,
    EVENT_ADD_ON_LOADED,
    function (this: void, _eventCode: number, addon: string): undefined {
      FCOCO.addonLoaded(FCOCO.addonVars.addonName, addon)
      return undefined
    }
  )
  return undefined
}
