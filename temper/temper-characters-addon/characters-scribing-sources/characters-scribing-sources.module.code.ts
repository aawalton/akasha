import type { TaskData } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { SCRIBING_SOURCES } from "../characters-scribing-source-table/characters-scribing-source-table.module.code.ts"

export type ScriptType = "focus" | "signature" | "affix"

export interface ScribingSourceAchievement {
  achievementId: number
  name: string
}

export interface ScribingSource {
  scriptType: ScriptType
  label: string
  achievements: ScribingSourceAchievement[]
}

export interface ScribingSourceSubRow {
  label: string
  achievementName: string
  current: number
  total: number
}

export function getScribingScriptType(task: TaskData): ScriptType | undefined {
  const cardId = task.completionCardId
  if (cardId !== "scribing-knowledge" && cardId !== "account-scribing-knowledge") return undefined
  const path = task.completionItemPath
  if (path === undefined || path.length < 2 || path[0] !== "scripts") return undefined
  const slot = path[1]
  if (slot === "focusScripts") return "focus"
  if (slot === "signatureScripts") return "signature"
  if (slot === "affixScripts") return "affix"
  return undefined
}

export function getScribingSourceSubRows(scriptType: ScriptType): ScribingSourceSubRow[] {
  const achievements = getSavedVariables().account.achievements
  if (achievements === undefined) return []

  const rows: ScribingSourceSubRow[] = []

  for (const source of SCRIBING_SOURCES) {
    if (source.scriptType !== scriptType) continue

    for (const ach of source.achievements) {
      const entry = achievements[ach.achievementId]
      if (entry?.completed) continue

      if (entry === undefined) {
        rows.push({ label: source.label, achievementName: ach.name, current: 0, total: 1 })
        break
      }

      const cp = entry.criteriaProgress
      const criteria = cp.criteria === undefined ? [] : Object.entries(cp.criteria)
      let current = 0
      let total = 0
      for (const [, c] of criteria) {
        current += c.numCompleted
        total += c.numRequired
      }

      if (total > 1) {
        rows.push({ label: source.label, achievementName: ach.name, current, total })
        break
      }

      rows.push({
        label: source.label,
        achievementName: ach.name,
        current: 0,
        total: cp.totalSteps <= 1 ? 1 : cp.totalSteps,
      })
      break
    }
  }

  return rows
}

const GUILD_DAILY_FALLBACK: Record<ScriptType, string> = {
  focus: "Mages Guild Daily",
  signature: "Fighters Guild Daily",
  affix: "Undaunted Delve Daily",
}

export function getScribingGuildDailyFallback(scriptType: ScriptType): string {
  return GUILD_DAILY_FALLBACK[scriptType]
}
