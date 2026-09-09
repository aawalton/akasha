import {
  CHAMPION_TABLE_INDEX,
  CHAMPION_TABLE_STORE,
} from "../destinations-champions-data/destinations-champions-data.module.code.ts"
import {
  FISH_LOCATIONS_INDEX,
  FISH_LOCATIONS_STORE,
} from "../destinations-fish-data/destinations-fish-data.module.code.ts"
import { getCollectiblesData } from "../destinations-lang-strings/destinations-lang-strings.module.code.ts"
import { MUNDUS_STRINGS } from "../destinations-mundus-data/destinations-mundus-data.module.code.ts"
import {
  KEEPS_STORE as KeepsStoreData,
  POIS_STORE,
  SETS_STORE,
} from "../destinations-poi-data/destinations-poi-data.module.code.ts"
import {
  ACH_DATA_INDEX,
  ACH_DATA_STORE,
  QOL_DATA_STORE,
} from "../destinations-shared-data/destinations-shared-data.module.code.ts"
import {
  ACH_IDS as AchIDsData,
  COLLECTIBLE_IDS as CollectibleIDsData,
  FISH_IDS as FishIDsData,
  FISH_LOCS as FishLocsData,
} from "../destinations-shared-data-ids/destinations-shared-data-ids.module.code.ts"

export type AchRow = (number | string)[]
export type ChampionRow = number[]
export type CollectibleRow = (number | string)[]
export type FishRow = number[]

export interface PoiEntry {
  n: string
  t: number
  s?: number
}

export type PoiZoneTable = Record<number, PoiEntry | undefined> & { zoneName?: string }

export interface QolPinData {
  pinName: string
  pinTitle?: string
  pinsType: number
  x: number
  y: number
}

export const AchIndex = ACH_DATA_INDEX
export const AchStore: Record<string, AchRow[] | undefined> = ACH_DATA_STORE
export const AchIDs: Record<number, string | undefined> = AchIDsData

export const DBossIndex = CHAMPION_TABLE_INDEX
export const DBossStore: Record<string, ChampionRow[] | undefined> = CHAMPION_TABLE_STORE

export const PoiStore: Record<number, PoiZoneTable | undefined> = POIS_STORE

export const KeepsStore: Record<number, string | undefined> = KeepsStoreData

export const SetsTable: number[][] = SETS_STORE

export const MundusStore: Record<number, string | undefined> = MUNDUS_STRINGS

export const FishIndex = FISH_LOCATIONS_INDEX
export const FishStore: Record<number, FishRow[] | undefined> = FISH_LOCATIONS_STORE
export const FishIDs: Record<number, string | undefined> = FishIDsData
export const FishLocs: Record<string, number | undefined> = FishLocsData

export const QolStore: Record<number, QolPinData[] | undefined> = QOL_DATA_STORE

export const CollectibleIDs: Record<number, string | undefined> = CollectibleIDsData

const collectibles = getCollectiblesData()
export const CollectibleIndex = collectibles.CollectibleDataIndex
export const CollectibleStore: Record<number, CollectibleRow[] | undefined> =
  collectibles.CollectibleDataStore

function asNumber(value: number | string | undefined): number {
  return value as number
}

function asString(value: number | string | undefined): string {
  return value as string
}

export function rowNumber(row: (number | string)[], oneBasedIndex: number): number {
  return asNumber(row[oneBasedIndex - 1])
}

export function rowString(row: (number | string)[], oneBasedIndex: number): string {
  return asString(row[oneBasedIndex - 1])
}

export function rowValue(
  row: (number | string)[],
  oneBasedIndex: number
): number | string | undefined {
  return row[oneBasedIndex - 1]
}
