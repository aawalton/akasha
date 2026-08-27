import { state } from "../../state"
import type { CsCookButton } from "../cooking"
import * as RecipeCooking from "../recipe-cooking"
import * as RuneCrafting from "../rune-crafting"
import { RuneHideVanillaUI, RuneInitialize } from "./panel"

export function asCsCookButton(c: Control): CsCookButton {
  return c as CsCookButton
}

export function RuneShowFurniture(): undefined {
  const TT = state.Loc.TT
  let useCSRune: boolean = state.Account.options.userune
  if (state.Account.options.userune && state.Account.options.userunerecipe) {
    TemperCrafting_RuneInfo.SetText(TT[23])
    let inc = 1
    let count = 0
    const numLists = GetNumRecipeLists()
    for (let cat = 17; cat <= numLists; cat++) {
      const [, num, , , , , sound] = GetRecipeListInfo(cat)
      for (let id = num; id >= 1; id--) {
        const [, , , , , , crafttype] = GetRecipeInfo(cat, id)
        if (crafttype === RECIPE_CRAFTING_SYSTEM_ENCHANTING_SCHEMATICS) {
          const control = RuneCrafting.GetRuneChild(inc)
          inc = RecipeCooking.CookShowRecipe(asCsCookButton(control), cat, id, inc, sound, true)
          count = count + 1
        }
      }
    }
    TemperCrafting_RuneGlyphSectionScrollChild.SetHeight(inc * 30 + 20)
  } else {
    useCSRune = false
    ZO_MenuBar_SelectDescriptor(ENCHANTING.modeBar, ENCHANTING_MODE_RECIPES)
    ZO_ProvisionerTopLevel.SetHidden(false)
    ZO_EnchantingTopLevelExtractionSlotContainer.SetHidden(true)
    ZO_EnchantingTopLevelRuneSlotContainer.SetHidden(true)
    ZO_EnchantingTopLevelInventoryTabs.SetHidden(true)
    ZO_EnchantingTopLevelInventory.SetHidden(true)
  }
  RuneHideVanillaUI(useCSRune)
  RuneInitialize(useCSRune)
}
