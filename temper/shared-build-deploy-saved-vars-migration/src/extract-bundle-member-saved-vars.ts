import { createHash } from "node:crypto"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { z } from "zod"

const SENTINEL_DIRNAME = ".temper-sv-migration"
const DEFAULT_MERGED_BASE = "Temper"

export interface ExtractResult {
  readonly blocks: readonly string[]
  readonly present: readonly string[]
  readonly missing: readonly string[]
}

function escapeRegExp(literal: string): string {
  return literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

const TOP_LEVEL_CLOSE = /^\}/
const TOP_LEVEL_ASSIGN = /^[A-Za-z_][A-Za-z0-9_]*[ \t]*=/

function sliceTopLevelBlock(lines: readonly string[], startIdx: number): string {
  for (let i = startIdx + 1; i < lines.length; i += 1) {
    const line = lines[i] ?? ""
    if (TOP_LEVEL_CLOSE.test(line)) return lines.slice(startIdx, i + 1).join("\n")
    if (TOP_LEVEL_ASSIGN.test(line)) return lines[startIdx] ?? ""
  }
  return lines[startIdx] ?? ""
}

export function extractMemberGlobalBlocks(
  mergedContent: string,
  globals: readonly string[]
): ExtractResult {
  const lines = mergedContent.split("\n")
  const blocks: string[] = []
  const present: string[] = []
  const missing: string[] = []
  for (const global of globals) {
    const startRe = new RegExp(`^${escapeRegExp(global)}[ \\t]*=`)
    const startIdx = lines.findIndex((line) => startRe.test(line))
    if (startIdx === -1) {
      missing.push(global)
      continue
    }
    blocks.push(sliceTopLevelBlock(lines, startIdx))
    present.push(global)
  }
  return { blocks, present, missing }
}

const SentinelMarkerSchema = z
  .object({
    version: z.literal(1),
    member: z.string(),
    at: z.string(),
    globals: z.array(z.string()),
    sourceSha256: z.string(),
    bytesWritten: z.number(),
  })
  .strict()
type SentinelMarker = z.infer<typeof SentinelMarkerSchema>

function sentinelPath(savedVarsDir: string, member: string): string {
  return join(savedVarsDir, SENTINEL_DIRNAME, `${member}.json`)
}

export function isBundleMemberMigrated(savedVarsDir: string, member: string): boolean {
  const path = sentinelPath(savedVarsDir, member)
  if (!existsSync(path)) return false
  try {
    SentinelMarkerSchema.parse(JSON.parse(readFileSync(path, "utf-8")))
  } catch {
    return true
  }
  return true
}

function writeSentinelMarker(savedVarsDir: string, marker: SentinelMarker): undefined {
  mkdirSync(join(savedVarsDir, SENTINEL_DIRNAME), { recursive: true })
  writeFileSync(sentinelPath(savedVarsDir, marker.member), `${JSON.stringify(marker, null, 2)}\n`)
  return undefined
}

export type BundleMemberMigrationOutcome =
  | {
      readonly kind: "migrated"
      readonly member: string
      readonly globals: readonly string[]
      readonly bytesWritten: number
      readonly backedUp: boolean
    }
  | { readonly kind: "skip-already-migrated"; readonly member: string }
  | { readonly kind: "skip-no-globals"; readonly member: string }
  | { readonly kind: "skip-no-source"; readonly member: string }
  | {
      readonly kind: "skip-no-member-data"
      readonly member: string
      readonly missing: readonly string[]
    }

export interface BundleMemberMigrationIo {
  readonly savedVarsDir: string
  readonly nowIso: string
  readonly mergedBundleBase?: string
}

export function migrateBundleMemberSavedVars(
  member: string,
  globals: readonly string[],
  io: BundleMemberMigrationIo
): BundleMemberMigrationOutcome {
  if (globals.length === 0) return { kind: "skip-no-globals", member }
  if (isBundleMemberMigrated(io.savedVarsDir, member)) {
    return { kind: "skip-already-migrated", member }
  }

  const mergedBase = io.mergedBundleBase ?? DEFAULT_MERGED_BASE
  const mergedFile = join(io.savedVarsDir, `${mergedBase}.lua`)
  if (!existsSync(mergedFile)) return { kind: "skip-no-source", member }

  const mergedContent = readFileSync(mergedFile, "utf-8")
  const { blocks, present, missing } = extractMemberGlobalBlocks(mergedContent, globals)
  if (blocks.length === 0) return { kind: "skip-no-member-data", member, missing }

  const memberFile = join(io.savedVarsDir, `${member}.lua`)
  let backedUp = false
  if (existsSync(memberFile)) {
    const bak = join(io.savedVarsDir, `${member}.lua.pre-bundle-migration.bak`)
    if (!existsSync(bak)) {
      writeFileSync(bak, readFileSync(memberFile))
      backedUp = true
    }
  }

  const payload = `${blocks.join("\n")}\n`
  writeFileSync(memberFile, payload)
  const bytesWritten = Buffer.byteLength(payload)

  writeSentinelMarker(io.savedVarsDir, {
    version: 1,
    member,
    at: io.nowIso,
    globals: [...present],
    sourceSha256: createHash("sha256").update(mergedContent).digest("hex"),
    bytesWritten,
  })

  return { kind: "migrated", member, globals: present, bytesWritten, backedUp }
}

const AddonJsonSavedVarsSchema = z
  .object({ savedVariables: z.array(z.string()).optional() })
  .passthrough()

export function readDeclaredSavedVars(sourceDir: string): readonly string[] {
  const path = join(sourceDir, "addon.json")
  if (!existsSync(path)) return []
  const raw: unknown = JSON.parse(readFileSync(path, "utf-8"))
  return AddonJsonSavedVarsSchema.parse(raw).savedVariables ?? []
}

export function logBundleMemberMigration(outcome: BundleMemberMigrationOutcome): undefined {
  if (outcome.kind === "migrated") {
    const backup = outcome.backedUp ? "; prior file backed up" : ""
    console.log(
      `✓ Migrated SavedVariables from bundle → ${outcome.member}.lua (${outcome.globals.length} global(s), ${outcome.bytesWritten} bytes${backup})`
    )
  }
  return undefined
}
