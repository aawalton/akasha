import { asRecord } from "@akasha/utils/narrow/as-record"
import { readFirstAccountWide } from "akasha/temper/saved-variables/account-wide/account-wide.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/saved-variables/lua-parser/lua-parser.module.code.ts"
import type { CharacterMark } from "../watcher-task-rolling/watcher-task-rolling.module.code.ts"

export const TASKS_GLOBAL_NAME = "TemperCharacters_SavedVariables"

export const SCOPE_MARK_AT = 36

export interface ParsedTaskCompletion {
  readonly taskId: string
  readonly timestamp: number
}

export interface TaskCompletionsRead {
  readonly entries: readonly ParsedTaskCompletion[]
  readonly heldBack: number
  readonly completed: readonly CharacterMark[]
  readonly progressed: readonly CharacterMark[]
}

export function namesWholeTask(key: string): boolean {
  return key.indexOf(":", SCOPE_MARK_AT) < 0
}

export function markOf(key: string): CharacterMark {
  return { taskId: key.slice(0, SCOPE_MARK_AT), characterId: key.slice(SCOPE_MARK_AT + 1) }
}

export function readTaskCompletions(content: string): TaskCompletionsRead {
  const root = parseLuaSavedVariablesFile(content, TASKS_GLOBAL_NAME)
  const defaultTable = asRecord(root.Default)
  if (!defaultTable) {
    throw new Error(`${TASKS_GLOBAL_NAME} carries no Default table`)
  }
  const accountWide = readFirstAccountWide(defaultTable)
  if (!accountWide) {
    throw new Error(
      `no account key under ${TASKS_GLOBAL_NAME}.Default carries a $AccountWide table`
    )
  }

  const completionsTable = asRecord(accountWide.completions) ?? {}
  const entries: ParsedTaskCompletion[] = []
  const completed: CharacterMark[] = []
  let heldBack = 0
  for (const [key, value] of Object.entries(completionsTable)) {
    if (typeof value !== "number") continue
    if (!namesWholeTask(key)) {
      heldBack++
      completed.push(markOf(key))
      continue
    }
    entries.push({ taskId: key, timestamp: value })
  }

  const snapshots = asRecord(accountWide.taskProgressSnapshots) ?? {}
  const progressed: CharacterMark[] = []
  for (const [key, held] of Object.entries(snapshots)) {
    if (namesWholeTask(key)) continue
    const reached = asRecord(held)?.value
    if (typeof reached !== "number" || reached <= 0) continue
    progressed.push(markOf(key))
  }

  return { entries, heldBack, completed, progressed }
}

export function parseTaskCompletions(content: string): readonly ParsedTaskCompletion[] {
  return readTaskCompletions(content).entries
}
