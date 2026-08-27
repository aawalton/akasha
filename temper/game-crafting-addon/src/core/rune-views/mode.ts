import { HideControl } from "../../helpers"
import { state } from "../../state"
import * as RuneSelection from "../rune-selection"
import { RuneShowFavorites, RuneShowFurnitureFavorites } from "./favorites"
import { RuneShowFurniture } from "./furniture-recipes"
import { RuneShowCategory } from "./glyph-creation"
import { RuneShowRefine } from "./glyph-refining"
import { RuneSearch } from "./search"
import { RuneShowWrit } from "./writs"

export function RuneShowMode(atStationOnly?: boolean): undefined {
  if (atStationOnly === undefined) {
    atStationOnly = false
  }
  if ((atStationOnly && !state.Extern) || !atStationOnly) {
    TemperCrafting_RuneGlyphDivider.SetHidden(true)
    TemperCrafting_RuneGlyphSectionScrollChildRefine.SetHidden(true)
    TemperCrafting_RuneGlyphSectionScrollChildSelection.SetHidden(true)
    TemperCrafting_RuneRefineAllButton.SetHidden(true)
    const numChildren = TemperCrafting_RuneGlyphSectionScrollChild.GetNumChildren()
    for (let x = 1; x <= numChildren; x++) {
      HideControl(`TemperCrafting_RuneGlyphSectionScrollChildButton${x}`)
    }
    if (state.Character.runemode === "craft") {
      ENCHANTING.enchantingMode = ENCHANTING_MODE_CREATION
      RuneShowCategory()
    } else if (state.Character.runemode === "search") {
      RuneSearch()
    } else if (state.Character.runemode === "refine") {
      ENCHANTING.enchantingMode = ENCHANTING_MODE_EXTRACTION
      RuneShowRefine()
    } else if (state.Character.runemode === "selection") {
      RuneSelection.RuneShowSelection()
    } else if (state.Character.runemode === "favorites") {
      RuneShowFavorites()
    } else if (state.Character.runemode === "furniturefavorites") {
      RuneShowFurnitureFavorites()
    } else if (state.Character.runemode === "writ") {
      RuneShowWrit()
    } else if (state.Character.runemode === "furniture") {
      ENCHANTING.enchantingMode = ENCHANTING_MODE_RECIPES
      RuneShowFurniture()
    }
  }
}
