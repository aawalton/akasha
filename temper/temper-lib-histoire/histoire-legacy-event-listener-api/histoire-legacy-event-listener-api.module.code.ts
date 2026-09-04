import { GuildHistoryLegacyEventListener } from "../histoire-legacy-event-listener/histoire-legacy-event-listener.module.code.ts"
import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger

GuildHistoryLegacyEventListener.GetKey = function (this) {
  return this.key
}

GuildHistoryLegacyEventListener.GetGuildId = function (this) {
  return this.guildId
}

GuildHistoryLegacyEventListener.GetCategory = function (this) {
  return this.legacyCategory
}

GuildHistoryLegacyEventListener.GetPendingEventMetrics = function (this) {
  const numProcessors = this.processors.length
  if (!this.running || numProcessors === 0) {
    return $multi(0, -1, -1)
  }

  if (this.iterationCompletedCount < numProcessors) {
    if (numProcessors === 1) {
      const firstProcessor = this.processors[1]
      if (firstProcessor != null) {
        return firstProcessor.GetPendingEventMetrics()
      }
    }

    let count = 0
    let speed = 0
    let time = 0
    for (const [, processor] of ipairs(this.processors)) {
      const [c, s, t] = processor.GetPendingEventMetrics()
      count = count + c
      if (s > 0) {
        speed = speed + s
      }
      if (t > 0) {
        time = time + t
      }
    }
    speed = speed / numProcessors
    time = time / numProcessors

    return $multi(count, speed, time)
  } else {
    const count = this.eventsLeft
    const [speed, time] = this.performanceTracker.GetProcessingSpeedAndEstimatedTimeLeft(count)
    return $multi(count, speed, time)
  }
}

GuildHistoryLegacyEventListener.SetAfterEventId = function (this, eventId) {
  if (this.running) {
    return false
  }

  const id = internal.ConvertLegacyId64ToEventId?.(eventId)
  if (id == null) {
    return false
  }

  for (const [, processor] of ipairs(this.processors)) {
    processor.SetAfterEventId(id)
  }
  this.afterEventId = id
  return true
}

GuildHistoryLegacyEventListener.SetAfterEventTime = function (this, eventTime) {
  if (this.running) {
    return false
  }

  for (const [, processor] of ipairs(this.processors)) {
    processor.SetAfterEventTime(eventTime)
  }
  this.afterEventTime = eventTime
  return true
}

GuildHistoryLegacyEventListener.SetBeforeEventId = function (this, eventId) {
  if (this.running) {
    return false
  }

  const id = internal.ConvertLegacyId64ToEventId?.(eventId)
  if (id == null) {
    return false
  }

  for (const [, processor] of ipairs(this.processors)) {
    processor.SetBeforeEventId(id)
  }
  this.beforeEventId = id
  return true
}

GuildHistoryLegacyEventListener.SetBeforeEventTime = function (this, eventTime) {
  if (this.running) {
    return false
  }

  for (const [, processor] of ipairs(this.processors)) {
    processor.SetBeforeEventTime(eventTime + 1)
  }
  this.beforeEventTime = eventTime
  return true
}

GuildHistoryLegacyEventListener.SetTimeFrame = function (this, startTime, endTime) {
  if (this.running) {
    return false
  }

  for (const [, processor] of ipairs(this.processors)) {
    processor.SetAfterEventTime(startTime - 1)
    processor.SetBeforeEventTime(endTime)
  }
  return true
}

GuildHistoryLegacyEventListener.SetNextEventCallback = function (this, callback) {
  if (this.running) {
    return false
  }

  this.nextEventCallback = callback
  for (const [, processor] of ipairs(this.processors)) {
    processor.SetNextEventCallback(this.onEvent)
  }
  return true
}

GuildHistoryLegacyEventListener.SetMissedEventCallback = function (this, callback) {
  if (this.running) {
    return false
  }

  this.missedEventCallback = callback
  for (const [, processor] of ipairs(this.processors)) {
    processor.SetMissedEventCallback(this.onEvent)
  }
  return true
}

GuildHistoryLegacyEventListener.SetEventCallback = function (this, callback) {
  if (this.running) {
    return false
  }
  this.SetNextEventCallback(callback)
  this.SetMissedEventCallback(callback)
  return true
}

GuildHistoryLegacyEventListener.SetIterationCompletedCallback = function (this, callback) {
  if (this.running) {
    return false
  }

  this.iterationCompletedCallback = callback
  return true
}

GuildHistoryLegacyEventListener.SetStopOnLastEvent = function (this, shouldStop) {
  if (this.running) {
    return false
  }

  this.shouldStop = shouldStop
  return true
}

GuildHistoryLegacyEventListener.Start = function (this) {
  if (this.running) {
    return false
  }

  this.iterationCompletedCount = 0
  this.cachedEvents = []
  for (const [, processor] of ipairs(this.processors)) {
    if (!processor.Start()) {
      logger.Warn("Failed to start processor", processor.GetKey())
    }
  }

  for (const [, cache] of ipairs(this.caches)) {
    cache.RegisterProcessor(this)
  }

  this.running = true
  return true
}

GuildHistoryLegacyEventListener.Stop = function (this) {
  return this.StopInternal()
}

GuildHistoryLegacyEventListener.IsRunning = function (this) {
  return this.running ?? false
}
