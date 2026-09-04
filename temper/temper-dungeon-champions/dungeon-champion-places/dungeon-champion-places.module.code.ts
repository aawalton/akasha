import { DUNGEON_CHAMPION_PLACES_00 } from "../dungeon-champion-places-00/dungeon-champion-places-00.module.code.ts"
import { DUNGEON_CHAMPION_PLACES_01 } from "../dungeon-champion-places-01/dungeon-champion-places-01.module.code.ts"

export const DUNGEON_CHAMPIONS_DATA: Record<string, Record<string, number[][]>> = {
  ...DUNGEON_CHAMPION_PLACES_00,
  ...DUNGEON_CHAMPION_PLACES_01,
}

export const DUNGEON_CHAMPIONS_DATA_ID: Record<number, number[][]> = {
  [1943]: [
    [0.5929, 0.3299, 2996, 1],
    [0.331, 0.7107, 2996, 2],
  ],
  [1958]: [
    [0.2623, 0.6136, 2996, 3],
    [0.527, 0.1814, 2996, 4],
  ],
  [1959]: [
    [0.4616, 0.7475, 2996, 5],
    [0.6193, 0.2794, 2994, 1],
  ],
  [2171]: [
    [0.4499, 0.484, 3283, 1],
    [0.3863, 0.6335, 3284, 1],
    [0.5498, 0.3423, 3284, 2],
    [0.6934, 0.6988, 3284, 3],
    [0.8264, 0.4838, 3284, 4],
    [0.686, 0.2527, 3284, 5],
  ],
}
