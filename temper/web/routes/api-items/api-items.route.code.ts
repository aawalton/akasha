import type { MinedItemData } from "akasha/temper/items/core/modules/item-tooltip-types/item-tooltip-types.module.code.ts"
import { mineRowsKeyed } from "akasha/temper/web/modules/mine-row-reading/mine-row-reading.module.code.ts"
import { rowToMinedItemData } from "akasha/temper/web/modules/mined-item-rows/mined-item-rows.module.code.ts"

const MAX_BATCH_SIZE = 50

export async function loader({ request }: { request: Request }): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const idsParam = searchParams.get("ids")

  if (idsParam == null || idsParam.trim() === "") {
    return Response.json({ error: "Missing required query param: ids" }, { status: 400 })
  }

  const rawIds = idsParam
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isInteger(n) && n > 0)

  if (rawIds.length === 0) {
    return Response.json({ error: "No valid item IDs provided" }, { status: 400 })
  }

  const ids = rawIds.slice(0, MAX_BATCH_SIZE)

  const read = await mineRowsKeyed("items", "itemId", ids)
  if (!read.ok) return Response.json({ error: read.why }, { status: 503 })

  const items: MinedItemData[] = read.rows.map(rowToMinedItemData)

  return Response.json(items)
}
