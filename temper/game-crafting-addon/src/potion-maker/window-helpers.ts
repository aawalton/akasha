import { asLabelControl } from "./casts"
import { getPlayerSettings } from "./saved-variables"
import { PotMaker } from "./state"
import { IsThirdAlchemySlotUnlocked } from "./tooltip-helpers"

export function SaveSolventSelection(this: void): undefined {
  const selected = PotMaker.SelectedSolvents[PotMaker.solventMode]
  if (selected === undefined) {
    return
  }
  for (const checkBox of PotMaker.SolventFilterControls) {
    selected.set(checkBox, !checkBox.IsControlHidden() && PotMaker.ToggleButtonIsChecked(checkBox))
  }
}

export function LoadSolventSelection(this: void): undefined {
  const selected = PotMaker.SelectedSolvents[PotMaker.solventMode]
  if (selected === undefined) {
    return
  }
  for (const checkBox of PotMaker.SolventFilterControls) {
    PotMaker.SetToggleButton(
      checkBox,
      !checkBox.IsControlHidden() && (selected.get(checkBox) ?? false)
    )
  }
}

export function UseTopLevelWindow(this: void): undefined {
  TemperPotionsOutput.title = PotMaker.modeBarLabel
  TemperPotions.title = PotMaker.modeBarLabel

  TemperPotions.ClearAnchors()
  TemperPotions.SetParent(TemperPotionsTopLevel)
  TemperPotions.SetAnchor(TOPLEFT, undefined, TOPLEFT, 0, 76)
  TemperPotions.SetHeight(550)
  TemperPotionsOutput.ClearAnchors()
  TemperPotionsOutput.SetParent(TemperPotionsTopLevel)
  TemperPotionsOutput.SetAnchor(TOPLEFT, undefined, TOPLEFT, 0, 25)

  TemperPotionsTopLevel.ClearAnchors()
  TemperPotionsTopLevel.SetAnchor(TOPLEFT, ZO_SharedRightPanelBackground, TOPLEFT, 0, 45 + 32)
  TemperPotionsTopLevel.SetAnchor(BOTTOMLEFT, ZO_SharedRightPanelBackground, BOTTOMLEFT, 0, -30)
  PotMaker.loading.SetParent(TemperPotionsTopLevel)
}

export function UseStationMenu(this: void, parent: Control): undefined {
  TemperPotionsOutput.title = asLabelControl(PotMaker.LAS)
  TemperPotions.title = asLabelControl(PotMaker.LAS)

  TemperPotions.ClearAnchors()
  TemperPotions.SetParent(parent)
  TemperPotions.SetAnchor(TOPLEFT, undefined, TOPLEFT, 0, 76)
  TemperPotions.SetHeight(550)
  TemperPotionsOutput.ClearAnchors()
  TemperPotionsOutput.SetParent(parent)
  TemperPotionsOutput.SetAnchor(TOPLEFT, undefined, TOPLEFT, 0, 25)
  TemperPotionsTopLevel.SetHidden(true)
  PotMaker.loading.SetParent(parent)
}

export function ShowStationOrTopLevel(this: void): undefined {
  const poison = PotMaker.solventMode === ITEMTYPE_POISON_BASE

  PotMaker.createControls()
  if (!IsInGamepadPreferredMode() && PotMaker.atAlchemyStation) {
    const contentWindow = poison ? PotMaker.contentWindowPoison : PotMaker.contentWindowPotion
    UseStationMenu(contentWindow)
  } else {
    UseTopLevelWindow()
  }
  if (!poison) {
    let isChecked = true
    for (const checkBox of PotMaker.NegativeTraitControls) {
      isChecked =
        isChecked &&
        PotMaker.GetToggleButtonCheckState(checkBox) === TRISTATE_CHECK_BUTTON_UNCHECKED
    }
    ZO_CheckButton_SetCheckState(TemperPotionsAllMustNotCheckBox, isChecked)
    TemperPotionsAllMustNotCheckBoxText.SetText(
      isChecked ? PotMaker.language.uncheck_all : PotMaker.language.check_all
    )
  }

  TemperPotionsQuestWrits.SetHidden(!PotMaker.atAlchemyStation)
  TemperPotionsAllMustNotCheckBox.SetHidden(poison)
  TemperPotionsAllMustNotCheckBoxText.SetHidden(poison)

  const disableThirdSlot = !(IsThirdAlchemySlotUnlocked() || getPlayerSettings().fakeThirdSlot)
  TemperPotionsOnly2.SetHidden(disableThirdSlot)
  TemperPotionsOnly2Text.SetHidden(disableThirdSlot)
}

export function ShowFilterPage(this: void): undefined {
  const descriptor = PotMaker.LAS.GetSelectedTab()
  if (descriptor === PotMaker.descriptorPotion) {
    TemperPotions.title.SetText(GetString(SI_BINDING_NAME_POTIONMAKER))
  } else if (descriptor === PotMaker.descriptorPoison) {
    TemperPotions.title.SetText(GetString(SI_BINDING_NAME_POISONMAKER))
  }
  TemperPotions.SetHidden(false)
  TemperPotionsOutput.SetHidden(true)
  PotMaker.resultListShown = false
  PotMaker.StopJobs()
}

export function ClearResultList(this: void): undefined {
  ZO_ClearNumericallyIndexedTable(PotMaker.doablePotions)
  collectgarbage()
}

export function ClearInventory(this: void): undefined {
  PotMaker.StopJobs()
  PotMaker.Inventory.reagents = {}
  PotMaker.Inventory.solvents = {}
  for (const v of PotMaker.SolventFilterControls) {
    v.SetHidden(true)
  }
  for (const v of PotMaker.ResultControls) {
    v.SetHidden(true)
  }
  PotMaker.quests = undefined
}

export function RefreshTitle(this: void): undefined {
  if (PotMaker.resultListShown) {
    if (PotMaker.favoritesOnly) {
      TemperPotionsOutput.title.SetText(PotMaker.language.favorites)
    } else {
      TemperPotionsOutput.title.SetText(PotMaker.language.search_results)
    }
  } else {
    const descriptor = ZO_MenuBar_GetSelectedDescriptor(PotMaker.modeBar)
    if (descriptor === PotMaker.descriptorPotion) {
      TemperPotions.title.SetText(GetString(SI_BINDING_NAME_POTIONMAKER))
    } else if (descriptor === PotMaker.descriptorPoison) {
      TemperPotions.title.SetText(GetString(SI_BINDING_NAME_POISONMAKER))
    }
  }
}

export function RefreshCurrentPage(this: void): undefined {
  if (PotMaker.resultListShown) {
    PotMaker.restartSearch()
  } else {
    ClearResultList()
    PotMaker.updateControls()
  }
}
