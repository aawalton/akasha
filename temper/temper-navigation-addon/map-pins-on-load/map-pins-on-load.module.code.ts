import { CUSTOM_PINS } from "../map-pins-config/map-pins-config.module.code.ts"
import { registerEvents } from "../map-pins-events/map-pins-events.module.code.ts"
import {
  addPinFilter,
  makeMapFiltersScroll,
} from "../map-pins-map-filters/map-pins-map-filters.module.code.ts"
import { asGlobalTable, asPinDef } from "../map-pins-narrow/map-pins-narrow.module.code.ts"
import { mapPinAddCallback } from "../map-pins-pin-add/map-pins-pin-add.module.code.ts"
import type { PinDef } from "../map-pins-pin-types/map-pins-pin-types.module.code.ts"
import {
  getSavedGlobal,
  initializeSavedVariables,
} from "../map-pins-saved-variables/map-pins-saved-variables.module.code.ts"
import { STATE } from "../map-pins-state/map-pins-state.module.code.ts"
import { getSubzone } from "../map-pins-subzone/map-pins-subzone.module.code.ts"
import {
  PIN_TOOLTIP_CREATOR,
  PIN_TOOLTIP_SUPRES,
} from "../map-pins-tooltips/map-pins-tooltips.module.code.ts"

function addPin(this: void, pin: number, pinLayout: PinDef): number {
  const tooltipCreator = PIN_TOOLTIP_SUPRES[pin] === true ? undefined : PIN_TOOLTIP_CREATOR
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
    const filter = CUSTOM_PINS[i]
    if (filter === undefined) continue
    if (filter.section === true) {
      for (const [childKey, childVal] of pairs(filter)) {
        if (typeof childKey !== "number" || !istable(childVal)) continue
        const childDef = asPinDef(childVal)
        if (typeof childDef.name !== "string") continue
        CUSTOM_PINS[childKey] = childDef
        childDef.filter = i
        const id = addPin(childKey, childDef)
        if (filter.id !== undefined) filter.id[childKey] = id
        STATE.pinId[childKey] = id
        if (filter.pin !== undefined) filter.pin.push(childKey)
      }
    } else {
      const id = addPin(i, filter)
      if (filter.id !== undefined) filter.id[i] = id
      STATE.pinId[i] = id
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
    StartChatInput(`${fileName}={{${xStr},${yStr},${tostring(STATE.lastAchivement)}}},`)
  }
  SLASH_COMMANDS["/loc1"] = (): undefined => {
    const [x, y] = GetMapPlayerPosition("player")
    const [xStr] = string.gsub(tostring(math.floor(x * 1000) / 1000), "[0][.]", ".")
    const [yStr] = string.gsub(tostring(math.floor(y * 1000) / 1000), "[0][.]", ".")
    StartChatInput(`{${xStr},${yStr},${tostring(STATE.lastAchivement)}},`)
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
      for (const [i, id] of pairs(STATE.pinId)) {
        const pinData = ZO_MapPin.PIN_DATA[id]
        const def = CUSTOM_PINS[i]
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
  STATE.pinManager = ZO_WorldMap_GetPinManager()
  registerEvents()
  makeMapFiltersScroll()
  registerAllPins()
  registerSlashCommands()
}
