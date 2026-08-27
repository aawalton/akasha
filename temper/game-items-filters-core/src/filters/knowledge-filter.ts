import type { FilterToggleValue } from "../filter-types"
import { defineFilter } from "../filter-types"

function parseToggle(raw: unknown): FilterToggleValue | undefined {
  return raw === "include" || raw === "exclude" ? raw : undefined
}

export const knowledgeFilter = defineFilter<FilterToggleValue>({
  id: "knowledge",
  label: "Knowledge",
  group: "knowledge",
  editor: { kind: "toggle", includeLabel: "Known", excludeLabel: "Unknown" },
  matches(facts, value) {
    if (value === "include") return facts.known === true
    if (facts.isKnowledgeItem === undefined || facts.known === undefined) return false
    return facts.isKnowledgeItem === true && facts.known === false
  },
  serialize(value) {
    return value
  },
  deserialize(raw) {
    return parseToggle(raw)
  },
})
