import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger

const SHOWN_GUILD_PRIORITY_BONUS = 1000

interface CacheRef {
  IsManagedRangeConnectedToPresent: (this: CacheRef) => boolean
  IsAutoRequesting: (this: CacheRef) => boolean
  GetGuildId: (this: CacheRef) => number
  GetCategory: (this: CacheRef) => number
  GetRequestPriority: (this: CacheRef) => number
  DestroyRequest: (this: CacheRef, request: GuildHistoryServerRequestInstance) => void
  key: string
}

export interface ServerRequestDebugInfo {
  id: number
  oldestTime?: number
  newestTime?: number
  valid: boolean
  complete: boolean
  queued: boolean
  shouldContinue: boolean
  priority: number
}

export interface GuildHistoryServerRequestInstance {
  cache: CacheRef
  newestTime?: number
  oldestTime?: number
  destroyed: boolean
  queued: boolean
  request?: ZoGuildHistoryRequest

  Initialize: (
    this: GuildHistoryServerRequestInstance,
    cache: CacheRef,
    newestTime: number | undefined,
    oldestTime: number | undefined
  ) => void
  GetNewestTime: (this: GuildHistoryServerRequestInstance) => number
  GetOldestTime: (this: GuildHistoryServerRequestInstance) => number
  GetRequestId: (this: GuildHistoryServerRequestInstance) => number
  IsInitialRequest: (this: GuildHistoryServerRequestInstance) => boolean
  IsDestroyed: (this: GuildHistoryServerRequestInstance) => boolean
  IsValid: (this: GuildHistoryServerRequestInstance) => boolean
  IsComplete: (this: GuildHistoryServerRequestInstance) => boolean
  IsRequestQueued: (this: GuildHistoryServerRequestInstance) => boolean
  SetQueued: (this: GuildHistoryServerRequestInstance, queued: boolean) => void
  ShouldContinue: (this: GuildHistoryServerRequestInstance) => boolean
  ShouldSend: (this: GuildHistoryServerRequestInstance) => boolean
  Send: (this: GuildHistoryServerRequestInstance) => number
  Destroy: (this: GuildHistoryServerRequestInstance) => boolean
  GetPriority: (this: GuildHistoryServerRequestInstance) => number
  GetDebugInfo: (this: GuildHistoryServerRequestInstance) => ServerRequestDebugInfo
}

export interface GuildHistoryServerRequestClass extends GuildHistoryServerRequestInstance {
  New: (
    this: GuildHistoryServerRequestClass,
    cache: CacheRef,
    newestTime: number | undefined,
    oldestTime: number | undefined
  ) => GuildHistoryServerRequestInstance
}

const GuildHistoryServerRequest = ZO_InitializingObject.Subclass<GuildHistoryServerRequestClass>()
internal.class.GuildHistoryServerRequest = GuildHistoryServerRequest

GuildHistoryServerRequest.Initialize = function (this, cache, newestTime, oldestTime) {
  this.cache = cache
  this.newestTime = newestTime
  this.oldestTime = oldestTime
  this.destroyed = false
  this.queued = false
}

GuildHistoryServerRequest.GetNewestTime = function (this) {
  if (this.newestTime != null) {
    return this.newestTime
  }
  return GetTimeStamp()
}

GuildHistoryServerRequest.GetOldestTime = function (this) {
  if (this.oldestTime != null) {
    return this.oldestTime
  }
  return 0
}

GuildHistoryServerRequest.GetRequestId = function (this) {
  if (this.request != null) {
    return this.request.GetRequestId()
  }
  return -1
}

GuildHistoryServerRequest.IsInitialRequest = function (this) {
  return this.oldestTime == null || this.oldestTime === 0
}

GuildHistoryServerRequest.IsDestroyed = function (this) {
  return this.destroyed
}

GuildHistoryServerRequest.IsValid = function (this) {
  if (this.destroyed) {
    return false
  }

  if (this.request != null) {
    return this.request.IsValid()
  }

  return true
}

GuildHistoryServerRequest.IsComplete = function (this) {
  if (this.request != null) {
    return this.request.IsComplete()
  }

  return false
}

GuildHistoryServerRequest.IsRequestQueued = function (this) {
  if (this.queued) {
    return true
  }

  if (this.request != null) {
    return this.request.IsRequestQueued()
  }

  return false
}

GuildHistoryServerRequest.SetQueued = function (this, queued) {
  this.queued = queued
}

GuildHistoryServerRequest.ShouldContinue = function (this) {
  if (
    this.IsInitialRequest() ||
    this.cache.IsManagedRangeConnectedToPresent() ||
    !this.cache.IsAutoRequesting()
  ) {
    return false
  }

  if (this.request != null) {
    return this.request.IsValid() && !this.request.IsComplete()
  }

  return true
}

GuildHistoryServerRequest.ShouldSend = function (this) {
  if (this.destroyed) {
    logger.Debug("Found destroyed request in queue - removing")
    return false
  }

  if (!this.IsValid()) {
    logger.Debug("Found invalid request in queue - removing")
    return false
  }

  if (this.IsComplete()) {
    logger.Debug("Found completed request in queue - removing")
    return false
  }

  return !this.cache.IsManagedRangeConnectedToPresent()
}

GuildHistoryServerRequest.Send = function (this) {
  if (this.request == null) {
    const guildId = this.cache.GetGuildId()
    const category = this.cache.GetCategory()
    this.request = ZO_GuildHistoryRequest.New(guildId, category, this.newestTime, this.oldestTime)
  }

  const request = this.request
  logger.Debug(
    "Send request",
    request.requestId,
    request.guildId,
    request.eventCategory,
    request.newestTimeS,
    request.oldestTimeS
  )
  return request.RequestMoreEvents()
}

GuildHistoryServerRequest.Destroy = function (this) {
  if (this.destroyed) {
    return true
  }
  this.destroyed = true
  if (this.request != null && !this.IsInitialRequest()) {
    const id = this.request.GetRequestId()
    if (!DestroyGuildHistoryRequest(id)) {
      logger.Warn("Failed to destroy request", id)
      return false
    }
  }
  this.cache.DestroyRequest(this)
  return true
}

GuildHistoryServerRequest.GetPriority = function (this) {
  let priority = this.cache.GetRequestPriority()
  if (internal.IsGuildStatusVisible(this.cache.GetGuildId())) {
    priority = priority + SHOWN_GUILD_PRIORITY_BONUS
  }
  return priority
}

GuildHistoryServerRequest.GetDebugInfo = function (this) {
  return {
    id: this.GetRequestId(),
    oldestTime: this.oldestTime,
    newestTime: this.newestTime,
    valid: this.IsValid(),
    complete: this.IsComplete(),
    queued: this.IsRequestQueued(),
    shouldContinue: this.ShouldContinue(),
    priority: this.GetPriority(),
  }
}

export { GuildHistoryServerRequest }
