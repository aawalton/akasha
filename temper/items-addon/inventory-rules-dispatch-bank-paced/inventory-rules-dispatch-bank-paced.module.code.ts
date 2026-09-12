import { recordPacedDispatch } from "akasha/temper/items-addon/inventory-bank-trace/inventory-bank-trace.module.code.ts"
import type { BankTracePacedDispatch } from "akasha/temper/items-addon/inventory-bank-trace-types/inventory-bank-trace-types.module.code.ts"
import { ADDON_NAME } from "akasha/temper/items-addon/inventory-constants/inventory-constants.module.code.ts"
import {
  countPacedMoves,
  expectedRemainderAfterMove,
  type PacedBankStep,
} from "akasha/temper/items-addon/inventory-rules-dispatch-bank-paced-confirm/inventory-rules-dispatch-bank-paced-confirm.module.code.ts"

const PACED_BANK_NS = `${ADDON_NAME}_PacedBank`
const PACED_BANK_BATCH_SIZE = 50
const PACED_BANK_COOLDOWN_MS = 5000
const MAX_PACED_BANK_ATTEMPTS = 4

let pacedBankRunning = false

export function isPacedBankRunning(): boolean {
  return pacedBankRunning
}

interface IssuedMove {
  sourceBag: number
  sourceSlot: number
  targetBag: number
  targetSlot: number
  count: number
  expectedRemaining: number
  attempts: number
}

export function startPacedBankChain(
  steps: readonly PacedBankStep[],
  bankMoveItem: (
    sourceBag: number,
    sourceSlot: number,
    targetBag: number,
    targetSlot: number,
    stackCount: number
  ) => void
): undefined {
  if (pacedBankRunning) return
  if (steps.length === 0) return
  pacedBankRunning = true

  const queue: PacedBankStep[] = []
  for (const s of steps) queue.push(s)
  let index = 0

  const stats: BankTracePacedDispatch = {
    planned: countPacedMoves(steps),
    issued: 0,
    confirmed: 0,
    retries: 0,
    spanMs: 0,
    abortedEarly: false,
  }
  let firstIssueMs: number | undefined
  let inFlight: IssuedMove[] = []

  function cleanup(aborted: boolean): undefined {
    EVENT_MANAGER.UnregisterForEvent(PACED_BANK_NS, EVENT_CLOSE_BANK)
    pacedBankRunning = false
    inFlight = []
    stats.abortedEarly = aborted
    recordPacedDispatch(stats)
  }

  function issueBatch(): undefined {
    if (!pacedBankRunning) return
    const batch: IssuedMove[] = []
    for (const carried of inFlight) batch.push(carried)
    while (batch.length < PACED_BANK_BATCH_SIZE && index < queue.length) {
      const step = queue[index]
      index++
      if (step === undefined) continue
      if (step.kind === "effect") {
        step.run()
        continue
      }
      const [srcStack] = GetSlotStackSize(step.sourceBag, step.sourceSlot)
      if (srcStack === 0) continue
      batch.push({
        sourceBag: step.sourceBag,
        sourceSlot: step.sourceSlot,
        targetBag: step.targetBag,
        targetSlot: step.targetSlot,
        count: step.count,
        expectedRemaining: expectedRemainderAfterMove(srcStack, step.count),
        attempts: 0,
      })
    }
    if (batch.length === 0) {
      cleanup(false)
      return
    }
    inFlight = batch
    if (firstIssueMs === undefined) firstIssueMs = GetGameTimeMilliseconds()
    for (const move of batch) {
      move.attempts++
      stats.issued++
      bankMoveItem(move.sourceBag, move.sourceSlot, move.targetBag, move.targetSlot, move.count)
    }
    recordPacedDispatch(stats)
    zo_callLater(function (this: void): undefined {
      settleBatch()
    }, PACED_BANK_COOLDOWN_MS)
  }

  function settleBatch(): undefined {
    if (!pacedBankRunning) return
    const unsettled: IssuedMove[] = []
    for (const move of inFlight) {
      const [srcStack] = GetSlotStackSize(move.sourceBag, move.sourceSlot)
      if (srcStack <= move.expectedRemaining) {
        stats.confirmed++
        continue
      }
      if (move.attempts >= MAX_PACED_BANK_ATTEMPTS) {
        d(
          `[${ADDON_NAME}] Paced bank dispatch stalled at bag ${move.sourceBag} slot ${move.sourceSlot}, leaving it`
        )
        continue
      }
      stats.retries++
      unsettled.push(move)
    }
    if (firstIssueMs !== undefined) stats.spanMs = GetGameTimeMilliseconds() - firstIssueMs
    inFlight = unsettled
    recordPacedDispatch(stats)
    if (unsettled.length === 0 && index >= queue.length) {
      cleanup(false)
      return
    }
    issueBatch()
  }

  EVENT_MANAGER.RegisterForEvent(PACED_BANK_NS, EVENT_CLOSE_BANK, function (this: void): undefined {
    cleanup(true)
  })

  issueBatch()
}
