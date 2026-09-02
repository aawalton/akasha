import {
  parseValidListings,
  ttcListingResponseSchema,
} from "@akasha/temper-trading-pricing/ttc-listing-schema"
import type {
  TTCListingClient,
  TTCListingClientOptions,
  TTCListingEntry,
  TTCListingPage,
  TTCListingSearchParams,
} from "@akasha/temper-trading-pricing/ttc-listing-types"

function logUnexpectedTtcBody(response: Response, data: unknown): undefined {
  const contentType = response.headers.get("content-type") ?? "unknown"
  const summary = JSON.stringify(data).slice(0, 200)
  console.warn(
    `[ttc-listing] unexpected response shape: HTTP ${response.status} ${contentType} — ${summary}`
  )
}

export function createTTCListingClient(options: TTCListingClientOptions = {}): TTCListingClient {
  const server = options.server ?? "us"
  const platform = options.platform ?? "pc"
  const requestsPerSecond = options.requestsPerSecond ?? 1 / 6
  const baseUrl = `https://${server}.tamrieltradecentre.com/api/${platform}/Trade/Search`

  let nextSlotAt = 0

  async function waitForSlot(): Promise<void> {
    const intervalMs = 1000 / requestsPerSecond
    const now = Date.now()
    const waitUntil = Math.max(now, nextSlotAt)
    nextSlotAt = waitUntil + intervalMs
    const delay = waitUntil - now
    if (delay > 0) {
      await new Promise<void>((resolve) => setTimeout(resolve, delay))
    }
  }

  async function search(params: TTCListingSearchParams): Promise<TTCListingPage> {
    await waitForSlot()

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Version: "13",
      },
      body: JSON.stringify({
        ...params,
        V3ReCaptchaToken: "temper",
      }),
      signal: AbortSignal.timeout(15_000),
    })

    if (!response.ok) {
      throw new Error(`TTC API HTTP ${response.status}: ${response.statusText}`)
    }

    const data: unknown = await response.json()

    const parsed = ttcListingResponseSchema.safeParse(data)
    if (!parsed.success) {
      logUnexpectedTtcBody(response, data)
      throw new Error("TTC API returned unexpected response shape")
    }
    const body = parsed.data

    if (!body.IsSuccess) {
      const code = body.Code
      if (code === 1005 || code === 1006) {
        throw new Error("TTC requires reCAPTCHA — live listing search is currently unavailable")
      }
      throw new Error(`TTC API error code ${code}`)
    }

    const page = body.TradeListPageModel
    if (page == null) {
      logUnexpectedTtcBody(response, data)
      throw new Error("TTC API returned unexpected response shape")
    }

    return {
      TradeDetails: parseValidListings(page.TradeDetails),
      CurrentPage: page.CurrentPage,
      TotalPageCount: page.TotalPageCount,
      TotalMatchCount: page.TotalMatchCount,
    }
  }

  async function* searchAll(
    params: TTCListingSearchParams,
    options?: { maxPages?: number }
  ): AsyncGenerator<TTCListingEntry> {
    const maxPages = options?.maxPages ?? 10
    let currentPage = params.page ?? 1

    for (let i = 0; i < maxPages; i++) {
      const page = await search({ ...params, page: currentPage })

      for (const entry of page.TradeDetails) {
        yield entry
      }

      if (currentPage >= page.TotalPageCount) break
      currentPage++
    }
  }

  async function searchBatch(
    paramsList: readonly TTCListingSearchParams[],
    options?: { maxPagesPerItem?: number; onItemComplete?: (index: number) => void }
  ): Promise<ReadonlyArray<readonly TTCListingEntry[]>> {
    const maxPages = options?.maxPagesPerItem ?? 3
    const results: (readonly TTCListingEntry[])[] = []
    let consecutiveErrors = 0

    for (const [i, params] of paramsList.entries()) {
      try {
        const freshEntries: TTCListingEntry[] = []
        for await (const entry of searchAll(params, { maxPages })) {
          freshEntries.push(entry)
        }

        results.push(freshEntries)
        consecutiveErrors = 0
      } catch (err) {
        consecutiveErrors++
        if (consecutiveErrors >= 3) throw err
        results.push([])
      }
      options?.onItemComplete?.(i)
    }

    return results
  }

  return { search, searchAll, searchBatch }
}
