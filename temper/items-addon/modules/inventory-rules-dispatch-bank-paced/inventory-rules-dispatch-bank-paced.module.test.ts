import { describe, expect, test } from "bun:test"
import type { BankTracePacedDispatch } from "akasha/temper/items-addon/modules/inventory-bank-trace-types/inventory-bank-trace-types.module.code.ts"
import {
  BANK_BAG,
  type BankSim,
  busiestWindow,
  busiestWindowInclusive,
  depositsLanded,
  issueTimes,
  makeBankSim,
  plannedDeposits,
  slotsHoldingMoreThan,
  timesAskedTwice,
} from "akasha/temper/items-addon/modules/inventory-rules-dispatch-bank-paced/inventory-rules-dispatch-bank-paced.module.test-fixtures.ts"
import type { PacedBankStep } from "akasha/temper/items-addon/modules/inventory-rules-dispatch-bank-paced-confirm/inventory-rules-dispatch-bank-paced-confirm.module.code.ts"
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
  readonly stats: BankTracePacedDispatch
  readonly settled: boolean
}

function runVisit(sim: BankSim, steps: PacedBankStep[], untilMs: number): Visit {
  beginBankTrace(BANK_BAG)
  let settled = false
  startPacedBankChain(steps, sim.requestMove, () => {
    settled = true
  })
  sim.pump(untilMs)
  const stats = getSavedVariables().diagnostics?.lastBankTrace?.pacedDispatch
  if (stats === undefined) throw new Error("the visit recorded no paced dispatch")
  return { stats, settled }
}

describe("inventory-rules-dispatch-bank-paced", () => {
  test("a visit of half again the budget moves every item it planned", () => {
    const sim = makeBankSim()
    const { stats, settled } = runVisit(sim, plannedDeposits(sim, { moveCount: 150 }), 200000)
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
    const clean = makeBankSim()
    runVisit(clean, plannedDeposits(clean, { moveCount: 150 }), 200000)
    expect(busiestWindow(clean.issued, STACK_MOVE_WINDOW_MS)).toBe(STACK_MOVE_LIMIT)
    const sim = makeBankSim()
    const steps = plannedDeposits(sim, { moveCount: 50 })
    for (let i = 0; i < 50; i++) sim.dropsEveryRequest.add(i)
    const { stats } = runVisit(sim, steps, 200000)
    expect(stats.issued).toBe(200)
    expect(busiestWindow(sim.issued, STACK_MOVE_WINDOW_MS)).toBe(STACK_MOVE_LIMIT)
  })

  test("the budget holds even where the game counts a move exactly ten seconds old", () => {
    const clean = makeBankSim()
    runVisit(clean, plannedDeposits(clean, { moveCount: 150 }), 200000)
    expect(busiestWindowInclusive(clean.issued, STACK_MOVE_WINDOW_MS)).toBeLessThanOrEqual(
      STACK_MOVE_LIMIT
    )
    const sim = makeBankSim()
    const steps = plannedDeposits(sim, { moveCount: 50 })
    for (let i = 0; i < 50; i++) sim.dropsEveryRequest.add(i)
    runVisit(sim, steps, 200000)
    expect(busiestWindowInclusive(sim.issued, STACK_MOVE_WINDOW_MS)).toBeLessThanOrEqual(
      STACK_MOVE_LIMIT
    )
  })

  test("a clock starting off a ten-second boundary waits the ten seconds out all the same", () => {
    const sim = makeBankSim({ startMs: 9300 })
    const { stats } = runVisit(sim, plannedDeposits(sim, { moveCount: 200 }), 209300)
    const times = issueTimes(sim.issued)
    expect(times.length).toBe(2)
    expect(times[0]).toBe(9300)
    expect((times[1] ?? 0) - 9300).toBeGreaterThanOrEqual(STACK_MOVE_WINDOW_MS)
    expect(stats.confirmed).toBe(200)
    expect(busiestWindowInclusive(sim.issued, STACK_MOVE_WINDOW_MS)).toBeLessThanOrEqual(
      STACK_MOVE_LIMIT
    )
  })

  test("the visit takes up again once the wait is over", () => {
    const sim = makeBankSim()
    const { stats } = runVisit(sim, plannedDeposits(sim, { moveCount: 150 }), 200000)
    const times = issueTimes(sim.issued)
    expect(times.length).toBe(2)
    expect((times[1] ?? 0) - (times[0] ?? 0)).toBeGreaterThan(STACK_MOVE_WINDOW_MS)
    expect(sim.issued.filter((one) => one.atMs === times[0]).length).toBe(STACK_MOVE_LIMIT)
    expect(sim.issued.filter((one) => one.atMs === times[1]).length).toBe(50)
    expect(stats.rounds?.length).toBe(2)
  })

  test("the bank closing while the budget is spent ends the visit and says what went unsent", () => {
    const sim = makeBankSim({ closeBankAtMs: 5000 })
    const { stats, settled } = runVisit(sim, plannedDeposits(sim, { moveCount: 150 }), 200000)
    expect(stats.abortedEarly).toBe(true)
    expect(stats.planned).toBe(150)
    expect(stats.issued).toBe(100)
    expect(stats.confirmed).toBe(100)
    expect(sim.said).toContain("[TemperInventory] Bank closed — 50 moves not sent")
    expect(sim.issued.length).toBe(100)
    expect(settled).toBe(true)
    expect(isPacedBankRunning()).toBe(false)
  })

  test("a confirmation arriving during the wait sends no move a second time", () => {
    const sim = makeBankSim()
    const steps = plannedDeposits(sim, { moveCount: 130 })
    sim.answersLate.add(50)
    const { stats } = runVisit(sim, steps, 200000)
    expect(stats.planned).toBe(130)
    expect(stats.issued).toBe(130)
    expect(stats.confirmed).toBe(130)
    expect(timesAskedTwice(sim.issued)).toBe(0)
    expect(depositsLanded(sim, 130)).toBe(130)
  })

  test("a move of part of a stack puts in what the rules asked and no more", () => {
    const sim = makeBankSim()
    const whole = plannedDeposits(sim, { moveCount: 100 })
    const part = plannedDeposits(sim, { moveCount: 30, firstSlot: 100, stack: 10, count: 4 })
    sim.answersLate.add(50)
    const { stats } = runVisit(sim, [...whole, ...part], 200000)
    expect(stats.issued).toBe(130)
    expect(sim.stackAt(BANK_BAG, 100)).toBe(4)
    expect(slotsHoldingMoreThan(sim, 100, 30, 4)).toBe(0)
  })

  test("a visit the bank closed on sends nothing once a later visit is running", () => {
    const sim = makeBankSim({ closeBankAtMs: 5000 })
    beginBankTrace(BANK_BAG)
    startPacedBankChain(plannedDeposits(sim, { moveCount: 150 }), sim.requestMove, () => {})
    sim.pump(6000)
    expect(sim.issued.length).toBe(100)
    beginBankTrace(BANK_BAG)
    startPacedBankChain(
      plannedDeposits(sim, { moveCount: 150, firstSlot: 200 }),
      sim.requestMove,
      () => {}
    )
    sim.pump(400000)
    const later = sim.issued.filter((one) => one.atMs >= 6000)
    expect(later.filter((one) => one.sourceSlot < 200).length).toBe(0)
    expect(later.length).toBe(150)
  })
})
