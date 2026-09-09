import { ACHIEVEMENT_IDS } from "../dungeon-champion-achievement-ids/dungeon-champion-achievement-ids.module.code.ts"
import {
  DUNGEON_CHAMPIONS_DATA,
  DUNGEON_CHAMPIONS_DATA_ID,
} from "../dungeon-champion-places/dungeon-champion-places.module.code.ts"

export type ChampionPin = readonly [
  x: number,
  y: number,
  achievementId: number,
  criterionIndex: number,
  moreInfo?: number,
]

export type ChampionPinList = readonly ChampionPin[]

export function asChampionPin(value: unknown): ChampionPin {
  return value as ChampionPin
}

function asChampionPinList(value: unknown): ChampionPinList {
  return value as ChampionPinList
}

export function getAchievementIDs(): Record<number, boolean> {
  return ACHIEVEMENT_IDS
}

export function getLocalData(
  zone: string | undefined,
  subzone: string | undefined,
  mapid: number | undefined
): ChampionPinList | undefined {
  if (mapid !== undefined) {
    const byId = DUNGEON_CHAMPIONS_DATA_ID[mapid]
    if (byId !== undefined) {
      return asChampionPinList(byId)
    }
  }
  if (typeof zone === "string" && typeof subzone === "string") {
    const byZone = DUNGEON_CHAMPIONS_DATA[zone]?.[subzone]
    if (byZone !== undefined) {
      return asChampionPinList(byZone)
    }
  }
  return undefined
}
