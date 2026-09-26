import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import { inHashPlaces } from "akasha/temper/player/character/source/modules/source-effects-reading/source-effects-reading.module.code.ts"

interface VampireStage {
  id: string
  name: string
  stage: number
  esoVampireStageId: number
  description: string
}

export type VampireStageId = string

type VampireStages = DataFile<VampireStageId, VampireStage>

type Row = Readonly<Record<string, unknown>>

const UNREAD =
  "the vampire stages are read with the skill catalogue, and nothing has read them yet — gate the screen on `SkillCatalogGate`, or await `loadSkillCatalog()` where the work starts"

class VampireStagesUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "VampireStagesUnread"
  }
}

function placed(row: Row): readonly [number, VampireStage] {
  const at = `the vampire stage page \`${String(row.slug)}\``
  if (typeof row.hashPlace !== "number") throw new Error(`${at} states no hash place`)
  if (typeof row.key !== "string") throw new Error(`${at} states no key`)
  if (typeof row.title !== "string") throw new Error(`${at} states no title`)
  if (typeof row.displayOrder !== "number") throw new Error(`${at} states no stage number`)
  if (typeof row.esoVampireStageId !== "number") throw new Error(`${at} states no game ability`)
  if (typeof row.description !== "string") throw new Error(`${at} states no description`)
  return [
    row.hashPlace,
    {
      id: row.key,
      name: row.title,
      stage: row.displayOrder,
      esoVampireStageId: row.esoVampireStageId,
      description: row.description,
    },
  ]
}

export function vampireStagesOf(pages: Iterable<Row>): VampireStages {
  const read = inHashPlaces([...pages].map(placed))
  return createDataFile<VampireStage>()(Object.fromEntries(read.map((one) => [one.id, one])))
}

let held: VampireStages | null = null

export function holdVampireStages(read: VampireStages): VampireStages {
  held = read
  return read
}

export function vampireStages(): VampireStages {
  if (held === null) throw new VampireStagesUnread()
  return held
}
