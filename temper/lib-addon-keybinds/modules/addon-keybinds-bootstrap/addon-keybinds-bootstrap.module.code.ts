import type { GlobalTable } from "akasha/temper/lib-addon-keybinds/modules/addon-keybinds-casts/addon-keybinds-casts.module.code.ts"
import { asLakTable } from "akasha/temper/lib-addon-keybinds/modules/addon-keybinds-casts/addon-keybinds-casts.module.code.ts"
import { onLoad } from "akasha/temper/lib-addon-keybinds/modules/addon-keybinds-load/addon-keybinds-load.module.code.ts"
import {
  LAK_NAME,
  LAK_VERSION,
} from "akasha/temper/lib-addon-keybinds/modules/addon-keybinds-names/addon-keybinds-names.module.code.ts"
import type { LakTable } from "akasha/temper/lib-addon-keybinds/modules/addon-keybinds-types/addon-keybinds-types.module.code.ts"

export function installLibAddonKeybinds(this: void): undefined {
  const glob = globalThis as GlobalTable
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
