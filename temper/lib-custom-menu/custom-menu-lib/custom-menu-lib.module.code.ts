import { asMenuRegistry } from "../custom-menu-casts/custom-menu-casts.module.code.ts"
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
} from "../custom-menu-constants/custom-menu-constants.module.code.ts"
import type { Lib } from "../custom-menu-types/custom-menu-types.module.code.ts"
import { menu } from "../eso-menu/eso-menu.module.code.ts"
import {
  checkBoxFactory,
  dividerFactory,
  headerFactory,
  menuItemFactory,
  resetCheckBox,
  resetMenuItem,
} from "../menu-row-factories/menu-row-factories.module.code.ts"
import { subMenuItemFactory } from "../submenu-item/submenu-item.module.code.ts"

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
  const isDivider = itemType !== MENU_ADD_OPTION_HEADER && mytext === LIB.DIVIDER
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

export const LIB: Lib = {
  DIVIDER,
  headerFont: HEADER_FONT,
  enabledSpecialKeys: {},

  CATEGORY_EARLY,
  CATEGORY_PRIMARY,
  CATEGORY_SECONDARY,
  CATEGORY_TERTIARY,
  CATEGORY_QUATERNARY,
  CATEGORY_LATE,

  contextMenuRegistry: asMenuRegistry(ZO_CallbackObject.New()),
  keybindRegistry: asMenuRegistry(ZO_CallbackObject.New()),
  playerContextMenuRegistry: asMenuRegistry(ZO_CallbackObject.New()),
  guildRosterContextMenuRegistry: asMenuRegistry(ZO_CallbackObject.New()),
  friendsListContextMenuRegistry: asMenuRegistry(ZO_CallbackObject.New()),
  ignoreListContextMenuRegistry: asMenuRegistry(ZO_CallbackObject.New()),
  groupListContextMenuRegistry: asMenuRegistry(ZO_CallbackObject.New()),

  itemPool: ZO_ObjectPool.New(menuItemFactory, resetMenuItem),
  submenuPool: ZO_ObjectPool.New(subMenuItemFactory, resetMenuItem),
  checkBoxPool: ZO_ObjectPool.New(checkBoxFactory, resetCheckBox),
  dividerPool: ZO_ObjectPool.New(dividerFactory, resetMenuItem),
  headerPool: ZO_ObjectPool.New(headerFactory, resetMenuItem),

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
