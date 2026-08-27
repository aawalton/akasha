import { afterAll, describe, expect, mock, test } from "bun:test"
import { makePagesAccessMock } from "@shared/pages-access/test-support"
import {
  buildLua,
  cumulativeRow,
  fakeClient,
  loadRunImportTasks,
  RESETTING_ID,
  USER_ID,
} from "./mocked-pages-access"

type Call = { fn: string; args: unknown }

const calls: Call[] = []

const realPagesAccess = await import("@shared/pages-access")
const realPage = realPagesAccess.Page
const realCollectPages = realPagesAccess.collectPages
const realGetPages = realPagesAccess.getPages
const realPatchPageById = realPagesAccess.patchPageById
const realSoftDeletePageById = realPagesAccess.softDeletePageById
const realUpsertPage = realPagesAccess.upsertPage

let currentCollectPages = realCollectPages
let currentGetPages = realGetPages
let currentPatchPageById = realPatchPageById
let currentSoftDeletePageById = realSoftDeletePageById
let currentUpsertPage = realUpsertPage

afterAll(() => {
  currentCollectPages = realCollectPages
  currentGetPages = realGetPages
  currentPatchPageById = realPatchPageById
  currentSoftDeletePageById = realSoftDeletePageById
  currentUpsertPage = realUpsertPage
})

const pagesAccessMock = makePagesAccessMock({
  Page: realPage,
  collectPages: (...args: Parameters<typeof realCollectPages>) => currentCollectPages(...args),
  getPages: (...args: Parameters<typeof realGetPages>) => currentGetPages(...args),
  patchPageById: (...args: Parameters<typeof realPatchPageById>) => currentPatchPageById(...args),
  softDeletePageById: (...args: Parameters<typeof realSoftDeletePageById>) =>
    currentSoftDeletePageById(...args),
  undeletePageById: async (args: unknown) => {
    calls.push({ fn: "undeletePageById", args })
    return realPage({ id: "undeleted" })
  },
})

function resetState(): undefined {
  calls.length = 0
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
}

resetState()

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

async function sweepDeletes(key: string, row: Record<string, unknown>): Promise<number> {
  resetState()
  scriptPageReads([{ rows: [row] }])
  const run = await loadRunImportTasks(key)
  await run(buildLua([]), fakeClient, { userId: USER_ID })
  return calls.filter((c) => c.fn === "softDeletePageById").length
}

mock.module("@shared/pages-access", () => ({
  applySelect: realPagesAccess.applySelect,
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
  flattenRow: realPagesAccess.flattenRow,
  getDescendantPageTypeSlugs: pagesAccessMock.getDescendantPageTypeSlugs,
  getDetailConfig: realPagesAccess.getDetailConfig,
  getFileDetailConfig: realPagesAccess.getFileDetailConfig,
  getMediaConfig: pagesAccessMock.getMediaConfig,
  getOrderedChildren: pagesAccessMock.getOrderedChildren,
  getOrderedNeighbors: pagesAccessMock.getOrderedNeighbors,
  getPage: realPagesAccess.getPage,
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
  getSequenceConfig: realPagesAccess.getSequenceConfig,
  hardDeletePage: realPagesAccess.hardDeletePage,
  hardDeletePageById: pagesAccessMock.hardDeletePageById,
  hardDeletePageByIds: pagesAccessMock.hardDeletePageByIds,
  hardDeletePages: realPagesAccess.hardDeletePages,
  isPromotedKey: realPagesAccess.isPromotedKey,
  NEVER_MATCH_SLUG: pagesAccessMock.NEVER_MATCH_SLUG,
  NEVER_MATCH_VALUE: pagesAccessMock.NEVER_MATCH_VALUE,
  Page: realPage,
  PageTypeSlug: realPagesAccess.PageTypeSlug,
  PageTypesMissing: realPagesAccess.PageTypesMissing,
  PageTypesUnread: realPagesAccess.PageTypesUnread,
  PageWriteError: realPagesAccess.PageWriteError,
  parsePageSeq: realPagesAccess.parsePageSeq,
  patchPage: realPagesAccess.patchPage,
  patchPageById: (...args: Parameters<typeof realPatchPageById>) => currentPatchPageById(...args),
  patchPages: realPagesAccess.patchPages,
  patchPageTypeById: pagesAccessMock.patchPageTypeById,
  patchPropertyDefinitionById: pagesAccessMock.patchPropertyDefinitionById,
  PROMOTED_COLUMN: realPagesAccess.PROMOTED_COLUMN,
  PROMOTED_COLUMN_KEYS: realPagesAccess.PROMOTED_COLUMN_KEYS,
  recordPageView: pagesAccessMock.recordPageView,
  reschedulePage: pagesAccessMock.reschedulePage,
  softDeletePage: realPagesAccess.softDeletePage,
  softDeletePageById: (...args: Parameters<typeof realSoftDeletePageById>) =>
    currentSoftDeletePageById(...args),
  softDeletePages: realPagesAccess.softDeletePages,
  streamPages: realPagesAccess.streamPages,
  tryExtractIdEq: realPagesAccess.tryExtractIdEq,
  uncompletePage: pagesAccessMock.uncompletePage,
  undeletePage: pagesAccessMock.undeletePage,
  undeletePageById: pagesAccessMock.undeletePageById,
  undeletePages: pagesAccessMock.undeletePages,
  upsertPage: (...args: Parameters<typeof realUpsertPage>) => currentUpsertPage(...args),
  upsertPages: realPagesAccess.upsertPages,
}))

const realPagesQuery = await import("@shared/pages-query")

mock.module("@shared/pages-query", () => ({
  ASK_CEILING_MS: realPagesQuery.ASK_CEILING_MS,
  AnswerSchema: realPagesQuery.AnswerSchema,
  PAGE_QUERY_BROWSER_PREFIX: realPagesQuery.PAGE_QUERY_BROWSER_PREFIX,
  PAGE_QUERY_ORIGIN: realPagesQuery.PAGE_QUERY_ORIGIN,
  WRITE_ATTEMPTS: realPagesQuery.WRITE_ATTEMPTS,
  WRITE_CEILING_MS: realPagesQuery.WRITE_CEILING_MS,
  askNamed: realPagesQuery.askNamed,
  askTaking: realPagesQuery.askTaking,
  pageQueryOrigin: realPagesQuery.pageQueryOrigin,
  patchPage: async (pageType: string, name: string) => ({
    ok: true as const,
    at: `${pageType}/${name}`,
  }),
  patchPageIfMatch: realPagesQuery.patchPageIfMatch,
  patchRow: realPagesQuery.patchRow,
  patchRows: realPagesQuery.patchRows,
  patchState: realPagesQuery.patchState,
  readFromPageQueryService: realPagesQuery.readFromPageQueryService,
  refusalIn: realPagesQuery.refusalIn,
  removePage: realPagesQuery.removePage,
  removeRow: realPagesQuery.removeRow,
  writePage: realPagesQuery.writePage,
  writeRow: async (pageType: string, parentName: string) => ({
    ok: true as const,
    at: `${pageType}/${parentName}`,
  }),
  writeRows: realPagesQuery.writeRows,
}))

describe("runImportTasks → scalar progress keeps the original contract", () => {
  test("scalar maxed → soft-deleted", async () => {
    expect(await sweepDeletes("sc1", cumulativeRow({ current: 400, total: 400 }))).toBe(1)
  })

  test("scalar below cap → NOT soft-deleted", async () => {
    expect(await sweepDeletes("sc2", cumulativeRow({ current: 399, total: 400 }))).toBe(0)
  })

  test("scalar with total 0 → NOT soft-deleted", async () => {
    expect(await sweepDeletes("sc3", cumulativeRow({ current: 0, total: 0 }))).toBe(0)
  })

  test("non-cumulative card at cap → NOT soft-deleted", async () => {
    const deletes = await sweepDeletes(
      "sc4",
      cumulativeRow({ current: 7, total: 7 }, { id: RESETTING_ID, completionCardId: "daily-writs" })
    )
    expect(deletes).toBe(0)
  })

  test("no rrule at cap → NOT swept", async () => {
    expect(
      await sweepDeletes("sc5", cumulativeRow({ current: 400, total: 400 }, { rruleRule: null }))
    ).toBe(0)
  })
})
