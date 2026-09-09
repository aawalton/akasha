import type { AchievementCatalogData } from "akasha/temper/capture-shapes/achievement-catalog/achievement-catalog.module.code.ts"
import type { AntiquityLoreCatalogEntry } from "akasha/temper/capture-shapes/antiquity-lore-catalog/antiquity-lore-catalog.module.code.ts"
import type { CadwellCatalogLevel } from "akasha/temper/capture-shapes/cadwell-catalog/cadwell-catalog.module.code.ts"
import type { ClassCatalogEntry } from "akasha/temper/capture-shapes/class-catalog/class-catalog.module.code.ts"
import type { CollectiblesCatalogData } from "akasha/temper/capture-shapes/collectibles-catalog/collectibles-catalog.module.code.ts"
import type { CompanionEquipmentCatalogData } from "akasha/temper/capture-shapes/companion-equipment-catalog/companion-equipment-catalog.module.code.ts"
import type { CompanionSkillCatalogLine } from "akasha/temper/capture-shapes/companion-skill-catalog/companion-skill-catalog.module.code.ts"
import type { CurrencyCatalogEntry } from "akasha/temper/capture-shapes/currency-catalog/currency-catalog.module.code.ts"
import type { FurnitureCatalogData } from "akasha/temper/capture-shapes/furniture-catalog/furniture-catalog.module.code.ts"
import type { InventoryConstantsCatalogData } from "akasha/temper/capture-shapes/inventory-constants-catalog/inventory-constants-catalog.module.code.ts"
import type { ItemSetCatalogEntry } from "akasha/temper/capture-shapes/item-set-catalog/item-set-catalog.module.code.ts"
import type { LoreLibraryCatalogCategory } from "akasha/temper/capture-shapes/lore-library-catalog/lore-library-catalog.module.code.ts"
import type { PoiCatalogZone } from "akasha/temper/capture-shapes/poi-catalog/poi-catalog.module.code.ts"
import type { RecipeCatalogList } from "akasha/temper/capture-shapes/recipe-catalog/recipe-catalog.module.code.ts"
import type { ScribingCatalogData } from "akasha/temper/capture-shapes/scribing-catalog/scribing-catalog.module.code.ts"
import type { SkillCatalogLine } from "akasha/temper/capture-shapes/skill-catalog/skill-catalog.module.code.ts"
import type { TraitResearchCatalogCraftType } from "akasha/temper/capture-shapes/trait-research-catalog/trait-research-catalog.module.code.ts"
import type { TributePatronCatalogEntry } from "akasha/temper/capture-shapes/tribute-catalog/tribute-catalog.module.code.ts"
import type { ZoneCompletionCatalogZone } from "akasha/temper/capture-shapes/zone-completion-catalog/zone-completion-catalog.module.code.ts"

export interface CatalogPayload {
  achievementCatalog?: AchievementCatalogData
  recipeCatalog?: Record<number, RecipeCatalogList>
  loreLibraryCatalog?: Record<number, LoreLibraryCatalogCategory>
  antiquityLoreCatalog?: Record<number, AntiquityLoreCatalogEntry>
  cadwellCatalog?: Record<number, CadwellCatalogLevel>
  itemSetCatalog?: Record<number, ItemSetCatalogEntry>
  scribingCatalog?: ScribingCatalogData
  traitResearchCatalog?: Record<number, TraitResearchCatalogCraftType>
  collectiblesCatalog?: CollectiblesCatalogData

  tributeCatalog?: Record<number, TributePatronCatalogEntry>
  zoneCompletionCatalog?: Record<number, ZoneCompletionCatalogZone>
  poiCatalog?: Record<number, PoiCatalogZone>
  companionEquipmentCatalog?: CompanionEquipmentCatalogData
  currencyCatalog?: Record<number, CurrencyCatalogEntry>
  inventoryConstantsCatalog?: InventoryConstantsCatalogData
  furnitureCatalog?: FurnitureCatalogData
  classCatalog?: Record<number, ClassCatalogEntry>
  companionSkillCatalog?: Record<number, CompanionSkillCatalogLine>
  skillCatalog?: Record<number, SkillCatalogLine>
  completed: boolean
  collectionSkips?: Record<string, string>
  apiVersion?: string
  manifestApiVersion?: number
  lastSeenInvalidateVersion?: number
  perf?: { loadTimeMs: number }
}
