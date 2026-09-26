import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import { inHashPlaces } from "akasha/temper/player/character/source/modules/source-effects-reading/source-effects-reading.module.code.ts"

interface Alliance {
  id: string
  name: string
  esoAllianceId: number
}

export type AllianceId = string

type Alliances = DataFile<AllianceId, Alliance>

type Row = Readonly<Record<string, unknown>>

const UNREAD =
  "the alliances are read with the skill catalogue, and nothing has read them yet — gate the screen on `SkillCatalogGate`, or await `loadSkillCatalog()` where the work starts"

class AlliancesUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "AlliancesUnread"
  }
}

function placed(row: Row): readonly [number, Alliance] {
  const at = `the alliance page \`${String(row.slug)}\``
  if (typeof row.hashPlace !== "number") throw new Error(`${at} states no hash place`)
  if (typeof row.title !== "string") throw new Error(`${at} states no title`)
  if (typeof row.esoAllianceId !== "number") throw new Error(`${at} states no game number`)
  return [
    row.hashPlace,
    { id: String(row.slug), name: row.title, esoAllianceId: row.esoAllianceId },
  ]
}

export function alliancesOf(pages: Iterable<Row>): Alliances {
  const read = inHashPlaces([...pages].map(placed))
  return createDataFile<Alliance>()(Object.fromEntries(read.map((one) => [one.id, one])))
}

let held: Alliances | null = null

export function holdAlliances(read: Alliances): Alliances {
  held = read
  return read
}

export function alliances(): Alliances {
  if (held === null) throw new AlliancesUnread()
  return held
}
