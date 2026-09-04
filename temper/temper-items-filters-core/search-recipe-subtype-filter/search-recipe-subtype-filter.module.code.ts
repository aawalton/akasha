import { defineFilter } from "../search-filter-types/search-filter-types.module.code.ts"
import { parseStringArray } from "../search-string-array-parse/search-string-array-parse.module.code.ts"

const SPECIALIZED_ITEMTYPE_RECIPE_PROVISIONING_STANDARD_FOOD = 170
const SPECIALIZED_ITEMTYPE_RECIPE_PROVISIONING_STANDARD_DRINK = 171
const SPECIALIZED_ITEMTYPE_RECIPE_BLACKSMITHING_DIAGRAM_FURNISHING = 172
const SPECIALIZED_ITEMTYPE_RECIPE_CLOTHIER_PATTERN_FURNISHING = 173
const SPECIALIZED_ITEMTYPE_RECIPE_ENCHANTING_SCHEMATIC_FURNISHING = 174
const SPECIALIZED_ITEMTYPE_RECIPE_ALCHEMY_FORMULA_FURNISHING = 175
const SPECIALIZED_ITEMTYPE_RECIPE_PROVISIONING_DESIGN_FURNISHING = 176
const SPECIALIZED_ITEMTYPE_RECIPE_WOODWORKING_BLUEPRINT_FURNISHING = 177
const SPECIALIZED_ITEMTYPE_RECIPE_JEWELRYCRAFTING_SKETCH_FURNISHING = 178

const RECIPE_SUBTYPE_OPTIONS = [
  { value: String(SPECIALIZED_ITEMTYPE_RECIPE_PROVISIONING_STANDARD_FOOD), label: "Food Recipe" },
  { value: String(SPECIALIZED_ITEMTYPE_RECIPE_PROVISIONING_STANDARD_DRINK), label: "Drink Recipe" },
  {
    value: String(SPECIALIZED_ITEMTYPE_RECIPE_BLACKSMITHING_DIAGRAM_FURNISHING),
    label: "Blacksmithing Diagram (Furnishing)",
  },
  {
    value: String(SPECIALIZED_ITEMTYPE_RECIPE_CLOTHIER_PATTERN_FURNISHING),
    label: "Clothier Pattern (Furnishing)",
  },
  {
    value: String(SPECIALIZED_ITEMTYPE_RECIPE_ENCHANTING_SCHEMATIC_FURNISHING),
    label: "Enchanting Schematic (Furnishing)",
  },
  {
    value: String(SPECIALIZED_ITEMTYPE_RECIPE_ALCHEMY_FORMULA_FURNISHING),
    label: "Alchemy Formula (Furnishing)",
  },
  {
    value: String(SPECIALIZED_ITEMTYPE_RECIPE_PROVISIONING_DESIGN_FURNISHING),
    label: "Provisioning Design (Furnishing)",
  },
  {
    value: String(SPECIALIZED_ITEMTYPE_RECIPE_WOODWORKING_BLUEPRINT_FURNISHING),
    label: "Woodworking Blueprint (Furnishing)",
  },
  {
    value: String(SPECIALIZED_ITEMTYPE_RECIPE_JEWELRYCRAFTING_SKETCH_FURNISHING),
    label: "Jewelrycrafting Sketch (Furnishing)",
  },
] as const

export const RECIPE_SUBTYPE_FILTER = defineFilter<readonly string[]>({
  id: "recipe-subtype",
  label: "Recipe Subtype",
  group: "knowledge",
  editor: { kind: "multiselect", options: RECIPE_SUBTYPE_OPTIONS },
  matches(facts, selected) {
    if (selected.length === 0) return true
    if (facts.specializedItemType === undefined) return false
    return selected.includes(String(facts.specializedItemType))
  },
  serialize(value) {
    return [...value]
  },
  deserialize(raw) {
    return parseStringArray(raw)
  },
})
