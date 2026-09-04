import {
  applyFoliumBranch,
  classifyOptionType,
  type RawOption,
} from "../quests-classify/quests-classify.module.code.ts"
import { ADDON_NAME } from "../quests-constants/quests-constants.module.code.ts"
import {
  type AutoQuestMemory,
  type AutoQuestSnapshot,
  type ClassifiedChatterOption,
  INITIAL_AUTO_QUEST_MEMORY,
  type ReconcileAction,
  reconcileAutoQuest,
} from "../quests-decide/quests-decide.module.code.ts"
import { getSavedVariables } from "../quests-saved-variables/quests-saved-variables.module.code.ts"
import {
  clearTrace,
  recordCompleteDialogTrace,
  recordTrace,
  resetTraceGating,
} from "../quests-trace/quests-trace.module.code.ts"

const NS = `${ADDON_NAME}_AutoQuest`
const HEARTBEAT_NAME = `${NS}_Heartbeat`
const HEARTBEAT_INTERVAL_MS = 250

let memory: AutoQuestMemory = INITIAL_AUTO_QUEST_MEMORY
let heartbeatRunning = false

export function isAutoQuestEnabled(): boolean {
  return getSavedVariables().autoQuest !== false
}

export function isAutoQuestDebugEnabled(): boolean {
  return getSavedVariables().autoQuestDebug === true
}

interface SnapshotReading {
  readonly snapshot: AutoQuestSnapshot
  readonly raw: readonly RawOption[]
}

function readSnapshot(this: void): SnapshotReading {
  const interaction = GetInteractionType()
  const inChatter = interaction === INTERACTION_QUEST || interaction === INTERACTION_CONVERSATION

  const [offeredDialogue] = GetOfferedQuestInfo()
  const offerPending = offeredDialogue !== undefined && offeredDialogue !== ""

  const raw: RawOption[] = []
  const fingerprintParts: string[] = []
  if (inChatter) {
    const optionCount = GetChatterOptionCount()
    for (let i = 1; i <= optionCount; i++) {
      const [optionString, optionType, , isImportant, chosenBefore] = GetChatterOption(i)
      const textLower = string.lower(optionString)
      raw[i - 1] = {
        index: i,
        text: optionString,
        textLower,
        optionType,
        isImportant,
        chosenBefore,
        kind: classifyOptionType(optionType, textLower),
      }
      fingerprintParts[i - 1] = optionString
    }
    applyFoliumBranch(raw)
  }

  const options: ClassifiedChatterOption[] = raw.map((o) => ({
    index: o.index,
    kind: o.kind,
    chosenBefore: o.chosenBefore,
  }))

  return {
    snapshot: {
      inChatter,
      offerPending,
      options,
      menuFingerprint: table.concat(fingerprintParts, ""),
    },
    raw,
  }
}

function executeAction(action: ReconcileAction): undefined {
  if (action.kind === "none") return
  if (action.kind === "accept-offer") {
    AcceptOfferedQuest()
    return
  }
  if (action.kind === "complete-quest") {
    CompleteQuest()
    return
  }
  if (action.kind === "select") {
    SelectChatterOption(action.index)
    return
  }
  EndInteraction(GetInteractionType())
}

function startHeartbeat(this: void): undefined {
  if (heartbeatRunning) return
  heartbeatRunning = true
  EVENT_MANAGER.RegisterForUpdate(HEARTBEAT_NAME, HEARTBEAT_INTERVAL_MS, reconcile)
}

function stopHeartbeat(this: void): undefined {
  if (!heartbeatRunning) return
  heartbeatRunning = false
  resetTraceGating()
  EVENT_MANAGER.UnregisterForUpdate(HEARTBEAT_NAME)
}

function reconcile(this: void): undefined {
  const enabled = isAutoQuestEnabled()
  const debug = isAutoQuestDebugEnabled()
  if (!enabled && !debug) {
    memory = INITIAL_AUTO_QUEST_MEMORY
    stopHeartbeat()
    return
  }

  const reading = readSnapshot()
  const result = reconcileAutoQuest(reading.snapshot, memory)
  if (debug) recordTrace(reading.snapshot, reading.raw, memory.pendingCompletion, result.action)

  if (!enabled) return

  memory = result.memory
  executeAction(result.action)

  if (!reading.snapshot.inChatter && !reading.snapshot.offerPending && !memory.pendingCompletion) {
    stopHeartbeat()
  }
}

function onInteractionEvent(this: void): undefined {
  if (!isAutoQuestEnabled() && !isAutoQuestDebugEnabled()) return
  startHeartbeat()
  reconcile()
}

function onQuestCompleteDialog(this: void, _eventCode: number, journalIndex: number): undefined {
  if (!isAutoQuestEnabled() && !isAutoQuestDebugEnabled()) return
  if (isAutoQuestDebugEnabled()) {
    recordCompleteDialogTrace(journalIndex, GetJournalQuestNumRewards(journalIndex))
  }
  if (isAutoQuestEnabled()) {
    memory = { ...memory, pendingCompletion: true }
  }
  startHeartbeat()
  reconcile()
}

export function toggleAutoQuest(this: void): undefined {
  const sv = getSavedVariables()
  sv.autoQuest = sv.autoQuest === false
  d(`[${ADDON_NAME}] Auto-quest ${sv.autoQuest === false ? "disabled" : "enabled"}`)
}

export function toggleAutoQuestDebug(this: void): undefined {
  const sv = getSavedVariables()
  sv.autoQuestDebug = sv.autoQuestDebug !== true
  if (sv.autoQuestDebug === true) clearTrace()
  d(
    `[${ADDON_NAME}] Auto-quest trace capture ${sv.autoQuestDebug === true ? "enabled (buffer cleared)" : "disabled"}`
  )
}

export function registerAutoQuestEvents(): undefined {
  EVENT_MANAGER.RegisterForEvent(`${NS}_Begin`, EVENT_CHATTER_BEGIN, onInteractionEvent)
  EVENT_MANAGER.RegisterForEvent(`${NS}_Updated`, EVENT_CONVERSATION_UPDATED, onInteractionEvent)
  EVENT_MANAGER.RegisterForEvent(`${NS}_End`, EVENT_CHATTER_END, onInteractionEvent)
  EVENT_MANAGER.RegisterForEvent(`${NS}_Offered`, EVENT_QUEST_OFFERED, onInteractionEvent)
  EVENT_MANAGER.RegisterForEvent(
    `${NS}_Complete`,
    EVENT_QUEST_COMPLETE_DIALOG,
    onQuestCompleteDialog
  )
}
