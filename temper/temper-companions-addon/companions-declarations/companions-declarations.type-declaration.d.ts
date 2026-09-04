interface FcoFishingManager {
  StartInteraction: (this: FcoFishingManager) => undefined
}

declare const FISHING_MANAGER: FcoFishingManager | undefined

declare const INTERACTIVE_WHEEL_MANAGER: FcoFishingManager | undefined

declare const ZO_Store_IsShopping: (this: void) => boolean

interface FcoSceneFragment {
  IsShowing: (this: FcoSceneFragment) => boolean
}

declare const COMPANION_OVERVIEW_KEYBOARD_FRAGMENT: FcoSceneFragment

interface RapportBar {
  control: Control
  valueLabel?: LabelControl
}

interface RapportOverviewKeyboard {
  rapportBar: RapportBar
}

declare const FCOCO_NO_COMPANION_UNLOCKED_YET: number

declare const FCOCO_TOGGLE_COMPANION: number

declare const FCOCO_LAM_SV_MODE: number

declare const FCOCO_LAM_SV_MODE_TT: number

declare const FCOCO_LAM_SV_EACH_CHARACTER: number

declare const FCOCO_LAM_SV_ACCOUNT_WIDE: number

declare const FCOCO_LAM_SETTING_HEADER_CRAFTING: number

declare const FCOCO_LAM_SETTING_UNSUMMON_AT_CRAFTING_TABLE: number

declare const FCOCO_LAM_SETTING_UNSUMMON_AT_CRAFTING_TABLE_TT: number

declare const FCOCO_LAM_SETTING_RESUMMON_AFTER_CRAFTING_TABLE: number

declare const FCOCO_LAM_SETTING_RESUMMON_AFTER_CRAFTING_TABLE_TT: number

declare const FCOCO_LAM_SETTING_HEADER_BANKS: number

declare const FCOCO_LAM_SETTING_UNSUMMON_AT_BANK: number

declare const FCOCO_LAM_SETTING_UNSUMMON_AT_BANK_TT: number

declare const FCOCO_LAM_SETTING_RESUMMON_AFTER_BANK: number

declare const FCOCO_LAM_SETTING_RESUMMON_AFTER_BANK_TT: number

declare const FCOCO_LAM_SETTING_HEADER_VENDORS: number

declare const FCOCO_LAM_SETTING_UNSUMMON_AT_VENDOR: number

declare const FCOCO_LAM_SETTING_UNSUMMON_AT_VENDOR_TT: number

declare const FCOCO_LAM_SETTING_RESUMMON_AFTER_VENDOR: number

declare const FCOCO_LAM_SETTING_RESUMMON_AFTER_VENDOR_TT: number

declare const FCOCO_LAM_SETTING_HEADER_FISHING: number

declare const FCOCO_LAM_SETTING_UNSUMMON_AT_FISHING: number

declare const FCOCO_LAM_SETTING_UNSUMMON_AT_FISHING_TT: number

declare const FCOCO_LAM_SETTING_RESUMMON_AFTER_FISHING: number

declare const FCOCO_LAM_SETTING_RESUMMON_AFTER_FISHING_TT: number

declare const FCOCO_LAM_SETTING_RESUMMON_AFTER_FISHING_DELAY: number

declare const FCOCO_LAM_SETTING_RESUMMON_AFTER_FISHING_DELAY_TT: number

declare const FCOCO_LAM_SETTING_HEADER_CROUCH: number

declare const FCOCO_LAM_SETTING_UNSUMMON_AT_CROUCHING: number

declare const FCOCO_LAM_SETTING_UNSUMMON_AT_CROUCHING_TT: number

declare const FCOCO_LAM_SETTING_UNSUMMON_AT_CROUCHING_NO_COMBAT: number

declare const FCOCO_LAM_SETTING_UNSUMMON_AT_CROUCHING_NO_COMBAT_TT: number

declare const FCOCO_LAM_SETTING_RESUMMON_AFTER_CROUCHING: number

declare const FCOCO_LAM_SETTING_RESUMMON_AFTER_CROUCHING_TT: number

declare const FCOCO_LAM_SETTING_RESUMMON_AFTER_CROUCHING_DELAY: number

declare const FCOCO_LAM_SETTING_RESUMMON_AFTER_CROUCHING_DELAY_TT: number

declare const FCOCO_LAM_SETTING_HEADER_COMPASS: number

declare const FCOCO_LAM_SETTING_DISABLE_PIN_AT_COMPASS: number

declare const FCOCO_LAM_SETTING_DISABLE_PIN_AT_COMPASS_TT: number

interface TemperCharactersTabManager {
  RegisterExternalTab: (
    this: void,
    tabDef: { id: string; title: string; subTabs: { id: string; title: string }[] },
    creators: Record<string, (this: void, container: Control) => Control>,
    refreshers: Record<string, (this: void) => undefined>
  ) => undefined
  RefreshActivePanel: (this: void) => undefined
  SelectTopTab: (this: void, tabId: string, subTabId?: string) => undefined
  SelectSubTab: (this: void, parentTabId: string, subTabId: string) => undefined
}

interface TemperCharactersSavedVariables {
  navigation: {
    selectedTab: string
    selectedSubTab: string
    windowPosition?: { left: number; top: number }
  }
  account: { achievements: Record<string, unknown> }
  characters: Record<string, { companionRapport?: Record<number, number> }>
}

declare const TemperCharacters: {
  getSavedVariables: (this: void) => TemperCharactersSavedVariables
  HideWindow: (this: void) => undefined
  ShowWindow: (this: void) => undefined
  ToggleWindow: (this: void) => undefined
  scheduleTaskAutoCompletionCheck: (this: void) => undefined
  TabManager: TemperCharactersTabManager
}
