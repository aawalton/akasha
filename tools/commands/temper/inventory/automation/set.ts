
export const summary = "Set or clear a single automation toggle (--scope, --toggle, --value, --target)"

import type { CommandHelp } from "../../../../ops/surface.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import { type AutomationSettings, inventorySettings } from "../../../../lib/temper-inventory.ts"
import * as automationSet from "../../../../lib/temper-inventory/automation-set.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--scope",
      argLabel: "<scope>",
      valueShape: "token",
      required: true,
      description: "Target scope: `global`, `character:<esoCharId>`, or `companion:<companionId>`",
    },
    {
      name: "--toggle",
      argLabel: "<name>",
      valueShape: "token",
      required: true,
      description: "Toggle name (e.g. `equipment`, `dailyWrits`, `dailyWritBlacksmithing`)",
    },
    {
      name: "--value",
      argLabel: "<true|false|null>",
      valueShape: "token",
      required: true,
      choices: ["true", "false", "null"],
      description: "`true`/`false` set the toggle; `null` deletes the entry",
    },
    {
      name: "--target",
      argLabel: "<characters|companions>",
      valueShape: "token",
      choices: ["characters", "companions"],
      description:
        "Required only when --scope=global and --toggle is in both interfaces (equipment, skills)",
    },
  ],
  examples: [
    "ops temper inventory automation set --scope global --toggle dailyWrits --value true",
    "ops temper inventory automation set --scope character:@aawalton__char1 --toggle equipment --value false",
    "ops temper inventory automation set --scope companion:bastian --toggle skills --value null",
    "ops temper inventory automation set --scope global --toggle equipment --value true --target characters",
  ],
}

type Scope =
  | { readonly kind: "global"; readonly target: "characters" | "companions" }
  | { readonly kind: "character"; readonly esoCharId: string }
  | { readonly kind: "companion"; readonly companionId: string }

interface AutomationSetModule {
  readonly parseScope: (
    scopeArg: string,
    toggle: string,
    targetArg: string | undefined
  ) => Scope
  readonly parseValue: (arg: string) => boolean | null
  readonly applyToggle: (
    settings: AutomationSettings,
    scope: Scope,
    toggle: string,
    value: boolean | null
  ) => AutomationSettings
}

function describeScope(scope: Scope): string {
  if (scope.kind === "global") return `global.${scope.target}`
  if (scope.kind === "character") return `character:${scope.esoCharId}`
  return `companion:${scope.companionId}`
}

export default async function temperInventoryAutomationSet(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const scopeArg = parsed.requireString("--scope")
  const toggle = parsed.requireString("--toggle")
  const valueArg = parsed.requireString("--value")
  const targetArg = parsed.string("--target")

  const automation = automationSet as unknown as AutomationSetModule
  const scope = automation.parseScope(scopeArg, toggle, targetArg)
  const value = automation.parseValue(valueArg)

  const settingsAccess = await inventorySettings()
  const settings = await settingsAccess.readAutomation()
  const next = automation.applyToggle(settings, scope, toggle, value)
  await settingsAccess.writeAutomation(next)

  process.stdout.write(`${emitJson({ scope: describeScope(scope), toggle, value })}\n`)
}
