import type { MinedItemSearchResult } from "akasha/temper/items/core/modules/item-tooltip-types/item-tooltip-types.module.code.ts"
import { mineRowsNamed } from "akasha/temper/web/modules/mine-row-reading/mine-row-reading.module.code.ts"
import { rowToSearchResult } from "akasha/temper/web/modules/mined-item-rows/mined-item-rows.module.code.ts"

const LIMIT = 20

export async function loader({ request }: { request: Request }): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const raw = searchParams.get("q")
  const q = raw?.trim() ?? ""

  if (q.length < 2) {
    return Response.json(
      { error: "Query param 'q' is required and must be at least 2 characters" },
      { status: 400 }
    )
  }

  const read = await mineRowsNamed("items", q, LIMIT)
  if (!read.ok) return Response.json({ error: read.why }, { status: 503 })

  const results: MinedItemSearchResult[] = read.rows.map(rowToSearchResult)

  return Response.json(results)
}
