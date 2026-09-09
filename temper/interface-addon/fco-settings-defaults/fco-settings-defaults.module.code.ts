import type { AddonSettings } from "../fco-types/fco-types.module.code.ts"

export type DefaultsSettings = Pick<AddonSettings, "language" | "saveMode">

export function buildDefaultsSettings(this: void): DefaultsSettings {
  return {
    language: 1,
    saveMode: 2,
  }
}

function getNumberKeys(this: void, record: Record<number, boolean>): number[] {
  const keys: number[] = []
  for (const k in record) {
    const numericKey = tonumber(k)
    if (numericKey !== undefined) {
      keys[keys.length] = numericKey
    }
  }
  return keys
}

export type Defaults = Omit<AddonSettings, "language" | "saveMode">

export function buildDefaults(this: void): Defaults {
  const [defR, defG, defB, deafA] = ZO_SUCCEEDED_TEXT.UnpackRGBA()

  const defaults: Defaults = {
    alwaysUseClientLanguage: true,
    showRealCPs: false,
    reOpenMapOnMounting: false,
    showEnDisableAllFilterButtons: false,
    hideCrownStoreButtonInMainMenu: false,
    hideCrownStoreMembershipInMainMenu: false,
    hideCrownCratesButtonInMainMenu: false,
    hideCrownStorePointsInMainMenu: false,
    stableFeedSettings: {
      [RIDING_TRAIN_SPEED]: false,
      [RIDING_TRAIN_STAMINA]: false,
      [RIDING_TRAIN_CARRYING_CAPACITY]: false,
    },
    showAddonSettingsMainMenuButton: false,
    smithingCreationAddArmorTypeSwitchButton: true,
    improvementWith100Percent: false,
    improvementBlockQuality: -1,
    improvementBlockQualityExceptionShiftKey: false,
    removeNewItemIcon: false,
    removeSellItemIcon: false,
    enableChatBlacklist: false,
    chatKeyWords: "",
    enableChatBlacklistForWhispers: false,
    enableChatBlacklistForGroup: false,
    enableChatBlacklistForGuilds: false,
    blacklistedTextToChat: false,
    enableSkillLineContextMenu: false,
    skillLineIndexState: {},
    noShopAdvertisementPopup: false,
    noEnlightenedSound: false,
    enableBGHUDMoveable: false,
    BGHUDcoordinates: {
      x: 21,
      y: 0,
    },
    changeSoundAtCrafting: false,
    changeSoundAtCraftingVolume: 0,
    volumes: {
      [SETTING_TYPE_AUDIO]: {
        [AUDIO_SETTING_AUDIO_VOLUME]: 0,
      },
    },
    pingPongPlayerPinOnMapOpen: true,
    pingPongPlayerPinOnMapOpenScaling: 25,
    enableChatWhisperAndFlaggedAsOfflineReminder: false,
    enableKeybindCompassQuestGivers: false,
    hideMapZoneStory: false,
    hideMapZoneStoryBeamMeUpAllowedToShow: false,
    disableChatNotificationAnimation: false,
    disableChatNotificationSound: false,
    showCharacterPanelAtBank: false,
    showCharacterPanelAtGuildBank: false,
    disableSoundsLibShifterBox: false,
    disabledSoundEntries: {},
    muteMountSound: false,
    muteMountSoundDelay: 500,
    muteMountSoundVolume: 0,
    autoDeclineGroupElections: false,
    tooltipSizeHack: false,
    tooltipSizeItemBorder: 416,
    tooltipSizePopupBorder: 416,
    tooltipSizeComparativeBorder: 416,
    tooltipSizeItemScaleHackPercentage: 100,
    tooltipSizePopupScaleHackPercentage: 100,
    tooltipSizeComparativeScaleHackPercentage: 100,
    snapCursorToLootWindow: false,
    repositionActionSlotTimers: false,
    repositionActionSlotTimersOffset: {
      x: 0,
      y: 0,
    },
    showActionSlotTimersTimeLeftNumber: false,
    spinStop: false,
    spinStopAtScenes: {
      inventory: true,
      collectionsBook: true,
      allOthers: true,
      stats: false,
    },
    collectibleTooltipShowFragmentCombinedItem: false,
    enableKeybindInnocentAttack: false,
    doNotInterruptHarvestOnMenuOpen: false,
    hidePOIsInCities: false,
    suppressDialog: {
      CONFIRM_TRADING_HOUSE_CANCEL_LISTING: false,
    },
    mailContextMenus: true,
    overwriteMailFields: {
      recipients: true,
      subjects: true,
      texts: true,
    },
    saveMailFields: {
      recipients: true,
      subjects: true,
      texts: true,
    },
    autoLoadMailFields: {
      recipients: false,
      subjects: false,
      texts: false,
    },
    autoLoadMailFieldsAt: {
      mailOpen: {
        recipients: false,
        subjects: false,
        texts: false,
      },
      mailWasSend: {
        recipients: false,
        subjects: false,
        texts: false,
      },
    },
    mailLastUsed: {
      recipients: "",
      subjects: "",
      texts: "",
    },
    mailFavorites: {
      recipients: false,
      subjects: false,
      texts: false,
    },
    mailTextsSaved: {
      recipients: {},
      subjects: {},
      texts: {},
    },
    mailFavoritesSaved: {
      recipients: {},
      subjects: {},
      texts: {},
    },

    mailProfiles: {},
    enableMailProfiles: false,

    splitMailFavoritesIntoAlphabet: false,
    mailFavoritesContextMenusAtEditFields: false,
    mailLastUsedContextMenusAtEditFields: false,
    mailContextMenuSubmenusForceOpenToTheLeft: true,
    mailDeleteDelay: 0,
    showScrollUpDownButtonsAtVerticalScrollbar: false,

    addGuildHistoryNavigationFirstAndLastPage: false,

    hidePromotionalEventTracker: false,
    dontAutoPinGoldenPursuits: false,
    dontAutoPinFinishedGoldenPursuits: undefined,

    questTrackerMovable: false,
    questTrackerPos: { x: 1, y: -1 },

    hideStatsPanelMundusRow: false,

    easyDestroy: false,

    removeLearnableItemIcon: false,
    learnableItemIconColor: { r: defR, g: defG, b: defB, a: deafA },
    learnableItemIconPos: {
      [BAG_BACKPACK]: { x: 0, y: 0, width: 32, height: 32 },
      [BAG_BANK]: { x: 0, y: 0, width: 32, height: 32 },
      [BAG_HOUSE_BANK_ONE]: { x: 0, y: 0, width: 32, height: 32 },
      [BAG_GUILDBANK]: { x: 0, y: 0, width: 32, height: 32 },
      [990]: { x: 0, y: 0, width: 32, height: 32 },
    },

    addMassHandlingNotificationsButton: false,

    favoriteMountsContextMenu: false,
    excludedMountCollectionIdsEntries: {},
  }

  const excludedMountIdsShifterBoxDefaults: Record<number, boolean> = {
    [5870]: true,
    [5880]: true,
    [7291]: true,
    [9829]: true,
  }
  const excludedEntries = defaults.excludedMountCollectionIdsEntries
  for (const mountCollectibleIdToExclude of getNumberKeys(excludedMountIdsShifterBoxDefaults)) {
    if (excludedMountIdsShifterBoxDefaults[mountCollectibleIdToExclude] === true) {
      excludedEntries[mountCollectibleIdToExclude] = zo_strformat(
        SI_UNIT_NAME,
        GetCollectibleName(mountCollectibleIdToExclude)
      )
    }
  }

  return defaults
}
