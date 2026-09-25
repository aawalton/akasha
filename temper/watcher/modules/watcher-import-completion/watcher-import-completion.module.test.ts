import { expect, test } from "bun:test"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { bastian } from "akasha/temper/catalog/companion/temper-eso-companion/pages/bastian/bastian.temper-eso-companion.ts"
import { temperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.ts"
import {
  type CompletionPageRead,
  type CompletionPageUpsert,
  completionBody,
  NO_SIGNED_IN_USER,
  preservedWhy,
  runImportCompletion,
  skippedCompanionsWhy,
  UNREADABLE_SAVED_VARIABLES,
  unparsedCompletionWhy,
} from "akasha/temper/watcher/modules/watcher-import-completion/watcher-import-completion.module.code.ts"
import type {
  ReadFiles,
  ReadPages,
  WriteFiles,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"

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

const BASTIAN = namedAs(temperEsoCompanion.slug, bastian.slug, null)

type ReadQuery = Parameters<CompletionPageRead>[0]

type UpsertArgs = Parameters<CompletionPageUpsert>[0]

type Put = { readonly path: string; readonly content: string }

function pathFor(pageTypeSlug: string, slug: string): string {
  return `pages/${pageTypeSlug}/${slug}/${slug}.${pageTypeSlug}.ts`
}

function besideFor(pageTypeSlug: string, slug: string): string {
  return `pages/${pageTypeSlug}/${slug}/${slug}.${pageTypeSlug}.completion.json`
}

interface Seat {
  readonly reads: ReadQuery[]
  readonly writes: UpsertArgs[]
  readonly asked: string[][]
  readonly landed: Put[][]
  readonly sent: (string | null | undefined)[]
  readonly lines: string[]
  readonly deps: {
    userId: string | undefined
    read: CompletionPageRead
    upsert: CompletionPageUpsert
    readPages: ReadPages
    readFiles: ReadFiles
    writeFiles: WriteFiles
    report: (message: string) => void
  }
}

function seat(
  rows: Record<string, Record<string, unknown>[]> = {},
  files: Record<string, string> = {}
): Seat {
  const reads: ReadQuery[] = []
  const writes: UpsertArgs[] = []
  const asked: string[][] = []
  const landed: Put[][] = []
  const sent: (string | null | undefined)[] = []
  const lines: string[] = []
  const held: Record<string, string> = { ...files }
  const read: CompletionPageRead = async (query) => {
    reads.push(query)
    return { rows: (rows[query.pageTypeSlug] ?? []).map(asPage) }
  }
  const upsert: CompletionPageUpsert = async (args) => {
    writes.push(args)
    const named = args.where[0] as { readonly eq?: unknown } | undefined
    const eq = typeof args.set.slug === "string" ? args.set.slug : named?.eq
    const slug = typeof eq === "string" ? eq : args.pageTypeSlug
    return asPage({ id: `page-${args.pageTypeSlug}`, slug: `slug-${slug}` })
  }
  const readPages: ReadPages = async (pages) => ({
    ok: true,
    at: "c1",
    bodies: pages.map((one) => ({ path: pathFor(one.pageTypeSlug, one.slug), content: "" })),
    unplaced: [],
  })
  const readFiles: ReadFiles = async (paths) => {
    asked.push([...paths])
    return {
      ok: true,
      at: "c1",
      bodies: paths.map((path) => ({ path, content: held[path] ?? null })),
      unplaced: [],
    }
  }
  const writeFiles: WriteFiles = async (puts, _writer, _message, _fetcher, _rest, read) => {
    landed.push([...puts])
    sent.push(read)
    for (const one of puts) held[one.path] = one.content
    return { ok: true, at: "c2" }
  }
  return {
    reads,
    writes,
    asked,
    landed,
    sent,
    lines,
    deps: {
      userId: "user-1",
      read,
      upsert,
      readPages,
      readFiles,
      writeFiles,
      report: (message) => lines.push(message),
    },
  }
}

function sets(writes: readonly UpsertArgs[]): string[] {
  return writes.map((write) => JSON.stringify(write.set))
}

function toldTheEnding(writes: readonly UpsertArgs[]): UpsertArgs[] {
  return writes.filter((write) => write.set.completion !== undefined)
}

test("stored counts higher than the incoming ones reach the files unlowered", async () => {
  const it = seat(
    {
      "temper-account": [{ id: "acc1", slug: "the-account", key: "user-1" }],
      "temper-account-character": [{ id: "ch1", slug: "vex", esoCharacterId: "111" }],
      "temper-companion-progress": [{ id: "co1", slug: bastian.slug, companionId: BASTIAN }],
    },
    {
      [besideFor("temper-account", "the-account")]: '{"skillPointsSpent":99}',
      [besideFor("temper-account-character", "vex")]: '{"questsDone":9}',
      [besideFor("temper-companion-progress", "bastian")]: '{"rapport":8}',
    }
  )
  await runImportCompletion(WITH_STORED, it.deps)
  expect(it.landed.flat().map((one) => one.content)).toEqual([
    completionBody({ skillPointsSpent: 99 }),
    completionBody({ questsDone: 9 }),
    completionBody({ rapport: 8 }),
  ])
})

test("no completion body reaches the set an upsert carries", async () => {
  const it = seat()
  await runImportCompletion(WITH_STORED, it.deps)
  expect(sets(it.writes)).toEqual([
    '{"key":"user-1"}',
    '{"completion":"json"}',
    '{"accountPage":"temper-account/slug-user-1","esoCharacterId":"111","title":"Vex","displayOrder":2}',
    '{"completion":"json"}',
    JSON.stringify({
      slug: bastian.slug,
      title: bastian.title,
      companionId: BASTIAN,
      accountPage: "temper-account/slug-user-1",
    }),
    '{"completion":"json"}',
  ])
})

test("a companion page is found by the address of the companion's page", async () => {
  const it = seat()
  await runImportCompletion(WITH_STORED, it.deps)
  const companionWrite = it.writes.find((write) => write.set.companionId !== undefined)
  expect(companionWrite?.where).toEqual([{ key: "companionId", eq: BASTIAN }])
})

test("a page beside no completion file is told the ending once the file has landed", async () => {
  const it = seat()
  await runImportCompletion(CHARACTERS_ONLY, it.deps)
  expect(toldTheEnding(it.writes).map((write) => JSON.stringify(write.where))).toEqual([
    '[{"key":"slug","eq":"slug-111"}]',
  ])
})

test("a page already beside a completion file is told no ending again", async () => {
  const it = seat({}, { [besideFor("temper-account-character", "slug-111")]: '{"questsDone":1}' })
  await runImportCompletion(CHARACTERS_ONLY, it.deps)
  expect(toldTheEnding(it.writes)).toEqual([])
})

test("a character page already carrying an order keeps that order", async () => {
  const it = seat({
    "temper-account-character": [
      { id: "ch1", slug: "vex", esoCharacterId: "111", displayOrder: 7 },
    ],
  })
  await runImportCompletion(CHARACTERS_ONLY, it.deps)
  expect(sets(it.writes)[1]).toBe(
    '{"accountPage":"temper-account/slug-user-1","esoCharacterId":"111","title":"Vex"}'
  )
})

test("a character page carrying no order takes the order the addon wrote", async () => {
  const it = seat()
  await runImportCompletion(CHARACTERS_ONLY, it.deps)
  expect(sets(it.writes)[1]).toBe(
    '{"accountPage":"temper-account/slug-user-1","esoCharacterId":"111","title":"Vex","displayOrder":2}'
  )
})

test("account, then characters, then companions is the order the pages are read in", async () => {
  const it = seat()
  await runImportCompletion(WITH_STORED, it.deps)
  expect(it.reads).toEqual([
    {
      pageTypeSlug: "temper-account",
      where: [{ key: "key", eq: "user-1" }],
      select: ["id", "slug"],
      limit: 1,
    },
    {
      pageTypeSlug: "temper-account-character",
      select: ["id", "slug", "esoCharacterId", "displayOrder"],
      limit: 1000,
    },
    {
      pageTypeSlug: "temper-companion-progress",
      select: ["id", "slug", "companionId"],
      limit: 1000,
    },
  ])
})

test("one read and one write of completion files answer for a whole page type", async () => {
  const it = seat()
  await runImportCompletion(WITH_STORED, it.deps)
  expect(it.asked.length).toBe(3)
  expect(it.landed.length).toBe(3)
})

test("each completion write states the commit its files were read at", async () => {
  const it = seat()
  await runImportCompletion(WITH_STORED, it.deps)
  expect(it.sent).toEqual(["c1", "c1", "c1"])
})

test("a completion equal to what the file holds lands nothing", async () => {
  const it = seat(
    {},
    { [besideFor("temper-account-character", "slug-111")]: completionBody({ questsDone: 5 }) }
  )
  await runImportCompletion(CHARACTERS_ONLY, it.deps)
  expect(it.landed).toEqual([])
})

test("a completion file holding no JSON object is refused rather than merged from", async () => {
  const at = besideFor("temper-account-character", "slug-111")
  const it = seat({}, { [at]: "[1, 2, 3]" })
  await expect(runImportCompletion(CHARACTERS_ONLY, it.deps)).rejects.toThrow(
    unparsedCompletionWhy(at)
  )
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
  expect(sets(it.writes)[0]).toBe('{"key":"user-2"}')
})

test("every merge that held a field back names its subject in the outcome", async () => {
  const it = seat(
    {},
    {
      [besideFor("temper-account", "slug-user-1")]: '{"skillPointsSpent":99}',
      [besideFor("temper-account-character", "slug-111")]: '{"questsDone":9}',
      [besideFor("temper-companion-progress", "slug-bastian")]: '{"rapport":8}',
    }
  )
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

test("a completion lands at the path the pages named rather than at one composed here", async () => {
  const it = seat()
  await runImportCompletion(CHARACTERS_ONLY, it.deps)
  expect(it.landed.flat()[0]?.path).toBe(besideFor("temper-account-character", "slug-111"))
})
