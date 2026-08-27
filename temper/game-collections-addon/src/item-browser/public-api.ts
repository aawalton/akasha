import { FLAG_BROWSER_ITEM } from "./constants"
import { getSelectedAccount, getSelectedServer } from "./core/multi-account"
import { getList } from "./core/state"
import type { EntryData } from "./core/types"
import { addTooltipExtension } from "./tooltip/extension"

let currentTooltip: TooltipControl | undefined

function rowOnMouseEnter(this: void, control: Control): undefined {
  const data = ZO_ScrollList_GetData<EntryData>(control)
  getList()?.Row_OnMouseEnter(control)

  const itemLink = data.itemLink
  const tooltip = LibExtendedJournal.ItemTooltip(itemLink)
  currentTooltip = tooltip
  addTooltipExtension(
    tooltip,
    itemLink,
    getSelectedAccount(),
    FLAG_BROWSER_ITEM,
    undefined,
    getSelectedServer()
  )
  return undefined
}

function rowOnMouseExit(this: void, control: Control): undefined {
  getList()?.Row_OnMouseExit(control)
  if (currentTooltip !== undefined) {
    ClearTooltip(currentTooltip)
  }
  return undefined
}

function rowOnMouseUp(this: void, ...args: unknown[]): undefined {
  getList()?.Row_OnMouseUp(...args)
  return undefined
}

declare global {
  var ItemBrowserListRow_OnMouseEnter: ((this: void, control: Control) => void) | undefined
  var ItemBrowserListRow_OnMouseExit: ((this: void, control: Control) => void) | undefined
  var ItemBrowserListRow_OnMouseUp: ((this: void, ...args: unknown[]) => void) | undefined
}

globalThis.ItemBrowserListRow_OnMouseEnter = rowOnMouseEnter
globalThis.ItemBrowserListRow_OnMouseExit = rowOnMouseExit
globalThis.ItemBrowserListRow_OnMouseUp = rowOnMouseUp
