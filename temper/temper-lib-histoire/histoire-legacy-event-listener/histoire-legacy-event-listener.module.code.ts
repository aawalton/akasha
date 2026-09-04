import type { EventRef } from "../histoire-event-processor/histoire-event-processor.module.code.ts"
import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger

interface CategoryCacheRef {
  IsFor: (this: CategoryCacheRef, guildId: number, category: number) => boolean
  RegisterProcessor: (
    this: CategoryCacheRef,
    processor: GuildHistoryLegacyEventListenerInstance
  ) => void
  UnregisterProcessor: (
    this: CategoryCacheRef,
    processor: GuildHistoryLegacyEventListenerInstance
  ) => void
}

export interface ProcessorRef {
  IsRunning: (this: ProcessorRef) => boolean
  Stop: (this: ProcessorRef) => boolean
  Start: (this: ProcessorRef) => boolean
  GetKey: (this: ProcessorRef) => string
  GetPendingEventMetrics: (this: ProcessorRef) => LuaMultiReturn<[number, number, number]>
  SetStopOnLastCachedEvent: (this: ProcessorRef, shouldStop: boolean) => boolean
  SetOnStopCallback: (this: ProcessorRef, callback: (this: void, reason: string) => void) => boolean
  SetAfterEventId: (this: ProcessorRef, eventId: number) => boolean
  SetAfterEventTime: (this: ProcessorRef, eventTime: number) => boolean
  SetBeforeEventId: (this: ProcessorRef, eventId: number) => boolean
  SetBeforeEventTime: (this: ProcessorRef, eventTime: number) => boolean
  SetNextEventCallback: (this: ProcessorRef, callback: ProcessorEventCallback) => boolean
  SetMissedEventCallback: (this: ProcessorRef, callback: ProcessorEventCallback) => boolean
}

interface ProcessorClassRef {
  New: (this: ProcessorClassRef, categoryCache: CategoryCacheRef) => ProcessorRef
}

interface PerformanceTrackerRef {
  Reset: (this: PerformanceTrackerRef) => void
  Increment: (this: PerformanceTrackerRef) => void
  GetProcessingSpeedAndEstimatedTimeLeft: (
    this: PerformanceTrackerRef,
    count: number
  ) => LuaMultiReturn<[number, number]>
}
interface PerformanceTrackerClassRef {
  New: (this: PerformanceTrackerClassRef) => PerformanceTrackerRef
}

type ProcessorEventCallback = (this: void, event: EventRef) => void
export type LegacyEventCallback = (this: void, ...args: unknown[]) => void
type CachedEventCallback = (this: void, guildId: number, category: number, event: EventRef) => void

type ConvertEventToLegacyFormatFn = (this: void, event: EventRef) => LuaMultiReturn<unknown[]>

interface CachedEvent {
  eventId: number
  arguments: unknown[]
}

function asProcessorClassRef(value: unknown): ProcessorClassRef {
  return value as ProcessorClassRef
}
function asPerformanceTrackerClassRef(value: unknown): PerformanceTrackerClassRef {
  return value as PerformanceTrackerClassRef
}
function asAsyncTask(value: unknown): AsyncTask {
  return value as AsyncTask
}
function asConvertEventToLegacyFormatFn(value: unknown): ConvertEventToLegacyFormatFn {
  return value as ConvertEventToLegacyFormatFn
}
function asLegacyEventCallback(value: unknown): LegacyEventCallback {
  return value as LegacyEventCallback
}

export interface GuildHistoryLegacyEventListenerInstance {
  guildId: number
  legacyCategory: number
  key: string
  caches: CategoryCacheRef[]
  processors: ProcessorRef[]
  listeners: ProcessorRef[]
  cachedEvents: CachedEvent[]
  iterationCompletedCount: number
  eventsLeft: number
  performanceTracker: PerformanceTrackerRef
  hasReachedEndCriteria: boolean
  running?: boolean
  shouldStop?: boolean
  afterEventId?: number
  afterEventTime?: number
  beforeEventId?: number
  beforeEventTime?: number
  currentEventId?: number
  nextEventCallback?: LegacyEventCallback
  missedEventCallback?: LegacyEventCallback
  iterationCompletedCallback?: (this: void) => void
  task?: AsyncTask
  cachedNextEventCallback: CachedEventCallback
  uncachedNextEventCallback: CachedEventCallback
  onEvent: ProcessorEventCallback

  Initialize: (
    this: GuildHistoryLegacyEventListenerInstance,
    guildId: number,
    legacyCategory: number,
    caches: CategoryCacheRef[]
  ) => void
  OnIterationsCompleted: (this: GuildHistoryLegacyEventListenerInstance) => void
  OnProcessingCachedEventsCompleted: (this: GuildHistoryLegacyEventListenerInstance) => void
  StopInternal: (this: GuildHistoryLegacyEventListenerInstance) => boolean
  GetKey: (this: GuildHistoryLegacyEventListenerInstance) => string
  GetGuildId: (this: GuildHistoryLegacyEventListenerInstance) => number
  GetCategory: (this: GuildHistoryLegacyEventListenerInstance) => number
  GetPendingEventMetrics: (
    this: GuildHistoryLegacyEventListenerInstance
  ) => LuaMultiReturn<[number, number, number]>
  SetAfterEventId: (this: GuildHistoryLegacyEventListenerInstance, eventId: string) => boolean
  SetAfterEventTime: (this: GuildHistoryLegacyEventListenerInstance, eventTime: number) => boolean
  SetBeforeEventId: (this: GuildHistoryLegacyEventListenerInstance, eventId: string) => boolean
  SetBeforeEventTime: (this: GuildHistoryLegacyEventListenerInstance, eventTime: number) => boolean
  SetTimeFrame: (
    this: GuildHistoryLegacyEventListenerInstance,
    startTime: number,
    endTime: number
  ) => boolean
  SetNextEventCallback: (
    this: GuildHistoryLegacyEventListenerInstance,
    callback: LegacyEventCallback
  ) => boolean
  SetMissedEventCallback: (
    this: GuildHistoryLegacyEventListenerInstance,
    callback: LegacyEventCallback
  ) => boolean
  SetEventCallback: (
    this: GuildHistoryLegacyEventListenerInstance,
    callback: LegacyEventCallback
  ) => boolean
  SetIterationCompletedCallback: (
    this: GuildHistoryLegacyEventListenerInstance,
    callback: (this: void) => void
  ) => boolean
  SetStopOnLastEvent: (
    this: GuildHistoryLegacyEventListenerInstance,
    shouldStop: boolean
  ) => boolean
  Start: (this: GuildHistoryLegacyEventListenerInstance) => boolean
  Stop: (this: GuildHistoryLegacyEventListenerInstance) => boolean
  IsRunning: (this: GuildHistoryLegacyEventListenerInstance) => boolean
}

export interface GuildHistoryLegacyEventListenerClass
  extends GuildHistoryLegacyEventListenerInstance {
  New: (
    this: GuildHistoryLegacyEventListenerClass,
    guildId: number,
    legacyCategory: number,
    caches: CategoryCacheRef[]
  ) => GuildHistoryLegacyEventListenerInstance
}

export const GuildHistoryLegacyEventListener =
  ZO_InitializingObject.Subclass<GuildHistoryLegacyEventListenerClass>()
internal.class.GuildHistoryLegacyEventListener = GuildHistoryLegacyEventListener

GuildHistoryLegacyEventListener.Initialize = function (this, guildId, legacyCategory, caches) {
  this.guildId = guildId
  this.legacyCategory = legacyCategory
  this.key = internal.WORLD_NAME + "/" + tostring(guildId) + "/" + tostring(legacyCategory)
  this.caches = caches
  this.processors = []
  this.listeners = this.processors
  this.cachedEvents = []
  this.iterationCompletedCount = 0
  this.eventsLeft = 0
  this.performanceTracker = asPerformanceTrackerClassRef(internal.class.PerformanceTracker).New()
  this.hasReachedEndCriteria = false

  const processorClass = asProcessorClassRef(internal.class.GuildHistoryEventProcessor)
  for (const [, cache] of ipairs(caches)) {
    const processor = processorClass.New(cache)
    processor.SetStopOnLastCachedEvent(true)
    processor.SetOnStopCallback((reason): undefined => {
      if (
        reason === internal.STOP_REASON_ITERATION_COMPLETED ||
        reason === internal.STOP_REASON_LAST_CACHED_EVENT_REACHED
      ) {
        if (reason === internal.STOP_REASON_ITERATION_COMPLETED) {
          this.hasReachedEndCriteria = true
        }
        this.iterationCompletedCount = this.iterationCompletedCount + 1
        logger.Debug(
          "iteration completed",
          this.key,
          this.iterationCompletedCount,
          this.processors.length
        )
        if (this.iterationCompletedCount === this.processors.length) {
          this.OnIterationsCompleted()
        }
      }
    })
    this.processors[this.processors.length] = processor
  }

  const isFor = (guildId: number, category: number): boolean => {
    for (const [, cache] of ipairs(caches)) {
      if (cache.IsFor(guildId, category)) {
        return true
      }
    }
    return false
  }

  const shouldHandleEvent = (event: EventRef): boolean => {
    if (this.afterEventId != null && event.GetEventId() <= this.afterEventId) {
      return false
    } else if (this.afterEventTime != null && event.GetEventTimestampS() <= this.afterEventTime) {
      return false
    }
    return true
  }

  const convertEvent = asConvertEventToLegacyFormatFn(internal.ConvertEventToLegacyFormat)

  this.cachedNextEventCallback = (guildId, category, event): undefined => {
    if (!isFor(guildId, category) || !shouldHandleEvent(event)) {
      return
    }
    this.cachedEvents[this.cachedEvents.length] = {
      eventId: event.GetEventId(),
      arguments: [...convertEvent(event)],
    }
  }

  this.uncachedNextEventCallback = (guildId, category, event): undefined => {
    if (!isFor(guildId, category) || !shouldHandleEvent(event)) {
      return
    }
    const eventId = event.GetEventId()
    if (
      this.missedEventCallback != null &&
      this.currentEventId != null &&
      eventId < this.currentEventId
    ) {
      const missedArgs = [...convertEvent(event)]
      this.missedEventCallback(...missedArgs)
    } else if (
      this.nextEventCallback != null &&
      (this.currentEventId == null || eventId > this.currentEventId)
    ) {
      const nextArgs = [...convertEvent(event)]
      this.nextEventCallback(...nextArgs)
      this.currentEventId = eventId
    }
  }

  if (this.processors.length > 1) {
    logger.Debug("register cached event callbacks")
    this.onEvent = (event): undefined => {
      const guildId = event.GetGuildId()
      const category = event.GetEventCategory()
      this.cachedNextEventCallback(guildId, category, event)
    }
  } else {
    logger.Debug("register uncached event callbacks")
    this.onEvent = (event): undefined => {
      const guildId = event.GetGuildId()
      const category = event.GetEventCategory()
      this.uncachedNextEventCallback(guildId, category, event)
    }
  }
}

GuildHistoryLegacyEventListener.OnIterationsCompleted = function (this) {
  const events = this.cachedEvents
  logger.Debug("iterations completed", this.key, events.length)
  if (events.length === 0) {
    this.OnProcessingCachedEventsCompleted()
    return
  }

  this.cachedEvents = []
  this.performanceTracker.Reset()
  logger.Debug("register cached event callbacks")
  internal.RegisterCallback(internal.callback.PROCESS_LINKED_EVENT, this.cachedNextEventCallback)
  internal.RegisterCallback(internal.callback.PROCESS_MISSED_EVENT, this.cachedNextEventCallback)

  table.sort(events, (a: CachedEvent, b: CachedEvent): boolean => a.eventId < b.eventId)

  const task = asAsyncTask(internal.CreateAsyncTask())
  const numEvents = events.length
  this.eventsLeft = numEvents
  task
    .For(1, numEvents)
    .Do((i: number): undefined => {
      const entry = events[i]
      if (entry == null) {
        return
      }
      this.currentEventId = entry.eventId
      this.eventsLeft = numEvents - i
      this.performanceTracker.Increment()
      asLegacyEventCallback(this.nextEventCallback)(...entry.arguments)
    })
    .Then((): undefined => {
      this.OnProcessingCachedEventsCompleted()
      this.performanceTracker.Reset()
      this.eventsLeft = 0
      this.task = undefined
    })
  this.task = task
}

GuildHistoryLegacyEventListener.OnProcessingCachedEventsCompleted = function (this) {
  const events = this.cachedEvents
  logger.Debug("processing cached events completed", this.key, events.length)
  if (events.length > 0) {
    this.cachedEvents = []
    logger.Debug("unregister cached event callbacks")
    internal.UnregisterCallback(
      internal.callback.PROCESS_LINKED_EVENT,
      this.cachedNextEventCallback
    )
    internal.UnregisterCallback(
      internal.callback.PROCESS_MISSED_EVENT,
      this.cachedNextEventCallback
    )

    table.sort(events, (a: CachedEvent, b: CachedEvent): boolean => a.eventId < b.eventId)

    for (const [, event] of ipairs(events)) {
      this.currentEventId = event.eventId
      asLegacyEventCallback(this.nextEventCallback)(...event.arguments)
    }
  }

  let shouldFireIterationCompleted = false
  if (this.shouldStop) {
    logger.Debug("stop after iteration")
    this.Stop()
    shouldFireIterationCompleted = true
  } else {
    logger.Debug("register uncached event callbacks")
    internal.RegisterCallback(
      internal.callback.PROCESS_LINKED_EVENT,
      this.uncachedNextEventCallback
    )
    internal.RegisterCallback(
      internal.callback.PROCESS_MISSED_EVENT,
      this.uncachedNextEventCallback
    )
    shouldFireIterationCompleted = this.hasReachedEndCriteria
  }

  if (this.iterationCompletedCallback != null && shouldFireIterationCompleted) {
    this.iterationCompletedCallback()
  }
}

GuildHistoryLegacyEventListener.StopInternal = function (this) {
  if (!this.running) {
    return false
  }

  logger.Debug("Stopping legacy event listener", this.key)
  for (const [, processor] of ipairs(this.processors)) {
    if (processor.IsRunning() && !processor.Stop()) {
      logger.Warn("Failed to stop processor", processor.GetKey())
    }
  }

  internal.UnregisterCallback(internal.callback.PROCESS_LINKED_EVENT, this.cachedNextEventCallback)
  internal.UnregisterCallback(internal.callback.PROCESS_MISSED_EVENT, this.cachedNextEventCallback)
  internal.UnregisterCallback(
    internal.callback.PROCESS_LINKED_EVENT,
    this.uncachedNextEventCallback
  )
  internal.UnregisterCallback(
    internal.callback.PROCESS_MISSED_EVENT,
    this.uncachedNextEventCallback
  )
  if (this.task != null) {
    this.task.Cancel()
    this.task = undefined
  }
  this.cachedEvents = []
  this.hasReachedEndCriteria = false

  for (const [, cache] of ipairs(this.caches)) {
    cache.UnregisterProcessor(this)
  }

  this.running = false
  return true
}
