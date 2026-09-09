import type { GlobalFnTable } from "../custom-menu-casts/custom-menu-casts.module.code.ts"
import {
  asLcmControlBase,
  asSlotActionsTable,
  asZoInventorySlotActions,
} from "../custom-menu-casts/custom-menu-casts.module.code.ts"
import { LIB } from "../custom-menu-lib/custom-menu-lib.module.code.ts"
import { menu } from "../eso-menu/eso-menu.module.code.ts"
import { cleanupEntryHeights, runTooltip } from "../menu-row-setup/menu-row-setup.module.code.ts"
import { clearTimeout } from "../submenu-timeout/submenu-timeout.module.code.ts"

const everyGlobal: unknown = globalThis
const glob = everyGlobal as GlobalFnTable

export function hookClearMenu(this: void): undefined {
  const orgClearMenu = ClearMenu
  glob.ClearMenu = function (this: void): undefined {
    clearTimeout()
    orgClearMenu()
    LIB.itemPool.ReleaseAllObjects()
    LIB.submenuPool.ReleaseAllObjects()
    LIB.checkBoxPool.ReleaseAllObjects()
    LIB.dividerPool.ReleaseAllObjects()
    LIB.headerPool.ReleaseAllObjects()
    if (LIB.submenu !== undefined) {
      LIB.submenu.Clear()
    }
  }
}

export function hookShowMenu(this: void): undefined {
  const orgShowMenu = glob.ShowMenu
  glob.ShowMenu = function (this: void, ...args: unknown[]): unknown {
    menu.height = menu.height - cleanupEntryHeights(menu.items)
    if (orgShowMenu !== undefined) {
      return orgShowMenu(...args)
    }
    return undefined
  }
}

export function hookMenuEnter(this: void): undefined {
  const orgEnter = glob.ZO_Menu_EnterItem
  glob.ZO_Menu_EnterItem = function (this: void, ...args: unknown[]): unknown {
    runTooltip(asLcmControlBase(args[0]), true)
    if (orgEnter !== undefined) {
      return orgEnter(...args)
    }
    return undefined
  }
  const orgExit = glob.ZO_Menu_ExitItem
  glob.ZO_Menu_ExitItem = function (this: void, ...args: unknown[]): unknown {
    runTooltip(asLcmControlBase(args[0]), false)
    if (orgExit !== undefined) {
      return orgExit(...args)
    }
    return undefined
  }
}

export function hookAddSlotAction(this: void): undefined {
  ZO_InventorySlotActions.AddCustomSlotAction = function (
    this: ZoInventorySlotActions,
    ...args: unknown[]
  ): undefined {
    const orgItemPool = menu.itemPool
    const orgCheckboxItemPool = menu.checkBoxPool
    menu.itemPool = LIB.itemPool
    menu.checkBoxPool = LIB.checkBoxPool
    this.AddSlotAction(...args)
    menu.itemPool = orgItemPool
    menu.checkBoxPool = orgCheckboxItemPool
  }
}

export function hookContextMenu(this: void): undefined {
  let category = 0
  let registry: ZoCallbackObject | undefined
  let inventorySlot: unknown
  let slotActions: ZoInventorySlotActions | undefined
  let entered = false

  function reset(this: void): undefined {
    category = 0
    registry = undefined
    inventorySlot = undefined
    slotActions = undefined
  }
  function removeMouseOverKeybinds(this: void): undefined {
    if (entered) {
      entered = false
      LIB.keybindRegistry.FireCallbacks("Exit")
    }
    reset()
  }
  function addCategory(this: void): undefined {
    category = category + 1
    if (registry !== undefined) {
      registry.FireCallbacks(category, inventorySlot, slotActions)
    }
  }
  function addSlots(this: void, ...args: unknown[]): boolean | undefined {
    reset()
    const [slot, actions] = args
    inventorySlot = slot
    slotActions = actions === undefined ? undefined : asZoInventorySlotActions(actions)
    if (slotActions !== undefined && slotActions.m_contextMenuMode === true) {
      const ctrl = LIB.enabledSpecialKeys[KEY_CTRL] === true && IsControlKeyDown()
      const alt = LIB.enabledSpecialKeys[KEY_ALT] === true && IsAltKeyDown()
      const shift = LIB.enabledSpecialKeys[KEY_SHIFT] === true && IsShiftKeyDown()
      const command = LIB.enabledSpecialKeys[KEY_COMMAND] === true && IsCommandKeyDown()
      if (ctrl || alt || shift || command) {
        registry = undefined
        LIB.contextMenuRegistry.FireCallbacks(
          "Special",
          inventorySlot,
          slotActions,
          ctrl,
          alt,
          shift,
          command
        )
        slotActions.Show()
        reset()
        return true
      }
      registry = LIB.contextMenuRegistry
    } else {
      entered = true
      registry = LIB.keybindRegistry
    }
    return undefined
  }
  function insertToMenu(this: void): undefined {
    if (registry !== undefined && category < 4 && inventorySlot !== undefined) {
      addCategory()
    }
  }
  function appendToMenu(this: void): undefined {
    if (registry !== undefined) {
      if (inventorySlot !== undefined) {
        while (category <= 6) {
          addCategory()
        }
      }
      reset()
    }
  }
  reset()

  const slotActionsTable = asSlotActionsTable(ZO_InventorySlotActions)
  ZO_PreHook("ZO_InventorySlot_RemoveMouseOverKeybinds", removeMouseOverKeybinds)
  ZO_PreHook("ZO_InventorySlot_OnMouseExit", removeMouseOverKeybinds)
  ZO_PreHook("ZO_InventorySlot_DiscoverSlotActionsFromActionList", addSlots)
  ZO_PreHook(slotActionsTable, "AddSlotAction", insertToMenu)
  ZO_PreHook(slotActionsTable, "Show", appendToMenu)
  ZO_PreHook(slotActionsTable, "GetPrimaryActionName", appendToMenu)
}

function oneTimeHook(this: void, method: string, hook: (this: void) => void): undefined {
  const org = glob[method]
  glob[method] = function (this: void, ...args: unknown[]): unknown {
    glob[method] = org
    hook()
    if (org !== undefined) {
      return org(...args)
    }
    return undefined
  }
}

export function hookShowPlayerContextMenu(this: void): undefined {
  let registry: ZoCallbackObject | undefined
  let category = 0
  let playerName: string | undefined
  let rawName: string | undefined

  function addCategory(this: void): undefined {
    category = category + 1
    if (registry !== undefined) {
      registry.FireCallbacks(category, playerName, rawName)
    }
  }
  function appendEntries(this: void): undefined {
    while (category < LIB.CATEGORY_LATE) {
      addCategory()
    }
  }
  function insertEntries(this: void): undefined {
    while (category < LIB.CATEGORY_SECONDARY) {
      addCategory()
    }
    oneTimeHook("ZO_Menu_GetNumMenuItems", appendEntries)
  }

  const orgShow = SharedChatSystem.ShowPlayerContextMenu
  SharedChatSystem.ShowPlayerContextMenu = function (
    this: SharedChatSystem,
    pName: string,
    rName: string,
    ...rest: unknown[]
  ): unknown {
    playerName = pName
    rawName = rName
    registry = LIB.playerContextMenuRegistry
    category = 0
    oneTimeHook("IsGroupModificationAvailable", insertEntries)
    return orgShow.call(this, pName, rName, ...rest)
  }
}

export function hookSocialListContextMenu(
  this: void,
  registry: ZoCallbackObject,
  owner: SocialListOwner,
  mouseUpName: string,
  oneTimeHookName: string
): undefined {
  let category = 0
  let rowData: unknown
  let showing = false

  function addCategory(this: void): undefined {
    category = category + 1
    registry.FireCallbacks(category, rowData)
  }
  function appendEntries(this: void): undefined {
    while (category < LIB.CATEGORY_LATE) {
      addCategory()
    }
  }
  function insertEntries(this: void): undefined {
    while (category < LIB.CATEGORY_SECONDARY) {
      addCategory()
    }
  }

  const orgOnMouseUp = owner[mouseUpName]
  owner[mouseUpName] = function (this: void, ...args: unknown[]): unknown {
    const [, control, button, upInside] = args
    rowData = undefined
    showing = false
    if (button === MOUSE_BUTTON_INDEX_RIGHT && upInside === true) {
      const data = ZO_ScrollList_GetData(control as Control)
      showing = data !== undefined
      if (data !== undefined) {
        if (menu.items.length > 0) {
          ClearMenu()
        }
        rowData = data
        category = 0
        oneTimeHook(oneTimeHookName, insertEntries)
      }
    }
    if (orgOnMouseUp !== undefined) {
      return orgOnMouseUp(...args)
    }
    return undefined
  }

  const orgShowMenu = owner.ShowMenu
  owner.ShowMenu = function (this: void, ...args: unknown[]): unknown {
    if (showing) {
      appendEntries()
      showing = false
    }
    if (orgShowMenu !== undefined) {
      return orgShowMenu(...args)
    }
    return undefined
  }
}
