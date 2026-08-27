import {
  ADDON_AUTHOR,
  ADDON_DONATION,
  ADDON_FEEDBACK,
  ADDON_NAME,
  ADDON_NAME_MENU,
  ADDON_NAME_MENU_DISPLAY,
  ADDON_NAME_SHORT_COLORED,
  ADDON_SETTINGS_NAME,
  ADDON_VERSION_NUMBER,
  ADDON_WEBSITE,
  SAVED_VARIABLES_NAME,
  SAVED_VARS_VERSION,
  spinFragments,
} from "./constants"
import { buildEmptySettings } from "./settings-empty"
import type { AddonVars, CtrlVars, OtherAddonsState, PreventerVars, SettingsVars } from "./types"

export interface FcocsState {
  addonVars: AddonVars
  settingsVars: SettingsVars
  preventerVars: PreventerVars
  ctrlVars: CtrlVars
  otherAddons: OtherAddonsState
  spinFragments: readonly unknown[]
  worldMapShown: boolean
  wolrdMapFilterEnableAllButton: Control | undefined
  wolrdMapFilterDisableAllButton: Control | undefined
  playerActivatedDone: boolean
  gameMenuSceneActive: boolean
  runGroupListCounter: number
  blacklistKeyWords: string[]
  LSB: unknown
  LAM: unknown
  LMM2: unknown
  LibNotifications: unknown
  originalUnitCPEffectiveFunc: unknown
  originalUnitCPFunc: unknown
  originalCPFunc: unknown
}

const smithingCreatePanel = ZO_SmithingTopLevelCreationPanel
const smithingPatternList = smithingCreatePanel.GetNamedChild("PatternList")

export const state: FcocsState = {
  addonVars: {
    addonVersion: ADDON_VERSION_NUMBER,
    addonSavedVarsVersion: SAVED_VARS_VERSION,
    addonName: ADDON_NAME,
    addonNameMenu: ADDON_NAME_MENU,
    addonNameMenuDisplay: ADDON_NAME_MENU_DISPLAY,
    addonNameShortColored: ADDON_NAME_SHORT_COLORED,
    addonSavedVariablesName: SAVED_VARIABLES_NAME,
    settingsName: ADDON_SETTINGS_NAME,
    addonAuthor: ADDON_AUTHOR,
    addonWebsite: ADDON_WEBSITE,
    addonFeedback: ADDON_FEEDBACK,
    addonDonation: ADDON_DONATION,
  },
  settingsVars: {
    settings: buildEmptySettings(),
    defaults: buildEmptySettings(),
    defaultSettings: buildEmptySettings(),
  },
  preventerVars: {
    doNotShowAskBeforeIgnoreDialog: false,
  },
  ctrlVars: {
    smithingCreatePanel,
    smithingCreatePanelPatternListTitle: smithingPatternList?.GetNamedChild("Title"),
    smithingCreatePanelPatternListList: smithingPatternList?.GetNamedChild("List"),
  },
  otherAddons: {
    PerfectPixel: false,
    NoThankYou: false,
  },
  spinFragments,
  worldMapShown: false,
  wolrdMapFilterEnableAllButton: undefined,
  wolrdMapFilterDisableAllButton: undefined,
  playerActivatedDone: false,
  gameMenuSceneActive: false,
  runGroupListCounter: 0,
  blacklistKeyWords: [],
  LSB: undefined,
  LAM: undefined,
  LMM2: undefined,
  LibNotifications: undefined,
  originalUnitCPEffectiveFunc: undefined,
  originalUnitCPFunc: undefined,
  originalCPFunc: undefined,
}
