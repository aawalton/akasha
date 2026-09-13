import type { PacedBankStep } from "akasha/temper/items-addon/modules/inventory-rules-dispatch-bank-paced-confirm/inventory-rules-dispatch-bank-paced-confirm.module.code.ts"

const BACKPACK_BAG = 1
export const BANK_BAG = 2
const CLOSE_BANK_EVENT = 1
const SLOT_UPDATE_EVENT = 2
const STACK_MAX = 200
const DEFAULT_LATENCY_MS = 40

interface BankSlot {
  itemId: number
  stack: number
  max: number
}

interface Timer {
  readonly at: number
  readonly seq: number
  readonly run: () => undefined
}

interface Handler {
  readonly ns: string
  readonly run: () => undefined
}

export interface IssuedStackMove {
  readonly atMs: number
  readonly sourceSlot: number
}

export interface BankSimOptions {
  readonly startMs?: number
  readonly latencyMs?: number
  readonly closeBankAtMs?: number
}

export interface BankSim {
  readonly issued: IssuedStackMove[]
  readonly said: string[]
  readonly dropsEveryRequest: Set<number>
  readonly putStack: (
    bag: number,
    slot: number,
    itemId: number,
    stack: number,
    max: number
  ) => undefined
  readonly stackAt: (bag: number, slot: number) => number
  readonly requestMove: (
    sourceBag: number,
    sourceSlot: number,
    targetBag: number,
    targetSlot: number,
    count: number
  ) => undefined
  readonly pump: (untilMs: number) => undefined
}

interface BankSimCore extends BankSim {
  readonly nowMs: () => number
  readonly after: (ms: number, run: () => undefined) => undefined
  readonly slotAt: (bag: number, slot: number) => BankSlot | undefined
  readonly listen: (ns: string, event: number, run: () => undefined) => undefined
  readonly unlisten: (ns: string, event: number) => undefined
}

let live: BankSimCore | undefined

function running(): BankSimCore {
  if (live === undefined) throw new Error("no bank sim is installed")
  return live
}

function setGlobal(name: string, value: unknown): undefined {
  Reflect.set(globalThis, name, value)
}

function installGameGlobals(): undefined {
  setGlobal("GetGameTimeMilliseconds", (): number => running().nowMs())
  setGlobal("GetTimeStamp", (): number => 1789315280)
  setGlobal("GetSlotStackSize", (bag: number, slot: number): [number, number] => {
    const held = running().slotAt(bag, slot)
    if (held === undefined || held.stack === 0) return [0, 0]
    return [held.stack, held.max]
  })
  setGlobal("GetItemLink", (bag: number, slot: number): string => {
    const held = running().slotAt(bag, slot)
    if (held === undefined || held.stack === 0) return ""
    return `|H0:item:${held.itemId}|h[item ${held.itemId}]|h`
  })
  setGlobal("GetItemLinkItemId", (link: string): number => {
    const found = /item:(\d+)/.exec(link)
    return found === null ? 0 : Number(found[1])
  })
  setGlobal("zo_callLater", (run: () => undefined, ms: number): undefined => {
    running().after(ms, run)
  })
  setGlobal("d", (message: string): undefined => {
    running().said.push(message)
  })
  setGlobal("ZO_CreateStringId", (): undefined => undefined)
  setGlobal("EVENT_MANAGER", {
    RegisterForEvent: (ns: string, event: number, run: () => undefined): undefined => {
      running().listen(ns, event, run)
    },
    UnregisterForEvent: (ns: string, event: number): undefined => {
      running().unlisten(ns, event)
    },
  })
  setGlobal("EVENT_CLOSE_BANK", CLOSE_BANK_EVENT)
  setGlobal("EVENT_INVENTORY_SINGLE_SLOT_UPDATE", SLOT_UPDATE_EVENT)
  setGlobal("BAG_WORN", 0)
  setGlobal("BAG_BACKPACK", BACKPACK_BAG)
  setGlobal("BAG_BANK", BANK_BAG)
  setGlobal("BAG_SUBSCRIBER_BANK", 6)
  setGlobal("BAG_HOUSE_BANK_ONE", 7)
  setGlobal("BAG_HOUSE_BANK_TWO", 8)
  setGlobal("BAG_HOUSE_BANK_THREE", 9)
  setGlobal("BAG_HOUSE_BANK_FOUR", 10)
  setGlobal("BAG_HOUSE_BANK_FIVE", 11)
  setGlobal("BAG_HOUSE_BANK_SIX", 12)
  setGlobal("BAG_HOUSE_BANK_SEVEN", 13)
  setGlobal("BAG_HOUSE_BANK_EIGHT", 14)
  setGlobal("BAG_HOUSE_BANK_NINE", 15)
  setGlobal("BAG_HOUSE_BANK_TEN", 16)
  setGlobal("BAG_VIRTUAL", 65535)
  setGlobal("LINK_STYLE_BRACKETS", 1)
}

export function makeBankSim(options: BankSimOptions = {}): BankSim {
  let nowMs = options.startMs ?? 0
  let seq = 0
  const latencyMs = options.latencyMs ?? DEFAULT_LATENCY_MS
  const timers: Timer[] = []
  const bags = new Map<number, BankSlot[]>()
  const handlers = new Map<number, Handler[]>()
  const issued: IssuedStackMove[] = []
  const said: string[] = []
  const dropsEveryRequest = new Set<number>()

  function bagOf(id: number): BankSlot[] {
    const found = bags.get(id)
    if (found !== undefined) return found
    const made: BankSlot[] = []
    bags.set(id, made)
    return made
  }

  function slotAt(bag: number, slot: number): BankSlot | undefined {
    return bagOf(bag)[slot]
  }

  function stackAt(bag: number, slot: number): number {
    return slotAt(bag, slot)?.stack ?? 0
  }

  function putStack(
    bag: number,
    slot: number,
    itemId: number,
    stack: number,
    max: number
  ): undefined {
    bagOf(bag)[slot] = { itemId, stack, max }
  }

  function after(ms: number, run: () => undefined): undefined {
    seq++
    timers.push({ at: nowMs + (ms > 0 ? ms : 1), seq, run })
  }

  function listen(ns: string, event: number, run: () => undefined): undefined {
    const list = handlers.get(event) ?? []
    list.push({ ns, run })
    handlers.set(event, list)
  }

  function unlisten(ns: string, event: number): undefined {
    const list = handlers.get(event) ?? []
    handlers.set(
      event,
      list.filter((one) => one.ns !== ns)
    )
  }

  function fire(event: number): undefined {
    for (const one of [...(handlers.get(event) ?? [])]) one.run()
  }

  function applyMove(
    sourceBag: number,
    sourceSlot: number,
    targetBag: number,
    targetSlot: number,
    count: number
  ): undefined {
    const source = slotAt(sourceBag, sourceSlot)
    const target = slotAt(targetBag, targetSlot)
    if (source === undefined || source.stack === 0 || target === undefined) return
    if (dropsEveryRequest.has(sourceSlot)) {
      fire(SLOT_UPDATE_EVENT)
      return
    }
    const sameItem = target.itemId === source.itemId
    const room = target.stack === 0 ? source.max : sameItem ? target.max - target.stack : 0
    const want = count < source.stack ? count : source.stack
    if (room >= want) {
      if (target.stack === 0) {
        target.itemId = source.itemId
        target.max = source.max
      }
      target.stack += want
      source.stack -= want
      if (source.stack === 0) {
        source.itemId = 0
        source.max = 0
      }
    }
    fire(SLOT_UPDATE_EVENT)
  }

  function requestMove(
    sourceBag: number,
    sourceSlot: number,
    targetBag: number,
    targetSlot: number,
    count: number
  ): undefined {
    issued.push({ atMs: nowMs, sourceSlot })
    after(latencyMs, (): undefined => {
      applyMove(sourceBag, sourceSlot, targetBag, targetSlot, count)
    })
  }

  function pump(untilMs: number): undefined {
    for (;;) {
      if (timers.length === 0) return
      timers.sort((a, b) => a.at - b.at || a.seq - b.seq)
      const next = timers.shift()
      if (next === undefined) return
      if (next.at > untilMs) {
        nowMs = untilMs
        return
      }
      nowMs = next.at
      next.run()
    }
  }

  const core: BankSimCore = {
    issued,
    said,
    dropsEveryRequest,
    putStack,
    stackAt,
    requestMove,
    pump,
    nowMs: () => nowMs,
    after,
    slotAt,
    listen,
    unlisten,
  }
  live = core
  installGameGlobals()
  if (options.closeBankAtMs !== undefined) {
    after(options.closeBankAtMs - nowMs, (): undefined => {
      fire(CLOSE_BANK_EVENT)
    })
  }
  return core
}

export function cleanDeposits(sim: BankSim, moveCount: number): PacedBankStep[] {
  const steps: PacedBankStep[] = []
  for (let i = 0; i < moveCount; i++) {
    sim.putStack(BACKPACK_BAG, i, 1000 + i, 1, STACK_MAX)
    sim.putStack(BANK_BAG, i, 0, 0, 0)
    steps.push({
      kind: "move",
      sourceBag: BACKPACK_BAG,
      sourceSlot: i,
      targetBag: BANK_BAG,
      targetSlot: i,
      count: 1,
    })
  }
  return steps
}

export function depositsLanded(sim: BankSim, moveCount: number): number {
  let landed = 0
  for (let i = 0; i < moveCount; i++) if (sim.stackAt(BANK_BAG, i) === 1) landed++
  return landed
}

export function busiestWindow(issued: readonly IssuedStackMove[], windowMs: number): number {
  const times = issued.map((one) => one.atMs).sort((a, b) => a - b)
  let busiest = 0
  for (let i = 0; i < times.length; i++) {
    const end = times[i] ?? 0
    let held = 0
    for (let j = 0; j <= i; j++) if ((times[j] ?? 0) > end - windowMs) held++
    if (held > busiest) busiest = held
  }
  return busiest
}

export function issueTimes(issued: readonly IssuedStackMove[]): number[] {
  const seen: number[] = []
  for (const one of issued) if (!seen.includes(one.atMs)) seen.push(one.atMs)
  return seen.sort((a, b) => a - b)
}
