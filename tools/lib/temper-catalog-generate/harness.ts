
import { execSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { codeModule } from "../code-import.ts"
import { dataError } from "../exit.ts"

export const CATALOG_SAVED_VARIABLES = "TemperCatalog.lua"
export const MINED_SAVED_VARIABLES = "TemperDataMining.lua"

const LUA_PARSER = "@temper/shared-saved-variables/lua-parser"
const ESO_PATHS = "@temper/shared-foundation-misc-eso-paths-resolve"
const NARROW = "@shared/utils-narrow"
const MINED_DATA_PARSE = "packages/temper/scripts/src/mined-data-parse.ts"

interface LuaParserModule {
  readonly parseLuaSavedVariablesFile: (
    content: string,
    variableName: string
  ) => Record<string, unknown>
}

interface EsoPathsModule {
  readonly savedVarsFile: (name: string) => string
}

interface NarrowModule {
  readonly asRecord: (value: unknown) => Record<string, unknown> | undefined
}

export interface MinedFailureReason {
  readonly reason: string
  readonly count: number
}

export interface MinedExtractDiagnostics {
  readonly unreadableIds: readonly number[]
  readonly nonIntegerKeys: readonly string[]
  readonly reasons: readonly MinedFailureReason[]
}

export interface MinedQuestRow {
  readonly questId: number
  readonly name: string
  readonly questType: number
  readonly repeatableType: number
  readonly zoneId: number
  readonly zoneName: string
}

interface MinedDataParseModule {
  readonly readMinedAccountWide: (content: string) => Record<string, unknown>
  readonly extractMinedQuestRows: (accountWide: Record<string, unknown>) => {
    readonly rows: readonly MinedQuestRow[]
    readonly diagnostics: MinedExtractDiagnostics
  }
  readonly isFullyRead: (diagnostics: MinedExtractDiagnostics) => boolean
}

export interface CatalogSchema<Parsed> {
  readonly parse: (input: unknown) => Parsed
}

export async function catalogSchema<Parsed>(
  ref: string,
  exported: string
): Promise<CatalogSchema<Parsed>> {
  const mod = await codeModule<Record<string, CatalogSchema<Parsed>>>(ref)
  const schema = mod[exported]
  if (schema === undefined) throw dataError(`\`${ref}\` exports no \`${exported}\``)
  return schema
}

export function minedDataParse(): Promise<MinedDataParseModule> {
  return codeModule<MinedDataParseModule>(MINED_DATA_PARSE)
}

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

export async function defaultSavedVarsPath(savedVariables: string): Promise<string> {
  const { savedVarsFile } = await codeModule<EsoPathsModule>(ESO_PATHS)
  return savedVarsFile(savedVariables)
}

async function readCatalogAccountWide(filePath: string): Promise<Record<string, unknown>> {
  const { parseLuaSavedVariablesFile } = await codeModule<LuaParserModule>(LUA_PARSER)
  const { asRecord } = await codeModule<NarrowModule>(NARROW)

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

async function readAccountWide(
  savedVariables: string,
  filePath: string
): Promise<Record<string, unknown>> {
  if (savedVariables === CATALOG_SAVED_VARIABLES) return readCatalogAccountWide(filePath)
  const { readMinedAccountWide } = await minedDataParse()
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
  const filePath = namedFile ?? (await defaultSavedVarsPath(tier.savedVariables))

  process.stdout.write(`Reading: ${filePath}\n`)
  const accountWide = await readAccountWide(tier.savedVariables, filePath)
  const apiVersion = requireApiVersion(accountWide, tier.savedVariables)

  const emitted = await tier.emit(accountWide, apiVersion)
  for (const line of emitted.report) process.stdout.write(`${line}\n`)
  for (const line of emitted.warnings ?? []) process.stderr.write(`${line}\n`)

  const outputPath = resolve(root, tier.outputPath)
  const content = tier.format ? biomeFormatted(emitted.content, outputPath, root) : emitted.content
  writeFileSync(outputPath, content)

  process.stdout.write(`Wrote: ${outputPath}\n`)
}
