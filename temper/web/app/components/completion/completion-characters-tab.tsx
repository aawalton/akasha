"use client"

import { type BadgeToggleGroupItem } from "@shared/design-badges/components/badge-toggle-group"
import { PanelToggleProvider } from "@shared/design-layout/components/panel-toggle-provider"
import { TabsContent } from "@shared/design-patterns/components/tabs"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import { buildCharacterSummary } from "@temper/player-completion/completion-summary"
import { useMemo } from "react"
import { CharactersTabFilters } from "@/components/completion/characters-tab-filters"
import { CharactersTabPanels } from "@/components/completion/characters-tab-panels"
import type { CharacterSummaryData } from "@temper/player-completion/completion-card-registry"
import type { CharacterProgressData } from "@/components/completion/completion-progress/character-progress"
import { useCompletionToolbar } from "@/components/completion/completion-toolbar-context"

interface CompletionCharactersTabProps {
  active: boolean
  characterProgress: CharacterProgressData
  activityCategoryFilter: readonly ActivityCategoryId[]
  selectedActivity: readonly BadgeToggleGroupItem[]
  activityItems: readonly BadgeToggleGroupItem[]
  character: string | null
  characterItems: readonly BadgeToggleGroupItem[]
  selectedSkillType: readonly BadgeToggleGroupItem[]
  skillTypeItems: readonly BadgeToggleGroupItem[]
  onActivitySelect: (items: readonly BadgeToggleGroupItem[]) => void
  onSkillTypeSelect: (items: readonly BadgeToggleGroupItem[]) => void
  onCharacterChange: (value: string | null) => void
  onCharacterSummaryClick: (key: string) => void
  characterSummary: CharacterSummaryData
}

export function CompletionCharactersTab({
  active,
  characterProgress,
  activityCategoryFilter,
  selectedActivity,
  activityItems,
  character,
  characterItems,
  selectedSkillType,
  skillTypeItems,
  onActivitySelect,
  onSkillTypeSelect,
  onCharacterChange,
  onCharacterSummaryClick,
  characterSummary,
}: CompletionCharactersTabProps) {
  const {
    completionFilter,
    sortMode,
    sortDirection,
    sortOptions,
    search,
    selectedStatus,
    statusItems,
    hasActiveFilters,
    onReset,
    onStatusSelect,
    onSortChange,
    onSearchChange,
  } = useCompletionToolbar()

  const {
    characters,
    characterAchievementProgress,
    cadwellProgress,
    progress,
    morphProgress,
    mountTrainingProgress,
    packUpgradesProgress,
    recipeProgress,
    scribingProgress,
    skillPointsProgress,
    traitResearchProgress,
    questProgress,
    companionQuestProgress,
    companionRapportProgress,
    loreLibraryProgress,
    dailyWritsProgress,
    poiProgress,
    zoneProgress,
  } = characterProgress

  const selectedCharacter = useMemo(() => {
    if (character == null) return null
    return characterItems.find((c) => c.value === character) ?? null
  }, [character, characterItems])

  const handleCharacterSelect = (items: readonly BadgeToggleGroupItem[]) => {
    const newItem = items.find((item) => item.value !== character)
    onCharacterChange(newItem?.value ?? null)
  }

  const selectedCharacterIds = selectedCharacter ? [selectedCharacter.value] : []

  const skillTypeFilter = useMemo(
    () =>
      selectedSkillType
        .map((s) => s.value)
        .filter((v): v is "active" | "ultimate" => v === "active" || v === "ultimate"),
    [selectedSkillType]
  )
  const hasSkillTypeFilter = skillTypeFilter.length > 0

  const filteredCharacterSummary = useMemo(() => {
    if (!selectedCharacter) return characterSummary
    return buildCharacterSummary({
      characters,
      characterAchievementProgress,
      cadwellProgress,
      progress,
      morphProgress,
      mountTrainingProgress,
      packUpgradesProgress,
      recipeProgress,
      scribingProgress,
      skillPointsProgress,
      traitResearchProgress,
      questProgress,
      poiProgress,
      zoneProgress,
      companionQuestProgress,
      companionRapportProgress,
      loreLibraryProgress,
      dailyWritsProgress,
      selectedCharacterIds: [selectedCharacter.value],
    })
  }, [
    selectedCharacter,
    characterSummary,
    characters,
    characterAchievementProgress,
    cadwellProgress,
    progress,
    morphProgress,
    mountTrainingProgress,
    packUpgradesProgress,
    recipeProgress,
    scribingProgress,
    skillPointsProgress,
    traitResearchProgress,
    questProgress,
    poiProgress,
    zoneProgress,
    companionQuestProgress,
    companionRapportProgress,
    loreLibraryProgress,
    dailyWritsProgress,
  ])

  return (
    <TabsContent value="characters">
      <PanelToggleProvider active={active}>
        <div className="flex flex-col gap-6">
          <CharactersTabFilters
            title={selectedCharacter?.label ?? "All Characters"}
            search={search}
            sortOptions={sortOptions}
            sortMode={sortMode}
            sortDirection={sortDirection}
            hasActiveFilters={hasActiveFilters}
            selectedStatus={selectedStatus}
            statusItems={statusItems}
            selectedActivity={selectedActivity}
            activityItems={activityItems}
            selectedCharacter={selectedCharacter}
            characterItems={characterItems}
            selectedSkillType={selectedSkillType}
            skillTypeItems={skillTypeItems}
            onReset={onReset}
            onStatusSelect={onStatusSelect}
            onActivitySelect={onActivitySelect}
            onCharacterSelect={handleCharacterSelect}
            onSkillTypeSelect={onSkillTypeSelect}
            onSortChange={onSortChange}
            onSearchChange={onSearchChange}
          />
          <CharactersTabPanels
            characterProgress={characterProgress}
            selectedCharacterIds={selectedCharacterIds}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
            hasSkillTypeFilter={hasSkillTypeFilter}
            skillTypeFilter={skillTypeFilter}
            filteredCharacterSummary={filteredCharacterSummary}
            onCharacterSummaryClick={onCharacterSummaryClick}
          />
        </div>
      </PanelToggleProvider>
    </TabsContent>
  )
}
