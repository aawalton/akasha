import type { FilterToggleValue } from "../search-filter-types/search-filter-types.module.code.ts"
import { defineFilter } from "../search-filter-types/search-filter-types.module.code.ts"
import { parseToggle } from "../search-toggle-value-parse/search-toggle-value-parse.module.code.ts"

export const KNOWLEDGE_FILTER = defineFilter<FilterToggleValue>({
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
