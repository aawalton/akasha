import { itemNameMatchesPattern } from "akasha/temper/temper-items-core/item-name-pattern/item-name-pattern.module.code.ts"
import { defineFilter } from "../search-filter-types/search-filter-types.module.code.ts"

export const ITEM_NAME_FILTER = defineFilter<string>({
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
