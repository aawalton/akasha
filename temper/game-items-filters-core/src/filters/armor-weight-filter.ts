import { defineFilter } from "../filter-types"
import { selectedIdsToServerTerms } from "../server-narrowing"

const ARMOR_WEIGHT_OPTIONS = [
  { value: "1", label: "Light" },
  { value: "2", label: "Medium" },
  { value: "3", label: "Heavy" },
] as const

function parseStringArray(raw: unknown): readonly string[] | undefined {
  if (!Array.isArray(raw)) return undefined
  if (!raw.every((entry): entry is string => typeof entry === "string")) return undefined
  return raw
}

export const armorWeightFilter = defineFilter<readonly string[]>({
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
