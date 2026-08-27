import type { CacheStatusBarClass } from "./cache-status-bar"
import { internal } from "./state"
import type { GuildHistoryStatusTooltipInstance } from "./status-tooltip"
import {
  asBoolean,
  asNumber,
  asStatusTooltipCacheRef,
  DEFAULT_COLOR,
  type GuildHistoryStatusWindowInstance,
  REQUEST_MODE_FORCE_OFF_ICON,
  REQUEST_MODE_FORCE_ON_ICON,
  REQUEST_MODE_ICON_SIZE,
  type RowEntry,
  requireChild,
  SELECTED_COLOR,
} from "./status-window-shared"

type ResetControlFn = (this: void, control: Control) => void
interface StatusWindowZoomRef {
  GetZoomMode: (this: StatusWindowZoomRef) => string | undefined
}

function asCacheStatusBarClass(value: unknown): CacheStatusBarClass {
  return value as CacheStatusBarClass
}
function asStatusWindowZoomRef(value: unknown): StatusWindowZoomRef {
  return value as StatusWindowZoomRef
}
function asZoTimeline(value: unknown): ZoTimeline {
  return value as ZoTimeline
}
function asResetControlFn(value: unknown): ResetControlFn {
  return value as ResetControlFn
}

export function InitializeProgress(
  rowControl: Control,
  window: GuildHistoryStatusWindowInstance
): undefined {
  const control = requireChild<Control>(rowControl, "StatusBar")
  rowControl.statusBar = asCacheStatusBarClass(internal.class.CacheStatusBar).New(
    control,
    asStatusWindowZoomRef(window)
  )
}

export function InitializeHighlight(rowControl: Control): undefined {
  const highlight = requireChild<Control>(rowControl, "Highlight")
  highlight.SetAlpha(0)
  const animation = asZoTimeline(
    ANIMATION_MANAGER.CreateTimelineFromVirtual("ShowOnMouseOverLabelAnimation", highlight)
  )
  highlight.animation = animation
  animation.GetFirstAnimation().SetAlphaValues(0, 1)

  rowControl.SetHandler(
    "OnMouseEnter",
    () => {
      animation.PlayForward()
    },
    "LibHistoire_Highlight"
  )

  rowControl.SetHandler(
    "OnMouseExit",
    () => {
      animation.PlayBackward()
    },
    "LibHistoire_Highlight"
  )
}

export function InitializeRowTooltip(
  rowControl: Control,
  tooltip: GuildHistoryStatusTooltipInstance
): undefined {
  rowControl.SetHandler(
    "OnMouseEnter",
    () => {
      const entry = ZO_ScrollList_GetData<RowEntry>(rowControl)
      tooltip.Show(rowControl, asStatusTooltipCacheRef(entry.cache))
    },
    "LibHistoire_Tooltip"
  )

  rowControl.SetHandler(
    "OnMouseExit",
    () => {
      tooltip.Hide()
    },
    "LibHistoire_Tooltip"
  )
}

export function InitializeClickHandler(
  rowControl: Control,
  OnSelect: (this: void, entry: RowEntry) => void
): undefined {
  rowControl.SetHandler(
    "OnMouseUp",
    (...args: unknown[]) => {
      const button = asNumber(args[1])
      const isInside = asBoolean(args[2])
      if (isInside && button === MOUSE_BUTTON_INDEX_LEFT) {
        const entry = ZO_ScrollList_GetData<RowEntry>(rowControl)
        OnSelect(entry)
        PlaySound("Click")
      }
    },
    "LibHistoire_Select"
  )
}

export function SetLabel(rowControl: Control, entry: RowEntry): undefined {
  let label = entry.label
  const cache = entry.cache
  if (cache.GetRequestMode != null) {
    const mode = cache.GetRequestMode()
    if (mode === internal.REQUEST_MODE_ON) {
      label =
        label +
        zo_iconFormat(REQUEST_MODE_FORCE_ON_ICON, REQUEST_MODE_ICON_SIZE, REQUEST_MODE_ICON_SIZE)
    } else if (mode === internal.REQUEST_MODE_OFF) {
      label =
        label +
        zo_iconFormat(REQUEST_MODE_FORCE_OFF_ICON, REQUEST_MODE_ICON_SIZE, REQUEST_MODE_ICON_SIZE)
    }
  }

  const labelControl = requireChild<LabelControl>(rowControl, "Label")
  labelControl.SetText(label)
  const color = entry.selected ? SELECTED_COLOR : DEFAULT_COLOR
  const [r, g, b, a] = color.UnpackRGBA()
  labelControl.SetColor(r, g, b, a)
}

export function SetProgress(rowControl: Control, entry: RowEntry): undefined {
  entry.cache.UpdateProgressBar(rowControl.statusBar)
}

export function SetSelected(rowControl: Control, entry: RowEntry): undefined {
  const minAlpha = entry.selected ? 0.5 : 0
  const highlight = requireChild<Control>(rowControl, "Highlight")
  highlight.SetAlpha(minAlpha)
  asZoTimeline(highlight.animation).GetFirstAnimation().SetAlphaValues(minAlpha, 1)
}

export function DestroyRow(rowControl: Control): undefined {
  const highlight = requireChild<Control>(rowControl, "Highlight")
  const animation = asZoTimeline(highlight.animation)
  animation.PlayFromEnd(animation.GetDuration())
  asResetControlFn(ZO_ObjectPool_DefaultResetControl)(rowControl)
}
