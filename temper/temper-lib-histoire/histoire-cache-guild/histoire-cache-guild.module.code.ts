import type {
  GuildHistoryCacheCategoryClass,
  GuildHistoryCacheCategoryInstance,
} from "../histoire-category-class-shape/histoire-category-class-shape.module.code.ts"
import type { GuildDataRef } from "../histoire-category-types/histoire-category-types.module.code.ts"
import { internal } from "../histoire-state/histoire-state.module.code.ts"
import type { GradientPair } from "../histoire-types/histoire-types.module.code.ts"

const logger = internal.logger

const LINK_TIMOUT_THRESHOLD = 60 * 60 * 24 * 7

function asGuildHistoryCacheCategoryClass(value: unknown): GuildHistoryCacheCategoryClass {
  return value as GuildHistoryCacheCategoryClass
}

function asNumber(value: unknown): number {
  return value as number
}

export interface CacheGuildDataRef extends GuildDataRef {
  GetEventCategoryData: (
    this: CacheGuildDataRef,
    eventCategory: number
  ) => CategoryDataLike | undefined
}

export type CategoryDataLike = Parameters<GuildHistoryCacheCategoryClass["New"]>[2]

export interface GuildProgressBarRef {
  SetValue: (this: GuildProgressBarRef, value: number) => void
  SetGradient: (this: GuildProgressBarRef, gradient: GradientPair | undefined) => void
}

export interface GuildHistoryCacheGuildInstance {
  guildId: number
  cache: LuaTable<number, GuildHistoryCacheCategoryInstance>

  Initialize: (
    this: GuildHistoryCacheGuildInstance,
    adapter: Parameters<GuildHistoryCacheCategoryClass["New"]>[0],
    requestManager: Parameters<GuildHistoryCacheCategoryClass["New"]>[1],
    guildData: CacheGuildDataRef
  ) => void
  GetGuildId: (this: GuildHistoryCacheGuildInstance) => number
  StartRequests: (this: GuildHistoryCacheGuildInstance) => void
  VerifyRequests: (this: GuildHistoryCacheGuildInstance) => void
  DeleteRequests: (this: GuildHistoryCacheGuildInstance) => void
  GetCategoryCache: (
    this: GuildHistoryCacheGuildInstance,
    eventCategory: number
  ) => GuildHistoryCacheCategoryInstance | undefined
  GetProgress: (this: GuildHistoryCacheGuildInstance) => number
  UpdateProgressBar: (this: GuildHistoryCacheGuildInstance, bar: GuildProgressBarRef) => void
  GetNumLoadedManagedEvents: (this: GuildHistoryCacheGuildInstance) => number
  GetOldestManagedEventInfo: (
    this: GuildHistoryCacheGuildInstance
  ) => LuaMultiReturn<[number | undefined, number | undefined]>
  GetNewestManagedEventInfo: (
    this: GuildHistoryCacheGuildInstance
  ) => LuaMultiReturn<[number | undefined, number | undefined]>
  HasLinked: (this: GuildHistoryCacheGuildInstance) => boolean
  HasLinkedRecently: (this: GuildHistoryCacheGuildInstance) => boolean
  IsProcessing: (this: GuildHistoryCacheGuildInstance) => boolean
  HasPendingRequests: (this: GuildHistoryCacheGuildInstance) => boolean
  IsAggregated: (this: GuildHistoryCacheGuildInstance) => boolean
  GetDebugInfo: (this: GuildHistoryCacheGuildInstance) => LuaTable<string, unknown>
}

export interface GuildHistoryCacheGuildClass extends GuildHistoryCacheGuildInstance {
  New: (
    this: GuildHistoryCacheGuildClass,
    adapter: Parameters<GuildHistoryCacheCategoryClass["New"]>[0],
    requestManager: Parameters<GuildHistoryCacheCategoryClass["New"]>[1],
    guildData: CacheGuildDataRef
  ) => GuildHistoryCacheGuildInstance
}

const GuildHistoryCacheGuild = ZO_InitializingObject.Subclass<GuildHistoryCacheGuildClass>()
internal.class.GuildHistoryCacheGuild = GuildHistoryCacheGuild

export { GuildHistoryCacheGuild }

GuildHistoryCacheGuild.Initialize = function (this, adapter, requestManager, guildData) {
  this.guildId = guildData.GetId()
  this.cache = new LuaTable<number, GuildHistoryCacheCategoryInstance>()

  const guildHistoryCacheCategory = asGuildHistoryCacheCategoryClass(
    internal.class.GuildHistoryCacheCategory
  )
  for (
    let eventCategory = GUILD_HISTORY_EVENT_CATEGORY_ITERATION_BEGIN;
    eventCategory <= GUILD_HISTORY_EVENT_CATEGORY_ITERATION_END;
    eventCategory = eventCategory + 1
  ) {
    const categoryData = guildData.GetEventCategoryData(eventCategory)
    if (categoryData != null) {
      this.cache.set(
        eventCategory,
        guildHistoryCacheCategory.New(adapter, requestManager, categoryData)
      )
    }
  }
}

GuildHistoryCacheGuild.GetGuildId = function (this) {
  return this.guildId
}

GuildHistoryCacheGuild.StartRequests = function (this) {
  for (const [, cache] of pairs(this.cache)) {
    cache.RequestMissingData()
  }
}

GuildHistoryCacheGuild.VerifyRequests = function (this) {
  for (const [, cache] of pairs(this.cache)) {
    cache.VerifyRequest()
  }
}

GuildHistoryCacheGuild.DeleteRequests = function (this) {
  for (const [, cache] of pairs(this.cache)) {
    if (cache.request != null) {
      cache.DestroyRequest()
      logger.Debug("Deleted request for", cache.key)
    }
  }
}

GuildHistoryCacheGuild.GetCategoryCache = function (this, eventCategory) {
  return this.cache.get(eventCategory)
}

GuildHistoryCacheGuild.GetProgress = function (this) {
  let progress = 0
  let count = 0
  for (const [, cache] of pairs(this.cache)) {
    if (cache.IsAutoRequesting()) {
      const [cacheProgress] = cache.GetProgress()
      progress = progress + asNumber(cacheProgress)
      count = count + 1
    }
  }
  if (count === 0) {
    return 0
  }
  return progress / count
}

GuildHistoryCacheGuild.UpdateProgressBar = function (this, bar) {
  const isProcessing = this.IsProcessing()
  const isRequesting = this.HasPendingRequests()
  if (isProcessing || isRequesting) {
    bar.SetValue(1)
  } else {
    const progress = this.GetProgress()
    bar.SetValue(progress)
  }

  let gradient: GradientPair | undefined
  if (isProcessing) {
    gradient = internal.GRADIENT_GUILD_PROCESSING
  } else if (isRequesting) {
    gradient = internal.GRADIENT_GUILD_REQUESTING
  } else if (this.HasLinked()) {
    gradient = internal.GRADIENT_GUILD_COMPLETED
  } else {
    gradient = internal.GRADIENT_GUILD_INCOMPLETE
  }
  bar.SetGradient(gradient)
}

GuildHistoryCacheGuild.GetNumLoadedManagedEvents = function (this) {
  let count = 0
  for (const [, cache] of pairs(this.cache)) {
    count = count + cache.GetNumLoadedManagedEvents()
  }
  return count
}

GuildHistoryCacheGuild.GetOldestManagedEventInfo = function (this) {
  let oldestId: number | undefined
  let oldestTime: number | undefined
  for (const [, cache] of pairs(this.cache)) {
    const [eventId, eventTime] = cache.GetOldestManagedEventInfo()
    if (eventId != null && (oldestId == null || eventId < oldestId)) {
      oldestId = eventId
      oldestTime = eventTime
    }
  }
  return $multi(oldestId, oldestTime)
}

GuildHistoryCacheGuild.GetNewestManagedEventInfo = function (this) {
  let newestId: number | undefined
  let newestTime: number | undefined
  for (const [, cache] of pairs(this.cache)) {
    const [eventId, eventTime] = cache.GetNewestManagedEventInfo()
    if (eventId != null && (newestId == null || eventId > newestId)) {
      newestId = eventId
      newestTime = eventTime
    }
  }
  return $multi(newestId, newestTime)
}

GuildHistoryCacheGuild.HasLinked = function (this) {
  const [firstCategory] = next(this.cache)
  if (firstCategory == null) {
    return false
  }
  for (const [, cache] of pairs(this.cache)) {
    if (cache.IsAutoRequesting() && !cache.HasLinked()) {
      return false
    }
  }
  return true
}

GuildHistoryCacheGuild.HasLinkedRecently = function (this) {
  const [firstCategory] = next(this.cache)
  if (firstCategory == null) {
    return false
  }
  for (const [, cache] of pairs(this.cache)) {
    const linkTimeout = GetTimeStamp() - cache.GetLastLinkedTime()
    if (
      cache.IsAutoRequesting() &&
      cache.HasCachedEvents() &&
      linkTimeout > LINK_TIMOUT_THRESHOLD
    ) {
      return false
    }
  }
  return true
}

GuildHistoryCacheGuild.IsProcessing = function (this) {
  const [firstCategory] = next(this.cache)
  if (firstCategory == null) {
    return false
  }
  for (const [, cache] of pairs(this.cache)) {
    if (cache.IsProcessing()) {
      return true
    }
  }
  return false
}

GuildHistoryCacheGuild.HasPendingRequests = function (this) {
  const [firstCategory] = next(this.cache)
  if (firstCategory == null) {
    return false
  }
  for (const [, cache] of pairs(this.cache)) {
    if (cache.HasPendingRequest()) {
      return true
    }
  }
  return false
}

GuildHistoryCacheGuild.IsAggregated = function (this) {
  return true
}

GuildHistoryCacheGuild.GetDebugInfo = function (this) {
  const debugInfo = new LuaTable<string, unknown>()
  debugInfo.set("guildId", this.guildId)
  debugInfo.set("name", GetGuildName(this.guildId))
  debugInfo.set("hasLinked", this.HasLinked())
  debugInfo.set("hasLinkedRecently", this.HasLinkedRecently())
  debugInfo.set("isProcessing", this.IsProcessing())
  debugInfo.set("hasPendingRequests", this.HasPendingRequests())
  debugInfo.set("numLoadedManagedEvents", this.GetNumLoadedManagedEvents())

  const [oldestId, oldestTime] = this.GetOldestManagedEventInfo()
  if (oldestId != null) {
    const oldestManagedEvent = new LuaTable<string, unknown>()
    oldestManagedEvent.set("id", oldestId)
    oldestManagedEvent.set("time", oldestTime)
    debugInfo.set("oldestManagedEvent", oldestManagedEvent)
  }

  const [newestId, newestTime] = this.GetNewestManagedEventInfo()
  if (newestId != null) {
    const newestManagedEvent = new LuaTable<string, unknown>()
    newestManagedEvent.set("id", newestId)
    newestManagedEvent.set("time", newestTime)
    debugInfo.set("newestManagedEvent", newestManagedEvent)
  }

  const categories = new LuaTable<number, unknown>()
  for (
    let eventCategory = GUILD_HISTORY_EVENT_CATEGORY_ITERATION_BEGIN;
    eventCategory <= GUILD_HISTORY_EVENT_CATEGORY_ITERATION_END;
    eventCategory = eventCategory + 1
  ) {
    const cache = this.cache.get(eventCategory)
    if (cache != null) {
      categories.set(eventCategory, cache.GetDebugInfo())
    }
  }
  debugInfo.set("categories", categories)

  return debugInfo
}
