import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import { requireFirst } from "@shared/utils-narrow/require-first"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import type {
  CharacterSkillPointsProgress,
  CompletionCharacter,
  SkillPointSourceProgress,
} from "@temper/player-completion/completion-ui-types"
import { type CompletionFilter, type CompletionNode, CompletionPanelCard, type CompletionSortMode, createNodeFilter, withActivityCategories } from "@temper/player-completion-ui/completion-panel-card"
import type { CharacterCardId } from "@temper/player-completion/completion-card-registry"

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
  { key: "general", label: "General" },
  { key: "skyshards", label: "Skyshards" },
  { key: "zoneQuests", label: "Zone Quests" },
  { key: "groupDungeons", label: "Group Dungeons" },
  { key: "publicDungeons", label: "Public Dungeons" },
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
        label: branch.label,
        children: templateEntries.map(
          (entry): CompletionNode => ({
            key: entry.key,
            label: entry.label,
            children: selectedProgress.map(
              (cp): CompletionNode => ({
                key: cp.characterId,
                label: charNames.get(cp.characterId) ?? cp.characterId,
                count:
                  progressLookup.get(cp.characterId)?.get(branch.key)?.get(entry.key)?.count ?? 0,
                total: entry.total,
              })
            ),
          })
        ),
      }
    })

    const totalChildren: CompletionNode[] = selectedProgress.map((cp) => {
      let count = 0
      let total = 0
      for (const branch of BRANCHES) {
        for (const entry of getBranchEntries(cp, branch.key)) {
          count += entry.count
          total += entry.total
        }
      }
      return {
        key: cp.characterId,
        label: charNames.get(cp.characterId) ?? cp.characterId,
        count,
        total,
      }
    })

    return (
      <CompletionPanelCard
        id={id}
        title="Skill Points"
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
    label: branch.label,
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
      title="Skill Points"
      items={categorizeSkillPointItems(items)}
      filterNode={filterNode}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
