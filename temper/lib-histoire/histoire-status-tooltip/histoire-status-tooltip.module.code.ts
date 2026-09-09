import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger
void logger

const TOOLTIP_UPDATE_INTERVAL = 500

function asControl(value: unknown): Control {
  return value as Control
}

export interface StatusTooltipCacheRef {
  IsAggregated: (this: StatusTooltipCacheRef) => boolean
  IsAutoRequesting: (this: StatusTooltipCacheRef) => boolean
  IsProcessing: (this: StatusTooltipCacheRef) => boolean
  HasLinked: (this: StatusTooltipCacheRef) => boolean
  HasCachedEvents: (this: StatusTooltipCacheRef) => boolean
  HasPendingRequest: (this: StatusTooltipCacheRef) => boolean
  GetNumLoadedManagedEvents: (this: StatusTooltipCacheRef) => number
  GetNumUnlinkedEvents: (this: StatusTooltipCacheRef) => number
  GetOldestManagedEventInfo: (
    this: StatusTooltipCacheRef
  ) => LuaMultiReturn<[unknown, number | undefined]>
  GetNewestManagedEventInfo: (
    this: StatusTooltipCacheRef
  ) => LuaMultiReturn<[unknown, number | undefined]>
  GetOldestUnlinkedEventTime: (this: StatusTooltipCacheRef) => number | undefined
  GetPendingEventMetrics: (
    this: StatusTooltipCacheRef
  ) => LuaMultiReturn<[count: number, speed: number, timeLeft: number]>
  GetProgress: (
    this: StatusTooltipCacheRef
  ) => LuaMultiReturn<[progress: number, missingTime: number]>
  GetProcessorInfo: (
    this: StatusTooltipCacheRef
  ) => LuaMultiReturn<[names: string[], count: number, lastSeenTime: number | undefined]>
}

export interface GuildHistoryStatusTooltipInstance {
  control: TooltipControl
  target?: Control
  cache?: StatusTooltipCacheRef
  updateHandle?: string
  Initialize: (this: GuildHistoryStatusTooltipInstance) => void
  Show: (
    this: GuildHistoryStatusTooltipInstance,
    target: Control,
    cache: StatusTooltipCacheRef | undefined
  ) => void
  SetupForCategory: (this: GuildHistoryStatusTooltipInstance, cache: StatusTooltipCacheRef) => void
  SetupForGuild: (this: GuildHistoryStatusTooltipInstance, cache: StatusTooltipCacheRef) => void
  RegisterForUpdate: (this: GuildHistoryStatusTooltipInstance) => void
  UnregisterForUpdate: (this: GuildHistoryStatusTooltipInstance) => void
  ShowText: (this: GuildHistoryStatusTooltipInstance, target: Control, text: string) => void
  Hide: (this: GuildHistoryStatusTooltipInstance) => void
  GetTarget: (this: GuildHistoryStatusTooltipInstance) => Control | undefined
}

export interface GuildHistoryStatusTooltipClass extends GuildHistoryStatusTooltipInstance {
  New: (this: GuildHistoryStatusTooltipClass) => GuildHistoryStatusTooltipInstance
}

const GuildHistoryStatusTooltip = ZO_InitializingObject.Subclass<GuildHistoryStatusTooltipClass>()
internal.class.GuildHistoryStatusTooltip = GuildHistoryStatusTooltip

GuildHistoryStatusTooltip.Initialize = function (this) {
  this.control = InformationTooltip
  this.target = undefined
}

GuildHistoryStatusTooltip.Show = function (this, target, cache) {
  const tooltip = this.control
  InitializeTooltip(tooltip, target, RIGHT, 0, 0)

  if (cache != null) {
    if (cache.IsAggregated()) {
      this.SetupForGuild(cache)
    } else {
      this.SetupForCategory(cache)
    }
  }

  this.target = target
  this.cache = cache
}

GuildHistoryStatusTooltip.SetupForCategory = function (this, cache) {
  const tooltip = this.control

  if (cache.IsAutoRequesting()) {
    SetTooltipText(
      tooltip,
      zo_strformat(
        "Loaded managed events: |cffffff<<1>>|r",
        ZO_CommaDelimitDecimalNumber(cache.GetNumLoadedManagedEvents())
      )
    )
    const [, oldestManagedEventTime] = cache.GetOldestManagedEventInfo()
    if (oldestManagedEventTime != null) {
      const [date, time] = FormatAchievementLinkTimestamp(oldestManagedEventTime)
      SetTooltipText(
        tooltip,
        zo_strformat("Oldest managed event: |cffffff<<1>> <<2>>|r", date, time)
      )
    }

    const [, newestManagedEventTime] = cache.GetNewestManagedEventInfo()
    if (newestManagedEventTime != null) {
      const [date, time] = FormatAchievementLinkTimestamp(newestManagedEventTime)
      SetTooltipText(
        tooltip,
        zo_strformat("Newest managed event: |cffffff<<1>> <<2>>|r", date, time)
      )
    }
  } else {
    SetTooltipText(tooltip, "Missing events are not requested automatically", 0, 1, 0)
  }

  let shouldUnregisterForUpdate = true
  if (cache.IsProcessing()) {
    SetTooltipText(tooltip, "Events are being processed...", 1, 1, 0)
    const [count, speed, rawTimeLeft] = cache.GetPendingEventMetrics()
    SetTooltipText(tooltip, zo_strformat("<<1>> events left", count), 1, 1, 0)
    if (rawTimeLeft >= 0) {
      const timeLeft = math.floor(rawTimeLeft / 60)
      let speedText: string
      if (speed < 100) {
        const tenths = math.floor(speed * 10 + 0.5)
        speedText = tostring(math.floor(tenths / 10)) + "." + tostring(tenths % 10)
      } else {
        speedText = tostring(math.floor(speed))
      }
      SetTooltipText(
        tooltip,
        zo_strformat(
          "<<1[less than a minute/one minute/$d minutes]>> remaining (<<2>> events per second)",
          timeLeft,
          speedText
        ),
        1,
        1,
        0
      )
    } else {
      SetTooltipText(tooltip, "Calculating time remaining...", 1, 1, 0)
    }
    this.RegisterForUpdate()
    shouldUnregisterForUpdate = false
  } else if (cache.HasLinked()) {
    if (cache.HasCachedEvents()) {
      SetTooltipText(tooltip, "History has been linked to present events", 0, 1, 0)
    }
  } else if (cache.HasPendingRequest()) {
    SetTooltipText(tooltip, "Waiting for request to be sent", 1, 0, 0)
  } else {
    SetTooltipText(tooltip, "History has not linked to present events yet", 1, 0, 0)
    SetTooltipText(
      tooltip,
      zo_strformat(
        "Unlinked events: |cffffff<<1>>|r",
        ZO_CommaDelimitDecimalNumber(cache.GetNumUnlinkedEvents())
      )
    )

    const oldestUnlinkedEventTime = cache.GetOldestUnlinkedEventTime()
    if (oldestUnlinkedEventTime != null) {
      const [date, time] = FormatAchievementLinkTimestamp(oldestUnlinkedEventTime)
      SetTooltipText(
        tooltip,
        zo_strformat("Oldest unlinked event: |cffffff<<1>> <<2>>|r", date, time)
      )
    }

    const [progress, missingTime] = cache.GetProgress()
    if (missingTime > 0) {
      const missingTimeText = ZO_FormatTime(missingTime, TIME_FORMAT_STYLE_DESCRIPTIVE_MINIMAL)
      const percentTenths = math.floor(progress * 100 * 10 + 0.5)
      const percentText =
        tostring(math.floor(percentTenths / 10)) + "." + tostring(percentTenths % 10)
      SetTooltipText(
        tooltip,
        zo_strformat("Missing time: |cffffff<<1>> (<<2>>%)|r", missingTimeText, percentText)
      )
    }
  }

  const [names, count, lastSeenTime] = cache.GetProcessorInfo()
  if (count > 0) {
    const suffix = count > 1 ? "s" : ""
    names[names.length] = zo_strformat("<<1>> legacy listener<<2>>", count, suffix)
  }
  if (names.length > 0) {
    SetTooltipText(tooltip, "Active Processors:")
    for (let i = 0; i < names.length; i = i + 1) {
      SetTooltipText(tooltip, zo_strformat("|cffffff<<1>>|r", names[i]))
    }
  } else {
    SetTooltipText(tooltip, "No active processors")
    if (lastSeenTime != null && lastSeenTime > 0) {
      SetTooltipText(
        tooltip,
        zo_strformat(
          "Last processor seen: |cffffff<<1>>|r",
          ZO_FormatDurationAgo(GetTimeStamp() - lastSeenTime)
        )
      )
    }
  }

  if (shouldUnregisterForUpdate) {
    this.UnregisterForUpdate()
  }
}

GuildHistoryStatusTooltip.SetupForGuild = function (this, cache) {
  const tooltip = this.control

  SetTooltipText(
    tooltip,
    zo_strformat(
      "Loaded managed events: |cffffff<<1>>|r",
      ZO_CommaDelimitDecimalNumber(cache.GetNumLoadedManagedEvents())
    )
  )
  const [, oldestManagedEventTime] = cache.GetOldestManagedEventInfo()
  if (oldestManagedEventTime != null) {
    const [date, time] = FormatAchievementLinkTimestamp(oldestManagedEventTime)
    SetTooltipText(tooltip, zo_strformat("Oldest managed event: |cffffff<<1>> <<2>>|r", date, time))
  }

  const [, newestManagedEventTime] = cache.GetNewestManagedEventInfo()
  if (newestManagedEventTime != null) {
    const [date, time] = FormatAchievementLinkTimestamp(newestManagedEventTime)
    SetTooltipText(tooltip, zo_strformat("Newest managed event: |cffffff<<1>> <<2>>|r", date, time))
  }

  SetTooltipText(tooltip, "For progress details check each category")
}

GuildHistoryStatusTooltip.RegisterForUpdate = function (this) {
  if (this.updateHandle == null) {
    this.updateHandle = internal.RegisterForUpdate(TOOLTIP_UPDATE_INTERVAL, () => {
      this.Show(asControl(this.target), this.cache)
    })
  }
}

GuildHistoryStatusTooltip.UnregisterForUpdate = function (this) {
  if (this.updateHandle != null) {
    internal.UnregisterForUpdate(this.updateHandle)
    this.updateHandle = undefined
  }
}

GuildHistoryStatusTooltip.ShowText = function (this, target, text) {
  const tooltip = this.control
  InitializeTooltip(tooltip, target, RIGHT, 0, 0)
  SetTooltipText(tooltip, text)
  this.target = target
  this.UnregisterForUpdate()
}

GuildHistoryStatusTooltip.Hide = function (this) {
  ClearTooltip(this.control)
  this.target = undefined
  this.cache = undefined
  this.UnregisterForUpdate()
}

GuildHistoryStatusTooltip.GetTarget = function (this) {
  return this.target
}
