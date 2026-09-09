import { GuildHistoryCacheCategory } from "../histoire-category-class/histoire-category-class.module.code.ts"
import {
  INITIAL_REQUEST_RESEND_THRESHOLD,
  MISSING_EVENT_COUNT_THRESHOLD,
} from "../histoire-category-thresholds/histoire-category-thresholds.module.code.ts"
import type { ServerRequestClassRef } from "../histoire-category-types/histoire-category-types.module.code.ts"
import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger

function asServerRequestClassRef(value: unknown): ServerRequestClassRef {
  return value as ServerRequestClassRef
}

function asNumber(value: unknown): number {
  return value as number
}

GuildHistoryCacheCategory.ShouldSendInitialRequest = function (this, oldestManagedEventId) {
  const timeSinceLastInitialRequest = GetTimeStamp() - (this.saveData.initialRequestTime ?? 0)
  if (
    oldestManagedEventId == null &&
    timeSinceLastInitialRequest < INITIAL_REQUEST_RESEND_THRESHOLD
  ) {
    logger.Debug("Initial request on cooldown")
    return false
  }

  let shouldSend = true
  if (this.category === GUILD_HISTORY_EVENT_CATEGORY_TRADER) {
    shouldSend = DoesGuildHavePrivilege(this.guildId, GUILD_PRIVILEGE_TRADING_HOUSE)
  } else if (
    this.category === GUILD_HISTORY_EVENT_CATEGORY_BANKED_CURRENCY ||
    this.category === GUILD_HISTORY_EVENT_CATEGORY_BANKED_ITEM
  ) {
    shouldSend = DoesGuildHavePrivilege(this.guildId, GUILD_PRIVILEGE_BANK_DEPOSIT)
  }
  logger.Debug("Should send initial request", shouldSend)
  return shouldSend
}

GuildHistoryCacheCategory.RequestMissingData = function (this) {
  if (this.ContinueExistingRequest() || !this.IsAutoRequesting()) {
    return
  }
  logger.Debug("Request missing data for", this.key)

  if (this.IsManagedRangeConnectedToPresent()) {
    logger.Debug("Already connected to present", this.key)
    this.OnCategoryUpdated()
    return
  }

  const [oldestManagedEventId, oldestManagedEventTime] = this.GetOldestManagedEventInfo()
  const [newestManagedEventId, newestManagedEventTime] = this.GetNewestManagedEventInfo()
  const oldestGaplessEventIndex = GetOldestGuildHistoryEventIndexForUpToDateEventsWithoutGaps(
    asNumber(this.guild),
    this.category
  )
  if (oldestManagedEventId == null || newestManagedEventId == null) {
    if (oldestGaplessEventIndex != null) {
      this.OnCategoryUpdated()
    } else if (this.ShouldSendInitialRequest(oldestManagedEventId)) {
      this.QueueInitialRequest()
    }
    return
  }

  let oldestGaplessEventTime: number | undefined
  if (oldestGaplessEventIndex != null) {
    const [oldestGaplessEventId, oldestGaplessEventTimeFound] = GetGuildHistoryEventBasicInfo(
      asNumber(this.guild),
      this.category,
      oldestGaplessEventIndex
    )
    oldestGaplessEventTime = oldestGaplessEventTimeFound
    logger.Verbose(
      "oldestGaplessEventId",
      oldestGaplessEventId,
      "oldestManagedEventId",
      oldestManagedEventId
    )
    if (oldestManagedEventId === oldestGaplessEventId) {
      logger.Debug("No missing data for", this.key)
      this.OnCategoryUpdated()
      return
    }
  } else {
    logger.Verbose("no oldestGaplessEventIndex")
  }

  const [requestNewestTime, requestOldestTime] = this.OptimizeRequestTimeRange(
    oldestManagedEventTime,
    newestManagedEventTime,
    oldestGaplessEventTime
  )
  if (requestOldestTime != null) {
    this.requestManager.QueueRequest(this.CreateRequest(requestNewestTime, requestOldestTime))
  }
}

GuildHistoryCacheCategory.QueueInitialRequest = function (this) {
  if (this.request != null) {
    this.DestroyRequest()
  }
  this.requestManager.QueueRequest(this.CreateRequest())
}

GuildHistoryCacheCategory.ContinueExistingRequest = function (this) {
  const request = this.request
  if (request != null) {
    if (request.IsInitialRequest()) {
      this.saveData.initialRequestTime = GetTimeStamp()
    }

    if (request.ShouldContinue()) {
      logger.Debug("Queue existing request", this.key)
      this.requestManager.QueueRequest(request)
      return true
    } else {
      logger.Debug("Destroy existing request", this.key)
      this.DestroyRequest()
    }
  }
  return false
}

GuildHistoryCacheCategory.HasPendingRequest = function (this) {
  return this.request != null
}

GuildHistoryCacheCategory.VerifyRequest = function (this) {
  const request = this.request
  if (request != null) {
    if (request.IsComplete()) {
      logger.Warn("Request is complete but was not destroyed", this.key)
      this.DestroyRequest()
    } else if (!request.IsValid()) {
      logger.Warn("Request is invalid but was not destroyed", this.key)
      this.DestroyRequest()
    } else if (!request.IsRequestQueued()) {
      logger.Warn("Request is not queued", this.key)
      this.requestManager.QueueRequest(request)
    } else {
      logger.Debug("Request is valid and queued", this.key)
    }
  } else if (!this.HasLinked()) {
    logger.Debug("No request and not linked", this.key)
    this.RequestMissingData()
  }
}

GuildHistoryCacheCategory.CreateRequest = function (this, newestTime, oldestTime) {
  logger.Debug("Create server request", this.key)
  this.request = asServerRequestClassRef(internal.class.GuildHistoryServerRequest).New(
    this,
    newestTime,
    oldestTime
  )
  internal.FireCallbacks(internal.callback.REQUEST_CREATED, this.request)
  return this.request
}

GuildHistoryCacheCategory.DestroyRequest = function (this, request) {
  if (this.request == null || (request != null && this.request !== request)) {
    return
  }
  logger.Debug("destroy server request", this.key)
  const currentRequest = this.request
  this.request = undefined
  if (!currentRequest.Destroy()) {
    return
  }
  if (currentRequest.IsRequestQueued()) {
    this.requestManager.RemoveRequest(currentRequest)
  }
  internal.FireCallbacks(internal.callback.REQUEST_DESTROYED, currentRequest)
}

GuildHistoryCacheCategory.OptimizeRequestTimeRange = function (
  this,
  oldestManagedEventTime,
  newestManagedEventTime,
  oldestGaplessEventTime
) {
  if (newestManagedEventTime == null || oldestManagedEventTime == null) {
    logger.Warn("Time range optimization failed - Missing managed event times")
    return $multi(undefined, undefined)
  }

  if (oldestGaplessEventTime != null && oldestGaplessEventTime <= newestManagedEventTime) {
    logger.Warn("Time range optimization failed - Invalid time range")
    return $multi(undefined, undefined)
  }

  const requestOldestTime = newestManagedEventTime - 1
  let requestNewestTime: number | undefined
  if (oldestGaplessEventTime != null) {
    requestNewestTime = oldestGaplessEventTime + 1
    logger.Verbose("Has gapless event time")
  }
  const guildId = this.guildId
  const category = this.category
  logger.Debug("Optimize request time range for", this.key)

  const [newestIndex, oldestIndex] = this.adapter.GetGuildHistoryEventIndicesForTimeRange(
    guildId,
    category,
    newestManagedEventTime,
    oldestManagedEventTime
  )
  if (newestIndex == null || oldestIndex == null) {
    logger.Warn("Time range optimization failed - could not find events in managed range")
    return $multi(requestNewestTime, requestOldestTime)
  }

  const numEvents = oldestIndex - newestIndex + 1
  const managedRangeSeconds = newestManagedEventTime - oldestManagedEventTime
  const requestRangeSeconds = (requestNewestTime ?? GetTimeStamp()) - requestOldestTime

  const estimatedMissingEvents = (numEvents * requestRangeSeconds) / managedRangeSeconds
  logger.Verbose(
    "estimatedMissingEvents",
    estimatedMissingEvents,
    numEvents,
    requestRangeSeconds,
    managedRangeSeconds
  )
  if (estimatedMissingEvents > MISSING_EVENT_COUNT_THRESHOLD) {
    logger.Debug("Limit request time range")
    const optimizedRequestNewestTime =
      newestManagedEventTime +
      ((managedRangeSeconds / numEvents) * MISSING_EVENT_COUNT_THRESHOLD) / 2
    if (optimizedRequestNewestTime > requestOldestTime) {
      requestNewestTime = optimizedRequestNewestTime
    } else {
      logger.Warn("Time range optimization failed - request range is invalid")
    }
  }

  logger.Verbose("Optimized request time range", requestNewestTime, requestOldestTime)
  return $multi(requestNewestTime, requestOldestTime)
}

GuildHistoryCacheCategory.GetRequestTimeRange = function (this) {
  const request = this.request
  if (request != null) {
    return $multi(request.GetOldestTime(), request.GetNewestTime())
  }
  return $multi(undefined, undefined)
}
