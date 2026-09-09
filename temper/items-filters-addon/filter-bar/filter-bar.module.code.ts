import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-interface-extra-4"
import "@akasha/temper-eso-types/eso-objects-02"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import { createMovableWindow, type WindowPosition } from "@akasha/temper-hud-window/movable-window"
import { TEMPER_FILTERS } from "@akasha/temper-items-filters-core/search-filter-registry"
import type {
  AnyTemperFilter,
  FilterGroup,
  FilterId,
} from "@akasha/temper-items-filters-core/search-filter-types"
import type { BarContext } from "../filter-bar-controls/filter-bar-controls.module.code.ts"
import {
  buildMultiselectEditor,
  buildRangeEditor,
  buildTextEditor,
  buildToggleEditor,
  CLEAR_WIDTH,
  CONTROL_GAP,
  CONTROL_HEIGHT,
  createBarButton,
  createFieldLabel,
  PADDING_X,
  PADDING_Y,
} from "../filter-bar-controls/filter-bar-controls.module.code.ts"
import type { FilterController } from "../panel-filter-binding/panel-filter-binding.module.code.ts"

const PANEL_NAME = "TemperInventoryFilterPanel"
const PLAN_PANEL_NAME = "TemperInventoryActionPanel"
const INVENTORY_TARGET_NAME = "ZO_PlayerInventory"
const DEFAULT_ANCHOR_OFFSET_X = 40
const DEFAULT_ANCHOR_GAP_Y = 8
const FALLBACK_LEFT = 200
const FALLBACK_TOP = 200

const PANEL_WIDTH = 250
const HEADER_HEIGHT = CONTROL_HEIGHT + PADDING_Y * 2
const ROW_HEIGHT = CONTROL_HEIGHT + PADDING_Y * 2
const LABEL_COL_WIDTH = 90
const REMOVE_WIDTH = 22
const REMOVE_X = PANEL_WIDTH - PADDING_X - REMOVE_WIDTH
const EDITOR_WIDTH = REMOVE_X - CONTROL_GAP - LABEL_COL_WIDTH
const ADD_COMBO_WIDTH = 110
const CLEAR_X = PANEL_WIDTH - PADDING_X - CLEAR_WIDTH
const ADD_COMBO_X = CLEAR_X - CONTROL_GAP - ADD_COMBO_WIDTH

const ADD_FILTER_LABEL = "+ Add filter"

const GROUP_LABELS: Record<FilterGroup, string> = {
  quality: "Quality",
  trait: "Trait",
  type: "Type",
  set: "Set",
  level: "Level",
  value: "Value",
  location: "Location",
  state: "State",
  knowledge: "Knowledge",
  text: "Text",
}

export interface SurfaceAnchor {
  readonly isActive: (this: void) => boolean
  readonly anchorTargets: readonly string[]
}

export interface FilterBarConfig {
  controller: FilterController
  loadPosition: (this: void) => WindowPosition | undefined
  savePosition: (this: void, position: WindowPosition) => undefined
  surfaceAnchors?: readonly SurfaceAnchor[]
}

interface FilterRow {
  container: Control
  resets: readonly ((this: void) => void)[]
}

export function createFilterBar(config: FilterBarConfig): undefined {
  const controller = config.controller

  const existing = WINDOW_MANAGER.GetControlByName<TopLevelWindow>(PANEL_NAME)
  if (existing !== undefined) {
    existing.SetHidden(true)
  }

  const tlw = WINDOW_MANAGER.CreateTopLevelWindow(PANEL_NAME)
  tlw.SetHidden(true)
  tlw.SetDimensions(PANEL_WIDTH, HEADER_HEIGHT + PADDING_Y)

  const bg = WINDOW_MANAGER.CreateControl("$(parent)BG", tlw, CT_BACKDROP)
  bg.SetAnchorFill()
  bg.SetCenterColor(0, 0, 0, 0.5)
  bg.SetEdgeColor(0, 0, 0, 0)
  bg.SetEdgeTexture(undefined, 1, 1, 1)

  const dragHandle = WINDOW_MANAGER.CreateControl("$(parent)DragHandle", tlw, CT_CONTROL)
  dragHandle.SetAnchor(TOPLEFT, tlw, TOPLEFT, 0, 0)
  dragHandle.SetDimensions(PANEL_WIDTH, HEADER_HEIGHT)
  const title = createFieldLabel(dragHandle, "Filters", PADDING_X)
  title.SetMouseEnabled(false)

  const comboContainer = WINDOW_MANAGER.CreateControlFromVirtual(
    "$(parent)AddCombo",
    tlw,
    "ZO_ComboBox"
  )
  comboContainer.SetDimensions(ADD_COMBO_WIDTH, CONTROL_HEIGHT)
  comboContainer.SetAnchor(TOPLEFT, tlw, TOPLEFT, ADD_COMBO_X, PADDING_Y)
  const combo = ZO_ComboBox_ObjectFromContainer(comboContainer)
  const addSyncing: { v: boolean } = { v: false }

  const clearButton = createBarButton(tlw, "$(parent)Clear", "Clear", CLEAR_X, CLEAR_WIDTH)

  const byId = new Map<FilterId, AnyTemperFilter>()
  for (const filter of TEMPER_FILTERS) {
    byId.set(filter.id, filter)
  }
  const activeOrder: FilterId[] = []
  const rows = new Map<FilterId, FilterRow>()

  function isActive(id: FilterId): boolean {
    for (const active of activeOrder) {
      if (active === id) return true
    }
    return false
  }

  const relayout = (): undefined => {
    let y = HEADER_HEIGHT
    for (const id of activeOrder) {
      const row = rows.get(id)
      if (row === undefined) continue
      row.container.ClearAnchors()
      row.container.SetAnchor(TOPLEFT, tlw, TOPLEFT, 0, y)
      y += ROW_HEIGHT
    }
    const height = activeOrder.length === 0 ? HEADER_HEIGHT + PADDING_Y : y + PADDING_Y
    tlw.SetDimensions(PANEL_WIDTH, height)
  }

  let activateRef: (id: FilterId) => undefined = () => undefined

  const resetAddMenuSelection = (): undefined => {
    addSyncing.v = true
    for (const item of combo.GetItems()) {
      if (item.name === ADD_FILTER_LABEL) {
        combo.SelectItem(item)
        break
      }
    }
    addSyncing.v = false
  }

  const buildAddMenu = (): undefined => {
    const placeholder = combo.CreateItemEntry(ADD_FILTER_LABEL, function (this: void): undefined {})
    combo.AddItem(placeholder)
    for (const filter of TEMPER_FILTERS) {
      const id = filter.id
      const label = `${GROUP_LABELS[filter.group]}: ${filter.label}`
      const entry = combo.CreateItemEntry(label, function (this: void): undefined {
        if (addSyncing.v) return
        if (!isActive(id)) activateRef(id)
        resetAddMenuSelection()
      })
      combo.AddItem(entry)
    }
    resetAddMenuSelection()
  }

  const removeFromOrder = (id: FilterId): undefined => {
    const next: FilterId[] = []
    for (const active of activeOrder) {
      if (active !== id) next[next.length] = active
    }
    activeOrder.length = 0
    for (const keep of next) {
      activeOrder[activeOrder.length] = keep
    }
  }

  const deactivate = (id: FilterId): undefined => {
    removeFromOrder(id)
    const row = rows.get(id)
    if (row !== undefined) {
      for (const reset of row.resets) {
        reset()
      }
      row.container.SetHidden(true)
    }
    controller.clearFilter(id)
    relayout()
  }

  const buildRow = (filter: AnyTemperFilter): FilterRow => {
    const safe = sanitizeId(filter.id)
    const container = WINDOW_MANAGER.CreateControl(`${PANEL_NAME}Row_${safe}`, tlw, CT_CONTROL)
    container.SetDimensions(PANEL_WIDTH, ROW_HEIGHT)

    const label = createFieldLabel(container, `${filter.label}:`, PADDING_X)
    label.SetMouseEnabled(false)

    const resets: ((this: void) => void)[] = []
    const rowCtx: BarContext = {
      tlw,
      controller,
      addReset(reset) {
        resets[resets.length] = reset
      },
      runResets() {
        for (const reset of resets) {
          reset()
        }
      },
    }
    renderEditorInto(rowCtx, filter, container)

    const remove = createBarButton(
      container,
      `${PANEL_NAME}Remove_${safe}`,
      "x",
      REMOVE_X,
      REMOVE_WIDTH
    )
    const id = filter.id
    remove.button.SetHandler("OnClicked", function (this: void): undefined {
      deactivate(id)
    })

    const row: FilterRow = { container, resets }
    rows.set(id, row)
    return row
  }

  const activate = (id: FilterId): undefined => {
    if (isActive(id)) return
    const filter = byId.get(id)
    if (filter === undefined) return
    activeOrder[activeOrder.length] = id
    let row = rows.get(id)
    if (row === undefined) {
      row = buildRow(filter)
    } else {
      for (const reset of row.resets) {
        reset()
      }
    }
    row.container.SetHidden(false)
    relayout()
  }
  activateRef = activate

  clearButton.button.SetHandler("OnClicked", function (this: void): undefined {
    for (const id of activeOrder) {
      const row = rows.get(id)
      if (row === undefined) continue
      for (const reset of row.resets) {
        reset()
      }
    }
    controller.clearAll()
  })

  buildAddMenu()

  const handle = createMovableWindow({
    window: tlw,
    dragHandle,
    loadPosition: config.loadPosition,
    savePosition: config.savePosition,
    applyDefaultAnchor: () => applyDefaultAnchor(tlw, config.surfaceAnchors),
  })

  INVENTORY_FRAGMENT.RegisterCallback(
    "StateChange",
    function (this: void, _oldState: number, newState: number): undefined {
      if (newState === SCENE_HIDDEN) {
        tlw.SetHidden(true)
        return
      }
      handle.reanchor()
      tlw.SetHidden(false)
    }
  )
}

function renderEditorInto(ctx: BarContext, filter: AnyTemperFilter, container: Control): undefined {
  const editor = filter.editor
  if (editor.kind === "text") {
    buildTextEditor(ctx, filter, LABEL_COL_WIDTH, container, EDITOR_WIDTH)
    return
  }
  if (editor.kind === "multiselect") {
    buildMultiselectEditor(ctx, filter, editor.options, LABEL_COL_WIDTH, container, EDITOR_WIDTH)
    return
  }
  if (editor.kind === "toggle") {
    buildToggleEditor(ctx, filter, LABEL_COL_WIDTH, container, EDITOR_WIDTH)
    return
  }
  buildRangeEditor(ctx, filter, LABEL_COL_WIDTH, container, EDITOR_WIDTH)
}

function applyDefaultAnchor(
  tlw: TopLevelWindow,
  surfaceAnchors: readonly SurfaceAnchor[] | undefined
): undefined {
  if (surfaceAnchors !== undefined) {
    for (const surface of surfaceAnchors) {
      if (!surface.isActive()) continue
      for (const name of surface.anchorTargets) {
        const target = WINDOW_MANAGER.GetControlByName(name)
        if (target !== undefined) {
          tlw.SetAnchor(TOPRIGHT, target, TOPLEFT, -DEFAULT_ANCHOR_OFFSET_X, 0)
          return
        }
      }
    }
  }
  const planPanel = WINDOW_MANAGER.GetControlByName(PLAN_PANEL_NAME)
  if (planPanel !== undefined) {
    tlw.SetAnchor(TOPLEFT, planPanel, BOTTOMLEFT, 0, DEFAULT_ANCHOR_GAP_Y)
    return
  }
  const inventory = WINDOW_MANAGER.GetControlByName(INVENTORY_TARGET_NAME)
  if (inventory !== undefined) {
    tlw.SetAnchor(TOPRIGHT, inventory, TOPLEFT, -DEFAULT_ANCHOR_OFFSET_X, 0)
    return
  }
  tlw.SetAnchor(TOPLEFT, GuiRoot, TOPLEFT, FALLBACK_LEFT, FALLBACK_TOP)
}

function sanitizeId(raw: string): string {
  const [result] = string.gsub(raw, "[^%w]", "_")
  return result
}
