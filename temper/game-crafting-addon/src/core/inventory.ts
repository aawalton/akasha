import { CB_ADD_RESEARCH_ITEM, CB_UPDATE_PANEL_ICON } from "../constants"
import type { AccountData } from "../data/account-init"
import { RawItemTypes } from "../data/item-types"
import { NilCheck, SplitLink, StripLink } from "../helpers"
import { Lang } from "../lang"
import { state } from "../state"
import * as DataValidation from "./data-validation"
import { pruneEmptyStorage } from "./storage-prune"

function defined<T>(value: T | undefined): T {
  if (value === undefined) {
    error("TemperCrafting: unexpected nil value")
  }
  return value
}

export function ScanBagResearch(
  target_craft: number,
  target_line: number,
  target_trait: number,
  bag?: SharedInventorySlotData[] | false,
  secondary?: boolean
): LuaMultiReturn<[bagId: number, slotIndex: number] | [false]> {
  if (!secondary) {
    secondary = false
  }

  if (!bag) {
    bag = SHARED_INVENTORY.GenerateFullSlotData(
      undefined,
      BAG_WORN,
      BAG_BACKPACK,
      BAG_BANK,
      BAG_SUBSCRIBER_BANK,
      BAG_VIRTUAL
    )
  }
  for (const [, data] of ipairs(bag)) {
    const [craft, line, trait] = DataValidation.GetTrait(
      GetItemLink(data.bagId, data.slotIndex, LINK_STYLE_DEFAULT)
    )
    if (target_craft === craft && target_line === line && target_trait === trait) {
      let found = true
      const quality = GetItemQuality(data.bagId, data.slotIndex)
      const locked = IsLocked(data.bagId, data.slotIndex)
      if (locked || (secondary && quality > ITEM_QUALITY_ARCANE)) {
        found = false
      }
      if (found) {
        return $multi(data.bagId, data.slotIndex)
      }
    }
  }
  return $multi(false)
}

export function ScanBag(scanid: number): LuaMultiReturn<[bagId: number, slotIndex: number] | []> {
  const bag = SHARED_INVENTORY.GenerateFullSlotData(
    undefined,
    BAG_BACKPACK,
    BAG_BANK,
    BAG_SUBSCRIBER_BANK,
    BAG_VIRTUAL
  )
  for (const [, data] of ipairs(bag)) {
    const id = SplitLink(GetItemLink(data.bagId, data.slotIndex, LINK_STYLE_DEFAULT), 3)
    if (id === scanid) {
      return $multi(data.bagId, data.slotIndex)
    }
  }
  return $multi()
}

export function ScanUidBag(
  id: string | false | undefined,
  bag?: SharedInventorySlotData[] | false
): LuaMultiReturn<[bagId: number, slotIndex: number] | [false, false] | [false]> {
  if (id === undefined || id === false) {
    return $multi(false)
  }
  if (!bag) {
    bag = SHARED_INVENTORY.GenerateFullSlotData(
      undefined,
      BAG_WORN,
      BAG_BACKPACK,
      BAG_BANK,
      BAG_SUBSCRIBER_BANK,
      BAG_VIRTUAL
    )
  }
  for (const [, data] of ipairs(bag)) {
    if (id === Id64ToString(data.uniqueId)) {
      return $multi(data.bagId, data.slotIndex)
    }
  }
  return $multi(false, false)
}

export function UpdateBag(): undefined {
  const bag = SHARED_INVENTORY.GenerateFullSlotData(
    undefined,
    BAG_BACKPACK,
    BAG_BANK,
    BAG_SUBSCRIBER_BANK,
    BAG_VIRTUAL
  )
  for (const [, data] of ipairs(bag)) {
    const link = StripLink(GetItemLink(data.bagId, data.slotIndex, LINK_STYLE_DEFAULT))
    let stack = 0
    const [backpack, bank, craftBag] = GetItemLinkStacks(link)
    let slotStorage = state.Account.storage[link]
    if (slotStorage === undefined) {
      slotStorage = {}
      state.Account.storage[link] = slotStorage
    }
    if (data.bagId === BAG_BACKPACK) {
      stack = backpack
    } else if (data.bagId === BAG_BANK || data.bagId === BAG_SUBSCRIBER_BANK) {
      stack = bank
    } else if (data.bagId === BAG_VIRTUAL) {
      stack = craftBag
    } else {
      stack = data.stackCount
    }
    data.uid = Id64ToString(GetItemUniqueId(data.bagId, data.slotIndex))
    data.lnk = link
    let bagName = state.CurrentPlayer
    if (data.bagId === BAG_BANK || data.bagId === BAG_SUBSCRIBER_BANK) {
      bagName = Lang.en.bank
    }
    if (IsHouseBankBag(data.bagId)) {
      bagName = `${Lang.en.housebank}${data.bagId - 7}`
    }
    if (data.bagId === BAG_VIRTUAL) {
      bagName = Lang.en.craftbag
    }
    slotStorage[bagName] = stack
    if (stack === 0) {
      slotStorage[bagName] = undefined
    }
    const [itemType] = GetItemLinkItemType(link)
    if (RawItemTypes[itemType] === true && state.Account.materials[link] === undefined) {
      const refinedLink = StripLink(GetItemLinkRefinedMaterialItemLink(link, 0))
      state.Account.materials[link] = { raw: true, link: refinedLink }
      state.Account.materials[refinedLink] = { raw: false, link: link }
    } else if (DataValidation.IsValidEquip(GetItemLinkEquipType(link))) {
      if (IsLocked(data.bagId, data.slotIndex)) {
        UpdateStored("removed", data, false)
      } else {
        UpdateStored("added", data)
      }
    }
  }
  ClearStorage()
}

export function RemoveCharacterStorage(char: string): undefined {
  for (const [, data] of pairs(state.Account.storage)) {
    if (data[char] !== undefined) {
      data[char] = undefined
    }
  }
  ClearStorage()
}

function isItemSaverLoaded(
  fn: typeof ItemSaver_IsItemSaved
): fn is NonNullable<typeof ItemSaver_IsItemSaved> {
  return type(fn) === "function"
}

export function IsLocked(bagId: number, slotIndex: number): boolean | undefined {
  if (!state.Account.options.lockprotection) {
    return false
  }

  const [, , , , infoLocked, equipType] = GetItemInfo(bagId, slotIndex)
  let locked: boolean | undefined = infoLocked

  if (!locked) {
    locked = IsItemPlayerLocked(bagId, slotIndex)
  }

  if (!locked && !state.Account.options.marksetitems) {
    const [hasSet] = GetItemLinkSetInfo(GetItemLink(bagId, slotIndex, LINK_STYLE_DEFAULT), false)
    locked = hasSet
  }

  let isGlyph = false
  const [itemType] = GetItemType(bagId, slotIndex)
  if (
    itemType === ITEMTYPE_GLYPH_ARMOR ||
    itemType === ITEMTYPE_GLYPH_WEAPON ||
    itemType === ITEMTYPE_GLYPH_JEWELRY
  ) {
    isGlyph = true
  }
  let isJewelry = false
  if (equipType === EQUIP_TYPE_RING || equipType === EQUIP_TYPE_NECK) {
    isJewelry = true
  }

  if (!locked && isItemSaverLoaded(ItemSaver_IsItemSaved)) {
    const [, set] = ItemSaver_IsItemSaved(bagId, slotIndex)
    if (set !== undefined) {
      const setData = (
        ItemSaver_GetSetData ?? error("TemperCrafting: ItemSaver_GetSetData missing")
      )(set)
      if (isGlyph) {
        locked = setData.filterDeconstruction
      } else {
        locked = setData.filterResearch
      }
    }
  }
  if (!locked && FCOIS !== undefined && FCOIS.addonVars.gPlayerActivated) {
    if (isGlyph) {
      locked = FCOIS.IsEnchantingLocked(bagId, slotIndex)
    } else if (isJewelry) {
      locked = FCOIS.IsJewelryResearchLocked(bagId, slotIndex)
    } else {
      locked = FCOIS.IsResearchLocked(bagId, slotIndex)
    }
  }
  return locked
}

export function ClearStorage(): undefined {
  pruneEmptyStorage(state.Account.storage)
}

export function StoragePurge(): undefined {
  const account: Partial<AccountData> = state.Account
  delete account.storage
  delete account.materials
  const crafting: Partial<AccountData["crafting"]> = state.Account.crafting
  delete crafting.stored
  ReloadUI("ingame")
}

export function UpdateStored(
  action: string,
  data: SharedInventorySlotData,
  replace?: boolean
): undefined {
  if (!replace) {
    replace = false
  }
  const link = data.lnk
  let owner = state.CurrentPlayer
  const [craft, line, trait] = DataValidation.GetTrait(link)
  if (craft === false || link === undefined) {
    return
  }
  function CompareItem(
    craft: number,
    line: number,
    trait: number,
    q1: number,
    l1: number,
    v1: number
  ): boolean {
    const freshTable: unknown = {}
    if (NilCheck(state.Account.crafting.stored, {}, craft, line, trait) === freshTable) {
      return true
    }
    const entry = defined(defined(state.Account.crafting.stored[craft])[line])[trait]
    if (entry === undefined || entry.link === undefined) {
      return true
    }
    const q2 = GetItemLinkQuality(entry.link)
    const l2 = GetItemLinkRequiredLevel(entry.link)
    const v2 = GetItemLinkRequiredChampionPoints(entry.link)
    if (q1 < q2) {
      return true
    }
    if (l1 < l2) {
      return true
    }
    if (v1 < v2) {
      return true
    }
    return false
  }
  if (craft !== undefined && line !== undefined && trait !== undefined) {
    if (action === "added") {
      if (data.bagId === BAG_BANK || data.bagId === BAG_SUBSCRIBER_BANK) {
        owner = Lang.en.bank
      }
      if (IsHouseBankBag(data.bagId)) {
        owner = Lang.en.housebank
      }
      if (data.bagId === BAG_GUILDBANK) {
        owner = Lang.en.guildbank
      }
      if (data.bagId === BAG_VIRTUAL) {
        owner = Lang.en.craftbag
      }
      if (
        !IsLocked(data.bagId, data.slotIndex) &&
        CompareItem(
          craft,
          line,
          trait,
          GetItemLinkQuality(link),
          GetItemLinkRequiredLevel(link),
          GetItemLinkRequiredChampionPoints(link)
        )
      ) {
        defined(defined(state.Account.crafting.stored[craft])[line])[trait] = {
          link: link,
          owner: owner,
          id: data.uid,
        }
      }
    }
    if (
      action === "removed" &&
      defined(defined(defined(state.Account.crafting.stored[craft])[line])[trait]).id === data.uid
    ) {
      defined(defined(state.Account.crafting.stored[craft])[line])[trait] = {}
      if (replace) {
        CALLBACK_MANAGER.FireCallbacks(CB_ADD_RESEARCH_ITEM, craft, line, trait)
      }
    }
    CALLBACK_MANAGER.FireCallbacks(CB_UPDATE_PANEL_ICON, craft, line, trait)
  }
}

export function IsItemStoredForTemperCrafting(id: string): boolean {
  for (const [x, craft] of pairs(state.Account.crafting.stored)) {
    for (const [y, line] of pairs(craft)) {
      for (const [z, trait] of pairs(line)) {
        if (trait.id === id) {
          for (const [char, studies] of pairs(state.Account.crafting.studies)) {
            const researchedValue = state.Data.crafting.researched[char]?.[x]?.[y]?.[z]
            if (
              studies[x]?.[y]?.[z] === true &&
              (researchedValue === undefined || researchedValue === false)
            ) {
              return true
            }
          }
        }
      }
    }
  }
  return false
}
