import {
  LIB_NAME,
  LIB_VERSION,
  LIBMAPPINS_GLOBAL_MAPGROUP,
  LIBMAPPINS_PVE_MAPGROUP,
} from "../map-pins-constants/map-pins-constants.module.code.ts"
import { dm as dmImpl } from "../map-pins-debug/map-pins-debug.module.code.ts"
import { getCurrentMapFilterGroup } from "../map-pins-helpers/map-pins-helpers.module.code.ts"
import type { Lib, LmpPinManager } from "../map-pins-types/map-pins-types.module.code.ts"
import {
  getZoneAndSubzone,
  myPosition,
} from "../map-zone-and-subzone/map-zone-and-subzone.module.code.ts"
import { addPinFilter, setPinFilterHidden } from "../pin-filters/pin-filters.module.code.ts"
import { disablePin, enablePin, isEnabled, setEnabled } from "../pin-state/pin-state.module.code.ts"
import {
  addPinType,
  createPin,
  findCustomPin,
  getLayoutData,
  getLayoutKey,
  refreshPins,
  removeCustomPin,
  setAddCallback,
  setClickHandlers,
  setFilterTooltipCreator,
  setLayoutData,
  setLayoutKey,
  setResizeCallback,
} from "../pin-types/pin-types.module.code.ts"

function onMapChanged(this: void): undefined {
  const [mapGroup, filterKey] = getCurrentMapFilterGroup()
  if (LIB.mapGroup === mapGroup) {
    return
  }

  LIB.mapGroup = mapGroup
  if (mapGroup === LIBMAPPINS_GLOBAL_MAPGROUP) {
    return
  }

  for (const [pinTypeId, filter] of pairs(LIB.filters)) {
    if (!filter) {
      continue
    }
    if (filter.vars !== undefined) {
      const savedKey = filterKey !== undefined ? filter[filterKey] : undefined
      const state = savedKey != null ? filter.vars[savedKey as string] : undefined
      setEnabled(LIB, pinTypeId, state)
    } else {
      const checkbox = mapGroup !== undefined ? filter[mapGroup] : undefined
      if (checkbox != null) {
        ZO_CheckButton_SetCheckState(checkbox as Control, isEnabled(LIB, pinTypeId) === true)
      }
    }
  }
}

const pinManager: unknown = ZO_WorldMap_GetPinManager()

export const LIB: Lib = {
  name: LIB_NAME,
  version: LIB_VERSION,
  filters: {},
  mapGroup: LIBMAPPINS_PVE_MAPGROUP,
  pinManager: pinManager as LmpPinManager,
  show_log: true,
  loggerName: "LibMapPins",

  AddPinType(
    this: Lib,
    pinTypeString,
    pinTypeAddCallback,
    pinTypeOnResizeCallback,
    pinLayoutData,
    pinTooltipCreator,
    filterTooltipCreator
  ) {
    return addPinType(
      this,
      pinTypeString,
      pinTypeAddCallback,
      pinTypeOnResizeCallback,
      pinLayoutData,
      pinTooltipCreator,
      filterTooltipCreator
    )
  },
  CreatePin(this: Lib, pinType, pinTag, locX, locY, areaRadius) {
    createPin(this, pinType, pinTag, locX, locY, areaRadius)
  },
  GetLayoutData(this: Lib, pinType) {
    return getLayoutData(pinType)
  },
  GetLayoutKey(this: Lib, pinType, key) {
    return getLayoutKey(pinType, key)
  },
  SetLayoutData(this: Lib, pinType, pinLayoutData) {
    setLayoutData(pinType, pinLayoutData)
  },
  SetLayoutKey(this: Lib, pinType, key, data) {
    setLayoutKey(pinType, key, data)
  },
  SetFilterTooltipCreator(this: Lib, pinType, filterTooltipCreator) {
    setFilterTooltipCreator(this, pinType, filterTooltipCreator)
  },
  SetClickHandlers(this: Lib, pinType, lmbHandler, rmbHandler) {
    setClickHandlers(pinType, lmbHandler, rmbHandler)
  },
  RefreshPins(this: Lib, pinType) {
    refreshPins(this, pinType)
  },
  RemoveCustomPin(this: Lib, pinType, pinTag) {
    removeCustomPin(this, pinType, pinTag)
  },
  FindCustomPin(this: Lib, pinType, pinTag) {
    return findCustomPin(this, pinType, pinTag)
  },
  SetAddCallback(this: Lib, pinType, pinTypeAddCallback) {
    setAddCallback(this, pinType, pinTypeAddCallback)
  },
  SetResizeCallback(this: Lib, pinType, pinTypeOnResizeCallback) {
    setResizeCallback(this, pinType, pinTypeOnResizeCallback)
  },
  IsEnabled(this: Lib, pinType) {
    return isEnabled(this, pinType)
  },
  SetEnabled(this: Lib, pinType, state) {
    setEnabled(this, pinType, state)
  },
  Enable(this: Lib, pinType) {
    enablePin(this, pinType)
  },
  Disable(this: Lib, pinType) {
    disablePin(this, pinType)
  },
  AddPinFilter(
    this: Lib,
    pinType,
    pinCheckboxText,
    separate,
    savedVars,
    savedVarsPveKey,
    savedVarsPvpKey,
    savedVarsImperialPvpKey,
    savedVarsBattlegroundKey
  ) {
    return addPinFilter(
      this,
      pinType,
      pinCheckboxText,
      separate,
      savedVars,
      savedVarsPveKey,
      savedVarsPvpKey,
      savedVarsImperialPvpKey,
      savedVarsBattlegroundKey
    )
  },
  SetPinFilterHidden(this: Lib, pinType, mapGroup, hidden) {
    setPinFilterHidden(this, pinType, mapGroup, hidden)
  },
  GetZoneAndSubzone(this: Lib, alternative, bStripUIMap, bKeepMapNum) {
    return getZoneAndSubzone(alternative, bStripUIMap, bKeepMapNum)
  },
  MyPosition(this: Lib) {
    return myPosition()
  },
  dm(this: Lib, logType, ...args) {
    dmImpl(this, logType, ...args)
  },

  OnMapChanged: onMapChanged,
}
