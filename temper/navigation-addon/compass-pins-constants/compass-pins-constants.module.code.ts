export const LIB_NAME = "CustomCompassPins"

export const LIB_VERSION = 138

export const FOV = math.pi * 0.6

export const DEFAULT_MAX_DISTANCE = 0.02

export const FALLBACK_MAX_DISTANCE = 0.05

export const DEFAULT_TEXTURE = "EsoUI/Art/MapPins/hostile_pin.dds"

export const CUSTOM_COMPASS_LAYOUT_UPDATE = "update"
export const CUSTOM_COMPASS_LAYOUT_RESET = "reset"

export const LEGACY_LAYOUT_UPDATE = 1
export const LEGACY_LAYOUT_RESET = 2

export const MAP_CHANGE_DETECTOR_PIN = "CustomCompassPins_MapChangeDetector"

export const MAP_CHANGED_CALLBACK = "CustomCompassPins_MapChanged"

export const WORLD_MAP_CHANGED_CALLBACK = "OnWorldMapChanged"

export const PIN_TEMPLATE = "ZO_MapPin"

export const PIN_NAME_PREFIX = "Pin"

export const DEFAULT_ANGLE = 1

export const UPDATE_THROTTLE_MS = 20

export const COEFFICIENTS: readonly number[] = [
  0.16, 1.08, 1.32, 1.14, 1.14, 1.23, 1.16, 1.24, 1.33, 1.0, 1.12, 1.0, 1.0, 0.89, 1.0, 1.37, 1.2,
  4.27, 2.67, 3.2, 5.0, 8.45, 0.89, 0.1, 1.14,
]

export const DUNGEON_COEFFICIENT = 16

export const SUBZONE_COEFFICIENT = 6
