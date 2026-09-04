export interface FcoSettings {
  language?: number
  saveMode?: number

  alwaysUseClientLanguage?: boolean

  companionIsSummoned: boolean
  lastCompanionId?: number

  unSummonAtCraftingTables: boolean
  reSummonAfterCraftingTables: boolean
  unSummonAtBanks: boolean
  reSummonAfterBanks: boolean
  unSummonAtVendors: boolean
  reSummonAfterVendors: boolean
  unSummonAtFishing: boolean
  reSummonAfterFishing: boolean
  reSummonAfterFishingDelay: number
  disableCompanionAtCompass: boolean
  unSummonAtCrouching: boolean
  unSummonAtCrouchingNoCombat: boolean
  reSummonAfterCrouching: boolean
  reSummonAfterCrouchingDelay: number
}

export interface FcoDefaultSettings {
  language: number
  saveMode: number
}

export interface AddonVars {
  addonVersion: number
  addonSavedVarsVersion: string
  addonSavedVarsVersionPerToon: string
  addonSavedVarsForAllTable: string
  addonSavedVarsNormalTable: string
  addonName: string
  addonNameMenu: string
  addonNameMenuDisplay: string
  addonSavedVariablesName: string
  addonSavedVariablesNamePerToon: string
  settingsName: string
  addonAuthor: string
  addonWebsite: string
  addonFeedback: string
  addonDonation: string
}

export interface SettingsVars {
  defaultSettings: FcoDefaultSettings
  settings: FcoSettings
  settingsPerToon: FcoSettings
  defaults: FcoSettings
  defaultsPerToon: FcoSettings
}

export type CompanionInfo = Record<number, number>
