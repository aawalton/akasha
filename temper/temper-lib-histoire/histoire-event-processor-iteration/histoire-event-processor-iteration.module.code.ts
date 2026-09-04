import {
  GuildHistoryEventProcessor,
  handleEvent,
  type ProcessingRequestClassRef,
  type ProcessingRequestRef,
} from "../histoire-event-processor/histoire-event-processor.module.code.ts"
import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger

function asProcessingRequestClassRef(value: unknown): ProcessingRequestClassRef {
  return value as ProcessingRequestClassRef
}

GuildHistoryEventProcessor.Start = function (this) {
  if (this.running) {
    return false
  }

  if (this.nextEventCallback != null || this.missedEventCallback != null) {
    const requestClass = asProcessingRequestClassRef(internal.class.GuildHistoryProcessingRequest)
    const request: ProcessingRequestRef = requestClass.New(this, handleEvent, (): undefined => {
      this.categoryCache.RemoveProcessingRequest(request)
      this.request = undefined
      if (this.stopOnLastCachedEvent) {
        logger.Verbose("stopOnLastEvent", this.GetKey(), this.addonName)
        assert(
          this.running,
          "Processor " + this.GetKey() + " should be running (" + (this.addonName ?? "-") + ")"
        )[0]
        this.StopInternal(internal.STOP_REASON_LAST_CACHED_EVENT_REACHED)
      } else {
        logger.Verbose("RegisterForFutureEvents")
        internal.RegisterCallback(internal.callback.PROCESS_LINKED_EVENT, this.nextEventProcessor)
        internal.RegisterCallback(internal.callback.PROCESS_MISSED_EVENT, this.missedEventProcessor)
        if (this.futureEventsCallback != null) {
          this.futureEventsCallback()
        }
      }
    })
    this.request = request
    this.categoryCache.QueueProcessingRequest(request)
  } else {
    logger.Warn("Tried to start a processor without setting an event callback first")
    return false
  }

  if (this.addonName != null) {
    this.categoryCache.RegisterProcessor(this)
  }
  this.running = true
  return true
}

GuildHistoryEventProcessor.StartIteratingTimeRange = function (
  this,
  startTime,
  endTime,
  eventCallback,
  finishedCallback
) {
  if (this.running) {
    return false
  }

  this.afterEventTime = startTime - 1
  this.beforeEventTime = endTime
  this.stopOnLastCachedEvent = true
  this.nextEventCallback = eventCallback
  this.onStopCallback = finishedCallback

  return this.Start()
}

GuildHistoryEventProcessor.StartStreaming = function (this, lastProcessedId, eventCallback) {
  if (this.running) {
    return false
  }

  this.afterEventId = lastProcessedId
  if (eventCallback != null) {
    this.nextEventCallback = eventCallback
  }

  if (this.nextEventCallback == null) {
    logger.Warn("Tried to start a processor without setting an event callback first")
    return false
  }

  return this.Start()
}
