import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import { inHashPlaces } from "akasha/temper/player/character/source/modules/source-effects-reading/source-effects-reading.module.code.ts"

interface CurseTemplate {
  id: string
  name: string
  esoCurseIds: readonly number[]
}

export type CurseState = string

type Curses = DataFile<CurseState, CurseTemplate>

type Row = Readonly<Record<string, unknown>>

const UNREAD =
  "the curses are read with the skill catalogue, and nothing has read them yet — gate the screen on `SkillCatalogGate`, or await `loadSkillCatalog()` where the work starts"

class CursesUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "CursesUnread"
  }
}

function numbersIn(held: unknown): readonly number[] {
  return Array.isArray(held) ? held.filter((one): one is number => typeof one === "number") : []
}

function placed(row: Row): readonly [number, CurseTemplate] {
  const at = `the curse page \`${String(row.slug)}\``
  if (typeof row.hashPlace !== "number") throw new Error(`${at} states no hash place`)
  if (typeof row.key !== "string") throw new Error(`${at} states no key`)
  if (typeof row.title !== "string") throw new Error(`${at} states no title`)
  return [row.hashPlace, { id: row.key, name: row.title, esoCurseIds: numbersIn(row.esoCurseIds) }]
}

export function cursesOf(pages: Iterable<Row>): Curses {
  const read = inHashPlaces([...pages].map(placed))
  return createDataFile<CurseTemplate>()(Object.fromEntries(read.map((one) => [one.id, one])))
}

let held: Curses | null = null

export function holdCurses(read: Curses): Curses {
  held = read
  return read
}

export function curses(): Curses {
  if (held === null) throw new CursesUnread()
  return held
}
