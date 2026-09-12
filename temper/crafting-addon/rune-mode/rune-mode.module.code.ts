import { hideControl } from "akasha/temper/crafting-addon/crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "akasha/temper/crafting-addon/crafting-state/crafting-state.module.code.ts"
import * as RuneSelection from "akasha/temper/crafting-addon/modules/craft-rune-selection/craft-rune-selection.module.code.ts"
import {
  runeShowFavorites,
  runeShowFurnitureFavorites,
} from "akasha/temper/crafting-addon/rune-favorites/rune-favorites.module.code.ts"
import { runeShowFurniture } from "akasha/temper/crafting-addon/rune-furniture-recipes/rune-furniture-recipes.module.code.ts"
import { runeShowCategory } from "akasha/temper/crafting-addon/rune-glyph-creation/rune-glyph-creation.module.code.ts"
import { runeShowRefine } from "akasha/temper/crafting-addon/rune-glyph-refining/rune-glyph-refining.module.code.ts"
import { runeSearch } from "akasha/temper/crafting-addon/rune-search/rune-search.module.code.ts"
import { runeShowWrit } from "akasha/temper/crafting-addon/rune-writs/rune-writs.module.code.ts"

export function runeShowMode(atStationOnly?: boolean): undefined {
  if (atStationOnly === undefined) {
    atStationOnly = false
  }
  if ((atStationOnly && !STATE.Extern) || !atStationOnly) {
    TemperCrafting_RuneGlyphDivider.SetHidden(true)
    TemperCrafting_RuneGlyphSectionScrollChildRefine.SetHidden(true)
    TemperCrafting_RuneGlyphSectionScrollChildSelection.SetHidden(true)
    TemperCrafting_RuneRefineAllButton.SetHidden(true)
    const numChildren = TemperCrafting_RuneGlyphSectionScrollChild.GetNumChildren()
    for (let x = 1; x <= numChildren; x++) {
      hideControl(`TemperCrafting_RuneGlyphSectionScrollChildButton${x}`)
    }
    if (STATE.Character.runemode === "craft") {
      ENCHANTING.enchantingMode = ENCHANTING_MODE_CREATION
      runeShowCategory()
    } else if (STATE.Character.runemode === "search") {
      runeSearch()
    } else if (STATE.Character.runemode === "refine") {
      ENCHANTING.enchantingMode = ENCHANTING_MODE_EXTRACTION
      runeShowRefine()
    } else if (STATE.Character.runemode === "selection") {
      RuneSelection.runeShowSelection()
    } else if (STATE.Character.runemode === "favorites") {
      runeShowFavorites()
    } else if (STATE.Character.runemode === "furniturefavorites") {
      runeShowFurnitureFavorites()
    } else if (STATE.Character.runemode === "writ") {
      runeShowWrit()
    } else if (STATE.Character.runemode === "furniture") {
      ENCHANTING.enchantingMode = ENCHANTING_MODE_RECIPES
      runeShowFurniture()
    }
  }
}
