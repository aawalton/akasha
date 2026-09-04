import { recordPacedDispatch } from "../inventory-bank-trace/inventory-bank-trace.module.code.ts"
import type { BankTracePacedDispatch } from "../inventory-bank-trace-types/inventory-bank-trace-types.module.code.ts"
import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import {
  countPacedMoves,
  expectedRemainderAfterMove,
  isPacedMoveConfirmed,
  type PacedBankStep,
} from "../inventory-rules-dispatch-bank-paced-confirm/inventory-rules-dispatch-bank-paced-confirm.module.code.ts"

const PACED_BANK_NS = `${ADDON_NAME}_PacedBank`
const PACED_BANK_WATCHDOG_MS = 2000
const MAX_PACED_BANK_RETRIES = 3

let pacedBankRunning = false

export function isPacedBankRunning(): boolean {
  return pacedBankRunning
}

interface InFlightMove {
  sourceBag: number
  sourceSlot: number
  targetBag: number
  targetSlot: number
  count: number
  expectedRemaining: number
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
  let inFlight: InFlightMove | undefined
  let issueGen = 0
  let retries = 0

  function cleanup(aborted: boolean): undefined {
    EVENT_MANAGER.UnregisterForEvent(PACED_BANK_NS, EVENT_INVENTORY_SINGLE_SLOT_UPDATE)
    EVENT_MANAGER.UnregisterForEvent(PACED_BANK_NS, EVENT_CLOSE_BANK)
    pacedBankRunning = false
    inFlight = undefined
    stats.abortedEarly = aborted
    recordPacedDispatch(stats)
  }

  function issueNext(): undefined {
    if (!pacedBankRunning) return
    while (index < queue.length) {
      const step = queue[index]
      if (step === undefined || step.kind !== "effect") break
      index++
      step.run()
    }
    if (index >= queue.length) {
      cleanup(false)
      return
    }
    const step = queue[index]
    if (step === undefined || step.kind !== "move") {
      cleanup(false)
      return
    }
    const [srcStack] = GetSlotStackSize(step.sourceBag, step.sourceSlot)
    if (srcStack === 0) {
      index++
      issueNext()
      return
    }
    inFlight = {
      sourceBag: step.sourceBag,
      sourceSlot: step.sourceSlot,
      targetBag: step.targetBag,
      targetSlot: step.targetSlot,
      count: step.count,
      expectedRemaining: expectedRemainderAfterMove(srcStack, step.count),
    }
    issueGen++
    const myGen = issueGen
    retries = 0
    if (firstIssueMs === undefined) firstIssueMs = GetGameTimeMilliseconds()
    stats.issued++
    recordPacedDispatch(stats)
    bankMoveItem(step.sourceBag, step.sourceSlot, step.targetBag, step.targetSlot, step.count)
    scheduleWatchdog(myGen)
  }

  function onMoveConfirmed(): undefined {
    if (!pacedBankRunning) return
    if (inFlight === undefined) return
    const [srcStack] = GetSlotStackSize(inFlight.sourceBag, inFlight.sourceSlot)
    if (!isPacedMoveConfirmed(srcStack, inFlight.expectedRemaining)) return
    stats.confirmed++
    if (firstIssueMs !== undefined) stats.spanMs = GetGameTimeMilliseconds() - firstIssueMs
    recordPacedDispatch(stats)
    inFlight = undefined
    index++
    issueNext()
  }

  function scheduleWatchdog(myGen: number): undefined {
    zo_callLater(function (this: void): undefined {
      if (!pacedBankRunning) return
      if (inFlight === undefined || issueGen !== myGen) return
      const [srcStack] = GetSlotStackSize(inFlight.sourceBag, inFlight.sourceSlot)
      if (isPacedMoveConfirmed(srcStack, inFlight.expectedRemaining)) {
        onMoveConfirmed()
        return
      }
      retries++
      if (retries > MAX_PACED_BANK_RETRIES) {
        d(
          `[${ADDON_NAME}] Paced bank dispatch stalled at bag ${inFlight.sourceBag} slot ${inFlight.sourceSlot}, stopping`
        )
        cleanup(true)
        return
      }
      stats.retries++
      stats.issued++
      recordPacedDispatch(stats)
      bankMoveItem(
        inFlight.sourceBag,
        inFlight.sourceSlot,
        inFlight.targetBag,
        inFlight.targetSlot,
        inFlight.count
      )
      scheduleWatchdog(myGen)
    }, PACED_BANK_WATCHDOG_MS)
  }

  EVENT_MANAGER.RegisterForEvent(
    PACED_BANK_NS,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    function (
      this: void,
      _event: number,
      _bagId: number,
      _slotIndex: number,
      _isNewItem: boolean,
      _itemSoundCategory: number,
      _inventoryUpdateReason: number,
      _stackCountChange: number,
      _triggeredByCharacterName: string | undefined,
      _triggeredByDisplayName: string | undefined,
      isLastUpdateForMessage: boolean
    ): undefined {
      if (!isLastUpdateForMessage) return
      onMoveConfirmed()
    }
  )
  EVENT_MANAGER.RegisterForEvent(PACED_BANK_NS, EVENT_CLOSE_BANK, function (this: void): undefined {
    cleanup(true)
  })

  issueNext()
}
