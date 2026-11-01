import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-02/eso-objects-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import type { BarContext } from "akasha/temper/items/filters/addon/modules/filter-bar-controls/filter-bar-controls.module.code.ts"
import {
  buildMultiselectEditor,
  buildRangeEditor,
  buildTextEditor,
  buildToggleEditor,
  PILL_TOP,
  sanitizeName,
} from "akasha/temper/items/filters/addon/modules/filter-bar-controls/filter-bar-controls.module.code.ts"
import {
  comboPill,
  createRemoveMark,
  fillPanel,
  PILL_HEIGHT,
  styleFilterName,
} from "akasha/temper/items/filters/addon/modules/filter-pill/filter-pill.module.code.ts"
import type { FilterController } from "akasha/temper/items/filters/addon/modules/panel-filter-binding/panel-filter-binding.module.code.ts"
import { TEMPER_FILTERS } from "akasha/temper/items/filters/core/modules/search-filter-registry/search-filter-registry.module.code.ts"
import type {
  AnyTemperFilter,
  FilterGroup,
  FilterId,
} from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"

const PANEL_NAME = "TemperItemsFilterPanel"
const PLAN_PANEL_NAME = "TemperItemsActionPanel"
const INVENTORY_TARGET_NAME = "ZO_PlayerInventory"
const DEFAULT_ANCHOR_OFFSET_X = 40
const DEFAULT_ANCHOR_GAP_Y = 8
const FALLBACK_LEFT = 200
const FALLBACK_TOP = 200

export const FILTER_BAR_WIDTH = 250
const PANEL_PAD = 12
const ROW_GAP = 12
const NAME_HEIGHT = 16
const NAME_GAP = 8
const ROW_HEIGHT = NAME_HEIGHT + NAME_GAP + PILL_HEIGHT
const PILLS_TOP = NAME_HEIGHT + NAME_GAP - PILL_TOP
const PILLS_HEIGHT = PILL_TOP * 2 + PILL_HEIGHT
const INNER_WIDTH = FILTER_BAR_WIDTH - PANEL_PAD * 2
const RANGE_VALUE_WIDTH = 80

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

interface SurfaceAnchor {
  readonly isActive: (this: void) => boolean
  readonly anchorTargets: readonly string[]
}

interface FilterBarConfig {
  controller: FilterController
  surfaceAnchors?: readonly SurfaceAnchor[]
  panelName?: string
  shownBeside?: readonly string[]
}

interface FilterRow {
  container: Control
  resets: readonly ((this: void) => void)[]
}

export function createFilterBar(config: FilterBarConfig): undefined {
  const controller = config.controller
  const panelName = config.panelName ?? PANEL_NAME

  const existing = WINDOW_MANAGER.GetControlByName<TopLevelWindow>(panelName)
  if (existing !== undefined) {
    existing.SetHidden(true)
  }

  const tlw = WINDOW_MANAGER.CreateTopLevelWindow(panelName)
  tlw.SetHidden(true)
  tlw.SetDimensions(FILTER_BAR_WIDTH, PANEL_PAD * 2 + PILL_HEIGHT)

  fillPanel(tlw)

  const add = comboPill(tlw, "$(parent)AddCombo", ADD_FILTER_LABEL, false)
  add.comboBox.SetSortsItems(false)

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

  let activateRef: (id: FilterId) => undefined = () => undefined

  const fillAddMenu = (): number => {
    add.comboBox.ClearItems()
    let offered = 0
    for (const filter of TEMPER_FILTERS) {
      const id = filter.id
      if (isActive(id)) continue
      const label = `${GROUP_LABELS[filter.group]}: ${filter.label}`
      const entry = add.comboBox.CreateItemEntry(label, function (this: void): undefined {
        activateRef(id)
      })
      add.comboBox.AddItem(entry)
      offered += 1
    }
    return offered
  }

  const relayout = (): undefined => {
    let y = PANEL_PAD
    for (const id of activeOrder) {
      const row = rows.get(id)
      if (row === undefined) continue
      row.container.ClearAnchors()
      row.container.SetAnchor(TOPLEFT, tlw, TOPLEFT, 0, y)
      row.container.SetAnchor(TOPRIGHT, tlw, TOPRIGHT, 0, y)
      y += ROW_HEIGHT + ROW_GAP
    }
    const offered = fillAddMenu() > 0
    add.container.SetHidden(!offered)
    add.container.ClearAnchors()
    add.container.SetAnchor(TOPLEFT, tlw, TOPLEFT, PANEL_PAD, y)
    const bottom = offered ? y + PILL_HEIGHT : y - ROW_GAP
    tlw.SetHeight(bottom + PANEL_PAD)
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
    const safe = sanitizeName(filter.id)
    const container = WINDOW_MANAGER.CreateControl(`${panelName}Block_${safe}`, tlw, CT_CONTROL)
    container.SetHeight(ROW_HEIGHT)
    const id = filter.id

    const name = styleFilterName(WINDOW_MANAGER.CreateControl(undefined, container, CT_LABEL))
    name.SetText(filter.label)
    name.SetAnchor(LEFT, container, TOPLEFT, PANEL_PAD, NAME_HEIGHT / 2)

    const remove = createRemoveMark(container, function (this: void): undefined {
      deactivate(id)
    })
    remove.SetAnchor(RIGHT, container, TOPRIGHT, -PANEL_PAD, NAME_HEIGHT / 2)

    const pills = WINDOW_MANAGER.CreateControl(`${panelName}Row_${safe}`, container, CT_CONTROL)
    pills.SetAnchor(TOPLEFT, container, TOPLEFT, 0, PILLS_TOP)
    pills.SetAnchor(TOPRIGHT, container, TOPRIGHT, 0, PILLS_TOP)
    pills.SetHeight(PILLS_HEIGHT)

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
    renderEditorInto(rowCtx, filter, pills)

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

  relayout()

  if (config.shownBeside !== undefined) {
    showBeside(tlw, config.shownBeside)
    return
  }

  INVENTORY_FRAGMENT.RegisterCallback(
    "StateChange",
    function (this: void, _oldState: number, newState: number): undefined {
      if (newState === SCENE_HIDDEN) {
        tlw.SetHidden(true)
        return
      }
      tlw.ClearAnchors()
      applyDefaultAnchor(tlw, config.surfaceAnchors)
      tlw.SetHidden(false)
    }
  )
}

function showBeside(tlw: TopLevelWindow, targetNames: readonly string[]): undefined {
  for (const name of targetNames) {
    const target = WINDOW_MANAGER.GetControlByName(name)
    if (target === undefined) continue
    ZO_PostHookHandler(target, "OnEffectivelyShown", function (this: void): undefined {
      tlw.ClearAnchors()
      tlw.SetWidth(FILTER_BAR_WIDTH)
      tlw.SetAnchor(TOPRIGHT, target, TOPLEFT, -DEFAULT_ANCHOR_OFFSET_X, 0)
      tlw.SetHidden(false)
    })
    ZO_PostHookHandler(target, "OnEffectivelyHidden", function (this: void): undefined {
      tlw.SetHidden(true)
    })
  }
}

function renderEditorInto(ctx: BarContext, filter: AnyTemperFilter, container: Control): undefined {
  const editor = filter.editor
  if (editor.kind === "text") {
    buildTextEditor(ctx, filter, PANEL_PAD, container, INNER_WIDTH)
    return
  }
  if (editor.kind === "multiselect") {
    buildMultiselectEditor(ctx, filter, editor.options, PANEL_PAD, container, INNER_WIDTH)
    return
  }
  if (editor.kind === "toggle") {
    buildToggleEditor(ctx, filter, PANEL_PAD, container, INNER_WIDTH)
    return
  }
  buildRangeEditor(ctx, filter, PANEL_PAD, container, RANGE_VALUE_WIDTH)
}

function applyDefaultAnchor(
  tlw: TopLevelWindow,
  surfaceAnchors: readonly SurfaceAnchor[] | undefined
): undefined {
  tlw.SetWidth(FILTER_BAR_WIDTH)
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
    tlw.SetAnchor(TOPRIGHT, planPanel, BOTTOMRIGHT, 0, DEFAULT_ANCHOR_GAP_Y)
    return
  }
  const inventory = WINDOW_MANAGER.GetControlByName(INVENTORY_TARGET_NAME)
  if (inventory !== undefined) {
    tlw.SetAnchor(TOPRIGHT, inventory, TOPLEFT, -DEFAULT_ANCHOR_OFFSET_X, 0)
    return
  }
  tlw.SetAnchor(TOPLEFT, GuiRoot, TOPLEFT, FALLBACK_LEFT, FALLBACK_TOP)
}
