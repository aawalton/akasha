import { isSkillMorphTaskComplete } from "@temper/game-characters-skills-morphs-addon/ui/task-auto-complete-skill-morphs"
import {
  hasNoActionableAntiquityLeads,
  hasNoLegendaryAntiquityLeads,
  hasNoMotifAntiquityLeads,
} from "./antiquity-lead-checks"
import { getCharactersConfig } from "./characters-config"
import { ADDON_NAME } from "./constants"
import { HIRELING_MAILS_DAILY_TARGET, hirelingCountForToday } from "./hireling-mail-count"
import { getSavedVariables, type SavedVariablesData, type TaskData } from "./saved-variables"
import { getEsoDateString, getEsoResetTimestamp } from "./tracking/daily-writs"
import { clearInitialCompletion, isCurrentCharacterNext, RefreshTaskHUD } from "./ui/task-hud"
import { resolveTaskProgress } from "./ui/task-progress-resolver"
import { type TaskProgress } from "./ui/task-progress-resolver-types"
export const AUTO_COMPLETE_UPDATE_NAME = ADDON_NAME + "_TaskAutoComplete"

export function scheduleTaskAutoCompletionCheck(): undefined {
  EVENT_MANAGER.UnregisterForUpdate(AUTO_COMPLETE_UPDATE_NAME)
  EVENT_MANAGER.RegisterForUpdate(AUTO_COMPLETE_UPDATE_NAME, 500, function (this: void): undefined {
    EVENT_MANAGER.UnregisterForUpdate(AUTO_COMPLETE_UPDATE_NAME)
    checkTaskAutoCompletion()
  })
}

export function getCompletionKey(taskId: string, task: TaskData): string {
  if (task.scope === "all_characters" || task.scope === "next_character") {
    return `${taskId}:${GetCurrentCharacterId()}`
  }
  return taskId
}

export function cleanStaleCompletions(): undefined {
  const sv = getSavedVariables()
  const nowSec = GetTimeStamp()
  const todayStr = getEsoDateString(nowSec)
  const resetTs = getEsoResetTimestamp(nowSec)

  for (const [key, ts] of Object.entries(sv.completions)) {
    if (ts < resetTs) {
      delete sv.completions[key]
    }
  }

  for (const [key, snapshot] of Object.entries(sv.taskProgressSnapshots)) {
    if (snapshot.date !== todayStr) {
      delete sv.taskProgressSnapshots[key]
    }
  }
}

export function checkTaskAutoCompletion(): undefined {
  const sv = getSavedVariables()

  const nowSec = GetTimeStamp()
  const todayStr = getEsoDateString(nowSec)
  const resetTs = getEsoResetTimestamp(nowSec)

  cleanStaleCompletions()

  const cfg = getCharactersConfig()
  for (const [taskId, task] of Object.entries(cfg.tasks)) {
    if (task.completionCardId === undefined) continue

    if (task.dueDate !== undefined && task.dueDate > todayStr) continue

    const completionKey = getCompletionKey(taskId, task)

    const existing = sv.completions[completionKey]
    if (existing !== undefined && existing >= resetTs) continue

    if (task.rrule !== undefined) {
      if (task.completionCardId === "antiquity-leads-motifs" && hasNoMotifAntiquityLeads()) {
        sv.completions[completionKey] = GetTimeStamp()
        continue
      }
      if (task.completionCardId === "antiquity-leads-legendary" && hasNoLegendaryAntiquityLeads()) {
        sv.completions[completionKey] = GetTimeStamp()
        continue
      }
      if (task.completionCardId === "guild-sales") {
        const postedDate = sv.guildSalesPostedDate
        if (postedDate !== undefined && postedDate === todayStr) {
          sv.completions[completionKey] = GetTimeStamp()
        }
        continue
      }
      if (task.completionCardId === "hireling-mails") {
        if (hirelingCountForToday(sv.hirelingMails, todayStr) >= HIRELING_MAILS_DAILY_TARGET) {
          sv.completions[completionKey] = GetTimeStamp()
        }
        continue
      }

      const progress = resolveProgressForTask(sv, task)
      if (progress === undefined) continue

      const delta = progress.deltaValue ?? progress.current
      const currentCharId = GetCurrentCharacterId()
      const snapshot = sv.taskProgressSnapshots[completionKey]
      if (snapshot === undefined || snapshot.charId !== currentCharId) {
        sv.taskProgressSnapshots[completionKey] = {
          date: todayStr,
          value: delta,
          charId: currentCharId,
        }
      } else if (delta > snapshot.value && task.completionCardId !== "daily-writs") {
        sv.completions[completionKey] = GetTimeStamp()
      }

      if (progress.current >= progress.total && task.completionCardId !== "daily-writs") {
        sv.completions[completionKey] = GetTimeStamp()
      }

      if (task.completionCardId === "antiquity-lore" && hasNoActionableAntiquityLeads()) {
        sv.completions[completionKey] = GetTimeStamp()
      }

      if (task.completionCardId === "skill-morphs") {
        if (isSkillMorphTaskComplete(task)) {
          sv.completions[completionKey] = GetTimeStamp()
        }
      }

      if (task.completionCardId === "daily-writs" && progress.current >= progress.total) {
        sv.completions[completionKey] = GetTimeStamp()
      }
    } else {
      const progress = resolveProgressForTask(sv, task)
      if (progress === undefined) continue

      if (progress.current >= progress.total) {
        sv.completions[completionKey] = GetTimeStamp()
      }
    }
  }

  autoUncompleteSkillMorphs(sv, resetTs)

  propagateNextCharacterCompletion(sv, resetTs)

  checkAllCharactersCompletion(sv, resetTs)

  RefreshTaskHUD()
}

export function autoUncompleteSkillMorphs(sv: SavedVariablesData, resetTs: number): undefined {
  const cfg = getCharactersConfig()
  for (const [taskId, task] of Object.entries(cfg.tasks)) {
    if (task.completionCardId !== "skill-morphs") continue

    const completionKey = getCompletionKey(taskId, task)
    const existing = sv.completions[completionKey]
    if (existing === undefined || existing < resetTs) continue

    if (!isSkillMorphTaskComplete(task)) {
      delete sv.completions[completionKey]
      clearInitialCompletion(taskId)
    }
  }
}

export function propagateNextCharacterCompletion(
  sv: SavedVariablesData,
  resetTs: number
): undefined {
  const currentCharId = GetCurrentCharacterId()
  const cfg = getCharactersConfig()
  for (const [taskId, task] of Object.entries(cfg.tasks)) {
    if (task.scope !== "next_character") continue

    if (!isCurrentCharacterNext(task)) continue

    const perCharKey = `${taskId}:${currentCharId}`
    const perCharTs = sv.completions[perCharKey]
    if (perCharTs === undefined || perCharTs < resetTs) continue

    const existing = sv.completions[taskId]
    if (existing !== undefined && existing >= resetTs) continue

    sv.completions[taskId] = perCharTs
  }
}

export function checkAllCharactersCompletion(sv: SavedVariablesData, resetTs: number): undefined {
  const characterIds = Object.keys(sv.characters)
  if (characterIds.length === 0) return

  const cfg = getCharactersConfig()
  for (const [taskId, task] of Object.entries(cfg.tasks)) {
    if (task.scope !== "all_characters") continue

    const existing = sv.completions[taskId]
    if (existing !== undefined && existing >= resetTs) continue

    let allDone = true
    for (const charId of characterIds) {
      const key = `${taskId}:${charId}`
      const charCompletion = sv.completions[key]
      if (charCompletion === undefined || charCompletion < resetTs) {
        allDone = false
        break
      }
    }

    if (allDone) {
      sv.completions[taskId] = GetTimeStamp()
    }
  }
}

export function resolveProgressForTask(
  sv: SavedVariablesData,
  task: TaskData
): TaskProgress | undefined {
  if (task.scope === "next_character") {
    return resolveNextCharacterProgress(sv, task)
  }

  return resolveTaskProgress(sv, task)
}

export function resolveNextCharacterProgress(
  sv: SavedVariablesData,
  task: TaskData
): TaskProgress | undefined {
  const progress = resolveTaskProgress(sv, task)
  if (progress === undefined) return undefined
  if (isCurrentCharacterNext(task)) return progress
  if (progress.current >= progress.total) return progress
  return undefined
}
