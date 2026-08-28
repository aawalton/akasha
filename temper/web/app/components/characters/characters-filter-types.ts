import type { BadgeToggleGroupItem } from "@shared/design-badges/components/badge-toggle-group"
import type { SortDirection, SortOption } from "@shared/design-patterns/utils/sort-types"
import { roles } from "@temper/game-characters-character/generated/temper-character-role.generated"
import { type RoleId } from "@temper/game-characters-character/roles"
import { type ClassId, classes } from "@temper/game-characters-classes/classes-data"
import { races } from "@temper/game-characters-races/generated/temper-race.generated"
import { type RaceId } from "@temper/game-characters-races/races"
import type { ReactNode } from "react"

export type TabValue = "plan" | "build" | "browse" | "leaderboard"

export type SortField = "updated" | "name"

export type FilterValues = {
  tab: TabValue
  search: string
  role: string | null
  class: string | null
  sortBy: SortField
  sortDirection: SortDirection
}

export const TAB_LABELS: Record<TabValue, string> = {
  plan: "Plan",
  build: "Build",
  browse: "Browse",
  leaderboard: "Rank",
}

export const ROLE_ITEMS: BadgeToggleGroupItem[] = roles.ids.map((id) => ({
  value: id,
  label: roles.data[id].name,
}))

export const CLASS_ITEMS: BadgeToggleGroupItem[] = classes.ids.map((id) => ({
  value: id,
  label: classes.data[id].name,
}))

export const SORT_OPTIONS: SortOption<SortField>[] = [
  { value: "updated", label: "Recent", defaultDirection: "desc" },
  { value: "name", label: "Name", defaultDirection: "asc" },
]

export const getClassName = (classId: ClassId) => classes.data[classId].name
export const getRaceName = (raceId: RaceId) => races.data[raceId].name

export function isValidTab(value: unknown): value is TabValue {
  return value === "plan" || value === "build" || value === "browse" || value === "leaderboard"
}

export function isValidSortField(value: unknown): value is SortField {
  return value === "updated" || value === "name"
}

export function isValidSortDirection(value: unknown): value is SortDirection {
  return value === "asc" || value === "desc"
}

export function isValidRole(value: unknown): value is RoleId {
  return typeof value === "string" && value in roles.data
}

export function isValidClass(value: unknown): value is ClassId {
  return typeof value === "string" && value in classes.data
}

export type CharactersFilterId = "role" | "class"

const CHARACTERS_FILTER_IDS: ReadonlySet<string> = new Set<CharactersFilterId>(["role", "class"])

export function isCharactersFilterId(value: string): value is CharactersFilterId {
  return CHARACTERS_FILTER_IDS.has(value)
}

export type CharactersFilterPopoverProps = {
  selectedRole: string | null
  selectedClass: string | null
  onRoleChange: (value: string | null) => void
  onClassChange: (value: string | null) => void
}

export type CharactersFilterDef = {
  id: CharactersFilterId
  label: string
  hasValue: (props: CharactersFilterPopoverProps) => boolean
  renderGroup: (props: CharactersFilterPopoverProps) => ReactNode
  clearValue: (props: CharactersFilterPopoverProps) => void
}
