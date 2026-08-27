import type { PerformanceTrackerClassRef, ProcessorRef } from "../cache-category-types"
import { internal } from "../state"
import type { GuildHistoryCacheCategoryClass } from "./class-shape"

function asPerformanceTrackerClassRef(value: unknown): PerformanceTrackerClassRef {
  return value as PerformanceTrackerClassRef
}

const GuildHistoryCacheCategory = ZO_InitializingObject.Subclass<GuildHistoryCacheCategoryClass>()
internal.class.GuildHistoryCacheCategory = GuildHistoryCacheCategory

export { GuildHistoryCacheCategory }

GuildHistoryCacheCategory.Initialize = function (this, adapter, requestManager, categoryData) {
  this.adapter = adapter
  this.requestManager = requestManager
  this.categoryData = categoryData
  this.guildId = categoryData.GetGuildData().GetId()
  this.category = categoryData.GetEventCategory()
  this.key = internal.WORLD_NAME + "/" + tostring(this.guildId) + "/" + tostring(this.category)
  this.saveData = adapter.GetOrCreateCacheSaveData(this.key)
  this.performanceTracker = asPerformanceTrackerClassRef(internal.class.PerformanceTracker).New()
  this.unprocessedEventsStartTime = this.saveData.newestManagedEventTime
  this.rangeInfo = []
  this.rangeInfoDirty = true
  this.progressDirty = true
  this.wasLinked = false
  this.processingQueue = []
  this.processors = new LuaTable<ProcessorRef, boolean>()
  this.RefreshManagedRangeInfo()
}
