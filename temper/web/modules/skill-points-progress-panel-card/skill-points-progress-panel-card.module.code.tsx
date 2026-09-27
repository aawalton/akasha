import { requireFirst } from "akasha/code/type/narrowing/modules/require-first/require-first.module.code.ts"
import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import type { ActivityCategoryId } from "akasha/temper/player/completion/temper-player-completion/modules/activity-categories/activity-categories.module.code.ts"
import type { CharacterCardId } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import type {
  CharacterSkillPointsProgress,
  CompletionCharacter,
  SkillPointSourceProgress,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-ui-types/completion-ui-types.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { skillPointsProgressPanelCardGeneral } from "akasha/temper/web/phrase/pages/skill-points-progress-panel-card-general.temper-web-phrase.ts"
import { skillPointsProgressPanelCardGroupDungeons } from "akasha/temper/web/phrase/pages/skill-points-progress-panel-card-group-dungeons.temper-web-phrase.ts"
import { skillPointsProgressPanelCardPublicDungeons } from "akasha/temper/web/phrase/pages/skill-points-progress-panel-card-public-dungeons.temper-web-phrase.ts"
import { skillPointsProgressPanelCardSkyshards } from "akasha/temper/web/phrase/pages/skill-points-progress-panel-card-skyshards.temper-web-phrase.ts"
import { skillPointsProgressPanelCardTitle } from "akasha/temper/web/phrase/pages/skill-points-progress-panel-card-title.temper-web-phrase.ts"
import { skillPointsProgressPanelCardZoneQuests } from "akasha/temper/web/phrase/pages/skill-points-progress-panel-card-zone-quests.temper-web-phrase.ts"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "akasha/temper/web/player-completion-ui/modules/completion-panel-card/completion-panel-card.module.code.tsx"

interface SkillPointsProgressPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  skillPointsProgress: readonly CharacterSkillPointsProgress[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

const BRANCHES = [
  { key: "general", labelSlug: skillPointsProgressPanelCardGeneral.slug },
  { key: "skyshards", labelSlug: skillPointsProgressPanelCardSkyshards.slug },
  { key: "zoneQuests", labelSlug: skillPointsProgressPanelCardZoneQuests.slug },
  { key: "groupDungeons", labelSlug: skillPointsProgressPanelCardGroupDungeons.slug },
  { key: "publicDungeons", labelSlug: skillPointsProgressPanelCardPublicDungeons.slug },
] as const

type BranchKey = (typeof BRANCHES)[number]["key"]

const PVP_SKYSHARD_KEYS = new Set(["IC", "CY"])

function categorizeSkillPointItems(items: readonly CompletionNode[]): readonly CompletionNode[] {
  return items.map((branch) => {
    if (branch.key !== "skyshards" || !("children" in branch)) {
      return requireFirst(withActivityCategories([branch], "characters"))
    }
    const children = branch.children.map((entry) => {
      const cats: ActivityCategoryId[] = PVP_SKYSHARD_KEYS.has(String(entry.key))
        ? ["exploration", "pvp"]
        : ["exploration"]
      if ("children" in entry) {
        return {
          ...entry,
          activityCategories: cats,
          children: withActivityCategories(entry.children, cats),
        }
      }
      return { ...entry, activityCategories: cats }
    })
    const branchCats: ActivityCategoryId[] = ["exploration"]
    return { ...branch, activityCategories: branchCats, children }
  })
}

function getBranchEntries(
  progress: CharacterSkillPointsProgress,
  branchKey: BranchKey
): readonly SkillPointSourceProgress[] {
  return progress[branchKey]
}

export function SkillPointsProgressPanelCard({
  id,
  characters,
  skillPointsProgress,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: SkillPointsProgressPanelCardProps) {
  const phrase = usePhrase()
  const isAggregate = selectedCharacterIds.length === 0
  const selectedProgress = isAggregate
    ? skillPointsProgress
    : skillPointsProgress.filter((p) => selectedCharacterIds.includes(p.characterId))

  if (selectedProgress.length === 0) return null

  const charNames = new Map(characters.map((c) => [c.id, c.name]))
  const filterNode = createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])

  if (isAggregate && selectedProgress.length > 1) {
    const template = requireFirst(selectedProgress)

    const progressLookup = new Map<string, Map<string, Map<string, SkillPointSourceProgress>>>()
    for (const cp of selectedProgress) {
      const branchMap = new Map<string, Map<string, SkillPointSourceProgress>>()
      for (const branch of BRANCHES) {
        const entries = getBranchEntries(cp, branch.key)
        const entryMap = new Map<string, SkillPointSourceProgress>()
        for (const e of entries) {
          entryMap.set(e.key, e)
        }
        branchMap.set(branch.key, entryMap)
      }
      progressLookup.set(cp.characterId, branchMap)
    }

    const items: CompletionNode[] = BRANCHES.map((branch) => {
      const templateEntries = getBranchEntries(template, branch.key)
      return {
        key: branch.key,
        label: phrase(branch.labelSlug),
        children: templateEntries.map(
          (entry): CompletionNode => ({
            key: entry.key,
            label: entry.label,
            children: selectedProgress.map(
              (one): CompletionNode => ({
                key: one.characterId,
                label: charNames.get(one.characterId) ?? one.characterId,
                count:
                  progressLookup.get(one.characterId)?.get(branch.key)?.get(entry.key)?.count ?? 0,
                total: entry.total,
              })
            ),
          })
        ),
      }
    })

    const totalChildren: CompletionNode[] = selectedProgress.map((one) => {
      let count = 0
      let total = 0
      for (const branch of BRANCHES) {
        for (const entry of getBranchEntries(one, branch.key)) {
          count += entry.count
          total += entry.total
        }
      }
      return {
        key: one.characterId,
        label: charNames.get(one.characterId) ?? one.characterId,
        count,
        total,
      }
    })

    return (
      <CompletionPanelCard
        id={id}
        title={phrase(skillPointsProgressPanelCardTitle.slug)}
        items={categorizeSkillPointItems(items)}
        totalChildren={totalChildren}
        filterNode={filterNode}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
    )
  }

  const cp = requireFirst(selectedProgress)
  const items: CompletionNode[] = BRANCHES.map((branch) => ({
    key: branch.key,
    label: phrase(branch.labelSlug),
    children: getBranchEntries(cp, branch.key).map(
      (entry): CompletionNode => ({
        key: entry.key,
        label: entry.label,
        count: entry.count,
        total: entry.total,
      })
    ),
  }))

  return (
    <CompletionPanelCard
      id={id}
      title={phrase(skillPointsProgressPanelCardTitle.slug)}
      items={categorizeSkillPointItems(items)}
      filterNode={filterNode}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
