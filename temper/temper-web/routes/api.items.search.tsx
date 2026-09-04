import { askComposed } from "@akasha/pages-query/store-spelled-asking"
import type { MinedItemSearchResult } from "@akasha/temper-items-core/item-tooltip-types"
import {
  MINED_ITEM_PAGE_TYPE,
  rowToSearchResult,
} from "../mined-item-rows/mined-item-rows.module.code.ts"
import type { Route } from "./+types/api.items.search"

const DEFAULT_LIMIT = 20
const MAX_LIMIT = 20

const SEARCH_KEYS = [
  "itemId",
  "name",
  "icon",
  "quality",
  "itemType",
  "filterType",
  "setName",
] as const

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const { searchParams } = new URL(request.url)
  const raw = searchParams.get("q")
  const q = raw?.trim() ?? ""

  if (q.length < 2) {
    return Response.json(
      { error: "Query param 'q' is required and must be at least 2 characters" },
      { status: 400 }
    )
  }

  const asked = await askComposed({
    "page-type": MINED_ITEM_PAGE_TYPE,
    where: { name: { contains: q } },
    keys: SEARCH_KEYS,
    limit: Math.min(DEFAULT_LIMIT, MAX_LIMIT),
  })
  if (!asked.ok) {
    return Response.json({ error: asked.why }, { status: asked.status === 404 ? 404 : 503 })
  }

  const results: MinedItemSearchResult[] = asked.answer.rows.map((row) =>
    rowToSearchResult(row.values)
  )

  return Response.json(results)
}
