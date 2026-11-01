import { expect, test } from "bun:test"
import {
  asPage,
  type PageWhere,
} from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { characterBuild } from "akasha/temper/player/character/character-build/character-build.page-type.ts"
import {
  type BuildEdit,
  type BuildEditContext,
  type BuildEditPages,
  buildEditsIn,
  type EditedCharacter,
  landBuildEdit,
} from "akasha/temper/watcher/modules/watcher-build-edit-landing/watcher-build-edit-landing.module.code.ts"

const EDIT_ID = "01a198c1-a5f5-7fa7-8d3d-bf20866e2262"

const VERSION = "2026-11-01T20:00:00.000Z"

function matches(row: Record<string, unknown>, where: PageWhere): boolean {
  return where.every((one) => "eq" in one && row[one.key] === one.eq)
}

interface HeldPages {
  readonly pages: BuildEditPages
  readonly writes: () => number
}

function pagesOf(rows: Record<string, unknown>[]): HeldPages {
  let made = 0
  let writes = 0
  const pages: BuildEditPages = {
    get: async (args) => ({ rows: rows.filter((row) => matches(row, args.where)).map(asPage) }),
    patch: async (args) => {
      writes++
      const row = rows.find((one) => matches(one, args.where))
      if (row === undefined) return null
      Object.assign(row, args.set, { updatedAt: `moved ${writes}` })
      return asPage(row)
    },
    upsert: async (args) => {
      writes++
      const typed = rows.filter((one) => one["pageTypeSlug"] === args.pageTypeSlug)
      let row = typed.find((one) => matches(one, args.where))
      if (row === undefined) {
        made++
        row = { pageTypeSlug: args.pageTypeSlug, id: `made-${made}` }
        rows.push(row)
      }
      Object.assign(row, args.set)
      return asPage(row)
    },
  }
  return { pages, writes: () => writes }
}

function buildRow(values: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    pageTypeSlug: characterBuild.slug,
    id: "build-1",
    title: "Tank",
    buildHash: "old-hash",
    updatedAt: VERSION,
    ...values,
  }
}

function contextOf(): BuildEditContext & { character: EditedCharacter } {
  const character: EditedCharacter = {
    name: "Shalidor",
    where: [{ key: "esoCharacterId", eq: "1001" }],
    targetBuildIds: ["build-1"],
  }
  return {
    accountPage: "the account page",
    characters: new Map([["1001", character]]),
    canonical: (hash) => (hash === "bad" ? null : `canonical ${hash}`),
    character,
  }
}

const RENAME: BuildEdit = {
  editId: EDIT_ID,
  characterId: "1001",
  buildId: "build-1",
  basedOn: VERSION,
  title: "Main Tank",
}

test("a change made over the build's version lands with its id", async () => {
  const rows = [buildRow()]
  expect(await landBuildEdit(RENAME, contextOf(), pagesOf(rows).pages)).toBe("landed")
  expect(rows[0]?.["title"]).toBe("Main Tank")
  expect(rows[0]?.["editId"]).toBe(EDIT_ID)
})

test("a build changed on alanwalton.com since the game read it keeps that change", async () => {
  const rows = [buildRow({ updatedAt: "2026-11-01T21:00:00.000Z" })]
  const held = pagesOf(rows)
  expect(await landBuildEdit(RENAME, contextOf(), held.pages)).toBe("kept-site")
  expect(rows[0]?.["title"]).toBe("Tank")
  expect(held.writes()).toBe(0)
})

test("a change lands over what the same change landed before", async () => {
  const rows = [buildRow({ updatedAt: "moved", editId: EDIT_ID })]
  const saved: BuildEdit = { ...RENAME, buildHash: "new-hash" }
  expect(await landBuildEdit(saved, contextOf(), pagesOf(rows).pages)).toBe("landed")
  expect(rows[0]?.["buildHash"]).toBe("canonical new-hash")
})

test("a change the build already holds writes nothing", async () => {
  const rows = [buildRow({ title: "Main Tank", updatedAt: "moved", editId: EDIT_ID })]
  const held = pagesOf(rows)
  expect(await landBuildEdit(RENAME, contextOf(), held.pages)).toBe("already")
  expect(held.writes()).toBe(0)
})

test("a change naming no build makes one target build, once", async () => {
  const rows: Record<string, unknown>[] = []
  const context = contextOf()
  const held = pagesOf(rows)
  const made: BuildEdit = { editId: EDIT_ID, characterId: "1001", title: "Healer", buildHash: "h" }
  expect(await landBuildEdit(made, context, held.pages)).toBe("made")
  const build = rows.find((row) => row["pageTypeSlug"] === characterBuild.slug)
  expect(build?.["correlationId"]).toBe(EDIT_ID)
  expect(build?.["visibility"]).toBe("target")
  expect(build?.["buildHash"]).toBe("canonical h")
  expect(context.character.targetBuildIds).toEqual(["build-1", "made-1"])
  expect(await landBuildEdit(made, context, held.pages)).toBe("already")
})

test("a change on a character the import did not read, or with a bad hash, lands nothing", async () => {
  const held = pagesOf([buildRow()])
  expect(await landBuildEdit({ ...RENAME, characterId: "9" }, contextOf(), held.pages)).toBe(
    "no-character"
  )
  expect(await landBuildEdit({ ...RENAME, buildHash: "bad" }, contextOf(), held.pages)).toBe(
    "bad-hash"
  )
  expect(held.writes()).toBe(0)
})

test("a change made after an earlier one lands over what that earlier one landed", async () => {
  const rows = [buildRow({ updatedAt: "moved", editId: "e-1" })]
  const next: BuildEdit = { ...RENAME, editId: "e-2", after: "e-1" }
  expect(await landBuildEdit(next, contextOf(), pagesOf(rows).pages)).toBe("landed")
  expect(rows[0]?.["editId"]).toBe("e-2")
})

test("a change to a build made in the game finds the build by the change that made it", async () => {
  const rows = [buildRow({ correlationId: "e-1", editId: "e-1", updatedAt: "moved" })]
  const renamed: BuildEdit = { editId: "e-2", characterId: "1001", madeIn: "e-1", after: "e-1" }
  const held = pagesOf(rows)
  expect(await landBuildEdit({ ...renamed, title: "Healer" }, contextOf(), held.pages)).toBe(
    "landed"
  )
  expect(rows[0]?.["title"]).toBe("Healer")
  expect(await landBuildEdit({ ...renamed, madeIn: "e-9" }, contextOf(), held.pages)).toBe(
    "no-build"
  )
})

const POTION = { slot: 3, kind: "item", id: 27036, name: "Essence of Health" } as const

const MOUNT = { slot: 1, kind: "collectible", id: 1234, name: "Horse" } as const

test("a change's quickslots are read from what the game saved, in slot order", () => {
  const view = { quickslots: { "1": POTION, "2": MOUNT, "3": { slot: 4, kind: "spell" } } }
  const [edit] = buildEditsIn({ [EDIT_ID]: { characterId: "1001", buildId: "build-1", view } })
  expect(edit?.quickslots).toEqual([MOUNT, POTION])
})

test("a change lands its quickslots where the build holds others, and not where it holds them", async () => {
  const rows = [buildRow()]
  const saved: BuildEdit = { ...RENAME, title: "Tank", quickslots: [POTION] }
  expect(await landBuildEdit(saved, contextOf(), pagesOf(rows).pages)).toBe("landed")
  expect(rows[0]?.["quickslots"]).toEqual([POTION])
  const held = pagesOf(rows)
  expect(await landBuildEdit(saved, contextOf(), held.pages)).toBe("already")
  expect(held.writes()).toBe(0)
})

test("a build made in the game holds the quickslots it was saved with", async () => {
  const rows: Record<string, unknown>[] = []
  const made: BuildEdit = {
    editId: EDIT_ID,
    characterId: "1001",
    buildHash: "h",
    quickslots: [MOUNT],
  }
  expect(await landBuildEdit(made, contextOf(), pagesOf(rows).pages)).toBe("made")
  const build = rows.find((row) => row["pageTypeSlug"] === characterBuild.slug)
  expect(build?.["quickslots"]).toEqual([MOUNT])
})

test("the game's pending changes are read by their ids, in the order they were made", () => {
  const edits = buildEditsIn({
    "e-2": { characterId: "1001", buildId: "build-1", order: 2, after: "e-1" },
    [EDIT_ID]: { characterId: "1001", buildId: "build-1", icon: 4, title: "Tank", order: 1 },
    broken: { title: "no character" },
  })
  expect(edits).toEqual([
    { editId: EDIT_ID, characterId: "1001", order: 1, buildId: "build-1", title: "Tank", icon: 4 },
    { editId: "e-2", characterId: "1001", order: 2, after: "e-1", buildId: "build-1" },
  ])
})
