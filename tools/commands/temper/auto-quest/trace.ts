export const summary = "Read the auto-quest debug trace captured by TemperQuests (text by default; --json for full AutoQuestTraceEntry[])"

import { readFile } from "node:fs/promises"
import { rootSchema } from "@temper/player-quests-addon-cli/temper/auto-quest/saved-variables-schema"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import type { CommandHelp } from "../../../ops/surface.ts"
import { dataError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { savedVarsFile } from "../../../lib/temper-inventory-paths.ts"

const SAVED_VARIABLES_NAME = "TemperQuests_SavedVariables"

export const help: CommandHelp = {
  flags: [
    {
      name: "--path",
      argLabel: "<path>",
      valueShape: "token",
      description: `Path to TemperQuests.lua (default: /home/walton/.steam/steam/steamapps/compatdata/306130/pfx/drive_c/users/steamuser/Documents/Elder Scrolls Online/live/SavedVariables/TemperQuests.lua)`,
    },
    {
      name: "--json",
      description: "Emit a JSON array of full AutoQuestTraceEntry objects instead of text",
    },
  ],
  examples: [
    "ops temper auto-quest trace",
    "ops temper auto-quest trace --json",
    "ops temper auto-quest trace --path ./TemperQuests.lua",
  ],
}

interface TraceOption {
  readonly index: number
  readonly optionType: number
  readonly optionTypeName?: string
  readonly kind: string
  readonly important: boolean
  readonly chosenBefore: boolean
  readonly text: string
}

interface AutoQuestTraceEntry {
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

interface AccountBlock {
  readonly $AccountWide?: {
    readonly autoQuestDebugTrace?: readonly AutoQuestTraceEntry[]
  }
}

interface SavedVariablesRoot {
  readonly Default?: Record<string, AccountBlock>
}

function collectEntries(parsed: SavedVariablesRoot): readonly AutoQuestTraceEntry[] {
  const defaultTable = parsed.Default
  if (defaultTable === undefined) return []
  const collected: AutoQuestTraceEntry[] = []
  for (const account of Object.values(defaultTable)) {
    const entries = account.$AccountWide?.autoQuestDebugTrace
    if (entries === undefined) continue
    for (const entry of entries) collected.push(entry)
  }
  return collected
}

function formatEntry(entry: AutoQuestTraceEntry): string {
  if (entry.kind === "menu") {
    const int =
      entry.interactionTypeName === undefined
        ? `${entry.interactionType}`
        : `${entry.interactionType} (${entry.interactionTypeName})`
    const head =
      `t=${entry.at} menu int=${int}` +
      ` offer=${entry.offerPending ? "y" : "n"} pending=${entry.pendingCompletion ? "y" : "n"}` +
      ` decision="${entry.decision}"`
    const lines = [head]
    for (const o of entry.options) {
      const type =
        o.optionTypeName === undefined ? `${o.optionType}` : `${o.optionType} (${o.optionTypeName})`
      const flags = `${o.important ? " important" : ""}${o.chosenBefore ? " chosen-before" : ""}`
      lines.push(`    ${o.index}: type=${type} kind=${o.kind}${flags} | ${o.text}`)
    }
    return lines.join("\n")
  }
  if (entry.kind === "action") {
    return `t=${entry.at} action ${entry.action}`
  }
  return `t=${entry.at} complete-dialog journalIndex=${entry.journalIndex} numRewards=${entry.numRewards}`
}

export default async function autoQuestTrace(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const tracePath = parsed.string("--path") ?? (await savedVarsFile("TemperQuests.lua"))

  let content: string
  try {
    content = await readFile(tracePath, "utf8")
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw dataError(
      `no captured trace yet — TemperQuests.lua not found at ${tracePath}: ${reason}`
    )
  }

  const raw = parseLuaSavedVariablesFile(content, SAVED_VARIABLES_NAME)
  const root = rootSchema.parse(raw) as SavedVariablesRoot
  const entries = collectEntries(root)

  if (entries.length === 0) {
    process.stdout.write("(no auto-quest trace captured)\n")
    return
  }

  if (parsed.boolean("--json")) {
    process.stdout.write(`${JSON.stringify(entries)}\n`)
    return
  }

  process.stdout.write(`${entries.map(formatEntry).join("\n")}\n`)
}
