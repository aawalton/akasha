import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { z } from "zod"
import { minedDataMiningLua, readableItem, readableQuest } from "../_mined-data-test-helpers"
import { runImportDataMining } from "./import-data-mining"

const SERVER_URL = "https://fabricated.invalid"
const WT_TOKEN = "fabricated-token"
const ITEMS_URL = `${SERVER_URL}/api/watcher/upsert-mined-items`
const QUESTS_URL = `${SERVER_URL}/api/watcher/upsert-mined-quests`

const postedBodySchema = z.object({
  wtToken: z.string(),
  items: z.array(z.record(z.string(), z.unknown())),
})

interface PostedBatch {
  readonly url: string
  readonly wtToken: string
  readonly items: readonly Record<string, unknown>[]
}

let posted: PostedBatch[] = []
let failUrls: ReadonlySet<string> = new Set()
let transientTimeouts: Map<string, number> = new Map()
let warnings: string[] = []

const realFetch = globalThis.fetch
const realWarn = console.warn
const realLog = console.log

function installFetchStub(): undefined {
  const handler = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === "string" ? input : input.toString()
    const body = postedBodySchema.parse(JSON.parse(String(init?.body ?? "{}")))
    posted.push({ url, wtToken: body.wtToken, items: body.items })
    const remainingTimeouts = transientTimeouts.get(url) ?? 0
    if (remainingTimeouts > 0) {
      transientTimeouts.set(url, remainingTimeouts - 1)
      return new Response(
        JSON.stringify({
          error: "bulkUpsertPages(temper-mined-item): canceling statement due to statement timeout",
        }),
        { status: 500 }
      )
    }
    if (failUrls.has(url)) {
      return new Response(JSON.stringify({ error: "fabricated upstream failure" }), { status: 500 })
    }
    return new Response(JSON.stringify({ ok: true, upserted: body.items.length }), { status: 200 })
  }
  globalThis.fetch = Object.assign(handler, { preconnect: () => {} })
}

function postedIds(url: string, key: "itemId" | "questId"): readonly number[] {
  return posted
    .filter((batch) => batch.url === url)
    .flatMap((batch) => batch.items.map((row) => z.number().parse(row[key])))
}

beforeEach(() => {
  posted = []
  failUrls = new Set()
  transientTimeouts = new Map()
  warnings = []
  installFetchStub()
  console.warn = (...args: readonly unknown[]): undefined => {
    warnings.push(args.map((a) => String(a)).join(" "))
  }
  console.log = (): undefined => undefined
})

afterEach(() => {
  globalThis.fetch = realFetch
  console.warn = realWarn
  console.log = realLog
})

describe("runImportDataMining — an all-readable file drains completely", () => {
  const content = minedDataMiningLua({
    items: [readableItem(700001), readableItem(700002), readableItem(700003)],
    quests: [readableQuest(800001), readableQuest(800002)],
  })

  it("replaces the items block with an empty table", async () => {
    const result = await runImportDataMining(content, SERVER_URL, WT_TOKEN)
    expect(result.content).toMatch(/\["items"\] =\r?\n\s*\{\},/)
  })

  it("replaces the quests block with an empty table", async () => {
    const result = await runImportDataMining(content, SERVER_URL, WT_TOKEN)
    expect(result.content).toMatch(/\["quests"\] =\r?\n\s*\{\},/)
  })

  it("leaves no trace of any entry id or its data", async () => {
    const result = await runImportDataMining(content, SERVER_URL, WT_TOKEN)
    for (const id of ["700001", "700002", "700003", "800001", "800002"]) {
      expect(result.content).not.toContain(id)
    }
    expect(result.content).not.toContain("setBonuses")
  })

  it("reports the content as modified so the caller writes it back", async () => {
    const result = await runImportDataMining(content, SERVER_URL, WT_TOKEN)
    expect(result.modified).toBe(true)
  })

  it("posts every item row and every quest row before clearing", async () => {
    await runImportDataMining(content, SERVER_URL, WT_TOKEN)
    expect(postedIds(ITEMS_URL, "itemId")).toEqual([700001, 700002, 700003])
    expect(postedIds(QUESTS_URL, "questId")).toEqual([800001, 800002])
  })

  it("keeps the surrounding siblings intact", async () => {
    const result = await runImportDataMining(content, SERVER_URL, WT_TOKEN)
    expect(result.content).toContain('["nextItemId"] = 900001,')
    expect(result.content).toContain('["version"] = 1,')
  })
})

describe("runImportDataMining — one unreadable entry preserves its block", () => {
  const content = minedDataMiningLua({
    items: [
      readableItem(700001),
      readableItem(700002, { malformedSetBonus: true }),
      readableItem(700003),
    ],
  })

  it("leaves the unreadable entry's id and data in the returned content", async () => {
    const result = await runImportDataMining(content, SERVER_URL, WT_TOKEN)
    expect(result.content).toContain("[700002] = ")
    expect(result.content).toContain("Fabricated Item 700002")
  })

  it("leaves the readable entries in place too — the block is kept whole", async () => {
    const result = await runImportDataMining(content, SERVER_URL, WT_TOKEN)
    expect(result.content).toContain("[700001] = ")
    expect(result.content).toContain("[700003] = ")
  })

  it("reports the content as unmodified when no block may be cleared", async () => {
    const result = await runImportDataMining(content, SERVER_URL, WT_TOKEN)
    expect(result.modified).toBe(false)
    expect(result.content).toBe(content)
  })

  it("still posts the rows it could read", async () => {
    await runImportDataMining(content, SERVER_URL, WT_TOKEN)
    expect(postedIds(ITEMS_URL, "itemId")).toEqual([700001, 700003])
  })

  it("names the unreadable id by value in the warning, not just a count", async () => {
    await runImportDataMining(content, SERVER_URL, WT_TOKEN)
    const joined = warnings.join("\n")
    expect(joined).toContain("700002")
    expect(joined).not.toContain("700001")
  })

  it("names the failing field in the warning so the cause is diagnosable", async () => {
    await runImportDataMining(content, SERVER_URL, WT_TOKEN)
    expect(warnings.join("\n")).toContain("setBonuses")
  })
})

describe("runImportDataMining — items and quests drain independently", () => {
  const content = minedDataMiningLua({
    items: [readableItem(700001), readableItem(700002, { unknownField: true })],
    quests: [readableQuest(800001), readableQuest(800002)],
  })

  it("drains the fully-readable quests block", async () => {
    const result = await runImportDataMining(content, SERVER_URL, WT_TOKEN)
    expect(result.content).toMatch(/\["quests"\] =\r?\n\s*\{\},/)
    expect(result.content).not.toContain("800001")
  })

  it("preserves the items block that carries the unreadable entry", async () => {
    const result = await runImportDataMining(content, SERVER_URL, WT_TOKEN)
    expect(result.content).toContain("[700002] = ")
    expect(result.content).toContain("[700001] = ")
  })

  it("reports modified, because one of the two blocks was cleared", async () => {
    const result = await runImportDataMining(content, SERVER_URL, WT_TOKEN)
    expect(result.modified).toBe(true)
  })

  it("posts both blocks' readable rows", async () => {
    await runImportDataMining(content, SERVER_URL, WT_TOKEN)
    expect(postedIds(ITEMS_URL, "itemId")).toEqual([700001])
    expect(postedIds(QUESTS_URL, "questId")).toEqual([800001, 800002])
  })
})

describe("runImportDataMining — a failed POST drains nothing", () => {
  const content = minedDataMiningLua({
    items: [readableItem(700001)],
    quests: [readableQuest(800001)],
  })

  it("throws when the item upsert fails", async () => {
    failUrls = new Set([ITEMS_URL])
    await expect(runImportDataMining(content, SERVER_URL, WT_TOKEN)).rejects.toThrow()
  })

  it("throws when the quest upsert fails after the item upsert succeeded", async () => {
    failUrls = new Set([QUESTS_URL])
    await expect(runImportDataMining(content, SERVER_URL, WT_TOKEN)).rejects.toThrow()
  })

  it("leaves the file re-importable — a later successful run still drains everything", async () => {
    failUrls = new Set([QUESTS_URL])
    await expect(runImportDataMining(content, SERVER_URL, WT_TOKEN)).rejects.toThrow()

    posted = []
    failUrls = new Set()
    const result = await runImportDataMining(content, SERVER_URL, WT_TOKEN)
    expect(postedIds(ITEMS_URL, "itemId")).toEqual([700001])
    expect(postedIds(QUESTS_URL, "questId")).toEqual([800001])
    expect(result.content).toMatch(/\["items"\] =\r?\n\s*\{\},/)
    expect(result.content).toMatch(/\["quests"\] =\r?\n\s*\{\},/)
  })
})

describe("runImportDataMining — a transient statement timeout is retried, not fatal", () => {
  const content = minedDataMiningLua({
    items: [readableItem(700001)],
    quests: [readableQuest(800001)],
  })

  it("retries the timed-out batch and completes the run", async () => {
    transientTimeouts = new Map([[ITEMS_URL, 1]])
    const result = await runImportDataMining(content, SERVER_URL, WT_TOKEN)

    expect(posted.filter((b) => b.url === ITEMS_URL)).toHaveLength(2)
    expect(postedIds(QUESTS_URL, "questId")).toEqual([800001])
    expect(result.content).toMatch(/\["items"\] =\r?\n\s*\{\},/)
    expect(result.content).toMatch(/\["quests"\] =\r?\n\s*\{\},/)
  })

  it("drains the file — a retried run is a successful run, not a partial one", async () => {
    transientTimeouts = new Map([[QUESTS_URL, 2]])
    const result = await runImportDataMining(content, SERVER_URL, WT_TOKEN)

    expect(result.modified).toBe(true)
    expect(posted.filter((b) => b.url === QUESTS_URL)).toHaveLength(3)
  })
})
