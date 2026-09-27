import type { SortDirection } from "akasha/design/interface/pattern/modules/sort-types/sort-types.module.code.ts"
import type { ActivityCategoryId } from "akasha/temper/player/completion/temper-player-completion/modules/activity-categories/activity-categories.module.code.ts"
import type { CharacterCardId } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import type {
  CharacterPackUpgradesProgress,
  CompletionCharacter,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-ui-types/completion-ui-types.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { packUpgradesPanelCardTitle } from "akasha/temper/web/phrase/pages/pack-upgrades-panel-card-title.temper-web-phrase.ts"
import {
  type CompletionFilter,
  type CompletionNode,
  CompletionPanelCard,
  type CompletionSortMode,
  createNodeFilter,
  withActivityCategories,
} from "akasha/temper/web/player-completion-ui/modules/completion-panel-card/completion-panel-card.module.code.tsx"

interface PackUpgradesPanelCardProps {
  id?: CharacterCardId
  characters: readonly CompletionCharacter[]
  packUpgradesProgress: readonly CharacterPackUpgradesProgress[]
  selectedCharacterIds: readonly string[]
  completionFilter?: CompletionFilter
  activityCategoryFilter?: readonly ActivityCategoryId[]
  sortMode?: CompletionSortMode
  sortDirection?: SortDirection
}

export function PackUpgradesPanelCard({
  id,
  characters,
  packUpgradesProgress,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: PackUpgradesPanelCardProps) {
  const phrase = usePhrase()
  if (characters.length === 0) return null

  const title = phrase(packUpgradesPanelCardTitle.slug)
  const isAggregate = selectedCharacterIds.length === 0
  const charNames = new Map(characters.map((c) => [c.id, c.name]))

  const filtered = isAggregate
    ? packUpgradesProgress
    : packUpgradesProgress.filter((p) => selectedCharacterIds.includes(p.characterId))

  const items: CompletionNode[] = [
    {
      key: "pack-upgrades",
      label: title,
      children: filtered.map((p) => ({
        key: p.characterId,
        label: charNames.get(p.characterId) ?? p.characterId,
        count: p.packUpgrades,
        total: p.maxPackUpgrades,
      })),
    },
  ]

  return (
    <CompletionPanelCard
      id={id}
      title={title}
      items={withActivityCategories(items, "characters")}
      filterNode={createNodeFilter(completionFilter ?? [], activityCategoryFilter ?? [])}
      sortMode={sortMode}
      sortDirection={sortDirection}
    />
  )
}
