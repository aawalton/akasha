"use client"

import { listenerSet } from "akasha/design/interface/primitive/modules/listener-set/listener-set.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import type { InventoryDatabase } from "akasha/temper/items-core/modules/inventory-types/inventory-types.module.code.ts"
import type { PricingData } from "akasha/temper/trading-pricing/modules/pricing-types/pricing-types.module.code.ts"
import { useEffect, useSyncExternalStore } from "react"

const ACCOUNT_PAGE_TYPE_SLUG = "temper-account"

const DATA = "data"

const CAPTURED_AT = "capturedAt"

const ENDING = "json"

const DATA_UNREAD = `\`${DATA}\` came back as the ending \`${ENDING}\` rather than the body of the file beside the account page, so the reading went unread.`

interface Held {
  readonly inventory: InventoryDatabase | null
  readonly capturedAt: string | null
  readonly isRead: boolean
  readonly error: Error | null
}

const UNREAD: Held = { inventory: null, capturedAt: null, isRead: false, error: null }

const NOTHING_LANDED: Held = { inventory: null, capturedAt: null, isRead: true, error: null }

async function readingOf(userId: string): Promise<Held> {
  const asked = await askComposed({
    "page-type": ACCOUNT_PAGE_TYPE_SLUG,
    where: { title: { is: userId } },
    keys: ["slug", CAPTURED_AT, DATA],
    files: [DATA],
  })
  if (!asked.ok) throw new Error(asked.why)
  const values = asked.answer.rows[0]?.values
  if (values === undefined) return NOTHING_LANDED
  const body = values[DATA]
  if (body === undefined || body === "") return NOTHING_LANDED
  if (typeof body !== "string") {
    throw new Error(`\`${DATA}\` came back as a ${typeof body} rather than the file's body.`)
  }
  if (body === ENDING) throw new Error(DATA_UNREAD)
  const capturedAt = values[CAPTURED_AT]
  return {
    inventory: JSON.parse(body) as InventoryDatabase,
    capturedAt: typeof capturedAt === "string" ? capturedAt : null,
    isRead: true,
    error: null,
  }
}

let heldFor: string | null = null
let held: Held = UNREAD
const readingListeners = listenerSet()

function holdReading(next: Held): undefined {
  held = next
  readingListeners.tell()
}

function readHeld(): Held {
  return held
}

export function useInventory(userId: string | null) {
  const state = useSyncExternalStore(readingListeners.subscribe, readHeld, readHeld)

  useEffect(() => {
    if (userId == null) {
      heldFor = null
      holdReading(UNREAD)
      return
    }
    if (heldFor === userId) return
    heldFor = userId
    holdReading(UNREAD)
    void (async () => {
      try {
        const reading = await readingOf(userId)
        if (heldFor !== userId) return
        holdReading(reading)
      } catch (thrown) {
        if (heldFor !== userId) return
        holdReading({
          inventory: null,
          capturedAt: null,
          isRead: false,
          error: thrown instanceof Error ? thrown : new Error(String(thrown)),
        })
      }
    })()
  }, [userId])

  return {
    inventory: state.inventory,
    capturedAt: state.capturedAt,
    isLoading: userId != null && !state.isRead && state.error === null,
    isError: state.error !== null,
  }
}

export function usePriceExtract(
  _type: string,
  _platform: string,
  _server: string
): {
  pricing: PricingData | null
  updatedAt: string | null
  isLoading: boolean
  isError: boolean
  error: Error | null
  retry: undefined
} {
  return {
    pricing: null,
    updatedAt: null,
    isLoading: false,
    isError: false,
    error: null,
    retry: undefined,
  }
}
