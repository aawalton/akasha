import { scrollToCard } from "@shared/design-layout/utils/scroll-to-card"
import type { SortDirection } from "@shared/design-patterns/utils/sort-types"
import { ResponsiveColumns } from "@shared/design-layout/components/responsive-columns"
import type { ActivityCategoryId } from "@temper/player-completion/activity-category-data"
import { SubclassingSkillMorphsPanelCard } from "@temper/player-completion-skills-morphs-ui/subclassing-skill-morphs-panel-card"
import type { CompletionFilter, CompletionSortMode } from "@temper/player-completion-ui/completion-panel-card"
import { AccountAchievementsPanelCard } from "@/components/completion/account-achievements-panel-card"
import { AccountCollectiblesPanelCard } from "@/components/completion/account-collectibles-panel-card"
import { AccountPoiPanelCard } from "@/components/completion/account-poi-panel-card"
import { AccountQuestsPanelCard } from "@/components/completion/account-quests-panel-card"
import { AccountRecipesPanelCard } from "@/components/completion/account-recipes-panel-card"
import { AccountScribingKnowledgePanelCard } from "@/components/completion/account-scribing-knowledge-panel-card"
import { AccountSummaryPanelCard } from "@/components/completion/account-summary-panel-card"
import { AccountTraitResearchPanelCard } from "@/components/completion/account-trait-research-panel-card"
import { AccountTributePanelCard } from "@/components/completion/account-tribute-panel-card"
import { AccountZoneCompletionPanelCard } from "@/components/completion/account-zone-completion-panel-card"
import { AntiquityLorePanelCard } from "@/components/completion/antiquity-lore-panel-card"
import { BankUpgradesPanelCard } from "@/components/completion/bank-upgrades-panel-card"
import { ChampionPointsPanelCard } from "@/components/completion/champion-points-panel-card"
import type { AccountSummaryData } from "@temper/player-completion/completion-card-registry"
import type { AccountProgressData } from "@/components/completion/completion-progress/account-progress"
import { GrandMasterStationsPanelCard } from "@/components/completion/grand-master-stations-panel-card"
import { ItemSetsProgressPanelCard } from "@/components/completion/item-sets-progress-panel-card"
import { LoreLibraryPanelCard } from "@/components/completion/lore-library-panel-card"
import { SubclassingSkillLinesPanelCard } from "@/components/completion/subclassing-skill-lines-panel-card"

interface AccountPanelGridProps {
  accountSummary: AccountSummaryData
  accountProgress: AccountProgressData
  completionFilter: CompletionFilter
  activityCategoryFilter: readonly ActivityCategoryId[]
  sortMode: CompletionSortMode
  sortDirection: SortDirection
}

export function AccountPanelGrid({
  accountSummary,
  accountProgress,
  completionFilter,
  activityCategoryFilter,
  sortMode,
  sortDirection,
}: AccountPanelGridProps) {
  const {
    accountAchievementProgress,
    antiquityLoreProgress,
    bankUpgrade,
    championPointsEarned,
    collectiblesProgress,
    grandMasterStations,
    recipeUnion,
    traitResearchUnion,
    itemSetProgress,
    loreProgress,
    poiUnion,
    questUnion,
    scribingUnion,
    subclassingSkillLines,
    subclassingSkillMorphs,
    tributeProgress,
    zoneCompletionUnion,
  } = accountProgress

  return (
    <ResponsiveColumns hasSummaryPanel>
      <AccountSummaryPanelCard
        summary={accountSummary}
        completionFilter={completionFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
        onItemClick={(key) => scrollToCard(String(key), false)}
        collapseProtected
      />
      <AccountAchievementsPanelCard
        id="account-achievements"
        achievementProgress={accountAchievementProgress}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <AntiquityLorePanelCard
        id="antiquity-lore"
        antiquityLoreProgress={antiquityLoreProgress}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <BankUpgradesPanelCard
        id="bank-upgrades"
        bankUpgrade={bankUpgrade}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <ChampionPointsPanelCard
        id="champion-points"
        championPointsEarned={championPointsEarned}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <AccountCollectiblesPanelCard
        id="collectibles"
        collectiblesProgress={collectiblesProgress}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <GrandMasterStationsPanelCard
        id="grand-master-stations"
        grandMasterStations={grandMasterStations}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <AccountRecipesPanelCard
        id="account-recipes"
        recipeUnion={recipeUnion}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <AccountTraitResearchPanelCard
        id="account-trait-research"
        traitResearchUnion={traitResearchUnion}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <ItemSetsProgressPanelCard
        id="item-sets"
        itemSetProgress={itemSetProgress}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <LoreLibraryPanelCard
        id="lore-library"
        loreProgress={loreProgress}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />

      <AccountPoiPanelCard
        id="account-points-of-interest"
        poiUnion={poiUnion}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <AccountQuestsPanelCard
        id="account-quests"
        questUnion={questUnion}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <AccountScribingKnowledgePanelCard
        id="account-scribing-knowledge"
        scribingUnion={scribingUnion}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <SubclassingSkillLinesPanelCard
        id="subclassing-skill-lines"
        subclassingSkillLines={subclassingSkillLines}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <SubclassingSkillMorphsPanelCard
        id="subclassing-skill-morphs"
        subclassingSkillMorphs={subclassingSkillMorphs}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <AccountTributePanelCard
        id="tales-of-tribute"
        tributeProgress={tributeProgress}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
      <AccountZoneCompletionPanelCard
        id="account-zone-completion"
        zoneCompletionUnion={zoneCompletionUnion}
        completionFilter={completionFilter}
        activityCategoryFilter={activityCategoryFilter}
        sortMode={sortMode}
        sortDirection={sortDirection}
      />
    </ResponsiveColumns>
  )
}
