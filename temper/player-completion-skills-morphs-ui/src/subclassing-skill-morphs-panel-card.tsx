import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import { classes } from "@temper/game-characters-classes/classes-data"
import {
  getSkillLineIdsForClass,
  skillLines,
} from "@temper/game-characters-skill-lines/skill-lines-data"
import type { SubclassingSkillMorphProgressResult } from "@temper/game-characters-skills-morphs-core/subclassing-morph-progress"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type { AccountCardId } from "@temper/player-completion/completion-card-registry"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"

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
