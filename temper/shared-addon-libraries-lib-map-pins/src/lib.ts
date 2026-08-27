import { asControl, asLmpPinManager, asString } from "./casts"
import {
  LIB_NAME,
  LIB_VERSION,
  LIBMAPPINS_GLOBAL_MAPGROUP,
  LIBMAPPINS_PVE_MAPGROUP,
} from "./constants"
import { dm as dmImpl } from "./debug"
import { getCurrentMapFilterGroup } from "./helpers"
import { addPinFilter, setPinFilterHidden } from "./pin-filters"
import { disablePin, enablePin, isEnabled, setEnabled } from "./pin-state"
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
} from "./pin-types"
import type { Lib } from "./types"
import { getZoneAndSubzone, myPosition } from "./zone"

function onMapChanged(this: void): undefined {
  const [mapGroup, filterKey] = getCurrentMapFilterGroup()
  if (lib.mapGroup === mapGroup) {
    return
  }

  lib.mapGroup = mapGroup
  if (mapGroup === LIBMAPPINS_GLOBAL_MAPGROUP) {
    return
  }

  for (const [pinTypeId, filter] of pairs(lib.filters)) {
    if (filter === undefined) {
      continue
    }
    if (filter.vars !== undefined) {
      const savedKey = filterKey !== undefined ? filter[filterKey] : undefined
      const state = savedKey != null ? filter.vars[asString(savedKey)] : undefined
      setEnabled(lib, pinTypeId, state)
    } else {
      const checkbox = mapGroup !== undefined ? filter[mapGroup] : undefined
      if (checkbox != null) {
        ZO_CheckButton_SetCheckState(asControl(checkbox), isEnabled(lib, pinTypeId) === true)
      }
    }
  }
}

export const lib: Lib = {
  name: LIB_NAME,
  version: LIB_VERSION,
  filters: {},
  mapGroup: LIBMAPPINS_PVE_MAPGROUP,
  pinManager: asLmpPinManager(ZO_WorldMap_GetPinManager()),
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
