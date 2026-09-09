import { describe, expect, test } from "bun:test"
import { inventorySettings } from "./inventory-settings-handle.module.code.ts"

describe("inventorySettings", () => {
  test("hands over reading and writing together", async () => {
    const handle = await inventorySettings()
    expect(Object.keys(handle).sort()).toEqual([
      "read",
      "readAutomation",
      "write",
      "writeAutomation",
    ])
  })

  test("every operation on the handle is callable", async () => {
    const handle = await inventorySettings()
    expect(typeof handle.read).toBe("function")
    expect(typeof handle.write).toBe("function")
    expect(typeof handle.readAutomation).toBe("function")
    expect(typeof handle.writeAutomation).toBe("function")
  })
})
