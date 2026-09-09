export function removeValue(this: OrderListBox, index?: number, uniqueKey?: number): boolean {
  if (index === undefined && uniqueKey === undefined) {
    return false
  }
  let wasRemoved = false
  const currentEntries = this.GetCurrentEntries()
  if (currentEntries !== undefined) {
    if (index !== undefined) {
      if (currentEntries[index - 1] !== undefined) {
        currentEntries.splice(index - 1, 1)
        wasRemoved = true
      }
    } else {
      if (uniqueKey !== undefined) {
        for (let i = 0; i < currentEntries.length; i += 1) {
          const idx = i + 1
          const entryData = currentEntries[i]
          if (entryData !== undefined && uniqueKey === entryData.uniqueKey) {
            currentEntries.splice(idx - 1, 1)
            wasRemoved = true
            break
          }
        }
      }
    }
    if (wasRemoved) {
      this.control.UpdateValue(false, currentEntries)
      return true
    }
  }
  return false
}

export function removeSelectedEntry(this: OrderListBox): boolean | undefined {
  const selectedIndex = ZO_ScrollList_GetSelectedDataIndex(this.scrollListControl)
  if (selectedIndex === undefined) {
    return undefined
  }
  let selectedEntry: ListEntry | undefined
  const currentEntries = this.GetCurrentEntries()
  if (currentEntries !== undefined) {
    const currentlySelectedEntry = currentEntries[selectedIndex - 1]
    selectedEntry = currentlySelectedEntry
  }

  const orderListBoxData = this.orderListBoxData
  if (typeof orderListBoxData.removeEntryCheckFunction === "function") {
    if (
      orderListBoxData.removeEntryCheckFunction(this, selectedIndex, orderListBoxData) === false
    ) {
      return false
    }
  }

  if (this.RemoveValue(selectedIndex, undefined) === true) {
    if (
      selectedEntry !== undefined &&
      typeof orderListBoxData.removeEntryCallbackFunction === "function"
    ) {
      return orderListBoxData.removeEntryCallbackFunction(this, selectedEntry, orderListBoxData)
    }
  }
  return undefined
}

export function addNewEntry(
  this: OrderListBox,
  newText?: string,
  newValue?: string | number,
  validateFunction?: (this: void, text: string) => boolean
): boolean | undefined {
  if (this.disabled) {
    return undefined
  }
  if (newText === undefined) {
    return undefined
  }
  let validated = true
  if (validateFunction !== undefined) {
    validated = validateFunction(newText)
  }
  if (!validated) {
    return undefined
  }

  const currentEntries = this.GetCurrentEntries()
  if (currentEntries !== undefined) {
    for (const entryData of currentEntries) {
      if (newText === entryData.text) {
        return false
      }
    }

    const newUniqueKey = currentEntries.length + 1
    const resolvedValue = newValue ?? newUniqueKey
    const newEntry: ListEntry = {
      uniqueKey: newUniqueKey,
      text: newText,
      value: resolvedValue,
    }
    currentEntries[newUniqueKey - 1] = newEntry
    this.control.UpdateValue(false, currentEntries)

    const orderListBoxData = this.orderListBoxData
    if (typeof orderListBoxData.addEntryCallbackFunction === "function") {
      return orderListBoxData.addEntryCallbackFunction(this, newEntry, orderListBoxData)
    }
    return true
  }
  return undefined
}

export function addNewEntryFromDialog(
  this: OrderListBox,
  newText?: string,
  validateFunction?: (this: void, text: string) => boolean
): boolean | undefined {
  if (this.disabled) {
    return undefined
  }
  return this.AddNewEntry(newText, undefined, validateFunction)
}

export function showAddNewEntryDialog(this: OrderListBox, dialogName?: string): undefined {
  if (this.disabled) {
    return
  }
  if (this.orderListBoxData.addEntryDialog === undefined) {
    return
  }
  const resolvedDialogName = dialogName ?? this.control.addNewEntryDialogName
  if (resolvedDialogName !== undefined && ZO_Dialogs_IsDialogRegistered(resolvedDialogName)) {
    ZO_Dialogs_ShowPlatformDialog(resolvedDialogName, undefined, undefined)
  }
}

export function showAskBeforeRemoveEntryDialog(this: OrderListBox, dialogName?: string): undefined {
  if (this.disabled) {
    return
  }
  if (this.orderListBoxData.showRemoveEntryButton === undefined) {
    return
  }
  const resolvedDialogName = dialogName ?? this.control.askBeforeRemoveEntryDialogName
  if (resolvedDialogName !== undefined && ZO_Dialogs_IsDialogRegistered(resolvedDialogName)) {
    ZO_Dialogs_ShowPlatformDialog(resolvedDialogName, undefined, undefined)
  }
}
