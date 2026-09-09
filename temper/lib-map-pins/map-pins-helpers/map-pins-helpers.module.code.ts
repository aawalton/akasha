import type { GlobalTable } from "../map-pins-casts/map-pins-casts.module.code.ts"
import { asPinTypeId } from "../map-pins-casts/map-pins-casts.module.code.ts"
import {
  LIBMAPPINS_AVA_IMPERIAL_MAPGROUP,
  LIBMAPPINS_AVA_MAPGROUP,
  LIBMAPPINS_BATTLEGROUND_MAPGROUP,
  LIBMAPPINS_GLOBAL_MAPGROUP,
  LIBMAPPINS_PVE_MAPGROUP,
} from "../map-pins-constants/map-pins-constants.module.code.ts"
import type { Lib } from "../map-pins-types/map-pins-types.module.code.ts"

export function getPinTypeId(pinType: number | string): number | undefined {
  if (type(pinType) === "string") {
    return asPinTypeId((globalThis as GlobalTable)[pinType as string])
  }
  if (type(pinType) === "number") {
    return pinType as number
  }
  return undefined
}

export function getPinTypeIdAndString(
  lib: Lib,
  pinType: number | string
): LuaMultiReturn<[pinTypeId: number | undefined, pinTypeString: string | undefined]> {
  let pinTypeString: string | undefined
  let pinTypeId: number | undefined
  if (type(pinType) === "string") {
    pinTypeString = pinType as string
    pinTypeId = asPinTypeId((globalThis as GlobalTable)[pinType as string])
  } else if (type(pinType) === "number") {
    pinTypeId = pinType as number
    const pinData = lib.pinManager.customPins[pinTypeId]
    pinTypeString = pinData?.pinTypeString
  }
  return $multi(pinTypeId, pinTypeString)
}

export function getCurrentMapFilterGroup(): LuaMultiReturn<
  [mapGroup: string | undefined, filterKey: string | undefined]
> {
  let mapGroup: string | undefined
  const mapFilterType = GetMapFilterType()

  if (mapFilterType === MAP_FILTER_TYPE_STANDARD) {
    mapGroup = LIBMAPPINS_PVE_MAPGROUP
  } else if (mapFilterType === MAP_FILTER_TYPE_AVA_CYRODIIL) {
    mapGroup = LIBMAPPINS_AVA_MAPGROUP
  } else if (mapFilterType === MAP_FILTER_TYPE_AVA_IMPERIAL) {
    mapGroup = LIBMAPPINS_AVA_IMPERIAL_MAPGROUP
  } else if (mapFilterType === MAP_FILTER_TYPE_BATTLEGROUND) {
    mapGroup = LIBMAPPINS_BATTLEGROUND_MAPGROUP
  } else if (mapFilterType === MAP_FILTER_TYPE_GLOBAL) {
    mapGroup = LIBMAPPINS_GLOBAL_MAPGROUP
  }

  if (mapGroup !== undefined) {
    return $multi(mapGroup, `${mapGroup}Key`)
  }

  return $multi(undefined, undefined)
}

export function getCurrentGamepadMapFilterPanel(): GamepadFilterPanel | undefined {
  return GAMEPAD_WORLD_MAP_FILTERS !== undefined
    ? GAMEPAD_WORLD_MAP_FILTERS.currentPanel
    : undefined
}
