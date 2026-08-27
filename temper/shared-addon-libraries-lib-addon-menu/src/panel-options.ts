import { asControl, asHookTable, asLamControl, asLamFactory } from "./casts"
import { OPTIONS_CREATED, OPTIONS_CREATION_RUNNING } from "./constants"
import { handleLoadDefaultsPressed, handleReloadUIPressed } from "./dialogs"
import { logger, printLater } from "./messages"
import { addonToOptionsMap, cm, lam, lamcc, optionsState, wm } from "./state"
import type { LamControl, LamWidgetData } from "./types"
import { getStringFromValue } from "./util"

export function initKeybindActions(this: void): undefined {
  if (lam.keybindsInitialized !== true) {
    lam.keybindsInitialized = true
    ZO_PreHook(
      asHookTable(KEYBOARD_OPTIONS),
      "ApplySettings",
      function (this: void, ..._args: unknown[]): unknown {
        if (lam.currentPanelOpened === true) {
          const applyButton = lam.applyButton
          if (applyButton !== undefined && !applyButton.IsHidden()) {
            handleReloadUIPressed()
          }
          return true
        }
        return undefined
      }
    )
    ZO_PreHook("ZO_Dialogs_ShowDialog", function (this: void, ...args: unknown[]): unknown {
      const dialogName = args[0]
      if (lam.currentPanelOpened === true && dialogName === "OPTIONS_RESET_TO_DEFAULTS") {
        const defaultButton = lam.defaultButton
        if (defaultButton !== undefined && !defaultButton.IsHidden()) {
          handleLoadDefaultsPressed()
        }
        return true
      }
      return undefined
    })
  }
}

export function openCurrentPanel(this: void): undefined {
  const panel = lam.currentAddonPanel
  if (panel !== undefined && lam.currentPanelOpened !== true) {
    lam.currentPanelOpened = true
    lam.defaultButton?.SetHidden(panel.data.registerForDefaults !== true)
    cm.FireCallbacks("LAM-PanelOpened", panel)
  }
}

export function closeCurrentPanel(this: void): undefined {
  const panel = lam.currentAddonPanel
  if (panel !== undefined && lam.currentPanelOpened === true) {
    lam.currentPanelOpened = false
    cm.FireCallbacks("LAM-PanelClosed", panel)
  }
}

let twinOptionsContainerIndex = 0
function twinOptionsContainer(
  this: void,
  parent: LamControl,
  leftWidget: LamControl,
  rightWidget: LamControl
): LamControl {
  twinOptionsContainerIndex = twinOptionsContainerIndex + 1
  const cParent = parent.scroll ?? asControl(parent)
  const panel = parent.panel ?? asLamControl(cParent)
  const container = asLamControl(
    wm.CreateControl(`$(parent)TwinContainer${twinOptionsContainerIndex}`, cParent, CT_CONTROL)
  )
  container.SetResizeToFitDescendents(true)

  const [, point, relativeTo, relativePoint, offsetX, offsetY, constrains] = leftWidget.GetAnchor(0)
  container.SetAnchor(point, relativeTo, relativePoint, offsetX, offsetY, constrains)

  leftWidget.ClearAnchors()
  leftWidget.SetAnchor(TOPLEFT, container, TOPLEFT)
  rightWidget.SetAnchor(TOPLEFT, leftWidget, TOPRIGHT, 5, 0)

  leftWidget.SetWidth(leftWidget.GetWidth() - 2.5)
  rightWidget.SetWidth(rightWidget.GetWidth() - 2.5)

  leftWidget.SetParent(container)
  rightWidget.SetParent(container)

  container.data = { type: "container" }
  container.panel = panel
  return container
}

export function createOptionsControls(this: void, panel: LamControl): boolean {
  const addonID = panel.GetName()
  if (optionsState[addonID] === OPTIONS_CREATED) {
    return false
  } else if (optionsState[addonID] === OPTIONS_CREATION_RUNNING) {
    return true
  }
  optionsState[addonID] = OPTIONS_CREATION_RUNNING

  const creationFinished = function (this: void): undefined {
    optionsState[addonID] = OPTIONS_CREATED
    cm.FireCallbacks("LAM-PanelControlsCreated", panel)
    openCurrentPanel()
  }

  cm.FireCallbacks("LAM-BeforePanelControlsCreated", panel)
  const optionsTable = addonToOptionsMap[addonID]
  if (optionsTable !== undefined) {
    let anchorOffset = 0
    let lastAddedControl: LamControl | undefined
    let wasHalf = false
    let errValue: unknown

    const createAndAnchorWidget = function (
      this: void,
      parent: LamControl,
      widgetData: LamWidgetData
    ): undefined {
      let widget: LamControl | undefined
      const factory = asLamFactory(lamcc[widgetData.type])
      const [status, err] = pcall(() => {
        widget = factory(parent, widgetData)
      })
      if (!status) {
        errValue = err
        return
      }
      errValue = undefined
      const created = asLamControl(widget)
      let isHalf = widgetData.width === "half"
      if (lastAddedControl === undefined) {
        created.SetAnchor(TOPLEFT)
        lastAddedControl = created
      } else if (wasHalf && isHalf) {
        created.lineControl = lastAddedControl
        isHalf = false
        anchorOffset = 0
        lastAddedControl = twinOptionsContainer(parent, lastAddedControl, created)
      } else {
        created.SetAnchor(TOPLEFT, asControl(lastAddedControl), BOTTOMLEFT, 0, 15)
        anchorOffset = 0
        lastAddedControl = created
      }
      wasHalf = isHalf
    }

    const THROTTLE_TIMEOUT = 10
    const THROTTLE_COUNT = 20
    const fifo: ((this: void) => void)[] = []

    const prepareForNextPanel = function (this: void): undefined {
      anchorOffset = 0
      lastAddedControl = undefined
      wasHalf = false
    }

    let createWidgetsInPanel: (
      this: void,
      parent: LamControl,
      widgetDataTable: LamWidgetData[],
      startIndex: number,
      endIndex: number
    ) => void

    const setupCreationCalls = function (
      this: void,
      parent: LamControl,
      widgetDataTable: LamWidgetData[]
    ): boolean {
      fifo[fifo.length] = prepareForNextPanel
      const count = widgetDataTable.length
      for (let i = 1; i <= zo_ceil(count / THROTTLE_COUNT); i += 1) {
        const batchIndex = i
        fifo[fifo.length] = function (this: void): undefined {
          const startIndex = (batchIndex - 1) * THROTTLE_COUNT + 1
          const endIndex = zo_min(batchIndex * THROTTLE_COUNT, count)
          createWidgetsInPanel(parent, widgetDataTable, startIndex, endIndex)
        }
      }
      return count !== NonContiguousCount(widgetDataTable)
    }

    createWidgetsInPanel = function (
      this: void,
      parent: LamControl,
      widgetDataTable: LamWidgetData[],
      startIndex: number,
      endIndex: number
    ): undefined {
      for (let i = startIndex; i <= endIndex; i += 1) {
        const widgetData = widgetDataTable[i - 1]
        if (widgetData === undefined) {
          printLater(`Skipped creation of missing entry in the settings menu of ${addonID}.`)
        } else {
          const widgetType = widgetData.type
          const isSubmenu = widgetType === "submenu"
          if (isSubmenu) {
            wasHalf = false
          }

          createAndAnchorWidget(parent, widgetData)
          if (errValue !== undefined && errValue !== false) {
            printLater(
              string.format(
                "Could not create %s '%s' of %s.",
                widgetData.type,
                getStringFromValue(widgetData.name ?? "unnamed"),
                addonID
              )
            )
            logger.Error(errValue)
          }

          if (isSubmenu && lastAddedControl !== undefined) {
            if (setupCreationCalls(lastAddedControl, widgetData.controls ?? [])) {
              printLater(
                string.format(
                  "The sub menu '%s' of %s is missing some entries.",
                  getStringFromValue(widgetData.name ?? "unnamed"),
                  addonID
                )
              )
            }
          }
        }
      }
    }

    const doCreateSettings = function (this: void): undefined {
      if (fifo.length > 0) {
        const nextCall = fifo.shift()
        if (nextCall !== undefined) {
          nextCall()
          if (nextCall === prepareForNextPanel) {
            doCreateSettings()
          } else {
            zo_callLater(doCreateSettings, THROTTLE_TIMEOUT)
          }
        }
      } else {
        creationFinished()
      }
    }

    if (setupCreationCalls(panel, optionsTable)) {
      printLater(`The settings menu of ${addonID} is missing some entries.`)
    }
    doCreateSettings()
  } else {
    creationFinished()
  }

  return true
}

export function toggleAddonPanels(this: void, ...args: unknown[]): undefined {
  const panel = asLamControl(args[0])
  const currentlySelected = lam.currentAddonPanel
  if (currentlySelected !== undefined && currentlySelected !== panel) {
    currentlySelected.SetHidden(true)
    closeCurrentPanel()
  }
  lam.currentAddonPanel = panel

  const addonList = lam.addonList
  if (addonList !== undefined) {
    ZO_ScrollList_RefreshVisible(addonList)
  }

  if (!createOptionsControls(panel)) {
    openCurrentPanel()
  }

  cm.FireCallbacks("LAM-RefreshPanel", panel)
}

export function showSetHandlerWarning(this: void, ...args: unknown[]): unknown {
  const panel = asLamControl(args[0])
  const handler = args[1]
  let hint: string | undefined
  if (handler === "OnShow" || handler === "OnEffectivelyShown") {
    hint = "'LAM-PanelControlsCreated' or 'LAM-PanelOpened'"
  } else if (handler === "OnHide" || handler === "OnEffectivelyHidden") {
    hint = "'LAM-PanelClosed'"
  }

  if (hint !== undefined) {
    const message = string.format(
      "Setting a handler on a panel is not recommended. Use the global callback %s instead. (%s on %s)",
      hint,
      handler,
      panel.data.name
    )
    printLater(message)
    logger.Warn(message)
  }
  return undefined
}
