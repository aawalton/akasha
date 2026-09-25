import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-02/eso-objects-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import type { FilterController } from "akasha/temper/items/filters/addon/modules/panel-filter-binding/panel-filter-binding.module.code.ts"
import type {
  AnyTemperFilter,
  FilterEditorOption,
  FilterRangeValue,
} from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"
import type { SurfaceLevel } from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import { styleText } from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import {
  paintField,
  setTabChosen,
  styleDropdown,
  styleField,
  styleTab,
  CONTROL_HEIGHT as WEB_CONTROL_HEIGHT,
} from "akasha/temper/window/modules/window-controls/window-controls.module.code.ts"
import { spaceOf } from "akasha/temper/window/modules/window-spacing/window-spacing.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

export const CONTROL_LEVEL: SurfaceLevel = 2

const BAR_LEVEL: SurfaceLevel = 1

export const PADDING_X = spaceOf("2")
export const PADDING_Y = 6
export const CONTROL_HEIGHT = WEB_CONTROL_HEIGHT
export const CONTROL_GAP = 6
export const LABEL_GAP = 4

const NAME_BOX_WIDTH = 140
const RANGE_BOX_WIDTH = 70
const MULTISELECT_DROPDOWN_WIDTH = 120
const TOGGLE_WIDTH = 70
export const CLEAR_WIDTH = 50

export interface BarButton {
  button: ButtonControl
  backdrop: BackdropControl
  label: LabelControl
}

export interface BarContext {
  tlw: Control
  controller: FilterController
  addReset: (this: void, reset: (this: void) => void) => void
  runResets: (this: void) => void
}

export function createFieldLabel(parent: Control, text: string, xOffset: number): LabelControl {
  const label = WINDOW_MANAGER.CreateControl(undefined, parent, CT_LABEL)
  label.SetAnchor(LEFT, parent, TOPLEFT, xOffset, PADDING_Y + CONTROL_HEIGHT / 2)
  styleText(label, "label")
  label.SetText(text)
  return label
}

export function createBarButton(
  parent: Control,
  name: string,
  text: string,
  xOffset: number,
  width: number
): BarButton {
  const backdrop = WINDOW_MANAGER.CreateControl(`${name}BG`, parent, CT_BACKDROP)
  backdrop.SetAnchor(TOPLEFT, parent, TOPLEFT, xOffset, PADDING_Y)
  backdrop.SetDimensions(width, CONTROL_HEIGHT)
  paintField(backdrop, BAR_LEVEL)

  const caption = WINDOW_MANAGER.CreateControl(`${name}Label`, backdrop, CT_LABEL)
  caption.SetAnchorFill()
  styleText(caption, "heading")
  caption.SetHorizontalAlignment(TEXT_ALIGN_CENTER)
  caption.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  caption.SetText(text)
  caption.SetMouseEnabled(false)

  const button = WINDOW_MANAGER.CreateControl(name, parent, CT_BUTTON)
  button.SetAnchor(TOPLEFT, backdrop, TOPLEFT, 0, 0)
  button.SetAnchor(BOTTOMRIGHT, backdrop, BOTTOMRIGHT, 0, 0)
  button.SetMouseEnabled(true)
  styleTab(button)

  const bar: BarButton = { button, backdrop, label: caption }
  setButtonActive(bar, false)
  return bar
}

export function createEditBox(
  parent: Control,
  name: string,
  xOffset: number,
  width: number,
  defaultText: string
): EditControl {
  const boxBg = WINDOW_MANAGER.CreateControl(`${name}BG`, parent, CT_BACKDROP)
  boxBg.SetAnchor(TOPLEFT, parent, TOPLEFT, xOffset, PADDING_Y)
  boxBg.SetDimensions(width, CONTROL_HEIGHT)
  paintField(boxBg, BAR_LEVEL)

  const edit = WINDOW_MANAGER.CreateControl(name, parent, CT_EDITBOX)
  edit.SetAnchor(TOPLEFT, boxBg, TOPLEFT, 4, 0)
  edit.SetAnchor(BOTTOMRIGHT, boxBg, BOTTOMRIGHT, -4, 0)
  styleField(edit, BAR_LEVEL)
  edit.SetDefaultText(defaultText)
  edit.SetMaxInputChars(64)
  edit.SetMouseEnabled(true)
  edit.SetHandler("OnMouseUp", function (this: void): undefined {
    edit.TakeFocus()
  })
  return edit
}

export function setButtonActive(bar: BarButton, active: boolean): undefined {
  setTabChosen(bar.button, active)
}

export function buildTextEditor(
  ctx: BarContext,
  filter: AnyTemperFilter,
  xOffset: number,
  parent: Control = ctx.tlw,
  width: number = NAME_BOX_WIDTH
): number {
  const editor = filter.editor
  const placeholder =
    editor.kind === "text" && editor.placeholder !== undefined ? editor.placeholder : "Search…"
  const safe = sanitizeName(filter.id)
  const edit = createEditBox(parent, `$(parent)Text_${safe}`, xOffset, width, placeholder)

  const controller = ctx.controller
  const id = filter.id
  edit.SetHandler("OnTextChanged", function (this: void): undefined {
    const text = edit.GetText()
    if (text.length === 0) {
      controller.clearFilter(id)
    } else {
      controller.setFilter(id, text)
    }
  })

  ctx.addReset(function (this: void): undefined {
    edit.SetText("")
  })

  return xOffset + width + CONTROL_GAP
}

const ALL_OPTION_LABEL = "All"

export function buildMultiselectEditor(
  ctx: BarContext,
  filter: AnyTemperFilter,
  options: readonly FilterEditorOption[],
  xOffset: number,
  parent: Control = ctx.tlw,
  width: number = MULTISELECT_DROPDOWN_WIDTH
): number {
  const safe = sanitizeName(filter.id)
  const container = WINDOW_MANAGER.CreateControlFromVirtual(
    `$(parent)Ms_${safe}`,
    parent,
    "ZO_ComboBox"
  )
  container.SetDimensions(width, CONTROL_HEIGHT)
  container.SetAnchor(TOPLEFT, parent, TOPLEFT, xOffset, PADDING_Y)
  styleDropdown(container, BAR_LEVEL)

  const comboBox = ZO_ComboBox_ObjectFromContainer(container)
  const id = filter.id
  const cell: { syncing: boolean } = { syncing: false }

  const allEntry = comboBox.CreateItemEntry(ALL_OPTION_LABEL, function (this: void): undefined {
    if (cell.syncing) return
    ctx.controller.clearFilter(id)
  })
  comboBox.AddItem(allEntry)

  for (const option of options) {
    const value = option.value
    const entry = comboBox.CreateItemEntry(option.label, function (this: void): undefined {
      if (cell.syncing) return
      ctx.controller.setFilter(id, [value])
    })
    comboBox.AddItem(entry)
  }

  selectAllEntry(comboBox, cell)

  ctx.addReset(function (this: void): undefined {
    selectAllEntry(comboBox, cell)
  })

  return xOffset + width + CONTROL_GAP
}

function selectAllEntry(comboBox: ComboBox, cell: { syncing: boolean }): undefined {
  cell.syncing = true
  const items = comboBox.GetItems()
  for (const item of items) {
    if (item.name === ALL_OPTION_LABEL) {
      comboBox.SelectItem(item)
      break
    }
  }
  cell.syncing = false
}

export function buildToggleEditor(
  ctx: BarContext,
  filter: AnyTemperFilter,
  xOffset: number,
  parent: Control = ctx.tlw,
  width: number = TOGGLE_WIDTH
): number {
  const editor = filter.editor
  const includeLabel =
    editor.kind === "toggle" && editor.includeLabel !== undefined ? editor.includeLabel : "Yes"
  const excludeLabel =
    editor.kind === "toggle" && editor.excludeLabel !== undefined ? editor.excludeLabel : "No"

  const safe = sanitizeName(filter.id)
  const container = WINDOW_MANAGER.CreateControlFromVirtual(
    `$(parent)Tog_${safe}`,
    parent,
    "ZO_ComboBox"
  )
  container.SetDimensions(width, CONTROL_HEIGHT)
  container.SetAnchor(TOPLEFT, parent, TOPLEFT, xOffset, PADDING_Y)
  styleDropdown(container, BAR_LEVEL)

  const comboBox = ZO_ComboBox_ObjectFromContainer(container)
  const id = filter.id
  const cell: { syncing: boolean } = { syncing: false }

  const allEntry = comboBox.CreateItemEntry(ALL_OPTION_LABEL, function (this: void): undefined {
    if (cell.syncing) return
    ctx.controller.clearFilter(id)
  })
  comboBox.AddItem(allEntry)

  const includeEntry = comboBox.CreateItemEntry(includeLabel, function (this: void): undefined {
    if (cell.syncing) return
    ctx.controller.setFilter(id, "include")
  })
  comboBox.AddItem(includeEntry)

  const excludeEntry = comboBox.CreateItemEntry(excludeLabel, function (this: void): undefined {
    if (cell.syncing) return
    ctx.controller.setFilter(id, "exclude")
  })
  comboBox.AddItem(excludeEntry)

  selectAllEntry(comboBox, cell)

  ctx.addReset(function (this: void): undefined {
    selectAllEntry(comboBox, cell)
  })

  return xOffset + width + CONTROL_GAP
}

export function buildRangeEditor(
  ctx: BarContext,
  filter: AnyTemperFilter,
  xOffset: number,
  parent: Control = ctx.tlw,
  width: number = RANGE_BOX_WIDTH
): number {
  const op = rangeOp(filter)
  const safe = sanitizeName(filter.id)
  const edit = createEditBox(parent, `$(parent)Range_${safe}`, xOffset, width, op)

  const controller = ctx.controller
  const id = filter.id
  edit.SetHandler("OnTextChanged", function (this: void): undefined {
    const text = edit.GetText()
    const parsed = parseNumber(text)
    if (parsed === undefined) {
      controller.clearFilter(id)
    } else {
      const value: FilterRangeValue = { value: parsed, op }
      controller.setFilter(id, value)
    }
  })

  ctx.addReset(function (this: void): undefined {
    edit.SetText("")
  })

  return xOffset + width + CONTROL_GAP
}

function rangeOp(filter: AnyTemperFilter): NonNullable<FilterRangeValue["op"]> {
  const editor = filter.editor
  if (editor.kind === "range" && editor.ops !== undefined) {
    const first = editor.ops[0]
    if (first !== undefined) {
      return first
    }
  }
  return "<="
}

function parseNumber(text: string): number | undefined {
  if (text.length === 0) return undefined
  const parsed = tonumber(text)
  if (parsed === undefined) return undefined
  return parsed
}

export function sanitizeName(raw: string): string {
  const [result] = string.gsub(raw, "[^%w]", "_")
  return result
}
