import { CHEST_DATA } from "../map-pins-chests/map-pins-chests.module.code.ts"
import { CUSTOM_PINS } from "../map-pins-config/map-pins-config.module.code.ts"
import type {
  NestedPinTable,
  SubzonePinTable,
} from "../map-pins-data-types/map-pins-data-types.module.code.ts"
import {
  IS_CHEST,
  IS_THIEVES_TROVE,
  IS_TIME_BREACH,
} from "../map-pins-detection-tables/map-pins-detection-tables.module.code.ts"
import {
  getChestData,
  getSavedVars,
  getThievesTrove,
} from "../map-pins-saved-variables/map-pins-saved-variables.module.code.ts"
import { getPinTypeId, STATE } from "../map-pins-state/map-pins-state.module.code.ts"
import { getSubzone } from "../map-pins-subzone/map-pins-subzone.module.code.ts"
import { TIME_BREACH } from "../map-pins-time-breach/map-pins-time-breach.module.code.ts"

const chestData: NestedPinTable = CHEST_DATA
const timeBreach: SubzonePinTable = TIME_BREACH

function isNear(
  this: void,
  data: readonly (number | string)[],
  x: number,
  y: number,
  delta: number
): boolean {
  const dx = data[0]
  const dy = data[1]
  if (typeof dx !== "number" || typeof dy !== "number") return false
  return math.abs(dx - x) < delta && math.abs(dy - y) < delta
}

function checkChestData(this: void, x: number, y: number, zone: string, subzone: boolean): boolean {
  if (zone === "") return false
  const delta = subzone ? 0.01 : 0.003
  const mapData = chestData[zone]
  if (mapData !== undefined) {
    for (const [, chData] of pairs(mapData)) {
      for (const data of chData) {
        if (isNear(data, x, y, delta)) return true
      }
    }
  }

  const custom = getChestData()[zone]
  if (custom !== undefined) {
    for (const data of custom) {
      if (isNear(data, x, y, delta)) return true
    }
  }

  return false
}

function checkThievesTrove(this: void, x: number, y: number, zone: string): boolean {
  if (zone === "") return false
  const delta = 0.014
  const mapData = chestData[zone]
  if (mapData !== undefined) {
    for (const [, chData] of pairs(mapData)) {
      for (const data of chData) {
        if (isNear(data, x, y, delta)) return true
      }
    }
  }
  const custom = getThievesTrove()[zone]
  if (custom !== undefined) {
    for (const data of custom) {
      if (isNear(data, x, y, delta)) return true
    }
  }
  return false
}

function fmtCoord(this: void, c: number): string {
  return string.format("%05.02f", zo_round(c * 10000) / 100)
}

export function onInteract(
  this: void,
  _eventCode: number,
  result: number,
  targetName: string
): undefined {
  if (result !== CLIENT_INTERACT_RESULT_SUCCESS) return
  const savedVars = getSavedVars()
  if (savedVars[7] === true && IS_THIEVES_TROVE[targetName] === true) {
    const zone = getSubzone()
    if (zone !== "") {
      let [x, y] = GetMapPlayerPosition("player")
      x = math.floor(x * 10000) / 10000
      y = math.floor(y * 10000) / 10000
      if (!checkThievesTrove(x, y, zone)) {
        const trove = getThievesTrove()
        if (trove[zone] === undefined) trove[zone] = []
        const list = trove[zone]
        if (list !== undefined) list.push([x, y])
        d("New thieves trove found at " + fmtCoord(x) + "x" + fmtCoord(y))
      }
    }
  } else if (savedVars[7] === true && IS_CHEST[targetName] === true) {
    STATE.chestsLooted += 1
    const zone = getSubzone()
    if (zone !== "") {
      let [x, y] = GetMapPlayerPosition("player")
      x = math.floor(x * 10000) / 10000
      y = math.floor(y * 10000) / 10000
      const subzone =
        GetMapType() === MAPTYPE_SUBZONE || GetMapContentType() === MAP_CONTENT_DUNGEON
      if (!checkChestData(x, y, zone, subzone)) {
        const chest = getChestData()
        if (chest[zone] === undefined) chest[zone] = []
        const list = chest[zone]
        if (list !== undefined) list.push([x, y])
        d("New chest found at " + fmtCoord(x) + "x" + fmtCoord(y))
      }
    }
  } else if (savedVars[15] === true && IS_TIME_BREACH[targetName] === true) {
    const zone = getSubzone()
    if (zone !== "") {
      let [x, y] = GetMapPlayerPosition("player")
      x = math.floor(x * 10000) / 10000
      y = math.floor(y * 10000) / 10000
      const delta = 0.03
      const mapData = timeBreach[zone]
      if (mapData !== undefined) {
        for (const [i, data] of ipairs(mapData)) {
          if (isNear(data, x, y, delta)) {
            const closed = savedVars.TimeBreachClosed
            if (closed[zone] === undefined) closed[zone] = {}
            const zoneClosed = closed[zone]
            if (zoneClosed !== undefined) zoneClosed[i] = true
            ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(15))
            const pin = CUSTOM_PINS[15]
            if (pin !== undefined && COMPASS_PINS !== undefined) COMPASS_PINS.RefreshPins(pin.name)
          }
        }
      }
    }
  }
}

export function trackChestsRange(this: void): undefined {
  ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(7))
}
