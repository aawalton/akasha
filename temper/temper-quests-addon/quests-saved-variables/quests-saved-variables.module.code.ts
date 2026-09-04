import type { AutoQuestTraceEntry } from "@akasha/temper-quests-trace/auto-quest-trace"
import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"
import {
  SAVED_VARIABLES_NAME,
  SAVED_VARIABLES_VERSION,
} from "../quests-constants/quests-constants.module.code.ts"

export interface SavedVariablesData {
  autoQuest?: boolean
  autoQuestDebug?: boolean
  autoQuestDebugTrace?: AutoQuestTraceEntry[]
  migratedFromCharacters?: boolean
}

const CHARACTERS_SAVED_VARIABLES_NAME = "TemperCharacters_SavedVariables"

let savedVarsInstance: SavedVariablesData | undefined

export function initializeSavedVariables(): SavedVariablesData {
  const raw = ZO_SavedVars.NewAccountWide<SavedVariablesData>(
    SAVED_VARIABLES_NAME,
    SAVED_VARIABLES_VERSION,
    undefined,
    {}
  )
  savedVarsInstance = raw
  migrateToggleStateFromCharacters(raw)
  return raw
}

function migrateToggleStateFromCharacters(sv: SavedVariablesData): undefined {
  if (sv.migratedFromCharacters === true) return
  sv.migratedFromCharacters = true

  const globals: Record<string, unknown> = globalThis
  const carried = computeCarriedToggles(globals[CHARACTERS_SAVED_VARIABLES_NAME])
  if (carried.autoQuest === false) sv.autoQuest = false
  if (carried.autoQuestDebug === true) sv.autoQuestDebug = true
}

export function computeCarriedToggles(old: unknown): {
  autoQuest?: boolean
  autoQuestDebug?: boolean
} {
  const carried: { autoQuest?: boolean; autoQuestDebug?: boolean } = {}
  if (!isObjectRecord(old)) return carried
  const defaultTable = old["Default"]
  if (!isObjectRecord(defaultTable)) return carried
  for (const accountEntry of Object.values(defaultTable)) {
    if (!isObjectRecord(accountEntry)) continue
    const accountWide = accountEntry["$AccountWide"]
    if (!isObjectRecord(accountWide)) continue
    if (accountWide["autoQuest"] === false) carried.autoQuest = false
    if (accountWide["autoQuestDebug"] === true) carried.autoQuestDebug = true
  }
  return carried
}

export function getSavedVariables(): SavedVariablesData {
  if (savedVarsInstance === undefined) {
    throw new Error("TemperQuests SavedVariables not initialized")
  }
  return savedVarsInstance
}
