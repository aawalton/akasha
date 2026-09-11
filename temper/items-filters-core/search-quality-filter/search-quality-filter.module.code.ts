import { defineFilter } from "akasha/temper/items-filters-core/search-filter-types/search-filter-types.module.code.ts"
import { selectedIdsToServerTerms } from "akasha/temper/items-filters-core/search-server-narrowing/search-server-narrowing.module.code.ts"
import { parseStringArray } from "akasha/temper/items-filters-core/search-string-array-parse/search-string-array-parse.module.code.ts"

const QUALITY_OPTIONS = [
  { value: "0", label: "Trash" },
  { value: "1", label: "Normal" },
  { value: "2", label: "Fine" },
  { value: "3", label: "Superior" },
  { value: "4", label: "Epic" },
  { value: "5", label: "Legendary" },
] as const

export const QUALITY_FILTER = defineFilter<readonly string[]>({
  id: "quality",
  label: "Quality",
  group: "quality",
  editor: { kind: "multiselect", options: QUALITY_OPTIONS },
  matches(facts, selected) {
    if (selected.length === 0) return true
    if (facts.quality === undefined) return false
    return selected.includes(String(facts.quality))
  },
  applyToSearch(req, selected) {
    req.addExactTerms("quality", selectedIdsToServerTerms(selected))
  },
  serialize(value) {
    return [...value]
  },
  deserialize(raw) {
    return parseStringArray(raw)
  },
})
