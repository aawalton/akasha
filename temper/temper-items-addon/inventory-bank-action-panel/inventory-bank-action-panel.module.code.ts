import { TEXT_PRIMARY, TEXT_SECONDARY } from "@akasha/design-tokens/text-color"
import {
  createMovableWindow,
  type MovableWindowHandle,
} from "@akasha/temper-hud-window/movable-window"
import { getBankTransitionSummary } from "../inventory-bank-plan/inventory-bank-plan.module.code.ts"
import { recordSettlingMs } from "../inventory-bank-trace/inventory-bank-trace.module.code.ts"
import { getSavedVariables } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"

const PANEL_NAME = "TemperBankActionPanel"
const BANK_ANCHOR_TARGET_NAMES = ["ZO_PlayerBankBackpack", "ZO_PlayerBank"]
const DEFAULT_ANCHOR_OFFSET_X = 40
const FALLBACK_LEFT = 80
const FALLBACK_TOP = 200
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

let bankPanel: PanelState | undefined

export function initializeBankActionPanel(): undefined {
  if (bankPanel) return

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
      const saved = getSavedVariables().bankActionPanel
      if (saved === undefined) return undefined
      return { left: saved.left, top: saved.top }
    },
    savePosition: (position) => {
      getSavedVariables().bankActionPanel = { left: position.left, top: position.top }
    },
    applyDefaultAnchor: () => {
      for (const name of BANK_ANCHOR_TARGET_NAMES) {
        const target = WINDOW_MANAGER.GetControlByName(name)
        if (target !== undefined) {
          tlw.SetAnchor(TOPRIGHT, target, TOPLEFT, -DEFAULT_ANCHOR_OFFSET_X, 0)
          return
        }
      }
      tlw.SetAnchor(TOPLEFT, GuiRoot, TOPLEFT, FALLBACK_LEFT, FALLBACK_TOP)
    },
  })

  bankPanel = { tlw, bg, header, rowControls: [], handle }
}

export function refreshBankActionPanel(bankBag: number): undefined {
  const start = GetGameTimeMilliseconds()
  refreshBankActionPanelInner(bankBag)
  recordSettlingMs("bankPanelRefresh", GetGameTimeMilliseconds() - start)
}

function refreshBankActionPanelInner(bankBag: number): undefined {
  if (!bankPanel) return

  const summary = getBankTransitionSummary(bankBag)
  if (summary === undefined || summary.characters.length === 0) {
    bankPanel.tlw.SetHidden(true)
    return
  }

  reanchor()

  bankPanel.header.SetText(`Bank Plan — ${summary.totalUnits} items leaving`)

  for (const row of bankPanel.rowControls) {
    row.SetHidden(true)
  }

  let maxLabelWidth = bankPanel.header.GetTextWidth()
  let yOffset = PADDING_Y + HEADER_HEIGHT + ROW_GAP
  for (let i = 0; i < summary.characters.length; i += 1) {
    const entry = summary.characters[i]
    if (entry === undefined) continue
    let row = bankPanel.rowControls[i]
    if (row === undefined) {
      row = WINDOW_MANAGER.CreateControl(undefined, bankPanel.tlw, CT_LABEL)
      row.SetFont("$(BOLD_FONT)|14|shadow")
      row.SetColor(TEXT_SECONDARY[0], TEXT_SECONDARY[1], TEXT_SECONDARY[2], 1)
      bankPanel.rowControls[i] = row
    }
    row.ClearAnchors()
    row.SetAnchor(TOPLEFT, bankPanel.tlw, TOPLEFT, PADDING_X, yOffset)
    row.SetText(`${entry.label} — ${entry.count} items`)
    row.SetHidden(false)
    const w = row.GetTextWidth()
    if (w > maxLabelWidth) maxLabelWidth = w
    yOffset += ROW_HEIGHT + ROW_GAP
  }

  const computedWidth = math.max(MIN_WIDTH, maxLabelWidth + PADDING_X * 2)
  const computedHeight = yOffset - ROW_GAP + PADDING_Y
  bankPanel.tlw.SetDimensions(computedWidth, computedHeight)
  bankPanel.tlw.SetHidden(false)
}

export function hideBankActionPanel(): undefined {
  if (!bankPanel) return
  bankPanel.tlw.SetHidden(true)
}

function reanchor(): undefined {
  if (!bankPanel) return
  bankPanel.handle.reanchor()
}
