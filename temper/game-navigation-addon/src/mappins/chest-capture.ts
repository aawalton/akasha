import { CustomPins } from "./custom-pins-config"
import { type NestedPinTable, type SubzonePinTable } from "./data/data-types"
import { ChestData } from "./data/generated/chest-data.generated"
import { TimeBreach } from "./data/generated/time-breach-data.generated"
import { IsChest, IsThievesTrove, IsTimeBreach } from "./detection-tables"
import { getChestData, getSavedVars, getThievesTrove } from "./saved-variables"
import { getPinTypeId, state } from "./state"
import { getSubzone } from "./subzone"

const chestData: NestedPinTable = ChestData
const timeBreach: SubzonePinTable = TimeBreach

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
  if (savedVars[7] === true && IsThievesTrove[targetName] === true) {
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
  } else if (savedVars[7] === true && IsChest[targetName] === true) {
    state.chestsLooted += 1
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
  } else if (savedVars[15] === true && IsTimeBreach[targetName] === true) {
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
            const pin = CustomPins[15]
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
