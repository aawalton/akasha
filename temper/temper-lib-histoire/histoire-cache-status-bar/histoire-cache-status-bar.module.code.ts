import { internal } from "../histoire-state/histoire-state.module.code.ts"

const logger = internal.logger

type Gradient = readonly [ZoColorDef, ZoColorDef]

const GRADIENT_GAPLESS_RANGE_AFTER_MANAGED_RANGE_INACTIVE: Gradient = [
  ZO_ColorDef.New("FF4D4D4D"),
  ZO_ColorDef.New("FF5E5E5E"),
]
const GRADIENT_GAPLESS_RANGE_AFTER_MANAGED_RANGE_ACTIVE: Gradient = [
  ZO_ColorDef.New("FF00406B"),
  ZO_ColorDef.New("FF00548B"),
]
const GRADIENT_GAPLESS_RANGE_BEFORE_MANAGED_RANGE_INACTIVE: Gradient = [
  ZO_ColorDef.New("FF5A5A5A"),
  ZO_ColorDef.New("FFA3A3A3"),
]
const GRADIENT_GAPLESS_RANGE_BEFORE_MANAGED_RANGE_ACTIVE: Gradient = [
  ZO_ColorDef.New("FF611F00"),
  ZO_ColorDef.New("FFA33400"),
]
const GRADIENT_GAPLESS_RANGE_MANAGED_RANGE_ACTIVE: Gradient = [
  ZO_ColorDef.New("FF005521"),
  ZO_ColorDef.New("FF008031"),
]
const GRADIENT_GAPLESS_RANGE_MANAGED_RANGE_ACTIVE_UNLINKED: Gradient = [
  ZO_ColorDef.New("FF381200"),
  ZO_ColorDef.New("FF5E1E00"),
]
const GRADIENT_GAPLESS_RANGE_MANAGED_RANGE_INACTIVE: Gradient = [
  ZO_ColorDef.New("FF4D4D4D"),
  ZO_ColorDef.New("FF5E5E5E"),
]
const GRADIENT_CACHE_SEGMENT_BEFORE_MANAGED_RANGE: Gradient = [
  ZO_ColorDef.New("FF929292"),
  ZO_ColorDef.New("FFACACAC"),
]
const GRADIENT_CACHE_SEGMENT_MANAGED_RANGE_ACTIVE: Gradient = [
  ZO_ColorDef.New("FF0074C2"),
  ZO_ColorDef.New("FF0099FF"),
]
const GRADIENT_CACHE_SEGMENT_MANAGED_RANGE_INACTIVE: Gradient = [
  ZO_ColorDef.New("FFC1C1C1"),
  ZO_ColorDef.New("FFD3D3D3"),
]
const GRADIENT_CACHE_SEGMENT_AFTER_MANAGED_RANGE_ACTIVE: Gradient = [
  ZO_ColorDef.New("FFC73F00"),
  ZO_ColorDef.New("FFFC5000"),
]
const GRADIENT_CACHE_SEGMENT_AFTER_MANAGED_RANGE_INACTIVE: Gradient = [
  ZO_ColorDef.New("FFBDBDBD"),
  ZO_ColorDef.New("FFCACACA"),
]
const GRADIENT_MANAGED_RANGE_ACTIVE: Gradient = [
  ZO_ColorDef.New("FF0CAD4A"),
  ZO_ColorDef.New("FF17B955"),
]
const GRADIENT_MANAGED_RANGE_INACTIVE: Gradient = [
  ZO_ColorDef.New("FF888888"),
  ZO_ColorDef.New("FF9C9C9C"),
]
const GRADIENT_REQUEST_RANGE_BACKGROUND: Gradient = [
  ZO_ColorDef.New("FF462449"),
  ZO_ColorDef.New("FF592A5E"),
]
const GRADIENT_REQUEST_RANGE_FOREGROUND: Gradient = [
  ZO_ColorDef.New("FFB900CA"),
  ZO_ColorDef.New("FFEA00FF"),
]
const GRADIENT_PROCESSING_RANGE_BACKGROUND: Gradient = [
  ZO_ColorDef.New("FF5E582A"),
  ZO_ColorDef.New("FF726D34"),
]
const GRADIENT_PROCESSING_RANGE_FOREGROUND: Gradient = [
  ZO_ColorDef.New("FFC5B100"),
  ZO_ColorDef.New("FFFFEA00"),
]

internal.GRADIENT_GUILD_INCOMPLETE = GRADIENT_CACHE_SEGMENT_AFTER_MANAGED_RANGE_ACTIVE
internal.GRADIENT_GUILD_PROCESSING = [ZO_ColorDef.New("FFC5B100"), ZO_ColorDef.New("FFFFEA00")]
internal.GRADIENT_GUILD_REQUESTING = [ZO_ColorDef.New("FFB900CA"), ZO_ColorDef.New("FFEA00FF")]
internal.GRADIENT_GUILD_COMPLETED = GRADIENT_MANAGED_RANGE_ACTIVE

const LEADING_EDGE_WIDTH = 10

function asControl(value: unknown): Control {
  return value as Control
}
function asNumber(value: unknown): number {
  return value as number
}
function asGradient(value: unknown): Gradient {
  return value as Gradient
}

interface SegmentData {
  startTime: number
  endTime: number
  segmentStartTime: number
  segmentEndTime: number
  color?: Gradient
  value?: number
}

export interface CacheStatusBarCacheRef {
  GetGuildId: (this: CacheStatusBarCacheRef) => number
  GetCategory: (this: CacheStatusBarCacheRef) => number
  GetNewestManagedEventInfo: (
    this: CacheStatusBarCacheRef
  ) => LuaMultiReturn<[unknown, number | undefined]>
  GetOldestManagedEventInfo: (
    this: CacheStatusBarCacheRef
  ) => LuaMultiReturn<[unknown, number | undefined]>
  HasLinked: (this: CacheStatusBarCacheRef) => boolean
  IsAutoRequesting: (this: CacheStatusBarCacheRef) => boolean
  IsManagedRangeConnectedToPresent: (this: CacheStatusBarCacheRef) => boolean
  GetCacheStartTime: (this: CacheStatusBarCacheRef) => number
  GetUnprocessedEventsStartTime: (this: CacheStatusBarCacheRef) => number | undefined
  GetGaplessRangeStartTime: (this: CacheStatusBarCacheRef) => number | undefined
  GetRequestTimeRange: (
    this: CacheStatusBarCacheRef
  ) => LuaMultiReturn<[startTime: number | undefined, endTime: number]>
  GetProcessingTimeRange: (
    this: CacheStatusBarCacheRef
  ) => LuaMultiReturn<
    [startTime: number | undefined, endTime: number, currentTime: number | undefined]
  >
  GetNumRanges: (this: CacheStatusBarCacheRef) => number
  GetRangeInfo: (
    this: CacheStatusBarCacheRef,
    index: number
  ) => LuaMultiReturn<[endTime: number, startTime: number]>
}

interface StatusWindowZoomRef {
  GetZoomMode: (this: StatusWindowZoomRef) => string | undefined
}

export interface CacheStatusBarInstance {
  control: Control
  window: StatusWindowZoomRef
  frame: Control
  segmentControlPool: ZoControlPool<StatusBarControl>
  segment?: Control
  Initialize: (this: CacheStatusBarInstance, control: Control, window: StatusWindowZoomRef) => void
  Clear: (this: CacheStatusBarInstance) => void
  SetValue: (this: CacheStatusBarInstance, value: number) => void
  SetGradient: (this: CacheStatusBarInstance, gradient: Gradient) => void
  Update: (this: CacheStatusBarInstance, cache: CacheStatusBarCacheRef) => void
  AddSegment: (this: CacheStatusBarInstance, data: SegmentData) => Control | undefined
  GetTrimmedTimeRange: (
    this: CacheStatusBarInstance,
    data: SegmentData
  ) => LuaMultiReturn<[number | undefined, number | undefined]>
}

export interface CacheStatusBarClass extends CacheStatusBarInstance {
  New: (
    this: CacheStatusBarClass,
    control: Control,
    window: StatusWindowZoomRef
  ) => CacheStatusBarInstance
}

const CacheStatusBar = ZO_InitializingObject.Subclass<CacheStatusBarClass>()
internal.class.CacheStatusBar = CacheStatusBar

CacheStatusBar.Initialize = function (this, control, window) {
  this.control = control
  this.window = window
  this.frame = asControl(control.GetNamedChild("Overlay"))

  this.segmentControlPool = ZO_ControlPool.New(
    "ZO_ArrowStatusBar",
    asControl(control.GetNamedChild("Segments")),
    "Segment"
  )
  this.segmentControlPool.SetCustomFactoryBehavior((segment) => {
    segment.SetAutoRectClipChildren(true)
    segment.EnableLeadingEdge(false)
    segment.gloss.EnableLeadingEdge(false)
  })
  this.segmentControlPool.SetCustomResetBehavior((segment) => {
    segment.SetWidth(asNumber(undefined))
    segment.SetValue(1)
    segment.EnableLeadingEdge(false)
    segment.gloss.EnableLeadingEdge(false)
  })
}

CacheStatusBar.Clear = function (this) {
  this.segmentControlPool.ReleaseAllObjects()
  this.segment = undefined
}

CacheStatusBar.SetValue = function (this, value) {
  this.Clear()
  const segmentControl = this.segmentControlPool.AcquireObject()
  segmentControl.SetWidth(asNumber(undefined))
  segmentControl.SetAnchorFill(this.control)
  segmentControl.SetValue(value)
  segmentControl.EnableLeadingEdge(true)
  segmentControl.gloss.EnableLeadingEdge(true)
  this.segment = segmentControl
}

CacheStatusBar.SetGradient = function (this, gradient) {
  ZO_StatusBar_SetGradientColor(asControl(this.segment), gradient)
}

CacheStatusBar.Update = function (this, cache) {
  this.Clear()

  if (this.control.GetWidth() <= 0) {
    logger.Verbose("invalid bar width", cache.GetGuildId(), cache.GetCategory())
    return
  }

  let zoomMode = this.window.GetZoomMode()
  if (zoomMode == null || zoomMode === internal.ZOOM_MODE_AUTO) {
    const [, newestForZoom] = cache.GetNewestManagedEventInfo()
    if (newestForZoom == null || cache.HasLinked()) {
      zoomMode = internal.ZOOM_MODE_FULL_RANGE
    } else {
      zoomMode = internal.ZOOM_MODE_MISSING_RANGE
    }
  }

  let startTime: number
  const endTime = GetTimeStamp()
  if (zoomMode === internal.ZOOM_MODE_FULL_RANGE) {
    startTime = cache.GetCacheStartTime()
  } else {
    const unprocessed = cache.GetUnprocessedEventsStartTime()
    startTime = unprocessed != null ? unprocessed : endTime
    startTime = zo_min(startTime, endTime - 24 * 3600)
    startTime = startTime - (endTime - startTime) * 0.05
  }

  const overallTime = endTime - startTime
  if (overallTime <= 0) {
    return
  }

  const isActive = cache.IsAutoRequesting()
  const [, oldestManagedEventTime] = cache.GetOldestManagedEventInfo()
  const [, newestManagedEventTime] = cache.GetNewestManagedEventInfo()
  const gaplessRangeStartTime = cache.GetGaplessRangeStartTime()
  const [requestStartTime, requestEndTime] = cache.GetRequestTimeRange()
  const [processingStartTime, processingEndTime, processingCurrentTime] =
    cache.GetProcessingTimeRange()

  if (gaplessRangeStartTime != null) {
    const data: SegmentData = {
      startTime,
      endTime,
      segmentStartTime: gaplessRangeStartTime,
      segmentEndTime: endTime,
    }

    if (newestManagedEventTime == null) {
      data.color = isActive
        ? GRADIENT_GAPLESS_RANGE_BEFORE_MANAGED_RANGE_ACTIVE
        : GRADIENT_GAPLESS_RANGE_BEFORE_MANAGED_RANGE_INACTIVE
    } else if (gaplessRangeStartTime > newestManagedEventTime) {
      data.color = isActive
        ? GRADIENT_GAPLESS_RANGE_AFTER_MANAGED_RANGE_ACTIVE
        : GRADIENT_GAPLESS_RANGE_AFTER_MANAGED_RANGE_INACTIVE
    } else if (isActive) {
      const isLinked = cache.IsManagedRangeConnectedToPresent()
      data.color = isLinked
        ? GRADIENT_GAPLESS_RANGE_MANAGED_RANGE_ACTIVE
        : GRADIENT_GAPLESS_RANGE_MANAGED_RANGE_ACTIVE_UNLINKED
    } else {
      data.color = GRADIENT_GAPLESS_RANGE_MANAGED_RANGE_INACTIVE
    }
    this.AddSegment(data)
  }

  const cacheSegementsInsideRequestRange: Array<[number, number]> = []
  for (let i = 1; i <= cache.GetNumRanges(); i = i + 1) {
    const [rangeEndTime, rangeStartTime] = cache.GetRangeInfo(i)

    if (
      requestStartTime != null &&
      rangeEndTime > requestStartTime &&
      rangeStartTime < requestEndTime
    ) {
      const [trimmedStartTime, trimmedEndTime] = this.GetTrimmedTimeRange({
        startTime: requestStartTime,
        endTime: requestEndTime,
        segmentStartTime: rangeStartTime,
        segmentEndTime: rangeEndTime,
      })
      if (trimmedStartTime != null) {
        cacheSegementsInsideRequestRange[cacheSegementsInsideRequestRange.length] = [
          trimmedStartTime,
          asNumber(trimmedEndTime),
        ]
      }
    }

    const data: SegmentData = {
      startTime,
      endTime,
      segmentStartTime: rangeStartTime,
      segmentEndTime: rangeEndTime,
    }

    if (
      oldestManagedEventTime == null ||
      newestManagedEventTime == null ||
      rangeStartTime > newestManagedEventTime
    ) {
      if (isActive) {
        data.color = GRADIENT_CACHE_SEGMENT_AFTER_MANAGED_RANGE_ACTIVE
      } else {
        data.color = GRADIENT_CACHE_SEGMENT_AFTER_MANAGED_RANGE_INACTIVE
      }
    } else if (rangeEndTime < oldestManagedEventTime) {
      data.color = GRADIENT_CACHE_SEGMENT_BEFORE_MANAGED_RANGE
    } else if (isActive) {
      data.color = GRADIENT_CACHE_SEGMENT_MANAGED_RANGE_ACTIVE
    } else {
      data.color = GRADIENT_CACHE_SEGMENT_MANAGED_RANGE_INACTIVE
    }

    this.AddSegment(data)
  }

  if (oldestManagedEventTime != null && newestManagedEventTime != null && cache.HasLinked()) {
    const data: SegmentData = {
      startTime,
      endTime,
      segmentStartTime: oldestManagedEventTime,
      segmentEndTime: newestManagedEventTime,
      color: isActive ? GRADIENT_MANAGED_RANGE_ACTIVE : GRADIENT_MANAGED_RANGE_INACTIVE,
    }
    this.AddSegment(data)
  }

  if (requestStartTime != null) {
    const data: SegmentData = {
      startTime,
      endTime,
      segmentStartTime: requestStartTime,
      segmentEndTime: requestEndTime,
      color: GRADIENT_REQUEST_RANGE_BACKGROUND,
    }
    this.AddSegment(data)

    for (const range of cacheSegementsInsideRequestRange) {
      const fgData: SegmentData = {
        startTime,
        endTime,
        segmentStartTime: range[0],
        segmentEndTime: range[1],
        color: GRADIENT_REQUEST_RANGE_FOREGROUND,
      }
      this.AddSegment(fgData)
    }
  }

  if (processingStartTime != null) {
    const data: SegmentData = {
      startTime,
      endTime,
      segmentStartTime: processingStartTime,
      segmentEndTime: processingEndTime,
      color: GRADIENT_PROCESSING_RANGE_BACKGROUND,
    }
    this.AddSegment(data)

    if (processingCurrentTime != null) {
      if (processingCurrentTime < 0) {
        data.segmentStartTime = -processingCurrentTime
      } else {
        data.segmentEndTime = processingCurrentTime
      }
      data.color = GRADIENT_PROCESSING_RANGE_FOREGROUND
      this.AddSegment(data)
    }
  }
}

CacheStatusBar.AddSegment = function (this, data) {
  const [trimmedStartTime, trimmedEndTime] = this.GetTrimmedTimeRange(data)
  if (trimmedStartTime == null) {
    return undefined
  }

  const barWidth = this.control.GetWidth()
  const overallTime = data.endTime - data.startTime
  const segmentStart = ((trimmedStartTime - data.startTime) / overallTime) * barWidth
  const segmentWidth = zo_max(
    1,
    ((asNumber(trimmedEndTime) - trimmedStartTime) / overallTime) * barWidth
  )

  const control = this.segmentControlPool.AcquireObject()
  control.SetAnchor(TOPLEFT, this.control, TOPLEFT, segmentStart, 0)
  control.SetWidth(segmentWidth)
  control.SetValue(data.value != null ? data.value : 1)

  const enableLeadingEdge = segmentStart + segmentWidth > barWidth - LEADING_EDGE_WIDTH
  control.EnableLeadingEdge(enableLeadingEdge)
  control.gloss.EnableLeadingEdge(enableLeadingEdge)

  ZO_StatusBar_SetGradientColor(control, asGradient(data.color))
  return control
}

CacheStatusBar.GetTrimmedTimeRange = function (this, data) {
  if (data.segmentEndTime < data.startTime || data.segmentStartTime > data.endTime) {
    logger.Verbose("segment outside display range - skip")
    return $multi(undefined, undefined)
  }

  const segmentStartTime = zo_max(data.segmentStartTime, data.startTime)
  const segmentEndTime = zo_min(data.segmentEndTime, data.endTime)

  return $multi(segmentStartTime, segmentEndTime)
}
