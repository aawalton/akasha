import { createHash } from "node:crypto"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { z } from "zod"
import { extractMemberGlobalBlocks } from "../saved-vars-blocks/saved-vars-blocks.module.code.ts"

const MARKER_DIRNAME = ".temper-sv-migration"

const DEFAULT_MERGED_BASE = "Temper"

const MarkerShape = z
  .object({
    version: z.literal(1),
    member: z.string(),
    at: z.string(),
    globals: z.array(z.string()),
    sourceSha256: z.string(),
    bytesWritten: z.number(),
  })
  .strict()

type Marker = z.infer<typeof MarkerShape>

function markerPath(savedVarsDir: string, member: string): string {
  return join(savedVarsDir, MARKER_DIRNAME, `${member}.json`)
}

export function isBundleMemberMigrated(savedVarsDir: string, member: string): boolean {
  return existsSync(markerPath(savedVarsDir, member))
}

function writeMarker(savedVarsDir: string, marker: Marker): undefined {
  mkdirSync(join(savedVarsDir, MARKER_DIRNAME), { recursive: true })
  writeFileSync(markerPath(savedVarsDir, marker.member), `${JSON.stringify(marker, null, 2)}\n`)
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

export type BundleMemberMigrationIo = {
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
    const aside = join(io.savedVarsDir, `${member}.lua.pre-bundle-migration.bak`)
    if (!existsSync(aside)) {
      writeFileSync(aside, readFileSync(memberFile))
      backedUp = true
    }
  }

  const payload = `${blocks.join("\n")}\n`
  writeFileSync(memberFile, payload)
  const bytesWritten = Buffer.byteLength(payload)

  writeMarker(io.savedVarsDir, {
    version: 1,
    member,
    at: io.nowIso,
    globals: [...present],
    sourceSha256: createHash("sha256").update(mergedContent).digest("hex"),
    bytesWritten,
  })

  return { kind: "migrated", member, globals: present, bytesWritten, backedUp }
}

const DeclaredSavedVars = z.object({ savedVariables: z.array(z.string()).optional() }).passthrough()

export function readDeclaredSavedVars(sourceDir: string): readonly string[] {
  const path = join(sourceDir, "addon.json")
  if (!existsSync(path)) return []
  const raw: unknown = JSON.parse(readFileSync(path, "utf-8"))
  return DeclaredSavedVars.parse(raw).savedVariables ?? []
}

export function logBundleMemberMigration(outcome: BundleMemberMigrationOutcome): undefined {
  if (outcome.kind === "migrated") {
    const aside = outcome.backedUp ? "; prior file copied aside" : ""
    console.log(
      `Migrated saved variables out of the bundle into ${outcome.member}.lua (${String(outcome.globals.length)} global(s), ${String(outcome.bytesWritten)} bytes${aside})`
    )
  }
  return undefined
}
