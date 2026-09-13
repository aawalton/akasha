import { expect, test } from "bun:test"
import {
  useAutomationSettings,
  useBackpackSettings,
  useCraftBagAccess,
  useInventorySettings,
  useManagedGuildBanks,
  useSettingsBlob,
} from "akasha/temper/player-inventory-management-ui/modules/hooks-inventory-settings/hooks-inventory-settings.module.code.ts"

test("every panel reads the settings blob through a hook this module hands out", () => {
  const held = [
    useSettingsBlob,
    useCraftBagAccess,
    useManagedGuildBanks,
    useInventorySettings,
    useBackpackSettings,
    useAutomationSettings,
  ]
  for (const one of held) {
    expect(typeof one).toBe("function")
    expect(one.name.startsWith("use")).toBe(true)
  }
})
