import type {
  AccountCompletion,
  CharacterCompletion,
  CompanionCompletion,
} from "@akasha/temper-completion/completion-progress"
import { readFirstAccountWide } from "@akasha/temper-saved-variables/account-wide"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import { asRecord } from "@akasha/utils-narrow/as-record"
import { isRecord } from "@akasha/utils-narrow/is-record"
import {
  cleanAccountCompletionInput,
  cleanCharacterCompletionInput,
  cleanCompanionCompletionInput,
} from "../completion-input-schema/completion-input-schema.module.code.ts"

export type AddonCharacterRecord = { name: string; priorityOrder?: number } & CharacterCompletion

export interface SavedVariablesDiagnostics {
  readonly knownSectionCount: number
  readonly skippedCharacters: number
  readonly skippedCompanions: number
}

export interface ParsedSavedVariables {
  account: AccountCompletion | undefined
  characters: Record<string, AddonCharacterRecord>
  companions: Record<string, { companionId: string; data: CompanionCompletion }>
  readonly diagnostics: SavedVariablesDiagnostics
}

function normalizeLuaNumericKeys(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (isRecord(value)) {
      result[key] = normalizeLuaNumericKeys(value)
    } else {
      result[key] = value
    }
  }
  return result
}

function asAccountCompletion(value: unknown): AccountCompletion {
  return cleanAccountCompletionInput(value) as AccountCompletion
}
function asAddonCharacterRecord(value: unknown): AddonCharacterRecord {
  return cleanCharacterCompletionInput(value) as AddonCharacterRecord
}
function asCompanionCompletion(value: unknown): CompanionCompletion {
  return cleanCompanionCompletionInput(value) as CompanionCompletion
}

function toLuaKeyedRecord(value: unknown): Record<string, unknown> {
  return asRecord(value) ?? {}
}

export function parseSavedVariablesContent(
  content: string,
  companionIdByDefId: (defId: number) => string | undefined
): ParsedSavedVariables {
  let root: Record<string, unknown>
  try {
    root = parseLuaSavedVariablesFile(content, "TemperCharacters_SavedVariables")
  } catch {
    root = parseLuaSavedVariablesFile(content, "Temper_SavedVariables")
  }

  const defaultTable = asRecord(root.Default)
  if (!defaultTable) {
    throw new Error("Missing Default table in saved variables")
  }

  const accountWide = readFirstAccountWide(defaultTable)
  if (!accountWide) {
    throw new Error("Could not find $AccountWide in saved variables")
  }

  let skippedCharacters = 0
  let skippedCompanions = 0

  const accountRecord = asRecord(accountWide.account)
  const account = accountRecord
    ? asAccountCompletion(normalizeLuaNumericKeys(accountRecord))
    : undefined

  const charactersTable = asRecord(accountWide.characters)
  const characters: Record<string, AddonCharacterRecord> = {}

  if (charactersTable) {
    for (const [esoCharacterId, charEntry] of Object.entries(charactersTable)) {
      const charRecord = asRecord(charEntry)
      if (!charRecord) {
        skippedCharacters++
        continue
      }

      characters[esoCharacterId] = asAddonCharacterRecord(normalizeLuaNumericKeys(charRecord))
    }
  }

  const companionsRecord = asRecord(accountWide.companions)
  const companionsTable = toLuaKeyedRecord(accountWide.companions)
  const companions: Record<string, { companionId: string; data: CompanionCompletion }> = {}

  for (const [defIdKey, companionEntry] of Object.entries(companionsTable)) {
    const rec = asRecord(companionEntry)
    if (!rec) {
      skippedCompanions++
      continue
    }

    const defId = parseInt(defIdKey, 10)
    const companionId = companionIdByDefId(defId)
    if (companionId == null) {
      skippedCompanions++
      continue
    }

    companions[defIdKey] = {
      companionId,
      data: asCompanionCompletion(normalizeLuaNumericKeys(rec)),
    }
  }

  const knownSectionCount =
    (accountRecord ? 1 : 0) + (charactersTable ? 1 : 0) + (companionsRecord ? 1 : 0)

  return {
    account,
    characters,
    companions,
    diagnostics: { knownSectionCount, skippedCharacters, skippedCompanions },
  }
}
