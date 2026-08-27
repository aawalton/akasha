export const LIB_IDENTIFIER = "LibMapData"

export const INTERNAL_IDENTIFIER = "LibMapData_Internal"

export const LIB_VERSION = 121

export const CALLBACK_TYPE = {
  EVENT_ZONE_CHANGED: "LibMapDataEventZoneChanged",
  EVENT_LINKED_WORLD_POSITION_CHANGED: "LibMapDataEventLinkedWorldPositionChanged",
  EVENT_PLAYER_ACTIVATED: "LibMapDataEventPlayerActivated",
  OnWorldMapChanged: "LibMapDataOnWorldMapChanged",
  WorldMapSceneStateChange: "LibMapDataWorldMapSceneStateChange",
} as const

export const MAPINDEX_MIN = 1
export const MAPINDEX_MAX = 53
export const MAX_NUM_MAPIDS = 2844
export const MAX_NUM_ZONEINDEXES = 1085
export const MAX_NUM_ZONEIDS = 1584
export const MAX_ATTEMPT_MAP_UPDATE_SECONDS = 15
