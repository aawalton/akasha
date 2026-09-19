import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import type { InventoryDatabase } from "akasha/temper/items-core/modules/inventory-types/inventory-types.module.code.ts"
import { z } from "zod"

const ACCOUNT_PAGE_TYPE = "temper-account"

const ACCOUNT_KEYS = ["slug", "id", "title", "captured-at", "total-value"]

const INVENTORY_HEADER_SHAPE = z
  .object({
    id: z.string(),
    slug: z.string(),
    "captured-at": z.string(),
    "total-value": z.coerce.number(),
  })
  .passthrough()

export type InventoryHeader = z.infer<typeof INVENTORY_HEADER_SHAPE>

export async function accountInventory(accountUserId: string): Promise<InventoryHeader | null> {
  const asked = await askComposed({
    "page-type": ACCOUNT_PAGE_TYPE,
    where: { title: { is: accountUserId } },
    keys: ACCOUNT_KEYS,
    limit: 1,
  })
  if (!asked.ok) throw new Error(`${ACCOUNT_PAGE_TYPE} went unread — ${asked.why}`)
  const row = asked.answer.rows[0]
  return row === undefined ? null : INVENTORY_HEADER_SHAPE.parse(row.values)
}

const DATA_PROPERTY = "data"

const HELD = "json"

export async function inventoryDatabase(slug: string): Promise<InventoryDatabase | null> {
  const root = codeRoot()
  const found = listedAt(root, ACCOUNT_PAGE_TYPE, slug)[0]
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
