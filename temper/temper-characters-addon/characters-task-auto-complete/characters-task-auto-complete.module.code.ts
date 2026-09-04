import { isSkillMorphTaskComplete } from "@akasha/temper-characters-skills-morphs-addon/skill-morph-task-hud"
import { getEsoDayStringFromSec, getEsoResetTimestampSec } from "@akasha/temper-dungeons/eso-reset"
import { ADDON_NAME } from "@akasha/temper-player-completion-state/completion-addon-constants"
import type {
  SavedVariablesData,
  TaskData,
} from "@akasha/temper-player-completion-state/completion-saved-variables"
import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"
import type { TaskProgress } from "@akasha/temper-player-completion-state/completion-task-progress"
import {
  hasNoAntiquityLeadMatching,
  isActionableLead,
  isLegendaryLead,
  isMotifLead,
} from "../characters-antiquity-lead-checks/characters-antiquity-lead-checks.module.code.ts"
import { getCharactersConfig } from "../characters-config/characters-config.module.code.ts"
import {
  HIRELING_MAILS_DAILY_TARGET,
  hirelingCountForToday,
} from "../characters-hireling-mail-count/characters-hireling-mail-count.module.code.ts"
import { refreshTaskHud } from "../characters-task-hud/characters-task-hud.module.code.ts"
import { clearInitialCompletion } from "../characters-task-hud-state/characters-task-hud-state.module.code.ts"
import { isCurrentCharacterNext } from "../characters-task-hud-visibility/characters-task-hud-visibility.module.code.ts"
import { resolveTaskProgress } from "../characters-task-progress-resolver/characters-task-progress-resolver.module.code.ts"

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
  const todayStr = getEsoDayStringFromSec(nowSec)
  const resetTs = getEsoResetTimestampSec(nowSec)

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
  const todayStr = getEsoDayStringFromSec(nowSec)
  const resetTs = getEsoResetTimestampSec(nowSec)

  cleanStaleCompletions()

  const cfg = getCharactersConfig()
  for (const [taskId, task] of Object.entries(cfg.tasks)) {
    if (task.completionCardId === undefined) continue

    if (task.dueDate !== undefined && task.dueDate > todayStr) continue

    const completionKey = getCompletionKey(taskId, task)

    const existing = sv.completions[completionKey]
    if (existing !== undefined && existing >= resetTs) continue

    if (task.rrule !== undefined) {
      if (
        task.completionCardId === "antiquity-leads-motifs" &&
        hasNoAntiquityLeadMatching(isMotifLead)
      ) {
        sv.completions[completionKey] = GetTimeStamp()
        continue
      }
      if (
        task.completionCardId === "antiquity-leads-legendary" &&
        hasNoAntiquityLeadMatching(isLegendaryLead)
      ) {
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

      const progress = resolveProgressForTask(task)
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

      if (
        task.completionCardId === "antiquity-lore" &&
        hasNoAntiquityLeadMatching(isActionableLead)
      ) {
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
      const progress = resolveProgressForTask(task)
      if (progress === undefined) continue

      if (progress.current >= progress.total) {
        sv.completions[completionKey] = GetTimeStamp()
      }
    }
  }

  autoUncompleteSkillMorphs(sv, resetTs)

  propagateNextCharacterCompletion(sv, resetTs)

  checkAllCharactersCompletion(sv, resetTs)

  refreshTaskHud()
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

export function resolveProgressForTask(task: TaskData): TaskProgress | undefined {
  if (task.scope === "next_character") {
    return resolveNextCharacterProgress(task)
  }

  return resolveTaskProgress(task)
}

export function resolveNextCharacterProgress(task: TaskData): TaskProgress | undefined {
  const progress = resolveTaskProgress(task)
  if (progress === undefined) return undefined
  if (isCurrentCharacterNext(task)) return progress
  if (progress.current >= progress.total) return progress
  return undefined
}
