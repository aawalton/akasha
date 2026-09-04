import { asEntriesTable, asTableKey } from "../shifter-casts/shifter-casts.module.code.ts"
import {
  fireCallback,
  getShallowClonedTable,
  refreshFilter,
} from "../shifter-helpers/shifter-helpers.module.code.ts"
import { lib } from "../shifter-state/shifter-state.module.code.ts"
import type {
  ShifterBox,
  ShifterBoxList,
  ShifterScrollList,
} from "../shifter-types/shifter-types.module.code.ts"
import { assertKeyIsNotInTable } from "../shifter-validation/shifter-validation.module.code.ts"

function isEntriesThunk(value: unknown): value is (this: void) => unknown {
  return type(value) === "function"
}

export function moveEntryFromTo(
  fromList: ShifterBoxList,
  toList: ShifterBoxList,
  moveKey: unknown,
  shifterBox: ShifterBox
): boolean {
  let retVar = false
  const [key, value, categoryId] = fromList.RemoveEntry(moveKey)
  if (key !== undefined) {
    toList.AddEntry(key, value, categoryId)
    retVar = true
    fireCallback(
      shifterBox,
      undefined,
      lib.EVENT_ENTRY_MOVED,
      key,
      value,
      categoryId,
      toList.isLeftList,
      fromList,
      toList
    )
  }
  return retVar
}

export function selectEntries(list: ShifterBoxList, keys: unknown[]): undefined {
  const listsList = list.list
  const visibleData = listsList.visibleData
  for (const visibleKey of visibleData) {
    const dataEntry = listsList.data[visibleKey - 1]
    if (dataEntry === undefined) continue
    const data = dataEntry.data
    for (const key of keys) {
      if (data.key === key) {
        const control = dataEntry.control
        list.ToggleEntrySelection(data, control, undefined, undefined, false)
        break
      }
    }
  }
}

export function selectEntry(list: ShifterBoxList, key: unknown): undefined {
  selectEntries(list, [key])
}

export function removeEntriesFromList(list: ShifterBoxList, keys: unknown[]): undefined {
  let hasAtLeastOneRemoved = false
  for (const key of keys) {
    const [removedKey] = list.RemoveEntry(key)
    if (removedKey !== undefined) {
      hasAtLeastOneRemoved = true
      const entryRemoved = { key }
      fireCallback(
        list.shifterBox,
        undefined,
        list.isLeftList ? lib.EVENT_LEFT_LIST_ENTRY_REMOVED : lib.EVENT_RIGHT_LIST_ENTRY_REMOVED,
        list,
        entryRemoved
      )
    }
  }
  if (hasAtLeastOneRemoved) {
    refreshFilter(list, true)
  }
}

export function removeEntryFromList(list: ShifterBoxList, key: unknown): undefined {
  removeEntriesFromList(list, [key])
}

export function getEntries(
  list: ShifterBoxList,
  includeHiddenEntries: boolean,
  withCategoryId?: boolean
): LuaTable<AnyNotNil, unknown> {
  let exportList: LuaTable<AnyNotNil, unknown> = new LuaTable()
  const masterList = list.masterList
  if (includeHiddenEntries) {
    if (withCategoryId === true) {
      exportList = asEntriesTable(getShallowClonedTable(masterList))
    } else {
      for (const [key, entry] of pairs(masterList)) {
        exportList.set(key, entry.value)
      }
    }
  } else {
    const categories = list.list.categories
    for (const [key, entry] of pairs(masterList)) {
      const categoryId = entry.categoryId
      const category = categoryId === undefined ? undefined : categories.get(asTableKey(categoryId))
      if (categoryId === undefined || category === undefined || category.hidden === false) {
        if (withCategoryId === true) {
          exportList.set(key, { value: entry.value, categoryId: entry.categoryId })
        } else {
          exportList.set(key, entry.value)
        }
      }
    }
  }
  return exportList
}

export function addEntriesToList(
  list: ShifterBoxList,
  entries: unknown,
  replace: boolean | undefined,
  otherList: ShifterBoxList,
  categoryId?: unknown
): undefined {
  let hasAtLeastOneAdded = false
  let hasAtLeastOneRemoved = false
  const listControl = list.control
  const otherListControl = otherList.control
  if (categoryId !== undefined) {
    ZO_ScrollList_AddCategory(list.list, categoryId)
    ZO_ScrollList_AddCategory(otherList.list, categoryId)
  }
  const entriesList: unknown = isEntriesThunk(entries) ? entries() : entries
  if (entriesList !== undefined && entriesList !== false) {
    for (const [key, value] of pairs(asEntriesTable(entriesList))) {
      if (replace === true) {
        const [removeKey] = list.RemoveEntry(key)
        const [otherRemoveKey] = otherList.RemoveEntry(key)
        if (removeKey !== undefined || otherRemoveKey !== undefined) {
          const listRemovedFrom = removeKey !== undefined ? list : otherList
          hasAtLeastOneRemoved = true
          const entryRemoved = { key, value, categoryId, listRemovedFrom }
          fireCallback(
            list.shifterBox,
            undefined,
            list.isLeftList
              ? lib.EVENT_LEFT_LIST_ENTRY_REMOVED
              : lib.EVENT_RIGHT_LIST_ENTRY_REMOVED,
            list,
            entryRemoved
          )
        }
      } else {
        assertKeyIsNotInTable(key, value, list, listControl)
        assertKeyIsNotInTable(key, value, otherList, otherListControl)
      }
      list.AddEntry(key, value, categoryId)
      const entryAdded = { key, value, categoryId }
      hasAtLeastOneAdded = true
      fireCallback(
        list.shifterBox,
        undefined,
        list.isLeftList ? lib.EVENT_LEFT_LIST_ENTRY_ADDED : lib.EVENT_RIGHT_LIST_ENTRY_ADDED,
        list,
        entryAdded
      )
    }
    if (hasAtLeastOneAdded) {
      refreshFilter(list, false)
      if (hasAtLeastOneRemoved) {
        refreshFilter(otherList, true)
      }
    }
  }
}

export function addEntryToList(
  list: ShifterBoxList,
  key: unknown,
  value: unknown,
  replace: boolean | undefined,
  otherList: ShifterBoxList,
  categoryId?: unknown
): undefined {
  const entries = new LuaTable<AnyNotNil, unknown>()
  entries.set(asTableKey(key), value)
  addEntriesToList(list, entries, replace, otherList, categoryId)
}

export function moveEntriesToOtherList(
  sourceList: ShifterBoxList,
  keys: unknown[],
  destList: ShifterBoxList,
  shifterBox: ShifterBox
): boolean {
  let retVar = true
  for (const key of keys) {
    const retVarLoop = moveEntryFromTo(sourceList, destList, key, shifterBox)
    if (!retVarLoop) {
      retVar = false
    }
  }
  refreshFilter(sourceList, true)
  refreshFilter(destList, false)
  return retVar
}

export function moveEntryToOtherList(
  sourceList: ShifterBoxList,
  key: unknown,
  destList: ShifterBoxList,
  shifterBox: ShifterBox
): boolean {
  return moveEntriesToOtherList(sourceList, [key], destList, shifterBox)
}

export function clearList(list: ShifterBoxList): undefined {
  list.ClearMasterList()
  list.buttonControl.SetState(BSTATE_DISABLED, true)
}

export function hasSameShifterBoxParent(
  aListBox: ShifterBoxList,
  otherListBox: ShifterBoxList
): boolean {
  return aListBox.shifterBox.shifterBoxControl === otherListBox.shifterBox.shifterBoxControl
}

export function getOtherSideShifterBoxListControl(sourceList: ShifterBoxList): ShifterScrollList {
  const shifterBox = sourceList.shifterBox
  const otherListBox = sourceList.isLeftList ? shifterBox.rightList : shifterBox.leftList
  return otherListBox.list
}
