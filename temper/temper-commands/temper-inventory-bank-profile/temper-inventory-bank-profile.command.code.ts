import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { savedVarsFile } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { readBankProfile } from "../bank-profile-reading/bank-profile-reading.module.code.ts"

const INPUT = 1

const OPERATIONAL = 3

const INVENTORY_PATH = "--inventory-path"

const JSON_FLAG = "--json"

const INVENTORY_LUA = "TemperInventory.lua"

const WIDE_MS = 9

const WIDE_CALLS = 6

const WIDE_SOURCE_CALLS = 8

type ProfileEntry = {
  readonly kind: "closure" | "cfunction"
  readonly name: string
  readonly source: string
  readonly line: number
  readonly callCount: number
  readonly inclusiveMs: number
  readonly selfMs: number
}

type SourceBucket = {
  readonly source: string
  readonly selfMs: number
  readonly inclusiveMs: number
  readonly callCount: number
}

type BankProfile = {
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

export type Read =
  | { readonly inventoryPath: string | null; readonly json: boolean }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let inventoryPath: string | null = null
  let json = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === JSON_FLAG) {
      json = true
      continue
    }
    if (one === INVENTORY_PATH) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined || value.startsWith("--")) {
        refusals.push(`\`${INVENTORY_PATH}\` names the file to read, and no file followed it`)
        continue
      }
      inventoryPath = value
      continue
    }
    refusals.push(
      `\`${one}\` is nothing this takes — it takes \`${INVENTORY_PATH}\` and \`${JSON_FLAG}\``
    )
  }
  if (refusals.length > 0) return { refused: refusals }
  return { inventoryPath, json }
}

function padRight(value: string, width: number): string {
  return value.length >= width ? value : value + " ".repeat(width - value.length)
}

function entrySaid(one: ProfileEntry): string {
  const where = one.kind === "cfunction" ? "[C]" : `${one.source}:${one.line}`
  return (
    `  ${padRight(`${one.inclusiveMs}ms`, WIDE_MS)} self ${padRight(`${one.selfMs}ms`, WIDE_MS)} ` +
    `×${padRight(`${one.callCount}`, WIDE_CALLS)} ${one.name}  ${where}`
  )
}

export function profileSaid(profile: BankProfile): readonly string[] {
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
    ]
  }
  return [
    head,
    `totals: Lua ${profile.totalLuaMs}ms (self-sum ${profile.totalSelfMs}ms), GC ${profile.gcMs}ms`,
    "by source (self ms desc):",
    ...profile.bySource.map(
      (one) =>
        `  ${padRight(`${one.selfMs}ms`, WIDE_MS)} incl ` +
        `${padRight(`${one.inclusiveMs}ms`, WIDE_MS)} ` +
        `×${padRight(`${one.callCount}`, WIDE_SOURCE_CALLS)} ${one.source}`
    ),
    `top ${profile.topByInclusive.length} by inclusive ms:`,
    ...profile.topByInclusive.map(entrySaid),
    `top ${profile.topBySelf.length} by self ms:`,
    ...profile.topBySelf.map(entrySaid),
  ]
}

export async function temperInventoryBankProfile(
  argv: readonly string[] = [],
  given?: Given
): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  const root = given === undefined ? process.cwd() : resolve(given.root)
  const at =
    read.inventoryPath === null ? savedVarsFile(INVENTORY_LUA) : resolve(root, read.inventoryPath)
  try {
    const profile = (await readBankProfile(at)) as BankProfile
    if (read.json) return { report: [JSON.stringify(profile)], refusals: [], code: 0 }
    return { report: [...profileSaid(profile)], refusals: [], code: 0 }
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
