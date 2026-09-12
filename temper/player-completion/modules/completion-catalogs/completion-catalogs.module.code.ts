import type { CollectibleCatalogCategory } from "akasha/temper/player-completion/completion-collectibles-progress/completion-collectibles-progress.module.code.ts"
import type { PoiZoneCatalogEntry } from "akasha/temper/player-completion/completion-poi-progress/completion-poi-progress.module.code.ts"
import type { QuestCatalogZone } from "akasha/temper/player-completion/completion-quest-progress/completion-quest-progress.module.code.ts"
import type {
  TraitResearchCatalogCraftType,
  TraitResearchCatalogLine,
} from "akasha/temper/player-completion/completion-trait-research-progress/completion-trait-research-progress.module.code.ts"
import type { TributePatronCatalogEntry } from "akasha/temper/player-completion/completion-tribute-progress/completion-tribute-progress.module.code.ts"
import type { ZoneCompletionCatalogZone } from "akasha/temper/player-completion/completion-zone-progress/completion-zone-progress.module.code.ts"
import type { AchievementCategoryCatalogEntry } from "akasha/temper/player-completion/modules/completion-achievement-progress/completion-achievement-progress.module.code.ts"
import type { AntiquityCatalogCategory } from "akasha/temper/player-completion/modules/completion-antiquity-lore-progress/completion-antiquity-lore-progress.module.code.ts"
import type { CadwellLevelCatalogEntry } from "akasha/temper/player-completion/modules/completion-cadwell-lookup/completion-cadwell-lookup.module.code.ts"

export interface CompletionCatalogs {
  achievementCategories: readonly AchievementCategoryCatalogEntry[]
  antiquityCategories: readonly AntiquityCatalogCategory[]
  cadwellLevels: readonly CadwellLevelCatalogEntry[]
  collectibleCategories: readonly CollectibleCatalogCategory[]
  craftTypes: readonly TraitResearchCatalogCraftType[]
  poiZones: readonly PoiZoneCatalogEntry[]
  questZones: readonly QuestCatalogZone[]
  researchLines: readonly TraitResearchCatalogLine[]
  tributePatrons: readonly TributePatronCatalogEntry[]
  zoneCompletionZones: readonly ZoneCompletionCatalogZone[]
}

export const NO_COMPLETION_CATALOGS: CompletionCatalogs = {
  achievementCategories: [],
  antiquityCategories: [],
  cadwellLevels: [],
  collectibleCategories: [],
  craftTypes: [],
  poiZones: [],
  questZones: [],
  researchLines: [],
  tributePatrons: [],
  zoneCompletionZones: [],
}
