import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger

function asPerformanceTrackerClassRef(value: unknown): PerformanceTrackerClassRef {
  return value as PerformanceTrackerClassRef
}
function asAsyncTask(value: unknown): AsyncTask {
  return value as AsyncTask
}
function asNumber(value: unknown): number {
  return value as number
}

interface CacheEventRef {
  GetEventId: (this: CacheEventRef) => number
  GetEventTimestampS: (this: CacheEventRef) => number
}

interface CategoryCacheRef {
  GetIndexRangeForEventIdRange: (
    this: CategoryCacheRef,
    startId: number,
    endId: number
  ) => LuaMultiReturn<[number, number]>
  GetEvent: (this: CategoryCacheRef, index: number) => CacheEventRef
  FindFirstAvailableEventIdForEventId: (
    this: CategoryCacheRef,
    eventId: number
  ) => number | undefined
  FindFirstAvailableEventIdForEventTime: (
    this: CategoryCacheRef,
    eventTime: number
  ) => number | undefined
  FindLastAvailableEventIdForEventId: (
    this: CategoryCacheRef,
    eventId: number
  ) => number | undefined
  FindLastAvailableEventIdForEventTime: (
    this: CategoryCacheRef,
    eventTime: number
  ) => number | undefined
  GetOldestManagedEventInfo: (this: CategoryCacheRef) => number | undefined
  GetNewestManagedEventInfo: (this: CategoryCacheRef) => number | undefined
}

interface ProcessorRef {
  GetKey: (this: ProcessorRef) => string
  IsRunning: (this: ProcessorRef) => boolean
  addonName?: string
  currentEventId?: number
  afterEventId?: number
  afterEventTime?: number
  beforeEventId?: number
  beforeEventTime?: number
  categoryCache: CategoryCacheRef
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

type OnEventCallback = (this: void, processor: ProcessorRef, event: CacheEventRef) => void
type OnCompletedCallback = (this: void, processor: ProcessorRef) => void

export interface ProcessingEventDebugInfo {
  id: number
  time: number
  index: number
}

export interface ProcessingRequestDebugInfo {
  pendingEventMetrics: [number, number, number]
  hasAsyncTask: boolean
  currentEvent?: ProcessingEventDebugInfo
  endEvent?: ProcessingEventDebugInfo
}

export interface GuildHistoryProcessingRequestInstance {
  processor: ProcessorRef
  onEvent: OnEventCallback
  onCompleted: OnCompletedCallback
  performanceTracker: PerformanceTrackerRef
  task?: AsyncTask
  currentIndex?: number
  endIndex?: number

  Initialize: (
    this: GuildHistoryProcessingRequestInstance,
    processor: ProcessorRef,
    onEvent: OnEventCallback,
    onCompleted: OnCompletedCallback
  ) => void
  StartProcessing: (this: GuildHistoryProcessingRequestInstance, endId?: number) => void
  StopProcessing: (this: GuildHistoryProcessingRequestInstance) => void
  FindStartId: (this: GuildHistoryProcessingRequestInstance) => number | undefined
  FindEndId: (this: GuildHistoryProcessingRequestInstance) => number | undefined
  EnsureIterationIsComplete: (
    this: GuildHistoryProcessingRequestInstance,
    hasProcessedEvents: boolean
  ) => void
  GetPendingEventMetrics: (
    this: GuildHistoryProcessingRequestInstance
  ) => LuaMultiReturn<[number, number, number]>
  GetDebugInfo: (this: GuildHistoryProcessingRequestInstance) => ProcessingRequestDebugInfo
}

export interface GuildHistoryProcessingRequestClass extends GuildHistoryProcessingRequestInstance {
  New: (
    this: GuildHistoryProcessingRequestClass,
    processor: ProcessorRef,
    onEvent: OnEventCallback,
    onCompleted: OnCompletedCallback
  ) => GuildHistoryProcessingRequestInstance
}

const GuildHistoryProcessingRequest =
  ZO_InitializingObject.Subclass<GuildHistoryProcessingRequestClass>()
internal.class.GuildHistoryProcessingRequest = GuildHistoryProcessingRequest

GuildHistoryProcessingRequest.Initialize = function (this, processor, onEvent, onCompleted) {
  this.processor = processor
  this.onEvent = onEvent
  this.onCompleted = onCompleted
  const performanceTrackerClass = asPerformanceTrackerClassRef(internal.class.PerformanceTracker)
  this.performanceTracker = performanceTrackerClass.New()
}

GuildHistoryProcessingRequest.StartProcessing = function (this, endId) {
  logger.Debug("start processing", this.processor.GetKey())
  assert(
    this.processor.IsRunning(),
    "Processor " +
      this.processor.GetKey() +
      " should be running (" +
      (this.processor.addonName ?? "-") +
      ")"
  )[0]
  this.StopProcessing()

  let hasProcessedEvents = false

  const processor = this.processor
  let startId = processor.currentEventId
  if (startId == null) {
    logger.Debug("no startId - find one")
    startId = this.FindStartId()
  }

  if (startId == null) {
    logger.Debug("still no startId - are we done?")
    this.EnsureIterationIsComplete(hasProcessedEvents)
    return
  }

  const resolvedStartId = startId
  endId = endId ?? this.FindEndId()

  if (endId == null || resolvedStartId > endId) {
    logger.Debug("startId is greater than endId - are we done?")
    this.EnsureIterationIsComplete(hasProcessedEvents)
    return
  }

  const resolvedEndId = endId
  const [startIndex, endIndex] = processor.categoryCache.GetIndexRangeForEventIdRange(
    resolvedStartId,
    resolvedEndId
  )
  this.currentIndex = startIndex
  this.endIndex = endIndex
  this.performanceTracker.Reset()
  this.task = asAsyncTask(internal.CreateAsyncTask())
  logger.Debug("run processing task", startIndex, endIndex)
  this.task
    .For(startIndex, endIndex, -1)
    .Do((i: number) => {
      this.currentIndex = i
      this.performanceTracker.Increment()
      const event = processor.categoryCache.GetEvent(i)
      const eventId = event.GetEventId()
      if (eventId < resolvedStartId || eventId > resolvedEndId) {
        logger.Verbose("event out of processing range", eventId, resolvedStartId, resolvedEndId, i)
        return
      }
      this.onEvent(processor, event)
      hasProcessedEvents = true
    })
    .Then(() => {
      logger.Debug(
        "processing complete",
        processor.GetKey(),
        this.currentIndex,
        startIndex,
        endIndex
      )
      this.task = undefined
      this.EnsureIterationIsComplete(hasProcessedEvents)
    })
}

GuildHistoryProcessingRequest.StopProcessing = function (this) {
  if (this.task != null) {
    logger.Debug("stop processing")
    this.performanceTracker.Reset()
    this.task.Cancel()
    this.task = undefined
    this.currentIndex = undefined
    this.endIndex = undefined
  }
}

GuildHistoryProcessingRequest.FindStartId = function (this) {
  let startId: number | undefined
  const processor = this.processor
  if (processor.afterEventId != null) {
    startId = processor.categoryCache.FindFirstAvailableEventIdForEventId(processor.afterEventId)
    logger.Debug("afterEventId", processor.afterEventId, startId)
  } else if (processor.afterEventTime != null) {
    startId = processor.categoryCache.FindFirstAvailableEventIdForEventTime(
      processor.afterEventTime
    )
    logger.Debug("afterEventTime", processor.afterEventTime, startId)
  }
  if (startId == null) {
    startId = processor.categoryCache.GetOldestManagedEventInfo()
    logger.Debug("no startId - use oldest", startId)
  }
  return startId
}

GuildHistoryProcessingRequest.FindEndId = function (this) {
  let endId: number | undefined
  const processor = this.processor
  if (processor.beforeEventId != null) {
    endId = processor.categoryCache.FindLastAvailableEventIdForEventId(processor.beforeEventId)
    logger.Debug("beforeEventId", processor.beforeEventId, endId)
  } else if (processor.beforeEventTime != null) {
    endId = processor.categoryCache.FindLastAvailableEventIdForEventTime(processor.beforeEventTime)
    logger.Debug("beforeEventTime", processor.beforeEventTime, endId)
  }
  if (endId == null) {
    endId = processor.categoryCache.GetNewestManagedEventInfo()
    logger.Debug("no endId - use newest", endId)
  }
  return endId
}

GuildHistoryProcessingRequest.EnsureIterationIsComplete = function (this, hasProcessedEvents) {
  const endId = this.FindEndId()
  const processor = this.processor
  if (processor.currentEventId == null || processor.currentEventId === endId) {
    logger.Debug("iterated all stored events - register for callback")
    this.onCompleted(processor)
  } else if (hasProcessedEvents) {
    logger.Debug("has not reached the end yet - go for another round")
    this.StartProcessing(endId)
  } else {
    error("no events processed and not at the end - something went wrong")
  }
}

GuildHistoryProcessingRequest.GetPendingEventMetrics = function (this) {
  if (this.task == null) {
    return $multi(0, -1, -1)
  }
  const count = asNumber(this.currentIndex) - asNumber(this.endIndex)
  const [speed, timeLeft] = this.performanceTracker.GetProcessingSpeedAndEstimatedTimeLeft(count)
  return $multi(count, speed, timeLeft)
}

GuildHistoryProcessingRequest.GetDebugInfo = function (this) {
  const [count, speed, timeLeft] = this.GetPendingEventMetrics()
  const debugInfo: ProcessingRequestDebugInfo = {
    pendingEventMetrics: [count, speed, timeLeft],
    hasAsyncTask: this.task != null,
  }

  const currentIndex = this.currentIndex
  if (currentIndex != null) {
    const currentEvent = this.processor.categoryCache.GetEvent(currentIndex)
    debugInfo.currentEvent = {
      id: currentEvent.GetEventId(),
      time: currentEvent.GetEventTimestampS(),
      index: currentIndex,
    }
  }

  const endIndex = this.endIndex
  if (endIndex != null) {
    const endEvent = this.processor.categoryCache.GetEvent(endIndex)
    debugInfo.endEvent = {
      id: endEvent.GetEventId(),
      time: endEvent.GetEventTimestampS(),
      index: endIndex,
    }
  }

  return debugInfo
}

export { GuildHistoryProcessingRequest }
