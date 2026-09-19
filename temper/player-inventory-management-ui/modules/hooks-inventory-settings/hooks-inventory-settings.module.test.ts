import { expect, test } from "bun:test"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { heldFromRows } from "akasha/temper/items-rules-core/modules/inventory-rule-from-pages/inventory-rule-from-pages.module.code.ts"
import {
  isRulesUnreadWrite,
  RULES_UNREAD_WRITE,
  useAutomationSettings,
  useBackpackSettings,
  useCraftBagAccess,
  useInventorySettings,
  useManagedGuildBanks,
  useSettingsBlob,
} from "akasha/temper/player-inventory-management-ui/modules/hooks-inventory-settings/hooks-inventory-settings.module.code.ts"
import { sell } from "akasha/temper/progress/temper-item-action/pages/sell.temper-item-action.ts"
import { temperItemAction } from "akasha/temper/progress/temper-item-action/temper-item-action.page-type.ts"

const A_ROW = {
  slug: "rule-one",
  categoryId: "scripts",
  displayOrder: 3,
  action: `${temperItemAction.slug}/${sell.slug}`,
  active: true,
  updatedAt: "1970-01-01T00:00:00.000Z",
}

function saidFor(rows: readonly Record<string, unknown>[]): string {
  try {
    heldFromRows(rows)
    return "nothing was refused"
  } catch (thrown) {
    return saidBy(thrown)
  }
}

test("the words a reader is shown are the refusal's own, naming the rule", () => {
  const said = saidFor([{ ...A_ROW, conditions: [{ conditionField: "known" }] }])
  expect(said).toContain("rule `rule-one` is unread")
  expect(said).toContain("the rule would match more than it says")
})

test("a rule short of a key names the key a reader has to mend", () => {
  expect(saidFor([{ ...A_ROW, categoryId: undefined }])).toContain("states no `categoryId`")
})

test("rules that read cleanly say nothing was refused", () => {
  expect(saidFor([A_ROW])).toBe("nothing was refused")
})

test("a write refused for unread rules is told apart from a write that failed to save", () => {
  expect(isRulesUnreadWrite(new Error(RULES_UNREAD_WRITE))).toBe(true)
  expect(isRulesUnreadWrite(new Error("the network went away"))).toBe(false)
  expect(isRulesUnreadWrite(RULES_UNREAD_WRITE)).toBe(false)
  expect(isRulesUnreadWrite(undefined)).toBe(false)
})

test("what a reader is shown is text even where what was thrown is not an error", () => {
  expect(saidBy("a string was thrown")).toBe("a string was thrown")
  expect(saidBy(new Error("an error was thrown"))).toBe("an error was thrown")
})

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
