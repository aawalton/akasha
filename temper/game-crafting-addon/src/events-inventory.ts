import { IsValidEquip } from "./core/data-validation"
import { IsLocked, UpdateStored } from "./core/inventory"
import { applyStorageCounts } from "./core/storage-counts"
import { StripLink, UpdateMatsInfo } from "./helpers"
import { Lang } from "./lang"
import { state } from "./state"

const defined = <T>(value: T | undefined): T =>
  value ?? error("TemperCrafting: unexpected nil value")

const asSharedInventorySlotData = (value: { bagId: number }): SharedInventorySlotData =>
  value as SharedInventorySlotData

export function HouseBankQuantity(
  this: void,
  bag: number,
  slot?: number | false,
  link?: string | false
): number {
  let resolvedLink: string | false = link ?? false
  const items = SHARED_INVENTORY.GenerateFullSlotData(undefined, bag)
  if (slot !== undefined && slot !== false) {
    resolvedLink = StripLink(GetItemLink(bag, slot))
  }
  let quantity = 0
  for (const [, data] of ipairs(items)) {
    if (resolvedLink === StripLink(GetItemLink(data.bagId, data.slotIndex))) {
      const [, stack] = GetItemInfo(data.bagId, data.slotIndex)
      quantity = quantity + stack
    }
  }
  return quantity
}

export function OnInventorySlotAdded(
  this: void,
  bag: number,
  slot: number,
  data: SharedInventorySlotData,
  replace?: boolean
): undefined {
  if (!replace) {
    replace = false
  }
  if (
    bag !== BAG_BACKPACK &&
    bag !== BAG_BANK &&
    bag !== BAG_SUBSCRIBER_BANK &&
    bag !== BAG_VIRTUAL &&
    !IsHouseBankBag(bag)
  ) {
    return
  }
  const link = StripLink(GetItemLink(bag, slot))
  const [a1, a2, a3] = GetItemLinkStacks(link)

  let stored = state.Account.storage[link]
  if (stored === undefined) {
    stored = {}
    state.Account.storage[link] = stored
  }
  stored[Lang.en.craftbag] = a3
  if (a3 === 0) {
    stored[Lang.en.craftbag] = undefined
  }

  stored[Lang.en.bank] = a2
  if (a2 === 0) {
    stored[Lang.en.bank] = undefined
  }

  stored[state.CurrentPlayer] = a1
  if (a1 === 0) {
    stored[state.CurrentPlayer] = undefined
  }

  if (IsHouseBankBag(bag)) {
    if (stored[`${Lang.en.housebank}${bag - 7}`] === undefined) {
      stored[Lang.en.housebank] = 0
    }
    stored[`${Lang.en.housebank}${bag - 7}`] = HouseBankQuantity(bag, slot)
  }
  UpdateMatsInfo(link)
  data.uid = Id64ToString(GetItemUniqueId(bag, slot))
  data.lnk = link
  if (IsValidEquip(GetItemLinkEquipType(link))) {
    if (IsLocked(bag, slot) === true) {
      UpdateStored("removed", data, replace)
    } else {
      UpdateStored("added", data)
    }
  }
}

export function OnInventorySlotRemoved(
  this: void,
  bag: number,
  _slot: number,
  data: SharedInventorySlotData
): undefined {
  if (
    bag !== BAG_BACKPACK &&
    bag !== BAG_BANK &&
    bag !== BAG_SUBSCRIBER_BANK &&
    bag !== BAG_VIRTUAL &&
    !IsHouseBankBag(bag)
  ) {
    return
  }
  const link = StripLink(defined(data.lnk))
  const [a1, a2, a3] = GetItemLinkStacks(link)

  const stored = applyStorageCounts(state.Account.storage, link, [
    [Lang.en.craftbag, a3],
    [Lang.en.bank, a2],
    [state.CurrentPlayer, a1],
  ])
  if (stored === undefined) {
    return
  }
  if (IsHouseBankBag(bag)) {
    stored[`${Lang.en.housebank}${bag - 7}`] = HouseBankQuantity(bag, false, link)
  }
  UpdateMatsInfo(link)
  if (IsValidEquip(GetItemLinkEquipType(link))) {
    UpdateStored("removed", data)
  }
}

export function OnStackSplitShow(this: void): undefined {
  if (state.Account.options.stacksplit) {
    ZO_StackSplitSpinnerDisplay.TakeFocus()
    ZO_StackSplitSpinnerDisplay.SelectAll()
  }
}

export function OnInventorySingleSlotUpdate(
  this: void,
  _eventCode: number,
  bagId: number,
  slotId: number,
  _isNewItem: boolean,
  _itemSoundCategory: number,
  inventoryUpdateReason: number,
  _stackCountChange: number
): undefined {
  const replace = inventoryUpdateReason === 4
  OnInventorySlotAdded(bagId, slotId, asSharedInventorySlotData({ bagId: bagId }), replace)
}

export function OnMoneyUpdate(
  this: void,
  _eventCode: number,
  newMoney: number,
  oldMoney: number,
  reason: number
): undefined {
  if (reason === 42 || reason === 43) {
    state.Character.income[2] = defined(state.Character.income[2]) + newMoney - oldMoney
  }
}
