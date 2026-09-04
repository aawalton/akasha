import { defineFilter } from "../search-filter-types/search-filter-types.module.code.ts"
import { selectedIdsToServerTerms } from "../search-server-narrowing/search-server-narrowing.module.code.ts"
import { parseStringArray } from "../search-string-array-parse/search-string-array-parse.module.code.ts"

const ARMOR_WEIGHT_OPTIONS = [
  { value: "1", label: "Light" },
  { value: "2", label: "Medium" },
  { value: "3", label: "Heavy" },
] as const

export const ARMOR_WEIGHT_FILTER = defineFilter<readonly string[]>({
  id: "armor-weight",
  label: "Armor Weight",
  group: "type",
  editor: { kind: "multiselect", options: ARMOR_WEIGHT_OPTIONS },
  matches(facts, selected) {
    if (selected.length === 0) return true
    if (facts.armorType === undefined) return false
    return selected.includes(String(facts.armorType))
  },
  applyToSearch(req, selected) {
    req.addExactTerms("armor-type", selectedIdsToServerTerms(selected))
  },
  serialize(value) {
    return [...value]
  },
  deserialize(raw) {
    return parseStringArray(raw)
  },
})
