import { FLAG_BROWSER_ITEM } from "akasha/temper/web/item-browser/modules/item-browser-constants/item-browser-constants.module.code.ts"
import {
  getSelectedAccount,
  getSelectedServer,
} from "akasha/temper/web/item-browser/modules/item-browser-multi-account/item-browser-multi-account.module.code.ts"
import { getList } from "akasha/temper/web/item-browser/modules/item-browser-state/item-browser-state.module.code.ts"
import { addTooltipExtension } from "akasha/temper/web/item-browser/modules/item-browser-tooltip-extension/item-browser-tooltip-extension.module.code.ts"
import type { EntryData } from "akasha/temper/web/item-browser/modules/item-browser-types/item-browser-types.module.code.ts"
import "akasha/temper/addon/crafting-addon/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/crafting-addon/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/library-type/lib-extended-journal/lib-extended-journal.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"

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
