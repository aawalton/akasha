import { state } from "../state"
import { BlueprintShowCategory } from "./blueprint-furnisher"
import { DrawCharacters } from "./character-panel"
import { RecipeShowCategory } from "./recipe-cooking"
import { RuneSetValue } from "./rune-crafting"
import { RuneShowMode } from "./rune-views/mode"
import { ControlShow } from "./ui-updates"

export type CoordKey = "style" | "recipe" | "blueprint" | "rune" | "cook" | "overview"
export type AnchorKey = "button" | "questbox" | "position"

export function SaveCoords(control: Control, which: CoordKey): undefined {
  state.Account.coords[which] = { 1: control.GetLeft(), 2: control.GetTop() }
}

export function SaveAnchor(control: Control, which: AnchorKey): undefined {
  state.Account[which] = { 1: control.GetLeft(), 2: control.GetTop() }
}

export function RuneMode(key: number): undefined {
  RuneSetValue(key)
  RuneShowMode()
}

export function RuneAspect(tier: number): undefined {
  RuneSetValue(2, tier)
  RuneShowMode()
}

export function RuneCraftGlyph(itemType: number): undefined {
  RuneSetValue(1, itemType)
  RuneSetValue(6)
  RuneShowMode()
}

export function OpenRecipeWindow(): undefined {
  ControlShow(TemperCrafting_Recipe_Window)
  RecipeShowCategory(state.Character.recipe)
}

export function OpenBlueprintWindow(): undefined {
  ControlShow(TemperCrafting_Blueprint_Window)
  BlueprintShowCategory(state.Character.furniture)
}

export function OpenCharacterPanel(): undefined {
  DrawCharacters()
  ControlShow(TemperCrafting_CharacterPanel)
}

export function SetTitleText(control: LabelControl): undefined {
  control.SetText(`|cFFAA33${state.Title}|r ${state.Version}`)
}

export function OpenSettings(): undefined {
  LibAddonMenu2.OpenToPanel(globalThis.TemperCrafting.LAM)
}
