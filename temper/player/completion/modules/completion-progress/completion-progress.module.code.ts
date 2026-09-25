import type {
  AccountCompletion,
  SkillPointProgress,
} from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"

interface LoreBook {
  name: string
  known: boolean
}

interface LoreCollection {
  name: string
  books: Record<number, LoreBook>
}

export interface LoreCategory {
  name: string
  collections: Record<number, LoreCollection>
}

interface Recipe {
  name: string
  known: boolean
  craftingType?: number
}

export interface RecipeList {
  name: string
  recipes: Record<number, Recipe>
}

export function emptySkillPointProgress(): SkillPointProgress {
  return {
    total: 0,
    unassigned: 0,
    level: 0,
    mainQuests: 0,
    tutorial: 0,
    foliumDiscognitum: 0,
    pvpRank: 0,
    maelstromArena: 0,
    endlessArchive: 0,
    skyshardPoints: 0,
    totalSkyshards: 0,
    zoneQuestTotal: 0,
    groupDungeonTotal: 0,
    publicDungeonTotal: 0,
    skyshards: {},
    zoneQuests: {},
    groupDungeons: {},
    publicDungeons: {},
  }
}

export interface AntiquityLoreProgress {
  name: string
  categoryId: number
  categoryName: string
  setId: number
  loreEntriesAcquired: number
  totalLoreEntries: number
}

export const TOTAL_GRAND_MASTER_STATIONS = 83

export function unlockedCollectibleIds(
  completion: AccountCompletion | null | undefined
): Set<number> {
  return new Set(completion?.collectibles)
}
