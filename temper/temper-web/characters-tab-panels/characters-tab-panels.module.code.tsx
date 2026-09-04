import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import type { SortDirection } from "@akasha/design-patterns/sort-types"
import type { ActivityCategoryId } from "@akasha/temper-player-completion/activity-categories"
import type { CharacterSummaryData } from "@akasha/temper-player-completion/completion-card-registry"
import { SkillMorphsProgressPanelCard } from "@akasha/temper-player-completion-skills-morphs-ui/skill-morphs-progress-panel-card"
import type {
  CompletionFilter,
  CompletionSortMode,
} from "@akasha/temper-player-completion-ui/completion-panel-card"
import { AllianceRankPanelCard } from "../alliance-rank-panel-card/alliance-rank-panel-card.module.code.tsx"
import { CadwellProgressPanelCard } from "../cadwell-progress-panel-card/cadwell-progress-panel-card.module.code.tsx"
import { CharacterAchievementsPanelCard } from "../character-achievements-panel-card/character-achievements-panel-card.module.code.tsx"
import { CharacterCompanionRapportPanelCard } from "../character-companion-rapport-panel-card/character-companion-rapport-panel-card.module.code.tsx"
import { CharacterLevelPanelCard } from "../character-level-panel-card/character-level-panel-card.module.code.tsx"
import type { CharacterProgressData } from "../character-progress/character-progress.module.code.ts"
import { CharactersSummaryPanelCard } from "../characters-summary-panel-card/characters-summary-panel-card.module.code.tsx"
import { CompanionQuestsPanelCard } from "../companion-quests-panel-card/companion-quests-panel-card.module.code.tsx"
import { LoreLibraryProgressPanelCard } from "../lore-library-progress-panel-card/lore-library-progress-panel-card.module.code.tsx"
import { MountTrainingPanelCard } from "../mount-training-panel-card/mount-training-panel-card.module.code.tsx"
import { PackUpgradesPanelCard } from "../pack-upgrades-panel-card/pack-upgrades-panel-card.module.code.tsx"
import { PoiProgressPanelCard } from "../poi-progress-panel-card/poi-progress-panel-card.module.code.tsx"
import { QuestProgressPanelCard } from "../quest-progress-panel-card/quest-progress-panel-card.module.code.tsx"
import { RecipesProgressPanelCard } from "../recipes-progress-panel-card/recipes-progress-panel-card.module.code.tsx"
import { ScribingKnowledgeProgressPanelCard } from "../scribing-knowledge-progress-panel-card/scribing-knowledge-progress-panel-card.module.code.tsx"
import { SkillLinesProgressPanelCard } from "../skill-lines-progress-panel-card/skill-lines-progress-panel-card.module.code.tsx"
import { SkillPointsProgressPanelCard } from "../skill-points-progress-panel-card/skill-points-progress-panel-card.module.code.tsx"
import { TraitResearchProgressPanelCard } from "../trait-research-progress-panel-card/trait-research-progress-panel-card.module.code.tsx"
import { ZoneCompletionProgressPanelCard } from "../zone-completion-progress-panel-card/zone-completion-progress-panel-card.module.code.tsx"

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
    characterAchievementTally,
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
            characterAchievementTally={characterAchievementTally}
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
