import {
  asControl,
  asEsoHandler,
  asLamComboBox,
  asLamControl,
  asLamFactory,
  asSortKeyTable,
  asUnknownArray,
  asUpdateChoicesFn,
  asZoComboBoxItem,
  asZoComboBoxRow,
} from "../addon-menu-casts/addon-menu-casts.module.code.ts"
import { WIDGET_VERSION } from "../addon-menu-constants/addon-menu-constants.module.code.ts"
import { LAMCC, registerWidget, wm } from "../addon-menu-state/addon-menu-state.module.code.ts"
import type {
  DropdownData,
  LamControl,
  Valued,
} from "../addon-menu-types/addon-menu-types.module.code.ts"
import {
  createLabelAndContainerControl,
  getDefaultValue,
  getStringFromValue,
  registerForRefreshIfNeeded,
  registerForReloadIfNeeded,
  requestRefreshIfNeeded,
  updateWarning,
} from "../addon-menu-util/addon-menu-util.module.code.ts"
import { setDropdownHeight } from "../addon-menu-widget-dropdown-scroll/addon-menu-widget-dropdown-scroll.module.code.ts"

const SORT_BY_VALUE: Record<string, unknown> = { value: {} }
const SORT_BY_VALUE_NUMERIC: Record<string, unknown> = { value: { isNumeric: true } }
const SORT_TYPES: Record<string, Record<string, unknown>> = {
  name: ZO_SORT_BY_NAME,
  numeric: ZO_SORT_BY_NAME_NUMERIC,
  value: SORT_BY_VALUE,
  numericvalue: SORT_BY_VALUE_NUMERIC,
}
const SORT_ORDERS: Record<string, boolean> = {
  up: ZO_SORT_ORDER_UP,
  down: ZO_SORT_ORDER_DOWN,
}

function getDropdown(this: void, control: LamControl): LamComboBox {
  const dropdown = control.dropdown
  if (dropdown === undefined) {
    assert(false, "[LAM2]Dropdown - missing combobox object")[0]
  }
  return asLamComboBox(dropdown)
}

function updateDisabled(this: LamControl): undefined {
  const data = this.data
  let disable: boolean | undefined
  if (typeof data.disabled === "function") {
    disable = data.disabled()
  } else {
    disable = data.disabled
  }

  getDropdown(this).SetEnabled(disable !== true)
  const label = this.label
  if (label !== undefined) {
    if (disable === true) {
      const [r, g, b, a] = ZO_DEFAULT_DISABLED_COLOR.UnpackRGBA()
      label.SetColor(r, g, b, a)
    } else {
      const [r, g, b, a] = ZO_DEFAULT_ENABLED_COLOR.UnpackRGBA()
      label.SetColor(r, g, b, a)
    }
  }
}

function updateMultiSelectSelected(
  this: void,
  control: LamControl,
  data: DropdownData,
  values: unknown[]
): undefined {
  assert(
    values !== undefined,
    string.format("[LAM2]Dropdown - Values for multiSelect %q are missing", control.GetName())
  )[0]

  const dropdown = getDropdown(control)
  dropdown.m_selectedItemData = []
  dropdown.m_multiSelectItemData = []

  const usesChoicesValues = data.choicesValues !== undefined

  for (const toCompare of values) {
    dropdown.SetSelectedItemByEval((entry: ZoComboBoxItem) => {
      if (usesChoicesValues) {
        return entry.value === toCompare
      }
      return entry.name === toCompare
    }, true)
  }
  dropdown.RefreshSelectedItemText()
}

function callMultiSelectSetFunc(
  this: void,
  control: LamControl,
  data: DropdownData,
  values: unknown[] | undefined
): undefined {
  let resolved = values
  if (resolved === undefined) {
    resolved = []
    const usesChoicesValues = data.choicesValues !== undefined
    const selected = getDropdown(control).GetSelectedItemData()
    const selectedList =
      selected === undefined ? [] : Array.isArray(selected) ? selected : [selected]
    for (const entry of selectedList) {
      if (usesChoicesValues) {
        resolved[resolved.length] = entry.value
      } else {
        resolved[resolved.length] = entry.name
      }
    }
  }
  data.setFunc(resolved)
}

function dropdownCallback(this: void, ...args: unknown[]): undefined {
  const choiceText = args[1]
  const choice = asZoComboBoxItem(args[2])
  let updateValue = choice.value
  if (updateValue === undefined) {
    updateValue = choiceText
  }
  const choiceControl = asLamControl(choice.control)
  const updateFn = choiceControl.UpdateValue
  if (updateFn !== undefined) {
    updateFn.call(choiceControl, false, updateValue)
  }
}

function doShowTooltip(
  this: void,
  control: Control,
  tooltip: Valued<string | number> | undefined
): undefined {
  if (tooltip === undefined) {
    return
  }
  const tooltipText = getStringFromValue(tooltip)
  if (tooltipText !== "") {
    InitializeTooltip(InformationTooltip, control, TOPLEFT, 0, 0, BOTTOMRIGHT)
    SetTooltipText(InformationTooltip, tostring(tooltipText))
    InformationTooltipTopLevel.BringWindowToTop()
  }
}

function showTooltip(this: void, control: ZoComboBoxRow): undefined {
  doShowTooltip(control, control.dataEntry?.data?.tooltip)
}

function hideTooltip(this: void): undefined {
  ClearTooltip(InformationTooltip)
}

function setupTooltips(this: void, comboBox: ZoComboBox): undefined {
  SecurePostHook(
    asControl(ZO_ComboBoxDropdown_Keyboard),
    "OnEntryMouseEnter",
    (...args: never[]) => {
      const comboBoxRowCtrl = asZoComboBoxRow(args[0])
      const lComboBox = comboBoxRowCtrl.m_owner
      if (lComboBox !== undefined && lComboBox === comboBox) {
        showTooltip(comboBoxRowCtrl)
      }
    }
  )

  SecurePostHook(asControl(ZO_ComboBoxDropdown_Keyboard), "OnEntryMouseExit", () => {
    hideTooltip()
  })
}

function setSelectedFromChoices(
  this: void,
  control: LamControl,
  dropdown: LamComboBox,
  value: unknown
): undefined {
  const choicesTable = control.choices
  let selected: unknown
  if (choicesTable !== undefined && (typeof value === "string" || typeof value === "number")) {
    selected = choicesTable[value]
  } else {
    selected = undefined
  }
  if (selected === undefined || typeof selected === "string" || typeof selected === "number") {
    dropdown.SetSelectedItem(selected)
  }
}

function onMultiSelectComboBoxMouseUp(
  this: void,
  control: LamControl,
  data: DropdownData,
  ...args: unknown[]
): undefined {
  const combobox = asControl(args[0])
  const button = args[1]
  const upInside = args[2]
  if (button === MOUSE_BUTTON_INDEX_RIGHT && upInside === true) {
    ClearMenu()
    const lDropdown = asLamComboBox(ZO_ComboBox_ObjectFromContainer(combobox))

    AddMenuItem(GetString(SI_ITEMFILTERTYPE0), () => {
      lDropdown.m_multiSelectItemData = []
      const maxSelections = lDropdown.m_maxNumSelections
      const sortedItems = lDropdown.m_sortedItems
      for (let index = 0; index < sortedItems.length; index++) {
        const luaIndex = index + 1
        if (maxSelections === undefined || maxSelections === 0 || maxSelections >= luaIndex) {
          lDropdown.SetSelected(luaIndex, true)
        }
      }
      lDropdown.RefreshSelectedItemText()
      callMultiSelectSetFunc(control, data, undefined)
    })
    AddMenuItem(GetString(SI_KEEPRESOURCETYPE0), () => {
      lDropdown.ClearAllSelections()
      callMultiSelectSetFunc(control, data, undefined)
    })
    ShowMenu(combobox)
  }
}

function grabSortingInfo(this: void, sortInfo: string): string[] {
  const t: string[] = []
  let i = 0
  for (const [info] of string.gmatch(sortInfo, "([^%-]+)")) {
    if (info !== undefined) {
      t[i] = info
    }
    i = i + 1
  }
  return t
}

function updateChoices(
  this: void,
  control: LamControl,
  dropdownData: DropdownData,
  choices?: string[],
  choicesValues?: unknown[],
  choicesTooltips?: Valued<string | number>[]
): undefined {
  const dropdown = getDropdown(control)
  dropdown.ClearItems()
  const choicesTable = control.choices
  if (choicesTable !== undefined) {
    ZO_ClearTable(choicesTable)
  }

  const resolvedChoices = choices ?? dropdownData.choices
  const resolvedValues = choicesValues ?? dropdownData.choicesValues
  const resolvedTooltips = choicesTooltips ?? dropdownData.choicesTooltips

  if (resolvedValues) {
    assert(
      resolvedChoices.length === resolvedValues.length,
      "choices and choicesValues need to have the same size"
    )[0]
  }

  if (resolvedTooltips) {
    assert(
      resolvedChoices.length === resolvedTooltips.length,
      "choices and choicesTooltips need to have the same size"
    )[0]
    setupTooltips(dropdown)
  }

  for (let i = 0; i < resolvedChoices.length; i++) {
    const choice = resolvedChoices[i]
    if (choice === undefined) {
      continue
    }
    const entry = dropdown.CreateItemEntry(choice, asEsoHandler(dropdownCallback))
    entry.control = control
    if (resolvedValues) {
      entry.value = resolvedValues[i]
    }
    if (resolvedTooltips) {
      entry.tooltip = resolvedTooltips[i]
    }
    let entryValue = entry.value
    if (entryValue === undefined) {
      entryValue = entry.name
    }
    if (
      choicesTable !== undefined &&
      (typeof entryValue === "string" || typeof entryValue === "number")
    ) {
      choicesTable[entryValue] = entry.name
    }

    dropdown.AddItem(
      entry,
      dropdownData.sort !== undefined ? undefined : ZO_COMBOBOX_SUPRESS_UPDATE
    )
  }
}

function createDropdown(
  this: void,
  parent: LamControl,
  dropdownData: DropdownData,
  controlName?: string
): LamControl {
  const control = createLabelAndContainerControl(parent, dropdownData, controlName)
  control.choices = {}

  let countControl: { comboboxCount?: number } = parent
  let name = parent.GetName()
  if (name === "") {
    countControl = LAMCC
    name = "LAM"
  }
  const comboboxCount = (countControl.comboboxCount ?? 0) + 1
  countControl.comboboxCount = comboboxCount
  const container = control.container
  const combobox = wm.CreateControlFromVirtual(
    zo_strjoin("", name, "Combobox", comboboxCount),
    container,
    "ZO_ComboBox"
  )
  control.combobox = combobox

  combobox.SetAnchor(TOPLEFT)
  if (container !== undefined) {
    const [cw, ch] = container.GetDimensions()
    combobox.SetDimensions(cw, ch)
  }
  combobox.SetHandler("OnMouseEnter", () => {
    ZO_Options_OnMouseEnter(asControl(control))
  })
  combobox.SetHandler("OnMouseExit", () => {
    ZO_Options_OnMouseExit(asControl(control))
  })
  const dropdown = asLamComboBox(ZO_ComboBox_ObjectFromContainer(combobox))
  control.dropdown = dropdown
  dropdown.SetSortsItems(false)
  dropdown.m_containerWidth = combobox.GetWidth()

  const isMultiSelectionEnabled = getDefaultValue<boolean | undefined>(dropdownData.multiSelect)
  control.isMultiSelectionEnabled = isMultiSelectionEnabled

  if (isMultiSelectionEnabled === true) {
    combobox.SetHandler(
      "OnMouseUp",
      (...mouseArgs: unknown[]) => {
        onMultiSelectComboBoxMouseUp(control, dropdownData, ...mouseArgs)
      },
      "LAM2DropdownWidgetOnMouseUp"
    )

    const multiSelectionTextFormatter =
      getDefaultValue<string | number | undefined>(dropdownData.multiSelectTextFormatter) ??
      GetString(SI_COMBO_BOX_DEFAULT_MULTISELECTION_TEXT_FORMATTER)
    const multiSelectionNoSelectionText =
      getDefaultValue<string | number | undefined>(dropdownData.multiSelectNoSelectionText) ??
      GetString(SI_COMBO_BOX_DEFAULT_NO_SELECTION_TEXT)
    dropdown.EnableMultiSelect(multiSelectionTextFormatter, multiSelectionNoSelectionText)

    const maxSelections = getDefaultValue<number | undefined>(dropdownData.multiSelectMaxSelections)
    if (typeof maxSelections === "number") {
      dropdown.SetMaxSelections(maxSelections)
    }
  } else {
    dropdown.DisableMultiSelect()
  }

  ZO_PreHook(dropdown, "UpdateItems", (...phArgs: unknown[]) => {
    const self = asLamComboBox(phArgs[0])
    assert(
      self.m_sortsItems !== true,
      "built-in dropdown sorting was reactivated, sorting is handled by LAM"
    )[0]
    const sortType = control.m_sortType
    const sortOrder = control.m_sortOrder
    if (sortOrder !== undefined && sortType !== undefined && typeof sortType === "object") {
      const sortKeys = asSortKeyTable(sortType)
      const [sortKey] = next(sortKeys)
      const sortFunc = (item1: unknown, item2: unknown): boolean =>
        ZO_TableOrderingFunction(item1, item2, tostring(sortKey), sortKeys, sortOrder === true)
      table.sort(self.m_sortedItems, sortFunc)
    }
    return undefined
  })

  if (dropdownData.sort !== undefined) {
    const sortInfo = grabSortingInfo(dropdownData.sort)
    control.m_sortType = SORT_TYPES[sortInfo[0] ?? ""]
    control.m_sortOrder = SORT_ORDERS[sortInfo[1] ?? ""]
  } else if (dropdownData.choicesValues) {
    control.m_sortType = SORT_BY_VALUE
    control.m_sortOrder = ZO_SORT_ORDER_UP
  }

  if (dropdownData.warning !== undefined || dropdownData.requiresReload === true) {
    const warning = wm.CreateControlFromVirtual<TextureControl>(
      "",
      control,
      "ZO_Options_WarningIcon"
    )
    control.warning = warning
    warning.SetAnchor(RIGHT, combobox, LEFT, -5, 0)
    control.UpdateWarning = function (this: LamControl): undefined {
      updateWarning(this)
    }
    control.UpdateWarning.call(control)
  }

  control.SetDropdownHeight = setDropdownHeight
  control.AdjustDimensions = (): undefined => {}
  control.UpdateChoices = asUpdateChoicesFn(function (
    this: LamControl,
    choices?: string[],
    choicesValues?: unknown[],
    choicesTooltips?: Valued<string | number>[]
  ): undefined {
    updateChoices(this, dropdownData, choices, choicesValues, choicesTooltips)
  })
  control.UpdateChoices.call(control, dropdownData.choices, dropdownData.choicesValues)
  control.UpdateValue = function (
    this: LamControl,
    forceDefault?: boolean,
    value?: unknown
  ): undefined {
    updateValue(this, dropdownData, forceDefault, value)
  }
  control.UpdateValue.call(control)
  if (dropdownData.disabled !== undefined) {
    control.UpdateDisabled = updateDisabled
    control.UpdateDisabled.call(control)
  }

  registerForRefreshIfNeeded(control)
  registerForReloadIfNeeded(control)

  return control
}

function updateValue(
  this: void,
  control: LamControl,
  data: DropdownData,
  forceDefault?: boolean,
  value?: unknown
): undefined {
  const dropdown = getDropdown(control)
  const isMultiSelectionEnabled = control.isMultiSelectionEnabled === true
  if (forceDefault === true) {
    const defaultValue = getDefaultValue<unknown>(data.default)
    if (isMultiSelectionEnabled) {
      const tableValue = asUnknownArray(defaultValue ?? [])
      data.setFunc(tableValue)
      updateMultiSelectSelected(control, data, tableValue)
    } else {
      data.setFunc(defaultValue)
      setSelectedFromChoices(control, dropdown, defaultValue)
    }
  } else if (value !== undefined) {
    if (isMultiSelectionEnabled) {
      const tableValue = Array.isArray(value) ? value : undefined
      callMultiSelectSetFunc(control, data, tableValue)
    } else {
      data.setFunc(value)
    }
    requestRefreshIfNeeded(control)
  } else if (isMultiSelectionEnabled) {
    const values = asUnknownArray(data.getFunc() ?? [])
    updateMultiSelectSelected(control, data, values)
  } else {
    const got = data.getFunc()
    setSelectedFromChoices(control, dropdown, got)
  }
}

if (registerWidget("dropdown", WIDGET_VERSION.dropdown)) {
  LAMCC.dropdown = asLamFactory(createDropdown)
}
