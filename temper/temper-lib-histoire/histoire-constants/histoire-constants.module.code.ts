export const LIB_IDENTIFIER = "LibHistoire"

export const SV_SETTINGS = "LibHistoire_Settings"
export const SV_GUILD_NAMES = "LibHistoire_GuildNames"
export const SV_NAME_DICTIONARY = "LibHistoire_NameDictionary"
export const SV_GUILD_HISTORY = "LibHistoire_GuildHistory"
export const SV_GUILD_HISTORY_CACHE = "LibHistoire_GuildHistoryCache"

export const CALLBACK = {
  INITIALIZED: "HistyIsReadyForAction",
  CATEGORY_DATA_UPDATED: "HistyHasUpdatedCategoryData",
  PROCESS_LINKED_EVENTS_STARTED: "HistyHasStartedProcessingLinkedEvents",
  PROCESS_LINKED_EVENT: "HistyIsProcessingALinkedEvent",
  PROCESS_LINKED_EVENTS_FINISHED: "HistyHasFinishedProcessingLinkedEvents",
  PROCESS_MISSED_EVENTS_STARTED: "HistyHasStartedProcessingMissedEvents",
  PROCESS_MISSED_EVENT: "HistyIsProcessingAMissedEvent",
  PROCESS_MISSED_EVENTS_FINISHED: "HistyHasFinishedProcessingMissedEvents",
  SELECTED_CATEGORY_CACHE_CHANGED: "HistyDetectedTheSelectedCategoryCacheHasChanged",
  REQUEST_MODE_CHANGED: "HistyDetectedTheRequestModeHasChanged",
  ZOOM_MODE_CHANGED: "HistyDetectedTheZoomModeHasChanged",
  REQUEST_CREATED: "HistyHasCreatedARequest",
  REQUEST_DESTROYED: "HistyHasDestroyedARequest",
  MANAGED_RANGE_LOST: "HistyDetectedTheManagedRangeHasBeenLost",
  MANAGED_RANGE_FOUND: "HistyDetectedTheManagedRangeHasBeenFound",
  CATEGORY_LINKED: "HistyDetectedACategoryHasBeenLinked",
  DEPRECATED: "deprecated",
} as const

export const REQUEST_MODE_AUTO = "auto"
export const REQUEST_MODE_OFF = "off"
export const REQUEST_MODE_ON = "on"

export const ZOOM_MODE_AUTO = "auto"
export const ZOOM_MODE_FULL_RANGE = "full"
export const ZOOM_MODE_MISSING_RANGE = "missing"

export const STOP_REASON_MANUAL_STOP = "manualStop"
export const STOP_REASON_LAST_CACHED_EVENT_REACHED = "lastCachedEventReached"
export const STOP_REASON_ITERATION_COMPLETED = "iterationCompleted"
export const STOP_REASON_MANAGED_RANGE_LOST = "managedRangeLost"
