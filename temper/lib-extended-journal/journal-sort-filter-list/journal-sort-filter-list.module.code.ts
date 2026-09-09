import {
  asCallback,
  asNumber,
  asRecord,
  asString,
} from "../journal-casts/journal-casts.module.code.ts"
import { Internal, Public } from "../journal-state/journal-state.module.code.ts"

interface LejList extends ZoSortFilterList {
  frame: Control
  contextMenuItems?: readonly ContextMenuEntry[]
  RefreshVisible: (this: LejList) => void
  ShowMenu: (this: LejList, control: Control) => void
  Setup: (this: LejList, ...args: unknown[]) => void
  ProcessItemEntry: (
    this: LejList,
    stringSearch: ZoStringSearch,
    data: object,
    searchTerm: string,
    ...args: unknown[]
  ) => boolean
  UpdateState: (this: LejList) => void
  InitializeSearch: (this: LejList, typeId: number) => ZoStringSearch
  InitializeComboBox: (
    this: LejList,
    object: ZoComboBox,
    items: ComboItems,
    initialIndex: number,
    allowInitialCallback?: boolean,
    callback?: (this: void, ...args: unknown[]) => void
  ) => void
}

type ContextMenuEntry = (this: void, data: unknown) => LuaMultiReturn<[unknown, unknown]>

interface ComboItems {
  list?: readonly unknown[]
  key?: string
  dataKey?: string
  prefix?: string
  max?: number
}

const nop = (): undefined => {}

const DEFAULT_ACTION_BUTTON: {
  keybind: string
  alignment: number
  name?: string
  callback?: (this: void) => void
} = {
  keybind: "UI_SHORTCUT_PRIMARY",
  alignment: KEYBIND_STRIP_ALIGN_RIGHT,
}

Internal.CleanupDefaultActionButton = (): undefined => {
  KEYBIND_STRIP.RemoveKeybindButton(DEFAULT_ACTION_BUTTON)
}

export const ExtendedJournalSortFilterList: ZoSortFilterListSubclass = ZO_SortFilterList.Subclass()

ExtendedJournalSortFilterList.New = function (
  this: ZoSortFilterListSubclass,
  control: Control,
  contextMenuItems?: readonly ContextMenuEntry[],
  ...args: unknown[]
): LejList {
  const list = ZO_SortFilterList.New<LejList>(this, control)
  list.frame = control
  list.contextMenuItems = contextMenuItems
  list.Setup(...args)
  if (Internal.altModeList !== undefined) {
    const listControl = control.GetNamedChild<Control>("List")
    if (listControl !== undefined) {
      Internal.altModeList(listControl)
    }
  }
  return list
}

ExtendedJournalSortFilterList.SortScrollList = function (this: LejList): undefined {
  if (this.currentSortKey !== undefined && this.currentSortOrder !== undefined) {
    const dataList = ZO_ScrollList_GetDataList<never>(this.list)
    if (dataList !== undefined && this.sortFunction !== undefined) {
      table.sort(dataList, this.sortFunction)
    }
  }
  this.RefreshVisible()
}

ExtendedJournalSortFilterList.Row_OnMouseEnter = function (
  this: LejList,
  control: Control
): undefined {
  ZO_SortFilterList.Row_OnMouseEnter(this, control)
  Internal.CleanupDefaultActionButton()

  const menuItems = this.contextMenuItems
  const first = menuItems?.[0]
  if (menuItems !== undefined && menuItems.length >= 1 && first !== undefined) {
    const [label, action] = first(ZO_ScrollList_GetData(control))
    if (type(action) === "function") {
      DEFAULT_ACTION_BUTTON.name = GetString(asNumber(label))
      DEFAULT_ACTION_BUTTON.callback = asCallback(action)
      KEYBIND_STRIP.AddKeybindButton(DEFAULT_ACTION_BUTTON)
    }
  }
}

ExtendedJournalSortFilterList.Row_OnMouseExit = function (
  this: LejList,
  control: Control
): undefined {
  ZO_SortFilterList.Row_OnMouseExit(this, control)
  Internal.CleanupDefaultActionButton()
}

ExtendedJournalSortFilterList.Row_OnMouseUp = function (
  this: LejList,
  control: Control,
  button: number,
  upInside: boolean
): undefined {
  const menuItems = this.contextMenuItems
  if (menuItems !== undefined && menuItems.length >= 1 && upInside) {
    const data = ZO_ScrollList_GetData(control)
    if (button === MOUSE_BUTTON_INDEX_LEFT) {
      const first = menuItems[0]
      if (first !== undefined) {
        const [, action] = first(data)
        if (type(action) === "function") {
          asCallback(action)()
        }
      }
    } else if (button === MOUSE_BUTTON_INDEX_RIGHT) {
      ClearMenu()
      for (const func of menuItems) {
        const [label, action] = func(data)
        if (label !== undefined && type(action) === "function") {
          const labelArg = type(label) === "number" ? asNumber(label) : asString(label)
          AddMenuItem(Internal.GetString(labelArg), asCallback(action))
        } else if (type(action) === "number" || type(action) === "string") {
          AddMenuItem(
            string.format(type(action) === "number" ? "%s: %d" : "%s: %s", label, action),
            nop,
            undefined,
            undefined,
            ZO_DISABLED_TEXT,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            false
          )
        }
      }
      this.ShowMenu(control)
    }
  }
}

ExtendedJournalSortFilterList.InitializeSearch = function (
  this: LejList,
  typeId: number
): ZoStringSearch {
  const search = ZO_StringSearch.New()

  search.AddProcessor(
    typeId,
    (
      stringSearch: ZoStringSearch,
      data: object,
      searchTerm: string,
      ...args: unknown[]
    ): boolean => {
      let invert = false
      let term = searchTerm

      if (zo_strlen(term) > 1 && string.sub(term, 1, 1) === "-") {
        term = string.sub(term, 2)
        invert = true
      }

      let result = this.ProcessItemEntry(stringSearch, data, term, ...args)
      if (invert) {
        result = !result
      }
      return result
    }
  )

  return search
}

ExtendedJournalSortFilterList.UpdateState = function (this: LejList): undefined {
  this.RefreshFilters()
}

function addEntry(
  this: void,
  object: ZoComboBox,
  label: string,
  id: number,
  data: unknown,
  callback: (this: void, ...args: unknown[]) => void
): undefined {
  const entry = ZO_ComboBox.CreateItemEntry(label, callback)
  const entryRecord = asRecord(entry)
  entryRecord.id = id
  entryRecord.data = data
  object.AddItem(entry, ZO_COMBOBOX_SUPPRESS_UPDATE)
}

function updateWidth(this: void, object: ZoComboBox): undefined {
  if (object.m_container !== undefined && object.m_containerWidth !== undefined) {
    const container = object.m_container
    zo_callLater(() => {
      object.m_containerWidth = container.GetWidth()
    }, 50)
  }
}

ExtendedJournalSortFilterList.InitializeComboBox = function (
  this: LejList,
  object: ZoComboBox,
  items: ComboItems,
  initialIndex: number,
  allowInitialCallback?: boolean,
  callback?: (this: void, ...args: unknown[]) => void
): undefined {
  if (object.SetHeight !== undefined) {
    object.SetHeight(610)
  }
  object.SetSortsItems(false)
  object.ClearItems()

  const callbackWrapper = (...args: unknown[]): undefined => {
    updateWidth(object)
    if (callback !== undefined) {
      callback(...args)
    } else {
      this.UpdateState()
    }
  }

  if (items.list !== undefined) {
    const list = items.list
    const key = items.key
    const dataKey = items.dataKey
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      const label = key !== undefined ? asRecord(item)[key] : item
      const data = dataKey !== undefined ? asRecord(item)[dataKey] : undefined
      addEntry(object, asString(label), i + 1, data, callbackWrapper)
    }
  } else if (items.prefix !== undefined && items.max !== undefined) {
    const prefix = items.prefix
    for (let i = 1; i <= items.max; i++) {
      addEntry(object, GetString(prefix, i), i, undefined, callbackWrapper)
    }
  }

  Public.SelectComboBoxItemByIndex(object, initialIndex, allowInitialCallback !== true)

  if (allowInitialCallback !== true) {
    updateWidth(object)
  }
}
