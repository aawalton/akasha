import type { DefaultsSettings } from "../fco-settings-defaults/fco-settings-defaults.module.code.ts"

export interface AddonVars {
  addonVersion: number
  addonSavedVarsVersion: string
  addonName: string
  addonNameMenu: string
  addonNameMenuDisplay: string
  addonNameShortColored: string
  addonSavedVariablesName: string
  settingsName: string
  addonAuthor: string
  addonWebsite: string
  addonFeedback: string
  addonDonation: string
}

export interface XYCoord {
  x: number
  y: number
}

export interface MailFieldFlags {
  recipients: boolean
  subjects: boolean
  texts: boolean
}

export interface MailFieldStrings {
  recipients: string
  subjects: string
  texts: string
}

export interface MailFieldTables {
  recipients: Record<string, unknown>
  subjects: Record<string, unknown>
  texts: Record<string, unknown>
}

export interface RGBAColor {
  r: number
  g: number
  b: number
  a: number
}

export interface IconPosBox {
  x: number
  y: number
  width: number
  height: number
}

export interface AddonSettings {
  language: number
  saveMode: number
  alwaysUseClientLanguage: boolean
  showRealCPs: boolean
  reOpenMapOnMounting: boolean
  showEnDisableAllFilterButtons: boolean
  hideCrownStoreButtonInMainMenu: boolean
  hideCrownStoreMembershipInMainMenu: boolean
  hideCrownCratesButtonInMainMenu: boolean
  hideCrownStorePointsInMainMenu: boolean
  stableFeedSettings: Record<number, boolean>
  showAddonSettingsMainMenuButton: boolean
  smithingCreationAddArmorTypeSwitchButton: boolean
  improvementWith100Percent: boolean
  improvementBlockQuality: number
  improvementBlockQualityExceptionShiftKey: boolean
  removeNewItemIcon: boolean
  removeSellItemIcon: boolean
  enableChatBlacklist: boolean
  chatKeyWords: string
  enableChatBlacklistForWhispers: boolean
  enableChatBlacklistForGroup: boolean
  enableChatBlacklistForGuilds: boolean
  blacklistedTextToChat: boolean
  enableSkillLineContextMenu: boolean
  skillLineIndexState: Record<number, unknown>
  noShopAdvertisementPopup: boolean
  noEnlightenedSound: boolean
  enableBGHUDMoveable: boolean
  BGHUDcoordinates: XYCoord
  changeSoundAtCrafting: boolean
  changeSoundAtCraftingVolume: number
  volumes: Record<number, Record<number, string | number>>
  pingPongPlayerPinOnMapOpen: boolean
  pingPongPlayerPinOnMapOpenScaling: number
  enableChatWhisperAndFlaggedAsOfflineReminder: boolean
  enableKeybindCompassQuestGivers: boolean
  hideMapZoneStory: boolean
  hideMapZoneStoryBeamMeUpAllowedToShow: boolean
  disableChatNotificationAnimation: boolean
  disableChatNotificationSound: boolean
  showCharacterPanelAtBank: boolean
  showCharacterPanelAtGuildBank: boolean
  disableSoundsLibShifterBox: boolean
  disabledSoundEntries: Record<string, unknown>
  muteMountSound: boolean
  muteMountSoundDelay: number
  muteMountSoundVolume: number
  autoDeclineGroupElections: boolean
  tooltipSizeHack: boolean
  tooltipSizeItemBorder: number
  tooltipSizePopupBorder: number
  tooltipSizeComparativeBorder: number
  tooltipSizeItemScaleHackPercentage: number
  tooltipSizePopupScaleHackPercentage: number
  tooltipSizeComparativeScaleHackPercentage: number
  snapCursorToLootWindow: boolean
  repositionActionSlotTimers: boolean
  repositionActionSlotTimersOffset: XYCoord
  showActionSlotTimersTimeLeftNumber: boolean
  spinStop: boolean
  spinStopAtScenes: {
    inventory: boolean
    collectionsBook: boolean
    allOthers: boolean
    stats: boolean
  }
  collectibleTooltipShowFragmentCombinedItem: boolean
  enableKeybindInnocentAttack: boolean
  doNotInterruptHarvestOnMenuOpen: boolean
  hidePOIsInCities: boolean
  suppressDialog: Record<string, boolean>
  mailContextMenus: boolean
  overwriteMailFields: MailFieldFlags
  saveMailFields: MailFieldFlags
  autoLoadMailFields: MailFieldFlags
  autoLoadMailFieldsAt: {
    mailOpen: MailFieldFlags
    mailWasSend: MailFieldFlags
  }
  mailLastUsed: MailFieldStrings
  mailFavorites: MailFieldFlags
  mailTextsSaved: MailFieldTables
  mailFavoritesSaved: MailFieldTables
  mailProfiles: Record<string, unknown>
  enableMailProfiles: boolean
  splitMailFavoritesIntoAlphabet: boolean
  mailFavoritesContextMenusAtEditFields: boolean
  mailLastUsedContextMenusAtEditFields: boolean
  mailContextMenuSubmenusForceOpenToTheLeft: boolean
  mailDeleteDelay: number
  showScrollUpDownButtonsAtVerticalScrollbar: boolean
  addGuildHistoryNavigationFirstAndLastPage: boolean
  hidePromotionalEventTracker: boolean
  dontAutoPinGoldenPursuits: boolean
  dontAutoPinFinishedGoldenPursuits: boolean | undefined
  questTrackerMovable: boolean
  questTrackerPos: XYCoord
  hideStatsPanelMundusRow: boolean
  easyDestroy: boolean
  removeLearnableItemIcon: boolean
  learnableItemIconColor: RGBAColor
  learnableItemIconPos: Record<number, IconPosBox>
  addMassHandlingNotificationsButton: boolean
  favoriteMountsContextMenu: boolean
  excludedMountCollectionIdsEntries: Record<number, string | undefined>
  qualityChoices?: Record<number, string>
  keepLearnableItemIconInLoot?: boolean
  doNotInterruptInWorldOnMenuOpen?: boolean
}

export interface SettingsVars {
  settings: AddonSettings
  defaults: AddonSettings
  defaultSettings: DefaultsSettings
}

export type PreventerVars = { [key: string]: unknown }

export interface CtrlVars {
  smithingCreatePanel: unknown
  smithingCreatePanelPatternListTitle: unknown
  smithingCreatePanelPatternListList: unknown
  [key: string]: unknown
}

export interface OtherAddonsState {
  PerfectPixel: boolean
  NoThankYou: boolean
  [key: string]: unknown
}
