import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import { asFcoSettings, asNumber } from "../companion-qol-casts/companion-qol-casts.module.code.ts"
import { FCOCO } from "../companion-qol-state/companion-qol-state.module.code.ts"
import type {
  FcoDefaultSettings,
  FcoSettings,
} from "../companion-qol-types/companion-qol-types.module.code.ts"

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
