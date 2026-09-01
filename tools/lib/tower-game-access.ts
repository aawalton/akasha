import { type TowerState, TowerStateSchema } from "@akasha/tower-core/tower-state"
import { TOWER_SESSION_SLUG } from "@akasha/tower/tower-page-slugs"
import { askComposed } from "@shared/pages-query/ask"

const GAME_KEY = "game-slug"

const SESSION_KEYS: readonly string[] = [
  "id",
  "external-id",
  "turn",
  "hud",
  "sheet",
  "log",
  "chapters",
  GAME_KEY,
]

export interface TowerSessionRecord {
  readonly id: string
  readonly externalId: string
  readonly session: TowerState
}

type Values = Readonly<Record<string, unknown>>

function idOf(values: Values): string {
  const held = values["id"]
  if (typeof held !== "string" || held.trim() === "") {
    throw new Error(
      `a \`${TOWER_SESSION_SLUG}\` row carries no id, and a row is named by its slug or its id and ` +
        `by nothing else, so nothing states which row to write back to`
    )
  }
  return held.trim()
}

function turnOf(values: Values): number {
  const held = values["turn"]
  if (typeof held === "number") return held
  if (typeof held === "string" && held.trim() !== "") {
    const read = Number(held)
    if (Number.isFinite(read)) return read
  }
  throw new Error(`\`turn\` reads as ${JSON.stringify(held)}, which is not a number`)
}

async function sessionRow(game: string, externalId: string): Promise<Values | null> {
  const asked = await askComposed({
    "page-type": TOWER_SESSION_SLUG,
    where: { "external-id": { is: externalId } },
    keys: SESSION_KEYS,
  })
  if (!asked.ok) {
    throw new Error(`\`${TOWER_SESSION_SLUG}/${externalId}\` went unread: ${asked.why}`)
  }
  const held = asked.answer.rows
    .map((row) => row.values)
    .filter((values) => values[GAME_KEY] === game)
  if (held.length > 1) {
    throw new Error(
      `\`${game}\` holds ${held.length} sessions whose external id is \`${externalId}\`, ` +
        `so nothing states which one to write`
    )
  }
  return held[0] ?? null
}

// NO TURN HAS BEEN COMMITTED SINCE THE STORE STOPPED TAKING KEYED WRITES. A new session went in
// with `writeRow` and a standing one with `patchRow`; both refuse, so `ops tower commit` fails on
// either branch. `getTowerSession` below still reads, so `ops tower state` and `ops tower
// snapshot` answer — against whatever turn stood when the writes died. The game reads as playable
// and does not advance.
//
// The turn is still parsed and narrowed before the refusal, so a commit that would have been
// rejected as malformed is still rejected as malformed rather than blamed on the store.
const NO_KEYED_WRITE = "the page store refuses every keyed write"

export async function upsertTowerSession(args: {
  readonly game: string
  readonly externalId: string
  readonly session: TowerState
  readonly characterId?: string
  readonly floorId?: string
}): Promise<TowerSessionRecord> {
  const session = TowerStateSchema.parse(args.session)
  const standing = await sessionRow(args.game, args.externalId)

  throw new Error(
    `\`${TOWER_SESSION_SLUG}/${args.externalId}\` was not ` +
      `${standing === null ? "written" : "patched"} — ${NO_KEYED_WRITE}. ` +
      `Turn ${session.turn} of \`${args.game}\` was not kept, and the session still reads at ` +
      `${standing === null ? "no turn at all" : `turn ${turnOf(standing)}`}`
  )
}

export async function getTowerSession(
  game: string,
  externalId: string
): Promise<TowerSessionRecord | null> {
  const standing = await sessionRow(game, externalId)
  if (standing === null) return null
  const session = TowerStateSchema.parse({
    turn: turnOf(standing),
    hud: standing["hud"],
    sheet: standing["sheet"],
    log: standing["log"],
    chapters: standing["chapters"],
  })
  return { id: idOf(standing), externalId, session }
}
