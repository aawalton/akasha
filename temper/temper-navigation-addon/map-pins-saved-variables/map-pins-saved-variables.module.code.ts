import {
  SV_CHESTDATA_NAME,
  SV_GLOBAL_NAME,
  SV_THIEVESTROVE_NAME,
  SV_VARS_NAME,
} from "../map-pins-names/map-pins-names.module.code.ts"

export type ChestCoordList = (readonly number[])[]

export interface SavedVarsData {
  [pinIndex: number]: boolean | undefined
  TimeBreachClosed: Record<
    string | number,
    Record<string | number, boolean | undefined> | undefined
  >
}

export interface SavedGlobalData {
  pinsize: number
  dm?: boolean
}

export type ChestDataTable = Record<string | number, ChestCoordList | undefined>

const DEFAULT_VARS: SavedVarsData = {
  [1]: true,
  [2]: true,
  [3]: true,
  [4]: false,
  [5]: true,
  [7]: true,
  [8]: true,
  [9]: false,
  [10]: false,
  [11]: false,
  [12]: false,
  [13]: false,
  [14]: false,
  [15]: false,
  [16]: false,
  [17]: false,
  [18]: false,
  [19]: false,
  [21]: true,
  TimeBreachClosed: {},
}

const DEFAULT_GLOBAL: SavedGlobalData = { pinsize: 20 }

const DEFAULT_CHEST_DATA: ChestDataTable = {}

let savedVarsInstance: SavedVarsData | undefined
let savedGlobalInstance: SavedGlobalData | undefined
let chestDataInstance: ChestDataTable | undefined
let thievesTroveInstance: ChestDataTable | undefined

export function initializeSavedVariables(this: void): undefined {
  const vars: SavedVarsData = ZO_SavedVars.New(SV_VARS_NAME, 2, undefined, DEFAULT_VARS)
  chestDataInstance = ZO_SavedVars.NewAccountWide(
    SV_CHESTDATA_NAME,
    2,
    undefined,
    DEFAULT_CHEST_DATA
  )
  thievesTroveInstance = ZO_SavedVars.NewAccountWide(
    SV_THIEVESTROVE_NAME,
    2,
    undefined,
    DEFAULT_CHEST_DATA
  )
  savedGlobalInstance = ZO_SavedVars.NewAccountWide(SV_GLOBAL_NAME, 1, undefined, DEFAULT_GLOBAL)
  vars[4] = false
  savedVarsInstance = vars
  return undefined
}

export function getSavedVars(this: void): SavedVarsData {
  if (savedVarsInstance === undefined) {
    throw new Error("TemperMapPins: saved variables accessed before OnLoad")
  }
  return savedVarsInstance
}

export function getSavedGlobal(this: void): SavedGlobalData {
  if (savedGlobalInstance === undefined) {
    throw new Error("TemperMapPins: saved global accessed before OnLoad")
  }
  return savedGlobalInstance
}

export function getChestData(this: void): ChestDataTable {
  if (chestDataInstance === undefined) {
    throw new Error("TemperMapPins: chest data accessed before OnLoad")
  }
  return chestDataInstance
}

export function getThievesTrove(this: void): ChestDataTable {
  if (thievesTroveInstance === undefined) {
    throw new Error("TemperMapPins: thieves trove accessed before OnLoad")
  }
  return thievesTroveInstance
}
