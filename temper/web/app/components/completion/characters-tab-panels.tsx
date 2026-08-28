import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import { SkillMorphsProgressPanelCard } from "@temper/player-completion-skills-morphs-ui/skill-morphs-progress-panel-card"
import type { CompletionFilter, CompletionSortMode } from "@temper/player-completion-ui/completion-panel-card"
import { AllianceRankPanelCard } from "@/components/completion/alliance-rank-panel-card"
import { CadwellProgressPanelCard } from "@/components/completion/cadwell-progress-panel-card"
import { CharacterAchievementsPanelCard } from "@/components/completion/character-achievements-panel-card"
import { CharacterCompanionRapportPanelCard } from "@/components/completion/character-companion-rapport-panel-card"
import { CharacterLevelPanelCard } from "@/components/completion/character-level-panel-card"
import { CharactersSummaryPanelCard } from "@/components/completion/characters-summary-panel-card"
import { CompanionQuestsPanelCard } from "@/components/completion/companion-quests-panel-card"
import type { CharacterSummaryData } from "@temper/player-completion/completion-card-registry"
import type { CharacterProgressData } from "@/components/completion/completion-progress/character-progress"
import { LoreLibraryProgressPanelCard } from "@/components/completion/lore-library-progress-panel-card"
import { MountTrainingPanelCard } from "@/components/completion/mount-training-panel-card"
import { PackUpgradesPanelCard } from "@/components/completion/pack-upgrades-panel-card"
import { PoiProgressPanelCard } from "@/components/completion/poi-progress-panel-card"
import { QuestProgressPanelCard } from "@/components/completion/quest-progress-panel-card"
import { RecipesProgressPanelCard } from "@/components/completion/recipes-progress-panel-card"
import { ScribingKnowledgeProgressPanelCard } from "@/components/completion/scribing-knowledge-progress-panel-card"
import { SkillLinesProgressPanelCard } from "@/components/completion/skill-lines-progress-panel-card"
import { SkillPointsProgressPanelCard } from "@/components/completion/skill-points-progress-panel-card"
import { TraitResearchProgressPanelCard } from "@/components/completion/trait-research-progress-panel-card"
import { ZoneCompletionProgressPanelCard } from "@/components/completion/zone-completion-progress-panel-card"

interface CharactersTabPanelsProps {
  characterProgress: CharacterProgressData
  selectedCharacterIds: readonly string[]
  completionFilter: CompletionFilter
  activityCategoryFilter: readonly ActivityCategoryId[]
  sortMode: CompletionSortMode
  sortDirection: SortDirection
  hasSkillTypeFilter: boolean
  skillTypeFilter: readonly ("active" | "ultimate")[]
  filteredCharacterSummary: CharacterSummaryData
  onCharacterSummaryClick: (key: string) => void
}

export function CharactersTabPanels({
  characterProgress,
  selectedCharacterIds,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
  hasSkillTypeFilter,
  skillTypeFilter,
  filteredCharacterSummary,
  onCharacterSummaryClick,
}: CharactersTabPanelsProps) {
  const {
    rosterSize,
    measuredCharacterCount,
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
    poiProgress,
    zoneProgress,
  } = characterProgress

  const unsyncedCharacterCount = rosterSize - measuredCharacterCount

  return (
    <>
      {unsyncedCharacterCount > 0 && (
        <p className="text-secondary text-sm">
          Measured across {measuredCharacterCount} of {rosterSize} characters. The{" "}
          {unsyncedCharacterCount} not yet synced {unsyncedCharacterCount === 1 ? "is" : "are"}{" "}
          excluded from these figures, not counted as zero.
        </p>
      )}
      <ResponsiveColumns hasSummaryPanel>
        <CharactersSummaryPanelCard
          summary={filteredCharacterSummary}
          completionFilter={completionFilter}
          sortMode={sortMode}
          sortDirection={sortDirection}
          onItemClick={onCharacterSummaryClick}
          collapseProtected
        />
        {hasSkillTypeFilter ? null : (
          <AllianceRankPanelCard
            id="alliance-rank"
            characters={characters}
            selectedCharacterIds={selectedCharacterIds}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
          />
        )}
        {hasSkillTypeFilter ? null : (
          <CharacterAchievementsPanelCard
            id="character-achievements"
            characters={characters}
            achievementProgress={characterAchievementProgress}
            selectedCharacterIds={selectedCharacterIds}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
          />
        )}
        {hasSkillTypeFilter ? null : (
          <CadwellProgressPanelCard
            id="cadwells-almanac"
            characters={characters}
            cadwellProgress={cadwellProgress}
            selectedCharacterIds={selectedCharacterIds}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
          />
        )}
        {hasSkillTypeFilter ? null : (
          <CharacterLevelPanelCard
            id="character-level"
            characters={characters}
            selectedCharacterIds={selectedCharacterIds}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
          />
        )}
        {hasSkillTypeFilter ? null : (
          <CompanionQuestsPanelCard
            id="companion-quests"
            characters={characters}
            questProgress={companionQuestProgress}
            selectedCharacterIds={selectedCharacterIds}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
          />
        )}
        {hasSkillTypeFilter ? null : (
          <CharacterCompanionRapportPanelCard
            id="companion-rapport-character"
            characters={characters}
            companionRapportProgress={companionRapportProgress}
            selectedCharacterIds={selectedCharacterIds}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
          />
        )}
        {hasSkillTypeFilter ? null : (
          <RecipesProgressPanelCard
            id="recipes"
            characters={characters}
            recipeProgress={recipeProgress}
            selectedCharacterIds={selectedCharacterIds}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
          />
        )}
        {hasSkillTypeFilter ? null : (
          <TraitResearchProgressPanelCard
            id="trait-research"
            characters={characters}
            traitResearchProgress={traitResearchProgress}
            selectedCharacterIds={selectedCharacterIds}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
          />
        )}
        {hasSkillTypeFilter ? null : (
          <LoreLibraryProgressPanelCard
            id="lore-library-character"
            characters={characters}
            loreLibraryProgress={loreLibraryProgress}
            selectedCharacterIds={selectedCharacterIds}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
          />
        )}
        {hasSkillTypeFilter ? null : (
          <MountTrainingPanelCard
            id="mount-training"
            characters={characters}
            mountTrainingProgress={mountTrainingProgress}
            selectedCharacterIds={selectedCharacterIds}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
          />
        )}
        {hasSkillTypeFilter ? null : (
          <PackUpgradesPanelCard
            id="pack-upgrades"
            characters={characters}
            packUpgradesProgress={packUpgradesProgress}
            selectedCharacterIds={selectedCharacterIds}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
          />
        )}
        {hasSkillTypeFilter ? null : (
          <PoiProgressPanelCard
            id="points-of-interest"
            characters={characters}
            poiProgress={poiProgress}
            selectedCharacterIds={selectedCharacterIds}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
          />
        )}
        {hasSkillTypeFilter ? null : (
          <QuestProgressPanelCard
            id="quests"
            characters={characters}
            questProgress={questProgress}
            selectedCharacterIds={selectedCharacterIds}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
          />
        )}
        {hasSkillTypeFilter ? null : (
          <SkillLinesProgressPanelCard
            id="skill-lines"
            characters={characters}
            progress={progress}
            selectedCharacterIds={selectedCharacterIds}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
          />
        )}
        <SkillMorphsProgressPanelCard
          id="skill-morphs"
          characters={characters}
          morphProgress={morphProgress}
          selectedCharacterIds={selectedCharacterIds}
          completionFilter={completionFilter}
          activityCategoryFilter={activityCategoryFilter}
          skillTypeFilter={skillTypeFilter}
          sortMode={sortMode}
          sortDirection={sortDirection}
        />
        {hasSkillTypeFilter ? null : (
          <SkillPointsProgressPanelCard
            id="skill-points"
            characters={characters}
            skillPointsProgress={skillPointsProgress}
            selectedCharacterIds={selectedCharacterIds}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
          />
        )}
        {hasSkillTypeFilter ? null : (
          <ScribingKnowledgeProgressPanelCard
            id="scribing-knowledge"
            characters={characters}
            scribingProgress={scribingProgress}
            selectedCharacterIds={selectedCharacterIds}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
          />
        )}
        {hasSkillTypeFilter ? null : (
          <ZoneCompletionProgressPanelCard
            id="zone-completion"
            characters={characters}
            zoneProgress={zoneProgress}
            selectedCharacterIds={selectedCharacterIds}
            completionFilter={completionFilter}
            activityCategoryFilter={activityCategoryFilter}
            sortMode={sortMode}
            sortDirection={sortDirection}
          />
        )}
      </ResponsiveColumns>
    </>
  )
}
