import type { SortDirection } from "@akasha/design-patterns/sort-types"
import { classes } from "@akasha/temper-classes/character-class"
import type { ActivityCategoryId } from "@akasha/temper-player-completion/activity-categories"
import type { AccountCardId } from "@akasha/temper-player-completion/completion-card-registry"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "@akasha/temper-player-completion-ui/completion-panel-card"
import { getSkillLineIdsForClass, skillLines } from "@akasha/temper-skill-lines/skill-lines"
import type { SubclassingSkillMorphProgressResult } from "@akasha/temper-skill-morphs/subclassing-morph-progress"

const MAX_VARIANT_RANK = 4

interface SubclassingSkillMorphsPanelCardProps {
  id?: AccountCardId
  subclassingSkillMorphs: SubclassingSkillMorphProgressResult
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function SubclassingSkillMorphsPanelCard({
  id,
  subclassingSkillMorphs,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: SubclassingSkillMorphsPanelCardProps) {
  const playableClasses = classes.list.filter((c) => c.id !== "no-class")

  const morphByLine = new Map(subclassingSkillMorphs.entries.map((e) => [e.skillLineId, e.skills]))

  const items: CompletionNode[] = playableClasses.map((cls) => {
    const skillLineChildren: CompletionNode[] = getSkillLineIdsForClass(cls.id)
      .filter((slId) => morphByLine.has(slId))
      .map((slId) => {
        const sl = skillLines.data[slId]
        const skills = morphByLine.get(slId) ?? []
        const abilityChildren: CompletionNode[] = skills.map((skill) => ({
          key: String(skill.abilityIndex),
          label: skill.baseName,
          children: [
            { key: "base", label: "Base", count: skill.baseRank, total: MAX_VARIANT_RANK },
            {
              key: "morph1",
              label: skill.morph1Name,
              count: skill.morph1Rank,
              total: MAX_VARIANT_RANK,
            },
            {
              key: "morph2",
              label: skill.morph2Name,
              count: skill.morph2Rank,
              total: MAX_VARIANT_RANK,
            },
          ],
        }))
        return { key: slId, label: sl.name, children: abilityChildren }
      })
    return { key: cls.id, label: cls.name, children: skillLineChildren }
  })

  return (
    <CompletionPanelCard
      id={id}
      title="Subclassing Skill Morphs"
      items={withActivityCategories(items, "characters")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
