import { readFileSync } from "node:fs"
import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { savedVarsFile } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { TEMPER_QUESTS_SAVED_VARIABLES } from "@akasha/temper-quests-trace/auto-quest-trace"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"

const DATA = 2

const PATH_FLAG = "--path"

const JSON_FLAG = "--json"

const SAVED_VARIABLES_NAME = "TemperQuests_SavedVariables"

const CAPTURE_FILE = "TemperQuests.lua"

const NOTHING_CAPTURED =
  "holds no captured trace, so nothing here is an empty run rather than an unread one"

type TraceOption = {
  readonly index: number
  readonly optionType: number
  readonly optionTypeName?: string
  readonly kind: string
  readonly important: boolean
  readonly chosenBefore: boolean
  readonly text: string
}

type TraceEntry = {
  readonly kind: string
  readonly at: number
  readonly interactionType: number
  readonly interactionTypeName?: string
  readonly offerPending: boolean
  readonly pendingCompletion: boolean
  readonly decision: string
  readonly options: readonly TraceOption[]
  readonly action: string
  readonly journalIndex: number
  readonly numRewards: number
}

type AccountBlock = {
  readonly $AccountWide?: { readonly autoQuestDebugTrace?: readonly TraceEntry[] }
}

type CaptureRoot = { readonly Default?: Record<string, AccountBlock> }

function valueOf(argv: readonly string[], flag: string): string | undefined {
  for (let at = 0; at < argv.length; at += 1) {
    if (argv[at] === flag) return argv[at + 1]
  }
  return undefined
}

function messageOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

function entriesIn(root: CaptureRoot): readonly TraceEntry[] {
  const accounts = root.Default
  if (accounts === undefined) return []
  const collected: TraceEntry[] = []
  for (const account of Object.values(accounts)) {
    for (const entry of account.$AccountWide?.autoQuestDebugTrace ?? []) collected.push(entry)
  }
  return collected
}

function namedType(type: number, name: string | undefined): string {
  return name === undefined ? String(type) : `${String(type)} (${name})`
}

function menuLines(entry: TraceEntry): readonly string[] {
  const head =
    `t=${String(entry.at)} menu int=${namedType(entry.interactionType, entry.interactionTypeName)}` +
    ` offer=${entry.offerPending ? "y" : "n"} pending=${entry.pendingCompletion ? "y" : "n"}` +
    ` decision="${entry.decision}"`
  return [
    head,
    ...entry.options.map((one) => {
      const flags = `${one.important ? " important" : ""}${one.chosenBefore ? " chosen-before" : ""}`
      return `    ${String(one.index)}: type=${namedType(one.optionType, one.optionTypeName)} kind=${one.kind}${flags} | ${one.text}`
    }),
  ]
}

function linesOf(entry: TraceEntry): readonly string[] {
  if (entry.kind === "menu") return menuLines(entry)
  if (entry.kind === "action") return [`t=${String(entry.at)} action ${entry.action}`]
  return [
    `t=${String(entry.at)} complete-dialog journalIndex=${String(entry.journalIndex)} numRewards=${String(entry.numRewards)}`,
  ]
}

export function temperAutoQuestTrace(argv: readonly string[] = []): Answer {
  const tracePath = valueOf(argv, PATH_FLAG) ?? savedVarsFile(CAPTURE_FILE)

  let content: string
  try {
    content = readFileSync(tracePath, "utf8")
  } catch (thrown) {
    return refused(
      `no capture stands at ${tracePath}, so there is no trace to read: ${messageOf(thrown)}`,
      DATA
    )
  }

  let entries: readonly TraceEntry[]
  try {
    const raw = parseLuaSavedVariablesFile(content, SAVED_VARIABLES_NAME)
    entries = entriesIn(TEMPER_QUESTS_SAVED_VARIABLES.parse(raw) as CaptureRoot)
  } catch (thrown) {
    return refused(`${tracePath} holds no trace this reads: ${messageOf(thrown)}`, DATA)
  }

  if (entries.length === 0) return refused(`${tracePath} ${NOTHING_CAPTURED}`, DATA)

  if (argv.includes(JSON_FLAG)) {
    return { report: [JSON.stringify(entries)], refusals: [], code: 0 }
  }

  return { report: entries.flatMap(linesOf), refusals: [], code: 0 }
}
