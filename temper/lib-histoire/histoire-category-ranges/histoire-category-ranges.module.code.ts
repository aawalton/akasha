import { GuildHistoryCacheCategory } from "../histoire-category-class/histoire-category-class.module.code.ts"
import type { RangeTuple } from "../histoire-category-types/histoire-category-types.module.code.ts"
import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger

function asRangeTuple(value: unknown): RangeTuple {
  return value as RangeTuple
}

GuildHistoryCacheCategory.HasLinked = function (this) {
  const guildId = this.guildId
  const category = this.category
  const gaplessIndex = GetOldestGuildHistoryEventIndexForUpToDateEventsWithoutGaps(
    guildId,
    category
  )
  if (gaplessIndex == null) {
    return GetNumGuildHistoryEvents(guildId, category) === 0
  }

  const [newestManagedEventId] = this.GetNewestManagedEventInfo()
  if (newestManagedEventId != null) {
    const index = GetGuildHistoryEventIndex(guildId, category, newestManagedEventId)
    return index === 1
  }

  return false
}

GuildHistoryCacheCategory.CheckHasLinked = function (this) {
  if (this.HasLinked()) {
    logger.Debug("Category is linked", this.key)
    this.saveData.lastLinkedTime = GetTimeStamp()
    if (!this.wasLinked) {
      this.wasLinked = true
      internal.FireCallbacks(internal.callback.CATEGORY_LINKED, this.guildId, this.category)
    }
  }
}

GuildHistoryCacheCategory.GetLastLinkedTime = function (this) {
  return this.saveData.lastLinkedTime ?? 0
}

GuildHistoryCacheCategory.IsManagedRangeConnectedToPresent = function (this) {
  const guildId = this.guildId
  const category = this.category
  const gaplessIndex = GetOldestGuildHistoryEventIndexForUpToDateEventsWithoutGaps(
    guildId,
    category
  )
  const [newestManagedEventId] = this.GetNewestManagedEventInfo()
  if (gaplessIndex != null && newestManagedEventId != null) {
    const index = GetGuildHistoryEventIndex(guildId, category, newestManagedEventId)
    return index != null && index <= gaplessIndex
  }
  return false
}

GuildHistoryCacheCategory.GetNumLoadedManagedEvents = function (this) {
  const [, oldestEventTime] = this.GetOldestManagedEventInfo()
  const [, newestEventTime] = this.GetNewestManagedEventInfo()
  if (oldestEventTime == null || newestEventTime == null) {
    return 0
  }
  const [newestIndex, oldestIndex] = this.adapter.GetGuildHistoryEventIndicesForTimeRange(
    this.guildId,
    this.category,
    newestEventTime,
    oldestEventTime
  )
  if (newestIndex == null || oldestIndex == null) {
    return 0
  }
  return oldestIndex - newestIndex + 1
}

GuildHistoryCacheCategory.GetNumUnlinkedEvents = function (this) {
  return this.GetOldestUnlinkedEventIndex() ?? 0
}

GuildHistoryCacheCategory.GetOldestUnlinkedEventTime = function (this) {
  const index = this.GetOldestUnlinkedEventIndex()
  if (index == null) {
    return undefined
  }
  return GetGuildHistoryEventTimestamp(this.guildId, this.category, index)
}

GuildHistoryCacheCategory.GetOldestUnlinkedEventIndex = function (this) {
  const [newestManagedEventId] = this.GetNewestManagedEventInfo()
  if (newestManagedEventId == null) {
    return undefined
  }
  const index = GetGuildHistoryEventIndex(this.guildId, this.category, newestManagedEventId)
  if (index == null || index === 1) {
    return undefined
  }
  return index - 1
}

GuildHistoryCacheCategory.HasCachedEvents = function (this) {
  return this.categoryData.GetNumEvents() > 0
}

GuildHistoryCacheCategory.GetEvent = function (this, i) {
  return this.categoryData.GetEvent(i)
}

GuildHistoryCacheCategory.GetEventById = function (this, eventId) {
  if (eventId == null) {
    return undefined
  }
  const index = GetGuildHistoryEventIndex(this.guildId, this.category, eventId)
  if (index == null) {
    return undefined
  }
  return this.categoryData.GetEvent(index)
}

GuildHistoryCacheCategory.GetOldestCachedEvent = function (this) {
  const numEvents = this.categoryData.GetNumEvents()
  if (numEvents === 0) {
    return undefined
  }
  return this.categoryData.GetEvent(numEvents)
}

GuildHistoryCacheCategory.GetLocalCacheTimeLimit = function (this) {
  const cacheLimit = this.adapter.GetGuildHistoryCacheMaxTime(this.category)
  return internal.UI_LOAD_TIME - cacheLimit
}

GuildHistoryCacheCategory.GetCacheStartTime = function (this) {
  let startTime: number | undefined

  const numEvents = this.categoryData.GetNumEvents()
  if (numEvents > 0) {
    const oldestEvent = this.categoryData.GetEvent(numEvents)
    if (oldestEvent != null) {
      startTime = oldestEvent.GetEventTimestampS()
    }
  }

  const serverTimeLimit = GetTimeStamp() - this.adapter.GetGuildHistoryServerMaxTime(this.category)
  if (startTime == null || serverTimeLimit < startTime) {
    startTime = serverTimeLimit
  }

  const localLimitTime = this.GetLocalCacheTimeLimit()
  if (localLimitTime < startTime) {
    startTime = localLimitTime
  }

  return startTime
}

GuildHistoryCacheCategory.GetUnprocessedEventsStartTime = function (this) {
  return this.unprocessedEventsStartTime
}

GuildHistoryCacheCategory.GetGaplessRangeStartTime = function (this) {
  const event = this.categoryData.GetOldestEventForUpToDateEventsWithoutGaps()
  if (event != null) {
    return event.GetEventTimestampS()
  }
  return undefined
}

function findAndFilterNextOverlappingRange(
  this: void,
  ranges: RangeTuple[],
  guildId: number,
  category: number
): boolean {
  for (let indexA = 1; indexA <= ranges.length; indexA = indexA + 1) {
    const [, , newestIdA, oldestIdA] = asRangeTuple(ranges[indexA - 1])
    for (let indexB = indexA + 1; indexB <= ranges.length; indexB = indexB + 1) {
      const [, , newestIdB, oldestIdB] = asRangeTuple(ranges[indexB - 1])
      if (!(newestIdA < oldestIdB || oldestIdA > newestIdB)) {
        logger.Warn("Found overlapping ranges in guild %d category %d", guildId, category)
        if (newestIdA > newestIdB) {
          ranges.splice(indexB - 1, 1)
        } else {
          ranges.splice(indexA - 1, 1)
        }
        return true
      }
    }
  }
  return false
}

GuildHistoryCacheCategory.UpdateRangeInfo = function (this) {
  if (this.rangeInfoDirty) {
    this.rangeInfoDirty = false

    const guildId = this.guildId
    const category = this.category
    const ranges: RangeTuple[] = []
    let previousNewestTimeS = GetTimeStamp() + 100
    for (let i = 1; i <= GetNumGuildHistoryEventRanges(guildId, category); i = i + 1) {
      const [newestTimeS, oldestTimeS] = GetGuildHistoryEventRangeInfo(guildId, category, i)
      if (newestTimeS > previousNewestTimeS) {
        logger.Warn("Out of order range detected for guild %d category %d", guildId, category)
      }
      previousNewestTimeS = newestTimeS

      const [newestIndex, oldestIndex] = this.adapter.GetGuildHistoryEventIndicesForTimeRange(
        guildId,
        category,
        newestTimeS,
        oldestTimeS
      )
      if (newestIndex != null && oldestIndex != null) {
        const [newestEventId, newestEventTimeS] = GetGuildHistoryEventBasicInfo(
          guildId,
          category,
          newestIndex
        )
        const [oldestEventId, oldestEventTimeS] = GetGuildHistoryEventBasicInfo(
          guildId,
          category,
          oldestIndex
        )
        if (newestEventId != null && oldestEventId != null) {
          ranges[ranges.length] = [newestEventTimeS, oldestEventTimeS, newestEventId, oldestEventId]
        } else {
          logger.Warn("Could not get event info for range")
        }
      }
    }

    while (findAndFilterNextOverlappingRange(ranges, guildId, category)) {}

    table.sort(ranges, (a: RangeTuple, b: RangeTuple) => {
      return a[0] < b[0]
    })
    this.rangeInfo = ranges
  }
}

GuildHistoryCacheCategory.GetNumRanges = function (this) {
  this.UpdateRangeInfo()
  return this.rangeInfo.length
}

GuildHistoryCacheCategory.GetRangeInfo = function (this, index) {
  this.UpdateRangeInfo()
  const range = this.rangeInfo[index - 1]
  if (range == null) {
    return $multi(undefined, undefined, undefined, undefined)
  }
  return $multi(range[0], range[1], range[2], range[3])
}

GuildHistoryCacheCategory.FindRangeIndexForEventId = function (this, eventId) {
  if (eventId == null) {
    return undefined
  }
  for (let i = 1; i <= this.GetNumRanges(); i = i + 1) {
    const [, , newestEventId, oldestEventId] = this.GetRangeInfo(i)
    if (
      oldestEventId != null &&
      newestEventId != null &&
      eventId >= oldestEventId &&
      eventId <= newestEventId
    ) {
      return i
    }
  }
  return undefined
}
