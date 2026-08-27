import { CustomPins } from "./custom-pins-config"
import { addPinFilter, makeMapFiltersScroll } from "./map-filters"
import { mapPinAddCallback } from "./map-pin-add"
import { asGlobalTable, asPinDef } from "./narrow"
import type { PinDef } from "./pin-types"
import { registerEvents } from "./register-events"
import { getSavedGlobal, initializeSavedVariables } from "./saved-variables"
import { state } from "./state"
import { getSubzone } from "./subzone"
import { pinTooltipCreator, pinTooltipSupres } from "./tooltips"

function addPin(this: void, pin: number, pinLayout: PinDef): number {
  const tooltipCreator = pinTooltipSupres[pin] === true ? undefined : pinTooltipCreator
  const name = pinLayout.name
  if (pinLayout.size === undefined) {
    const k = pinLayout.k
    if (k === undefined) {
      throw new Error("TemperMapPins: pin layout missing both size and k multiplier")
    }
    pinLayout.size = getSavedGlobal().pinsize * k
  }
  ZO_WorldMap_AddCustomPin(name, () => mapPinAddCallback(pin), undefined, pinLayout, tooltipCreator)
  const rawId = asGlobalTable(_G)[name]
  if (typeof rawId !== "number") {
    throw new Error(`TemperMapPins: pin type '${name}' registered no numeric id`)
  }
  return rawId
}

function registerAllPins(this: void): undefined {
  for (let i = 1; i <= 30; i++) {
    const filter = CustomPins[i]
    if (filter === undefined) continue
    if (filter.section === true) {
      for (const [childKey, childVal] of pairs(filter)) {
        if (typeof childKey !== "number" || !istable(childVal)) continue
        const childDef = asPinDef(childVal)
        if (typeof childDef.name !== "string") continue
        CustomPins[childKey] = childDef
        childDef.filter = i
        const id = addPin(childKey, childDef)
        if (filter.id !== undefined) filter.id[childKey] = id
        state.pinId[childKey] = id
        if (filter.pin !== undefined) filter.pin.push(childKey)
      }
    } else {
      const id = addPin(i, filter)
      if (filter.id !== undefined) filter.id[i] = id
      state.pinId[i] = id
    }
    addPinFilter(i)
  }
}

function registerSlashCommands(this: void): undefined {
  SLASH_COMMANDS["/loc"] = (): undefined => {
    const [x, y] = GetMapPlayerPosition("player")
    const fileName = getSubzone()
    const [xStr] = string.gsub(tostring(math.floor(x * 1000) / 1000), "^0%.", ".")
    const [yStr] = string.gsub(tostring(math.floor(y * 1000) / 1000), "^0%.", ".")
    StartChatInput(`${fileName}={{${xStr},${yStr},${tostring(state.lastAchivement)}}},`)
  }
  SLASH_COMMANDS["/loc1"] = (): undefined => {
    const [x, y] = GetMapPlayerPosition("player")
    const [xStr] = string.gsub(tostring(math.floor(x * 1000) / 1000), "[0][.]", ".")
    const [yStr] = string.gsub(tostring(math.floor(y * 1000) / 1000), "[0][.]", ".")
    StartChatInput(`{${xStr},${yStr},${tostring(state.lastAchivement)}},`)
  }
  SLASH_COMMANDS["/loc2"] = (): undefined => {
    const fileName = getSubzone()
    const [x, y] = GetMapPlayerWaypoint()
    const [formattedCoords] = string.gsub(string.format("%.3f,%.3f", x, y), "0%.", ".")
    StartChatInput(`${fileName}={${formattedCoords}},`)
  }
  SLASH_COMMANDS["/pinsize"] = (raw: string): undefined => {
    const n = tonumber(raw)
    if (n !== undefined && n >= 16 && n <= 40) {
      getSavedGlobal().pinsize = n
      for (const [i, id] of pairs(state.pinId)) {
        const pinData = ZO_MapPin.PIN_DATA[id]
        const def = CustomPins[i]
        const k = def?.k
        if (pinData !== undefined && k !== undefined) {
          pinData.size = n * k
        }
      }
      ZO_WorldMap_RefreshCustomPinsOfType()
    }
  }
}

export function onLoad(this: void): undefined {
  initializeSavedVariables()
  state.pinManager = ZO_WorldMap_GetPinManager()
  registerEvents()
  makeMapFiltersScroll()
  registerAllPins()
  registerSlashCommands()
}
