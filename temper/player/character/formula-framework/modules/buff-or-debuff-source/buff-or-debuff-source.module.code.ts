import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import { temperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.ts"
import { temperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.ts"
import { temperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.ts"
import { temperDebuffMajor } from "akasha/temper/catalog/effect/temper-debuff-major/temper-debuff-major.page-type.ts"
import { temperDebuffMinor } from "akasha/temper/catalog/effect/temper-debuff-minor/temper-debuff-minor.page-type.ts"
import { temperDebuffOther } from "akasha/temper/catalog/effect/temper-debuff-other/temper-debuff-other.page-type.ts"
import type { EffectSourceInterface } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import {
  entryEffectsOf,
  type MetricNodes,
  metricNodesOf,
} from "akasha/temper/player/character/source/modules/source-effects-reading/source-effects-reading.module.code.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"

type Category = "buffs" | "debuffs"

type Subcategory = "major" | "minor" | "other"

interface BuffOrDebuffTemplate extends EffectSourceInterface {
  categoryId: Category
  subcategoryId: Subcategory
  name: string
  description: string
}

type Kind = readonly [pageTypeSlug: string, categoryId: Category, subcategoryId: Subcategory]

const KINDS: readonly Kind[] = [
  [temperBuffMajor.slug, "buffs", "major"],
  [temperBuffMinor.slug, "buffs", "minor"],
  [temperBuffOther.slug, "buffs", "other"],
  [temperDebuffMajor.slug, "debuffs", "major"],
  [temperDebuffMinor.slug, "debuffs", "minor"],
  [temperDebuffOther.slug, "debuffs", "other"],
]

const FIELDS: readonly string[] = ["slug", "key", "title", "description", "effects"]

export const BUFF_OR_DEBUFF_READS: readonly (readonly [string, readonly string[]])[] = [
  ...KINDS.map(([pageTypeSlug]) => [pageTypeSlug, FIELDS] as const),
  [temperMetricTree.slug, ["slug", "nodeId"]],
]

export type BuffOrDebuffId = string

export type BuffOrDebuffSource = BuffOrDebuffTemplate

type BuffsAndDebuffs = DataFile<BuffOrDebuffId, BuffOrDebuffSource, Subcategory>

type Row = Readonly<Record<string, unknown>>

const UNREAD =
  "the buffs and debuffs are read with the skill and companion catalogues, and nothing has read them yet — gate the screen on `SkillCatalogGate` or `CompanionCatalogGate`"

class BuffsAndDebuffsUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "BuffsAndDebuffsUnread"
  }
}

function buffOrDebuffOf(row: Row, kind: Kind, nodes: MetricNodes): BuffOrDebuffSource {
  const [, categoryId, subcategoryId] = kind
  const at = `the ${kind[0]} page \`${String(row.slug)}\``
  if (typeof row.key !== "string") throw new Error(`${at} states no key`)
  if (typeof row.title !== "string") throw new Error(`${at} states no title`)
  if (typeof row.description !== "string") throw new Error(`${at} states no description`)
  return {
    id: row.key,
    name: row.title,
    description: row.description,
    categoryId,
    subcategoryId,
    effects: entryEffectsOf(row, nodes, at),
  }
}

export function buffsAndDebuffsOf(
  rowsOf: (pageTypeSlug: string) => Iterable<Row>
): BuffsAndDebuffs {
  const nodes = metricNodesOf(rowsOf(temperMetricTree.slug))
  const read = KINDS.flatMap((kind) =>
    [...rowsOf(kind[0])].map((row) => buffOrDebuffOf(row, kind, nodes))
  )
  return createDataFile<BuffOrDebuffSource>()(Object.fromEntries(read.map((one) => [one.id, one])))
}

let held: BuffsAndDebuffs | null = null

export function holdBuffsAndDebuffs(read: BuffsAndDebuffs): BuffsAndDebuffs {
  held = read
  return read
}

export function buffOrDebuff(): BuffsAndDebuffs {
  if (held === null) throw new BuffsAndDebuffsUnread()
  return held
}
