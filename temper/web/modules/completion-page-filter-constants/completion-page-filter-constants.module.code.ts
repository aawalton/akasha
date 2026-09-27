import type { BadgeToggleGroupItem } from "akasha/design/interface/badge/modules/badge-toggle-group/badge-toggle-group.module.code.tsx"
import type { SortOption } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import { active as activeSkillType } from "akasha/temper/catalog/skill/type/pages/active.temper-skill-type.ts"
import { ultimate as ultimateSkillType } from "akasha/temper/catalog/skill/type/pages/ultimate.temper-skill-type.ts"
import {
  type KeyedTitles,
  titleIn,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import { ACTIVITY_CATEGORIES } from "akasha/temper/player/completion/temper-player-completion/modules/activity-categories/activity-categories.module.code.ts"
import { temperActivityCategory } from "akasha/temper/player/progress/temper-activity-category/temper-activity-category.page-type.ts"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import type { Phrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { completionPageFilterConstantsDone } from "akasha/temper/web/phrase/pages/completion-page-filter-constants-done.temper-web-phrase.ts"
import { completionPageFilterConstantsInProgress } from "akasha/temper/web/phrase/pages/completion-page-filter-constants-in-progress.temper-web-phrase.ts"
import { completionPageFilterConstantsName } from "akasha/temper/web/phrase/pages/completion-page-filter-constants-name.temper-web-phrase.ts"
import { completionPageFilterConstantsNotStarted } from "akasha/temper/web/phrase/pages/completion-page-filter-constants-not-started.temper-web-phrase.ts"
import { completionPageFilterConstantsPercent } from "akasha/temper/web/phrase/pages/completion-page-filter-constants-percent.temper-web-phrase.ts"
import { completionPageFilterConstantsStatus } from "akasha/temper/web/phrase/pages/completion-page-filter-constants-status.temper-web-phrase.ts"
import type { CompletionSortMode } from "akasha/temper/web/player-completion-ui/modules/completion-panel-card/completion-panel-card.module.code.tsx"
import { useMemo } from "react"

export const VALID_TABS = new Set(["summary", "account", "characters", "companions"])
export const VALID_STATUSES = new Set(["not-started", "in-progress", "done"])
export const VALID_SKILL_TYPES = new Set(["active", "ultimate"])

export function statusItems(phrase: Phrase): BadgeToggleGroupItem[] {
  return [
    { value: "not-started", label: phrase(completionPageFilterConstantsNotStarted.slug) },
    { value: "in-progress", label: phrase(completionPageFilterConstantsInProgress.slug) },
    { value: "done", label: phrase(completionPageFilterConstantsDone.slug) },
  ]
}

export const SKILL_TYPE_ITEMS: BadgeToggleGroupItem[] = [
  { value: "active", label: activeSkillType.title },
  { value: "ultimate", label: ultimateSkillType.title },
]

export function sortOptions(phrase: Phrase): SortOption<CompletionSortMode>[] {
  return [
    { value: "status", label: phrase(completionPageFilterConstantsStatus.slug) },
    { value: "percent", label: phrase(completionPageFilterConstantsPercent.slug) },
    { value: "name", label: phrase(completionPageFilterConstantsName.slug) },
  ]
}

export function useActivityItems(debug: boolean): readonly BadgeToggleGroupItem[] {
  const titles = useKeyedTitles(temperActivityCategory.slug)
  return useMemo(() => buildActivityItems(debug, titles), [debug, titles])
}

function buildActivityItems(
  debug: boolean,
  titles: KeyedTitles | null
): readonly BadgeToggleGroupItem[] {
  return ACTIVITY_CATEGORIES.list
    .map((entry) => ({
      value: entry.id,
      label: titleIn(titles, entry.id),
      ...(debug ? { variant: entry.badgeVariant } : {}),
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
}
