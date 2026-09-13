import { expect, test } from "bun:test"
import { useSettingsBlob } from "akasha/temper/player-inventory-management-ui/modules/hooks-inventory-settings/hooks-inventory-settings.module.code.ts"

test("the settings blob hook is a function", () => {
  expect(typeof useSettingsBlob).toBe("function")
})
