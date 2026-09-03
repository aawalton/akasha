export const summary =
  "Print the addon's most recent /tempermwprobe master-writ journal capture (every step + condition, raw API fields) from TemperInventory.lua diagnostics"

import { readMasterWritProbe } from "@akasha/temper-commands/master-writ-probe-reading"
import { parseArgs } from "../../../lib/parse-args.ts"
import { savedVarsFile, TEMPER_INVENTORY_LUA } from "../../../lib/temper-inventory-paths.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--inventory-path",
      argLabel: "<path>",
      valueShape: "token",
      description: `Path to TemperInventory.lua (default: ${TEMPER_INVENTORY_LUA})`,
    },
    {
      name: "--json",
      description: "Emit the full MasterWritProbe object as single-line JSON instead of text",
    },
  ],
  examples: [
    "ops temper inventory master-writ-probe",
    "ops temper inventory master-writ-probe --json",
    "ops temper inventory master-writ-probe --inventory-path ./TemperInventory.lua",
  ],
}

interface ProbeCondition {
  readonly conditionIndex: number
  readonly condText: string
  readonly current: number
  readonly max: number
  readonly complete: boolean
  readonly masterItemId?: number
  readonly materialItemId?: number
  readonly craftingType?: number
  readonly quality?: number
  readonly templateId?: number
  readonly setId?: number
  readonly traitType?: number
  readonly styleId?: number
  readonly encodedAlchemyTraits?: number
}

interface ProbeStep {
  readonly stepIndex: number
  readonly ending: boolean
  readonly numConditions: number
  readonly conditions: readonly ProbeCondition[]
}

interface ProbeQuest {
  readonly questIndex: number
  readonly name: string
  readonly repeatType: number
  readonly questType: number
  readonly numSteps: number
  readonly activeStepText: string
  readonly steps: readonly ProbeStep[]
}

interface MasterWritProbe {
  readonly timestamp: number
  readonly quests: readonly ProbeQuest[]
}

interface MasterWritProbeReader {
  readonly readMasterWritProbe: (inventoryPath: string) => Promise<MasterWritProbe>
}

function num(value: number | undefined): string {
  return value === undefined ? "nil" : `${value}`
}

function formatProbe(probe: MasterWritProbe): string {
  const lines: string[] = [
    `[master-writ probe @ ${probe.timestamp}] ${probe.quests.length} quest(s)`,
  ]
  for (const q of probe.quests) {
    lines.push(
      `quest#${q.questIndex} "${q.name}" repeat=${q.repeatType} type=${q.questType} numSteps=${q.numSteps}`
    )
    lines.push(`  activeStep="${q.activeStepText}"`)
    for (const s of q.steps) {
      lines.push(
        `  step#${s.stepIndex} ending=${s.ending ? "y" : "n"} numConditions=${s.numConditions}`
      )
      for (const c of s.conditions) {
        lines.push(
          `    cond#${c.conditionIndex} "${c.condText}" ${c.current}/${c.max} complete=${c.complete ? "y" : "n"}`
        )
        lines.push(
          `      masterItemId=${num(c.masterItemId)} materialItemId=${num(c.materialItemId)} ` +
            `craftingType=${num(c.craftingType)} quality=${num(c.quality)}`
        )
        lines.push(
          `      templateId=${num(c.templateId)} setId=${num(c.setId)} traitType=${num(c.traitType)} ` +
            `styleId=${num(c.styleId)} encodedAlchemyTraits=${num(c.encodedAlchemyTraits)}`
        )
      }
    }
  }
  return lines.join("\n")
}

export default async function temperInventoryMasterWritProbe(
  args: readonly string[]
): Promise<void> {
  const parsed = parseArgs(help, args)
  const inventoryPath =
    parsed.string("--inventory-path") ?? (await savedVarsFile("TemperInventory.lua"))

  const probe = await readMasterWritProbe(inventoryPath)

  if (parsed.boolean("--json")) {
    process.stdout.write(`${JSON.stringify(probe)}\n`)
    return
  }

  process.stdout.write(`${formatProbe(probe)}\n`)
}
