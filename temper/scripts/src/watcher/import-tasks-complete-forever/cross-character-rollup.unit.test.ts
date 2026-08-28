import { describe, expect, mock, test } from "bun:test"
import { Page } from "@shared/pages-core/page-types"
import {
  ACTIVE_KEY,
  buildLua,
  COMPLETED_AT_S,
  CUMULATIVE_ID,
  crossProgress,
  cumulativeRow,
  fakeClient,
  loadRunImportTasks,
  USER_ID,
} from "./mocked-pages-access"

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

mock.module("@shared/pages-query", () => ({
  ASK_CEILING_MS: unreached("ASK_CEILING_MS"),
  PAGE_QUERY_BROWSER_PREFIX: unreached("PAGE_QUERY_BROWSER_PREFIX"),
  PAGE_QUERY_ORIGIN: unreached("PAGE_QUERY_ORIGIN"),
  WRITE_CEILING_MS: unreached("WRITE_CEILING_MS"),
  askNamed: unreached("askNamed"),
  askTaking: unreached("askTaking"),
  pageQueryOrigin: unreached("pageQueryOrigin"),
  patchPage: async (pageType: string, name: string, values: unknown) => {
    calls.push({ fn: "query.patchPage", args: { pageType, name, values } })
    return { ok: true as const, at: `${pageType}/${name}` }
  },
  patchPageIfMatch: unreached("patchPageIfMatch"),
  patchRow: unreached("patchRow"),
  patchRows: unreached("patchRows"),
  patchState: unreached("patchState"),
  readFromPageQueryService: unreached("readFromPageQueryService"),
  refusalIn: unreached("refusalIn"),
  removePage: unreached("removePage"),
  removeRow: unreached("removeRow"),
  writePage: unreached("writePage"),
  writeRow: async (pageType: string, parentName: string, values: unknown) => {
    calls.push({ fn: "query.writeRow", args: { pageType, parentName, values } })
    return { ok: true as const, at: `${pageType}/${parentName}` }
  },
  writeRows: unreached("writeRows"),
}))

function resetState(): undefined {
  calls.length = 0
}

function scriptPageReads(scripted: ReadonlyArray<{ rows: Rows }>): undefined {
  scriptedRows = scripted
  scriptIndex = 0
}

async function sweepDeletes(key: string, row: Record<string, unknown>): Promise<number> {
  resetState()
  scriptPageReads([{ rows: [row] }])
  const run = await loadRunImportTasks(key)
  await run(buildLua([]), fakeClient, { userId: USER_ID })
  return calls.filter((c) => c.fn === "softDeletePageById").length
}

describe("runImportTasks → cross-character rollup with a live activeEntryKey never authorises a delete", () => {
  test("REGRESSION GUARD: maxed rollup (192/192) that still names an activeEntryKey must NOT be soft-deleted", async () => {
    const deletes = await sweepDeletes("cc1", cumulativeRow(crossProgress(192, 192, ACTIVE_KEY)))
    expect(deletes).toBe(0)
  })

  test("maxed rollup with NO activeEntryKey is soft-deleted (the honest all-complete case)", async () => {
    const deletes = await sweepDeletes("cc2", cumulativeRow(crossProgress(192, 192)))
    expect(deletes).toBe(1)
  })

  test("below-cap rollup naming an activeEntryKey is NOT soft-deleted (unchanged)", async () => {
    const deletes = await sweepDeletes("cc3", cumulativeRow(crossProgress(147, 192, ACTIVE_KEY)))
    expect(deletes).toBe(0)
  })

  test("rollup whose entries value is not an object is NOT soft-deleted", async () => {
    const deletes = await sweepDeletes(
      "cc4",
      cumulativeRow({ current: 192, total: 192, entries: "not-an-object" })
    )
    expect(deletes).toBe(0)
  })

  test("live completion path: maxed rollup naming an activeEntryKey patches but does NOT soft-delete", async () => {
    resetState()
    scriptPageReads([{ rows: [cumulativeRow(crossProgress(192, 192, ACTIVE_KEY))] }, { rows: [] }])
    const run = await loadRunImportTasks("cc5")
    await run(buildLua([{ taskId: CUMULATIVE_ID, timestamp: COMPLETED_AT_S }]), fakeClient, {
      userId: USER_ID,
    })

    expect(calls.filter((c) => c.fn === "patchPageById").length).toBe(1)
    expect(calls.filter((c) => c.fn === "softDeletePageById").length).toBe(0)
  })
})
