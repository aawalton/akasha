import { expect, test } from "bun:test"
import {
  EXPIRED_TOKEN_MESSAGE,
  type Fetching,
  runImportDataMining,
} from "./watcher-import-data-mining.module.code.ts"
import {
  CLEARED_ITEMS,
  GOOD_ITEMS,
  ITEM_IDS,
} from "./watcher-import-data-mining.module.test-fixtures.ts"

const QUESTS_URL = "https://example.test/api/watcher/upsert-mined-quests"

const EMPTY_ITEMS = ['                ["items"] =', "                {", "                },"].join(
  "\n"
)

const ODD_KEY_ITEMS = [
  '                ["items"] =',
  "                {",
  '                    ["abc"] =',
  "                    {",
  "                    },",
  "                },",
].join("\n")

const GOOD_QUESTS = [
  '                ["quests"] =',
  "                {",
  "                    [201] =",
  "                    {",
  '                        ["name"] = "A Quest",',
  '                        ["questType"] = 0,',
  '                        ["repeatableType"] = 0,',
  '                        ["zoneId"] = 3,',
  '                        ["zoneName"] = "Auridon",',
  "                    },",
  "                },",
].join("\n")

const MIXED_QUESTS = [
  '                ["quests"] =',
  "                {",
  "                    [201] =",
  "                    {",
  '                        ["name"] = "A Quest",',
  '                        ["questType"] = 0,',
  '                        ["repeatableType"] = 0,',
  '                        ["zoneId"] = 3,',
  '                        ["zoneName"] = "Auridon",',
  "                    },",
  "                    [202] =",
  "                    {",
  '                        ["name"] = "Half A Quest",',
  '                        ["questType"] = 0,',
  '                        ["repeatableType"] = 0,',
  '                        ["zoneId"] = 3,',
  "                    },",
  "                },",
].join("\n")

const CLEARED_QUESTS = ['                ["quests"] =', "                {},"].join("\n")

function fixture(itemsBlock: string, questsBlock: string): string {
  return [
    "TemperDataMining_SavedVariables =",
    "{",
    '    ["Default"] =',
    "    {",
    '        ["@tester"] =',
    "        {",
    '            ["$AccountWide"] =',
    "            {",
    '                ["version"] = 1,',
    itemsBlock,
    questsBlock,
    '                ["nextItemId"] = 102,',
    "            },",
    "        },",
    "    },",
    "}",
    "",
  ].join("\n")
}

function manyQuests(count: number): string {
  const rows: string[] = []
  for (let id = 1; id <= count; id++) {
    rows.push(
      `                    [${id}] =`,
      "                    {",
      `                        ["name"] = "Quest ${id}",`,
      '                        ["questType"] = 0,',
      '                        ["repeatableType"] = 0,',
      '                        ["zoneId"] = 3,',
      '                        ["zoneName"] = "Auridon",',
      "                    },"
    )
  }
  return ['                ["quests"] =', "                {", ...rows, "                },"].join(
    "\n"
  )
}

interface Sent {
  readonly url: string
  readonly wtToken: string
  readonly items: readonly Record<string, unknown>[]
}

function bodyOf(init: RequestInit): { wtToken: string; items: Sent["items"] } {
  return JSON.parse(String(init.body))
}

function recording(sent: Sent[], answer: () => Response): Fetching {
  return async (url, init) => {
    const body = bodyOf(init)
    sent.push({ url, wtToken: body.wtToken, items: body.items })
    return answer()
  }
}

function accepted(): Response {
  return new Response("{}", { status: 200 })
}

const FAST_RETRY = { sleep: async (): Promise<void> => {}, random: () => 0 }

async function thrownBy(answer: () => Response): Promise<string> {
  try {
    await runImportDataMining(
      fixture(EMPTY_ITEMS, GOOD_QUESTS),
      "https://example.test",
      "tok-123",
      {
        fetching: async () => answer(),
        retry: FAST_RETRY,
      }
    )
    return "nothing was thrown"
  } catch (thrown) {
    return thrown instanceof Error ? thrown.message : String(thrown)
  }
}

test("a quests block every entry was read from is written back empty", async () => {
  const sent: Sent[] = []
  const out = await runImportDataMining(
    fixture(EMPTY_ITEMS, GOOD_QUESTS),
    "https://example.test",
    "tok-123",
    { fetching: recording(sent, accepted) }
  )
  expect(out.content).toBe(fixture(EMPTY_ITEMS, CLEARED_QUESTS))
  expect(out.modified).toBe(true)
})

test("the posted body carries the token and every row read", async () => {
  const sent: Sent[] = []
  await runImportDataMining(fixture(EMPTY_ITEMS, GOOD_QUESTS), "https://example.test", "tok-123", {
    fetching: recording(sent, accepted),
  })
  expect(sent).toEqual([
    {
      url: QUESTS_URL,
      wtToken: "tok-123",
      items: [
        {
          questId: 201,
          name: "A Quest",
          questType: 0,
          repeatableType: 0,
          zoneId: 3,
          zoneName: "Auridon",
        },
      ],
    },
  ])
})

test("an empty block is posted nothing and is left as it was", async () => {
  const sent: Sent[] = []
  const out = await runImportDataMining(
    fixture(EMPTY_ITEMS, GOOD_QUESTS),
    "https://example.test",
    "tok-123",
    { fetching: recording(sent, accepted) }
  )
  expect(sent.map((one) => one.url)).toEqual([QUESTS_URL])
  expect(out.content).toContain(EMPTY_ITEMS)
})

test("a block holding an entry that cannot be read is left on disk", async () => {
  const sent: Sent[] = []
  const input = fixture(EMPTY_ITEMS, MIXED_QUESTS)
  const out = await runImportDataMining(input, "https://example.test", "tok-123", {
    fetching: recording(sent, accepted),
  })
  expect(out.content).toBe(input)
  expect(out.modified).toBe(false)
  expect(sent[0]?.items.map((one) => one.questId)).toEqual([201])
})

test("a key that is no integer leaves the items block on disk", async () => {
  const sent: Sent[] = []
  const input = fixture(ODD_KEY_ITEMS, GOOD_QUESTS)
  const out = await runImportDataMining(input, "https://example.test", "tok-123", {
    fetching: recording(sent, accepted),
  })
  expect(out.content).toBe(fixture(ODD_KEY_ITEMS, CLEARED_QUESTS))
  expect(out.notes[0]?.message).toBe(
    "items: posted 0, 1 non-integer key(s) (abc). Leaving the items block on disk — clearing it would destroy the entries this build cannot read, and the file is their only copy. The posted entries upsert by id, so re-posting them on the next run is harmless."
  )
})

test("rows are posted a thousand at a time", async () => {
  const sent: Sent[] = []
  await runImportDataMining(
    fixture(EMPTY_ITEMS, manyQuests(1001)),
    "https://example.test",
    "tok-123",
    { fetching: recording(sent, accepted) }
  )
  expect(sent.map((one) => one.items.length)).toEqual([1000, 1])
})

test("a block read whole says how many rows went up", async () => {
  const sent: Sent[] = []
  const out = await runImportDataMining(
    fixture(EMPTY_ITEMS, GOOD_QUESTS),
    "https://example.test",
    "tok-123",
    { fetching: recording(sent, accepted) }
  )
  expect(out.notes).toEqual([
    { level: "info", message: "quests: posted 1, read every entry — clearing block." },
  ])
})

test("an entry that could not be read is named with the reason it was refused", async () => {
  const sent: Sent[] = []
  const out = await runImportDataMining(
    fixture(EMPTY_ITEMS, MIXED_QUESTS),
    "https://example.test",
    "tok-123",
    { fetching: recording(sent, accepted) }
  )
  expect(out.notes.map((one) => one.level)).toEqual(["warning", "warning"])
  expect(out.notes[0]?.message).toStartWith("quests: posted 1, 1 unreadable (202).")
  expect(out.notes[1]?.message).toBe("    1× invalid_type at zoneName")
})

test("an answer of 401 is raised as the token being invalid or expired", async () => {
  expect(await thrownBy(() => new Response("{}", { status: 401 }))).toBe(EXPIRED_TOKEN_MESSAGE)
})

test("a 401 naming its own fault is still raised as the token being expired", async () => {
  const answer = (): Response =>
    new Response(JSON.stringify({ error: "token gone" }), { status: 401 })
  expect(await thrownBy(answer)).toBe(EXPIRED_TOKEN_MESSAGE)
})

test("the fault the server names is what is raised", async () => {
  const answer = (): Response => new Response(JSON.stringify({ error: "boom" }), { status: 500 })
  expect(await thrownBy(answer)).toBe("boom")
})

test("an answer naming no fault is raised as the status and the address asked", async () => {
  expect(await thrownBy(() => new Response("not json", { status: 500 }))).toBe(
    `HTTP 500 from ${QUESTS_URL}`
  )
})

test("a fault the server wrote as something other than text is raised as the status", async () => {
  const answer = (): Response => new Response(JSON.stringify({ error: 7 }), { status: 400 })
  expect(await thrownBy(answer)).toBe(`HTTP 400 from ${QUESTS_URL}`)
})

test("a network failure is raised naming the address asked", async () => {
  const failing: Fetching = async () => {
    throw new Error("connect ECONNREFUSED")
  }
  const run = runImportDataMining(
    fixture(EMPTY_ITEMS, GOOD_QUESTS),
    "https://example.test",
    "tok-123",
    { fetching: failing, retry: FAST_RETRY }
  )
  await expect(run).rejects.toThrow(`Network error calling ${QUESTS_URL}: connect ECONNREFUSED`)
})

test("a gateway failure is tried five times before it is raised", async () => {
  let attempts = 0
  const answer = (): Response => {
    attempts++
    return new Response("{}", { status: 503 })
  }
  expect(await thrownBy(answer)).toBe(`HTTP 503 from ${QUESTS_URL}`)
  expect(attempts).toBe(5)
})

const ITEMS_URL = "https://example.test/api/watcher/upsert-mined-items"

test("an items block every entry was read from goes to the items address and is emptied", async () => {
  const sent: Sent[] = []
  const out = await runImportDataMining(
    fixture(GOOD_ITEMS, CLEARED_QUESTS),
    "https://example.test",
    "tok-123",
    { fetching: recording(sent, accepted) }
  )
  expect(sent.map((one) => one.url)).toEqual([ITEMS_URL])
  expect(sent[0]?.items.map((one) => one.itemId)).toEqual([...ITEM_IDS])
  expect(out.content).toBe(fixture(CLEARED_ITEMS, CLEARED_QUESTS))
  expect(out.content).not.toContain("setBonuses")
})

test("a set bonus rides up in the row rather than being left on disk", async () => {
  const sent: Sent[] = []
  await runImportDataMining(
    fixture(GOOD_ITEMS, CLEARED_QUESTS),
    "https://example.test",
    "tok-123",
    {
      fetching: recording(sent, accepted),
    }
  )
  expect(sent[0]?.items[0]?.setBonuses).toEqual([
    { numRequired: 1, description: "Bonus 1", isPerfected: false },
    { numRequired: 2, description: "Bonus 2", isPerfected: false },
    { numRequired: 3, description: "Bonus 3", isPerfected: false },
    { numRequired: 5, description: "Bonus 4", isPerfected: false },
  ])
  expect(sent[0]?.items[0]).not.toHaveProperty("requiredCP")
  expect(sent[0]?.items[0]?.requiredCp).toBe(160)
})

test("a batch the server broke off once goes up again and the block still empties", async () => {
  const sent: Sent[] = []
  let broken = false
  const answer = (): Response => {
    if (broken) return accepted()
    broken = true
    return new Response(
      JSON.stringify({ error: "bulkUpsertPages: canceling statement due to statement timeout" }),
      { status: 500 }
    )
  }
  const out = await runImportDataMining(
    fixture(EMPTY_ITEMS, GOOD_QUESTS),
    "https://example.test",
    "tok-123",
    { fetching: recording(sent, answer), retry: FAST_RETRY }
  )
  expect(sent).toHaveLength(2)
  expect(out.content).toBe(fixture(EMPTY_ITEMS, CLEARED_QUESTS))
  expect(out.modified).toBe(true)
})

test("a run that threw leaves the file as it was, so the next run drains it", async () => {
  const input = fixture(EMPTY_ITEMS, GOOD_QUESTS)
  let failing = true
  const answer = (): Response =>
    failing ? new Response(JSON.stringify({ error: "boom" }), { status: 500 }) : accepted()

  const first: Sent[] = []
  await expect(
    runImportDataMining(input, "https://example.test", "tok-123", {
      fetching: recording(first, answer),
      retry: FAST_RETRY,
    })
  ).rejects.toThrow("boom")

  failing = false
  const second: Sent[] = []
  const out = await runImportDataMining(input, "https://example.test", "tok-123", {
    fetching: recording(second, answer),
  })
  expect(second[0]?.items.map((one) => one.questId)).toEqual([201])
  expect(out.content).toBe(fixture(EMPTY_ITEMS, CLEARED_QUESTS))
})
