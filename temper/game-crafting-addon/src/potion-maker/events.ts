import { asLabelControl } from "./casts"
import { COLOR_SELECT } from "./constants"
import { UpdateKeyStrip } from "./keybind-helpers"
import { getAccountSettings, getPlayerSettings } from "./saved-variables"
import { PotMaker } from "./state"
import { ClearTooltips, ShowAnnoucement } from "./tooltip-helpers"
import {
  ClearInventory,
  ClearResultList,
  ShowFilterPage,
  ShowStationOrTopLevel,
} from "./window-helpers"

interface AlchemyStationInventory {
  dirty: boolean
  control?: Control
  HandleDirtyEvent: (this: AlchemyStationInventory) => void
}
interface AlchemyStation {
  inventory: AlchemyStationInventory
  UpdateTooltip: (this: AlchemyStation) => void
}
function asAlchemyStation(value: unknown): AlchemyStation {
  return value as AlchemyStation
}

interface CheckButtonWithTraits {
  traitControls: Control[]
}
function asCheckButtonWithTraits(value: unknown): CheckButtonWithTraits {
  return value as CheckButtonWithTraits
}

type RefreshTraitsFn = (this: void) => boolean
function asRefreshTraitsFn(value: unknown): RefreshTraitsFn {
  return value as RefreshTraitsFn
}

function Init(this: void): undefined {
  if (!PotMaker.initialized) {
    PotMaker.initialized = true
    PotMaker.initWindows()
    PotMaker.initFavorites()
    PotMaker.initTraitLearned()
    PotMaker.InitializeKeybindStripDescriptors()
  }
}
PotMaker.Init = Init

let skillXPs = 0
const skillUpdateIdentifier = "POTIONMAKER_UPDATESKILL"

function UpdateSkill(
  this: void,
  _eventCode: number,
  skillType: number,
  skillIndex: number,
  reason: number,
  _rank: number,
  previousXP: number,
  currentXP: number
): undefined {
  if (reason === PROGRESS_REASON_TRADESKILL || reason === PROGRESS_REASON_TRADESKILL_TRAIT) {
    skillXPs = skillXPs + currentXP - previousXP
    const Update = (): undefined => {
      EVENT_MANAGER.UnregisterForUpdate(skillUpdateIdentifier)
      PotMaker.OnSkillXP(skillType, skillIndex, 0, skillXPs)
      skillXPs = 0
    }
    EVENT_MANAGER.UnregisterForUpdate(skillUpdateIdentifier)
    EVENT_MANAGER.RegisterForUpdate(skillUpdateIdentifier, 5000, Update)
  }
}

function interactWithAlchemyStation(this: void, _eventCode: number, craftSkill: number): undefined {
  if (craftSkill !== CRAFTING_TYPE_ALCHEMY) {
    return
  }

  PotMaker.Init()

  if (getAccountSettings().XPMode) {
    EVENT_MANAGER.RegisterForEvent(PotMaker.name, EVENT_SKILL_XP_UPDATE, UpdateSkill)
  }

  PotMaker.atAlchemyStation = true

  if (CRAFTING_RESULTS.craftingProcessCompleted === false) {
    CRAFTING_RESULTS.craftingProcessCompleted = true
  }

  ShowStationOrTopLevel()
  ShowFilterPage()
  PotMaker.addStuffToInventory()
  PotMaker.updateControls()

  if (!PotMaker.atAlchemyStation || getAccountSettings().showAsDefault) {
    if (PotMaker.atAlchemyStation) {
      PotMaker.LAS.SelectTab(getPlayerSettings().lastUsedTab ?? PotMaker.descriptorPotion)
    }
  }

  const selected = PotMaker.LAS.GetSelectedTab()
  TemperPotions.SetHidden(
    selected !== PotMaker.descriptorPotion &&
      selected !== PotMaker.descriptorPoison &&
      !IsInGamepadPreferredMode()
  )

  EVENT_MANAGER.RegisterForEvent(PotMaker.name, EVENT_CRAFT_COMPLETED, PotMaker.craftCompleted)
  EVENT_MANAGER.RegisterForEvent(
    PotMaker.name,
    EVENT_END_CRAFTING_STATION_INTERACT,
    PotMaker.endInteractionWithAlchemyStation
  )

  UpdateKeyStrip(selected)
}
PotMaker.interactWithAlchemyStation = interactWithAlchemyStation

function endInteractionWithAlchemyStation(this: void, _eventCode: number): undefined {
  ShowFilterPage()
  ClearResultList()
  ClearInventory()
  ClearTooltips()

  getPlayerSettings().lastUsedTab = IsInGamepadPreferredMode()
    ? ZO_MenuBar_GetSelectedDescriptor(PotMaker.modeBar)
    : PotMaker.LAS.GetSelectedTab()

  PotMaker.atAlchemyStation = false
  EVENT_MANAGER.UnregisterForEvent(PotMaker.name, EVENT_CRAFT_COMPLETED)
  EVENT_MANAGER.UnregisterForEvent(PotMaker.name, EVENT_SKILL_XP_UPDATE)
  EVENT_MANAGER.UnregisterForEvent(PotMaker.name, EVENT_END_CRAFTING_STATION_INTERACT)

  UpdateKeyStrip(undefined)
}
PotMaker.endInteractionWithAlchemyStation = endInteractionWithAlchemyStation

function craftCompleted(this: void, _craftSkill: number): undefined {
  const identifier = "CRAFT_COMPLETED_REFRESH_RESULTLIST"
  const refreshResultList = (): undefined => {
    EVENT_MANAGER.UnregisterForUpdate(identifier)
    if (PotMaker.atAlchemyStation) {
      const station = asAlchemyStation(IsInGamepadPreferredMode() ? GAMEPAD_ALCHEMY : ALCHEMY)
      const inv = station.inventory
      if (inv.dirty && inv.control !== undefined) {
        inv.HandleDirtyEvent()
      }
      station.UpdateTooltip()
      PotMaker.updateInventory()
      const refreshTraits = asRefreshTraitsFn(PotMaker.refreshTraits)
      if (refreshTraits()) {
        PotMaker.restartSearch()
      }
    }
  }
  EVENT_MANAGER.UnregisterForUpdate(identifier)
  EVENT_MANAGER.RegisterForUpdate(identifier, 200, refreshResultList)
}
PotMaker.craftCompleted = craftCompleted

function slotUpdated(this: void, _eventCode: number, bagId: number, slotIndex: number): undefined {
  const [craftingType] = GetItemCraftingInfo(bagId, slotIndex)
  if (craftingType === CRAFTING_TYPE_ALCHEMY) {
    PotMaker.updateInventory()
    if (PotMaker.resultListShown) {
      PotMaker.restartSearch()
    }
  }
}
PotMaker.slotUpdated = slotUpdated

function updateInventory(this: void): undefined {
  for (const key in PotMaker.Inventory.reagents) {
    const reagent = PotMaker.Inventory.reagents[key]
    if (reagent !== undefined) {
      reagent.ResetStack(reagent)
    }
  }
  for (const key in PotMaker.Inventory.solvents) {
    const solvent = PotMaker.Inventory.solvents[key]
    if (solvent !== undefined) {
      solvent.ResetStack(solvent)
    }
  }
  PotMaker.updateStuffofInventory()
  PotMaker.updateControls()
}
PotMaker.updateInventory = updateInventory

function OnSkillXP(
  this: void,
  skillType: number,
  skillIndex: number,
  previousXP: number,
  currentXP: number
): undefined {
  const [name] = GetSkillLineInfo(skillType, skillIndex)
  const gainXP = currentXP - previousXP

  const text = `${PotMaker.language.skill} ${COLOR_SELECT.Colorize(
    zo_strformat(SI_TOOLTIP_ITEM_NAME, name)
  )} = ${COLOR_SELECT.Colorize(`+${gainXP}xp`)}`
  ShowAnnoucement(text)
}
PotMaker.OnSkillXP = OnSkillXP

function checkAll(this: void, checkButton: Control, isChecked: boolean): undefined {
  const labelControl = asLabelControl(checkButton.GetNamedChild("Text"))
  labelControl.SetText(isChecked ? PotMaker.language.uncheck_all : PotMaker.language.check_all)
  const checkButtonView = asCheckButtonWithTraits(checkButton)
  for (const checkBox of checkButtonView.traitControls) {
    PotMaker.SetToggleButton(
      checkBox,
      isChecked ? TRISTATE_CHECK_BUTTON_UNCHECKED : TRISTATE_CHECK_BUTTON_INDETERMINATE
    )
  }
}
PotMaker.checkAll = checkAll

function checkButtonClicked(this: void, checkButton: Control, isChecked: boolean): undefined {
  const label = checkButton.GetNamedChild<LabelControl>("Text")
  if (label === undefined) {
    return
  }
  if (isChecked) {
    const [r, g, b] = COLOR_SELECT.UnpackRGB()
    label.SetColor(r, g, b)
  } else {
    const [r, g, b] = GetInterfaceColor(
      INTERFACE_COLOR_TYPE_TEXT_COLORS,
      INTERFACE_TEXT_COLOR_NORMAL
    )
    label.SetColor(r, g, b)
  }
}
PotMaker.checkButtonClicked = checkButtonClicked
