import { afterEach, beforeEach, expect, test } from "bun:test"
import { createSellFlow, postGuildStoreItem } from "./guild-store-poster"

interface PostCall {
  bag: number
  slot: number
  quantity: number
  price: number
}
type EventHandler = (...args: unknown[]) => void

const originals = new Map<string, unknown>()
let postCalls: PostCall[]
let stagedCalls: PostCall[]
let handlers: Map<number, EventHandler>

function set(key: string, value: unknown): undefined {
  if (!originals.has(key)) originals.set(key, Reflect.get(globalThis, key))
  Reflect.set(globalThis, key, value)
  return undefined
}

beforeEach(() => {
  postCalls = []
  stagedCalls = []
  handlers = new Map<number, EventHandler>()

  set("EVENT_TRADING_HOUSE_PENDING_ITEM_UPDATE", 1)
  set("EVENT_TRADING_HOUSE_RESPONSE_RECEIVED", 2)
  set("EVENT_TRADING_HOUSE_ERROR", 3)
  set("TRADING_HOUSE_RESULT_POST_PENDING", 10)
  set("TRADING_HOUSE_RESULT_SUCCESS", 20)
  set("BAG_BACKPACK", 1)

  set("EVENT_MANAGER", {
    RegisterForEvent: (_ns: string, event: number, cb: EventHandler): undefined => {
      handlers.set(event, cb)
      return undefined
    },
    UnregisterForEvent: (_ns: string, event: number): undefined => {
      handlers.delete(event)
      return undefined
    },
  })
  set("SetPendingItemPost", (bag: number, slot: number, quantity: number): undefined => {
    stagedCalls.push({ bag, slot, quantity, price: 0 })
    return undefined
  })
  set(
    "RequestPostItemOnTradingHouse",
    (bag: number, slot: number, quantity: number, price: number): undefined => {
      postCalls.push({ bag, slot, quantity, price })
      return undefined
    }
  )
  set("d", (): undefined => undefined)
})

afterEach(() => {
  for (const [k, v] of originals) Reflect.set(globalThis, k, v)
  originals.clear()
})

test("postGuildStoreItem forwards its args straight to the ESO post call, no staging", () => {
  postGuildStoreItem(1, 5, 3, 900)
  expect(postCalls).toEqual([{ bag: 1, slot: 5, quantity: 3, price: 900 }])
  expect(stagedCalls).toEqual([])
})

test("createSellFlow stages first, posts on the matching pending ack, confirms on success", () => {
  const flow = createSellFlow("TestAddon")
  const results: boolean[] = []
  flow.postItem(1, 7, 2, 500, (ok) => results.push(ok))

  expect(stagedCalls).toEqual([{ bag: 1, slot: 7, quantity: 2, price: 0 }])
  expect(postCalls).toEqual([])

  handlers.get(1)?.(0, 99, true)
  expect(postCalls).toEqual([])

  handlers.get(1)?.(0, 7, true)
  expect(postCalls).toEqual([{ bag: 1, slot: 7, quantity: 2, price: 500 }])
  expect(results).toEqual([])

  handlers.get(2)?.(0, 10, 20)
  expect(results).toEqual([true])
})

test("createSellFlow resolves false on a trading-house error while in flight", () => {
  const flow = createSellFlow("TestAddon")
  const results: boolean[] = []
  flow.postItem(1, 7, 2, 500, (ok) => results.push(ok))
  handlers.get(1)?.(0, 7, true)
  handlers.get(3)?.(0)
  expect(results).toEqual([false])
})

test("createSellFlow is single-flight: a second concurrent post is refused", () => {
  const flow = createSellFlow("TestAddon")
  const results: boolean[] = []
  flow.postItem(1, 7, 2, 500, (ok) => results.push(ok))
  flow.postItem(1, 8, 1, 300, (ok) => results.push(ok))
  expect(results).toEqual([false])
  expect(stagedCalls.length).toBe(1)
})

test("createSellFlow refuses a non-backpack item without staging", () => {
  const flow = createSellFlow("TestAddon")
  const results: boolean[] = []
  flow.postItem(99, 7, 2, 500, (ok) => results.push(ok))
  expect(results).toEqual([false])
  expect(stagedCalls).toEqual([])
  expect(postCalls).toEqual([])
})
