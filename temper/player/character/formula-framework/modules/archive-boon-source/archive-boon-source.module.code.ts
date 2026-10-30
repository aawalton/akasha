import { temperVerse } from "akasha/temper/catalog/effect/temper-verse/temper-verse.page-type.ts"
import { temperVision } from "akasha/temper/catalog/effect/temper-vision/temper-vision.page-type.ts"
import type { EffectSourceInterface } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import {
  entryEffectsOf,
  type MetricNodes,
  metricNodesOf,
} from "akasha/temper/player/character/source/modules/source-effects-reading/source-effects-reading.module.code.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"

type Category = "buffs"

type ArchiveBoonSource = EffectSourceInterface<Category> & {
  readonly esoAbilityId: number
  readonly name: string
  readonly description: string
}

type ArchiveBoonCatalog = ReadonlyMap<number, ArchiveBoonSource>

const FIELDS: readonly string[] = ["slug", "key", "title", "description", "esoAbilityId", "effects"]

export const ARCHIVE_BOON_READS: readonly (readonly [string, readonly string[]])[] = [
  [temperVision.slug, FIELDS],
  [temperVerse.slug, FIELDS],
  [temperMetricTree.slug, ["slug", "nodeId"]],
]

type Row = Readonly<Record<string, unknown>>

const UNREAD =
  "the archive boons are read with the skill catalogue, and nothing has read them yet — hold them before the work starts"

class ArchiveBoonsUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "ArchiveBoonsUnread"
  }
}

function archiveBoonOf(row: Row, nodes: MetricNodes, pageTypeSlug: string): ArchiveBoonSource {
  const at = `the ${pageTypeSlug} page \`${String(row.slug)}\``
  if (typeof row.key !== "string") throw new Error(`${at} states no key`)
  if (typeof row.title !== "string") throw new Error(`${at} states no title`)
  if (typeof row.description !== "string") throw new Error(`${at} states no description`)
  if (typeof row.esoAbilityId !== "number") throw new Error(`${at} states no ability id`)
  return {
    id: row.key,
    esoAbilityId: row.esoAbilityId,
    name: row.title,
    description: row.description,
    categoryId: "buffs",
    effects: entryEffectsOf(row, nodes, at),
  }
}

export function archiveBoonsOf(
  rowsOf: (pageTypeSlug: string) => Iterable<Row>
): ArchiveBoonCatalog {
  const nodes = metricNodesOf(rowsOf(temperMetricTree.slug))
  const found = new Map<number, ArchiveBoonSource>()
  for (const pageTypeSlug of [temperVision.slug, temperVerse.slug]) {
    for (const row of rowsOf(pageTypeSlug)) {
      const one = archiveBoonOf(row, nodes, pageTypeSlug)
      const already = found.get(one.esoAbilityId)
      if (already !== undefined) {
        throw new Error(
          `the ${pageTypeSlug} page \`${String(row.slug)}\` and \`${already.id}\` state the same ability id`
        )
      }
      found.set(one.esoAbilityId, one)
    }
  }
  return found
}

let held: ArchiveBoonCatalog | null = null

export function holdArchiveBoons(read: ArchiveBoonCatalog): ArchiveBoonCatalog {
  held = read
  return read
}

export function archiveBoon(abilityId: number): ArchiveBoonSource | undefined {
  if (held === null) throw new ArchiveBoonsUnread()
  return held.get(abilityId)
}
