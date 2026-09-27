import type { BadgeToggleGroupItem } from "akasha/design/interface/badge/modules/badge-toggle-group/badge-toggle-group.module.code.tsx"
import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import { isCompanionBaseRoleId } from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import type { CompanionId } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import {
  type TargetArmorId,
  targetArmor,
} from "akasha/temper/player/character/source/modules/target-armors/target-armors.module.code.ts"
import type { TabValue } from "akasha/temper/web/modules/build-page-tab/build-page-tab.module.code.ts"
import type { SortField } from "akasha/temper/web/modules/companions-filter-bar/companions-filter-bar.module.code.tsx"
import type { Phrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionsFilterTypesAoe } from "akasha/temper/web/phrase/pages/companions-filter-types-aoe.temper-web-phrase.ts"
import { companionsFilterTypesExecute } from "akasha/temper/web/phrase/pages/companions-filter-types-execute.temper-web-phrase.ts"
import { companionsFilterTypesFull } from "akasha/temper/web/phrase/pages/companions-filter-types-full.temper-web-phrase.ts"
import { companionsFilterTypesSingleTarget } from "akasha/temper/web/phrase/pages/companions-filter-types-single-target.temper-web-phrase.ts"
import { companionsFilterTypesTargetArmor } from "akasha/temper/web/phrase/pages/companions-filter-types-target-armor.temper-web-phrase.ts"
import { companionsFilterTypesTargetCount } from "akasha/temper/web/phrase/pages/companions-filter-types-target-count.temper-web-phrase.ts"
import { companionsFilterTypesTargetHealth } from "akasha/temper/web/phrase/pages/companions-filter-types-target-health.temper-web-phrase.ts"

export function targetArmorItems(): BadgeToggleGroupItem[] {
  return targetArmor().list.map((ta) => ({ value: ta.id, label: ta.name }))
}

export function targetCountItems(phrase: Phrase): BadgeToggleGroupItem[] {
  return [
    { value: "1", label: phrase(companionsFilterTypesSingleTarget.slug) },
    { value: "3", label: phrase(companionsFilterTypesAoe.slug) },
  ]
}

export function targetHealthItems(phrase: Phrase): BadgeToggleGroupItem[] {
  return [
    { value: "full", label: phrase(companionsFilterTypesFull.slug) },
    { value: "execute", label: phrase(companionsFilterTypesExecute.slug) },
  ]
}

export const TARGET_FILTER_LABELS = {
  "target-armor": companionsFilterTypesTargetArmor,
  "target-count": companionsFilterTypesTargetCount,
  "target-health": companionsFilterTypesTargetHealth,
} as const

export type FilterValues = {
  tab: TabValue
  search: string
  roles: readonly string[]
  companion: string | null
  targetArmor: string | null
  targetCount: string | null
  targetHealth: string | null
  sortBy: SortField
  sortDirection: SortDirection
  leaderboardTargetArmor: string | null
  leaderboardTargetCount: string | null
  leaderboardTargetHealth: string | null
}

export function isValidSortField(value: unknown): value is SortField {
  return value === "updated" || value === "name" || value === "score"
}

export function isValidRoles(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isCompanionBaseRoleId)
}

export function isValidCompanion(value: unknown): value is CompanionId {
  return typeof value === "string" && value !== "" && value !== "no-companion"
}

export function isValidTargetArmor(value: unknown): value is TargetArmorId {
  return typeof value === "string" && value !== ""
}

export function isValidTargetCount(value: unknown): value is string {
  return value === "1" || value === "3"
}

export function isValidTargetHealth(value: unknown): value is string {
  return value === "full" || value === "execute"
}
