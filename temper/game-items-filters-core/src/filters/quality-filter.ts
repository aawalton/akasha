import { defineFilter } from "../filter-types"
import { selectedIdsToServerTerms } from "../server-narrowing"

const QUALITY_OPTIONS = [
  { value: "0", label: "Trash" },
  { value: "1", label: "Normal" },
  { value: "2", label: "Fine" },
  { value: "3", label: "Superior" },
  { value: "4", label: "Epic" },
  { value: "5", label: "Legendary" },
] as const

function parseStringArray(raw: unknown): readonly string[] | undefined {
  if (!Array.isArray(raw)) return undefined
  if (!raw.every((entry): entry is string => typeof entry === "string")) return undefined
  return raw
}

export const qualityFilter = defineFilter<readonly string[]>({
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
