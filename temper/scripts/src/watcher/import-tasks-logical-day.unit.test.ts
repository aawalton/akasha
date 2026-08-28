import { describe, expect, mock, test } from "bun:test"
import { Page } from "@shared/pages-core/page-types"
import type { runImportTasks } from "./import-tasks"

type Call = { fn: string; args: unknown }

const calls: Call[] = []

type Rows = ReadonlyArray<Record<string, unknown>>

let scriptedRows: ReadonlyArray<{ rows: Rows }> = []
let scriptIndex = 0

function nextRows(): Rows {
  const entry = scriptedRows[scriptIndex] ?? { rows: [] }
  scriptIndex++
  return entry.rows
}

function unreached(name: string): () => never {
  return () => {
    throw new Error(`import-tasks.unit.test: ${name} is not stubbed and must not be reached`)
  }
}

mock.module("@shared/pages-access/get", () => ({
  getPage: unreached("getPage"),
  getPageByIdSuffix: unreached("getPageByIdSuffix"),
  getPageByIdSuffixAcrossTypes: unreached("getPageByIdSuffixAcrossTypes"),
  getPages: async (args: unknown) => {
    calls.push({ fn: "getPages", args })
    return { rows: nextRows().map((r) => Page(r)), nextCursor: null, count: null }
  },
  shapelessWhy: unreached("shapelessWhy"),
  unfiledWhy: unreached("unfiledWhy"),
}))

mock.module("@shared/pages-access/iterate", () => ({
  collectPages: async (args: unknown) => {
    calls.push({ fn: "collectPages", args })
    return nextRows().map((r) => Page(r))
  },
  streamPages: unreached("streamPages"),
}))

mock.module("@shared/pages-access/patch", () => ({
  patchPage: unreached("patchPage"),
  patchPageById: async (args: unknown) => {
    calls.push({ fn: "patchPageById", args })
    return Page({ id: "patched" })
  },
  patchPages: unreached("patchPages"),
  recordPageView: unreached("recordPageView"),
}))

mock.module("@shared/pages-access/delete", () => ({
  hardDeletePage: unreached("hardDeletePage"),
  hardDeletePageById: unreached("hardDeletePageById"),
  hardDeletePageByIds: unreached("hardDeletePageByIds"),
  hardDeletePages: unreached("hardDeletePages"),
  softDeletePage: unreached("softDeletePage"),
  softDeletePageById: async (args: unknown) => {
    calls.push({ fn: "softDeletePageById", args })
    return Page({ id: "deleted" })
  },
  softDeletePages: unreached("softDeletePages"),
  undeletePage: unreached("undeletePage"),
  undeletePageById: async (args: unknown) => {
    calls.push({ fn: "undeletePageById", args })
    return Page({ id: "undeleted" })
  },
  undeletePages: unreached("undeletePages"),
}))

mock.module("@shared/pages-access/upsert", () => ({
  bulkUpsertPages: unreached("bulkUpsertPages"),
  upsertPage: async (args: unknown) => {
    calls.push({ fn: "upsertPage", args })
    return Page({ id: "upserted" })
  },
  upsertPages: unreached("upsertPages"),
}))

// THESE SEVEN ARE THE REAL ONES ON PURPOSE, AND THE REST MUST NEVER BE. `mock.module` registers
// per process rather than per file, so this mock is also what `import-inventory.unit.test.ts`
// sees, and its subject reaches the real `askPage` in `@shared/pages-query/ask`, which imports
// `pageQueryOrigin` and `readFromPageQueryService` from this very module. That test installs its
// own `globalThis.fetch`, so those two answer off its stub rather than the network. Every other
// key here is a thrower naming itself: the page query service is deleted, and a key left bound
// to the real function would dial an origin with nothing behind it from inside a test run.
const realPagesQuery = await import("@shared/pages-query")

mock.module("@shared/pages-query", () => ({
  ASK_CEILING_MS: realPagesQuery.ASK_CEILING_MS,
  askNamed: unreached("askNamed"),
  askTaking: unreached("askTaking"),
  PAGE_QUERY_BROWSER_PREFIX: realPagesQuery.PAGE_QUERY_BROWSER_PREFIX,
  PAGE_QUERY_ORIGIN: realPagesQuery.PAGE_QUERY_ORIGIN,
  pageQueryOrigin: realPagesQuery.pageQueryOrigin,
  patchPage: async (pageType: string, name: string, values: unknown) => {
    calls.push({ fn: "query.patchPage", args: { pageType, name, values } })
    return { ok: true as const, at: `${pageType}/${name}` }
  },
  patchPageIfMatch: unreached("patchPageIfMatch"),
  patchRow: unreached("patchRow"),
  patchRows: unreached("patchRows"),
  patchState: unreached("patchState"),
  readFromPageQueryService: realPagesQuery.readFromPageQueryService,
  refusalIn: realPagesQuery.refusalIn,
  removePage: unreached("removePage"),
  removeRow: unreached("removeRow"),
  WRITE_CEILING_MS: realPagesQuery.WRITE_CEILING_MS,
  writePage: unreached("writePage"),
  writeRow: async (pageType: string, parentName: string, values: unknown) => {
    calls.push({ fn: "query.writeRow", args: { pageType, parentName, values } })
    return { ok: true as const, at: `${pageType}/${parentName}` }
  },
  writeRows: unreached("writeRows"),
}))

async function loadRunImportTasks(key: string): Promise<typeof runImportTasks> {
  const mod = await import(`./import-tasks?t=${Date.now()}-${key}`)
  return mod.runImportTasks
}

const USER_ID = "u1"
const RECURRING_ID = "11111111-1111-7000-8000-000000000002"
const COMPLETED_AT_S = 1_700_000_000
const COMPLETED_AT_MS = COMPLETED_AT_S * 1000
const COMPLETED_AT_ISO = new Date(COMPLETED_AT_MS).toISOString()
function buildLua(entries: ReadonlyArray<{ taskId: string; timestamp: number }>): string {
  const inner = entries
    .map(({ taskId, timestamp }) => `        ["${taskId}"] = ${timestamp},`)
    .join("\n")
  return `TemperCharacters_SavedVariables =
{
    ["Default"] =
    {
        ["@aawal"] =
        {
            ["$AccountWide"] =
            {
                ["completions"] =
                {
${inner}
                },
            },
        },
    },
}
`
}

function resetState(): undefined {
  calls.length = 0
}

function scriptPageReads(scripted: ReadonlyArray<{ rows: Rows }>): undefined {
  scriptedRows = scripted
  scriptIndex = 0
}

const fakeClient: Parameters<typeof runImportTasks>[1] = Object.create(null)

describe("runImportTasks → per-logical-day recurring idempotency (#12052)", () => {
  const SAME_DAY_LASTCOMPLETED_MS = Date.UTC(2023, 10, 14, 18, 0, 0)
  const DIFF_DAY_LASTCOMPLETED_MS = Date.UTC(2023, 10, 12, 18, 0, 0)

  test("skips when lastCompletedAt is the same ESO logical day", async () => {
    resetState()
    scriptPageReads([
      {
        rows: [
          {
            id: RECURRING_ID,
            slug: "recurring-task",
            title: "Recurring Task",
            rruleRule: "FREQ=DAILY",
            lastCompletedAt: SAME_DAY_LASTCOMPLETED_MS,
          },
        ],
      },
    ])

    const lua = buildLua([{ taskId: RECURRING_ID, timestamp: COMPLETED_AT_S }])
    const run = await loadRunImportTasks("sameday")
    await run(lua, fakeClient, { userId: USER_ID })

    expect(calls.filter((c) => c.fn === "patchPageById").length).toBe(0)
    expect(calls.filter((c) => c.fn === "softDeletePageById").length).toBe(0)
  })

  test("still advances when lastCompletedAt is a different ESO logical day", async () => {
    resetState()
    scriptPageReads([
      {
        rows: [
          {
            id: RECURRING_ID,
            slug: "recurring-task",
            title: "Recurring Task",
            rruleRule: "FREQ=DAILY",
            lastCompletedAt: DIFF_DAY_LASTCOMPLETED_MS,
          },
        ],
      },
      { rows: [] },
    ])

    const lua = buildLua([{ taskId: RECURRING_ID, timestamp: COMPLETED_AT_S }])
    const run = await loadRunImportTasks("diffday")
    await run(lua, fakeClient, { userId: USER_ID })

    const patches = calls.filter((c) => c.fn === "patchPageById")
    expect(patches.length).toBe(1)
    expect(patches[0]?.args).toMatchObject({
      pageTypeSlug: "temper-task",
      id: RECURRING_ID,
      set: { completedAt: null, lastCompletedAt: COMPLETED_AT_ISO },
    })
  })

  test("skips when a canonical ISO-string lastCompletedAt is the same ESO logical day", async () => {
    resetState()
    scriptPageReads([
      {
        rows: [
          {
            id: RECURRING_ID,
            slug: "recurring-task",
            title: "Recurring Task",
            rruleRule: "FREQ=DAILY",
            lastCompletedAt: new Date(SAME_DAY_LASTCOMPLETED_MS).toISOString(),
          },
        ],
      },
    ])

    const lua = buildLua([{ taskId: RECURRING_ID, timestamp: COMPLETED_AT_S }])
    const run = await loadRunImportTasks("samedayiso")
    await run(lua, fakeClient, { userId: USER_ID })

    expect(calls.filter((c) => c.fn === "patchPageById").length).toBe(0)
    expect(calls.filter((c) => c.fn === "softDeletePageById").length).toBe(0)
  })
})
