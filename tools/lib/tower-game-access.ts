import { type TowerState, TowerStateSchema } from "@alanwalton/tower-core/state-schema"
import { TOWER_SESSION_SLUG } from "@alanwalton/tower/tower/page-types"
import { patchRow, writeRow } from "@shared/pages-query"
import { askComposed } from "@shared/pages-query/ask"

export const TOWER_WRITER = "ops tower"

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

function valuesFor(
  externalId: string,
  session: TowerState,
  characterId?: string,
  floorId?: string
): Readonly<Record<string, unknown>> {
  return {
    "external-id": externalId,
    turn: session.turn,
    hud: session.hud,
    sheet: session.sheet,
    log: session.log,
    chapters: session.chapters,
    ...(characterId === undefined ? {} : { character: characterId }),
    ...(floorId === undefined ? {} : { floor: floorId }),
  }
}

export async function upsertTowerSession(args: {
  readonly game: string
  readonly externalId: string
  readonly session: TowerState
  readonly characterId?: string
  readonly floorId?: string
}): Promise<TowerSessionRecord> {
  const session = TowerStateSchema.parse(args.session)
  const values = valuesFor(args.externalId, session, args.characterId, args.floorId)
  const standing = await sessionRow(args.game, args.externalId)

  if (standing === null) {
    const written = await writeRow(TOWER_SESSION_SLUG, args.game, values, TOWER_WRITER)
    if (!written.ok) {
      throw new Error(
        `\`${TOWER_SESSION_SLUG}/${args.externalId}\` was not written: ${written.why}`
      )
    }
    const back = await sessionRow(args.game, args.externalId)
    if (back === null) {
      throw new Error(
        `\`${TOWER_SESSION_SLUG}/${args.externalId}\` landed and then read back as nothing`
      )
    }
    return { id: idOf(back), externalId: args.externalId, session }
  }

  const id = idOf(standing)
  const patched = await patchRow(TOWER_SESSION_SLUG, args.game, { id, ...values }, TOWER_WRITER)
  if (!patched.ok) {
    throw new Error(`\`${TOWER_SESSION_SLUG}/${args.externalId}\` was not patched: ${patched.why}`)
  }
  return { id, externalId: args.externalId, session }
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
