
export const summary = "Show the current automation settings (TSV by default, --json for raw shape)"

import type { CommandHelp } from "../../../../ops/surface.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { emitJson, emitTsv } from "../../../../lib/format-output.ts"
import {
  type AutomationSettings,
  inventorySettings,
  type Toggles,
} from "../../../../lib/temper-inventory.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--json",
      description: "Emit the full AutomationSettings shape as JSON instead of TSV",
    },
  ],
  examples: ["ops temper inventory automation show", "ops temper inventory automation show --json"],
}

const COLUMNS = ["scope", "toggle", "value"] as const

function toggleRowsFor(
  scope: string,
  toggles: Toggles | undefined
): readonly Record<string, unknown>[] {
  if (toggles === undefined) return []
  const out: Record<string, unknown>[] = []
  for (const [toggle, value] of Object.entries(toggles)) {
    if (typeof value !== "boolean") continue
    out.push({ scope, toggle, value })
  }
  return out
}

function buildToggleRows(settings: AutomationSettings): readonly Record<string, unknown>[] {
  const charScopes = Object.entries(settings.characters).flatMap(([esoCharId, toggles]) =>
    toggleRowsFor(`character:${esoCharId}`, toggles)
  )
  const companionScopes = Object.entries(settings.companions).flatMap(([companionId, toggles]) =>
    toggleRowsFor(`companion:${companionId}`, toggles)
  )
  return [
    ...toggleRowsFor("global.characters", settings.global?.characters),
    ...toggleRowsFor("global.companions", settings.global?.companions),
    ...charScopes,
    ...companionScopes,
  ]
}

export default async function temperInventoryAutomationShow(
  args: readonly string[]
): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const settingsAccess = await inventorySettings()
  const settings = await settingsAccess.readAutomation()

  if (json) {
    process.stdout.write(`${emitJson(settings)}\n`)
    return
  }

  process.stdout.write(`${emitTsv(buildToggleRows(settings), COLUMNS)}\n`)
}
