import type { RgbColor } from "../craft-rune-crafting/craft-rune-crafting.module.code.ts"
import { CB_CONTROL_SHOW } from "../crafting-constants/crafting-constants.module.code.ts"
import { hideControl } from "../crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

export function runeView(mode: number): undefined {
  const close = () => {
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
    STATE.Extern = false
    const numChildren = TemperCrafting_RuneGlyphSectionScrollChild.GetNumChildren()
    for (let x = 1; x <= numChildren; x++) {
      hideControl(`TemperCrafting_RuneGlyphSectionScrollChildButton${x}`)
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
      STATE.Extern = true
      STATE.Character.runemode = "craft"
      runeInitialize()
    } else {
      close()
    }
  }
}

export function runeHideVanillaUI(toggle: boolean): undefined {
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

export function runeInitialize(toggle?: boolean): undefined {
  if (toggle === true || STATE.Extern) {
    STATE.Rune.aspectSkill = GetNonCombatBonus(NON_COMBAT_BONUS_ENCHANTING_RARITY_LEVEL)
    STATE.Rune.potencySkill = GetNonCombatBonus(NON_COMBAT_BONUS_ENCHANTING_LEVEL)
    const color: RgbColor = STATE.Quality[STATE.Character.aspect] ?? { 1: 0, 2: 0, 3: 0 }
    TemperCrafting_RuneLevelButton.SetNormalFontColor(color[1], color[2], color[3], 1)
    TemperCrafting_RuneAmount.SetText("")
    TemperCrafting_RuneSearch.SetText(`${GetString(SI_GAMEPAD_HELP_SEARCH)}...`)
    TemperCrafting_Rune.SetHidden(false)
  } else {
    TemperCrafting_Rune.SetHidden(true)
  }
}
