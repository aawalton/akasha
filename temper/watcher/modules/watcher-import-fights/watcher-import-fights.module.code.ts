import { asRecord } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { upsertPage } from "akasha/page/access/modules/upsert/upsert.module.code.ts"
import { slugOf } from "akasha/page/naming/folding/modules/slug-of/slug-of.module.code.ts"
import {
  readFiles,
  readPages,
  writeFiles,
} from "akasha/page/query/modules/store-writing/store-writing.module.code.ts"
import { luaArrayOrEmpty } from "akasha/temper/eso/saved-variable/modules/lua-array/lua-array.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"
import type {
  CompletionPageRead,
  CompletionPageUpsert,
} from "akasha/temper/watcher/modules/watcher-import-completion/watcher-import-completion.module.code.ts"
import { log } from "akasha/temper/watcher/modules/watcher-logging/watcher-logging.module.code.ts"
import {
  besidePathsFor,
  contentIn,
  jsonlBodyOf,
  jsonlLinesOf,
  PAGE_LANDING_WRITER,
  type ReadFiles,
  type ReadPages,
  type WriteFiles,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"
import { z } from "zod"

const FIGHTS_GLOBAL = "TemperCombat_FightCaptures"

const FIGHTS_ASSIGNED = new RegExp(`${FIGHTS_GLOBAL}\\s*=\\s*\\{`)

const CHARACTER_PAGE_TYPE_SLUG = "temper-account-character"

const FIGHTS_PROPERTY = "fights"

const FIGHTS_ENDING = "jsonl"

const CHARACTER_ROW_LIMIT = 1000

const LOG_LINE_JOIN = ";"

const rowsShape = luaArrayOrEmpty(z.record(z.string(), z.unknown()))

const fightShape = z
  .object({
    character: z.string(),
    capturedAt: z.number(),
    activeSeconds: z.number(),
    combatSeconds: z.number(),
    abilities: rowsShape.optional(),
    ticks: rowsShape.optional(),
    units: rowsShape.optional(),
    log: luaArrayOrEmpty(z.string()).optional(),
  })
  .passthrough()

const fightsShape = luaArrayOrEmpty(fightShape)

const heldFightShape = z.object({ capturedAt: z.number(), combatSeconds: z.number() })

type Fight = z.infer<typeof fightShape>

type FightKeyed = { readonly capturedAt: number; readonly combatSeconds: number }

interface ImportFightsDeps {
  readonly read?: CompletionPageRead
  readonly upsert?: CompletionPageUpsert
  readonly readPages?: ReadPages
  readonly readFiles?: ReadFiles
  readonly writeFiles?: WriteFiles
  readonly report?: (message: string) => void
}

interface ImportFightsOutcome {
  readonly landed: number
  readonly unplaced: readonly string[]
}

export function fightsIn(content: string): readonly Fight[] {
  if (!FIGHTS_ASSIGNED.test(content)) return []
  return fightsShape.parse(parseLuaSavedVariablesFile(content, FIGHTS_GLOBAL))
}

function fightKey(fight: FightKeyed): string {
  return `${fight.capturedAt}:${fight.combatSeconds}`
}

function fightLine(fight: Fight): string {
  return JSON.stringify({ ...fight, log: (fight.log ?? []).join(LOG_LINE_JOIN) })
}

function heldKeys(lines: readonly string[]): Set<string> {
  const keys = new Set<string>()
  for (const line of lines) {
    let parsed: unknown
    try {
      parsed = JSON.parse(line)
    } catch {
      continue
    }
    const read = heldFightShape.safeParse(parsed)
    if (read.success) keys.add(fightKey(read.data))
  }
  return keys
}

export function fightsWith(body: string | null, fights: readonly Fight[]): string | null {
  const held = jsonlLinesOf(body)
  const keys = heldKeys(held)
  const fresh: string[] = []
  for (const fight of [...fights].sort((a, b) => a.capturedAt - b.capturedAt)) {
    const key = fightKey(fight)
    if (keys.has(key)) continue
    keys.add(key)
    fresh.push(fightLine(fight))
  }
  if (fresh.length === 0) return null
  return jsonlBodyOf([...held, ...fresh])
}

function fightsBySlug(fights: readonly Fight[]): ReadonlyMap<string, readonly Fight[]> {
  const bySlug = new Map<string, Fight[]>()
  for (const fight of fights) {
    const slug = slugOf(fight.character)
    const held = bySlug.get(slug)
    if (held === undefined) bySlug.set(slug, [fight])
    else held.push(fight)
  }
  return bySlug
}

function unplacedWhy(slug: string): string {
  return `no ${CHARACTER_PAGE_TYPE_SLUG} page is named ${slug}, so its fights stay in the game's file`
}

export async function runImportFights(
  content: string,
  deps: ImportFightsDeps = {}
): Promise<ImportFightsOutcome> {
  const report = deps.report ?? log
  const fights = fightsIn(content)
  report(`found ${fights.length} fight(s)`)
  if (fights.length === 0) return { landed: 0, unplaced: [] }

  const bySlug = fightsBySlug(fights)
  const rows = await (deps.read ?? getPages)({
    pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
    select: ["slug"],
    limit: CHARACTER_ROW_LIMIT,
  })
  const known = new Set(rows.rows.map((row) => asRecord(row)?.slug))
  const slugs = [...bySlug.keys()].filter((slug) => known.has(slug))
  const unplaced = [...bySlug.keys()].filter((slug) => !known.has(slug))
  for (const slug of unplaced) report(unplacedWhy(slug))
  if (slugs.length === 0) return { landed: 0, unplaced }

  const beside = await besidePathsFor(
    deps.readPages ?? readPages,
    CHARACTER_PAGE_TYPE_SLUG,
    slugs,
    FIGHTS_PROPERTY,
    FIGHTS_ENDING
  )
  const found = await (deps.readFiles ?? readFiles)([...beside.values()])
  if (!found.ok) throw new Error(`the fights files went unread: ${found.why}`)

  const puts: { path: string; content: string }[] = []
  const unnamed: string[] = []
  let landed = 0
  for (const slug of slugs) {
    const path = beside.get(slug) ?? ""
    const held = contentIn(found.bodies, path)
    const written = fightsWith(held, bySlug.get(slug) ?? [])
    if (written === null) continue
    landed = landed + jsonlLinesOf(written).length - jsonlLinesOf(held).length
    puts.push({ path, content: written })
    if (held === null) unnamed.push(slug)
  }
  if (puts.length > 0) {
    const wrote = await (deps.writeFiles ?? writeFiles)(
      puts,
      PAGE_LANDING_WRITER,
      `temper: ${landed} fight(s) for ${puts.length} character(s)`,
      undefined,
      undefined,
      found.at
    )
    if (!wrote.ok) throw new Error(`the fights did not land: ${wrote.why}`)
  }
  for (const slug of unnamed) {
    await (deps.upsert ?? upsertPage)({
      pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
      where: [{ key: "slug", eq: slug }],
      set: { [FIGHTS_PROPERTY]: FIGHTS_ENDING },
      select: ["id"],
    })
  }
  report(`landed ${landed} fight(s)`)
  return { landed, unplaced }
}
