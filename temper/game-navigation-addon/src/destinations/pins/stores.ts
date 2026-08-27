import { ChampionTableIndex, ChampionTableStore } from "../data/generated/champions-data.generated"
import {
  FishLocationsIndex,
  FishLocationsStore,
} from "../data/generated/fish-achieve-data.generated"
import { mundusStrings } from "../data/generated/mundus-data.generated"
import {
  KeepsStore as KeepsStoreData,
  POIsStore,
  SetsStore,
} from "../data/generated/poi-data.generated"
import { ACHDataIndex, ACHDataStore, QOLDataStore } from "../data/generated/shared-data.generated"
import {
  AchIDs as AchIDsData,
  CollectibleIDs as CollectibleIDsData,
  FishIDs as FishIDsData,
  FishLocs as FishLocsData,
} from "../data/generated/shared-data-ids-data.generated"
import { getCollectiblesData } from "../lang/register-strings"

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

export const AchIndex = ACHDataIndex
export const AchStore: Record<string, AchRow[] | undefined> = ACHDataStore
export const AchIDs: Record<number, string | undefined> = AchIDsData

export const DBossIndex = ChampionTableIndex
export const DBossStore: Record<string, ChampionRow[] | undefined> = ChampionTableStore

export const PoiStore: Record<number, PoiZoneTable | undefined> = POIsStore

export const KeepsStore: Record<number, string | undefined> = KeepsStoreData

export const SetsTable: number[][] = SetsStore

export const MundusStore: Record<number, string | undefined> = mundusStrings

export const FishIndex = FishLocationsIndex
export const FishStore: Record<number, FishRow[] | undefined> = FishLocationsStore
export const FishIDs: Record<number, string | undefined> = FishIDsData
export const FishLocs: Record<string, number | undefined> = FishLocsData

export const QolStore: Record<number, QolPinData[] | undefined> = QOLDataStore

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
