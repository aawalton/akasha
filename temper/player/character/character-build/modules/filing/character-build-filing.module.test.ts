import { expect, test } from "bun:test"
import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  type CharacterBuildPages,
  fileCharacterBuilds,
} from "akasha/temper/player/character/character-build/modules/filing/character-build-filing.module.code.ts"
import { rowMatches as matches } from "akasha/temper/player/character/companion-build/modules/filing/companion-build-filing.module.test-fixtures.ts"

const ACCOUNT = "temper-account/test-account"

type Row = Record<string, Json> & { pageTypeSlug: string; id: string }

function characterRow(id: string, title: string, links: Record<string, string> = {}): Row {
  return { pageTypeSlug: "temper-account-character", id, title, accountPage: ACCOUNT, ...links }
}

function buildRow(id: string, characterName: string, visibility: string, owner?: string): Row {
  return {
    pageTypeSlug: "character-build",
    id,
    characterName,
    visibility,
    ...(owner === undefined ? {} : { accountPage: owner }),
  }
}

function fakePages(seed: readonly Row[]): {
  pages: CharacterBuildPages
  rows: Row[]
  writes: string[]
} {
  const rows = seed.map((row) => ({ ...row }))
  const writes: string[] = []
  const pages: CharacterBuildPages = {
    get: async (args) => ({
      rows: rows
        .filter((row) => row.pageTypeSlug === args.pageTypeSlug && matches(row, args.where))
        .map((row) => asPage(row)),
      nextCursor: null,
      count: null,
    }),
    patch: async (args) => {
      const row = rows.find(
        (one) => one.pageTypeSlug === args.pageTypeSlug && matches(one, args.where)
      )
      if (row === undefined) return null
      writes.push(`patch ${args.pageTypeSlug} ${row.id}`)
      Object.assign(row, args.set)
      return asPage(row)
    },
  }
  return { pages, rows, writes }
}

function rowOf(rows: readonly Row[], id: string): Row | undefined {
  return rows.find((row) => row.id === id)
}

test("a live build naming no account takes the account and becomes its character's live build", async () => {
  const { pages, rows } = fakePages([
    characterRow("c-1", "Valeterisa"),
    buildRow("b-1", "Valeterisa", "live"),
  ])
  const filed = await fileCharacterBuilds(ACCOUNT, pages)
  expect(filed).toEqual([
    { buildId: "b-1", character: "Valeterisa", owned: true, attachedAs: "liveBuildId" },
  ])
  expect(rowOf(rows, "b-1")?.accountPage).toBe(ACCOUNT)
  expect(rowOf(rows, "c-1")?.liveBuildId).toBe("b-1")
})

test("a target build becomes its character's target", async () => {
  const { pages, rows } = fakePages([
    characterRow("c-1", "Amerys"),
    buildRow("b-1", "Amerys", "target"),
  ])
  await fileCharacterBuilds(ACCOUNT, pages)
  expect(rowOf(rows, "c-1")?.targetBuildId).toBe("b-1")
  expect(rowOf(rows, "c-1")?.liveBuildId).toBeUndefined()
})

test("a private build takes the account and is attached to no character", async () => {
  const { pages, rows } = fakePages([
    characterRow("c-1", "Amerys"),
    buildRow("b-1", "Amerys", "private"),
  ])
  const filed = await fileCharacterBuilds(ACCOUNT, pages)
  expect(filed).toEqual([{ buildId: "b-1", character: "Amerys", owned: true, attachedAs: null }])
  expect(rowOf(rows, "c-1")?.targetBuildId).toBeUndefined()
})

test("a character already naming a build that is there keeps it", async () => {
  const { pages, rows } = fakePages([
    characterRow("c-1", "Valeterisa", { liveBuildId: "b-old" }),
    buildRow("b-old", "Valeterisa", "live", ACCOUNT),
    buildRow("b-new", "Valeterisa", "live", ACCOUNT),
  ])
  const filed = await fileCharacterBuilds(ACCOUNT, pages)
  expect(filed).toEqual([])
  expect(rowOf(rows, "c-1")?.liveBuildId).toBe("b-old")
})

test("a character naming a build that is gone takes the build filed in its place", async () => {
  const { pages, rows } = fakePages([
    characterRow("c-1", "Valeterisa", { liveBuildId: "b-gone" }),
    buildRow("b-1", "Valeterisa", "live", ACCOUNT),
  ])
  await fileCharacterBuilds(ACCOUNT, pages)
  expect(rowOf(rows, "c-1")?.liveBuildId).toBe("b-1")
})

test("two unattached builds for one character attach only the first", async () => {
  const { pages, rows } = fakePages([
    characterRow("c-1", "Valeterisa"),
    buildRow("b-1", "Valeterisa", "live", ACCOUNT),
    buildRow("b-2", "Valeterisa", "live", ACCOUNT),
  ])
  await fileCharacterBuilds(ACCOUNT, pages)
  expect(rowOf(rows, "c-1")?.liveBuildId).toBe("b-1")
})

test("a build naming another account or no known character is left as it is", async () => {
  const { pages, writes } = fakePages([
    characterRow("c-1", "Valeterisa"),
    buildRow("b-1", "Valeterisa", "live", "temper-account/someone-else"),
    buildRow("b-2", "Nobody", "live"),
  ])
  expect(await fileCharacterBuilds(ACCOUNT, pages)).toEqual([])
  expect(writes).toEqual([])
})

test("a build already filed writes nothing", async () => {
  const { pages, writes } = fakePages([
    characterRow("c-1", "Valeterisa", { liveBuildId: "b-1" }),
    buildRow("b-1", "Valeterisa", "live", ACCOUNT),
  ])
  expect(await fileCharacterBuilds(ACCOUNT, pages)).toEqual([])
  expect(writes).toEqual([])
})
