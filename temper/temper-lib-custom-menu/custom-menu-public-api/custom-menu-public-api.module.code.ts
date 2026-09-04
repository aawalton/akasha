import type { GlobalTable } from "../custom-menu-casts/custom-menu-casts.module.code.ts"
import { asVoidSelfFn, asZoColorDef } from "../custom-menu-casts/custom-menu-casts.module.code.ts"
import {
  MENU_ADD_OPTION_HEADER,
  SUBMENU_ITEM_MOUSE_CLICKED,
  SUBMENU_ITEM_MOUSE_ENTER,
  SUBMENU_ITEM_MOUSE_EXIT,
} from "../custom-menu-constants/custom-menu-constants.module.code.ts"
import { LIB } from "../custom-menu-lib/custom-menu-lib.module.code.ts"
import type {
  LcmSubmenuParent,
  MenuEntry,
  TooltipValue,
  Valued,
} from "../custom-menu-types/custom-menu-types.module.code.ts"
import { menu } from "../eso-menu/eso-menu.module.code.ts"
import { getValueOrCallback, noop } from "../menu-row-setup/menu-row-setup.module.code.ts"

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

  const isDivider = itemType !== MENU_ADD_OPTION_HEADER && mytext === LIB.DIVIDER
  menu.itemPool = isDivider ? LIB.dividerPool : LIB.itemPool
  menu.checkBoxPool = LIB.checkBoxPool

  let text = mytext
  let resolvedType = itemType
  let resolvedFont = myFont
  let resolvedNormalColor = normalColor
  let resolvedYPad = itemYPad
  if (itemType === MENU_ADD_OPTION_CHECKBOX) {
    text = ` |u16:0::|u${mytext}`
    resolvedYPad = (itemYPad ?? 0) + 2
  } else if (itemType === MENU_ADD_OPTION_HEADER) {
    resolvedFont = myFont ?? LIB.headerFont
    resolvedNormalColor = normalColor ?? ZO_WHITE
    menu.itemPool = LIB.headerPool
    resolvedType = MENU_ADD_OPTION_LABEL
  }

  const index = LIB.AddMenuItem(
    text,
    myfunction ?? noop,
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
    const submenu = LIB.submenu
    if (submenu === undefined) {
      return
    }
    if (state === SUBMENU_ITEM_MOUSE_ENTER) {
      submenu.Clear()
      const normColor = normalColor === undefined ? undefined : asZoColorDef(normalColor)
      const hiColor = highlightColor === undefined ? undefined : asZoColorDef(highlightColor)
      const currentEntries = getValueOrCallback(entries, menu, this)
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

  menu.itemPool = LIB.submenuPool
  menu.checkBoxPool = LIB.checkBoxPool

  const onSelect = asVoidSelfFn(createSubMenu)
  const index = LIB.AddSubMenuItem(
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

const published = globalThis as GlobalTable
published["AddCustomMenuItem"] = addCustomMenuItem
published["AddCustomMenuTooltip"] = addCustomMenuTooltip
published["AddCustomSubMenuItem"] = addCustomSubMenuItem
published["MENU_ADD_OPTION_HEADER"] = MENU_ADD_OPTION_HEADER
published["LibCustomMenu"] = LIB
