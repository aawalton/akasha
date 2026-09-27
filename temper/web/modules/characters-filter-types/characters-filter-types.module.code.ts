import type { BadgeToggleGroupItem } from "akasha/design/interface/badge/modules/badge-toggle-group/badge-toggle-group.module.code.tsx"
import type {
  SortDirection,
  SortOption,
} from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import {
  type RaceId,
  races,
} from "akasha/temper/catalog/character-race/modules/races/races.module.code.ts"
import { classes } from "akasha/temper/modules/character-class/character-class.module.code.ts"
import type { ClassId } from "akasha/temper/player/character/formula-framework/modules/class-id/class-id.module.code.ts"
import {
  characterRoles,
  type RoleId,
} from "akasha/temper/player/character/source/modules/character-roles/character-roles.module.code.ts"
import type { TabValue } from "akasha/temper/web/modules/build-page-tab/build-page-tab.module.code.ts"
import type { Phrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { charactersFilterTypesBrowse } from "akasha/temper/web/phrase/pages/characters-filter-types-browse.temper-web-phrase.ts"
import { charactersFilterTypesBuild } from "akasha/temper/web/phrase/pages/characters-filter-types-build.temper-web-phrase.ts"
import { charactersFilterTypesName } from "akasha/temper/web/phrase/pages/characters-filter-types-name.temper-web-phrase.ts"
import { charactersFilterTypesPlan } from "akasha/temper/web/phrase/pages/characters-filter-types-plan.temper-web-phrase.ts"
import { charactersFilterTypesRank } from "akasha/temper/web/phrase/pages/characters-filter-types-rank.temper-web-phrase.ts"
import { charactersFilterTypesRecent } from "akasha/temper/web/phrase/pages/characters-filter-types-recent.temper-web-phrase.ts"
import type { ReactNode } from "react"

export type SortField = "updated" | "name"

export type FilterValues = {
  tab: TabValue
  search: string
  role: string | null
  class: string | null
  sortBy: SortField
  sortDirection: SortDirection
}

export const TAB_LABEL_PHRASES: Record<TabValue, string> = {
  plan: charactersFilterTypesPlan.slug,
  build: charactersFilterTypesBuild.slug,
  browse: charactersFilterTypesBrowse.slug,
  leaderboard: charactersFilterTypesRank.slug,
}

function itemsOf(
  list: readonly { readonly id: string; readonly name: string }[]
): BadgeToggleGroupItem[] {
  return list.map((one) => ({ value: one.id, label: one.name }))
}

export function roleItems(): BadgeToggleGroupItem[] {
  return itemsOf(characterRoles().list)
}

export function classItems(): BadgeToggleGroupItem[] {
  return itemsOf(classes.list)
}

export function sortOptions(phrase: Phrase): SortOption<SortField>[] {
  return [
    { value: "updated", label: phrase(charactersFilterTypesRecent.slug), defaultDirection: "desc" },
    { value: "name", label: phrase(charactersFilterTypesName.slug), defaultDirection: "asc" },
  ]
}

export const getClassName = (classId: ClassId) => classes.data[classId].name
export const getRaceName = (raceId: RaceId) => races.data[raceId].name

export function isValidSortField(value: unknown): value is SortField {
  return value === "updated" || value === "name"
}

export function isValidRole(value: unknown): value is RoleId {
  return typeof value === "string" && characterRoles().has(value)
}

export function roleFilterOf(value: string): RoleId {
  return isValidRole(value) ? value : "no-role"
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
  labelPhrase: string
  hasValue: (props: CharactersFilterPopoverProps) => boolean
  renderGroup: (props: CharactersFilterPopoverProps) => ReactNode
  clearValue: (props: CharactersFilterPopoverProps) => void
}
