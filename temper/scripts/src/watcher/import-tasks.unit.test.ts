import { describe, expect, mock, test } from "bun:test"
import { Page } from "@shared/pages-core/page-types"
import type { runImportTasks } from "./import-tasks.ts"
import {
  asPageTypeSlug,
  asPatchSet,
  asRawWhere,
  asWhereEntries,
  buildLua,
  COMPLETED_AT_ISO,
  COMPLETED_AT_MS,
  COMPLETED_AT_S,
  calls,
  ONE_OFF,
  ONE_OFF_ID,
  RECURRING_ID,
  resetState,
  USER_ID,
} from "./import-tasks.test-helpers.ts"

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

function scriptPageReads(scripted: ReadonlyArray<{ rows: Rows }>): undefined {
  scriptedRows = scripted
  scriptIndex = 0
}

const fakeClient: Parameters<typeof runImportTasks>[1] = Object.create(null)

describe("runImportTasks → applyCompletion (post-#8768 contract)", () => {
  test("one-off task (no rrule): patches completedAt then soft-deletes", async () => {
    resetState()
    scriptPageReads([{ rows: [{ ...ONE_OFF, rrule: null }] }, { rows: [] }])

    const lua = buildLua([{ taskId: ONE_OFF_ID, timestamp: COMPLETED_AT_S }])
    const run = await loadRunImportTasks("oneoff")
    await run(lua, fakeClient, { userId: USER_ID })

    const patches = calls.filter((c) => c.fn === "patchPageById")
    expect(patches.length).toBe(1)
    expect(patches[0]?.args).toMatchObject({
      pageTypeSlug: "temper-task",
      id: ONE_OFF_ID,
      set: { completedAt: COMPLETED_AT_ISO },
    })
    const upserts = calls.filter((c) => c.fn === "upsertPage")
    expect(upserts.length).toBe(0)
    const set = asPatchSet(patches[0]?.args)
    expect("dueAt" in set).toBe(false)
    expect("lastCompletedAt" in set).toBe(false)
    expect("pendingSync" in set).toBe(false)

    const deletes = calls.filter((c) => c.fn === "softDeletePageById")
    expect(deletes.length).toBe(1)
    expect(deletes[0]?.args).toMatchObject({
      pageTypeSlug: "temper-task",
      id: ONE_OFF_ID,
    })
  })

  test("recurring task: records the completion, rolls the due date, does NOT soft-delete", async () => {
    resetState()
    scriptPageReads([
      {
        rows: [
          {
            id: RECURRING_ID,
            slug: "recurring-task",
            title: "Recurring Task",
            rruleRule: "FREQ=DAILY",
            dueDate: "2023-11-14",
          },
        ],
      },
      { rows: [] },
      { rows: [{ id: "month-1" }] },
    ])

    const lua = buildLua([{ taskId: RECURRING_ID, timestamp: COMPLETED_AT_S }])
    const run = await loadRunImportTasks("r")
    await run(lua, fakeClient, { userId: USER_ID })

    const written = calls.filter((c) => c.fn === "query.writeRow")
    expect(written.length).toBe(1)
    expect(written[0]?.args).toMatchObject({
      pageType: "temper-completed-task",
      parentName: "2023-11",
    })

    const patches = calls.filter((c) => c.fn === "patchPageById")
    expect(patches.length).toBe(1)
    const set = asPatchSet(patches[0]?.args)
    expect(set).toMatchObject({ completedAt: null, lastCompletedAt: COMPLETED_AT_ISO })
    expect("dueDate" in set ? typeof set.dueDate : "missing").toBe("string")
    expect("pendingSync" in set).toBe(false)

    const deletes = calls.filter((c) => c.fn === "softDeletePageById")
    expect(deletes.length).toBe(0)
    const upserts = calls.filter((c) => c.fn === "upsertPage")
    expect(upserts.length).toBe(0)
  })

  test("idempotency: existing snapshot row → no patch and no soft-delete", async () => {
    resetState()
    scriptPageReads([
      { rows: [{ ...ONE_OFF, rrule: null }] },
      {
        rows: [
          {
            id: "snap-1",
            taskPageId: ONE_OFF_ID,
            completedAt: COMPLETED_AT_MS,
            userId: USER_ID,
          },
        ],
      },
    ])

    const lua = buildLua([{ taskId: ONE_OFF_ID, timestamp: COMPLETED_AT_S }])
    const run = await loadRunImportTasks("i")
    await run(lua, fakeClient, { userId: USER_ID })

    expect(calls.filter((c) => c.fn === "patchPageById").length).toBe(0)
    expect(calls.filter((c) => c.fn === "softDeletePageById").length).toBe(0)
    expect(calls.filter((c) => c.fn === "upsertPage").length).toBe(0)
  })

  test("idempotency lookup queries by (task, completedAt)", async () => {
    resetState()
    scriptPageReads([
      { rows: [{ ...ONE_OFF, rruleRule: null }] },
      { rows: [] },
      { rows: [{ id: "month-1" }] },
    ])

    const lua = buildLua([{ taskId: ONE_OFF_ID, timestamp: COMPLETED_AT_S }])
    const run = await loadRunImportTasks("q")
    await run(lua, fakeClient, { userId: USER_ID })

    const lookup = calls.find(
      (c) => c.fn === "getPages" && asPageTypeSlug(c.args) === "temper-completed-task"
    )
    expect(lookup).toBeDefined()
    const where = asWhereEntries(lookup?.args)
    const byKey = Object.fromEntries(where.map((w) => [w.key, w.eq]))
    expect(byKey.task).toBe("one-off-task")
    const rawWhere = asRawWhere(lookup?.args)
    const orCond = rawWhere.find(
      (w): w is { or: unknown[] } => w !== null && typeof w === "object" && "or" in w
    )
    expect(orCond?.or).toEqual([
      { key: "completedAt", eq: COMPLETED_AT_MS },
      { key: "completedAt", eq: COMPLETED_AT_ISO },
    ])
  })
})
