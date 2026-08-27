import { itemNameMatchesPattern } from "@temper/game-items-core/item-name-pattern"
import { defineFilter } from "../filter-types"

export const itemNameFilter = defineFilter<string>({
  id: "item-name",
  label: "Name",
  group: "text",
  editor: { kind: "text", placeholder: "Search by name…" },
  matches(facts, pattern) {
    if (pattern.trim().length === 0) return true
    return itemNameMatchesPattern(facts.itemName, pattern)
  },
  serialize(value) {
    return value
  },
  deserialize(raw) {
    return typeof raw === "string" ? raw : undefined
  },
})
