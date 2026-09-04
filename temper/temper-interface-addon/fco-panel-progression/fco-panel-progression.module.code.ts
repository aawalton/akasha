import { soundLowerAtCraftingCheck } from "../fco-crafting/fco-crafting.module.code.ts"
import { smithingCreateAddArmorTypeSwitchButton } from "../fco-crafting-smithing/fco-crafting-smithing.module.code.ts"
import { cPStuff, groupElectionStuff } from "../fco-group/fco-group.module.code.ts"
import {
  checkIfOtherStableButtonsAreMaxedOut,
  STABLE_SKILLS,
} from "../fco-stable/fco-stable.module.code.ts"
import type { AddonSettings } from "../fco-types/fco-types.module.code.ts"

export function buildGroupControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  return [
    { type: "header", name: "Group" },
    {
      type: "checkbox",
      name: "Show real Champion Points",
      tooltip:
        'Show the real gained CPs at the level column of your group members & friends list instead of the "maximum value" that ZOs allows to be effective at the moment.',
      getFunc: () => settings.showRealCPs === true,
      setFunc: (value) => {
        settings.showRealCPs = value
        cPStuff()
      },
      default: defaults.showRealCPs === true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "Auto decline group elections",
      tooltip:
        "Automatically decline any group elections/ready checks as long as this setting is enabled. Can be changed via keybinding as well",
      getFunc: () => settings.autoDeclineGroupElections === true,
      setFunc: (value) => {
        settings.autoDeclineGroupElections = value
        groupElectionStuff()
      },
      default: defaults.autoDeclineGroupElections === true,
      width: "full",
    },
  ]
}

export function buildStableControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings
): LamControlData[] {
  const stableFeedSettings = settings.stableFeedSettings
  const stableFeedDefaults = defaults.stableFeedSettings
  return [
    { type: "header", name: "Stable" },
    {
      type: "checkbox",
      name: "Hide feed button: Speed",
      tooltip: "Hide the stable's feed for speed button so you do not accidentally click it",
      getFunc: () => stableFeedSettings[RIDING_TRAIN_SPEED] === true,
      setFunc: (value) => {
        stableFeedSettings[RIDING_TRAIN_SPEED] = value
      },
      default: stableFeedDefaults[RIDING_TRAIN_SPEED] === true,
      disabled: () =>
        STABLE_SKILLS[RIDING_TRAIN_SPEED]?.maxed === true ||
        checkIfOtherStableButtonsAreMaxedOut(RIDING_TRAIN_SPEED) === true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "Hide feed button: Stamina",
      tooltip: "Hide the stable's feed for stamina button so you do not accidentally click it",
      getFunc: () => stableFeedSettings[RIDING_TRAIN_STAMINA] === true,
      setFunc: (value) => {
        stableFeedSettings[RIDING_TRAIN_STAMINA] = value
      },
      default: stableFeedDefaults[RIDING_TRAIN_STAMINA] === true,
      disabled: () =>
        STABLE_SKILLS[RIDING_TRAIN_STAMINA]?.maxed === true ||
        checkIfOtherStableButtonsAreMaxedOut(RIDING_TRAIN_STAMINA) === true,
      width: "full",
    },
    {
      type: "checkbox",
      name: "Hide feed button: Carry",
      tooltip: "Hide the stable's feed for carry button so you do not accidentally click it",
      getFunc: () => stableFeedSettings[RIDING_TRAIN_CARRYING_CAPACITY] === true,
      setFunc: (value) => {
        stableFeedSettings[RIDING_TRAIN_CARRYING_CAPACITY] = value
      },
      default: stableFeedDefaults[RIDING_TRAIN_CARRYING_CAPACITY] === true,
      disabled: () =>
        STABLE_SKILLS[RIDING_TRAIN_CARRYING_CAPACITY]?.maxed === true ||
        checkIfOtherStableButtonsAreMaxedOut(RIDING_TRAIN_CARRYING_CAPACITY) === true,
      width: "full",
    },
  ]
}

export function buildCraftingControls(
  this: void,
  settings: AddonSettings,
  defaults: AddonSettings,
  qualityChoices: string[],
  qualityChoicesValues: number[]
): LamControlData[] {
  return [
    { type: "header", name: "Crafting" },
    {
      type: "checkbox",
      name: "Create: Add armor type switch button",
      tooltip:
        "Add a button to the crafting stations create panel to switch between light & medium armor",
      getFunc: () => settings.smithingCreationAddArmorTypeSwitchButton === true,
      setFunc: (value) => {
        settings.smithingCreationAddArmorTypeSwitchButton = value
        smithingCreateAddArmorTypeSwitchButton()
      },
      default: defaults.smithingCreationAddArmorTypeSwitchButton === true,
      width: "full",
    },
    {
      type: "dropdown",
      name: "Block improvement to quality >=",
      tooltip:
        "Block the improvement of items to the chosen, or higher, qualities (=improved item's new quality).\n\nAll qualities below the chosen one can be the result of your improvement. But the chosen quality and above (if any above exists) are blocked and wont be allowed.\nA chat message tells you that the item was blocked.",
      choices: qualityChoices,
      choicesValues: qualityChoicesValues,
      getFunc: () => settings.improvementBlockQuality,
      setFunc: (value) => {
        settings.improvementBlockQuality = tonumber(value) ?? -1
      },
      default: defaults.improvementBlockQuality,
      width: "half",
    },
    {
      type: "checkbox",
      name: "Allow with SHIFT key",
      tooltip:
        "Allow the improvement of the item if you hold the SHIFT key down as you try to improve the item.\n\nAttention: The standard keybinding to start the improvement cannot be used if you press the SHIFT key as SHIFT+E is another keybind then E!\n\nYou need to hold the SHIFT key until the improvement of the item starts! So you need to hold it while clicking on the improve button, and if the dialog asking you 'Are sure to improve the item?' is used you also need to hold the SHIFT key if you press the dialog's  'Accept' button!",
      getFunc: () => settings.improvementBlockQualityExceptionShiftKey === true,
      setFunc: (value) => {
        settings.improvementBlockQualityExceptionShiftKey = value
      },
      default: defaults.improvementBlockQualityExceptionShiftKey === true,
      disabled: () => settings.improvementBlockQuality === -1,
      width: "half",
    },
    {
      type: "checkbox",
      name: "Change sound volume",
      tooltip:
        "Change the sound volume of the game as you start the interaction with a crafting station.\nThe volume will be reset to the value before again as you leave the crafting station.",
      getFunc: () => settings.changeSoundAtCrafting === true,
      setFunc: (value) => {
        settings.changeSoundAtCrafting = value
        soundLowerAtCraftingCheck()
      },
      default: defaults.changeSoundAtCrafting === true,
      width: "full",
    },
    {
      type: "slider",
      name: "Crafting sound volume",
      tooltip: "Set the general game volume to this volume level during your craft activities.",
      min: 0,
      max: 100,
      decimals: 0,
      autoSelect: true,
      getFunc: () => settings.changeSoundAtCraftingVolume,
      setFunc: (volumeLevel) => {
        settings.changeSoundAtCraftingVolume = volumeLevel
      },
      default: defaults.changeSoundAtCraftingVolume,
      width: "full",
      disabled: () => settings.changeSoundAtCrafting !== true,
    },
  ]
}
