import { optimizeShopping } from "akasha/temper/economy/shopping/modules/ttc-shopping-optimizer/ttc-shopping-optimizer.module.code.ts"
import type { ShoppingItem } from "akasha/temper/economy/shopping/modules/ttc-shopping-types/ttc-shopping-types.module.code.ts"
import { TTC_AGO } from "akasha/temper/economy/trading/pricing/modules/ttc-listing-types/ttc-listing-types.module.code.ts"
import { loadKioskNames } from "akasha/temper/web/modules/kiosk-names-loading/kiosk-names-loading.module.code.ts"
import { createTTCListingClient } from "akasha/temper/web/modules/ttc-listing-client/ttc-listing-client.module.code.ts"
import type { ShoppingOptimizeReason } from "akasha/temper/web/player-economics-ui/modules/shopping-optimizer-types/shopping-optimizer-types.module.code.ts"

const ttcClient = createTTCListingClient()

const SSE_HEADERS = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
} as const

function sseEvent(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
}

function refused(reason: ShoppingOptimizeReason): Response {
  return new Response(JSON.stringify({ reason }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  })
}

export async function action({ request }: { request: Request }): Promise<Response> {
  let parsed: unknown
  try {
    parsed = await request.json()
  } catch {
    return refused("unreadable-request")
  }

  if (!Array.isArray(parsed) || parsed.length === 0) return refused("no-items")
  const items: ShoppingItem[] = parsed

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()

      const send = (event: string, data: unknown) => {
        controller.enqueue(encoder.encode(sseEvent(event, data)))
      }

      try {
        const kioskNames = await loadKioskNames()
        const plan = await optimizeShopping(ttcClient, items, kioskNames, {
          ago: TTC_AGO.Hours6,
          maxPagesPerItem: 3,
          onSearchProgress: (completed, total) => {
            send("progress", { completed, total })
          },
        })
        send("complete", { plan })
      } catch (err) {
        console.error("[api-shopping-optimize] search failed:", err)
        const reason: ShoppingOptimizeReason = "search-failed"
        send("error", { reason })
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, { headers: SSE_HEADERS })
}
