import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type { EffectSourceInterface } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import { sourceEffectsOf } from "akasha/temper/player/character/source/modules/source-effects-reading/source-effects-reading.module.code.ts"

const CATEGORY = "account"

interface EsoPlusTemplate extends EffectSourceInterface {
  categoryId: typeof CATEGORY
  name: string
  description: string
}

export type EsoPlusId = string

type EsoPlusTable = DataFile<EsoPlusId, EsoPlusTemplate>

type Row = Readonly<Record<string, unknown>>

const UNREAD =
  "the ESO Plus pages are read with the skill catalogue, and nothing has read them yet — gate the screen on `SkillCatalogGate`, or await `loadSkillCatalog()` where the work starts"

class EsoPlusUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "EsoPlusUnread"
  }
}

function placed(row: Row): readonly [number, EsoPlusTemplate] {
  const at = `the ESO Plus page \`${String(row.slug)}\``
  if (typeof row.hashPlace !== "number") throw new Error(`${at} states no hash place`)
  if (typeof row.title !== "string") throw new Error(`${at} states no title`)
  if (typeof row.description !== "string") throw new Error(`${at} states no description`)
  return [
    row.hashPlace,
    {
      id: String(row.slug),
      name: row.title,
      description: row.description,
      categoryId: CATEGORY,
      effects: sourceEffectsOf(row, at),
    },
  ]
}

export function esoPlusOf(pages: Iterable<Row>): EsoPlusTable {
  const read = [...pages]
    .map(placed)
    .sort(([one], [two]) => one - two)
    .map(([, template]) => template)
  return createDataFile<EsoPlusTemplate>()(Object.fromEntries(read.map((one) => [one.id, one])))
}

let held: EsoPlusTable | null = null

export function holdEsoPlus(read: EsoPlusTable): EsoPlusTable {
  held = read
  return read
}

export function esoPlus(): EsoPlusTable {
  if (held === null) throw new EsoPlusUnread()
  return held
}
