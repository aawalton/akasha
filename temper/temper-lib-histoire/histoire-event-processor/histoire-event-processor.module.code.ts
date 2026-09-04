import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger

export interface EventRef {
  GetEventId: (this: EventRef) => number
  GetEventTimestampS: (this: EventRef) => number
  GetGuildId: (this: EventRef) => number
  GetEventCategory: (this: EventRef) => number
}

export interface ProcessingRequestRef {
  GetPendingEventMetrics: (this: ProcessingRequestRef) => LuaMultiReturn<[number, number, number]>
}

export interface ProcessingRequestClassRef {
  New: (
    this: ProcessingRequestClassRef,
    processor: GuildHistoryEventProcessorInstance,
    handleEvent: (
      this: void,
      processor: GuildHistoryEventProcessorInstance,
      event: EventRef
    ) => void,
    onLastCachedEvent: (this: void) => void
  ) => ProcessingRequestRef
}

export interface CategoryCacheRef {
  IsFor: (this: CategoryCacheRef, guildId: number, category: number) => boolean
  GetKey: (this: CategoryCacheRef) => string
  GetGuildId: (this: CategoryCacheRef) => number
  GetCategory: (this: CategoryCacheRef) => number
  RemoveProcessingRequest: (this: CategoryCacheRef, request: ProcessingRequestRef) => void
  QueueProcessingRequest: (this: CategoryCacheRef, request: ProcessingRequestRef) => void
  RegisterProcessor: (this: CategoryCacheRef, processor: GuildHistoryEventProcessorInstance) => void
  UnregisterProcessor: (
    this: CategoryCacheRef,
    processor: GuildHistoryEventProcessorInstance
  ) => void
}

type EventCallback = (this: void, event: EventRef) => void
type StopCallback = (this: void, reason: string) => void
type FutureEventsCallback = (this: void) => void
type EventProcessorFn = (this: void, guildId: number, category: number, event: EventRef) => void

export interface GuildHistoryEventProcessorInstance {
  categoryCache: CategoryCacheRef
  addonName?: string
  running: boolean
  afterEventId?: number
  afterEventTime?: number
  beforeEventId?: number
  beforeEventTime?: number
  nextEventCallback?: EventCallback
  missedEventCallback?: EventCallback
  onStopCallback?: StopCallback
  futureEventsCallback?: FutureEventsCallback
  stopOnLastCachedEvent: boolean
  receiveMissedEventsOutsideIterationRange: boolean
  currentEventId?: number
  request?: ProcessingRequestRef
  nextEventProcessor: EventProcessorFn
  missedEventProcessor: EventProcessorFn

  Initialize: (
    this: GuildHistoryEventProcessorInstance,
    categoryCache: CategoryCacheRef,
    addonName?: string
  ) => void
  StopInternal: (this: GuildHistoryEventProcessorInstance, reason?: string) => boolean
  GetAddonName: (this: GuildHistoryEventProcessorInstance) => string | undefined
  GetKey: (this: GuildHistoryEventProcessorInstance) => string
  GetGuildId: (this: GuildHistoryEventProcessorInstance) => number
  GetCategory: (this: GuildHistoryEventProcessorInstance) => number
  GetPendingEventMetrics: (
    this: GuildHistoryEventProcessorInstance
  ) => LuaMultiReturn<[number, number, number]>
  SetAfterEventId: (this: GuildHistoryEventProcessorInstance, eventId: number) => boolean
  SetAfterEventTime: (this: GuildHistoryEventProcessorInstance, eventTime: number) => boolean
  SetBeforeEventId: (this: GuildHistoryEventProcessorInstance, eventId: number) => boolean
  SetBeforeEventTime: (this: GuildHistoryEventProcessorInstance, eventTime: number) => boolean
  SetNextEventCallback: (
    this: GuildHistoryEventProcessorInstance,
    callback: EventCallback
  ) => boolean
  SetMissedEventCallback: (
    this: GuildHistoryEventProcessorInstance,
    callback: EventCallback
  ) => boolean
  SetEventCallback: (this: GuildHistoryEventProcessorInstance, callback: EventCallback) => boolean
  SetOnStopCallback: (this: GuildHistoryEventProcessorInstance, callback: StopCallback) => boolean
  SetStopOnLastCachedEvent: (
    this: GuildHistoryEventProcessorInstance,
    shouldStop: boolean
  ) => boolean
  SetRegisteredForFutureEventsCallback: (
    this: GuildHistoryEventProcessorInstance,
    callback: FutureEventsCallback
  ) => boolean
  SetReceiveMissedEventsOutsideIterationRange: (
    this: GuildHistoryEventProcessorInstance,
    shouldReceive: boolean
  ) => boolean
  Start: (this: GuildHistoryEventProcessorInstance) => boolean
  StartIteratingTimeRange: (
    this: GuildHistoryEventProcessorInstance,
    startTime: number,
    endTime: number,
    eventCallback: EventCallback,
    finishedCallback: StopCallback
  ) => boolean
  StartStreaming: (
    this: GuildHistoryEventProcessorInstance,
    lastProcessedId: number | undefined,
    eventCallback?: EventCallback
  ) => boolean
  Stop: (this: GuildHistoryEventProcessorInstance) => boolean
  IsRunning: (this: GuildHistoryEventProcessorInstance) => boolean
}

export interface GuildHistoryEventProcessorClass extends GuildHistoryEventProcessorInstance {
  New: (
    this: GuildHistoryEventProcessorClass,
    categoryCache: CategoryCacheRef,
    addonName?: string
  ) => GuildHistoryEventProcessorInstance
}

export const GuildHistoryEventProcessor =
  ZO_InitializingObject.Subclass<GuildHistoryEventProcessorClass>()
internal.class.GuildHistoryEventProcessor = GuildHistoryEventProcessor

function shouldHandleEvent(
  this: void,
  processor: GuildHistoryEventProcessorInstance,
  event: EventRef
): boolean {
  if (processor.afterEventId != null && event.GetEventId() <= processor.afterEventId) {
    return false
  } else if (
    processor.afterEventTime != null &&
    event.GetEventTimestampS() <= processor.afterEventTime
  ) {
    return false
  }
  return true
}

function hasIterationCompleted(
  this: void,
  processor: GuildHistoryEventProcessorInstance,
  event: EventRef
): boolean {
  if (processor.beforeEventId != null && event.GetEventId() >= processor.beforeEventId) {
    logger.Verbose("beforeEventId reached", event.GetEventId(), processor.beforeEventId)
    return true
  } else if (
    processor.beforeEventTime != null &&
    event.GetEventTimestampS() >= processor.beforeEventTime
  ) {
    logger.Verbose("beforeEventTime reached", event.GetEventTimestampS(), processor.beforeEventTime)
    return true
  }
  return false
}

export function handleEvent(
  this: void,
  processor: GuildHistoryEventProcessorInstance,
  event: EventRef
): undefined {
  if (!shouldHandleEvent(processor, event)) {
    return
  }
  if (hasIterationCompleted(processor, event)) {
    processor.StopInternal(internal.STOP_REASON_ITERATION_COMPLETED)
    return
  }

  const eventId = event.GetEventId()
  if (
    processor.missedEventCallback != null &&
    processor.currentEventId != null &&
    eventId < processor.currentEventId
  ) {
    processor.missedEventCallback(event)
  } else if (
    processor.nextEventCallback != null &&
    (processor.currentEventId == null || eventId > processor.currentEventId)
  ) {
    processor.nextEventCallback(event)
    processor.currentEventId = eventId
  }
}

GuildHistoryEventProcessor.Initialize = function (this, categoryCache, addonName) {
  this.categoryCache = categoryCache
  this.addonName = addonName
  this.running = false
  this.afterEventId = undefined
  this.afterEventTime = undefined
  this.beforeEventId = undefined
  this.beforeEventTime = undefined
  this.nextEventCallback = undefined
  this.missedEventCallback = undefined
  this.onStopCallback = undefined
  this.stopOnLastCachedEvent = false
  this.receiveMissedEventsOutsideIterationRange = false

  this.nextEventProcessor = (guildId, category, event): undefined => {
    if (!categoryCache.IsFor(guildId, category)) {
      return
    }
    handleEvent(this, event)
  }

  this.missedEventProcessor = (guildId, category, event): undefined => {
    if (!categoryCache.IsFor(guildId, category)) {
      return
    }
    if (this.receiveMissedEventsOutsideIterationRange && this.missedEventCallback != null) {
      this.missedEventCallback(event)
    } else {
      handleEvent(this, event)
    }
  }
}

GuildHistoryEventProcessor.StopInternal = function (this, reason) {
  if (!this.running) {
    return false
  }

  reason = reason ?? internal.STOP_REASON_MANUAL_STOP
  logger.Info("Stop processor", this.GetKey(), reason)
  if (this.request != null) {
    this.categoryCache.RemoveProcessingRequest(this.request)
    this.request = undefined
  }

  if (this.nextEventCallback != null || this.missedEventCallback != null) {
    internal.UnregisterCallback(internal.callback.PROCESS_LINKED_EVENT, this.nextEventProcessor)
    internal.UnregisterCallback(internal.callback.PROCESS_MISSED_EVENT, this.missedEventProcessor)
  }

  if (this.addonName != null) {
    this.categoryCache.UnregisterProcessor(this)
  }
  this.currentEventId = undefined
  this.running = false

  if (this.onStopCallback != null) {
    this.onStopCallback(reason)
  }
  return true
}

GuildHistoryEventProcessor.GetAddonName = function (this) {
  return this.addonName
}

GuildHistoryEventProcessor.GetKey = function (this) {
  return this.categoryCache.GetKey()
}

GuildHistoryEventProcessor.GetGuildId = function (this) {
  return this.categoryCache.GetGuildId()
}

GuildHistoryEventProcessor.GetCategory = function (this) {
  return this.categoryCache.GetCategory()
}

GuildHistoryEventProcessor.GetPendingEventMetrics = function (this) {
  if (!this.running || this.request == null) {
    return $multi(0, -1, -1)
  }
  return this.request.GetPendingEventMetrics()
}

GuildHistoryEventProcessor.SetAfterEventId = function (this, eventId) {
  if (this.running) {
    logger.Warn("Tried to call SetAfterEventId while processor is running")
    return false
  }

  this.afterEventId = eventId
  return true
}

GuildHistoryEventProcessor.SetAfterEventTime = function (this, eventTime) {
  if (this.running) {
    logger.Warn("Tried to call SetAfterEventTime while processor is running")
    return false
  }

  this.afterEventTime = eventTime
  return true
}

GuildHistoryEventProcessor.SetBeforeEventId = function (this, eventId) {
  if (this.running) {
    logger.Warn("Tried to call SetBeforeEventId while processor is running")
    return false
  }

  this.beforeEventId = eventId
  return true
}

GuildHistoryEventProcessor.SetBeforeEventTime = function (this, eventTime) {
  if (this.running) {
    logger.Warn("Tried to call SetBeforeEventTime while processor is running")
    return false
  }

  this.beforeEventTime = eventTime
  return true
}

GuildHistoryEventProcessor.SetNextEventCallback = function (this, callback) {
  if (this.running) {
    logger.Warn("Tried to call SetNextEventCallback while processor is running")
    return false
  }

  this.nextEventCallback = callback
  return true
}

GuildHistoryEventProcessor.SetMissedEventCallback = function (this, callback) {
  if (this.running) {
    logger.Warn("Tried to call SetMissedEventCallback while processor is running")
    return false
  }

  this.missedEventCallback = callback
  return true
}

GuildHistoryEventProcessor.SetEventCallback = function (this, callback) {
  if (this.running) {
    logger.Warn("Tried to call SetEventCallback while processor is running")
    return false
  }

  this.nextEventCallback = callback
  this.missedEventCallback = callback
  return true
}

GuildHistoryEventProcessor.SetOnStopCallback = function (this, callback) {
  if (this.running) {
    logger.Warn("Tried to call SetOnStopCallback while processor is running")
    return false
  }

  this.onStopCallback = callback
  return true
}

GuildHistoryEventProcessor.SetStopOnLastCachedEvent = function (this, shouldStop) {
  if (this.running) {
    logger.Warn("Tried to call SetStopOnLastCachedEvent while processor is running")
    return false
  }

  this.stopOnLastCachedEvent = shouldStop
  return true
}

GuildHistoryEventProcessor.SetRegisteredForFutureEventsCallback = function (this, callback) {
  if (this.running) {
    logger.Warn("Tried to call SetRegisteredForFutureEventsCallback while processor is running")
    return false
  }

  this.futureEventsCallback = callback
  return true
}

GuildHistoryEventProcessor.SetReceiveMissedEventsOutsideIterationRange = function (
  this,
  shouldReceive
) {
  if (this.running) {
    logger.Warn(
      "Tried to call SetReceiveMissedEventsOutsideIterationRange while processor is running"
    )
    return false
  }

  this.receiveMissedEventsOutsideIterationRange = shouldReceive
  return true
}

GuildHistoryEventProcessor.Stop = function (this) {
  return this.StopInternal()
}

GuildHistoryEventProcessor.IsRunning = function (this) {
  return this.running
}
