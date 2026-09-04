import { expect, test } from "bun:test"
import { asPage } from "@akasha/pages-core/page-types"
import {
  type CompletionPageRead,
  type CompletionPageUpsert,
  NO_SIGNED_IN_USER,
  preservedWhy,
  runImportCompletion,
  skippedCompanionsWhy,
  UNREADABLE_SAVED_VARIABLES,
} from "./watcher-import-completion.module.code.ts"

const WITH_STORED = `TemperCharacters_SavedVariables =
{ ["Default"] = { ["@alan"] = { ["$AccountWide"] = {
  ["account"] = { ["skillPointsSpent"] = 40 },
  ["characters"] = { ["111"] = { ["name"] = "Vex", ["priorityOrder"] = 2, ["questsDone"] = 5 }, ["222"] = "no table" },
  ["companions"] = { ["1"] = { ["rapport"] = 3 }, ["7777"] = { ["rapport"] = 1 } },
} } } }
`

const CHARACTERS_ONLY = `TemperCharacters_SavedVariables =
{ ["Default"] = { ["@alan"] = { ["$AccountWide"] = {
  ["characters"] = { ["111"] = { ["name"] = "Vex", ["priorityOrder"] = 2, ["questsDone"] = 5 } },
} } } }
`

const NO_KNOWN_SECTION = `TemperCharacters_SavedVariables =
{ ["Default"] = { ["@alan"] = { ["$AccountWide"] = { ["other"] = { ["x"] = 1 } } } } }
`

type ReadQuery = Parameters<CompletionPageRead>[0]

type UpsertArgs = Parameters<CompletionPageUpsert>[0]

interface Seat {
  readonly reads: ReadQuery[]
  readonly writes: UpsertArgs[]
  readonly lines: string[]
  readonly deps: {
    userId: string | undefined
    read: CompletionPageRead
    upsert: CompletionPageUpsert
    report: (message: string) => void
  }
}

function seat(rows: Record<string, Record<string, unknown>[]> = {}): Seat {
  const reads: ReadQuery[] = []
  const writes: UpsertArgs[] = []
  const lines: string[] = []
  const read: CompletionPageRead = async (query) => {
    reads.push(query)
    return { rows: (rows[query.pageTypeSlug] ?? []).map(asPage) }
  }
  const upsert: CompletionPageUpsert = async (args) => {
    writes.push(args)
    return asPage({ id: `page-${args.pageTypeSlug}` })
  }
  return {
    reads,
    writes,
    lines,
    deps: { userId: "user-1", read, upsert, report: (message) => lines.push(message) },
  }
}

function sets(writes: readonly UpsertArgs[]): string[] {
  return writes.map((write) => JSON.stringify(write.set))
}

test("stored counts higher than the incoming ones reach the pages unlowered", async () => {
  const it = seat({
    "temper-account": [{ id: "acc1", title: "user-1", completion: { skillPointsSpent: 99 } }],
    "temper-account-character": [
      { id: "ch1", esoCharacterId: "111", displayOrder: 7, completion: { questsDone: 9 } },
    ],
    "temper-companion-progress": [
      { id: "co1", companionId: "bastian", completion: { rapport: 8 } },
    ],
  })
  await runImportCompletion(WITH_STORED, it.deps)
  expect(sets(it.writes)).toEqual([
    '{"title":"user-1","completion":"{\\"skillPointsSpent\\":99}"}',
    '{"accountPage":"user-1","esoCharacterId":"111","title":"Vex","completion":"{\\"questsDone\\":9}"}',
    '{"accountPage":"user-1","companionId":"bastian","completion":"{\\"rapport\\":8}"}',
  ])
})

test("a character page already carrying an order keeps that order", async () => {
  const it = seat({
    "temper-account-character": [{ id: "ch1", esoCharacterId: "111", displayOrder: 7 }],
  })
  await runImportCompletion(CHARACTERS_ONLY, it.deps)
  expect(sets(it.writes)[1]).toBe(
    '{"accountPage":"user-1","esoCharacterId":"111","title":"Vex","completion":"{\\"questsDone\\":5}"}'
  )
})

test("a character page carrying no order takes the order the addon wrote", async () => {
  const it = seat()
  await runImportCompletion(CHARACTERS_ONLY, it.deps)
  expect(sets(it.writes)).toEqual([
    '{"title":"user-1"}',
    '{"accountPage":"user-1","esoCharacterId":"111","title":"Vex","displayOrder":2,"completion":"{\\"questsDone\\":5}"}',
  ])
})

test("account, then characters, then companions is the order the pages are read in", async () => {
  const it = seat()
  await runImportCompletion(WITH_STORED, it.deps)
  expect(it.reads).toEqual([
    {
      pageTypeSlug: "temper-account",
      where: [{ key: "title", eq: "user-1" }],
      select: ["id", "title", "completion"],
      limit: 1,
    },
    {
      pageTypeSlug: "temper-account-character",
      select: ["id", "title", "esoCharacterId", "displayOrder", "completion"],
      limit: 1000,
    },
    {
      pageTypeSlug: "temper-companion-progress",
      select: ["id", "companionId", "completion"],
      limit: 1000,
    },
  ])
})

test("saved variables naming no known section are refused", async () => {
  const it = seat()
  await expect(runImportCompletion(NO_KNOWN_SECTION, it.deps)).rejects.toThrow(
    UNREADABLE_SAVED_VARIABLES
  )
  expect(it.writes).toEqual([])
})

test("no signed-in user is refused before any page is read", async () => {
  const it = seat()
  await expect(runImportCompletion(WITH_STORED, { ...it.deps, userId: undefined })).rejects.toThrow(
    NO_SIGNED_IN_USER
  )
  expect(it.reads).toEqual([])
  expect(it.writes).toEqual([])
})

test("the caller may hand in what names the signed-in user", async () => {
  const it = seat()
  const outcome = await runImportCompletion(CHARACTERS_ONLY, {
    ...it.deps,
    userId: undefined,
    signedInUserId: async () => "user-2",
  })
  expect(outcome.accountPageId).toBe("page-temper-account")
  expect(sets(it.writes)[0]).toBe('{"title":"user-2"}')
})

test("every merge that held a field back names its subject in the outcome", async () => {
  const it = seat({
    "temper-account": [{ id: "acc1", completion: { skillPointsSpent: 99 } }],
    "temper-account-character": [
      { id: "ch1", esoCharacterId: "111", completion: { questsDone: 9 } },
    ],
    "temper-companion-progress": [
      { id: "co1", companionId: "bastian", completion: { rapport: 8 } },
    ],
  })
  const outcome = await runImportCompletion(WITH_STORED, it.deps)
  expect(outcome.preservedLabels).toEqual(["Account", "Character Vex", "Companion bastian"])
  expect(it.lines).toContain(preservedWhy("Character Vex", ["questsDone"]))
})

test("a companion the caller cannot name is counted as skipped and reported", async () => {
  const it = seat()
  await runImportCompletion(WITH_STORED, { ...it.deps, companionIdByDefId: () => undefined })
  expect(it.lines).toContain(skippedCompanionsWhy(2))
  expect(it.lines).toContain("No companion data found")
})

test("a saved-variables file with no companions writes no companion page", async () => {
  const it = seat()
  const outcome = await runImportCompletion(CHARACTERS_ONLY, it.deps)
  expect(outcome.companionCount).toBe(0)
  expect(outcome.accountCompletionWritten).toBe(false)
  expect(it.reads.map((read) => read.pageTypeSlug)).toEqual([
    "temper-account",
    "temper-account-character",
  ])
})

test("a merge that held a field back names the field", () => {
  expect(preservedWhy("Account", ["a", "b"])).toBe(
    "Account: the incoming completion was missing a, b, and the forward merge kept what was stored. A saved-variables wipe or a parse regression looks like this."
  )
})
