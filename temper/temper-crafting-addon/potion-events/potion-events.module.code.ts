import { asLabelControl } from "../potion-casts/potion-casts.module.code.ts"
import { COLOR_SELECT } from "../potion-constants/potion-constants.module.code.ts"
import { updateKeyStrip } from "../potion-keybind-helpers/potion-keybind-helpers.module.code.ts"
import {
  getAccountSettings,
  getPlayerSettings,
} from "../potion-saved-variables/potion-saved-variables.module.code.ts"
import { PotMaker } from "../potion-state/potion-state.module.code.ts"
import {
  clearTooltips,
  showAnnoucement,
} from "../potion-tooltip-helpers/potion-tooltip-helpers.module.code.ts"
import {
  clearInventory,
  clearResultList,
  showFilterPage,
  showStationOrTopLevel,
} from "../potion-window-helpers/potion-window-helpers.module.code.ts"

interface AlchemyStationInventory {
  dirty: boolean
  control?: Control
  HandleDirtyEvent: (this: AlchemyStationInventory) => undefined
}
interface AlchemyStation {
  inventory: AlchemyStationInventory
  UpdateTooltip: (this: AlchemyStation) => undefined
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

function init(this: void): undefined {
  if (!PotMaker.initialized) {
    PotMaker.initialized = true
    PotMaker.initWindows()
    PotMaker.initFavorites()
    PotMaker.initTraitLearned()
    PotMaker.InitializeKeybindStripDescriptors()
  }
}
PotMaker.Init = init

let SKILL_X_PS = 0
const SKILL_UPDATE_IDENTIFIER = "POTIONMAKER_UPDATESKILL"

function updateSkill(
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
    SKILL_X_PS = SKILL_X_PS + currentXP - previousXP
    const update = (): undefined => {
      EVENT_MANAGER.UnregisterForUpdate(SKILL_UPDATE_IDENTIFIER)
      PotMaker.OnSkillXP(skillType, skillIndex, 0, SKILL_X_PS)
      SKILL_X_PS = 0
    }
    EVENT_MANAGER.UnregisterForUpdate(SKILL_UPDATE_IDENTIFIER)
    EVENT_MANAGER.RegisterForUpdate(SKILL_UPDATE_IDENTIFIER, 5000, update)
  }
}

function interactWithAlchemyStation(this: void, _eventCode: number, craftSkill: number): undefined {
  if (craftSkill !== CRAFTING_TYPE_ALCHEMY) {
    return
  }

  PotMaker.Init()

  if (getAccountSettings().XPMode) {
    EVENT_MANAGER.RegisterForEvent(PotMaker.name, EVENT_SKILL_XP_UPDATE, updateSkill)
  }

  PotMaker.atAlchemyStation = true

  if (CRAFTING_RESULTS.craftingProcessCompleted === false) {
    CRAFTING_RESULTS.craftingProcessCompleted = true
  }

  showStationOrTopLevel()
  showFilterPage()
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

  updateKeyStrip(tostring(selected))
}
PotMaker.interactWithAlchemyStation = interactWithAlchemyStation

function endInteractionWithAlchemyStation(this: void, _eventCode: number): undefined {
  showFilterPage()
  clearResultList()
  clearInventory()
  clearTooltips()

  getPlayerSettings().lastUsedTab = (
    IsInGamepadPreferredMode()
      ? ZO_MenuBar_GetSelectedDescriptor(PotMaker.modeBar)
      : PotMaker.LAS.GetSelectedTab()
  ) as string

  PotMaker.atAlchemyStation = false
  EVENT_MANAGER.UnregisterForEvent(PotMaker.name, EVENT_CRAFT_COMPLETED)
  EVENT_MANAGER.UnregisterForEvent(PotMaker.name, EVENT_SKILL_XP_UPDATE)
  EVENT_MANAGER.UnregisterForEvent(PotMaker.name, EVENT_END_CRAFTING_STATION_INTERACT)

  updateKeyStrip(undefined)
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

function onSkillXP(
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
  showAnnoucement(text)
}
PotMaker.OnSkillXP = onSkillXP

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
