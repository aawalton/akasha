import {
  recordPacedDispatch,
  recordStacking,
} from "akasha/temper/items-addon/modules/inventory-bank-trace/inventory-bank-trace.module.code.ts"
import type {
  BankTracePacedDispatch,
  BankTracePacedMove,
  BankTracePacedRound,
} from "akasha/temper/items-addon/modules/inventory-bank-trace-types/inventory-bank-trace-types.module.code.ts"
import { ADDON_NAME } from "akasha/temper/items-addon/modules/inventory-constants/inventory-constants.module.code.ts"
import {
  countPacedMoves,
  expectedRemainderAfterMove,
  type PacedBankStep,
} from "akasha/temper/items-addon/modules/inventory-rules-dispatch-bank-paced-confirm/inventory-rules-dispatch-bank-paced-confirm.module.code.ts"

const PACED_BANK_NS = `${ADDON_NAME}_PacedBank`
const STACK_MOVE_LIMIT = 100
const STACK_MOVE_WINDOW_MS = 10000
const STACK_MOVE_WINDOW_MARGIN_MS = 500
const STACK_MOVE_HELD_MS = STACK_MOVE_WINDOW_MS + STACK_MOVE_WINDOW_MARGIN_MS
const PACED_BANK_CONFIRM_MS = 1500
const MAX_PACED_BANK_ATTEMPTS = 4

let pacedBankRunning = false

export function isPacedBankRunning(): boolean {
  return pacedBankRunning
}

interface StackMoveSend {
  atMs: number
  count: number
}

let sends: StackMoveSend[] = []

interface IssuedMove {
  sourceBag: number
  sourceSlot: number
  targetBag: number
  targetSlot: number
  count: number
  itemId: number
  stackAtIssue: number
  expectedRemaining: number
  attempts: number
}

function itemIdIn(bag: number, slot: number): number {
  return GetItemLinkItemId(GetItemLink(bag, slot, LINK_STYLE_BRACKETS))
}

function stackLeftToMove(move: IssuedMove): number {
  const [srcStack] = GetSlotStackSize(move.sourceBag, move.sourceSlot)
  if (srcStack === 0) return 0
  if (itemIdIn(move.sourceBag, move.sourceSlot) !== move.itemId) return 0
  return srcStack
}

function retryCouldHelp(move: IssuedMove, srcStack: number): boolean {
  if (move.targetBag === BAG_VIRTUAL) return true
  const [targetStack, targetMax] = GetSlotStackSize(move.targetBag, move.targetSlot)
  if (targetStack === 0) return true
  if (itemIdIn(move.targetBag, move.targetSlot) !== move.itemId) return false
  if (srcStack < move.stackAtIssue) return true
  return targetMax - targetStack >= srcStack - move.expectedRemaining
}

function namedMove(move: IssuedMove): BankTracePacedMove {
  const [stackNow] = GetSlotStackSize(move.sourceBag, move.sourceSlot)
  const named: BankTracePacedMove = {
    sourceBag: move.sourceBag,
    sourceSlot: move.sourceSlot,
    targetBag: move.targetBag,
    targetSlot: move.targetSlot,
    count: move.count,
    attempts: move.attempts,
    itemId: move.itemId,
    stackAtIssue: move.stackAtIssue,
    stackNow,
  }
  if (move.targetBag !== BAG_VIRTUAL) {
    const [targetStack, targetMax] = GetSlotStackSize(move.targetBag, move.targetSlot)
    named.targetStack = targetStack
    named.targetMax = targetMax
  }
  return named
}

export function startPacedBankChain(
  steps: readonly PacedBankStep[],
  bankMoveItem: (
    sourceBag: number,
    sourceSlot: number,
    targetBag: number,
    targetSlot: number,
    stackCount: number
  ) => void,
  onSettled: (this: void) => void
): undefined {
  if (pacedBankRunning) {
    recordStacking({ ran: false, skipped: "a dispatch from an earlier visit was still running" })
    return
  }
  if (steps.length === 0) {
    recordStacking({ ran: false, skipped: "the visit planned nothing to dispatch" })
    return
  }
  pacedBankRunning = true

  const queue: PacedBankStep[] = []
  for (const s of steps) queue.push(s)
  let index = 0

  const rounds: BankTracePacedRound[] = []
  const stats: BankTracePacedDispatch = {
    planned: countPacedMoves(steps),
    issued: 0,
    confirmed: 0,
    retries: 0,
    spanMs: 0,
    abortedEarly: false,
    rounds,
  }
  let firstIssueMs: number | undefined
  let confirmedSinceIssue = 0
  let wakeSerial = 0
  let inFlight: IssuedMove[] = []

  function cleanup(aborted: boolean): undefined {
    wakeSerial++
    EVENT_MANAGER.UnregisterForEvent(PACED_BANK_NS, EVENT_CLOSE_BANK)
    EVENT_MANAGER.UnregisterForEvent(PACED_BANK_NS, EVENT_INVENTORY_SINGLE_SLOT_UPDATE)
    pacedBankRunning = false
    if (aborted) {
      const abandoned: BankTracePacedMove[] = []
      for (const move of inFlight) abandoned[abandoned.length] = namedMove(move)
      if (abandoned.length > 0) stats.abandoned = abandoned
      let unsent = 0
      for (let i = index; i < queue.length; i++) {
        const step = queue[i]
        if (step !== undefined && step.kind === "move") unsent++
      }
      if (unsent > 0) {
        d(`[${ADDON_NAME}] Bank closed — ${unsent} moves not sent`)
      }
    }
    inFlight = []
    stats.abortedEarly = aborted
    recordPacedDispatch(stats)
    onSettled()
  }

  function wakeLater(ms: number, run: (this: void) => undefined): undefined {
    wakeSerial++
    const serial = wakeSerial
    zo_callLater(
      function (this: void): undefined {
        if (serial !== wakeSerial) return
        run()
      },
      ms > 0 ? ms : 1
    )
  }

  function roomInWindow(): number {
    const now = GetGameTimeMilliseconds()
    const kept: StackMoveSend[] = []
    let sent = 0
    for (const send of sends) {
      if (now - send.atMs >= STACK_MOVE_HELD_MS) continue
      kept[kept.length] = send
      sent += send.count
    }
    sends = kept
    return STACK_MOVE_LIMIT - sent
  }

  function waitForWindow(): undefined {
    const oldest = sends[0]
    const rest =
      oldest === undefined ? 1 : STACK_MOVE_HELD_MS - (GetGameTimeMilliseconds() - oldest.atMs)
    wakeLater(rest, function (this: void): undefined {
      issueBatch()
    })
  }

  function issueBatch(): undefined {
    if (!pacedBankRunning) return
    const room = roomInWindow()
    if (room <= 0 || inFlight.length > room) {
      waitForWindow()
      return
    }
    const batch: IssuedMove[] = []
    for (const carried of inFlight) batch.push(carried)
    while (batch.length < room && index < queue.length) {
      const step = queue[index]
      index++
      if (step === undefined) continue
      if (step.kind === "effect") {
        step.run()
        continue
      }
      const [srcStack] = GetSlotStackSize(step.sourceBag, step.sourceSlot)
      if (srcStack === 0) continue
      const sourceLink = GetItemLink(step.sourceBag, step.sourceSlot, LINK_STYLE_BRACKETS)
      batch.push({
        sourceBag: step.sourceBag,
        sourceSlot: step.sourceSlot,
        targetBag: step.targetBag,
        targetSlot: step.targetSlot,
        count: step.count,
        itemId: GetItemLinkItemId(sourceLink),
        stackAtIssue: srcStack,
        expectedRemaining: expectedRemainderAfterMove(srcStack, step.count),
        attempts: 0,
      })
    }
    if (batch.length === 0) {
      cleanup(false)
      return
    }
    inFlight = batch
    const issuedAt = GetGameTimeMilliseconds()
    sends[sends.length] = { atMs: issuedAt, count: batch.length }
    if (firstIssueMs === undefined) firstIssueMs = issuedAt
    confirmedSinceIssue = 0
    for (const move of batch) {
      move.attempts++
      const [stackNow] = GetSlotStackSize(move.sourceBag, move.sourceSlot)
      move.stackAtIssue = stackNow
      stats.issued++
      bankMoveItem(move.sourceBag, move.sourceSlot, move.targetBag, move.targetSlot, move.count)
    }
    recordPacedDispatch(stats)
    wakeLater(PACED_BANK_CONFIRM_MS, function (this: void): undefined {
      settleBatch()
    })
  }

  function confirmLanded(): undefined {
    if (inFlight.length === 0) return
    const still: IssuedMove[] = []
    for (const move of inFlight) {
      if (stackLeftToMove(move) <= move.expectedRemaining) {
        stats.confirmed++
        confirmedSinceIssue++
        continue
      }
      still.push(move)
    }
    inFlight = still
    if (inFlight.length === 0) settleBatch()
  }

  function settleBatch(): undefined {
    if (!pacedBankRunning) return
    const unsettled: IssuedMove[] = []
    const unconfirmed: BankTracePacedMove[] = []
    let retriedHere = 0
    let leftHere = 0
    for (const move of inFlight) {
      const srcStack = stackLeftToMove(move)
      if (srcStack <= move.expectedRemaining) {
        stats.confirmed++
        confirmedSinceIssue++
        continue
      }
      unconfirmed[unconfirmed.length] = namedMove(move)
      if (!retryCouldHelp(move, srcStack)) {
        d(
          `[${ADDON_NAME}] Bank move from bag ${move.sourceBag} slot ${move.sourceSlot} cannot land where it was aimed, leaving it to the next visit`
        )
        leftHere++
        continue
      }
      if (move.attempts >= MAX_PACED_BANK_ATTEMPTS) {
        d(
          `[${ADDON_NAME}] Paced bank dispatch stalled at bag ${move.sourceBag} slot ${move.sourceSlot}, leaving it`
        )
        leftHere++
        continue
      }
      stats.retries++
      retriedHere++
      unsettled.push(move)
    }
    if (firstIssueMs !== undefined) stats.spanMs = GetGameTimeMilliseconds() - firstIssueMs
    rounds[rounds.length] = {
      elapsedMs: stats.spanMs,
      confirmed: confirmedSinceIssue,
      retried: retriedHere,
      left: leftHere,
      unconfirmed,
    }
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

  EVENT_MANAGER.RegisterForEvent(
    PACED_BANK_NS,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    function (this: void): undefined {
      if (!pacedBankRunning) return
      confirmLanded()
    }
  )

  issueBatch()
}
