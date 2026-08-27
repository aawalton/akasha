import { CB_CONTROL_SHOW } from "../../constants"
import { HideControl } from "../../helpers"
import { state } from "../../state"
import type { RgbColor } from "../rune-crafting"

export function RuneView(mode: number): undefined {
  const Close = () => {
    TemperCrafting_Rune.SetHidden(true)
    TemperCrafting_RuneCloseButton.SetHidden(true)
    TemperCrafting_RuneSpaceButton.SetHidden(false)
    TemperCrafting_RuneCreateButton.SetHidden(false)
    TemperCrafting_RuneRefineButton.SetHidden(false)
    TemperCrafting_RuneFurnitureButton.SetHidden(false)
    TemperCrafting_RuneHeader.SetWidth(308)
    TemperCrafting_RuneSearch.SetWidth(150)
    TemperCrafting_RuneSearchBG.SetWidth(160)
    TemperCrafting_RuneInfo.SetHidden(false)
    TemperCrafting_RuneAmount.SetHidden(false)
    TemperCrafting_RuneAmountLabel.SetHidden(false)
    state.Extern = false
    const numChildren = TemperCrafting_RuneGlyphSectionScrollChild.GetNumChildren()
    for (let x = 1; x <= numChildren; x++) {
      HideControl(`TemperCrafting_RuneGlyphSectionScrollChildButton${x}`)
    }
  }

  if (ZO_EnchantingTopLevel.IsHidden()) {
    if (mode === 1 && TemperCrafting_Rune.IsHidden()) {
      CALLBACK_MANAGER.FireCallbacks(CB_CONTROL_SHOW, TemperCrafting_Rune)
      TemperCrafting_RuneCloseButton.SetHidden(false)
      TemperCrafting_RuneSpaceButton.SetHidden(true)
      TemperCrafting_RuneCreateButton.SetHidden(true)
      TemperCrafting_RuneRefineButton.SetHidden(true)
      TemperCrafting_RuneFurnitureButton.SetHidden(true)
      TemperCrafting_RuneHeader.SetWidth(532)
      TemperCrafting_RuneSearch.SetWidth(290)
      TemperCrafting_RuneSearchBG.SetWidth(300)
      TemperCrafting_RuneInfo.SetHidden(true)
      TemperCrafting_RuneAmount.SetHidden(true)
      TemperCrafting_RuneAmountLabel.SetHidden(true)
      state.Extern = true
      state.Character.runemode = "craft"
      RuneInitialize()
    } else {
      Close()
    }
  }
}

export function RuneHideVanillaUI(toggle: boolean): undefined {
  ZO_EnchantingTopLevelModeMenu.SetHidden(toggle)
  if (toggle) {
    ZO_EnchantingTopLevelInventory.SetHidden(toggle)
    ZO_EnchantingTopLevelModeMenu.SetHidden(toggle)
    ZO_EnchantingTopLevelTooltip.SetHidden(toggle)
    ZO_EnchantingTopLevelRuneSlotContainer.SetHidden(toggle)
    ZO_EnchantingTopLevelExtractionSlotContainer.SetHidden(toggle)
    ZO_ProvisionerTopLevel.SetHidden(toggle)
    ZO_ProvisionerTopLevelTooltip.SetHidden(toggle)
  }
  if (!IsInGamepadPreferredMode()) {
    ZO_KeybindStripControl.SetHidden(toggle)
  }
}

export function RuneInitialize(toggle?: boolean): undefined {
  if (toggle === true || state.Extern) {
    state.Rune.aspectSkill = GetNonCombatBonus(NON_COMBAT_BONUS_ENCHANTING_RARITY_LEVEL)
    state.Rune.potencySkill = GetNonCombatBonus(NON_COMBAT_BONUS_ENCHANTING_LEVEL)
    const color: RgbColor = state.Quality[state.Character.aspect] ?? { 1: 0, 2: 0, 3: 0 }
    TemperCrafting_RuneLevelButton.SetNormalFontColor(color[1], color[2], color[3], 1)
    TemperCrafting_RuneAmount.SetText("")
    TemperCrafting_RuneSearch.SetText(`${GetString(SI_GAMEPAD_HELP_SEARCH)}...`)
    TemperCrafting_Rune.SetHidden(false)
  } else {
    TemperCrafting_Rune.SetHidden(true)
  }
}
