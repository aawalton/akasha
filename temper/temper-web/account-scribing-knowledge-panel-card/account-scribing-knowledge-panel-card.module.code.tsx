import type { SortDirection } from "@akasha/design-patterns/sort-types"
import type { ActivityCategoryId } from "@akasha/temper-player-completion/activity-categories"
import type { AccountScribingUnionProgress } from "@akasha/temper-player-completion/completion-account-recipe-scribing-union"
import type { AccountCardId } from "@akasha/temper-player-completion/completion-card-registry"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "@akasha/temper-player-completion-ui/completion-panel-card"

interface AccountScribingKnowledgePanelCardProps {
  id?: AccountCardId
  scribingUnion: AccountScribingUnionProgress
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

const CATEGORIES = [
  { key: "grimoires", label: "Grimoires" },
  { key: "focusScripts", label: "Focus Scripts" },
  { key: "signatureScripts", label: "Signature Scripts" },
  { key: "affixScripts", label: "Affix Scripts" },
] as const

export function AccountScribingKnowledgePanelCard({
  id,
  scribingUnion,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: AccountScribingKnowledgePanelCardProps) {
  const items: CompletionNode[] = CATEGORIES.map((cat) => ({
    key: cat.key,
    label: cat.label,
    children: scribingUnion[cat.key].map(
      (item): CompletionNode => ({
        key: item.name,
        label: item.name,
        count: item.unlocked ? 1 : 0,
        total: 1,
      })
    ),
  }))

  return (
    <CompletionPanelCard
      id={id}
      title="Skill Scribing"
      items={withActivityCategories(items, "crafting")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
