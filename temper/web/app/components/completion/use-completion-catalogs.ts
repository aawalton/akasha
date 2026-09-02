"use client"

import { askComposed } from "@akasha/pages-query/store-spelled-asking"
import type { AchievementCategoryCatalogEntry } from "@akasha/temper-player-completion/completion-achievement-progress"
import type { AntiquityCatalogCategory } from "@akasha/temper-player-completion/completion-antiquity-lore-progress"
import type { CadwellLevelCatalogEntry } from "@akasha/temper-player-completion/completion-cadwell-lookup"
import type { CollectibleCatalogCategory } from "@akasha/temper-player-completion/completion-collectibles-progress"
import type { PoiZoneCatalogEntry } from "@akasha/temper-player-completion/completion-poi-progress"
import type { QuestCatalogZone } from "@akasha/temper-player-completion/completion-quest-progress"
import type {
  TraitResearchCatalogCraftType,
  TraitResearchCatalogLine,
} from "@akasha/temper-player-completion/completion-trait-research-progress"
import type { TributePatronCatalogEntry } from "@akasha/temper-player-completion/completion-tribute-progress"
import type { ZoneCompletionCatalogZone } from "@akasha/temper-player-completion/completion-zone-progress"
import { useEffect, useState } from "react"

// Every catalog page type is reference data: it changes when the game does, never while a reader
// is looking. So each is asked once per browser session and held in this module, and a navigation
// inside the app reuses what is already here rather than asking again. `/ask` is a POST, so no
// HTTP cache would have applied to it anyway.
const held = new Map<string, Promise<readonly Record<string, unknown>[]>>()

// Well above the largest catalog, which is temper-achievement-category at 311.
const CEILING = 1000

function rowsOf(pageType: string): Promise<readonly Record<string, unknown>[]> {
  const already = held.get(pageType)
  if (already !== undefined) return already
  const asking = askComposed({ "page-type": pageType, limit: CEILING }).then((asked) =>
    asked.ok ? asked.answer.rows.map((row) => row.values) : []
  )
  held.set(pageType, asking)
  return asking
}

function pick(row: Record<string, unknown>, keys: readonly string[]): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const key of keys) if (row[key] !== undefined) out[key] = row[key]
  return out
}

function entries(
  row: Record<string, unknown>,
  key: string,
  keys: readonly string[]
): readonly Record<string, unknown>[] {
  const value = row[key]
  return Array.isArray(value) ? value.map((one: Record<string, unknown>) => pick(one, keys)) : []
}

// The store answers a page's declared keys under both spellings and stamps each entry with its own
// `id`, none of which these catalog types name. Narrowing to the named keys is what makes the cast
// below true rather than hopeful, and it is also what keeps the rows small.
function slim(
  rows: readonly Record<string, unknown>[],
  keys: readonly string[],
  entryKey: string | null,
  entryKeys: readonly string[]
): readonly Record<string, unknown>[] {
  return rows.map((row) =>
    entryKey === null
      ? pick(row, keys)
      : { ...pick(row, keys), [entryKey]: entries(row, entryKey, entryKeys) }
  )
}

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

const NONE: CompletionCatalogs = {
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

async function askEveryCatalog(): Promise<CompletionCatalogs> {
  const [achievement, antiquity, cadwell, collectible, craft, research, tribute, worldZone] =
    await Promise.all([
      rowsOf("temper-achievement-category"),
      rowsOf("temper-antiquity-category"),
      rowsOf("temper-cadwell-level"),
      rowsOf("temper-collectible-category"),
      rowsOf("temper-craft-type"),
      rowsOf("temper-research-line"),
      rowsOf("temper-tribute-patron"),
      rowsOf("temper-world-zone"),
    ])
  return {
    achievementCategories: slim(
      achievement,
      ["slug", "title", "category", "displayOrder", "parent"],
      "achievements",
      ["esoAchievementId", "name", "achievementPoints", "totalSteps"]
    ) as unknown as readonly AchievementCategoryCatalogEntry[],
    antiquityCategories: slim(antiquity, ["esoAntiquityCategoryId", "title"], "antiquities", [
      "esoAntiquityId",
      "antiquityName",
      "esoAntiquitySetId",
      "totalLoreEntries",
    ]) as unknown as readonly AntiquityCatalogCategory[],
    cadwellLevels: slim(cadwell, ["title", "displayOrder"], "cadwellStops", [
      "zoneIndex",
      "zoneName",
      "stopIndex",
      "poiName",
    ]) as unknown as readonly CadwellLevelCatalogEntry[],
    collectibleCategories: slim(
      collectible,
      ["slug", "title", "esoCategoryIndex", "parent", "displayOrder"],
      "collectibles",
      ["esoCollectibleId", "collectibleName"]
    ) as unknown as readonly CollectibleCatalogCategory[],
    craftTypes: slim(
      craft,
      ["slug", "title", "esoCraftTypeId"],
      null,
      []
    ) as unknown as readonly TraitResearchCatalogCraftType[],
    poiZones: slim(worldZone, ["title", "esoZoneId"], "pois", [
      "poiType",
      "poiTypeLabel",
      "poiIndex",
      "poiName",
    ]) as unknown as readonly PoiZoneCatalogEntry[],
    questZones: slim(worldZone, ["title"], "zoneQuests", [
      "esoQuestId",
      "questName",
    ]) as unknown as readonly QuestCatalogZone[],
    researchLines: slim(research, ["slug", "title", "displayOrder", "parent"], "traits", [
      "traitIndex",
      "traitName",
    ]) as unknown as readonly TraitResearchCatalogLine[],
    tributePatrons: slim(tribute, ["title", "esoPatronId", "esoCollectibleId"], "cards", [
      "cardIndex",
      "baseCardName",
      "upgradeCardName",
    ]) as unknown as readonly TributePatronCatalogEntry[],
    zoneCompletionZones: slim(worldZone, ["esoZoneId", "title"], "zoneCompletionActivities", [
      "completionType",
      "completionTypeLabel",
      "activityIndex",
      "esoActivityId",
      "activityName",
    ]) as unknown as readonly ZoneCompletionCatalogZone[],
  }
}

export function useCompletionCatalogs(): { catalogs: CompletionCatalogs; isLoading: boolean } {
  const [catalogs, setCatalogs] = useState<CompletionCatalogs | null>(null)

  useEffect(() => {
    let watching = true
    void askEveryCatalog().then((answered) => {
      if (watching) setCatalogs(answered)
    })
    return () => {
      watching = false
    }
  }, [])

  return { catalogs: catalogs ?? NONE, isLoading: catalogs === null }
}
