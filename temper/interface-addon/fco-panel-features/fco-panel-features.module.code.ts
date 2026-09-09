import {
  excludedMountIdsShifterBoxControl,
  updateExcludedMountIdsLibShifterBox,
  updateExcludedMountIdsLibShifterBoxEntries,
  updateExcludedMountIdsLibShifterBoxState,
} from "../fco-collectibles/fco-collectibles.module.code.ts"
import { buildFavoriteMountsContextMenu } from "../fco-collectibles-mounts/fco-collectibles-mounts.module.code.ts"
import { collectibleChanges } from "../fco-collectibles-tooltips/fco-collectibles-tooltips.module.code.ts"
import { mailStuff } from "../fco-mail/fco-mail.module.code.ts"
import { questTrackerMovable } from "../fco-quest/fco-quest.module.code.ts"
import {
  DISABLE_SOUNDS_SHIFTER_BOX_CONTROL,
  muteMountSound,
  updateDisabledSoundsLibShifterBoxState,
  updateDisableSoundsLibShifterBoxEntries,
  updateSoundsLibShifterBox,
} from "../fco-sounds/fco-sounds.module.code.ts"
import type { AddonSettings } from "../fco-types/fco-types.module.code.ts"
import {
  promotionalEventTrackerUiChanges,
  statsPanelUiChanges,
} from "../fco-ui/fco-ui.module.code.ts"

export function buildCollectiblesControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  return [
    {
      type: "header",
      name: GetString(SI_ITEMTYPE34) + " " + GetString(SI_COLLECTIBLECATEGORYTYPE26),
    },
    {
      type: "checkbox",
      name: "Show combined itemname at fragment tooltip",
      tooltip:
        "Show the combined itemname of a collectible at the tooltip of a fragment of that combined collectible. Only shows at the collectibles menu, fragment category.",
      getFunc: () => settings.collectibleTooltipShowFragmentCombinedItem === true,
      setFunc: (value) => {
        settings.collectibleTooltipShowFragmentCombinedItem = value
        collectibleChanges()
      },
      default: defaults.collectibleTooltipShowFragmentCombinedItem === true,
      width: "full",
    },
  ]
}

export function buildDialogsControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  const suppressDialog = settings.suppressDialog
  const suppressDialogDefaults = defaults.suppressDialog
  return [
    { type: "header", name: "Dialogs" },
    {
      type: "checkbox",
      name: "Suppress confirm cancel listing",
      tooltip: "Suppress the confirm cancel trading house lisitng item dialog",
      getFunc: () => suppressDialog.CONFIRM_TRADING_HOUSE_CANCEL_LISTING === true,
      setFunc: (value) => {
        suppressDialog.CONFIRM_TRADING_HOUSE_CANCEL_LISTING = value
      },
      default: suppressDialogDefaults.CONFIRM_TRADING_HOUSE_CANCEL_LISTING === true,
      width: "full",
    },
  ]
}

export function buildMailControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  return [
    { type: "header", name: "Mail" },
    {
      type: "checkbox",
      name: "Show context menu buttons (inbox/send)",
      tooltip:
        "[Mail inbox]Show mass-change context menu button top-left at the mail inbox\n\n[Mail send]Show triangle context menu buttons, and a settings context menu button, at the mail send panel, near the to/subject/text edit boxes.",
      getFunc: () => settings.mailContextMenus === true,
      setFunc: (value) => {
        settings.mailContextMenus = value
        mailStuff("ContextMenu")
      },
      default: defaults.mailContextMenus === true,
      width: "full",
    },
    {
      type: "slider",
      name: "Mail delete delay",
      tooltip:
        "Set the delay in ms between each mail deletion, if mass-change is used (0 = instant/no delay)",
      min: 0,
      max: 5000,
      decimals: 0,
      autoSelect: true,
      getFunc: () => settings.mailDeleteDelay,
      setFunc: (delay) => {
        settings.mailDeleteDelay = delay
      },
      default: defaults.mailDeleteDelay,
      width: "full",
      disabled: () => settings.mailContextMenus !== true,
    },
  ]
}

export function buildUIControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  return [
    { type: "header", name: "UI" },
    {
      type: "checkbox",
      name: "Hide Golden Pursuits tracker",
      tooltip: "Hide the Golden Pursuits tracker at the UI",
      getFunc: () => settings.hidePromotionalEventTracker === true,
      setFunc: (value) => {
        settings.hidePromotionalEventTracker = value
        promotionalEventTrackerUiChanges(value)
      },
      default: defaults.hidePromotionalEventTracker === true,
      disabled: () => PROMOTIONAL_EVENT_TRACKER === undefined,
      width: "half",
    },
    {
      type: "checkbox",
      name: "Don't auto-pin Golden Pursuits",
      tooltip:
        "Stop automatically tracking any Golden Pursuit at the UI.\n\nYou manually control it: After login or UI reload you need to open the Golden Pursuit UI and manually select one of the tracked pins!",
      getFunc: () => settings.dontAutoPinGoldenPursuits === true,
      setFunc: (value) => {
        settings.dontAutoPinGoldenPursuits = value
      },
      default: defaults.dontAutoPinGoldenPursuits === true,
      disabled: () => PROMOTIONAL_EVENT_TRACKER === undefined,
      width: "half",
    },
    {
      type: "checkbox",
      name: "Hide 'Mundus' row at stats",
      getFunc: () => settings.hideStatsPanelMundusRow === true,
      setFunc: (value) => {
        settings.hideStatsPanelMundusRow = value
        statsPanelUiChanges(value)
      },
      default: defaults.hideStatsPanelMundusRow === true,
      width: "full",
    },
  ]
}

export function buildQuestsControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  return [
    { type: "header", name: "Quests" },
    {
      type: "checkbox",
      name: "Make quest tracker movable",
      tooltip: "Make the vanilla quest tracker movable on the UI, and save it's position",
      getFunc: () => settings.questTrackerMovable === true,
      setFunc: (value) => {
        settings.questTrackerMovable = value
        questTrackerMovable(value)
      },
      default: defaults.questTrackerMovable === true,
      width: "half",
    },
  ]
}

export function buildSoundsControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  return [
    { type: "header", name: "Sounds" },
    {
      type: "checkbox",
      name: "Mute sound on mounting",
      tooltip: "Mute the game sound upon mounting for the chosen time (see slider)",
      getFunc: () => settings.muteMountSound === true,
      setFunc: (value) => {
        settings.muteMountSound = value
        muteMountSound()
      },
      default: defaults.muteMountSound === true,
      width: "half",
    },
    {
      type: "slider",
      name: "SFX volume as you mount",
      tooltip: "The SFX volume will be set to this value as you mount. Standard is 0",
      min: 0,
      max: 100,
      decimals: 0,
      autoSelect: true,
      getFunc: () => settings.muteMountSoundVolume,
      setFunc: (volumeVal) => {
        settings.muteMountSoundVolume = volumeVal
      },
      default: defaults.muteMountSoundVolume,
      width: "half",
      disabled: () => settings.muteMountSound !== true,
    },
    {
      type: "slider",
      name: "Mute time after mount",
      tooltip: "Time in milliseconds the sound should be muted after you have mounted",
      min: 0,
      max: 10000,
      decimals: 0,
      autoSelect: true,
      getFunc: () => settings.muteMountSoundDelay,
      setFunc: (delayVal) => {
        settings.muteMountSoundDelay = delayVal
      },
      default: defaults.muteMountSoundDelay,
      width: "half",
      disabled: () => settings.muteMountSound !== true,
    },
    {
      type: "checkbox",
      name: "Disable some sounds",
      tooltip:
        "Disable some selected sounds so you do not hear them anymore. Select the sounds to disable in the shift box below (left side) and move them to the right side to disable them.",
      getFunc: () => settings.disableSoundsLibShifterBox === true,
      setFunc: (value) => {
        settings.disableSoundsLibShifterBox = value
        updateDisabledSoundsLibShifterBoxState(
          FCOCHANGESTUFF_LAM_CUSTOM_SOUNDS_DISABLE_PARENT,
          DISABLE_SOUNDS_SHIFTER_BOX_CONTROL.current
        )
        updateDisableSoundsLibShifterBoxEntries(DISABLE_SOUNDS_SHIFTER_BOX_CONTROL.current)
      },
      default: defaults.disableSoundsLibShifterBox === true,
      width: "full",
    },
    {
      type: "custom",
      reference: "FCOCHANGESTUFF_LAM_CUSTOM_SOUNDS_DISABLE_PARENT",
      createFunc: (customControl) => {
        updateSoundsLibShifterBox(customControl)
      },
      minHeight: 275,
      width: "full",
    },
  ]
}

export function buildMountsControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings,
  favoritesExcludedListStatusIconText: string
): LamControlData[] {
  return [
    { type: "header", name: "Mounts" },
    {
      type: "checkbox",
      name: "Favorite mount context menus",
      tooltip:
        "Enable context menu entries at the mount collections, to (mass)add/remove mounts to/from favorite mounts",
      getFunc: () => settings.favoriteMountsContextMenu === true,
      setFunc: (value) => {
        settings.favoriteMountsContextMenu = value
        buildFavoriteMountsContextMenu()
        updateExcludedMountIdsLibShifterBoxState(
          FCOCHANGESTUFF_LAM_MOUNT_FAVORITES_EXCLUDE_PARENT,
          excludedMountIdsShifterBoxControl
        )
        updateExcludedMountIdsLibShifterBoxEntries(excludedMountIdsShifterBoxControl)
      },
      default: defaults.favoriteMountsContextMenu === true,
      width: "half",
    },
    {
      type: "description",
      title:
        "Instructions for mount favorites |cFF0000" +
        favoritesExcludedListStatusIconText +
        "|r below",
      text: "Move the mounts from left to right, which should not automatically be added to your favorite mounts, if you use the '|c00FF00Add all|r mounts to favorites' entry at the mount collectibles tile contextmenu.\n\nLocked mount names are shown |cFF0000in red color|r (top of the list), while unlocked ones are shown |cFFFFFFin white color|r (bottom of the list).\nYou can click the search icon to open the search field, enter a search text and press enter key to filter the list. Press the search icon again to close the search.",
    },
    {
      type: "custom",
      reference: "FCOCHANGESTUFF_LAM_MOUNT_FAVORITES_EXCLUDE_PARENT",
      createFunc: (customControl) => {
        updateExcludedMountIdsLibShifterBox(customControl)
      },
      minHeight: 275,
      width: "full",
    },
  ]
}
