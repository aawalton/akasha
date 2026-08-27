import type { RuneGlyphDef } from "../../data/rune"
import { state } from "../../state"
import * as RecipeCooking from "../recipe-cooking"
import * as RuneCrafting from "../rune-crafting"
import { asCsCookButton } from "./furniture-recipes"

export function RuneSearch(): undefined {
  const search = TemperCrafting_RuneSearch.GetText()
  let countRune = 0
  let countFurniture = 0
  let inc = 1
  if (search === "") {
    return
  }

  const numLists = GetNumRecipeLists()
  for (let cat = 17; cat <= numLists; cat++) {
    const [, num, , , , , sound] = GetRecipeListInfo(cat)
    for (let id = num; id >= 1; id--) {
      const [known, name, , , , , crafttype] = GetRecipeInfo(cat, id)
      if (crafttype === RECIPE_CRAFTING_SYSTEM_ENCHANTING_SCHEMATICS) {
        const [foundPos] = string.find(string.lower(name), string.lower(search))
        if (foundPos !== undefined && known) {
          const control = RuneCrafting.GetRuneChild(inc)
          inc = RecipeCooking.CookShowRecipe(asCsCookButton(control), cat, id, inc, sound, true)
          countFurniture = countFurniture + 1
        }
      }
    }
  }
  for (const [, enchant] of pairs(state.Rune.glyph)) {
    for (const [, glyph] of ipairs<RuneGlyphDef>(enchant)) {
      const basename = zo_strformat(
        "<<C:1>>",
        GetItemLinkName(
          string.format("|H1:item:%u:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h", glyph[1])
        )
      )
      const [foundPos] = string.find(string.lower(basename), string.lower(search))
      if (foundPos !== undefined) {
        RuneCrafting.RuneShow(
          inc + countRune,
          glyph[1],
          state.Character.aspect,
          state.Character.potency,
          glyph[2],
          glyph[3]
        )
        countRune = countRune + 1
      }
    }
  }
  TemperCrafting_RuneGlyphSectionScrollChild.SetHeight(countRune * 24 + countFurniture * 30 + 20)
  TemperCrafting_RuneInfo.SetText(`${state.Loc.searchfor} ${search}`)
}
