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
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"
import {
  comboPill,
  editPill,
  PILL_GAP,
  PILL_HEIGHT,
  setPillText,
  staticPill,
} from "akasha/temper/items/filters/addon/modules/filter-pill/filter-pill.module.code.ts"
import type { FilterController } from "akasha/temper/items/filters/addon/modules/panel-filter-binding/panel-filter-binding.module.code.ts"
import type {
  AnyTemperFilter,
  FilterEditorOption,
  FilterRangeValue,
} from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"
import { styleText } from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import {
  paintField,
  setChoiceChosen,
  styleChoice,
  styleField,
  CONTROL_HEIGHT as WINDOW_CONTROL_HEIGHT,
} from "akasha/temper/window/modules/window-controls/window-controls.module.code.ts"
import { clearBackdrop } from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"
import { spaceOf } from "akasha/temper/window/modules/window-spacing/window-spacing.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

export const PADDING_X = spaceOf("2")
export const PADDING_Y = 6
export const CONTROL_HEIGHT = WINDOW_CONTROL_HEIGHT
export const CONTROL_GAP = spaceOf("2")
export const LABEL_GAP = 4
export const PILL_TOP = PADDING_Y + (CONTROL_HEIGHT - PILL_HEIGHT) / 2

const NAME_BOX_WIDTH = 140
const RANGE_BOX_WIDTH = 70
const MULTISELECT_DROPDOWN_WIDTH = 120
const TOGGLE_WIDTH = 70
const VALUE_PLACEHOLDER = "Amount"
const DEFAULT_OP: ComparisonOp = "<="

type ComparisonOp = NonNullable<FilterRangeValue["op"]>

const OP_LABELS: Readonly<Record<ComparisonOp, string>> = {
  "<=": "At most",
  "<": "Under",
  ">=": "At least",
  ">": "Over",
  "=": "Exactly",
  "!=": "Not",
}

export interface BarButton {
  button: ButtonControl
  backdrop: BackdropControl
  label: LabelControl
}

interface MultiSelectComboBox extends ComboBox {
  EnableMultiSelect: (
    this: MultiSelectComboBox,
    textFormatter: string,
    noSelectionText: string
  ) => void
  IsItemSelected: (this: MultiSelectComboBox, item: ComboBoxItem) => boolean
  ClearAllSelections: (this: MultiSelectComboBox) => void
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
  clearBackdrop(backdrop)

  const caption = WINDOW_MANAGER.CreateControl(`${name}Label`, backdrop, CT_LABEL)
  caption.SetAnchorFill()
  styleText(caption, "body")
  caption.SetHorizontalAlignment(TEXT_ALIGN_CENTER)
  caption.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  caption.SetText(text)
  caption.SetMouseEnabled(false)

  const button = WINDOW_MANAGER.CreateControl(name, parent, CT_BUTTON)
  button.SetAnchor(TOPLEFT, backdrop, TOPLEFT, 0, 0)
  button.SetAnchor(BOTTOMRIGHT, backdrop, BOTTOMRIGHT, 0, 0)
  button.SetMouseEnabled(true)
  styleChoice(button, caption)

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
  paintField(boxBg)

  const edit = WINDOW_MANAGER.CreateControl(name, parent, CT_EDITBOX)
  edit.SetAnchor(TOPLEFT, boxBg, TOPLEFT, 4, 0)
  edit.SetAnchor(BOTTOMRIGHT, boxBg, BOTTOMRIGHT, -4, 0)
  styleField(edit)
  edit.SetDefaultText(defaultText)
  edit.SetMaxInputChars(64)
  edit.SetMouseEnabled(true)
  edit.SetHandler("OnMouseUp", function (this: void): undefined {
    edit.TakeFocus()
  })
  return edit
}

export function setButtonActive(bar: BarButton, active: boolean): undefined {
  setChoiceChosen(bar.button, active)
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
  const { area, edit } = editPill(parent, `$(parent)Text_${safe}`, width, placeholder)
  area.SetAnchor(TOPLEFT, parent, TOPLEFT, xOffset, PILL_TOP)

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
  const made = comboPill(parent, `$(parent)Ms_${safe}`, ALL_OPTION_LABEL, true)
  made.container.SetAnchor(TOPLEFT, parent, TOPLEFT, xOffset, PILL_TOP)

  const comboBox = made.comboBox as MultiSelectComboBox
  comboBox.SetSortsItems(false)
  comboBox.EnableMultiSelect(
    GetString(SI_COMBO_BOX_DEFAULT_MULTISELECTION_TEXT_FORMATTER),
    ALL_OPTION_LABEL
  )
  const id = filter.id
  const cell: { syncing: boolean } = { syncing: false }
  const entries: {
    readonly item: ComboBoxItem
    readonly value: string
    readonly label: string
  }[] = []

  function pushPicked(this: void): undefined {
    if (cell.syncing) return
    const picked: string[] = []
    const names: string[] = []
    for (const entry of entries) {
      if (!comboBox.IsItemSelected(entry.item)) continue
      picked.push(entry.value)
      names.push(entry.label)
    }
    setPillText(made.pill, pickedText(names))
    if (picked.length === 0) {
      ctx.controller.clearFilter(id)
    } else {
      ctx.controller.setFilter(id, picked)
    }
  }

  for (const option of options) {
    const label =
      option.itemQuality === undefined
        ? option.label
        : GetItemQualityColor(option.itemQuality).Colorize(option.label)
    const item = comboBox.CreateItemEntry(label, pushPicked)
    comboBox.AddItem(item)
    entries.push({ item, value: option.value, label })
  }

  ctx.addReset(function (this: void): undefined {
    cell.syncing = true
    comboBox.ClearAllSelections()
    cell.syncing = false
    setPillText(made.pill, ALL_OPTION_LABEL)
  })

  return xOffset + width + CONTROL_GAP
}

function pickedText(names: readonly string[]): string {
  const only = names[0]
  if (only === undefined) return ALL_OPTION_LABEL
  if (names.length === 1) return only
  return `${names.length} selected`
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
  const made = comboPill(parent, `$(parent)Tog_${safe}`, ALL_OPTION_LABEL, true)
  made.container.SetAnchor(TOPLEFT, parent, TOPLEFT, xOffset, PILL_TOP)

  const comboBox = made.comboBox
  const id = filter.id
  const cell: { syncing: boolean } = { syncing: false }

  const allEntry = comboBox.CreateItemEntry(ALL_OPTION_LABEL, function (this: void): undefined {
    if (cell.syncing) return
    setPillText(made.pill, ALL_OPTION_LABEL)
    ctx.controller.clearFilter(id)
  })
  comboBox.AddItem(allEntry)

  const includeEntry = comboBox.CreateItemEntry(includeLabel, function (this: void): undefined {
    if (cell.syncing) return
    setPillText(made.pill, includeLabel)
    ctx.controller.setFilter(id, "include")
  })
  comboBox.AddItem(includeEntry)

  const excludeEntry = comboBox.CreateItemEntry(excludeLabel, function (this: void): undefined {
    if (cell.syncing) return
    setPillText(made.pill, excludeLabel)
    ctx.controller.setFilter(id, "exclude")
  })
  comboBox.AddItem(excludeEntry)

  selectAllEntry(comboBox, cell)

  ctx.addReset(function (this: void): undefined {
    selectAllEntry(comboBox, cell)
    setPillText(made.pill, ALL_OPTION_LABEL)
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
  const ops = rangeOps(filter)
  const first = ops[0] ?? DEFAULT_OP
  const cell: RangeCell = { op: first, value: undefined }
  const safe = sanitizeName(filter.id)
  const controller = ctx.controller
  const id = filter.id

  function push(this: void): undefined {
    if (cell.value === undefined) {
      controller.clearFilter(id)
      return undefined
    }
    const value: FilterRangeValue = { value: cell.value, op: cell.op }
    controller.setFilter(id, value)
    return undefined
  }

  const op = opPill(parent, safe, ops, cell, push)
  op.area.SetAnchor(TOPLEFT, parent, TOPLEFT, xOffset, PILL_TOP)
  const { area, edit } = editPill(parent, `$(parent)Range_${safe}`, width, VALUE_PLACEHOLDER)
  area.SetAnchor(TOPLEFT, op.area, TOPRIGHT, PILL_GAP, 0)

  edit.SetHandler("OnTextChanged", function (this: void): undefined {
    cell.value = parseNumber(edit.GetText())
    push()
  })

  ctx.addReset(function (this: void): undefined {
    cell.op = first
    op.show(first)
    edit.SetText("")
  })

  return xOffset + op.area.GetWidth() + PILL_GAP + width + CONTROL_GAP
}

interface RangeCell {
  op: ComparisonOp
  value: number | undefined
}

function opPill(
  parent: Control,
  safe: string,
  ops: readonly ComparisonOp[],
  cell: RangeCell,
  push: (this: void) => undefined
): { area: Control; show: (this: void, op: ComparisonOp) => void } {
  const name = `$(parent)Op_${safe}`
  if (ops.length <= 1) {
    const plain = staticPill(parent, name, OP_LABELS[cell.op])
    return { area: plain.area, show: (op) => setPillText(plain.pill, OP_LABELS[op]) }
  }
  const made = comboPill(parent, name, OP_LABELS[cell.op], true)
  made.comboBox.SetSortsItems(false)
  for (const op of ops) {
    const entry = made.comboBox.CreateItemEntry(OP_LABELS[op], function (this: void): undefined {
      cell.op = op
      setPillText(made.pill, OP_LABELS[op])
      push()
    })
    made.comboBox.AddItem(entry)
  }
  return { area: made.container, show: (op) => setPillText(made.pill, OP_LABELS[op]) }
}

function rangeOps(filter: AnyTemperFilter): readonly ComparisonOp[] {
  const editor = filter.editor
  if (editor.kind === "range" && editor.ops !== undefined && editor.ops.length > 0) {
    return editor.ops
  }
  return [DEFAULT_OP]
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
