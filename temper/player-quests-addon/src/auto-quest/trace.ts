import { getSavedVariables } from "../saved-variables"
import { chatterOptionTypeName, interactionTypeName } from "./chatter-names"
import type { RawOption } from "./classify"
import type { AutoQuestSnapshot, ReconcileAction } from "./decide"
import {
  type AutoQuestTraceEntry,
  type AutoQuestTraceOption,
  appendBounded,
  TRACE_CAP,
} from "./trace-buffer"

let lastFingerprint: string | undefined
let lastAction: string | undefined

function describeAction(action: ReconcileAction): string {
  if (action.kind === "select") return `select ${action.index} (${action.reason})`
  if (action.kind === "end-interaction") return `end-interaction (${action.reason})`
  return action.kind
}

function toTraceOption(o: RawOption): AutoQuestTraceOption {
  return {
    index: o.index,
    optionType: o.optionType,
    optionTypeName: chatterOptionTypeName(o.optionType),
    kind: o.kind,
    important: o.isImportant,
    chosenBefore: o.chosenBefore,
    text: o.text,
  }
}

function push(entry: AutoQuestTraceEntry): undefined {
  const sv = getSavedVariables()
  sv.autoQuestDebugTrace = appendBounded(sv.autoQuestDebugTrace ?? [], entry, TRACE_CAP)
}

export function resetTraceGating(): undefined {
  lastFingerprint = undefined
  lastAction = undefined
}

export function clearTrace(): undefined {
  getSavedVariables().autoQuestDebugTrace = []
  resetTraceGating()
}

export function recordTrace(
  snapshot: AutoQuestSnapshot,
  raw: readonly RawOption[],
  pendingCompletion: boolean,
  action: ReconcileAction
): undefined {
  if (
    snapshot.inChatter &&
    snapshot.options.length > 0 &&
    snapshot.menuFingerprint !== lastFingerprint
  ) {
    lastFingerprint = snapshot.menuFingerprint
    const interactionType = GetInteractionType()
    push({
      kind: "menu",
      at: GetGameTimeMilliseconds(),
      interactionType,
      interactionTypeName: interactionTypeName(interactionType),
      offerPending: snapshot.offerPending,
      pendingCompletion,
      options: raw.map(toTraceOption),
      decision: describeAction(action),
    })
  }

  if (action.kind !== "none") {
    const described = describeAction(action)
    if (action.kind === "end-interaction" || described !== lastAction) {
      lastAction = described
      push({ kind: "action", at: GetGameTimeMilliseconds(), action: described })
    }
  }
}

export function recordCompleteDialogTrace(journalIndex: number, numRewards: number): undefined {
  push({
    kind: "complete-dialog",
    at: GetGameTimeMilliseconds(),
    journalIndex,
    numRewards,
  })
}
