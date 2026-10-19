import { slugOf } from "akasha/page/naming/folding/modules/slug-of/slug-of.module.code.ts"
import { luaArrayOrEmpty } from "akasha/temper/eso/saved-variable/modules/lua-array/lua-array.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"
import {
  characterLinesLanded,
  type LinesLanded,
  type LinesLandingDeps,
} from "akasha/temper/player/character/temper-account-character/modules/character-lines-landing/character-lines-landing.module.code.ts"
import { log } from "akasha/temper/watcher/modules/watcher-logging/watcher-logging.module.code.ts"
import {
  jsonlBodyOf,
  jsonlLinesOf,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"
import { z } from "zod"

const FIGHTS_GLOBAL = "TemperCombat_FightCaptures"

const FIGHTS_ASSIGNED = new RegExp(`${FIGHTS_GLOBAL}\\s*=\\s*\\{`)

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

export type Fight = z.infer<typeof fightShape>

type FightKeyed = { readonly capturedAt: number; readonly combatSeconds: number }

export function fightsOf(data: unknown): readonly Fight[] {
  return fightsShape.parse(data)
}

export function fightsIn(content: string): readonly Fight[] {
  if (!FIGHTS_ASSIGNED.test(content)) return []
  return fightsOf(parseLuaSavedVariablesFile(content, FIGHTS_GLOBAL))
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

const FIGHTS_KIND = {
  property: "fights",
  what: "fight",
  left: "its fights stay in the game's file",
  linesWith: fightsWith,
}

export function landFights(
  fights: readonly Fight[],
  deps: LinesLandingDeps = {}
): Promise<LinesLanded> {
  return characterLinesLanded(fightsBySlug(fights), FIGHTS_KIND, deps)
}

export async function runImportFights(
  content: string,
  deps: LinesLandingDeps = {}
): Promise<LinesLanded> {
  const report = deps.report ?? log
  const fights = fightsIn(content)
  report(`found ${fights.length} fight(s)`)
  return landFights(fights, deps)
}
