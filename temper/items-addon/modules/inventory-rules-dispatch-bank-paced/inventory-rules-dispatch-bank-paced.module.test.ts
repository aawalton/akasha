import { describe, expect, test } from "bun:test"
import type { BankTracePacedDispatch } from "akasha/temper/items-addon/modules/inventory-bank-trace-types/inventory-bank-trace-types.module.code.ts"
import {
  BANK_BAG,
  type BankSim,
  busiestWindow,
  cleanDeposits,
  depositsLanded,
  issueTimes,
  makeBankSim,
} from "akasha/temper/items-addon/modules/inventory-rules-dispatch-bank-paced/inventory-rules-dispatch-bank-paced.module.test-fixtures.ts"
import type { SavedVariablesData } from "akasha/temper/items-addon/modules/inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"

const STACK_MOVE_LIMIT = 100
const STACK_MOVE_WINDOW_MS = 10000

makeBankSim()

const { getSavedVariables, setSavedVarsInstance } = await import(
  "akasha/temper/items-addon/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
)
const traceOnly: Partial<SavedVariablesData> = { diagnostics: {} }
setSavedVarsInstance(traceOnly as SavedVariablesData)

const { beginBankTrace } = await import(
  "akasha/temper/items-addon/modules/inventory-bank-trace/inventory-bank-trace.module.code.ts"
)
const { isPacedBankRunning, startPacedBankChain } = await import(
  "akasha/temper/items-addon/modules/inventory-rules-dispatch-bank-paced/inventory-rules-dispatch-bank-paced.module.code.ts"
)

interface Visit {
  readonly sim: BankSim
  readonly stats: BankTracePacedDispatch
  readonly settled: boolean
}

interface VisitOptions {
  readonly moveCount: number
  readonly startMs?: number
  readonly serverDropsEverything?: boolean
  readonly closeBankAtMs?: number
}

function visit(options: VisitOptions): Visit {
  const sim = makeBankSim({ startMs: options.startMs, closeBankAtMs: options.closeBankAtMs })
  const steps = cleanDeposits(sim, options.moveCount)
  if (options.serverDropsEverything === true) {
    for (let i = 0; i < options.moveCount; i++) sim.dropsEveryRequest.add(i)
  }
  beginBankTrace(BANK_BAG)
  let settled = false
  startPacedBankChain(steps, sim.requestMove, () => {
    settled = true
  })
  sim.pump((options.startMs ?? 0) + 200000)
  const stats = getSavedVariables().diagnostics?.lastBankTrace?.pacedDispatch
  if (stats === undefined) throw new Error("the visit recorded no paced dispatch")
  return { sim, stats, settled }
}

describe("inventory-rules-dispatch-bank-paced", () => {
  test("a visit of half again the budget moves every item it planned", () => {
    const { sim, stats, settled } = visit({ moveCount: 150 })
    expect(stats.planned).toBe(150)
    expect(stats.confirmed).toBe(150)
    expect(stats.issued).toBe(150)
    expect(stats.retries).toBe(0)
    expect(stats.abortedEarly).toBe(false)
    expect(depositsLanded(sim, 150)).toBe(150)
    expect(settled).toBe(true)
    expect(isPacedBankRunning()).toBe(false)
  })

  test("no more stack moves than the budget go out in any ten seconds", () => {
    const clean = visit({ moveCount: 150 })
    expect(busiestWindow(clean.sim.issued, STACK_MOVE_WINDOW_MS)).toBeLessThanOrEqual(
      STACK_MOVE_LIMIT
    )
    const sentAgain = visit({ moveCount: 50, serverDropsEverything: true })
    expect(sentAgain.stats.issued).toBe(200)
    expect(busiestWindow(sentAgain.sim.issued, STACK_MOVE_WINDOW_MS)).toBe(STACK_MOVE_LIMIT)
  })

  test("a clock starting at 9500 puts the second hundred at 19500, not at the boundary", () => {
    const { sim, stats } = visit({ moveCount: 200, startMs: 9500 })
    expect(issueTimes(sim.issued)).toEqual([9500, 19500])
    expect(stats.confirmed).toBe(200)
    expect(busiestWindow(sim.issued, STACK_MOVE_WINDOW_MS)).toBe(STACK_MOVE_LIMIT)
  })

  test("the visit takes up again once the ten seconds are up", () => {
    const { sim, stats } = visit({ moveCount: 150 })
    const times = issueTimes(sim.issued)
    expect(times.length).toBe(2)
    expect((times[1] ?? 0) - (times[0] ?? 0)).toBe(STACK_MOVE_WINDOW_MS)
    expect(sim.issued.filter((one) => one.atMs === times[0]).length).toBe(STACK_MOVE_LIMIT)
    expect(sim.issued.filter((one) => one.atMs === times[1]).length).toBe(50)
    expect(stats.rounds?.length).toBe(2)
  })

  test("the bank closing while the budget is spent ends the visit and says what went unsent", () => {
    const { sim, stats, settled } = visit({ moveCount: 150, closeBankAtMs: 5000 })
    expect(stats.abortedEarly).toBe(true)
    expect(stats.planned).toBe(150)
    expect(stats.issued).toBe(100)
    expect(stats.confirmed).toBe(100)
    expect(sim.said).toContain("[TemperInventory] Bank closed — 50 moves not sent")
    expect(sim.issued.length).toBe(100)
    expect(settled).toBe(true)
    expect(isPacedBankRunning()).toBe(false)
  })
})
