
import { execSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { asRecord } from "@shared/utils-narrow"
import { readMinedAccountWide } from "@temper/scripts/mined-data-parse"
import { savedVarsFile } from "@temper/shared-foundation-misc-eso-paths-resolve"
import { parseLuaSavedVariablesFile } from "@temper/shared-saved-variables/lua-parser"
import { dataError } from "../exit.ts"

export const CATALOG_SAVED_VARIABLES = "TemperCatalog.lua"
export const MINED_SAVED_VARIABLES = "TemperDataMining.lua"

export interface TierEmit {
  readonly content: string
  readonly report: readonly string[]
  readonly warnings?: readonly string[]
}

export interface Tier {
  readonly slug: string
  readonly summary: string
  readonly savedVariables: string
  readonly outputPath: string
  readonly format: boolean
  readonly emit: (
    accountWide: Record<string, unknown>,
    apiVersion: string
  ) => Promise<TierEmit> | TierEmit
}

function addonName(savedVariables: string): string {
  return savedVariables.replace(/\.lua$/, "")
}

export function requireApiVersion(
  accountWide: Record<string, unknown>,
  savedVariables: string
): string {
  const raw = accountWide.apiVersion
  if (typeof raw !== "string" || raw.length === 0) {
    throw dataError(
      `${addonName(savedVariables)} SavedVariables missing apiVersion (string) — run the addon in-game first to capture it`
    )
  }
  return raw
}

function readCatalogAccountWide(filePath: string): Record<string, unknown> {
  const content = readFileSync(filePath, "utf-8")
  const root = parseLuaSavedVariablesFile(content, "TemperCatalog_SavedVariables")

  const defaultTable = asRecord(root.Default)
  if (!defaultTable) throw dataError("Missing Default table in saved variables")

  let accountWide: Record<string, unknown> | undefined
  for (const key of Object.keys(defaultTable)) {
    if (key.startsWith("@")) {
      const accountTable = asRecord(defaultTable[key])
      accountWide = asRecord(accountTable?.["$AccountWide"])
      if (accountWide) break
    }
  }

  if (!accountWide) throw dataError("Could not find $AccountWide in saved variables")

  return accountWide
}

function readAccountWide(savedVariables: string, filePath: string): Record<string, unknown> {
  if (savedVariables === CATALOG_SAVED_VARIABLES) return readCatalogAccountWide(filePath)
  return readMinedAccountWide(readFileSync(filePath, "utf-8"))
}

function biomeFormatted(content: string, outputPath: string, root: string): string {
  return execSync(`bunx biome format --stdin-file-path=${outputPath}`, {
    input: content,
    cwd: root,
  }).toString()
}

export async function runTier(
  tier: Tier,
  root: string,
  namedFile: string | undefined
): Promise<void> {
  const filePath = namedFile ?? savedVarsFile(tier.savedVariables)

  process.stdout.write(`Reading: ${filePath}\n`)
  const accountWide = readAccountWide(tier.savedVariables, filePath)
  const apiVersion = requireApiVersion(accountWide, tier.savedVariables)

  const emitted = await tier.emit(accountWide, apiVersion)
  for (const line of emitted.report) process.stdout.write(`${line}\n`)
  for (const line of emitted.warnings ?? []) process.stderr.write(`${line}\n`)

  const outputPath = resolve(root, tier.outputPath)
  const content = tier.format ? biomeFormatted(emitted.content, outputPath, root) : emitted.content
  writeFileSync(outputPath, content)

  process.stdout.write(`Wrote: ${outputPath}\n`)
}
