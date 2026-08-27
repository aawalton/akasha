import { defineFilter } from "../filter-types"
import { selectedIdsToServerTerms } from "../server-narrowing"

const EQUIP_SLOT_OPTIONS = [
  { value: "1", label: "Head" },
  { value: "2", label: "Neck" },
  { value: "3", label: "Chest" },
  { value: "4", label: "Shoulders" },
  { value: "5", label: "One Hand" },
  { value: "6", label: "Two Hand" },
  { value: "7", label: "Off Hand" },
  { value: "8", label: "Waist" },
  { value: "9", label: "Legs" },
  { value: "10", label: "Feet" },
  { value: "12", label: "Ring" },
  { value: "13", label: "Hand" },
  { value: "14", label: "Main Hand" },
] as const

function parseStringArray(raw: unknown): readonly string[] | undefined {
  if (!Array.isArray(raw)) return undefined
  if (!raw.every((entry): entry is string => typeof entry === "string")) return undefined
  return raw
}

export const equipSlotFilter = defineFilter<readonly string[]>({
  id: "equip-slot",
  label: "Equip Slot",
  group: "type",
  editor: { kind: "multiselect", options: EQUIP_SLOT_OPTIONS },
  matches(facts, selected) {
    if (selected.length === 0) return true
    if (facts.equipType === undefined) return false
    return selected.includes(String(facts.equipType))
  },
  applyToSearch(req, selected) {
    req.addExactTerms("equip-type", selectedIdsToServerTerms(selected))
  },
  serialize(value) {
    return [...value]
  },
  deserialize(raw) {
    return parseStringArray(raw)
  },
})
