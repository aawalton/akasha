import {
  asGlobalTable,
  asOptString,
  asPinTypeId,
  asTableKey,
} from "../compass-pins-casts/compass-pins-casts.module.code.ts"
import {
  COEFFICIENTS,
  DEFAULT_MAX_DISTANCE,
  DEFAULT_TEXTURE,
  DUNGEON_COEFFICIENT,
  FOV,
  LIB_NAME,
  LIB_VERSION,
  MAP_CHANGE_DETECTOR_PIN,
  MAP_CHANGED_CALLBACK,
  PIN_TEMPLATE,
  SUBZONE_COEFFICIENT,
  UPDATE_THROTTLE_MS,
  WORLD_MAP_CHANGED_CALLBACK,
} from "../compass-pins-constants/compass-pins-constants.module.code.ts"
import { CompassPinManager } from "../compass-pins-manager/compass-pins-manager.module.code.ts"
import { pinLayouts, STATE } from "../compass-pins-state/compass-pins-state.module.code.ts"
import type {
  CompassPin,
  Lib,
  PinCallback,
} from "../compass-pins-types/compass-pins-types.module.code.ts"

const sharedMapPinManager = ZO_WorldMap_GetPinManager()

export const LIB: Lib = {
  name: LIB_NAME,
  version: LIB_VERSION,

  pinCallbacks: new LuaTable<AnyNotNil, PinCallback>(),
  pinLayouts,

  control: WINDOW_MANAGER.CreateControlFromVirtual<CompassPin>(undefined, GuiRoot, PIN_TEMPLATE),
  pinManager: CompassPinManager.New(),

  New(this: Lib): Lib {
    this.control.SetHidden(false)
    STATE.defaultFOV = FOV
    this.RefreshDistanceCoefficient()

    let lastUpdate = 0
    this.control.SetHandler("OnUpdate", () => {
      const now = GetFrameTimeMilliseconds()
      if (now - lastUpdate >= UPDATE_THROTTLE_MS) {
        this.Update()
        lastUpdate = now
      }
    })

    this.SetupCallbacks()

    return this
  },

  SetupCallbacks(this: Lib): undefined {
    const glob = asGlobalTable(globalThis)
    if (glob[MAP_CHANGE_DETECTOR_PIN] === undefined) {
      const mapPinManager = ZO_WorldMap_GetPinManager()
      mapPinManager.AddCustomPin(MAP_CHANGE_DETECTOR_PIN, () => {
        const tileIndex = 1
        const [, , currentMap] = string.find(
          string.lower(GetMapTileTexture(tileIndex)),
          "maps/([%w%-]+/[%w%-]+_%w+)"
        )
        CALLBACK_MANAGER.FireCallbacks(MAP_CHANGED_CALLBACK, currentMap)
      })
      mapPinManager.SetCustomPinEnabled(
        asPinTypeId(asGlobalTable(globalThis)[MAP_CHANGE_DETECTOR_PIN]),
        true
      )

      CALLBACK_MANAGER.RegisterCallback(MAP_CHANGED_CALLBACK, (currentMap: unknown) => {
        const nextMap = asOptString(currentMap)
        if (this.map !== nextMap) {
          this.RefreshDistanceCoefficient()
          this.RefreshPins()
          this.map = nextMap
        }
      })
    }

    const onStateChange = (_oldState: unknown, newState: unknown): undefined => {
      if (this.version !== LIB_VERSION) {
        WORLD_MAP_SCENE.UnregisterCallback("StateChange", onStateChange)
        return
      }
      if (newState === SCENE_HIDING) {
        if (SetMapToPlayerLocation() === SET_MAP_RESULT_MAP_CHANGED) {
          CALLBACK_MANAGER.FireCallbacks(WORLD_MAP_CHANGED_CALLBACK)
        }
      }
    }
    WORLD_MAP_SCENE.RegisterCallback("StateChange", onStateChange)
  },

  AddCustomPin(this: Lib, pinType, pinCallback, layout, savedVarTable): undefined {
    if (
      type(pinType) !== "string" ||
      this.pinLayouts.get(pinType) !== undefined ||
      type(pinCallback) !== "function" ||
      type(layout) !== "table"
    ) {
      return
    }

    const mapPinTypeString = layout.mapPinTypeString
    if (mapPinTypeString !== undefined && type(mapPinTypeString) === "string") {
      const pinTypeId = asGlobalTable(globalThis)[mapPinTypeString]
      if (type(pinTypeId) === "number") {
        const pinData = sharedMapPinManager.customPins[asPinTypeId(pinTypeId)]
        if (pinData !== undefined && type(pinData) === "table") {
          pinData.compassPinTypeString = pinType
          pinData.onToggleCallback = layout.onToggleCallback
        }
      }
    }

    layout.maxDistance = layout.maxDistance ?? DEFAULT_MAX_DISTANCE
    layout.texture = layout.texture ?? DEFAULT_TEXTURE

    this.pinCallbacks.set(pinType, pinCallback)
    this.pinLayouts.set(pinType, layout)

    let enabled = true
    if (savedVarTable !== undefined && type(savedVarTable) === "table") {
      const svState = savedVarTable[pinType]
      if (svState !== undefined && type(svState) === "boolean") {
        enabled = svState
      } else {
        savedVarTable[pinType] = true
      }
    }

    this.pinManager.SetCompassPinEnabled(pinType, enabled)
  },

  RefreshPins(this: Lib, pinType): undefined {
    this.pinManager.RemovePins(pinType === undefined ? undefined : `${pinType}`)
    if (pinType !== undefined) {
      const callback = this.pinCallbacks.get(asTableKey(pinType))
      if (callback === undefined) {
        return
      }
      callback(this.pinManager)
    } else {
      for (const [, callback] of pairs(this.pinCallbacks)) {
        callback(this.pinManager)
      }
    }
  },

  GetDistanceCoefficient(this: Lib): number {
    let coefficient = 1
    const mapId = GetCurrentMapIndex()
    if (mapId !== undefined) {
      coefficient = COEFFICIENTS[mapId - 1] ?? 1
    } else {
      if (GetMapContentType() === MAP_CONTENT_DUNGEON) {
        coefficient = DUNGEON_COEFFICIENT
      } else if (GetMapType() === MAPTYPE_SUBZONE) {
        coefficient = SUBZONE_COEFFICIENT
      }
    }

    return zo_sqrt(coefficient)
  },

  RefreshDistanceCoefficient(this: Lib): undefined {
    STATE.distanceCoefficient = this.GetDistanceCoefficient()
  },

  Update(this: Lib): undefined {
    const rawHeading: number | undefined = GetPlayerCameraHeading()
    if (rawHeading === undefined) {
      return
    }
    let heading = rawHeading
    if (heading > math.pi) {
      heading = heading - 2 * math.pi
    }

    const [x, y] = GetMapPlayerPosition("player")
    this.pinManager.Update(x, y, heading)
  },

  SetCompassPinEnabled(this: Lib, pinType, state2): undefined {
    this.pinManager.SetCompassPinEnabled(pinType, state2)
  },

  IsCompassPinEnabled(this: Lib, pinType): boolean {
    return this.pinManager.IsCompassPinEnabled(pinType)
  },

  CreatePin(this: Lib, pinType, pinTag, xLoc, yLoc, pinName, ...rest): undefined {
    this.pinManager.CreatePin(pinType, pinTag, xLoc, yLoc, pinName, ...rest)
  },

  RemovePin(this: Lib, pinTag): undefined {
    this.pinManager.RemovePin(pinTag)
  },

  RemovePins(this: Lib, pinType): undefined {
    this.pinManager.RemovePins(pinType)
  },

  ResetPin(this: Lib, pin): undefined {
    this.pinManager.ResetPin(pin)
  },
}
