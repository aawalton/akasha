import { expect, test } from "bun:test"
import {
  type CharacterCompletion,
  emptySkillPointProgress,
} from "akasha/temper/player/completion/modules/completion-progress/completion-progress.module.code.ts"
import {
  bodyOfRows,
  unpagedWhy,
} from "akasha/temper/watcher/modules/watcher-task-progress/watcher-task-progress.module.code.ts"
import {
  completionIn,
  namedPathsOf,
  overridden,
  type ProgressDeps,
  type Put,
  putsFor,
  refreshTaskProgress,
  rosterFrom,
  unreadCompletionWhy,
  unworkedWhy,
} from "akasha/temper/watcher/modules/watcher-task-progress-landing/watcher-task-progress-landing.module.code.ts"
import { z } from "zod"

const ROW_TOTALS = z.object({ progressTotal: z.number(), progressCurrent: z.number() })

const PAGE_PATH =
  "temper/progress/temper-task/pages/an-invented-task/an-invented-task.temper-task.ts"

const ROWS_PATH =
  "temper/progress/temper-task/pages/an-invented-task/an-invented-task.temper-task.progress.jsonl"

const PAGE = `import type { TemperTask } from "../../temper-task.page-type.types.ts"

export const craftingWrits = {
  id: "019db533-f381-761a-affb-ba493b613e2e",
  type: "page-type/temper-task",
  slug: "crafting-writs",
  progressTotal: 1,
  progressCurrent: 0,
} as const satisfies TemperTask
`

const INDEX = {
  characters: {
    durene: { label: "Durene", sortOrder: 10 },
    amerys: { label: "Amerys", sortOrder: 5 },
  },
  paths: {
    "daily-writs": {
      current: 7,
      total: 14,
      entries: { durene: { current: 7, total: 7 }, amerys: { current: 0, total: 7 } },
    },
  },
}

const TASK = { slug: "crafting-writs", completionCardId: "daily-writs" }

const PAGED = new Set(["durene", "amerys"])

const PATHS = new Map([["crafting-writs", PAGE_PATH]])

const CHARACTER_PAGE =
  "temper/character/temper-account-character/pages/durene/durene.temper-account-character.ts"

const CHARACTER_COMPLETION =
  "temper/character/temper-account-character/pages/durene/durene.temper-account-character.completion.json"

const ACCOUNT_PAGE = "temper/character/temper-account/pages/an-account/an-account.temper-account.ts"

const ACCOUNT_COMPLETION =
  "temper/character/temper-account/pages/an-account/an-account.temper-account.completion.json"

const CHARACTER_ROW = { slug: "durene", title: "Durene", firstName: "Durene", displayOrder: 10 }

const AN_INSTANT = "2026-09-13T00:00:00.000Z"

const FOLIUM_FLOOR = {
  completionCardId: "skill-points",
  completionItemPath: ["general", "foliumDiscognitum"],
  floor: 2,
} as const

function pagePathFor(named: { readonly pageTypeSlug: string }): string {
  if (named.pageTypeSlug === "temper-account-character") return CHARACTER_PAGE
  if (named.pageTypeSlug === "temper-account") return ACCOUNT_PAGE
  return PAGE_PATH
}

function progressRun(completion: string | null): {
  deps: ProgressDeps
  wrote: (readonly Put[])[]
} {
  const wrote: (readonly Put[])[] = []
  const held: Record<string, string | null> = {
    [CHARACTER_COMPLETION]: completion,
    [ACCOUNT_COMPLETION]: null,
    [PAGE_PATH]: PAGE,
    [ROWS_PATH]: null,
  }
  const bodyAt = (path: string) => ({ path, content: held[path] ?? null })
  return {
    wrote,
    deps: {
      ask: async (query) =>
        query.pageTypeSlug === "temper-account-character"
          ? { rows: [CHARACTER_ROW], n: 1 }
          : { rows: [{ slug: "an-account" }], n: 1 },
      pages: async (named) => ({
        ok: true,
        at: AN_INSTANT,
        unplaced: [],
        bodies: named.map((one) => bodyAt(pagePathFor(one))),
      }),
      files: async (paths) => ({
        ok: true,
        at: AN_INSTANT,
        unplaced: [],
        bodies: paths.map(bodyAt),
      }),
      write: async (puts) => {
        wrote.push(puts)
        return { ok: true, at: AN_INSTANT }
      },
      report: () => {},
    },
  }
}

test("a completion file holding no JSON object refuses and names the file", () => {
  expect(() => completionIn(CHARACTER_COMPLETION, "{ not json")).toThrow(
    unreadCompletionWhy(CHARACTER_COMPLETION)
  )
  expect(() => completionIn(CHARACTER_COMPLETION, "[1,2]")).toThrow(
    unreadCompletionWhy(CHARACTER_COMPLETION)
  )
})

test("a character with no completion file beside it counts as having no completion", () => {
  expect(completionIn<Record<string, number>>(CHARACTER_COMPLETION, null)).toBe(null)
  expect(completionIn<Record<string, number>>(CHARACTER_COMPLETION, "")).toBe(null)
  const read = completionIn<Record<string, number>>(CHARACTER_COMPLETION, '{"questsDone":3}')
  expect(read).toEqual({ questsDone: 3 })
})

test("a run that refuses leaves every progress file as it was", async () => {
  const { deps, wrote } = progressRun("{ not json")
  await expect(refreshTaskProgress("temper-account/test-account", [TASK], deps)).rejects.toThrow(
    unreadCompletionWhy(CHARACTER_COMPLETION)
  )
  expect(wrote).toEqual([])
})

test("a character with no completion file does not refuse the recomputation", async () => {
  const { deps } = progressRun(null)
  await expect(
    refreshTaskProgress("temper-account/test-account", [TASK], deps)
  ).resolves.toBeGreaterThanOrEqual(0)
})

test("a roster entry takes its label from the first name and falls back to the title", () => {
  const roster = rosterFrom(
    [
      { slug: "durene-faerise", title: "Durene Faerise", firstName: "Durene", displayOrder: 10 },
      { slug: "belavierr", title: "Belavierr", displayOrder: 18 },
    ],
    new Map()
  )
  expect(roster.map((one) => one.firstName)).toEqual(["Durene", "Belavierr"])
  expect(roster.map((one) => one.sortOrder)).toEqual([10, 18])
  expect(roster[0]?.completion).toBe(null)
})

test("a floor set by hand lifts a character's count before the reading is taken", () => {
  const held = new Map<string, CharacterCompletion | null>([
    ["the-death-of-chains", { skillPoints: emptySkillPointProgress() }],
  ])
  const lifted = overridden(held, new Map([["the-death-of-chains", [FOLIUM_FLOOR]]]))
  expect(lifted.get("the-death-of-chains")?.skillPoints?.foliumDiscognitum).toBe(2)
})

test("a character no floor names is left as the game reported", () => {
  const completion: CharacterCompletion = { skillPoints: emptySkillPointProgress() }
  const held = new Map<string, CharacterCompletion | null>([["the-death-of-magic", completion]])
  expect(overridden(held, new Map()).get("the-death-of-magic")).toBe(completion)
})

test("a character with no completion beside it takes no floor", () => {
  const held = new Map<string, CharacterCompletion | null>([["nobody", null]])
  expect(overridden(held, new Map([["nobody", [FOLIUM_FLOOR]]])).get("nobody")).toBe(null)
})

test("a row with no slug is passed over", () => {
  expect(rosterFrom([{ title: "Nobody" }], new Map())).toEqual([])
})

test("a task with no lines yet writes both the lines and the totals", () => {
  const puts = putsFor([TASK], INDEX, PAGED, PATHS, [
    { path: PAGE_PATH, content: PAGE },
    { path: ROWS_PATH, content: null },
  ])
  const paths = puts.map((one) => one.path)
  expect(paths).toContain(ROWS_PATH)
  expect(paths).toContain(PAGE_PATH)
  const page = puts.find((one) => one.path === PAGE_PATH)?.content ?? ""
  expect(page).toContain("progressTotal: 14,")
  expect(page).toContain("progressCurrent: 7,")
  expect(page).toContain('progress: "jsonl",')
})

test("the totals written are the totals of the lines written", () => {
  const puts = putsFor([TASK], INDEX, PAGED, PATHS, [
    { path: PAGE_PATH, content: PAGE },
    { path: ROWS_PATH, content: null },
  ])
  const rows = puts.find((one) => one.path === ROWS_PATH)?.content ?? ""
  const held = rows
    .split("\n")
    .filter((one) => one.trim() !== "")
    .map((one) => ROW_TOTALS.parse(JSON.parse(one)))
  expect(held.reduce((sum, one) => sum + one.progressTotal, 0)).toBe(14)
  expect(held.reduce((sum, one) => sum + one.progressCurrent, 0)).toBe(7)
})

test("lines that already say what the reading says are not written again", () => {
  const first = putsFor([TASK], INDEX, PAGED, PATHS, [
    { path: PAGE_PATH, content: PAGE },
    { path: ROWS_PATH, content: null },
  ])
  const rows = first.find((one) => one.path === ROWS_PATH)?.content ?? ""
  const page = first.find((one) => one.path === PAGE_PATH)?.content ?? ""
  const again = putsFor([TASK], INDEX, PAGED, PATHS, [
    { path: PAGE_PATH, content: page },
    { path: ROWS_PATH, content: rows },
  ])
  expect(again).toEqual([])
})

const NAMED_INDEX = {
  characters: INDEX.characters,
  paths: {
    "daily-writs": {
      current: 7,
      total: 14,
      effectiveCharacterId: "amerys",
      entries: { durene: { current: 7, total: 7 }, amerys: { current: 0, total: 7 } },
    },
  },
}

test("a rotating task states the character it falls to as a relation", () => {
  const puts = putsFor([{ ...TASK, scope: "next_character" }], NAMED_INDEX, PAGED, PATHS, [
    { path: PAGE_PATH, content: PAGE },
    { path: ROWS_PATH, content: null },
  ])
  const page = puts.find((one) => one.path === PAGE_PATH)?.content ?? ""
  expect(page).toContain('character: "temper-account-character/amerys",')
  expect(page).toContain('effectiveCharacter: "temper-account-character/amerys",')
})

test("a task pinned to one character is left naming the character it names", () => {
  const puts = putsFor([{ ...TASK, scope: "character" }], NAMED_INDEX, PAGED, PATHS, [
    { path: PAGE_PATH, content: PAGE },
    { path: ROWS_PATH, content: null },
  ])
  const page = puts.find((one) => one.path === PAGE_PATH)?.content ?? ""
  expect(page).toContain('effectiveCharacter: "temper-account-character/amerys",')
  expect(page).not.toContain("\n  character: ")
})

test("a rotating task no character is owed states none", () => {
  const puts = putsFor([{ ...TASK, scope: "next_character" }], INDEX, PAGED, PATHS, [
    { path: PAGE_PATH, content: PAGE },
    { path: ROWS_PATH, content: null },
  ])
  const page = puts.find((one) => one.path === PAGE_PATH)?.content ?? ""
  expect(page).not.toContain("temper-account-character/")
})

test("a task the index does not name writes nothing", () => {
  const puts = putsFor([{ slug: "crafting-writs" }], INDEX, PAGED, PATHS, [
    { path: PAGE_PATH, content: PAGE },
    { path: ROWS_PATH, content: null },
  ])
  expect(puts).toEqual([])
})

test("a task the pages placed no file for is passed over", () => {
  expect(putsFor([TASK], INDEX, PAGED, new Map(), [])).toEqual([])
})

test("a task naming a card no progress is worked out for is named to the caller", () => {
  const said: string[] = []
  const puts = putsFor(
    [{ slug: "crafting-writs", completionCardId: "a-card-with-no-checker" }],
    INDEX,
    PAGED,
    PATHS,
    [
      { path: PAGE_PATH, content: PAGE },
      { path: ROWS_PATH, content: null },
    ],
    (one) => {
      said.push(one)
    }
  )

  expect(puts).toEqual([])
  expect(said).toEqual([unworkedWhy("crafting-writs", "a-card-with-no-checker")])
})

test("the path each task names is handed to the reading", () => {
  expect(
    namedPathsOf([
      TASK,
      {
        slug: "dragonguard",
        completionCardId: "character-achievements",
        completionItemPath: ["Dragonhold", "Quests", "2612"],
      },
      { slug: "nameless" },
    ])
  ).toEqual([{ cardId: "character-achievements", itemPath: ["Dragonhold", "Quests", "2612"] }])
})

test("a task naming a card measured by nothing is passed over without a word too", () => {
  const said: string[] = []
  putsFor(
    [{ slug: "crafting-writs", completionCardId: "guild-sales" }],
    INDEX,
    PAGED,
    PATHS,
    [
      { path: PAGE_PATH, content: PAGE },
      { path: ROWS_PATH, content: null },
    ],
    (one) => {
      said.push(one)
    }
  )

  expect(said).toEqual([])
})

test("a task naming no card at all is passed over without a word", () => {
  const said: string[] = []
  putsFor(
    [{ slug: "crafting-writs" }],
    INDEX,
    PAGED,
    PATHS,
    [
      { path: PAGE_PATH, content: PAGE },
      { path: ROWS_PATH, content: null },
    ],
    (one) => {
      said.push(one)
    }
  )

  expect(said).toEqual([])
})

test("the lines keep the id a character's line already carried", () => {
  const held = bodyOfRows([
    {
      id: "kept-1",
      character: "temper-account-character/durene",
      progressTotal: 7,
      progressCurrent: 1,
      displayOrder: 10,
    },
  ])
  const puts = putsFor([TASK], INDEX, PAGED, PATHS, [
    { path: PAGE_PATH, content: PAGE },
    { path: ROWS_PATH, content: held },
  ])
  const rows = puts.find((one) => one.path === ROWS_PATH)?.content ?? ""
  expect(rows).toContain('"id":"kept-1","character":"temper-account-character/durene"')
})

test("a character no page is for is named to the caller and its line is not written", () => {
  const said: string[] = []
  const puts = putsFor(
    [TASK],
    INDEX,
    new Set(["durene"]),
    PATHS,
    [
      { path: PAGE_PATH, content: PAGE },
      { path: ROWS_PATH, content: null },
    ],
    (one) => {
      said.push(one)
    }
  )
  const rows = puts.find((one) => one.path === ROWS_PATH)?.content ?? ""
  expect(said).toEqual([unpagedWhy("crafting-writs", "amerys")])
  expect(rows).toContain('"character":"temper-account-character/durene"')
  expect(rows).not.toContain("amerys")
})
