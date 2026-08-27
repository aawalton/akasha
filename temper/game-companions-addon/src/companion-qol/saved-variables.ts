import { asFcoSettings, asNumber } from "./casts"
import { FCOCO } from "./state"
import type { FcoDefaultSettings, FcoSettings } from "./types"

FCOCO.getSettings = function (this: void): undefined {
  const addonVars = FCOCO.addonVars
  const serverName = GetWorldName()
  const svName = addonVars.addonSavedVariablesName
  const svPerToonName = addonVars.addonSavedVariablesNamePerToon
  const svVersion = addonVars.addonSavedVarsVersion
  const svVersionPerToon = addonVars.addonSavedVarsVersionPerToon
  const svForAllTable = addonVars.addonSavedVarsForAllTable
  const svNormalTable = addonVars.addonSavedVarsNormalTable

  const defaultsSettings: FcoDefaultSettings = {
    language: 1,
    saveMode: 2,
  }

  const defaults: FcoSettings = {
    alwaysUseClientLanguage: true,

    companionIsSummoned: false,
    lastCompanionId: 1,
    unSummonAtCraftingTables: true,
    reSummonAfterCraftingTables: true,
    unSummonAtBanks: false,
    reSummonAfterBanks: false,
    unSummonAtVendors: false,
    reSummonAfterVendors: false,
    unSummonAtFishing: false,
    reSummonAfterFishing: false,
    reSummonAfterFishingDelay: 5000,
    disableCompanionAtCompass: false,
    unSummonAtCrouching: false,
    unSummonAtCrouchingNoCombat: false,
    reSummonAfterCrouching: false,
    reSummonAfterCrouchingDelay: 5000,
  }
  FCOCO.settingsVars.defaults = defaults

  const defaultsPerToon: FcoSettings = asFcoSettings({})
  FCOCO.settingsVars.defaultsPerToon = defaultsPerToon

  FCOCO.settingsVars.defaultSettings = ZO_SavedVars.NewAccountWide(
    svName,
    999,
    svForAllTable,
    defaultsSettings,
    serverName
  )

  if (FCOCO.settingsVars.defaultSettings.saveMode === 1) {
    FCOCO.settingsVars.settings = ZO_SavedVars.NewCharacterIdSettings(
      svName,
      asNumber(svVersion),
      svNormalTable,
      defaults,
      serverName
    )
  } else {
    FCOCO.settingsVars.settings = ZO_SavedVars.NewAccountWide(
      svName,
      asNumber(svVersion),
      svNormalTable,
      defaults,
      serverName
    )
  }
  FCOCO.settingsVars.settingsPerToon = ZO_SavedVars.NewCharacterIdSettings(
    svPerToonName,
    asNumber(svVersionPerToon),
    svNormalTable,
    defaultsPerToon,
    serverName
  )
  return undefined
}
