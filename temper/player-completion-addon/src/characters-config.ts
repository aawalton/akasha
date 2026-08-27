import type { CompletionOverride } from "@temper/player-completion/completion-overrides"
import type { CharactersConfigGlobal, SavedVariablesData, TaskData } from "./saved-variables"
import { getSavedVariables } from "./saved-variables"

export interface CharactersConfigView {
  characterPriority: SavedVariablesData["characterPriority"] | readonly string[]
  tasks: Record<string, TaskData>
  completionOverrides: Record<string, CompletionOverride[]>
}

function isCharactersConfig(value: unknown): value is CharactersConfigGlobal {
  if (typeof value !== "object" || value === null) return false
  if (!("version" in value)) return false
  return typeof value.version === "number"
}

function getActiveConfig(): CharactersConfigGlobal | undefined {
  const candidate: unknown = globalThis.TemperCharactersConfig
  if (!isCharactersConfig(candidate)) return undefined
  if (candidate.version <= 0) return undefined
  return candidate
}

export function getCharactersConfig(): CharactersConfigView {
  const cfg = getActiveConfig()
  const sv = getSavedVariables()
  return {
    characterPriority: cfg?.characterPriority ?? sv.characterPriority,
    tasks: cfg?.tasks ?? sv.tasks,
    completionOverrides: cfg?.completionOverrides ?? sv.completionOverrides ?? {},
  }
}

export function getCompletionOverridesForCharacter(charId: string): CompletionOverride[] {
  const overrides = getCharactersConfig().completionOverrides[charId]
  return overrides ?? []
}
