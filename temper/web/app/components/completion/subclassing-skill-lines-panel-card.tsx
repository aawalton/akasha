import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import { classes } from "@temper/game-characters-classes/classes-data"
import {
  getSkillLineIdsForClass,
  skillLines,
} from "@temper/game-characters-skill-lines/skill-lines-data"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type { SubclassingSkillLineProgressResult } from "@temper/player-completion/completion-subclassing-progress"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { AccountCardId } from "@temper/player-completion/completion-card-registry"

interface SubclassingSkillLinesPanelCardProps {
  id?: AccountCardId
  subclassingSkillLines: SubclassingSkillLineProgressResult
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function SubclassingSkillLinesPanelCard({
  id,
  subclassingSkillLines,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: SubclassingSkillLinesPanelCardProps) {
  const playableClasses = classes.list.filter((c) => c.id !== "no-class")

  const items: CompletionNode[] = playableClasses.map((cls) => {
    const children: CompletionNode[] = getSkillLineIdsForClass(cls.id).map((slId) => {
      const sl = skillLines.data[slId]
      const entry = subclassingSkillLines.entries.find((e) => e.skillLineId === slId)
      return {
        key: slId,
        label: sl.name,
        count: entry?.currentRank ?? 0,
        total: entry?.maxRank ?? sl.maxRank,
      }
    })
    return { key: cls.id, label: cls.name, children }
  })

  return (
    <CompletionPanelCard
      id={id}
      title="Subclassing Skill Lines"
      items={withActivityCategories(items, "characters")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
