import type { BadgeToggleGroupItem } from "@akasha/design-badges/badge-toggle-group"
import type { SortOption } from "@akasha/design-patterns/sort-types"
import { ACTIVITY_CATEGORIES } from "@akasha/temper-player-completion/activity-categories"
import type { CompletionSortMode } from "@akasha/temper-player-completion-ui/completion-panel-card"

export const VALID_TABS = new Set(["summary", "account", "characters", "companions"])
export const VALID_STATUSES = new Set(["not-started", "in-progress", "done"])
export const VALID_SKILL_TYPES = new Set(["active", "ultimate"])

export const STATUS_ITEMS: BadgeToggleGroupItem[] = [
  { value: "not-started", label: "Not Started" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
]

export const SKILL_TYPE_ITEMS: BadgeToggleGroupItem[] = [
  { value: "active", label: "Active" },
  { value: "ultimate", label: "Ultimate" },
]

export const SORT_OPTIONS: SortOption<CompletionSortMode>[] = [
  { value: "status", label: "Status" },
  { value: "percent", label: "Percent" },
  { value: "name", label: "Name" },
]

export function buildActivityItems(debug: boolean): readonly BadgeToggleGroupItem[] {
  return ACTIVITY_CATEGORIES.list
    .map((entry) => ({
      value: entry.id,
      label: entry.name,
      ...(debug ? { variant: entry.badgeVariant } : {}),
    }))
    .sort((a, b) => a.label.localeCompare(b.label))
}
