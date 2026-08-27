import { verticalScrollbarHacks } from "./inventory-scrollbar"
import { state } from "./state"
import type { IconPosBox, RGBAColor } from "./types"

const playerInv = PLAYER_INVENTORY

interface BrandNewSlotData {
  brandNew?: boolean
}
function isBrandNewSlotData(this: void, value: unknown): value is BrandNewSlotData {
  return type(value) === "table"
}

let noNewItemIconHooked = false
function FCOCS_noNewItemIcon(this: void): undefined {
  if (!noNewItemIconHooked) {
    ZO_PreHook(playerInv, "OnInventoryItemAdded", (...args: unknown[]): unknown => {
      if (state.settingsVars.settings.removeNewItemIcon !== true) {
        return false
      }
      const newSlotData = args[4]
      if (isBrandNewSlotData(newSlotData) && newSlotData.brandNew === true) {
        newSlotData.brandNew = false
        playerInv.suppressItemAlert = true
      }
      return false
    })

    ZO_PreHook(playerInv, "PlayItemAddedAlert", (): unknown => {
      if (state.settingsVars.settings.removeNewItemIcon !== true) {
        return false
      }
      playerInv.suppressItemAddedAlert = true
      playerInv.newItemList = []
      return true
    })
    ZO_PreHook(COMPANION_EQUIPMENT_KEYBOARD, "PlayItemAddedAlert", (): unknown => {
      if (state.settingsVars.settings.removeNewItemIcon !== true) {
        return false
      }
      return true
    })

    noNewItemIconHooked = true
  }
}

let noSellableItemHookDone = false
function FCOCS_noNotSellableItemIcon(this: void): undefined {
  if (!noSellableItemHookDone) {
    ZO_PreHook("ZO_UpdateSellInformationControlIcon", (): unknown => {
      const settingsRemoveSellIconEnabled = state.settingsVars.settings.removeSellItemIcon
      return settingsRemoveSellIconEnabled
    })
    noSellableItemHookDone = true
  }
}

let noNewItemsListHookDone = false
function FCOCS_noNewItemItemsList(this: void): undefined {
  const stateChangeRegistry = INVENTORY_FRAGMENT.callbackRegistry?.StateChange
  if (
    !noNewItemsListHookDone &&
    stateChangeRegistry !== undefined &&
    stateChangeRegistry[0] !== undefined &&
    stateChangeRegistry[0][0] !== undefined
  ) {
    const origStateChangeFunc = stateChangeRegistry[0][0]
    const newStateChangeFunc = (oldState: number, newState: number): undefined => {
      if (newState === SCENE_FRAGMENT_SHOWING) {
        if (state.settingsVars.settings.removeNewItemIcon === true) {
          playerInv.suppressItemAddedAlert = true
          playerInv.newItemList = []
        }
      }
      origStateChangeFunc(oldState, newState)
    }
    stateChangeRegistry[0][0] = newStateChangeFunc
    noNewItemsListHookDone = true
  }
}

interface StatusIconControl extends Control {
  HasIcon: (this: StatusIconControl) => boolean
  ClearIcons: (this: StatusIconControl) => void
  AddIcon: (this: StatusIconControl, texture: string, color: ZoColorDef) => void
  SetColor: (this: StatusIconControl, r: number, g: number, b: number, a?: number) => void
  Show: (this: StatusIconControl) => void
  Hide: (this: StatusIconControl) => void
}

interface LearnableSlotData {
  canBeUsedToLearn?: boolean
  bagId?: number
  slotIndex?: number
}

interface SearchResultRow {
  isGuildSpecificItem?: boolean
  itemLink: string
}

function isLearnableSlotData(this: void, value: unknown): value is LearnableSlotData {
  return type(value) === "table"
}

let noLearnableItemIconHooked = false
function FCOCS_learnableItemIconChanges(this: void): undefined {
  if (!noLearnableItemIconHooked) {
    const CAN_LEARN_ICON_TEXTURE = "EsoUI/Art/Inventory/inventory_can_learn_icon.dds"

    const defaultBagPositions: IconPosBox = { x: 0, y: 0, width: 32, height: 32 }
    let last_learnableItemIconColor: RGBAColor | undefined
    let last_learnableItemIconColorDef: ZoColorDef | undefined

    const recolorStatusIconEnabled = (): ZoColorDef => {
      let learnableItemIconColorDef: ZoColorDef
      const learnableItemIconColor = state.settingsVars.settings.learnableItemIconColor
      if (
        learnableItemIconColor !== last_learnableItemIconColor ||
        last_learnableItemIconColorDef === undefined
      ) {
        last_learnableItemIconColor = learnableItemIconColor
        learnableItemIconColorDef = ZO_ColorDef.New(
          learnableItemIconColor.r,
          learnableItemIconColor.g,
          learnableItemIconColor.b,
          learnableItemIconColor.a
        )
        last_learnableItemIconColorDef = learnableItemIconColorDef
      } else {
        learnableItemIconColorDef = last_learnableItemIconColorDef
      }
      return learnableItemIconColorDef
    }

    const getStatusIconPosition = (
      slotData: LearnableSlotData
    ): LuaMultiReturn<[number, number, number, number]> => {
      const settings = state.settingsVars.settings
      let bagId = slotData.bagId ?? BAG_BACKPACK
      if (bagId === BAG_SUBSCRIBER_BANK) {
        bagId = BAG_BANK
      }
      if (IsHouseBankBag(bagId) && !IsFurnitureVault(bagId)) {
        bagId = BAG_HOUSE_BANK_ONE
      }

      const iconPos = settings.learnableItemIconPos
      const bagPositions = iconPos[bagId] ?? defaultBagPositions
      return $multi(bagPositions.x, bagPositions.y, bagPositions.width, bagPositions.height)
    }

    const recolorStatusIconNow = (
      inventorySlot: Control,
      slotData: LearnableSlotData
    ): undefined => {
      if (slotData.canBeUsedToLearn === true) {
        const statusControl =
          inventorySlot.GetNamedChild<StatusIconControl>("StatusTexture") ??
          inventorySlot.GetNamedChild<StatusIconControl>("StatusIcon")
        if (statusControl !== undefined) {
          const recolor = recolorStatusIconEnabled()
          if (statusControl.HasIcon()) {
            statusControl.ClearIcons()
          }
          statusControl.AddIcon(CAN_LEARN_ICON_TEXTURE, recolor)
          const [r, g, b, a] = recolor.UnpackRGBA()
          statusControl.SetColor(r, g, b, a)

          const parent = statusControl.GetParent()
          statusControl.ClearAnchors()
          const [x, y, width, height] = getStatusIconPosition(slotData)
          statusControl.SetAnchor(LEFT, parent, LEFT, x, y)
          statusControl.SetDimensions(width, height)

          statusControl.Show()
        }
      }
    }

    SecurePostHook(
      "ZO_UpdateStatusControlIcons",
      (inventorySlot: Control, slotData: LearnableSlotData): undefined => {
        recolorStatusIconNow(inventorySlot, slotData)
      }
    )

    const SEARCH_RESULTS_DATA_TYPE = 1
    const GUILD_SPECIFIC_ITEM_DATA_TYPE = 3
    SecurePostHook(TRADING_HOUSE, "InitializeSearchResults", (): undefined => {
      const baseLearnableItemStatusIconCheck = (
        rowControl: Control,
        result: SearchResultRow
      ): undefined => {
        if (result.isGuildSpecificItem !== true) {
          const canBeUsedToLearn = CanItemLinkBeUsedToLearn(result.itemLink)
          if (canBeUsedToLearn) {
            const slotData: LearnableSlotData = { bagId: 990, canBeUsedToLearn: true }
            recolorStatusIconNow(rowControl, slotData)
          }
        }
      }

      const setupSearchResultRowHook = (
        rowControl: Control,
        result: SearchResultRow
      ): undefined => {
        baseLearnableItemStatusIconCheck(rowControl, result)
      }
      const setupGuildSpecificItemRowHook = (
        rowControl: Control,
        result: SearchResultRow
      ): undefined => {
        baseLearnableItemStatusIconCheck(rowControl, result)
      }

      const searchResultsDataType =
        TRADING_HOUSE.searchResultsList.dataTypes[SEARCH_RESULTS_DATA_TYPE]
      const guildSpecificDataType =
        TRADING_HOUSE.searchResultsList.dataTypes[GUILD_SPECIFIC_ITEM_DATA_TYPE]
      if (searchResultsDataType !== undefined) {
        SecurePostHook(searchResultsDataType, "setupCallback", setupSearchResultRowHook)
      }
      if (guildSpecificDataType !== undefined) {
        SecurePostHook(guildSpecificDataType, "setupCallback", setupGuildSpecificItemRowHook)
      }
    })

    const checkCanBeUsedToLearn = (tabData: unknown, isLootArg?: boolean): boolean => {
      const isLoot = isLootArg ?? false
      const settings = state.settingsVars.settings
      const removeLearnableItemIcon = settings.removeLearnableItemIcon === true
      if (
        !removeLearnableItemIcon ||
        (removeLearnableItemIcon &&
          isLoot === true &&
          settings.keepLearnableItemIconInLoot === true)
      ) {
        return false
      }

      if (isLearnableSlotData(tabData)) {
        if (tabData.canBeUsedToLearn === true) {
          tabData.canBeUsedToLearn = false
          return true
        }
      }
      return false
    }

    const refreshStatusSortOrderTarget =
      MasterMerchant !== undefined ? ZO_SharedInventoryManager : SHARED_INVENTORY
    ZO_PreHook(
      refreshStatusSortOrderTarget,
      "RefreshStatusSortOrder",
      (...args: unknown[]): unknown => {
        const slotData = args[1]
        return checkCanBeUsedToLearn(slotData, false)
      }
    )

    SecurePostHook(
      LOOT_WINDOW,
      "SetUpLootItem",
      (_zoLootObject: unknown, control: Control, data: unknown): undefined => {
        if (!checkCanBeUsedToLearn(data, true)) {
          return
        }
        const statusIcon = control.GetNamedChild<StatusIconControl>("StatusIcon")
        if (statusIcon !== undefined) {
          statusIcon.ClearIcons()
          statusIcon.Hide()
        }
      }
    )

    noLearnableItemIconHooked = true
  }
}

export function noNewItemIcon(this: void): undefined {
  FCOCS_noNewItemIcon()
  FCOCS_noNewItemItemsList()
}

export function learnableItemIconChanges(this: void): undefined {
  FCOCS_learnableItemIconChanges()
}

export function noNotSellableItemIcon(this: void): undefined {
  FCOCS_noNotSellableItemIcon()
}

let preHookNewMenuCategoryFlashWasDone = false
function OnStop(this: void): undefined {
  playerInv.flashingSlots = {}
  playerInv.listeningControls = {}
}
export function noNewMenuCategoryFlashAnimation(this: void): undefined {
  if (
    preHookNewMenuCategoryFlashWasDone === true ||
    state.settingsVars.settings.removeNewItemIcon !== true
  ) {
    return
  }

  ZO_PreHook("ZO_Inventory_NewItemCategory_FlashAnimation_OnUpdate", (): unknown => {
    if (state.settingsVars.settings.removeNewItemIcon !== true) {
      return false
    }

    const listeningControls = playerInv.listeningControls
    if (listeningControls !== undefined) {
      for (const key in listeningControls) {
        const control = listeningControls[key]
        if (control !== undefined) {
          control.SetAlpha(0)
        }
      }
    }
    OnStop()
    return true
  })
  preHookNewMenuCategoryFlashWasDone = true
}

let preHookZO_Dialogs_ShowDialogWasDone = false

function InitializeEasyDestroy(this: void): undefined {
  if (!preHookZO_Dialogs_ShowDialogWasDone) {
    const AutofillDestroyConfirm = (...args: unknown[]): undefined => {
      const dialogName = args[0]
      if (
        dialogName === "CONFIRM_DESTROY_ITEM_PROMPT" &&
        state.settingsVars.settings.easyDestroy === true
      ) {
        zo_callLater((): undefined => {
          const mainTextParams = ZO_Dialog1.textParams?.mainTextParams
          if (mainTextParams === undefined) {
            return
          }

          for (const confirmText of mainTextParams) {
            if (confirmText === LocaleAwareToUpper(confirmText)) {
              ZO_Dialog1EditBox.SetText(confirmText)
              ZO_Dialog1EditBox.LoseFocus()
              break
            }
          }
        }, 0)
      }
    }

    ZO_PreHook("ZO_Dialogs_ShowDialog", AutofillDestroyConfirm)
    preHookZO_Dialogs_ShowDialogWasDone = true
  }
}

export function easyDestroy(this: void): undefined {
  if (state.settingsVars.settings.easyDestroy !== true) {
    return
  }
  InitializeEasyDestroy()
}

export function inventoryChanges(this: void): undefined {
  noNewItemIcon()
  noNotSellableItemIcon()
  noNewMenuCategoryFlashAnimation()
  learnableItemIconChanges()

  verticalScrollbarHacks()
  easyDestroy()
}
