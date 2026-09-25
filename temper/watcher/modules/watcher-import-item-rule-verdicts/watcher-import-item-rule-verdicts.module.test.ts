import { expect, test } from "bun:test"
import type { RuleWrites } from "akasha/temper/items/rules/core/modules/inventory-rule-writes/inventory-rule-writes.module.code.ts"
import {
  itemRulePageOf,
  itemRulesFromRows,
} from "akasha/temper/items/rules/core/modules/item-rule-pages/item-rule-pages.module.code.ts"
import { temperAccount } from "akasha/temper/player/character/temper-account/temper-account.page-type.ts"
import {
  extractPendingSettingsMutations,
  type ItemRulesRead,
  parsePendingSettingsMutations,
  runImportItemRuleVerdicts,
  type VerdictImportLog,
  type VerdictRuleStore,
} from "akasha/temper/watcher/modules/watcher-import-item-rule-verdicts/watcher-import-item-rule-verdicts.module.code.ts"
import { knownUserSource } from "akasha/temper/watcher/modules/watcher-import-item-rule-verdicts/watcher-import-item-rule-verdicts.module.test-fixtures.ts"

const ACCOUNT = `${temperAccount.slug}/alan`

function verdictEntry(id: number, name: string, action: string): string {
  return `[${id}] =\n{\n["kind"] = "item-rule-verdict",\n["itemId"] = ${id},\n["itemName"] = "${name}",\n["action"] = "${action}",\n},`
}

function savedVariables(inner: string): string {
  return `TemperInventory_SavedVariables =\n{\n["Default"] =\n{\n${inner}\n},\n}\n`
}

function accountWith(key: string, outbox: string): string {
  return `["${key}"] =\n{\n["$AccountWide"] =\n{\n["pendingSettingsMutations"] =\n{\n${outbox}\n},\n},\n},`
}

function recordingLog(lines: string[]): VerdictImportLog {
  return {
    log: (message) => {
      lines.push(`INFO ${message}`)
    },
    logError: (message) => {
      lines.push(`ERROR ${message}`)
    },
  }
}

function fakeStore(read: ItemRulesRead, written: RuleWrites[]): VerdictRuleStore {
  return {
    read: async () => read,
    write: async (writes) => {
      written.push(writes)
    },
  }
}

function heldAs(rows: readonly Record<string, unknown>[]): ItemRulesRead {
  return { present: true, accountPage: ACCOUNT, rows }
}

function rulesWritten(written: readonly RuleWrites[]) {
  return itemRulesFromRows((written[0]?.upserts ?? []).map((one) => one.values))
}

test("a queued verdict list reads back as the verdicts the add-on wrote", () => {
  expect(
    JSON.stringify(
      parsePendingSettingsMutations([
        { kind: "item-rule-verdict", itemId: 123, itemName: "Foo", action: "sell" },
        { kind: "item-rule-verdict", itemId: 45, itemName: "Bar", action: "nothing" },
      ])
    )
  ).toBe(
    '{"found":2,"mutations":[{"kind":"item-rule-verdict","itemId":123,"itemName":"Foo","action":"sell"},{"kind":"item-rule-verdict","itemId":45,"itemName":"Bar","action":"nothing"}]}'
  )
})

test("a queue Lua wrote as a keyed table reads back in the order of those keys", () => {
  expect(
    JSON.stringify(
      parsePendingSettingsMutations({
        "1": { kind: "item-rule-verdict", itemId: 7, itemName: "Baz", action: "sell" },
        "2": { kind: "item-rule-verdict", itemId: 8, itemName: "Qux", action: "nothing" },
      })
    )
  ).toBe(
    '{"found":2,"mutations":[{"kind":"item-rule-verdict","itemId":7,"itemName":"Baz","action":"sell"},{"kind":"item-rule-verdict","itemId":8,"itemName":"Qux","action":"nothing"}]}'
  )
})

test("an entry the schema refuses is counted among those found and left out of the verdicts", () => {
  expect(
    JSON.stringify(
      parsePendingSettingsMutations([
        { kind: "item-rule-verdict", itemId: 1, itemName: "A", action: "sell" },
        { kind: "other", itemId: 2 },
      ])
    )
  ).toBe(
    '{"found":2,"mutations":[{"kind":"item-rule-verdict","itemId":1,"itemName":"A","action":"sell"}]}'
  )
})

test("an entry carrying a key the schema does not name is refused whole", () => {
  expect(
    JSON.stringify(
      parsePendingSettingsMutations([
        { kind: "item-rule-verdict", itemId: 1, itemName: "A", action: "sell", extra: true },
      ])
    )
  ).toBe('{"found":1,"mutations":[]}')
})

test("a fractional item id is refused", () => {
  expect(
    JSON.stringify(
      parsePendingSettingsMutations([
        { kind: "item-rule-verdict", itemId: 1.5, itemName: "A", action: "sell" },
      ])
    )
  ).toBe('{"found":1,"mutations":[]}')
})

test("an action other than sell or nothing is refused", () => {
  expect(
    JSON.stringify(
      parsePendingSettingsMutations([
        { kind: "item-rule-verdict", itemId: 1, itemName: "A", action: "burn" },
      ])
    )
  ).toBe('{"found":1,"mutations":[]}')
})

test("a value that is neither a list nor a table reads as nothing found", () => {
  for (const raw of [undefined, null, 5, "nope"]) {
    expect(JSON.stringify(parsePendingSettingsMutations(raw))).toBe('{"found":0,"mutations":[]}')
  }
})

test("the first account key carrying an account-wide table supplies the verdicts", () => {
  const content = savedVariables(
    accountWith(
      "@alan",
      `${verdictEntry(123, "Foo", "sell")}\n${verdictEntry(45, "Bar", "nothing")}`
    )
  )
  expect(JSON.stringify(extractPendingSettingsMutations(content))).toBe(
    '{"found":2,"mutations":[{"kind":"item-rule-verdict","itemId":45,"itemName":"Bar","action":"nothing"},{"kind":"item-rule-verdict","itemId":123,"itemName":"Foo","action":"sell"}]}'
  )
})

test("an account key not beginning with an at sign is skipped", () => {
  const content = savedVariables(
    `${accountWith("SomeChar", verdictEntry(999, "Wrong", "sell"))}\n${accountWith("@alan", verdictEntry(1, "Right", "sell"))}`
  )
  expect(JSON.stringify(extractPendingSettingsMutations(content))).toBe(
    '{"found":1,"mutations":[{"kind":"item-rule-verdict","itemId":1,"itemName":"Right","action":"sell"}]}'
  )
})

test("an at-key holding no account-wide table gives way to the next at-key", () => {
  const content = savedVariables(
    `["@empty"] =\n{\n["Other"] = 1,\n},\n${accountWith("@alan", verdictEntry(2, "Second", "nothing"))}`
  )
  expect(JSON.stringify(extractPendingSettingsMutations(content))).toBe(
    '{"found":1,"mutations":[{"kind":"item-rule-verdict","itemId":2,"itemName":"Second","action":"nothing"}]}'
  )
})

test("a file with no Default table reads as nothing found", () => {
  const content = `TemperInventory_SavedVariables =\n{\n["Other"] = {},\n}\n`
  expect(JSON.stringify(extractPendingSettingsMutations(content))).toBe(
    '{"found":0,"mutations":[]}'
  )
})

test("an account-wide table with no queue reads as nothing found", () => {
  const content = savedVariables(`["@alan"] =\n{\n["$AccountWide"] =\n{\n["other"] = 1,\n},\n},`)
  expect(JSON.stringify(extractPendingSettingsMutations(content))).toBe(
    '{"found":0,"mutations":[]}'
  )
})

test("a file without the inventory global raises", () => {
  expect(() => extractPendingSettingsMutations("")).toThrow(
    "Invalid SavedVariables format: missing TemperInventory_SavedVariables assignment"
  )
})

test("a queued verdict becomes an item rule page and the count is logged", async () => {
  const content = savedVariables(
    accountWith(
      "@alan",
      `${verdictEntry(123, "Foo", "sell")}\n${verdictEntry(45, "Bar", "nothing")}`
    )
  )
  const lines: string[] = []
  const written: RuleWrites[] = []
  await runImportItemRuleVerdicts(
    content,
    knownUserSource("user-1"),
    recordingLog(lines),
    fakeStore(heldAs([]), written)
  )
  expect(lines).toEqual([
    "INFO Item-rule verdicts: materialized 2/2 queued verdict(s) into item rule pages.",
  ])
  expect(rulesWritten(written).map((rule) => [rule.itemId, rule.action])).toEqual([
    [123, "sell"],
    [45, "nothing"],
  ])
  expect(written[0]?.upserts.every((one) => one.values.accountPage === ACCOUNT)).toBe(true)
})

test("an item rule page already saved for that item is overwritten rather than added beside", async () => {
  const content = savedVariables(accountWith("@alan", verdictEntry(123, "Renamed", "nothing")))
  const written: RuleWrites[] = []
  const held = itemRulePageOf(
    { id: "r1", itemId: 123, itemName: "Foo", action: "sell", active: true, updatedAt: 0 },
    ACCOUNT,
    0,
    0
  ).values
  await runImportItemRuleVerdicts(
    content,
    knownUserSource("user-1"),
    recordingLog([]),
    fakeStore(heldAs([held]), written)
  )
  expect(written[0]?.deletes).toEqual([])
  expect(written[0]?.upserts.map((one) => one.slug)).toEqual(["item-rule-r1"])
  const [rule] = rulesWritten(written)
  expect(rule?.itemName).toBe("Renamed")
  expect(rule?.action).toBe("nothing")
})

test("an item rule page that cannot be read raises and nothing is written", async () => {
  const content = savedVariables(accountWith("@alan", verdictEntry(123, "Foo", "sell")))
  const written: RuleWrites[] = []
  await expect(
    runImportItemRuleVerdicts(
      content,
      knownUserSource("user-1"),
      recordingLog([]),
      fakeStore(heldAs([{ slug: "item-rule-broken" }]), written)
    )
  ).rejects.toThrow("is unread")
  expect(written).toEqual([])
})

test("no page for the user leaves the rules unwritten and reports an error", async () => {
  const content = savedVariables(accountWith("@alan", verdictEntry(123, "Foo", "sell")))
  const lines: string[] = []
  const written: RuleWrites[] = []
  await runImportItemRuleVerdicts(
    content,
    knownUserSource("user-1"),
    recordingLog(lines),
    fakeStore({ present: false }, written)
  )
  expect(written).toEqual([])
  expect(lines).toEqual([
    "ERROR Item-rule verdicts: materialized 0/1 queued verdict(s) into item rule pages — no temper-account page for this user.",
  ])
})

test("an empty queue is reported without an error", async () => {
  const content = savedVariables(`["@alan"] =\n{\n["$AccountWide"] =\n{\n["other"] = 1,\n},\n},`)
  const lines: string[] = []
  await runImportItemRuleVerdicts(content, knownUserSource("user-1"), recordingLog(lines), {
    read: async () => {
      throw new Error("the store is not asked when the queue is empty")
    },
    write: async () => {
      throw new Error("the store is not asked when the queue is empty")
    },
  })
  expect(lines).toEqual([
    "INFO Item-rule verdicts: materialized 0/0 queued verdict(s) into item rule pages.",
  ])
})

test("a queue whose every entry is refused reports an error naming the discard", async () => {
  const content = savedVariables(
    `["@alan"] =\n{\n["$AccountWide"] =\n{\n["pendingSettingsMutations"] =\n{\n[1] =\n{\n["kind"] = "nope",\n},\n},\n},\n},`
  )
  const lines: string[] = []
  await runImportItemRuleVerdicts(content, knownUserSource("user-1"), recordingLog(lines), {
    read: async () => {
      throw new Error("the store is not asked when every entry is refused")
    },
    write: async () => {
      throw new Error("the store is not asked when every entry is refused")
    },
  })
  expect(lines).toEqual([
    "ERROR Item-rule verdicts: materialized 0/1 queued verdict(s) into item rule pages — every queued verdict was discarded.",
  ])
})

test("a queue keyed from four rather than from one reads back whole", () => {
  const entry = `[4] =\n{\n["kind"] = "item-rule-verdict",\n["itemId"] = 45855,\n["itemName"] = "Ancestor Silk",\n["action"] = "sell",\n},`
  const content = savedVariables(accountWith("@alan", entry))
  expect(JSON.stringify(extractPendingSettingsMutations(content))).toBe(
    '{"found":1,"mutations":[{"kind":"item-rule-verdict","itemId":45855,"itemName":"Ancestor Silk","action":"sell"}]}'
  )
})

test("a queue there holding nothing reads as nothing found", () => {
  expect(
    JSON.stringify(extractPendingSettingsMutations(savedVariables(accountWith("@alan", ""))))
  ).toBe('{"found":0,"mutations":[]}')
})

test("an entry missing a field the shape names is refused whole", () => {
  expect(
    JSON.stringify(
      parsePendingSettingsMutations([{ kind: "item-rule-verdict", itemName: "A", action: "sell" }])
    )
  ).toBe('{"found":1,"mutations":[]}')
})

test("an entry refused part way through the queue does not stop the entries after it", () => {
  const content = savedVariables(
    accountWith(
      "@alan",
      `${verdictEntry(1, "Ore", "nothing")}\n${verdictEntry(2, "Silk", "explode")}\n${verdictEntry(3, "Hagfish", "sell")}`
    )
  )
  expect(JSON.stringify(extractPendingSettingsMutations(content))).toBe(
    '{"found":3,"mutations":[{"kind":"item-rule-verdict","itemId":1,"itemName":"Ore","action":"nothing"},{"kind":"item-rule-verdict","itemId":3,"itemName":"Hagfish","action":"sell"}]}'
  )
})
