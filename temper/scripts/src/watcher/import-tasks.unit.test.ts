import { afterAll, describe, expect, mock, test } from "bun:test"
import { makePagesAccessMock } from "@shared/pages-access/test-support"
import type { runImportTasks } from "./import-tasks"
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
} from "./import-tasks.test-helpers"

const realPagesAccess = await import("@shared/pages-access")
const realPagesQuery = await import("@shared/pages-query")
const realPage = realPagesAccess.Page
const realApplySelect = realPagesAccess.applySelect
const realFlattenRow = realPagesAccess.flattenRow
const realIsPromotedKey = realPagesAccess.isPromotedKey
const realTryExtractIdEq = realPagesAccess.tryExtractIdEq
const realGetSequenceConfig = realPagesAccess.getSequenceConfig
const realParsePageSeq = realPagesAccess.parsePageSeq
const realGetPage = realPagesAccess.getPage
const realGetPages = realPagesAccess.getPages
const realPromotedColumn = realPagesAccess.PROMOTED_COLUMN
const realCollectPages = realPagesAccess.collectPages
const realPatchPageById = realPagesAccess.patchPageById
const realSoftDeletePageById = realPagesAccess.softDeletePageById
const realUpsertPage = realPagesAccess.upsertPage

let currentGetPages: typeof realGetPages = realGetPages
let currentCollectPages: typeof realCollectPages = realCollectPages
let currentPatchPageById: typeof realPatchPageById = realPatchPageById
let currentSoftDeletePageById: typeof realSoftDeletePageById = realSoftDeletePageById
let currentUpsertPage: typeof realUpsertPage = realUpsertPage
let mockInstalled = false

afterAll(() => {
  currentGetPages = realGetPages
  currentCollectPages = realCollectPages
  currentPatchPageById = realPatchPageById
  currentSoftDeletePageById = realSoftDeletePageById
  currentUpsertPage = realUpsertPage
})

currentPatchPageById = async (args) => {
  calls.push({ fn: "patchPageById", args })
  return realPage({ id: "patched" })
}
currentSoftDeletePageById = async (args) => {
  calls.push({ fn: "softDeletePageById", args })
  return realPage({ id: "deleted" })
}
currentUpsertPage = async (args) => {
  calls.push({ fn: "upsertPage", args })
  return realPage({ id: "upserted" })
}

async function loadRunImportTasks(key: string): Promise<typeof runImportTasks> {
  if (!mockInstalled) {
    mockInstalled = true

    const pagesAccessMock = makePagesAccessMock({
      Page: realPage,
      collectPages: (...args: Parameters<typeof realCollectPages>) => currentCollectPages(...args),
      getPages: (...args: Parameters<typeof realGetPages>) => currentGetPages(...args),
      patchPageById: (...args: Parameters<typeof realPatchPageById>) =>
        currentPatchPageById(...args),
      softDeletePageById: (...args: Parameters<typeof realSoftDeletePageById>) =>
        currentSoftDeletePageById(...args),
      undeletePageById: async (args: unknown) => {
        calls.push({ fn: "undeletePageById", args })
        return realPage({ id: "undeleted" })
      },
    })

    mock.module("@shared/pages-access", () => ({
      applySelect: realApplySelect,
      bulkUpsertPages: pagesAccessMock.bulkUpsertPages,
      captureError: pagesAccessMock.captureError,
      collectPages: (...args: Parameters<typeof realCollectPages>) => currentCollectPages(...args),
      comparePageSeq: realPagesAccess.comparePageSeq,
      completePage: pagesAccessMock.completePage,
      createPage: realPagesAccess.createPage,
      createPageIfAbsent: realPagesAccess.createPageIfAbsent,
      createPageType: pagesAccessMock.createPageType,
      DETAIL_CONFIG_KEY: realPagesAccess.DETAIL_CONFIG_KEY,
      detailConfigFor: realPagesAccess.detailConfigFor,
      extractRelationContainment: pagesAccessMock.extractRelationContainment,
      flattenRow: realFlattenRow,
      getDescendantPageTypeSlugs: pagesAccessMock.getDescendantPageTypeSlugs,
      getDetailConfig: realPagesAccess.getDetailConfig,
      getFileDetailConfig: realPagesAccess.getFileDetailConfig,
      getMediaConfig: pagesAccessMock.getMediaConfig,
      getOrderedChildren: pagesAccessMock.getOrderedChildren,
      getOrderedNeighbors: pagesAccessMock.getOrderedNeighbors,
      getPage: realGetPage,
      getPageByIdSuffix: pagesAccessMock.getPageByIdSuffix,
      getPageByIdSuffixAcrossTypes: pagesAccessMock.getPageByIdSuffixAcrossTypes,
      getPageTypeByPluralSlug: pagesAccessMock.getPageTypeByPluralSlug,
      getPageTypeBySlug: realPagesAccess.getPageTypeBySlug,
      getPageTypeIdBySlug: realPagesAccess.getPageTypeIdBySlug,
      getPageTypeIdsBySlugs: realPagesAccess.getPageTypeIdsBySlugs,
      getPages: (...args: Parameters<typeof realGetPages>) => currentGetPages(...args),
      getPagesByRelation: pagesAccessMock.getPagesByRelation,
      getPagesForView: pagesAccessMock.getPagesForView,
      getPropertyDefinitions: realPagesAccess.getPropertyDefinitions,
      getSequenceConfig: realGetSequenceConfig,
      hardDeletePage: realPagesAccess.hardDeletePage,
      hardDeletePageById: pagesAccessMock.hardDeletePageById,
      hardDeletePageByIds: pagesAccessMock.hardDeletePageByIds,
      hardDeletePages: realPagesAccess.hardDeletePages,
      isPromotedKey: realIsPromotedKey,
      NEVER_MATCH_SLUG: pagesAccessMock.NEVER_MATCH_SLUG,
      NEVER_MATCH_VALUE: pagesAccessMock.NEVER_MATCH_VALUE,
      Page: realPage,
      PageTypeSlug: realPagesAccess.PageTypeSlug,
      PageTypesMissing: realPagesAccess.PageTypesMissing,
      PageTypesUnread: realPagesAccess.PageTypesUnread,
      PageWriteError: realPagesAccess.PageWriteError,
      parsePageSeq: realParsePageSeq,
      patchPage: realPagesAccess.patchPage,
      patchPageById: (...args: Parameters<typeof realPatchPageById>) =>
        currentPatchPageById(...args),
      patchPages: realPagesAccess.patchPages,
      patchPageTypeById: pagesAccessMock.patchPageTypeById,
      patchPropertyDefinitionById: pagesAccessMock.patchPropertyDefinitionById,
      PROMOTED_COLUMN: realPromotedColumn,
      PROMOTED_COLUMN_KEYS: realPagesAccess.PROMOTED_COLUMN_KEYS,
      recordPageView: pagesAccessMock.recordPageView,
      reschedulePage: pagesAccessMock.reschedulePage,
      softDeletePage: realPagesAccess.softDeletePage,
      softDeletePageById: (...args: Parameters<typeof realSoftDeletePageById>) =>
        currentSoftDeletePageById(...args),
      softDeletePages: realPagesAccess.softDeletePages,
      streamPages: realPagesAccess.streamPages,
      tryExtractIdEq: realTryExtractIdEq,
      uncompletePage: pagesAccessMock.uncompletePage,
      undeletePage: pagesAccessMock.undeletePage,
      undeletePageById: pagesAccessMock.undeletePageById,
      undeletePages: pagesAccessMock.undeletePages,
      upsertPage: (...args: Parameters<typeof realUpsertPage>) => currentUpsertPage(...args),
      upsertPages: realPagesAccess.upsertPages,
    }))

    mock.module("@shared/pages-query", () => ({
      AnswerSchema: realPagesQuery.AnswerSchema,
      ASK_CEILING_MS: realPagesQuery.ASK_CEILING_MS,
      askNamed: realPagesQuery.askNamed,
      askTaking: realPagesQuery.askTaking,
      PAGE_QUERY_BROWSER_PREFIX: realPagesQuery.PAGE_QUERY_BROWSER_PREFIX,
      PAGE_QUERY_ORIGIN: realPagesQuery.PAGE_QUERY_ORIGIN,
      pageQueryOrigin: realPagesQuery.pageQueryOrigin,
      patchPage: async (pageType: string, name: string, values: unknown) => {
        calls.push({ fn: "query.patchPage", args: { pageType, name, values } })
        return { ok: true, at: `${pageType}/${name}` }
      },
      patchPageIfMatch: realPagesQuery.patchPageIfMatch,
      patchRow: realPagesQuery.patchRow,
      patchRows: realPagesQuery.patchRows,
      patchState: realPagesQuery.patchState,
      readFromPageQueryService: realPagesQuery.readFromPageQueryService,
      refusalIn: realPagesQuery.refusalIn,
      removePage: realPagesQuery.removePage,
      removeRow: realPagesQuery.removeRow,
      WRITE_ATTEMPTS: realPagesQuery.WRITE_ATTEMPTS,
      WRITE_CEILING_MS: realPagesQuery.WRITE_CEILING_MS,
      writePage: realPagesQuery.writePage,
      writeRow: async (pageType: string, parentName: string, values: unknown) => {
        calls.push({ fn: "query.writeRow", args: { pageType, parentName, values } })
        return { ok: true, at: `${pageType}/${parentName}` }
      },
      writeRows: realPagesQuery.writeRows,
    }))
  }
  const mod = await import(`./import-tasks?t=${Date.now()}-${key}`)
  return mod.runImportTasks
}

function scriptPageReads(
  scripted: ReadonlyArray<{ rows: ReadonlyArray<Record<string, unknown>> }>
): undefined {
  let i = 0
  const nextRows = (): ReadonlyArray<Record<string, unknown>> => {
    const entry = scripted[i] ?? { rows: [] }
    i++
    return entry.rows
  }
  currentCollectPages = async (args) => {
    calls.push({ fn: "collectPages", args })
    return nextRows().map((r) => realPage(r))
  }
  currentGetPages = async (args) => {
    calls.push({ fn: "getPages", args })
    return { rows: nextRows().map((r) => realPage(r)), nextCursor: null, count: null }
  }
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
