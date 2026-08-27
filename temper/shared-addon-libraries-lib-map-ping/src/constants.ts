export const LIB_IDENTIFIER = "LibMapPing2"

export const CALLBACK = {
  BEFORE_PING_ADDED: "BeforePingAdded",
  AFTER_PING_ADDED: "AfterPingAdded",
  BEFORE_PING_REMOVED: "BeforePingRemoved",
  AFTER_PING_REMOVED: "AfterPingRemoved",
} as const

export const MAP_PING_STATE = {
  NOT_SET: 0,
  NOT_SET_PENDING: 1,
  SET_PENDING: 2,
  SET: 3,
} as const

export const DEFAULT_MODIFIER = 2.15
export const COMBAT_MODIFIER = 39
export const FILL_RATE = 0.512
export const BUCKET_SIZE = 100
export const SAFETY_THRESHOLD = 10
export const TIME_FRAME = 3
export const RESOLUTION = 10

export const MAP_PIN_TAG_PLAYER_WAYPOINT = "waypoint"
export const MAP_PIN_TAG_RALLY_POINT = "rally"
export const PING_CATEGORY = "pings"

export const PING_EVENT_TYPE_INDEX = 1
export const PING_EVENT_WATCHDOG_TIME = 400
