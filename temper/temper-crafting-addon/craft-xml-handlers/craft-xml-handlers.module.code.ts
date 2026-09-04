import { blueprintShowCategory } from "../craft-blueprint-furnisher/craft-blueprint-furnisher.module.code.ts"
import { drawCharacters } from "../craft-character-panel/craft-character-panel.module.code.ts"
import { recipeShowCategory } from "../craft-recipe-cooking/craft-recipe-cooking.module.code.ts"
import { runeSetValue } from "../craft-rune-crafting/craft-rune-crafting.module.code.ts"
import { controlShow } from "../craft-ui-updates/craft-ui-updates.module.code.ts"
import { TEMPER_CRAFTING_API } from "../crafting-public-api/crafting-public-api.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"
import { runeShowMode } from "../rune-mode/rune-mode.module.code.ts"

export type CoordKey = "style" | "recipe" | "blueprint" | "rune" | "cook" | "overview"
export type AnchorKey = "button" | "questbox" | "position"

export function saveCoords(control: Control, which: CoordKey): undefined {
  STATE.Account.coords[which] = { 1: control.GetLeft(), 2: control.GetTop() }
}

export function saveAnchor(control: Control, which: AnchorKey): undefined {
  STATE.Account[which] = { 1: control.GetLeft(), 2: control.GetTop() }
}

export function runeMode(key: number): undefined {
  runeSetValue(key)
  runeShowMode()
}

export function runeAspect(tier: number): undefined {
  runeSetValue(2, tier)
  runeShowMode()
}

export function runeCraftGlyph(itemType: number): undefined {
  runeSetValue(1, itemType)
  runeSetValue(6)
  runeShowMode()
}

export function openRecipeWindow(): undefined {
  controlShow(TemperCrafting_Recipe_Window)
  recipeShowCategory(STATE.Character.recipe)
}

export function openBlueprintWindow(): undefined {
  controlShow(TemperCrafting_Blueprint_Window)
  blueprintShowCategory(STATE.Character.furniture)
}

export function openCharacterPanel(): undefined {
  drawCharacters()
  controlShow(TemperCrafting_CharacterPanel)
}

export function setTitleText(control: LabelControl): undefined {
  control.SetText(`|cFFAA33${STATE.Title}|r ${STATE.Version}`)
}

export function openSettings(): undefined {
  LibAddonMenu2.OpenToPanel(TEMPER_CRAFTING_API.LAM)
}
