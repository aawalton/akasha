import * as RecipeCooking from "../craft-cooking/craft-cooking.module.code.ts"
import * as RuneCrafting from "../craft-rune-crafting/craft-rune-crafting.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"
import { asCsCookButton } from "../rune-furniture-recipes/rune-furniture-recipes.module.code.ts"

export function runeShowFavorites(): undefined {
  const tt = STATE.Loc.TT
  let count = 1
  const favorites: Record<string, Record<number, number> | undefined> =
    STATE.Character.favorites[CRAFTING_TYPE_ENCHANTING] ?? {}
  for (const [, glyph] of pairs(favorites)) {
    if (table.maxn(glyph) === 5) {
      RuneCrafting.runeShow(
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
  TemperCrafting_RuneInfo.SetText(tt[10])
}

export function runeShowFurnitureFavorites(): undefined {
  const tt = STATE.Loc.TT
  TemperCrafting_RuneInfo.SetText(`${tt[23]} ${tt[10]}`)
  let inc = 1
  let count = 0
  const favorites: Record<string, Record<number, number> | undefined> =
    STATE.Character.favorites[CRAFTING_TYPE_ENCHANTING] ?? {}
  for (const [, val] of pairs(favorites)) {
    const [, , , , , ingredientType, tradeType] = GetRecipeInfo(val[1] ?? 0, val[2] ?? 0)
    if (
      ingredientType === PROVISIONER_SPECIAL_INGREDIENT_TYPE_FURNISHING &&
      tradeType === RECIPE_CRAFTING_SYSTEM_ENCHANTING_SCHEMATICS
    ) {
      const control = RuneCrafting.getRuneChild(inc)
      inc = RecipeCooking.cookShowRecipe(
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
