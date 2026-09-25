import { expect, test } from "bun:test"
import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import {
  asPage,
  type PageWhere,
} from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { holdCompanionCatalogFromCheckout } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.test-fixtures.ts"
import { createNewCompanion } from "akasha/temper/catalog/companion/companions-core/modules/companion-factory/companion-factory.module.code.ts"
import type { CompanionState } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"
import { companionAddressOf } from "akasha/temper/catalog/companion/temper-eso-companion/modules/companion-address/companion-address.module.code.ts"
import {
  type CompanionBuildPages,
  fileLiveCompanionBuild,
} from "akasha/temper/player/character/companion-build/modules/filing/companion-build-filing.module.code.ts"
import {
  buildHash,
  buildId,
} from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"

holdCompanionCatalogFromCheckout()

const ACCOUNT = "temper-account/test-account"

const HASH = buildHash("AjEINDEMQxDEMQxDAwMDFDADAAAAAAa4")

type Row = Record<string, Json> & { pageTypeSlug: string; id: string }

function emberBuild(): CompanionState {
  const build = createNewCompanion()
  build.companion.id = "ember"
  build.name = "Ember No Role"
  return build
}

function progressRow(liveBuildId?: string): Row {
  return {
    pageTypeSlug: "temper-companion-progress",
    id: "progress-1",
    accountPage: ACCOUNT,
    companionId: companionAddressOf("ember"),
    ...(liveBuildId === undefined ? {} : { liveBuildId }),
  }
}

function buildRow(id: string, buildHashText: string, slug = `slug-of-${id}`): Row {
  return {
    pageTypeSlug: "companion-build",
    id,
    slug,
    accountPage: ACCOUNT,
    buildHash: buildHashText,
  }
}

function matches(row: Row, where: PageWhere | undefined): boolean {
  return (where ?? []).every(
    (condition) => "eq" in condition && row[condition.key] === condition.eq
  )
}

function fakePages(
  seed: readonly Row[],
  refusePatch = false
): { pages: CompanionBuildPages; rows: Row[]; writes: string[] } {
  const rows = seed.map((row) => ({ ...row }))
  const writes: string[] = []
  const pages: CompanionBuildPages = {
    get: async (args) => ({
      rows: rows
        .filter((row) => row.pageTypeSlug === args.pageTypeSlug && matches(row, args.where))
        .map((row) => asPage(row)),
      nextCursor: null,
      count: null,
    }),
    create: async (args) => {
      writes.push(`create ${args.pageTypeSlug}`)
      const row: Row = {
        ...args.properties,
        pageTypeSlug: args.pageTypeSlug,
        id: `new-${rows.length}`,
      }
      rows.push(row)
      return asPage(row)
    },
    patch: async (args) => {
      writes.push(`patch ${args.pageTypeSlug}`)
      if (refusePatch) throw new Error("the progress page would not take the write")
      const row = rows.find(
        (one) => one.pageTypeSlug === args.pageTypeSlug && matches(one, args.where)
      )
      if (row === undefined) return null
      Object.assign(row, args.set)
      return asPage(row)
    },
    remove: async (args) => {
      writes.push(`remove ${args.pageTypeSlug} ${args.id}`)
      const at = rows.findIndex((row) => row.id === args.id)
      if (at >= 0) rows.splice(at, 1)
      return null
    },
  }
  return { pages, rows, writes }
}

test("a new hash files a live build and makes it the companion's live build", async () => {
  const { pages, rows, writes } = fakePages([progressRow()])
  const filed = await fileLiveCompanionBuild(ACCOUNT, HASH, emberBuild(), pages)
  expect(filed.wrote).toBe(true)
  const build = rows.find((row) => row.id === filed.buildId)
  expect(build?.buildHash).toBe(HASH)
  expect(build?.visibility).toBe("live")
  expect(build?.title).toBe("Ember No Role")
  expect(rows.find((row) => row.id === "progress-1")?.liveBuildId).toBe(filed.buildId)
  expect(writes).toEqual(["create companion-build", "patch temper-companion-progress"])
})

test("a hash matching the companion's live build writes nothing", async () => {
  const { pages, writes } = fakePages([progressRow("live-1"), buildRow("live-1", HASH)])
  const filed = await fileLiveCompanionBuild(ACCOUNT, HASH, emberBuild(), pages)
  expect(filed).toEqual({ buildId: buildId("live-1"), wrote: false })
  expect(writes).toEqual([])
})

test("a hash the account already has becomes live without a second build", async () => {
  const { pages, rows, writes } = fakePages([
    progressRow("live-1"),
    buildRow("live-1", "another-hash"),
    buildRow("old-1", HASH),
  ])
  const filed = await fileLiveCompanionBuild(ACCOUNT, HASH, emberBuild(), pages)
  expect(filed).toEqual({ buildId: buildId("old-1"), wrote: true })
  expect(rows.find((row) => row.id === "progress-1")?.liveBuildId).toBe("old-1")
  expect(writes).toEqual(["patch temper-companion-progress"])
})

test("a build the live one is found as by its slug writes nothing", async () => {
  const first = fakePages([progressRow()])
  const filed = await fileLiveCompanionBuild(ACCOUNT, HASH, emberBuild(), first.pages)
  const created = first.rows.find((row) => row.id === filed.buildId)
  if (created === undefined) throw new Error("the first filing wrote no build")
  created.buildHash = "a-hash-rewritten-by-opening"
  first.writes.length = 0
  const again = await fileLiveCompanionBuild(ACCOUNT, HASH, emberBuild(), first.pages)
  expect(again).toEqual({ buildId: filed.buildId, wrote: false })
  expect(first.writes).toEqual([])
})

test("a companion with no progress page gets one naming its live build", async () => {
  const { pages, rows } = fakePages([])
  const filed = await fileLiveCompanionBuild(ACCOUNT, HASH, emberBuild(), pages)
  const progress = rows.find((row) => row.pageTypeSlug === "temper-companion-progress")
  expect(progress?.liveBuildId).toBe(filed.buildId)
  expect(progress?.companionId).toBe(companionAddressOf("ember"))
  expect(progress?.accountPage).toBe(ACCOUNT)
})

test("a new build whose progress page could not be written is taken away again", async () => {
  const { pages, rows, writes } = fakePages([progressRow()], true)
  await expect(fileLiveCompanionBuild(ACCOUNT, HASH, emberBuild(), pages)).rejects.toThrow(
    "the progress page would not take the write; the build new-1 written before it was taken away"
  )
  expect(rows.filter((row) => row.pageTypeSlug === "companion-build")).toEqual([])
  expect(writes).toEqual([
    "create companion-build",
    "patch temper-companion-progress",
    "remove companion-build new-1",
  ])
})

test("a build filed before stays where its progress page could not be written", async () => {
  const { pages, rows } = fakePages([progressRow(), buildRow("old-1", HASH)], true)
  await expect(fileLiveCompanionBuild(ACCOUNT, HASH, emberBuild(), pages)).rejects.toThrow(
    "the progress page would not take the write"
  )
  expect(rows.some((row) => row.id === "old-1")).toBe(true)
})
