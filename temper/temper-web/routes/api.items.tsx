import { askComposed } from "@akasha/pages-query/store-spelled-asking"
import type { MinedItemData } from "@akasha/temper-items-core/item-tooltip-types"
import {
  MINED_ITEM_PAGE_TYPE,
  rowToMinedItemData,
} from "../mined-item-rows/mined-item-rows.module.code.ts"
import type { Route } from "./+types/api.items"

const MAX_BATCH_SIZE = 50

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
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

  const asked = await askComposed({
    "page-type": MINED_ITEM_PAGE_TYPE,
    where: { slug: { in: ids.map(String) } },
    limit: ids.length,
  })
  if (!asked.ok) {
    return Response.json({ error: asked.why }, { status: asked.status === 404 ? 404 : 503 })
  }

  const items: MinedItemData[] = asked.answer.rows.map((row) => rowToMinedItemData(row.values))

  return Response.json(items)
}
