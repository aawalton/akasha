import { expect, test } from "bun:test"
import type { PageAsk, PageReader, PageValues } from "./watcher-settings-equipment.module.code.ts"
import {
  CHARACTER_BUILD_PAGE_TYPE_SLUG,
  CHARACTER_PAGE_TYPE_SLUG,
  COMPANION_BUILD_PAGE_TYPE_SLUG,
  COMPANION_PAGE_TYPE_SLUG,
  compileWantedCompanionEquipment,
  compileWantedEquipment,
  readCharactersWithTargetBuilds,
} from "./watcher-settings-equipment.module.code.ts"

const CHARACTER_BUILD_HASH =
  "ATQHIoAAAAAAQAFH4QABRgOAAKOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

const COMPANION_BUILD_HASH = "AjEIFjfxXClgAAAAAAA"

const ROWS: Record<string, PageValues[]> = {
  [CHARACTER_PAGE_TYPE_SLUG]: [
    {
      esoCharacterId: "char-late",
      accountPage: "u1",
      sortOrder: 5,
      targetBuildId: "b1",
      liveBuildId: "b2",
    },
    { esoCharacterId: "char-early", accountPage: "u1", sortOrder: 1, targetBuildId: "b1" },
    { esoCharacterId: "char-unsorted", accountPage: "u1", targetBuildId: "missing-build" },
    { esoCharacterId: 42, accountPage: "u1", sortOrder: 0 },
  ],
  [CHARACTER_BUILD_PAGE_TYPE_SLUG]: [
    { id: "b1", buildHash: CHARACTER_BUILD_HASH },
    { id: "b2", buildHash: "not-a-real-hash" },
  ],
  [COMPANION_PAGE_TYPE_SLUG]: [
    { companionId: "bastian", accountPage: "u1", sortOrder: 2, targetBuildId: "cb1" },
    { companionId: "mirri", accountPage: "u1", sortOrder: 1, targetBuildId: "cb-missing" },
  ],
  [COMPANION_BUILD_PAGE_TYPE_SLUG]: [{ id: "cb1", buildHash: COMPANION_BUILD_HASH }],
}

function reading(): { reader: PageReader; asked: PageAsk[] } {
  const asked: PageAsk[] = []
  const rowsFor = (args: PageAsk): PageValues[] =>
    (ROWS[args.pageTypeSlug] ?? []).filter((row) => args.where.every((w) => row[w.key] === w.eq))
  const reader: PageReader = {
    collect: async (args) => {
      asked.push(args)
      return rowsFor(args)
    },
    get: async (args) => {
      asked.push(args)
      return rowsFor(args)[0] ?? null
    },
  }
  return { reader, asked }
}

const CHARACTERS_ON = {
  characters: {},
  companions: {},
  global: { characters: { equipment: true } },
}

const COMPANIONS_ON = {
  characters: {},
  companions: {},
  global: { companions: { equipment: true } },
}

test("characters come back ordered by sort order, with a row carrying none last", async () => {
  const { reader } = reading()
  const characters = await readCharactersWithTargetBuilds("u1", reader)
  expect(characters.map((c) => c.esoCharacterId)).toEqual([
    "char-early",
    "char-late",
    "char-unsorted",
  ])
})

test("a character's target build hash and live build hash are read off the build pages", async () => {
  const { reader } = reading()
  const characters = await readCharactersWithTargetBuilds("u1", reader)
  expect(characters).toEqual([
    { esoCharacterId: "char-early", sortOrder: 1, targetBuildHash: CHARACTER_BUILD_HASH },
    {
      esoCharacterId: "char-late",
      sortOrder: 5,
      targetBuildHash: CHARACTER_BUILD_HASH,
      liveBuildHash: "not-a-real-hash",
    },
    { esoCharacterId: "char-unsorted", sortOrder: undefined },
  ])
})

test("an eso character id that is no text leaves that row out", async () => {
  const { reader } = reading()
  const characters = await readCharactersWithTargetBuilds("u1", reader)
  expect(characters.some((c) => c.esoCharacterId === "42")).toBe(false)
  expect(characters).toHaveLength(3)
})

test("characters are asked for by the account page each names", async () => {
  const { reader, asked } = reading()
  await readCharactersWithTargetBuilds("u1", reader)
  expect(asked[0]).toEqual({
    pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
    where: [{ key: "accountPage", eq: "u1" }],
    pageSize: 1000,
  })
})

test("a build page absent leaves the character with no target build hash", async () => {
  const { reader } = reading()
  const characters = await readCharactersWithTargetBuilds("u1", reader)
  const unsorted = characters.find((c) => c.esoCharacterId === "char-unsorted")
  expect(unsorted?.targetBuildHash).toBeUndefined()
})

test("an account naming no character comes back with no character", async () => {
  const { reader } = reading()
  expect(await readCharactersWithTargetBuilds("nobody", reader)).toEqual([])
})

test("the gear a target build wants is compiled for every character whose toggle is on", async () => {
  const { reader } = reading()
  expect(await compileWantedEquipment("u1", CHARACTERS_ON, reader)).toEqual([
    { esoCharId: "char-early", equipType: 1, traitType: 18, quality: 5, armorType: 3 },
    { esoCharId: "char-early", equipType: 2, traitType: 22, quality: 5 },
    { esoCharId: "char-early", equipType: 5, traitType: 3, quality: 5, weaponType: 1 },
    { esoCharId: "char-late", equipType: 1, traitType: 18, quality: 5, armorType: 3 },
    { esoCharId: "char-late", equipType: 2, traitType: 22, quality: 5 },
    { esoCharId: "char-late", equipType: 5, traitType: 3, quality: 5, weaponType: 1 },
  ])
})

test("a toggle set on one character outranks the same toggle set across all characters", async () => {
  const { reader } = reading()
  const signatures = await compileWantedEquipment(
    "u1",
    {
      characters: { "char-early": { equipment: true } },
      companions: {},
      global: { characters: { equipment: false } },
    },
    reader
  )
  expect(signatures.map((s) => s.esoCharId)).toEqual(["char-early", "char-early", "char-early"])
})

test("automation settings absent leaves every equipment toggle off", async () => {
  const { reader } = reading()
  expect(await compileWantedEquipment("u1", undefined, reader)).toEqual([])
  expect(await compileWantedCompanionEquipment("u1", undefined, reader)).toEqual([])
})

test("a companion's target build yields the gear that build wants", async () => {
  const { reader } = reading()
  expect(await compileWantedCompanionEquipment("u1", COMPANIONS_ON, reader)).toEqual([
    { companionName: "Bastian Hallix", equipType: 1, traitType: 47, quality: 5, armorType: 3 },
    { companionName: "Bastian Hallix", equipType: 2, traitType: 58, quality: 5 },
    { companionName: "Bastian Hallix", equipType: 5, traitType: 36, quality: 5, weaponType: 3 },
  ])
})

test("one build page is read once however many characters name that build", async () => {
  const { reader, asked } = reading()
  await compileWantedEquipment("u1", CHARACTERS_ON, reader)
  const forB1 = asked.filter(
    (a) => a.pageTypeSlug === CHARACTER_BUILD_PAGE_TYPE_SLUG && a.where[0]?.eq === "b1"
  )
  expect(forB1).toHaveLength(1)
})

test("a live build is left unread where only the wanted gear is asked for", async () => {
  const { reader, asked } = reading()
  await compileWantedEquipment("u1", CHARACTERS_ON, reader)
  expect(asked.some((a) => a.where[0]?.eq === "b2")).toBe(false)
})
