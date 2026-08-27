import { asVoidSelfFn, asZoColorDef } from "./casts"
import {
  MENU_ADD_OPTION_HEADER,
  SUBMENU_ITEM_MOUSE_CLICKED,
  SUBMENU_ITEM_MOUSE_ENTER,
  SUBMENU_ITEM_MOUSE_EXIT,
} from "./constants"
import { menu } from "./eso-menu"
import { lib } from "./lib-state"
import type { LcmSubmenuParent, Lib, MenuEntry, TooltipValue, Valued } from "./types"
import { GetValueOrCallback, Noop } from "./util"

function addCustomMenuItem(
  this: void,
  mytext: string,
  myfunction?: ((this: void) => void) | undefined,
  itemType?: number,
  myFont?: string,
  normalColor?: unknown,
  highlightColor?: unknown,
  itemYPad?: number,
  ...rest: unknown[]
): number {
  const orgItemPool = menu.itemPool
  const orgCheckboxItemPool = menu.checkBoxPool

  const isDivider = itemType !== MENU_ADD_OPTION_HEADER && mytext === lib.DIVIDER
  menu.itemPool = isDivider ? lib.dividerPool : lib.itemPool
  menu.checkBoxPool = lib.checkBoxPool

  let text = mytext
  let resolvedType = itemType
  let resolvedFont = myFont
  let resolvedNormalColor = normalColor
  let resolvedYPad = itemYPad
  if (itemType === MENU_ADD_OPTION_CHECKBOX) {
    text = ` |u16:0::|u${mytext}`
    resolvedYPad = (itemYPad ?? 0) + 2
  } else if (itemType === MENU_ADD_OPTION_HEADER) {
    resolvedFont = myFont ?? lib.headerFont
    resolvedNormalColor = normalColor ?? ZO_WHITE
    menu.itemPool = lib.headerPool
    resolvedType = MENU_ADD_OPTION_LABEL
  }

  const index = lib.AddMenuItem(
    text,
    myfunction ?? Noop,
    resolvedType,
    resolvedFont,
    resolvedNormalColor,
    highlightColor,
    resolvedYPad,
    ...rest
  )

  menu.itemPool = orgItemPool
  menu.checkBoxPool = orgCheckboxItemPool
  return index
}

function addCustomMenuTooltip(this: void, tooltip: TooltipValue, index?: number): undefined {
  const idx = index ?? menu.items.length
  if (!(idx > 0 && idx <= menu.items.length)) {
    error("no menu item")
  }
  const entry = menu.items[idx - 1]
  if (entry !== undefined) {
    entry.item.tooltip = tooltip
  }
}

function addCustomSubMenuItem(
  this: void,
  mytext: string,
  entries: Valued<readonly MenuEntry[]>,
  myfont?: string,
  normalColor?: unknown,
  highlightColor?: unknown,
  itemYPad?: number,
  callback?: (this: void, control: LcmSubmenuParent) => void
): number {
  function createSubMenu(this: LcmSubmenuParent, state: number): undefined {
    const submenu = lib.submenu
    if (submenu === undefined) {
      return
    }
    if (state === SUBMENU_ITEM_MOUSE_ENTER) {
      submenu.Clear()
      const normColor = normalColor === undefined ? undefined : asZoColorDef(normalColor)
      const hiColor = highlightColor === undefined ? undefined : asZoColorDef(highlightColor)
      const currentEntries = GetValueOrCallback(entries, menu, this)
      for (let i = 0; i < currentEntries.length; i++) {
        const entry = currentEntries[i]
        if (entry !== undefined) {
          submenu.AddItem(entry, myfont, normColor, hiColor, itemYPad)
        }
      }
      submenu.Show(this)
    } else if (state === SUBMENU_ITEM_MOUSE_EXIT) {
      submenu.Clear()
    } else if (state === SUBMENU_ITEM_MOUSE_CLICKED) {
      if (callback !== undefined && type(callback) === "function") {
        submenu.Clear()
        ClearMenu()
        callback(this)
      }
    }
  }

  const orgItemPool = menu.itemPool
  const orgCheckboxItemPool = menu.checkBoxPool

  menu.itemPool = lib.submenuPool
  menu.checkBoxPool = lib.checkBoxPool

  const onSelect = asVoidSelfFn(createSubMenu)
  const index = lib.AddSubMenuItem(
    mytext,
    onSelect,
    MENU_ADD_OPTION_LABEL,
    myfont,
    normalColor,
    highlightColor,
    itemYPad
  )

  menu.itemPool = orgItemPool
  menu.checkBoxPool = orgCheckboxItemPool
  return index
}

declare global {
  var AddCustomMenuTooltip: typeof addCustomMenuTooltip
  var AddCustomSubMenuItem: typeof addCustomSubMenuItem
  var LibCustomMenu: Lib
}

globalThis.AddCustomMenuItem = addCustomMenuItem
globalThis.AddCustomMenuTooltip = addCustomMenuTooltip
globalThis.AddCustomSubMenuItem = addCustomSubMenuItem
globalThis.MENU_ADD_OPTION_HEADER = MENU_ADD_OPTION_HEADER
globalThis.LibCustomMenu = lib
