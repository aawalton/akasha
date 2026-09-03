export const summary =
  "Print the addon's most recent banking-session ESO-script-profiler capture (per-source rollups, top closures by inclusive/self ms, total Lua ms vs GC ms) from TemperInventory.lua diagnostics"

import { readBankProfile } from "@akasha/temper-commands/bank-profile-reading"
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
      description: "Emit the full BankProfile object as single-line JSON instead of text",
    },
  ],
  examples: [
    "ops temper inventory bank-profile",
    "ops temper inventory bank-profile --json",
    "ops temper inventory bank-profile --inventory-path ./TemperInventory.lua",
  ],
}

interface ProfileEntry {
  readonly kind: "closure" | "cfunction"
  readonly name: string
  readonly source: string
  readonly line: number
  readonly callCount: number
  readonly inclusiveMs: number
  readonly selfMs: number
}

interface SourceBucket {
  readonly source: string
  readonly selfMs: number
  readonly inclusiveMs: number
  readonly callCount: number
}

interface BankProfile {
  readonly timestamp: number
  readonly bankingBag: number
  readonly profilerAvailable: boolean
  readonly frameCount: number
  readonly recordCount: number
  readonly truncated: boolean
  readonly totalLuaMs: number
  readonly totalSelfMs: number
  readonly gcMs: number
  readonly bySource: readonly SourceBucket[]
  readonly topByInclusive: readonly ProfileEntry[]
  readonly topBySelf: readonly ProfileEntry[]
}

interface BankProfileReader {
  readonly readBankProfile: (inventoryPath: string) => Promise<BankProfile>
}

function padRight(value: string, width: number): string {
  return value.length >= width ? value : value + " ".repeat(width - value.length)
}

function formatEntry(e: ProfileEntry): string {
  const where = e.kind === "cfunction" ? "[C]" : `${e.source}:${e.line}`
  return (
    `  ${padRight(`${e.inclusiveMs}ms`, 9)} self ${padRight(`${e.selfMs}ms`, 9)} ` +
    `×${padRight(`${e.callCount}`, 6)} ${e.name}  ${where}`
  )
}

function formatProfile(profile: BankProfile): string {
  const head =
    `[bank profile @ ${profile.timestamp}] bag=${profile.bankingBag} ` +
    `frames=${profile.frameCount} records=${profile.recordCount}` +
    (profile.truncated ? " (TRUNCATED at record cap)" : "")

  if (!profile.profilerAvailable) {
    return [
      head,
      "profiler UNAVAILABLE — StartScriptProfiler did not arm in this client " +
        "(API present but disabled). No records captured; cannot decide the " +
        "engine-C++-vs-Lua question. Escalate.",
    ].join("\n")
  }

  const totals =
    `totals: Lua ${profile.totalLuaMs}ms (self-sum ${profile.totalSelfMs}ms), ` +
    `GC ${profile.gcMs}ms`

  const bySource = [
    "by source (self ms desc):",
    ...profile.bySource.map(
      (b) =>
        `  ${padRight(`${b.selfMs}ms`, 9)} incl ${padRight(`${b.inclusiveMs}ms`, 9)} ` +
        `×${padRight(`${b.callCount}`, 8)} ${b.source}`
    ),
  ]

  const topByInclusive = [
    `top ${profile.topByInclusive.length} by inclusive ms:`,
    ...profile.topByInclusive.map(formatEntry),
  ]

  const topBySelf = [
    `top ${profile.topBySelf.length} by self ms:`,
    ...profile.topBySelf.map(formatEntry),
  ]

  return [head, totals, ...bySource, ...topByInclusive, ...topBySelf].join("\n")
}

export default async function temperInventoryBankProfile(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const inventoryPath =
    parsed.string("--inventory-path") ?? (await savedVarsFile("TemperInventory.lua"))

  const profile = await readBankProfile(inventoryPath)

  if (parsed.boolean("--json")) {
    process.stdout.write(`${JSON.stringify(profile)}\n`)
    return
  }

  process.stdout.write(`${formatProfile(profile)}\n`)
}
