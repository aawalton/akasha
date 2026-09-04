import type { AccountData } from "../craft-account-init/craft-account-init.module.code.ts"
import { RawItemTypes } from "../craft-item-types/craft-item-types.module.code.ts"
import { LANG } from "../craft-lang-index/craft-lang-index.module.code.ts"
import { pruneEmptyStorage } from "../craft-storage-prune/craft-storage-prune.module.code.ts"
import * as DataValidation from "../craft-validation/craft-validation.module.code.ts"
import {
  CB_ADD_RESEARCH_ITEM,
  CB_UPDATE_PANEL_ICON,
} from "../crafting-constants/crafting-constants.module.code.ts"
import { nilCheck, splitLink, stripLink } from "../crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

function asSaveResult(this: void, value: unknown): LuaMultiReturn<[boolean, string | undefined]> {
  return value as LuaMultiReturn<[boolean, string | undefined]>
}

function defined<T>(value: T | undefined): T {
  if (value === undefined) {
    error("TemperCrafting: unexpected nil value")
  }
  return value
}

export function scanBagResearch(
  targetCraft: number,
  targetLine: number,
  targetTrait: number,
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
    ) as SharedInventorySlotData[]
  }
  for (const [, data] of ipairs(bag)) {
    const [craft, line, trait] = DataValidation.getTrait(
      GetItemLink(data.bagId, data.slotIndex, LINK_STYLE_DEFAULT)
    )
    if (targetCraft === craft && targetLine === line && targetTrait === trait) {
      let found = true
      const quality = GetItemQuality(data.bagId, data.slotIndex)
      const locked = isLocked(data.bagId, data.slotIndex)
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

export function scanBag(scanid: number): LuaMultiReturn<[bagId: number, slotIndex: number] | []> {
  const bag = SHARED_INVENTORY.GenerateFullSlotData(
    undefined,
    BAG_BACKPACK,
    BAG_BANK,
    BAG_SUBSCRIBER_BANK,
    BAG_VIRTUAL
  ) as SharedInventorySlotData[]
  for (const [, data] of ipairs(bag)) {
    const id = splitLink(GetItemLink(data.bagId, data.slotIndex, LINK_STYLE_DEFAULT), 3)
    if (id === scanid) {
      return $multi(data.bagId, data.slotIndex)
    }
  }
  return $multi()
}

export function scanUidBag(
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
    ) as SharedInventorySlotData[]
  }
  for (const [, data] of ipairs(bag)) {
    if (id === Id64ToString(data.uniqueId)) {
      return $multi(data.bagId, data.slotIndex)
    }
  }
  return $multi(false, false)
}

export function updateBag(): undefined {
  const bag = SHARED_INVENTORY.GenerateFullSlotData(
    undefined,
    BAG_BACKPACK,
    BAG_BANK,
    BAG_SUBSCRIBER_BANK,
    BAG_VIRTUAL
  ) as SharedInventorySlotData[]
  for (const [, data] of ipairs(bag)) {
    const link = stripLink(GetItemLink(data.bagId, data.slotIndex, LINK_STYLE_DEFAULT))
    let stack = 0
    const [backpack, bank, craftBag] = GetItemLinkStacks(link)
    let slotStorage = STATE.Account.storage[link]
    if (slotStorage === undefined) {
      slotStorage = {}
      STATE.Account.storage[link] = slotStorage
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
    let bagName = STATE.CurrentPlayer
    if (data.bagId === BAG_BANK || data.bagId === BAG_SUBSCRIBER_BANK) {
      bagName = LANG.en.bank
    }
    if (IsHouseBankBag(data.bagId)) {
      bagName = `${LANG.en.housebank}${data.bagId - 7}`
    }
    if (data.bagId === BAG_VIRTUAL) {
      bagName = LANG.en.craftbag
    }
    slotStorage[bagName] = stack
    if (stack === 0) {
      slotStorage[bagName] = undefined
    }
    const [itemType] = GetItemLinkItemType(link)
    if (RawItemTypes[itemType] === true && STATE.Account.materials[link] === undefined) {
      const refinedLink = stripLink(GetItemLinkRefinedMaterialItemLink(link, 0))
      STATE.Account.materials[link] = { raw: true, link: refinedLink }
      STATE.Account.materials[refinedLink] = { raw: false, link: link }
    } else if (DataValidation.isValidEquip(GetItemLinkEquipType(link))) {
      if (isLocked(data.bagId, data.slotIndex)) {
        updateStored("removed", data, false)
      } else {
        updateStored("added", data)
      }
    }
  }
  clearStorage()
}

export function removeCharacterStorage(char: string): undefined {
  for (const [, data] of pairs(STATE.Account.storage)) {
    if (data[char] !== undefined) {
      data[char] = undefined
    }
  }
  clearStorage()
}

function isItemSaverLoaded(
  fn: typeof ItemSaver_IsItemSaved
): fn is NonNullable<typeof ItemSaver_IsItemSaved> {
  return type(fn) === "function"
}

export function isLocked(bagId: number, slotIndex: number): boolean | undefined {
  if (!STATE.Account.options.lockprotection) {
    return false
  }

  const [, , , , infoLocked, equipType] = GetItemInfo(bagId, slotIndex)
  let locked: boolean | undefined = infoLocked

  if (!locked) {
    locked = IsItemPlayerLocked(bagId, slotIndex)
  }

  if (!locked && !STATE.Account.options.marksetitems) {
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
    const [, set] = asSaveResult(ItemSaver_IsItemSaved(bagId, slotIndex))
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

export function clearStorage(): undefined {
  pruneEmptyStorage(STATE.Account.storage)
}

export function storagePurge(): undefined {
  const account: Partial<AccountData> = STATE.Account
  delete account.storage
  delete account.materials
  const crafting: Partial<AccountData["crafting"]> = STATE.Account.crafting
  delete crafting.stored
  ReloadUI("ingame")
}

export function updateStored(
  action: string,
  data: SharedInventorySlotData,
  replace?: boolean
): undefined {
  if (!replace) {
    replace = false
  }
  const link = data.lnk
  let owner = STATE.CurrentPlayer
  const [craft, line, trait] = DataValidation.getTrait(link)
  if (craft === false || link === undefined) {
    return
  }
  function compareItem(
    craft: number,
    line: number,
    trait: number,
    q1: number,
    l1: number,
    v1: number
  ): boolean {
    const freshTable: unknown = {}
    if (nilCheck(STATE.Account.crafting.stored, {}, craft, line, trait) === freshTable) {
      return true
    }
    const entry = defined(defined(STATE.Account.crafting.stored[craft])[line])[trait]
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
        owner = LANG.en.bank
      }
      if (IsHouseBankBag(data.bagId)) {
        owner = LANG.en.housebank
      }
      if (data.bagId === BAG_GUILDBANK) {
        owner = LANG.en.guildbank
      }
      if (data.bagId === BAG_VIRTUAL) {
        owner = LANG.en.craftbag
      }
      if (
        !isLocked(data.bagId, data.slotIndex) &&
        compareItem(
          craft,
          line,
          trait,
          GetItemLinkQuality(link),
          GetItemLinkRequiredLevel(link),
          GetItemLinkRequiredChampionPoints(link)
        )
      ) {
        defined(defined(STATE.Account.crafting.stored[craft])[line])[trait] = {
          link: link,
          owner: owner,
          id: data.uid,
        }
      }
    }
    if (
      action === "removed" &&
      defined(defined(defined(STATE.Account.crafting.stored[craft])[line])[trait]).id === data.uid
    ) {
      defined(defined(STATE.Account.crafting.stored[craft])[line])[trait] = {}
      if (replace) {
        CALLBACK_MANAGER.FireCallbacks(CB_ADD_RESEARCH_ITEM, craft, line, trait)
      }
    }
    CALLBACK_MANAGER.FireCallbacks(CB_UPDATE_PANEL_ICON, craft, line, trait)
  }
}

export function isItemStoredForTemperCrafting(id: string): boolean {
  for (const [x, craft] of pairs(STATE.Account.crafting.stored)) {
    for (const [y, line] of pairs(craft)) {
      for (const [z, trait] of pairs(line)) {
        if (trait.id === id) {
          for (const [char, studies] of pairs(STATE.Account.crafting.studies)) {
            const researchedValue = STATE.Data.crafting.researched[char]?.[x]?.[y]?.[z]
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
