import type { SkyShardsDefaults } from "../skyshards-constants/skyshards-constants.module.code.ts"
import type { SkyshardPin } from "../skyshards-types/skyshards-types.module.code.ts"

export interface ConsoleState {
  db: SkyShardsDefaults | undefined
  mainworldColor: ZoColorDef | undefined
  collectedSkyShards: number
  totalSkyShards: number
  lastZone: string
  skyshards: readonly SkyshardPin[] | undefined
}

export const CONSOLE_STATE: ConsoleState = {
  db: undefined,
  mainworldColor: undefined,
  collectedSkyShards: 0,
  totalSkyShards: 1,
  lastZone: "",
  skyshards: undefined,
}

export function getDb(this: void): SkyShardsDefaults {
  const db = CONSOLE_STATE.db
  if (db == null) {
    throw new Error("TemperSkyShards: db accessed before OnLoad")
  }
  return db
}
