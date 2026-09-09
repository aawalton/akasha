import {
  HOUSE_BANK_BAGS,
  LOC_BANK,
  LOC_COMPANION_PREFIX,
  LOC_CRAFT_BAG,
  LOC_FURNITURE_VAULT,
  LOC_HOUSE_BANK_PREFIX,
  LOC_HOUSE_PREFIX,
} from "../inventory-constants/inventory-constants.module.code.ts"
export function getCharacterLocationKey(): string | undefined {
  const id = tostring(GetCurrentCharacterId())
  if (id === "" || id === "0") return undefined
  return id
}

export function getBankLocationKey(): string {
  return LOC_BANK
}

export function getCraftBagLocationKey(): string {
  return LOC_CRAFT_BAG
}

export function getGuildBankLocationKey(): string | undefined {
  const guildId = GetSelectedGuildBankId()
  if (guildId === undefined) return undefined
  const name = GetGuildName(guildId)
  if (name === "") return undefined
  return name
}

export function getChestDisplayName(collectibleId: number): string {
  const nickname = GetCollectibleNickname(collectibleId)
  if (nickname !== "") return nickname
  const name = zo_strformat("<<1>>", GetCollectibleName(collectibleId))
  return name !== "" ? name : "Storage Chest"
}

export function getHouseFurnishingsLocationKey(): string | undefined {
  const houseId = GetCurrentZoneHouseId()
  if (houseId <= 0 || !IsOwnerOfCurrentHouse()) return undefined
  const collectibleId = GetCollectibleIdForHouse(houseId)
  if (collectibleId <= 0) return undefined
  const name = GetCollectibleName(collectibleId)
  if (name === "") return undefined
  return `${LOC_HOUSE_PREFIX}${name}`
}

export function getCompanionLocationKey(): string | undefined {
  if (!HasActiveCompanion()) return undefined
  const companionId = GetActiveCompanionDefId()
  if (companionId <= 0) return undefined
  const rawName = GetCompanionName(companionId)
  if (rawName === "") return undefined
  const name = zo_strformat("<<1>>", rawName)
  return `${LOC_COMPANION_PREFIX}${name}`
}

export function isItemAtMoveToDestination(bagId: number, destination: string): boolean {
  if (destination.startsWith("character:")) {
    const charId = destination.substring("character:".length)
    return (
      (bagId === BAG_BACKPACK || bagId === BAG_WORN) && charId === tostring(GetCurrentCharacterId())
    )
  }
  if (destination === "bank") {
    return bagId === BAG_BANK || bagId === BAG_SUBSCRIBER_BANK
  }
  if (destination === "craft-bag") {
    return bagId === BAG_VIRTUAL
  }
  if (destination === "furniture-vault") {
    return bagId === BAG_FURNITURE_VAULT
  }
  if (destination.startsWith("house-storage:")) {
    const destCollectibleId = tonumber(destination.substring("house-storage:".length))
    if (destCollectibleId === undefined) return false
    for (const houseBag of HOUSE_BANK_BAGS) {
      if (bagId === houseBag) {
        return GetCollectibleForBag(bagId) === destCollectibleId
      }
    }
    return false
  }
  return false
}

export function getLocationKeyForBag(bagId: number): string | undefined {
  if (bagId === BAG_BACKPACK || bagId === BAG_WORN) {
    return getCharacterLocationKey()
  }
  if (bagId === BAG_BANK || bagId === BAG_SUBSCRIBER_BANK) {
    return getBankLocationKey()
  }
  if (bagId === BAG_VIRTUAL) {
    return getCraftBagLocationKey()
  }
  if (bagId === BAG_GUILDBANK) {
    return getGuildBankLocationKey()
  }
  if (bagId === BAG_COMPANION_WORN) {
    return getCompanionLocationKey()
  }
  if (bagId === BAG_FURNITURE_VAULT) {
    return LOC_FURNITURE_VAULT
  }
  for (const houseBag of HOUSE_BANK_BAGS) {
    if (bagId === houseBag) {
      const houseId = GetCurrentZoneHouseId()
      if (houseId <= 0 || !IsOwnerOfCurrentHouse()) return undefined
      const houseCollectibleId = GetCollectibleIdForHouse(houseId)
      if (houseCollectibleId <= 0) return undefined
      const chestCollectibleId = GetCollectibleForBag(bagId)
      if (chestCollectibleId <= 0) return undefined
      return `${LOC_HOUSE_BANK_PREFIX}${houseCollectibleId}:${chestCollectibleId}`
    }
  }
  return undefined
}
