import { internal } from "./state"
import type { GuildHistoryStatusTooltipInstance } from "./status-tooltip"
import {
  DestroyRow,
  InitializeHighlight,
  InitializeProgress,
  InitializeRowTooltip,
  SetLabel,
  SetProgress,
  SetSelected,
} from "./status-window-row-helpers"
import {
  asControl,
  asStatusTooltipCacheRef,
  DATA_ENTRY,
  type GuildHistoryStatusWindowInstance,
  guildHistoryScene,
  ROW_HEIGHT,
  type RowEntry,
  requireChild,
  type SelectedCacheRef,
  type SelectionWidgetRef,
  type WindowHistoryAdapterRef,
  type WindowSaveData,
} from "./status-window-shared"

const logger = internal.logger
void logger

type CallLaterFn = (cb: () => void, ms: number) => number

function asSelectionWidgetClassRef(value: unknown): SelectionWidgetClassRef {
  return value as SelectionWidgetClassRef
}
function asCallLaterFn(value: unknown): CallLaterFn {
  return value as CallLaterFn
}

export interface SelectionWidgetClassRef {
  New: (this: SelectionWidgetClassRef, parent: Control, rowHeight: number) => SelectionWidgetRef
}

export interface GuildHistoryStatusWindowClass extends GuildHistoryStatusWindowInstance {
  New: (
    this: GuildHistoryStatusWindowClass,
    historyAdapter: WindowHistoryAdapterRef,
    statusTooltip: GuildHistoryStatusTooltipInstance,
    saveData: WindowSaveData
  ) => GuildHistoryStatusWindowInstance
}

export const GuildHistoryStatusWindow =
  ZO_InitializingObject.Subclass<GuildHistoryStatusWindowClass>()
internal.class.GuildHistoryStatusWindow = GuildHistoryStatusWindow

GuildHistoryStatusWindow.Initialize = function (this, historyAdapter, statusTooltip, saveData) {
  this.historyAdapter = historyAdapter
  this.statusTooltip = statusTooltip
  this.saveData = saveData

  this.guildId = GetGuildId(1)
  this.category = GUILD_HISTORY_EVENT_CATEGORY_ROSTER

  const control = LibHistoireGuildHistoryStatusWindow
  this.fragment = ZO_SimpleSceneFragment.New(control)

  this.labelControl = requireChild<LabelControl>(control, "Label")
  this.labelControl.SetText("LibHistoire - Guild History Status")
  this.guildListControl = requireChild<Control>(control, "GuildList")
  this.categoryListControl = requireChild<Control>(control, "CategoryList")
  this.selectionWidget = asSelectionWidgetClassRef(
    internal.class.GuildHistoryStatusSelectionWidget
  ).New(control, ROW_HEIGHT)
  this.statusIcon = requireChild<TextureControl>(control, "StatusIcon")
  this.statusIcon.SetHandler("OnMouseEnter", (...args: unknown[]) => {
    const icon = asControl(args[0])
    InitializeTooltip(InformationTooltip, icon, RIGHT, 0, 0)
    if (this.hasLinkedEverything === true) {
      SetTooltipText(InformationTooltip, "History has been linked for all guilds and categories")
      SetTooltipText(
        InformationTooltip,
        "New events will be sent on the server's sole discretion and may arrive at any time, or sometimes even never"
      )
      SetTooltipText(
        InformationTooltip,
        "If they do not show up after several hours, you may want to restart your game"
      )
    } else if (internal.IsGuildHistorySystemDisabled()) {
      SetTooltipText(
        InformationTooltip,
        "The guild history system is currently disabled by ZOS",
        ZO_ERROR_COLOR
      )
      SetTooltipText(
        InformationTooltip,
        "LibHistoire will not be able to retrieve new data until it is enabled again"
      )
    } else {
      SetTooltipText(
        InformationTooltip,
        "The history has not been linked to the stored events yet."
      )
      SetTooltipText(InformationTooltip, "Automatic requests are on cooldown and may take a while")
      SetTooltipText(
        InformationTooltip,
        "You can manually send requests to receive missing history faster"
      )
      SetTooltipText(
        InformationTooltip,
        "You can also force history to link, but it will create a hole in the stored records"
      )
    }
  })
  if (internal.IsGuildHistorySystemDisabled()) {
    const [r, g, b, a] = ZO_ERROR_COLOR.UnpackRGBA()
    this.statusIcon.SetColor(r, g, b, a)
  }
  this.statusIcon.SetHandler("OnMouseExit", () => {
    ClearTooltip(InformationTooltip)
  })
  control.SetHandler("OnMoveStop", () => {
    this.SavePosition()
  })
  this.control = control

  this.InitializeGuildList(this.guildListControl)
  this.InitializeCategoryList(this.categoryListControl)
  this.InitializeButtons()

  let updateHandle: number | undefined
  const ClearUpdate = (): undefined => {
    if (updateHandle != null) {
      zo_removeCallLater(updateHandle)
      updateHandle = undefined
    }
  }

  const DoUpdate = (): undefined => {
    this.Update()
    ClearUpdate()
  }

  const callLater = asCallLaterFn(zo_callLater)

  const RequestUpdate = (): undefined => {
    if (updateHandle != null) {
      return
    }
    updateHandle = callLater(DoUpdate, 500)
  }

  const RequestImmediateUpdate = (): undefined => {
    ClearUpdate()
    updateHandle = callLater(DoUpdate, 0)
  }

  internal.RegisterCallback(internal.callback.CATEGORY_DATA_UPDATED, RequestUpdate)
  internal.RegisterCallback(internal.callback.PROCESS_LINKED_EVENTS_STARTED, RequestImmediateUpdate)
  internal.RegisterCallback(internal.callback.PROCESS_LINKED_EVENT, RequestUpdate)
  internal.RegisterCallback(
    internal.callback.PROCESS_LINKED_EVENTS_FINISHED,
    RequestImmediateUpdate
  )
  internal.RegisterCallback(internal.callback.PROCESS_MISSED_EVENTS_STARTED, RequestImmediateUpdate)
  internal.RegisterCallback(internal.callback.PROCESS_MISSED_EVENT, RequestUpdate)
  internal.RegisterCallback(
    internal.callback.PROCESS_MISSED_EVENTS_FINISHED,
    RequestImmediateUpdate
  )
  internal.RegisterCallback(internal.callback.REQUEST_MODE_CHANGED, RequestImmediateUpdate)
  internal.RegisterCallback(internal.callback.ZOOM_MODE_CHANGED, RequestImmediateUpdate)
  internal.RegisterCallback(internal.callback.REQUEST_CREATED, RequestImmediateUpdate)
  internal.RegisterCallback(internal.callback.REQUEST_DESTROYED, RequestImmediateUpdate)
  internal.RegisterCallback(internal.callback.MANAGED_RANGE_LOST, RequestImmediateUpdate)
  internal.RegisterCallback(internal.callback.MANAGED_RANGE_FOUND, RequestImmediateUpdate)
  internal.RegisterCallback(
    internal.callback.SELECTED_CATEGORY_CACHE_CHANGED,
    (cache: SelectedCacheRef) => {
      this.SetGuildId(cache.GetGuildId())
      this.SetCategory(cache.GetCategory())
    }
  )
  guildHistoryScene.RegisterCallback("StateChange", RequestImmediateUpdate)

  this.LoadPosition()

  const selectedCache = this.historyAdapter.GetSelectedCategoryCache()
  this.SetGuildId(selectedCache.GetGuildId())
  this.SetCategory(selectedCache.GetCategory())
}

GuildHistoryStatusWindow.InitializeBaseList = function (
  this,
  listControl,
  template,
  OnInit,
  OnUpdate
) {
  const InitializeRow = (rowControl: Control, entry: RowEntry): undefined => {
    if (rowControl.initialized !== true) {
      InitializeProgress(rowControl, this)
      InitializeHighlight(rowControl)
      InitializeRowTooltip(rowControl, this.statusTooltip)
      OnInit(rowControl)
      rowControl.initialized = true
    }

    SetLabel(rowControl, entry)
    SetProgress(rowControl, entry)
    SetSelected(rowControl, entry)

    if (this.statusTooltip.GetTarget() === rowControl) {
      this.statusTooltip.Show(rowControl, asStatusTooltipCacheRef(entry.cache))
    }

    if (OnUpdate != null) {
      OnUpdate(rowControl, entry)
    }
  }

  ZO_ScrollList_Initialize(listControl)
  ZO_ScrollList_AddDataType(
    listControl,
    DATA_ENTRY,
    template,
    ROW_HEIGHT,
    InitializeRow,
    undefined,
    undefined,
    DestroyRow
  )
  ZO_ScrollList_AddResizeOnScreenResize(listControl)
}
