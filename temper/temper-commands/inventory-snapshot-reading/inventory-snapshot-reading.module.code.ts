import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { listedAt } from "@akasha/indexes"
import { askComposed } from "@akasha/pages-query/store-spelled-asking"
import { codeRoot } from "@akasha/pages-system/code-root"
import { besideAt } from "@akasha/pages-system/page-file-name"
import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import { z } from "zod"

export const SNAPSHOT_PAGE_TYPE = "temper-inventory-snapshot"

const SNAPSHOT_KEYS = ["slug", "id", "account-page", "captured-at", "total-value", "chunk-count"]

const SNAPSHOT_HEADER_SHAPE = z
  .object({
    id: z.string(),
    slug: z.string(),
    "captured-at": z.string(),
    "total-value": z.coerce.number(),
    "chunk-count": z.coerce.number(),
  })
  .passthrough()

export type SnapshotHeader = z.infer<typeof SNAPSHOT_HEADER_SHAPE>

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

const DATA_PROPERTY = "data"

const HELD = "json"

export async function snapshotDatabase(slug: string): Promise<InventoryDatabase | null> {
  const root = codeRoot()
  const found = listedAt(root, SNAPSHOT_PAGE_TYPE, slug)[0]
  if (found === undefined) return null
  const beside = besideAt(found.path, DATA_PROPERTY, HELD)
  if (beside === null) return null
  const at = join(root, beside)
  if (!existsSync(at)) return null
  try {
    return JSON.parse(await readFile(at, "utf8")) as InventoryDatabase
  } catch {
    return null
  }
}
