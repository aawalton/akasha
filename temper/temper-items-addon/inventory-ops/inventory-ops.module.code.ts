import { scanBag } from "../inventory-bag-scanner/inventory-bag-scanner.module.code.ts"
import {
  BANK_BAGS,
  HOUSE_BANK_BAGS,
  LOC_BANK,
  LOC_COMPANION_PREFIX,
  LOC_CRAFT_BAG,
  LOC_FURNITURE_VAULT,
  LOC_HOUSE_BANK_PREFIX,
  LOC_HOUSE_PREFIX,
  PERSONAL_BAGS,
} from "../inventory-constants/inventory-constants.module.code.ts"
import {
  extractItemData,
  resolvePriceSource,
} from "../inventory-item-data/inventory-item-data.module.code.ts"
import {
  getCharacterLocationKey,
  getChestDisplayName,
  getCompanionLocationKey,
  getGuildBankLocationKey,
  getLocationKeyForBag,
} from "../inventory-location-keys/inventory-location-keys.module.code.ts"
import { ensureLocation } from "../inventory-saved-variables/inventory-saved-variables.module.code.ts"
import { getDatabase } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
export function scanLocation(key: string, displayName: string, bags: number[]): undefined {
  const location = ensureLocation(key, displayName)
  for (const bagId of bags) {
    location.bags[bagId] = {}
  }
  for (const bagId of bags) {
    location.bags[bagId] = scanBag(bagId)
    const size = GetBagSize(bagId)
    if (size > 0) {
      location.bagSizes[bagId] = size
    }
  }
  location.lastScanned = GetTimeStamp()
}

export function updateSlot(bagId: number, slotIndex: number): undefined {
  const key = getLocationKeyForBag(bagId)
  if (key === undefined) return

  const db = getDatabase()
  const location = db.locations[key]
  if (!location) return

  if (!location.bags[bagId]) {
    location.bags[bagId] = {}
  }

  const item = extractItemData(bagId, slotIndex)
  if (item) {
    location.bags[bagId][slotIndex] = item
  } else {
    delete location.bags[bagId][slotIndex]
  }
}

export function scanPersonalBags(): undefined {
  const charId = getCharacterLocationKey()
  if (charId === undefined) return
  const charName = GetUnitName("player")
  scanLocation(charId, charName, PERSONAL_BAGS)
}

export function recordFullScan(): undefined {
  const meta = getDatabase().meta
  meta.lastFullScan = GetTimeStamp()
  meta.priceSource = resolvePriceSource()
}

export function scanBankBags(): undefined {
  scanLocation(LOC_BANK, LOC_BANK, BANK_BAGS)
}

export function scanCraftBag(): undefined {
  scanLocation(LOC_CRAFT_BAG, "Crafting Bag", [BAG_VIRTUAL])
}

export function scanCurrentGuildBank(): undefined {
  const key = getGuildBankLocationKey()
  if (key === undefined) return
  scanLocation(key, key, [BAG_GUILDBANK])
}

export function scanCompanionWorn(): undefined {
  const key = getCompanionLocationKey()
  if (key === undefined) return
  const displayName = string.sub(key, string.len(LOC_COMPANION_PREFIX) + 1)
  scanLocation(key, displayName, [BAG_COMPANION_WORN])
}

export function scanCurrentFurnitureVault(): undefined {
  scanLocation(LOC_FURNITURE_VAULT, "Furniture Vault", [BAG_FURNITURE_VAULT])
}

export function scanHouseBanks(): undefined {
  const houseId = GetCurrentZoneHouseId()
  if (houseId <= 0 || !IsOwnerOfCurrentHouse()) return
  const houseCollectibleId = GetCollectibleIdForHouse(houseId)
  if (houseCollectibleId <= 0) return

  const db = getDatabase()
  const perChestPrefix = `${LOC_HOUSE_BANK_PREFIX}${houseCollectibleId}:`

  const houseName = zo_strformat("<<1>>", GetCollectibleName(houseCollectibleId))
  const oldHouseKey = `${LOC_HOUSE_PREFIX}${houseName}`
  const oldHouseEntry = db.locations[oldHouseKey]
  if (oldHouseEntry !== undefined) {
    for (const houseBag of HOUSE_BANK_BAGS) {
      delete oldHouseEntry.bags[houseBag]
    }
  }

  const oldBankKey = `${LOC_HOUSE_BANK_PREFIX}${houseName}`
  delete db.locations[oldBankKey]

  for (const key of Object.keys(db.locations)) {
    if (key.startsWith(perChestPrefix)) {
      delete db.locations[key]
    }
  }

  for (const bagId of HOUSE_BANK_BAGS) {
    const chestCollectibleId = GetCollectibleForBag(bagId)
    if (chestCollectibleId <= 0) continue

    const rawChestName = GetCollectibleName(chestCollectibleId)
    if (rawChestName !== "") {
      delete db.locations[`${LOC_HOUSE_BANK_PREFIX}${rawChestName}`]
    }

    const key = `${LOC_HOUSE_BANK_PREFIX}${houseCollectibleId}:${chestCollectibleId}`
    const displayName = getChestDisplayName(chestCollectibleId)
    scanLocation(key, displayName, [bagId])
  }
}
