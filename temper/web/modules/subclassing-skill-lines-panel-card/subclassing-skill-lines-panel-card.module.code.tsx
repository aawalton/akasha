import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import { classes } from "akasha/temper/modules/character-class/character-class.module.code.ts"
import {
  getSkillLineIdsForClass,
  skillLines,
} from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"
import type { ActivityCategoryId } from "akasha/temper/player/completion/temper-player-completion/modules/activity-categories/activity-categories.module.code.ts"
import type { AccountCardId } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import type { SubclassingSkillLineProgressResult } from "akasha/temper/player/completion/temper-player-completion/modules/completion-subclassing-progress/completion-subclassing-progress.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { subclassingSkillLinesPanelCardTitle } from "akasha/temper/web/phrase/pages/subclassing-skill-lines-panel-card-title.temper-web-phrase.ts"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "akasha/temper/web/player-completion-ui/modules/completion-panel-card/completion-panel-card.module.code.tsx"

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
  const phrase = usePhrase()
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
      title={phrase(subclassingSkillLinesPanelCardTitle.slug)}
      items={withActivityCategories(items, "characters")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
