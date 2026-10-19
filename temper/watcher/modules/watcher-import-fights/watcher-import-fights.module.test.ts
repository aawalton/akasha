import { expect, test } from "bun:test"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type { CompletionPageUpsert } from "akasha/temper/watcher/modules/watcher-completion-landing/watcher-completion-landing.module.code.ts"
import type { CompletionPageRead } from "akasha/temper/watcher/modules/watcher-import-completion/watcher-import-completion.module.code.ts"
import {
  fightsIn,
  fightsWith,
  runImportFights,
} from "akasha/temper/watcher/modules/watcher-import-fights/watcher-import-fights.module.code.ts"
import type {
  ReadFiles,
  ReadPages,
  WriteFiles,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"

const ERIN_PAGE =
  "temper/player/character/temper-account-character/pages/erin-solstice/erin-solstice.temper-account-character.ts"

const ERIN_FIGHTS =
  "temper/player/character/temper-account-character/pages/erin-solstice/erin-solstice.temper-account-character.fights.jsonl"

const SAVED = `TemperCombat_LastFight =
{
    ["character"] = "Erin Solstice",
}
TemperCombat_FightCaptures =
{
    [1] = 
    {
        ["character"] = "Erin Solstice",
        ["capturedAt"] = 1760900020,
        ["activeSeconds"] = 12.5000000000,
        ["combatSeconds"] = 14,
        ["zone"] = "Infinite Archive",
        ["stage"] = 3,
        ["ticks"] = 
        {
            [1] = 
            {
                ["healing"] = 100,
                ["shield"] = 0,
            },
        },
        ["log"] = 
        {
            [1] = "6:10:1:7:9;6:20:1:7:9",
            [2] = "10:100:a%3Ab",
        },
    },
    [2] = 
    {
        ["character"] = "Erin Solstice",
        ["capturedAt"] = 1760900000,
        ["activeSeconds"] = 3,
        ["combatSeconds"] = 4,
        ["zone"] = "Gold Coast",
        ["log"] = 
        {
            [1] = "6:10:1:7:9",
        },
    },
    [3] = 
    {
        ["character"] = "Mrsha du Marquin",
        ["capturedAt"] = 1760900010,
        ["activeSeconds"] = 2,
        ["combatSeconds"] = 2,
        ["log"] = 
        {
        },
    },
}
`

interface Harness {
  readonly held: Record<string, string>
  readonly landed: string[][]
  readonly upserted: unknown[]
  readonly lines: string[]
  readonly deps: {
    read: CompletionPageRead
    upsert: CompletionPageUpsert
    readPages: ReadPages
    readFiles: ReadFiles
    writeFiles: WriteFiles
    report: (message: string) => void
  }
}

function harness(): Harness {
  const held: Record<string, string> = {}
  const landed: string[][] = []
  const upserted: unknown[] = []
  const lines: string[] = []
  const read: CompletionPageRead = async () => ({ rows: [asPage({ slug: "erin-solstice" })] })
  const upsert: CompletionPageUpsert = async (args) => {
    upserted.push(args)
    return asPage({ id: "page-1" })
  }
  const readPages: ReadPages = async (pages) => ({
    ok: true,
    at: "c1",
    bodies: pages.map(() => ({ path: ERIN_PAGE, content: "" })),
    unplaced: [],
  })
  const readFiles: ReadFiles = async (paths) => ({
    ok: true,
    at: "c1",
    bodies: paths.map((path) => ({ path, content: held[path] ?? null })),
    unplaced: [],
  })
  const writeFiles: WriteFiles = async (puts) => {
    landed.push(puts.map((one) => one.path))
    for (const one of puts) held[one.path] = one.content
    return { ok: true, at: "c2" }
  }
  const report = (message: string) => {
    lines.push(message)
  }
  return {
    held,
    landed,
    upserted,
    lines,
    deps: { read, upsert, readPages, readFiles, writeFiles, report },
  }
}

test("every fight the combat add-on wrote is read with its log strings in order", () => {
  const fights = fightsIn(SAVED)
  expect(fights.map((one) => one.capturedAt)).toEqual([1760900020, 1760900000, 1760900010])
  expect(fights[0]?.log).toEqual(["6:10:1:7:9;6:20:1:7:9", "10:100:a%3Ab"])
  expect(fights[0]?.ticks).toEqual([{ healing: 100, shield: 0 }])
  expect(fights[0]?.zone).toBe("Infinite Archive")
  expect(fights[2]?.log).toEqual([])
})

test("a file the combat add-on wrote no fights into holds none", () => {
  expect(fightsIn('TemperCombat_LastFight =\n{\n    ["character"] = "Erin",\n}\n')).toEqual([])
})

test("fights land oldest first with their log as one text", () => {
  const written = fightsWith(null, fightsIn(SAVED).slice(0, 2)) ?? ""
  const rows = written
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line))
  expect(rows.map((row) => row.capturedAt)).toEqual([1760900000, 1760900020])
  expect(rows[1].log).toBe("6:10:1:7:9;6:20:1:7:9;10:100:a%3Ab")
})

test("a fight already landed lands nothing again", () => {
  const fights = fightsIn(SAVED).slice(0, 2)
  const once = fightsWith(null, fights)
  expect(fightsWith(once, fights)).toBeNull()
})

test("a character's fights land beside that character's page, and the page is told the file", async () => {
  const at = harness()
  const outcome = await runImportFights(SAVED, at.deps)
  expect(outcome).toEqual({ landed: 2, unplaced: ["mrsha-du-marquin"] })
  expect(at.landed).toEqual([[ERIN_FIGHTS]])
  expect(at.held[ERIN_FIGHTS]?.trim().split("\n")).toHaveLength(2)
  expect(at.upserted).toEqual([
    {
      pageTypeSlug: "temper-account-character",
      where: [{ key: "slug", eq: "erin-solstice" }],
      set: { fights: "jsonl" },
      select: ["id"],
    },
  ])
  expect(at.lines).toContain(
    "no temper-account-character page is named mrsha-du-marquin, so its fights stay in the game's file"
  )
})

test("reading the same file again writes nothing", async () => {
  const at = harness()
  await runImportFights(SAVED, at.deps)
  const again = await runImportFights(SAVED, at.deps)
  expect(again.landed).toBe(0)
  expect(at.landed).toHaveLength(1)
  expect(at.upserted).toHaveLength(1)
})
