import type { MinedQuestEntry } from "@akasha/temper-capture-datamining/datamining-payload"
import {
  ADDON_NAME,
  QUEST_BATCH_DELAY,
  QUEST_BATCH_SIZE,
  QUEST_MAX_CONSECUTIVE_MISSES,
} from "../datamining-constants/datamining-constants.module.code.ts"
import { getSavedVariables } from "../datamining-saved-variables/datamining-saved-variables.module.code.ts"
export let questCurrentGeneration = 0

export function captureQuestData(questId: number): MinedQuestEntry | undefined {
  const name = zo_strformat("<<1>>", GetQuestName(questId))
  if (name === "") return undefined

  const zoneId = GetQuestZoneId(questId)

  return {
    name,
    questType: GetQuestType(questId),
    repeatableType: GetQuestRepeatableType(questId),
    zoneId,
    zoneName: zo_strformat("<<1>>", GetZoneNameById(zoneId)),
  }
}

export function processNextQuestBatch(generation: number): undefined {
  if (generation !== questCurrentGeneration) return

  const savedVars = getSavedVariables()
  if (!savedVars.questIsRunning) return

  if (!savedVars.quests) {
    const quests: Record<number, MinedQuestEntry> = {}
    savedVars.quests = quests
  }
  if (!savedVars.questStats) {
    savedVars.questStats = {
      totalMined: 0,
      startTime: GetTimeStamp(),
      endTime: 0,
    }
  }

  const startId = savedVars.questNextId ?? 1
  const endId = startId + QUEST_BATCH_SIZE - 1
  let consecutiveMisses = savedVars.questConsecutiveMisses ?? 0

  for (let questId = startId; questId <= endId; questId++) {
    const entry = captureQuestData(questId)
    if (entry !== undefined) {
      savedVars.quests[questId] = entry
      savedVars.questStats.totalMined++
      consecutiveMisses = 0
    } else {
      consecutiveMisses++
    }

    if (consecutiveMisses >= QUEST_MAX_CONSECUTIVE_MISSES) {
      savedVars.questConsecutiveMisses = consecutiveMisses
      savedVars.questNextId = questId + 1
      savedVars.questIsRunning = false
      savedVars.questCompleted = true
      savedVars.questStats.endTime = GetTimeStamp()
      d(
        `[${ADDON_NAME}] Quest mining complete — ${QUEST_MAX_CONSECUTIVE_MISSES} consecutive empty IDs. ` +
          `Quests found: ${savedVars.questStats.totalMined}`
      )
      return
    }
  }

  savedVars.questConsecutiveMisses = consecutiveMisses
  savedVars.questNextId = endId + 1

  const nextId = savedVars.questNextId
  if (nextId % 500 === 1) {
    d(
      `[${ADDON_NAME}] Quest mining — Next ID: ${nextId} — Quests found: ${savedVars.questStats.totalMined} — Consecutive misses: ${consecutiveMisses}`
    )
  }

  zo_callLater(function (this: void): undefined {
    processNextQuestBatch(generation)
  }, QUEST_BATCH_DELAY)
}

export function startQuestMining(): undefined {
  const savedVars = getSavedVariables()

  if (savedVars.questIsRunning) {
    d(`[${ADDON_NAME}] Quest mining already running. Use /temperdatamine stopquests to stop.`)
    return
  }

  savedVars.questIsRunning = true
  if (!savedVars.questStats) {
    savedVars.questStats = {
      totalMined: 0,
      startTime: GetTimeStamp(),
      endTime: 0,
    }
  }

  const startId = savedVars.questNextId ?? 1
  questCurrentGeneration++
  const gen = questCurrentGeneration
  d(
    `[${ADDON_NAME}] Starting quest mining from quest ID ${startId}. ` +
      `Progress reports every 500 quests. Use /temperdatamine stopquests to pause.`
  )
  processNextQuestBatch(gen)
}

export function stopQuestMining(): undefined {
  const savedVars = getSavedVariables()
  savedVars.questIsRunning = false
  questCurrentGeneration++
  d(`[${ADDON_NAME}] Quest mining stopped at quest ID ${savedVars.questNextId ?? 1}.`)
}

export function resetQuestMining(): undefined {
  const savedVars = getSavedVariables()
  savedVars.questIsRunning = false
  questCurrentGeneration++
  savedVars.quests = undefined
  savedVars.questNextId = undefined
  savedVars.questConsecutiveMisses = undefined
  savedVars.questCompleted = undefined
  savedVars.questStats = undefined
  d(`[${ADDON_NAME}] Quest mining data cleared. Ready to start fresh.`)
}

export function printQuestStatus(): undefined {
  const savedVars = getSavedVariables()
  const nextId = savedVars.questNextId ?? 1
  const found = savedVars.questStats?.totalMined ?? 0
  const running = savedVars.questIsRunning ?? false
  const misses = savedVars.questConsecutiveMisses ?? 0
  const isCompleted = savedVars.questCompleted ?? false

  d(`[${ADDON_NAME}] Quest Status:`)
  d(`  Completed: ${isCompleted}`)
  d(`  Running: ${running}`)
  d(`  Next quest ID: ${nextId}`)
  d(`  Quests found: ${found}`)
  d(`  Consecutive misses: ${misses}/${QUEST_MAX_CONSECUTIVE_MISSES}`)
}
