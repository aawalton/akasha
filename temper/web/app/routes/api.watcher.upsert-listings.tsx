import { isRecord } from "@shared/utils-narrow/is-record"
import { validateWatcherToken } from "@/lib/watcher-auth"
import type { Route } from "./+types/api.watcher.upsert-listings"

const MAX_LISTINGS_PER_REQUEST = 100

type MarketListing = {
  worldName: string
  guildName: string
  kioskName: string
  sellerName: string
  itemLink: string
  itemName: string
  stackCount: number
  price: number
  pricePerUnit: number
  quality: number
  timeRemaining: number
  capturedAt: number
  itemUniqueId: string
}

type RequestBody = {
  wtToken: string
  items: readonly MarketListing[]
}

function isMarketListing(v: unknown): v is MarketListing {
  if (!isRecord(v)) return false
  const o = v
  return (
    typeof o.worldName === "string" &&
    typeof o.guildName === "string" &&
    typeof o.itemLink === "string" &&
    typeof o.itemUniqueId === "string" &&
    typeof o.capturedAt === "number" &&
    typeof o.stackCount === "number" &&
    typeof o.price === "number" &&
    typeof o.pricePerUnit === "number" &&
    typeof o.quality === "number" &&
    typeof o.timeRemaining === "number"
  )
}

function isRequestBody(v: unknown): v is RequestBody {
  if (!isRecord(v)) return false
  if (typeof v.wtToken !== "string" || v.wtToken.length === 0) return false
  if (!Array.isArray(v.items)) return false
  return v.items.every(isMarketListing)
}

export async function action({ request }: Route.ActionArgs): Promise<Response> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  if (!isRequestBody(body)) {
    return Response.json({ error: "Malformed request body" }, { status: 400 })
  }

  const { wtToken, items } = body
  const validated = await validateWatcherToken(wtToken)
  if (!validated) {
    return Response.json({ error: "Invalid or expired watcher token" }, { status: 401 })
  }

  if (items.length > MAX_LISTINGS_PER_REQUEST) {
    return Response.json(
      {
        error: `Too many items: ${items.length} exceeds cap of ${MAX_LISTINGS_PER_REQUEST}. Batch smaller.`,
      },
      { status: 400 }
    )
  }

  return Response.json({ error: "pricing-pipeline-retired" }, { status: 410 })
}
