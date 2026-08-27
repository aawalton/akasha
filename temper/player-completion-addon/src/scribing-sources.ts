import { SCRIBING_SOURCES } from "./generated/scribing-sources.generated"
import { CHAPTERS_PER_STYLE, MOTIF_STYLE_LOOKUP } from "./generated/motif-style-lookup.generated"
import { getSavedVariables, type TaskData } from "./saved-variables"

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

export { SCRIBING_SOURCES }

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
  const sv = getSavedVariables()
  const achievements = sv.account.achievements
  if (achievements === undefined) return []

  const rows: ScribingSourceSubRow[] = []

  for (const source of SCRIBING_SOURCES) {
    if (source.scriptType !== scriptType) continue

    let found = false
    for (const ach of source.achievements) {
      const entry = achievements[ach.achievementId]
      if (entry?.completed) continue

      if (entry !== undefined) {
        const cp = entry.criteriaProgress
        if (cp.criteria !== undefined) {
          const values = Object.entries(cp.criteria)
          if (values.length > 0) {
            let current = 0
            let total = 0
            for (const [, c] of values) {
              current += c.numCompleted
              total += c.numRequired
            }
            if (total > 1) {
              rows.push({ label: source.label, achievementName: ach.name, current, total })
              found = true
              break
            }
          }
        }
        rows.push({
          label: source.label,
          achievementName: ach.name,
          current: 0,
          total: cp.totalSteps <= 1 ? 1 : cp.totalSteps,
        })
      } else {
        rows.push({ label: source.label, achievementName: ach.name, current: 0, total: 1 })
      }
      found = true
      break
    }
    if (!found) continue
  }

  return rows
}

export const MAX_MOTIF_FALLBACK_PER_TYPE: Record<ScriptType, number> = {
  affix: 3,
  focus: 2,
  signature: 2,
}

export interface ScribingMotifFallbackEntry {
  name: string
  known: number
  total: number
  activityLabel: string
}

export interface MotifFallbackCandidate {
  name: string
  known: number
  total: number
  sourceLabel: string
  sourceDescription: string
  remaining: number
}

const SCRIBING_ACTIVITY_WORD: Record<string, string> = {
  "DLC Delve Dailies": "Delve",
  "DLC World Boss Dailies": "World Boss",
  "DLC Incursion Dailies": "Incursion",
}

function extractTrailingParenthetical(text: string): string | undefined {
  let open = -1
  let close = -1
  for (let i = 0; i < text.length; i++) {
    const ch = text.charAt(i)
    if (ch === "(") open = i
    else if (ch === ")") close = i
  }
  if (open === -1 || close === -1 || close <= open + 1) return undefined
  return text.slice(open + 1, close)
}

export function scribingMotifActivityLabel(sourceLabel: string, sourceDescription: string): string {
  const activity = SCRIBING_ACTIVITY_WORD[sourceLabel]
  const zone = extractTrailingParenthetical(sourceDescription)
  if (activity === undefined || zone === undefined || zone === "base game") return sourceLabel
  return `${zone} ${activity} Daily`
}

export function getScribingMotifFallbackSubRows(
  scriptType: ScriptType
): ScribingMotifFallbackEntry[] {
  const sv = getSavedVariables()
  const charId = GetCurrentCharacterId()
  const charData = sv.characters[charId]
  const loreLibrary = charData?.loreLibrary
  if (loreLibrary === undefined) return []

  const category = loreLibrary[2]
  if (category === undefined) return []

  const labelsForScriptType: Record<string, boolean> = {}
  for (const source of SCRIBING_SOURCES) {
    if (source.scriptType === scriptType) labelsForScriptType[source.label] = true
  }

  const candidates: MotifFallbackCandidate[] = []

  for (const [collIdxStr, style] of Object.entries(MOTIF_STYLE_LOOKUP)) {
    const matchingLabels: string[] = []
    for (const label of style.scribingSourceLabels) {
      if (labelsForScriptType[label] === true) {
        matchingLabels.push(label)
      }
    }
    if (matchingLabels.length === 0) continue

    const collectionIndex = Number(collIdxStr)
    const knownBooks = category[collectionIndex]
    let known = 0
    if (knownBooks !== undefined) {
      if (Array.isArray(knownBooks)) {
        known = knownBooks.length
      } else {
        known = Object.keys(knownBooks).length
      }
    }

    if (known >= CHAPTERS_PER_STYLE) continue

    for (const sourceLabel of matchingLabels) {
      candidates.push({
        name: style.name,
        known,
        total: CHAPTERS_PER_STYLE,
        sourceLabel,
        sourceDescription: style.sourceDescription,
        remaining: CHAPTERS_PER_STYLE - known,
      })
    }
  }

  candidates.sort((a, b) => {
    if (a.remaining !== b.remaining) return a.remaining - b.remaining
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })

  const maxBadges = MAX_MOTIF_FALLBACK_PER_TYPE[scriptType]
  const pickedSources: Record<string, boolean> = {}
  const entries: ScribingMotifFallbackEntry[] = []

  for (const c of candidates) {
    if (pickedSources[c.sourceLabel] === true) continue
    if (entries.length >= maxBadges) break
    pickedSources[c.sourceLabel] = true
    entries.push({
      name: c.name,
      known: c.known,
      total: c.total,
      activityLabel: scribingMotifActivityLabel(c.sourceLabel, c.sourceDescription),
    })
  }

  return entries
}

export const GUILD_DAILY_FALLBACK: Record<ScriptType, string> = {
  focus: "Mages Guild Daily",
  signature: "Fighters Guild Daily",
  affix: "Undaunted Delve Daily",
}

export function getScribingGuildDailyFallback(scriptType: ScriptType): string {
  return GUILD_DAILY_FALLBACK[scriptType]
}
