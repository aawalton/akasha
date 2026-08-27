import { defineFilter } from "../filter-types"
import { selectedIdsToServerTerms } from "../server-narrowing"

const WEAPON_TYPE_OPTIONS = [
  { value: "1", label: "Axe" },
  { value: "2", label: "Mace" },
  { value: "3", label: "Sword" },
  { value: "4", label: "Greatsword" },
  { value: "5", label: "Battleaxe" },
  { value: "6", label: "Maul" },
  { value: "8", label: "Bow" },
  { value: "9", label: "Restoration Staff" },
  { value: "11", label: "Dagger" },
  { value: "12", label: "Inferno Staff" },
  { value: "13", label: "Ice Staff" },
  { value: "15", label: "Lightning Staff" },
] as const

function parseStringArray(raw: unknown): readonly string[] | undefined {
  if (!Array.isArray(raw)) return undefined
  if (!raw.every((entry): entry is string => typeof entry === "string")) return undefined
  return raw
}

export const weaponTypeFilter = defineFilter<readonly string[]>({
  id: "weapon-type",
  label: "Weapon Type",
  group: "type",
  editor: { kind: "multiselect", options: WEAPON_TYPE_OPTIONS },
  matches(facts, selected) {
    if (selected.length === 0) return true
    if (facts.weaponType === undefined) return false
    return selected.includes(String(facts.weaponType))
  },
  applyToSearch(req, selected) {
    req.addExactTerms("weapon-type", selectedIdsToServerTerms(selected))
  },
  serialize(value) {
    return [...value]
  },
  deserialize(raw) {
    return parseStringArray(raw)
  },
})
