import {
  CATEGORY_EARLY,
  CATEGORY_LATE,
  CATEGORY_PRIMARY,
  CATEGORY_QUATERNARY,
  CATEGORY_SECONDARY,
  CATEGORY_TERTIARY,
  DIVIDER,
  HEADER_FONT,
  MENU_ADD_OPTION_HEADER,
} from "./constants"
import { menu } from "./eso-menu"
import {
  CheckBoxFactory,
  DividerFactory,
  HeaderFactory,
  MenuItemFactory,
  ResetCheckBox,
  ResetMenuItem,
} from "./menu-factories"
import { SubMenuItemFactory } from "./submenu/submenu-item"
import type { Lib } from "./types"

function addMenuItem(
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
  const isDivider = itemType !== MENU_ADD_OPTION_HEADER && mytext === lib.DIVIDER
  const index = AddMenuItem(
    mytext,
    myfunction,
    itemType,
    myFont,
    normalColor,
    highlightColor,
    itemYPad,
    ...rest
  )
  const lastAdded = menu.items[index - 1]
  if (lastAdded !== undefined) {
    if (itemType === MENU_ADD_OPTION_CHECKBOX && lastAdded.checkbox !== undefined) {
      lastAdded.item.SetAnchor(TOPLEFT, lastAdded.checkbox, TOPLEFT, 0, -4)
    }
    lastAdded.isDivider = isDivider
  }
  return index
}

function addSubMenuItem(
  this: void,
  mytext: string,
  myfunction?: ((this: void) => void) | undefined,
  itemType?: number,
  myFont?: string,
  normalColor?: unknown,
  highlightColor?: unknown,
  itemYPad?: number
): number {
  const text = `${mytext} |u16:0::|u`
  return AddMenuItem(text, myfunction, itemType, myFont, normalColor, highlightColor, itemYPad)
}

export const lib: Lib = {
  DIVIDER,
  headerFont: HEADER_FONT,
  enabledSpecialKeys: {},

  CATEGORY_EARLY,
  CATEGORY_PRIMARY,
  CATEGORY_SECONDARY,
  CATEGORY_TERTIARY,
  CATEGORY_QUATERNARY,
  CATEGORY_LATE,

  contextMenuRegistry: ZO_CallbackObject.New(),
  keybindRegistry: ZO_CallbackObject.New(),
  playerContextMenuRegistry: ZO_CallbackObject.New(),
  guildRosterContextMenuRegistry: ZO_CallbackObject.New(),
  friendsListContextMenuRegistry: ZO_CallbackObject.New(),
  ignoreListContextMenuRegistry: ZO_CallbackObject.New(),
  groupListContextMenuRegistry: ZO_CallbackObject.New(),

  itemPool: ZO_ObjectPool.New(MenuItemFactory, ResetMenuItem),
  submenuPool: ZO_ObjectPool.New(SubMenuItemFactory, ResetMenuItem),
  checkBoxPool: ZO_ObjectPool.New(CheckBoxFactory, ResetCheckBox),
  dividerPool: ZO_ObjectPool.New(DividerFactory, ResetMenuItem),
  headerPool: ZO_ObjectPool.New(HeaderFactory, ResetMenuItem),

  AddMenuItem: addMenuItem,
  AddSubMenuItem: addSubMenuItem,

  RegisterContextMenu(this: Lib, func, category, ...args) {
    const cat = zo_clamp(category ?? this.CATEGORY_LATE, this.CATEGORY_EARLY, this.CATEGORY_LATE)
    this.contextMenuRegistry.RegisterCallback(cat, func, ...args)
  },

  RegisterSpecialKeyContextMenu(this: Lib, func, ...args) {
    this.contextMenuRegistry.RegisterCallback("Special", func, ...args)
  },

  RegisterPlayerContextMenu(this: Lib, func, category, ...args) {
    const cat = zo_clamp(category ?? this.CATEGORY_LATE, this.CATEGORY_EARLY, this.CATEGORY_LATE)
    this.playerContextMenuRegistry.RegisterCallback(cat, func, ...args)
  },

  RegisterGuildRosterContextMenu(this: Lib, func, category, ...args) {
    const cat = zo_clamp(category ?? this.CATEGORY_LATE, this.CATEGORY_EARLY, this.CATEGORY_LATE)
    this.guildRosterContextMenuRegistry.RegisterCallback(cat, func, ...args)
  },

  RegisterFriendsListContextMenu(this: Lib, func, category, ...args) {
    const cat = zo_clamp(category ?? this.CATEGORY_LATE, this.CATEGORY_EARLY, this.CATEGORY_LATE)
    this.friendsListContextMenuRegistry.RegisterCallback(cat, func, ...args)
  },

  RegisterIgnoreListContextMenu(this: Lib, func, category, ...args) {
    const cat = zo_clamp(category ?? this.CATEGORY_LATE, this.CATEGORY_EARLY, this.CATEGORY_LATE)
    this.ignoreListContextMenuRegistry.RegisterCallback(cat, func, ...args)
  },

  RegisterGroupListContextMenu(this: Lib, func, category, ...args) {
    const cat = zo_clamp(category ?? this.CATEGORY_LATE, this.CATEGORY_EARLY, this.CATEGORY_LATE)
    this.groupListContextMenuRegistry.RegisterCallback(cat, func, ...args)
  },

  RegisterKeyStripEnter(this: Lib, func, category, ...args) {
    const cat = zo_clamp(category ?? this.CATEGORY_LATE, this.CATEGORY_EARLY, this.CATEGORY_LATE)
    this.keybindRegistry.RegisterCallback(cat, func, ...args)
  },

  RegisterKeyStripExit(this: Lib, func, ...args) {
    this.keybindRegistry.RegisterCallback("Exit", func, ...args)
  },

  EnableSpecialKeyContextMenu(this: Lib, key) {
    if (!(key === KEY_CTRL || key === KEY_ALT || key === KEY_SHIFT || key === KEY_COMMAND)) {
      error("supported keys are: KEY_CTRL, KEY_ALT, KEY_SHIFT, KEY_COMMAND")
    }
    this.enabledSpecialKeys[key] = true
  },
}
