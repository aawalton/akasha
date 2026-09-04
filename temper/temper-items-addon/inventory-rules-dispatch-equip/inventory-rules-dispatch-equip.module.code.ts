import type { ItemAction } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import {
  clearPendingAction,
  forEachPendingAction,
} from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { reportAction } from "../inventory-rules-core-report/inventory-rules-core-report.module.code.ts"
export const MAX_OPS = 50
export const FRAME_DELAY = 200
export let equipGeneration = 0

export function equipSlotPriority(slot: number): number {
  if (slot === EQUIP_SLOT_BACKUP_MAIN) return 0
  if (slot === EQUIP_SLOT_BACKUP_OFF) return 1
  if (slot === EQUIP_SLOT_MAIN_HAND) return 2
  if (slot === EQUIP_SLOT_OFF_HAND) return 3
  if (slot === EQUIP_SLOT_NECK) return 4
  if (slot === EQUIP_SLOT_RING1) return 5
  if (slot === EQUIP_SLOT_RING2) return 6
  if (slot === EQUIP_SLOT_LEGS) return 7
  if (slot === EQUIP_SLOT_HAND) return 8
  if (slot === EQUIP_SLOT_SHOULDERS) return 9
  if (slot === EQUIP_SLOT_HEAD) return 10
  if (slot === EQUIP_SLOT_CHEST) return 11
  if (slot === EQUIP_SLOT_WAIST) return 12
  if (slot === EQUIP_SLOT_FEET) return 13
  return 99
}

export function resolveEquipSlot(itemLink: string): number | undefined {
  const equipType = GetItemLinkEquipType(itemLink)
  if (equipType === EQUIP_TYPE_HEAD) return EQUIP_SLOT_HEAD
  if (equipType === EQUIP_TYPE_CHEST) return EQUIP_SLOT_CHEST
  if (equipType === EQUIP_TYPE_SHOULDERS) return EQUIP_SLOT_SHOULDERS
  if (equipType === EQUIP_TYPE_HAND) return EQUIP_SLOT_HAND
  if (equipType === EQUIP_TYPE_WAIST) return EQUIP_SLOT_WAIST
  if (equipType === EQUIP_TYPE_LEGS) return EQUIP_SLOT_LEGS
  if (equipType === EQUIP_TYPE_FEET) return EQUIP_SLOT_FEET
  if (equipType === EQUIP_TYPE_NECK) return EQUIP_SLOT_NECK
  if (equipType === EQUIP_TYPE_RING) return EQUIP_SLOT_RING1
  if (equipType === EQUIP_TYPE_MAIN_HAND) return EQUIP_SLOT_MAIN_HAND
  if (equipType === EQUIP_TYPE_ONE_HAND) return EQUIP_SLOT_MAIN_HAND
  if (equipType === EQUIP_TYPE_TWO_HAND) return EQUIP_SLOT_MAIN_HAND
  if (equipType === EQUIP_TYPE_OFF_HAND) return EQUIP_SLOT_OFF_HAND
  return undefined
}

export interface EquipEntry {
  bagId: number
  slotIndex: number
  action: ItemAction
  destination: string
  itemLink: string
  equipSlot: number
}

export function dispatchEquipActions(): undefined {
  equipGeneration++
  const gen = equipGeneration
  const currentCharId = tostring(GetCurrentCharacterId())

  const items: EquipEntry[] = []

  let activeCompanionDest: string | undefined
  if (HasActiveCompanion()) {
    const activeId = GetActiveCompanionDefId()
    const activeName = zo_strformat("<<1>>", GetCompanionName(activeId))
    activeCompanionDest = `companion-worn:${activeName}`
  }

  const claimedSlots = new LuaMap<string, true>()

  forEachPendingAction(function (this: void, bagId, slotIndex, action, destination): undefined {
    if (action !== "character-equip" && action !== "companion-equip") return
    if (bagId !== BAG_BACKPACK) return
    if (destination === undefined) return
    if (items.length >= MAX_OPS) return

    if (action === "companion-equip" && destination !== activeCompanionDest) return

    if (action === "character-equip") {
      const charId = destination.slice("character-worn:".length)
      if (charId !== currentCharId) return
    }

    const itemLink = GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS)
    let equipSlot = resolveEquipSlot(itemLink)
    if (equipSlot === undefined) return

    const slotKey = `${destination}:${equipSlot}`
    if (claimedSlots.has(slotKey)) {
      if (equipSlot === EQUIP_SLOT_RING1) {
        const ring2Key = `${destination}:${EQUIP_SLOT_RING2}`
        if (claimedSlots.has(ring2Key)) return
        claimedSlots.set(ring2Key, true)
        equipSlot = EQUIP_SLOT_RING2
      } else if (
        equipSlot === EQUIP_SLOT_MAIN_HAND &&
        GetItemLinkEquipType(itemLink) === EQUIP_TYPE_ONE_HAND
      ) {
        const offHandKey = `${destination}:${EQUIP_SLOT_OFF_HAND}`
        if (claimedSlots.has(offHandKey)) return
        claimedSlots.set(offHandKey, true)
        equipSlot = EQUIP_SLOT_OFF_HAND
      } else {
        return
      }
    } else {
      claimedSlots.set(slotKey, true)
    }

    items.push({ bagId, slotIndex, action, destination, itemLink, equipSlot })
  })

  if (items.length === 0) return

  items.sort((a, b) => equipSlotPriority(a.equipSlot) - equipSlotPriority(b.equipSlot))

  d(`[${ADDON_NAME}] Dispatching ${items.length} equip actions`)

  const companionItems = items.filter((item) => item.action === "companion-equip")
  const characterItems = items.filter((item) => item.action === "character-equip")

  const slotsToUnequip: number[] = []
  for (const item of companionItems) {
    const wornLink = GetItemLink(BAG_COMPANION_WORN, item.equipSlot, LINK_STYLE_BRACKETS)
    if (wornLink !== "") {
      slotsToUnequip.push(item.equipSlot)
    }
  }

  let phase1Ops = 0
  for (let i = 0; i < slotsToUnequip.length; i++) {
    const slot = slotsToUnequip[i]
    const delay = i * FRAME_DELAY
    zo_callLater(function (this: void): undefined {
      if (gen !== equipGeneration) return
      d(`[${ADDON_NAME}] RequestUnequipItem(${BAG_COMPANION_WORN}, ${slot})`)
      RequestUnequipItem(BAG_COMPANION_WORN, slot)
    }, delay)
    phase1Ops++
  }

  const phase2Start = phase1Ops * FRAME_DELAY
  const equippedLinks: string[] = []

  for (const [i, item] of characterItems.entries()) {
    const delay = i * FRAME_DELAY
    zo_callLater(function (this: void): undefined {
      if (gen !== equipGeneration) return
      const result = equipItem(item, currentCharId)
      if (result) equippedLinks.push(item.itemLink)
    }, delay)
  }

  for (const [i, item] of companionItems.entries()) {
    const delay = phase2Start + i * FRAME_DELAY
    zo_callLater(function (this: void): undefined {
      if (gen !== equipGeneration) {
        d(`[${ADDON_NAME}] Equip aborted: generation changed`)
        return
      }
      const result = equipItem(item, currentCharId)
      if (result) equippedLinks.push(item.itemLink)
    }, delay)
  }

  const totalOps = Math.max(characterItems.length, phase1Ops + companionItems.length)
  const reportDelay = totalOps * FRAME_DELAY
  zo_callLater(function (this: void): undefined {
    if (gen !== equipGeneration) return
    if (equippedLinks.length > 0) {
      reportAction("Equipped", equippedLinks)
    }
  }, reportDelay)
}

export function equipItem(item: EquipEntry, currentCharId: string): boolean {
  const [stackCount] = GetSlotStackSize(item.bagId, item.slotIndex)
  if (stackCount === 0) {
    d(`[${ADDON_NAME}] Equip skip: slot ${item.slotIndex} empty`)
    clearPendingAction(item.bagId, item.slotIndex)
    return false
  }

  const itemLink = GetItemLink(item.bagId, item.slotIndex, LINK_STYLE_BRACKETS)

  if (itemLink !== item.itemLink) {
    d(`[${ADDON_NAME}] Equip skip: slot ${item.slotIndex} item changed`)
    clearPendingAction(item.bagId, item.slotIndex)
    return false
  }

  let targetBag: number

  if (item.action === "character-equip") {
    const charId = item.destination.slice("character-worn:".length)
    if (charId !== currentCharId) return false
    targetBag = BAG_WORN
  } else {
    if (!HasActiveCompanion()) {
      d(`[${ADDON_NAME}] Equip skip: no active companion`)
      return false
    }
    const companionName = item.destination.slice("companion-worn:".length)
    const activeId = GetActiveCompanionDefId()
    const activeName = zo_strformat("<<1>>", GetCompanionName(activeId))
    if (activeName !== companionName) {
      d(`[${ADDON_NAME}] Equip skip: wrong companion (${activeName} != ${companionName})`)
      return false
    }
    targetBag = BAG_COMPANION_WORN
  }

  d(
    `[${ADDON_NAME}] RequestEquipItem(${item.bagId}, ${item.slotIndex}, ${targetBag}, ${item.equipSlot})`
  )
  RequestEquipItem(item.bagId, item.slotIndex, targetBag, item.equipSlot)
  clearPendingAction(item.bagId, item.slotIndex)
  return true
}
