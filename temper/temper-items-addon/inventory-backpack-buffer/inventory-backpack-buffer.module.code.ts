import { DEFAULT_BACKPACK_SETTINGS } from "@akasha/temper-items-core/backpack-settings-types"
import { getInventoryConfig } from "../inventory-config/inventory-config.module.code.ts"
export const DEFAULT_BUFFER_SLOTS = DEFAULT_BACKPACK_SETTINGS.bufferSlots

export function getConfiguredBufferSlots(): number {
  return getInventoryConfig().backpack?.bufferSlots ?? DEFAULT_BUFFER_SLOTS
}

export function backpackFreeSlotsAboveBuffer(): number {
  return GetNumBagFreeSlots(BAG_BACKPACK) - getConfiguredBufferSlots()
}

export function hasRoomAboveBuffer(slotsNeeded: number): boolean {
  return backpackFreeSlotsAboveBuffer() >= slotsNeeded
}
