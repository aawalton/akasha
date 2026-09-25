import { expect, test } from "bun:test"
import { InventoryRuleSettingsShape } from "akasha/temper/items/rules/core/modules/inventory-rule-settings-shape/inventory-rule-settings-shape.module.code.ts"

const ONE_RULE = {
  version: 2,
  rules: [{ id: "a", categoryId: "weapons", action: "sell", active: true }],
}

test("settings carrying one rule are read", () => {
  const held = InventoryRuleSettingsShape.parse(ONE_RULE)
  expect(held.rules[0]?.id).toBe("a")
})

test("a rule saying nothing about being switched on is refused", () => {
  expect(() =>
    InventoryRuleSettingsShape.parse({
      version: 2,
      rules: [{ id: "a", categoryId: "weapons", action: "sell" }],
    })
  ).toThrow()
})

test("a version other than two is refused", () => {
  expect(() => InventoryRuleSettingsShape.parse({ ...ONE_RULE, version: 1 })).toThrow()
})

test("a rule carrying an action nobody declares is refused", () => {
  expect(() =>
    InventoryRuleSettingsShape.parse({
      version: 2,
      rules: [{ id: "a", categoryId: "weapons", action: "burn", active: true }],
    })
  ).toThrow()
})

test("a key written by a newer temper is carried through rather than refused", () => {
  const held = InventoryRuleSettingsShape.parse({
    version: 2,
    rules: [{ id: "a", categoryId: "weapons", action: "sell", active: true, laterKey: 9 }],
    laterSlice: { anything: true },
  })
  expect(held).toMatchObject({ laterSlice: { anything: true } })
  expect(held.rules[0]).toMatchObject({ laterKey: 9 })
})
