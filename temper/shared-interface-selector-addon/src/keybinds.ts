import { MAX_ADDON_LOAD_PACK_KEYBINDS } from "./constants"
import { loadPack } from "./packs"
import { getSavedVariables } from "./saved-variables"

function isValidSlot(slot: number): boolean {
  return slot >= 1 && slot <= MAX_ADDON_LOAD_PACK_KEYBINDS
}

export function loadPackByKeybind(slot: number): undefined {
  if (!isValidSlot(slot)) {
    return
  }
  const binding = getSavedVariables().packKeybinds[slot - 1]
  if (binding === undefined) {
    return
  }
  const packName = binding.packName
  const charName = binding.charName
  if (packName === undefined || packName === "") {
    return
  }
  loadPack(packName, charName ?? "")
}

export function assignPackToKeybind(slot: number, packName: string, charName: string): undefined {
  if (!isValidSlot(slot) || packName === "") {
    return
  }
  getSavedVariables().packKeybinds[slot - 1] = { packName, charName }
}

export function removePackFromKeybind(slot: number): undefined {
  if (!isValidSlot(slot)) {
    return
  }
  getSavedVariables().packKeybinds[slot - 1] = {}
}
