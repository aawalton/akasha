import { getSavedVariables, type TaskData } from "../saved-variables"
import { getEsoDateString, getEsoResetTimestamp } from "../tracking/daily-writs"
import { isPermanentlyComplete } from "./task-hud-full-completion"
import {
  userCollapsedQuestIds,
  userCollapsedTaskIds,
  userExpandedQuestIds,
  userExpandedTaskIds,
} from "./task-hud-state"
import { resolveTaskProgress } from "./task-progress-resolver"

export function isTaskVisible(task: TaskData): boolean {
  if (task.dueDate !== undefined && task.dueDate > getEsoDateString(GetTimeStamp())) return false

  if (task.scope === "account") return false
  if (task.scope === "character") {
    return task.esoCharacterId === GetCurrentCharacterId()
  }
  if (task.scope === "next_character") {
    return isCurrentCharacterNext(task)
  }
  const progress = resolveTaskProgress(getSavedVariables(), task)
  return !isPermanentlyComplete({ cardId: task.completionCardId, progress })
}

export function isCurrentCharacterNext(task: TaskData): boolean {
  return task.esoCharacterId === GetCurrentCharacterId()
}

export function isTaskExpanded(taskId: string, completed: boolean): boolean {
  if (userExpandedTaskIds.has(taskId)) return true
  if (userCollapsedTaskIds.has(taskId)) return false
  return !completed
}

export function isQuestExpanded(questKey: string, isAssisted: boolean): boolean {
  if (userExpandedQuestIds.has(questKey)) return true
  if (userCollapsedQuestIds.has(questKey)) return false
  return isAssisted
}

export function isTaskComplete(taskId: string, task: TaskData): boolean {
  const sv = getSavedVariables()
  const key =
    task.scope === "all_characters" || task.scope === "next_character"
      ? `${taskId}:${GetCurrentCharacterId()}`
      : taskId
  const ts = sv.completions[key]
  if (ts === undefined || ts <= 0) return false
  return ts >= getEsoResetTimestamp(GetTimeStamp())
}

export interface DungeonSetsInfo {
  zoneName: string
  incompleteSets: Array<{ name: string; slotsUnlocked: number; totalSlots: number }>
}

export function getDungeonSetsForCurrentZone(): DungeonSetsInfo | undefined {
  const difficulty = GetCurrentZoneDungeonDifficulty()
  if (difficulty === DUNGEON_DIFFICULTY_NONE) return undefined

  const zoneName = zo_strformat("<<1>>", GetUnitZone("player"))
  if (zoneName === "") return undefined

  const sv = getSavedVariables()
  const itemSets = sv.account.itemSets
  if (itemSets === undefined) return undefined

  const incompleteSets: Array<{ name: string; slotsUnlocked: number; totalSlots: number }> = []
  for (const [, setProgress] of Object.entries(itemSets)) {
    if (setProgress === undefined) continue
    if (setProgress.subcategoryName !== zoneName) continue
    if (setProgress.slotsUnlocked >= setProgress.totalSlots) continue
    incompleteSets.push({
      name: setProgress.name,
      slotsUnlocked: setProgress.slotsUnlocked,
      totalSlots: setProgress.totalSlots,
    })
  }

  if (incompleteSets.length === 0) return undefined

  incompleteSets.sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })

  return { zoneName, incompleteSets }
}
