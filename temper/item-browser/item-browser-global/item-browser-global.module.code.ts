import { FLAG_BROWSER_ITEM } from "../item-browser-constants/item-browser-constants.module.code.ts"
import {
  getSelectedAccount,
  getSelectedServer,
} from "../item-browser-multi-account/item-browser-multi-account.module.code.ts"
import { getList } from "../item-browser-state/item-browser-state.module.code.ts"
import { addTooltipExtension } from "../item-browser-tooltip-extension/item-browser-tooltip-extension.module.code.ts"
import type { EntryData } from "../item-browser-types/item-browser-types.module.code.ts"

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

globalThis.ItemBrowserListRow_OnMouseEnter = rowOnMouseEnter
globalThis.ItemBrowserListRow_OnMouseExit = rowOnMouseExit
globalThis.ItemBrowserListRow_OnMouseUp = rowOnMouseUp
