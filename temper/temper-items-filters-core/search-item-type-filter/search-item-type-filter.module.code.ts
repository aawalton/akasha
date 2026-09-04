import { defineFilter } from "../search-filter-types/search-filter-types.module.code.ts"
import { selectedIdsToServerTerms } from "../search-server-narrowing/search-server-narrowing.module.code.ts"
import { parseStringArray } from "../search-string-array-parse/search-string-array-parse.module.code.ts"

const ITEM_TYPE_OPTIONS = [
  { value: "1", label: "Weapon" },
  { value: "2", label: "Armor" },
  { value: "3", label: "Poison" },
  { value: "4", label: "Food" },
  { value: "6", label: "Soul Gem" },
  { value: "7", label: "Costume" },
  { value: "12", label: "Drink" },
  { value: "18", label: "Container" },
  { value: "19", label: "Treasure" },
  { value: "20", label: "Glyph (Weapon)" },
  { value: "21", label: "Glyph (Armor)" },
  { value: "22", label: "Glyph (Jewelry)" },
  { value: "29", label: "Recipe" },
  { value: "30", label: "Racial Style Motif" },
  { value: "34", label: "Trash" },
  { value: "39", label: "Ingredient" },
  { value: "40", label: "Potion" },
  { value: "57", label: "Tabard" },
  { value: "59", label: "Master Writ" },
  { value: "73", label: "Crafted Ability Script" },
] as const

export const ITEM_TYPE_FILTER = defineFilter<readonly string[]>({
  id: "item-type",
  label: "Item Type",
  group: "type",
  editor: { kind: "multiselect", options: ITEM_TYPE_OPTIONS },
  matches(facts, selected) {
    if (selected.length === 0) return true
    if (facts.itemType === undefined) return false
    return selected.includes(String(facts.itemType))
  },
  applyToSearch(req, selected) {
    req.addExactTerms("item-type", selectedIdsToServerTerms(selected))
  },
  serialize(value) {
    return [...value]
  },
  deserialize(raw) {
    return parseStringArray(raw)
  },
})
