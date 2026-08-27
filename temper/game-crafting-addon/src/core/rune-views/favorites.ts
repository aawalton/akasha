import { state } from "../../state"
import * as RecipeCooking from "../recipe-cooking"
import * as RuneCrafting from "../rune-crafting"
import { asCsCookButton } from "./furniture-recipes"

export function RuneShowFavorites(): undefined {
  const TT = state.Loc.TT
  let count = 1
  const favorites: Record<string, Record<number, number> | undefined> =
    state.Character.favorites[CRAFTING_TYPE_ENCHANTING] ?? {}
  for (const [, glyph] of pairs(favorites)) {
    if (table.maxn(glyph) === 5) {
      RuneCrafting.RuneShow(
        count,
        glyph[1] ?? 0,
        glyph[3] ?? 0,
        glyph[2] ?? 0,
        glyph[4] ?? 0,
        glyph[5] ?? 0
      )
      count = count + 1
    }
  }
  TemperCrafting_RuneGlyphSectionScrollChild.SetHeight(count * 24 + 20)
  TemperCrafting_RuneInfo.SetText(TT[10])
}

export function RuneShowFurnitureFavorites(): undefined {
  const TT = state.Loc.TT
  TemperCrafting_RuneInfo.SetText(`${TT[23]} ${TT[10]}`)
  let inc = 1
  let count = 0
  const favorites: Record<string, Record<number, number> | undefined> =
    state.Character.favorites[CRAFTING_TYPE_ENCHANTING] ?? {}
  for (const [, val] of pairs(favorites)) {
    const [, , , , , ingredientType, tradeType] = GetRecipeInfo(val[1] ?? 0, val[2] ?? 0)
    if (
      ingredientType === PROVISIONER_SPECIAL_INGREDIENT_TYPE_FURNISHING &&
      tradeType === RECIPE_CRAFTING_SYSTEM_ENCHANTING_SCHEMATICS
    ) {
      const control = RuneCrafting.GetRuneChild(inc)
      inc = RecipeCooking.CookShowRecipe(
        asCsCookButton(control),
        val[1] ?? 0,
        val[2] ?? 0,
        inc,
        undefined,
        true
      )
      count = count + 1
    }
    if (inc > TemperCrafting_RuneGlyphSectionScrollChild.GetNumChildren()) {
      break
    }
  }
  TemperCrafting_RuneGlyphSectionScrollChild.SetHeight(inc * 30 + 20)
}
