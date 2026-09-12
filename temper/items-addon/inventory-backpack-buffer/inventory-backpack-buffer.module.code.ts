import { getInventoryConfig } from "akasha/temper/items-addon/inventory-config/inventory-config.module.code.ts"
import { DEFAULT_BACKPACK_SETTINGS } from "akasha/temper/items-core/backpack-settings-types/backpack-settings-types.module.code.ts"

const DEFAULT_BUFFER_SLOTS = DEFAULT_BACKPACK_SETTINGS.bufferSlots

export function getConfiguredBufferSlots(): number {
  return getInventoryConfig().backpack?.bufferSlots ?? DEFAULT_BUFFER_SLOTS
}

function backpackFreeSlotsAboveBuffer(): number {
  return GetNumBagFreeSlots(BAG_BACKPACK) - getConfiguredBufferSlots()
}

export function hasRoomAboveBuffer(slotsNeeded: number): boolean {
  return backpackFreeSlotsAboveBuffer() >= slotsNeeded
}
