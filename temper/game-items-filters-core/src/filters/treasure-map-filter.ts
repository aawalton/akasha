import type { FilterToggleValue } from "../filter-types"
import { defineFilter } from "../filter-types"

const SPECIALIZED_ITEMTYPE_TROPHY_TREASURE_MAP = 100

function parseToggle(raw: unknown): FilterToggleValue | undefined {
  return raw === "include" || raw === "exclude" ? raw : undefined
}

export const treasureMapFilter = defineFilter<FilterToggleValue>({
  id: "treasure-map",
  label: "Treasure Map",
  group: "type",
  editor: { kind: "toggle" },
  matches(facts, value) {
    if (facts.specializedItemType === undefined) return false
    const isTreasureMap = facts.specializedItemType === SPECIALIZED_ITEMTYPE_TROPHY_TREASURE_MAP
    return value === "include" ? isTreasureMap : !isTreasureMap
  },
  serialize(value) {
    return value
  },
  deserialize(raw) {
    return parseToggle(raw)
  },
})
