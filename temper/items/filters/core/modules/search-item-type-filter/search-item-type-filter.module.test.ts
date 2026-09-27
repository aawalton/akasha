import { expect, test } from "bun:test"
import { armor } from "akasha/temper/catalog/temper-item-type/pages/armor.temper-item-type.ts"
import { container } from "akasha/temper/catalog/temper-item-type/pages/container.temper-item-type.ts"
import { costume } from "akasha/temper/catalog/temper-item-type/pages/costume.temper-item-type.ts"
import { craftedAbilityScript } from "akasha/temper/catalog/temper-item-type/pages/crafted-ability-script.temper-item-type.ts"
import { drink } from "akasha/temper/catalog/temper-item-type/pages/drink.temper-item-type.ts"
import { food } from "akasha/temper/catalog/temper-item-type/pages/food.temper-item-type.ts"
import { glyphArmor } from "akasha/temper/catalog/temper-item-type/pages/glyph-armor.temper-item-type.ts"
import { glyphJewelry } from "akasha/temper/catalog/temper-item-type/pages/glyph-jewelry.temper-item-type.ts"
import { glyphWeapon } from "akasha/temper/catalog/temper-item-type/pages/glyph-weapon.temper-item-type.ts"
import { ingredient } from "akasha/temper/catalog/temper-item-type/pages/ingredient.temper-item-type.ts"
import { masterWrit } from "akasha/temper/catalog/temper-item-type/pages/master-writ.temper-item-type.ts"
import { poison } from "akasha/temper/catalog/temper-item-type/pages/poison.temper-item-type.ts"
import { potion } from "akasha/temper/catalog/temper-item-type/pages/potion.temper-item-type.ts"
import { racialStyleMotif } from "akasha/temper/catalog/temper-item-type/pages/racial-style-motif.temper-item-type.ts"
import { recipe } from "akasha/temper/catalog/temper-item-type/pages/recipe.temper-item-type.ts"
import { soulGem } from "akasha/temper/catalog/temper-item-type/pages/soul-gem.temper-item-type.ts"
import { tabard } from "akasha/temper/catalog/temper-item-type/pages/tabard.temper-item-type.ts"
import { trash } from "akasha/temper/catalog/temper-item-type/pages/trash.temper-item-type.ts"
import { treasure } from "akasha/temper/catalog/temper-item-type/pages/treasure.temper-item-type.ts"
import { weapon } from "akasha/temper/catalog/temper-item-type/pages/weapon.temper-item-type.ts"
import type { TemperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.types.ts"
import { numberedOptions } from "akasha/temper/items/filters/core/modules/search-page-options/search-page-options.module.code.ts"

const ITEM_TYPES: readonly TemperItemType[] = [
  armor,
  container,
  costume,
  craftedAbilityScript,
  drink,
  food,
  glyphArmor,
  glyphJewelry,
  glyphWeapon,
  ingredient,
  masterWrit,
  poison,
  potion,
  racialStyleMotif,
  recipe,
  soulGem,
  tabard,
  trash,
  treasure,
  weapon,
]

const OFFERED_BY_HAND = [
  "Weapon",
  "Armor",
  "Poison",
  "Food",
  "Soul Gem",
  "Costume",
  "Drink",
  "Container",
  "Treasure",
  "Glyph (Weapon)",
  "Glyph (Armor)",
  "Glyph (Jewelry)",
  "Recipe",
  "Racial Style Motif",
  "Trash",
  "Ingredient",
  "Potion",
  "Tabard",
  "Master Writ",
  "Crafted Ability Script",
]

test("the item type pages offer the twenty names the filter offered by hand", () => {
  const labels = numberedOptions(ITEM_TYPES, (row) => row.esoItemTypeNumber).map((o) => o.label)
  expect([...labels].sort()).toEqual([...OFFERED_BY_HAND].sort())
})

test("each item type is offered under the number its ITEMTYPE constant gives it", () => {
  expect(numberedOptions(ITEM_TYPES, (row) => row.esoItemTypeNumber)).toEqual([
    { value: "1", label: "Weapon" },
    { value: "2", label: "Armor" },
    { value: "4", label: "Food" },
    { value: "7", label: "Potion" },
    { value: "8", label: "Racial Style Motif" },
    { value: "10", label: "Ingredient" },
    { value: "12", label: "Drink" },
    { value: "13", label: "Costume" },
    { value: "15", label: "Tabard" },
    { value: "18", label: "Container" },
    { value: "19", label: "Soul Gem" },
    { value: "20", label: "Glyph (Weapon)" },
    { value: "21", label: "Glyph (Armor)" },
    { value: "26", label: "Glyph (Jewelry)" },
    { value: "29", label: "Recipe" },
    { value: "30", label: "Poison" },
    { value: "48", label: "Trash" },
    { value: "56", label: "Treasure" },
    { value: "60", label: "Master Writ" },
    { value: "73", label: "Crafted Ability Script" },
  ])
})
