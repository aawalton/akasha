import { TEXT_PRIMARY, TEXT_SECONDARY } from "@akasha/design-tokens/text-color"
import {
  createMovableWindow,
  type MovableWindowHandle,
} from "@akasha/temper-hud-window/movable-window"
import { getInventoryActionSummary } from "../inventory-plan/inventory-plan.module.code.ts"
import { getSavedVariables } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"

const PANEL_NAME = "TemperInventoryActionPanel"
const ANCHOR_TARGET_NAME = "ZO_PlayerInventory"
const DEFAULT_ANCHOR_OFFSET_X = 40
const PADDING_X = 12
const PADDING_Y = 12
const HEADER_HEIGHT = 22
const ROW_HEIGHT = 18
const ROW_GAP = 2
const MIN_WIDTH = 200

interface PanelState {
  tlw: TopLevelWindow
  bg: BackdropControl
  header: LabelControl
  rowControls: LabelControl[]
  handle: MovableWindowHandle
}

let panel: PanelState | undefined

export function initializeInventoryActionPanel(): undefined {
  if (panel) return

  const existing = WINDOW_MANAGER.GetControlByName<TopLevelWindow>(PANEL_NAME)
  if (existing) {
    existing.SetHidden(true)
  }

  const tlw = WINDOW_MANAGER.CreateTopLevelWindow(PANEL_NAME)
  tlw.SetHidden(true)
  tlw.SetDimensions(MIN_WIDTH, HEADER_HEIGHT + PADDING_Y * 2)

  const bg = WINDOW_MANAGER.CreateControl("$(parent)BG", tlw, CT_BACKDROP)
  bg.SetAnchorFill()
  bg.SetCenterColor(0, 0, 0, 0.5)
  bg.SetEdgeColor(0, 0, 0, 0)
  bg.SetEdgeTexture(undefined, 1, 1, 1)

  const header = WINDOW_MANAGER.CreateControl("$(parent)Header", tlw, CT_LABEL)
  header.SetAnchor(TOPLEFT, tlw, TOPLEFT, PADDING_X, PADDING_Y)
  header.SetFont("$(BOLD_FONT)|16|shadow")
  header.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
  header.SetText("")

  const dragHandle = WINDOW_MANAGER.CreateControl("$(parent)DragHandle", tlw, CT_CONTROL)
  dragHandle.SetAnchor(TOPLEFT, tlw, TOPLEFT, 0, 0)
  dragHandle.SetAnchor(BOTTOMRIGHT, tlw, BOTTOMRIGHT, 0, 0)

  const handle = createMovableWindow({
    window: tlw,
    dragHandle,
    loadPosition: () => {
      const saved = getSavedVariables().inventoryActionPanel
      if (saved === undefined) return undefined
      return { left: saved.left, top: saved.top }
    },
    savePosition: (position) => {
      getSavedVariables().inventoryActionPanel = { left: position.left, top: position.top }
    },
    applyDefaultAnchor: () => {
      const target = WINDOW_MANAGER.GetControlByName(ANCHOR_TARGET_NAME)
      if (target !== undefined) {
        tlw.SetAnchor(TOPRIGHT, target, TOPLEFT, -DEFAULT_ANCHOR_OFFSET_X, 0)
      } else {
        tlw.SetAnchor(TOPRIGHT, GuiRoot, TOPLEFT, -DEFAULT_ANCHOR_OFFSET_X, 0)
        tlw.SetHidden(true)
      }
    },
  })

  panel = { tlw, bg, header, rowControls: [], handle }

  INVENTORY_FRAGMENT.RegisterCallback(
    "StateChange",
    function (this: void, _oldState: number, newState: number): undefined {
      if (newState === SCENE_HIDDEN) {
        tlw.SetHidden(true)
        return
      }
      reanchor()
      refresh()
    }
  )

  CALLBACK_MANAGER.RegisterCallback(
    "Temper_InventoryActionsChanged",
    function (this: void): undefined {
      if (tlw.IsHidden()) return
      refresh()
    }
  )
}

function reanchor(): undefined {
  if (!panel) return
  panel.handle.reanchor()
}

function refresh(): undefined {
  if (!panel) return
  const summary = getInventoryActionSummary()
  if (summary === undefined || summary.venues.length === 0) {
    panel.tlw.SetHidden(true)
    return
  }

  panel.header.SetText(`Inventory Plan — ${summary.totalSlots} items`)

  for (const row of panel.rowControls) {
    row.SetHidden(true)
  }

  let maxLabelWidth = panel.header.GetTextWidth()
  let yOffset = PADDING_Y + HEADER_HEIGHT + ROW_GAP
  for (let i = 0; i < summary.venues.length; i += 1) {
    const venue = summary.venues[i]
    if (venue === undefined) continue
    let row = panel.rowControls[i]
    if (row === undefined) {
      row = WINDOW_MANAGER.CreateControl(undefined, panel.tlw, CT_LABEL)
      row.SetFont("$(BOLD_FONT)|14|shadow")
      row.SetColor(TEXT_SECONDARY[0], TEXT_SECONDARY[1], TEXT_SECONDARY[2], 1)
      panel.rowControls[i] = row
    }
    row.ClearAnchors()
    row.SetAnchor(TOPLEFT, panel.tlw, TOPLEFT, PADDING_X, yOffset)
    row.SetText(`${venue.label} — ${venue.count} items`)
    row.SetHidden(false)
    const w = row.GetTextWidth()
    if (w > maxLabelWidth) maxLabelWidth = w
    yOffset += ROW_HEIGHT + ROW_GAP
  }

  const computedWidth = math.max(MIN_WIDTH, maxLabelWidth + PADDING_X * 2)
  const computedHeight = yOffset - ROW_GAP + PADDING_Y
  panel.tlw.SetDimensions(computedWidth, computedHeight)
  panel.tlw.SetHidden(false)
}
