import type { SkyShardsDefaults } from "../constants"
import type { SkyshardPin } from "../data/types"

export interface ConsoleState {
  db: SkyShardsDefaults | undefined
  mainworldColor: ZoColorDef | undefined
  collectedSkyShards: number
  totalSkyShards: number
  lastZone: string
  skyshards: readonly SkyshardPin[] | undefined
}

export const consoleState: ConsoleState = {
  db: undefined,
  mainworldColor: undefined,
  collectedSkyShards: 0,
  totalSkyShards: 1,
  lastZone: "",
  skyshards: undefined,
}

export function getDb(this: void): SkyShardsDefaults {
  const db = consoleState.db
  if (db == null) {
    throw new Error("TemperSkyShards: db accessed before OnLoad")
  }
  return db
}
