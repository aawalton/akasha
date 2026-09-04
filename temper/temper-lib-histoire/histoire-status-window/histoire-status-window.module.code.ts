import { internal } from "../histoire-state/histoire-state.module.code.ts"
import type { GuildHistoryStatusTooltipInstance } from "../histoire-status-tooltip/histoire-status-tooltip.module.code.ts"
import {
  destroyRow,
  initializeHighlight,
  initializeProgress,
  initializeRowTooltip,
  setLabel,
  setProgress,
  setSelected,
} from "../histoire-status-window-row-helpers/histoire-status-window-row-helpers.module.code.ts"
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
} from "../histoire-status-window-shared/histoire-status-window-shared.module.code.ts"

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
  const clearUpdate = (): undefined => {
    if (updateHandle != null) {
      zo_removeCallLater(updateHandle)
      updateHandle = undefined
    }
  }

  const doUpdate = (): undefined => {
    this.Update()
    clearUpdate()
  }

  const callLater = asCallLaterFn(zo_callLater)

  const requestUpdate = (): undefined => {
    if (updateHandle != null) {
      return
    }
    updateHandle = callLater(doUpdate, 500)
  }

  const requestImmediateUpdate = (): undefined => {
    clearUpdate()
    updateHandle = callLater(doUpdate, 0)
  }

  internal.RegisterCallback(internal.callback.CATEGORY_DATA_UPDATED, requestUpdate)
  internal.RegisterCallback(internal.callback.PROCESS_LINKED_EVENTS_STARTED, requestImmediateUpdate)
  internal.RegisterCallback(internal.callback.PROCESS_LINKED_EVENT, requestUpdate)
  internal.RegisterCallback(
    internal.callback.PROCESS_LINKED_EVENTS_FINISHED,
    requestImmediateUpdate
  )
  internal.RegisterCallback(internal.callback.PROCESS_MISSED_EVENTS_STARTED, requestImmediateUpdate)
  internal.RegisterCallback(internal.callback.PROCESS_MISSED_EVENT, requestUpdate)
  internal.RegisterCallback(
    internal.callback.PROCESS_MISSED_EVENTS_FINISHED,
    requestImmediateUpdate
  )
  internal.RegisterCallback(internal.callback.REQUEST_MODE_CHANGED, requestImmediateUpdate)
  internal.RegisterCallback(internal.callback.ZOOM_MODE_CHANGED, requestImmediateUpdate)
  internal.RegisterCallback(internal.callback.REQUEST_CREATED, requestImmediateUpdate)
  internal.RegisterCallback(internal.callback.REQUEST_DESTROYED, requestImmediateUpdate)
  internal.RegisterCallback(internal.callback.MANAGED_RANGE_LOST, requestImmediateUpdate)
  internal.RegisterCallback(internal.callback.MANAGED_RANGE_FOUND, requestImmediateUpdate)
  internal.RegisterCallback(
    internal.callback.SELECTED_CATEGORY_CACHE_CHANGED,
    (cache: SelectedCacheRef) => {
      this.SetGuildId(cache.GetGuildId())
      this.SetCategory(cache.GetCategory())
    }
  )
  guildHistoryScene.RegisterCallback("StateChange", requestImmediateUpdate)

  this.LoadPosition()

  const selectedCache = this.historyAdapter.GetSelectedCategoryCache()
  this.SetGuildId(selectedCache.GetGuildId())
  this.SetCategory(selectedCache.GetCategory())
}

GuildHistoryStatusWindow.InitializeBaseList = function (
  this,
  listControl,
  template,
  onInit,
  onUpdate
) {
  const initializeRow = (rowControl: Control, entry: RowEntry): undefined => {
    if (rowControl.initialized !== true) {
      initializeProgress(rowControl, this)
      initializeHighlight(rowControl)
      initializeRowTooltip(rowControl, this.statusTooltip)
      onInit(rowControl)
      rowControl.initialized = true
    }

    setLabel(rowControl, entry)
    setProgress(rowControl, entry)
    setSelected(rowControl, entry)

    if (this.statusTooltip.GetTarget() === rowControl) {
      this.statusTooltip.Show(rowControl, asStatusTooltipCacheRef(entry.cache))
    }

    if (onUpdate != null) {
      onUpdate(rowControl, entry)
    }
  }

  ZO_ScrollList_Initialize(listControl)
  ZO_ScrollList_AddDataType(
    listControl,
    DATA_ENTRY,
    template,
    ROW_HEIGHT,
    initializeRow,
    undefined,
    undefined,
    destroyRow
  )
  ZO_ScrollList_AddResizeOnScreenResize(listControl)
}
