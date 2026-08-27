import { asGlobalTable, asLakTable } from "./casts"
import { LAK_NAME, LAK_VERSION } from "./constants"
import { onLoad } from "./load"
import type { LakTable } from "./types"

export function installLibAddonKeybinds(this: void): undefined {
  const glob = asGlobalTable(globalThis)
  if (glob[LAK_NAME] !== undefined) {
    return undefined
  }

  const lak: LakTable = asLakTable({
    name: LAK_NAME,
    version: LAK_VERSION,
    showAddonKeybinds: false,
  })
  glob[LAK_NAME] = lak

  const keybindingManager: KeybindingManager | undefined =
    KEYBOARD_KEYBINDING_MANAGER ?? KEYBINDING_MANAGER
  if (keybindingManager === undefined) {
    error("libAddonKeybinds: KEYBINDING_MANAGER not found")
  }

  EVENT_MANAGER.UnregisterForEvent(LAK_NAME, EVENT_ADD_ON_LOADED)
  EVENT_MANAGER.RegisterForEvent(
    LAK_NAME,
    EVENT_ADD_ON_LOADED,
    (eventCode: number, addonName: string): undefined =>
      onLoad(lak, keybindingManager, eventCode, addonName)
  )
  return undefined
}
