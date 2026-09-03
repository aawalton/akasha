import { askComposed } from "@akasha/pages-query/store-spelled-asking"
import { assembleInventory } from "@akasha/temper-items-core/assemble-inventory"
import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import { shape } from "../shape.ts"
import type { Infer } from "../shape-core"

export const SNAPSHOT_PAGE_TYPE = "temper-inventory-snapshot"
export const CHUNK_PAGE_TYPE = "temper-inventory-chunk"

const CHUNK_CEILING = 200

const SNAPSHOT_KEYS = ["slug", "id", "account-page", "captured-at", "total-value", "chunk-count"]

const CHUNK_KEYS = ["inventory", "chunk-index", "data"]

const SNAPSHOT_HEADER_SHAPE = shape.looseObject({
  id: shape.string(),
  slug: shape.string(),
  "captured-at": shape.string(),
  "total-value": shape.coerce.number(),
  "chunk-count": shape.coerce.number(),
})

export type SnapshotHeader = Infer<typeof SNAPSHOT_HEADER_SHAPE>

const CHUNK_ROW_SHAPE = shape.looseObject({
  "chunk-index": shape.coerce.number(),
  data: shape.string(),
})

export type Chunk = {
  readonly chunkIndex: number
  readonly data: string
}

async function headerFrom(
  where: Readonly<Record<string, unknown>>,
  descending: boolean
): Promise<SnapshotHeader | null> {
  const asked = await askComposed({
    "page-type": SNAPSHOT_PAGE_TYPE,
    where,
    keys: SNAPSHOT_KEYS,
    "sort-by": "captured-at",
    descending,
    limit: 1,
  })
  if (!asked.ok) throw new Error(`${SNAPSHOT_PAGE_TYPE} went unread — ${asked.why}`)
  const row = asked.answer.rows[0]
  return row === undefined ? null : SNAPSHOT_HEADER_SHAPE.parse(row.values)
}

export function latestSnapshot(accountUserId: string): Promise<SnapshotHeader | null> {
  return headerFrom({ "account-page": { is: accountUserId } }, true)
}

export function snapshotWithId(id: string): Promise<SnapshotHeader | null> {
  return headerFrom({ id: { is: id } }, false)
}

export async function snapshotChunks(inventory: string): Promise<readonly Chunk[]> {
  const asked = await askComposed({
    "page-type": CHUNK_PAGE_TYPE,
    where: { inventory: { is: inventory } },
    keys: CHUNK_KEYS,
    "sort-by": "chunk-index",
    limit: CHUNK_CEILING,
  })
  if (!asked.ok) throw new Error(`${CHUNK_PAGE_TYPE} went unread — ${asked.why}`)
  return asked.answer.rows.map((row) => {
    const parsed = CHUNK_ROW_SHAPE.parse(row.values)
    return { chunkIndex: parsed["chunk-index"], data: parsed.data }
  })
}

export async function assembleSnapshot(
  chunks: readonly Chunk[]
): Promise<InventoryDatabase | null> {
  return assembleInventory(chunks)
}
