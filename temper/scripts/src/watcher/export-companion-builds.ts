import { createHash } from "node:crypto"
import { readFileSync, writeFileSync } from "node:fs"
import { getPage } from "@akasha/pages-access/get"
import { collectPages } from "@akasha/pages-access/iterate"
import type { SupabaseServiceRoleClient } from "@akasha/supabase-server/service-role"
import { companions, getDefIdByCompanionId } from "@akasha/temper-companions-core/companions"
import { z } from "zod"
import { serializeCompanionsConfigFile } from "./export-companion-builds-config-file"
import { detectIndent, replaceOrInsertLuaBlock } from "./export-settings-lua"

const TEMPER_COMPANIONS_SIBLINGS = ["companions", "selectedCompanionId"] as const

const BLOCK_MATCH_SCHEMA = z.union([z.array(z.string()).min(2), z.null()])

function parseTargetBuildsBlockBody(content: string): string | null {
  const match = BLOCK_MATCH_SCHEMA.parse(
    content.match(/\["companionTargetBuilds"\]\s*=\s*\{([^}]*)\}/)
  )
  return match?.[1] ?? null
}

const ENTRY_MATCH_SCHEMA = z.union([z.tuple([z.string(), z.string(), z.string()]), z.null()])

function parseNextEntry(re: RegExp, body: string): { numKey: string; value: string } | null {
  const match = ENTRY_MATCH_SCHEMA.parse(re.exec(body))
  if (match === null) return null
  return { numKey: match[1], value: match[2] }
}

function serializeNumericKeyedBlock(
  key: string,
  data: Record<number, string | number>,
  indent: string
): readonly string[] {
  const innerIndent = indent + "    "
  const entries = Object.entries(data).sort(([a], [b]) => Number(a) - Number(b))

  if (entries.length === 0) {
    return [`${indent}["${key}"] =`, `${indent}{},`]
  }

  const lines: string[] = []
  lines.push(`${indent}["${key}"] =`)
  lines.push(`${indent}{`)
  for (const [numKey, value] of entries) {
    const luaValue = typeof value === "string" ? `"${value}"` : String(value)
    lines.push(`${innerIndent}[${numKey}] = ${luaValue},`)
  }
  lines.push(`${indent}},`)
  return lines
}

function parseExistingTargetBuilds(content: string): Record<number, string> {
  const result: Record<number, string> = {}
  const body = parseTargetBuildsBlockBody(content)
  if (body === null) return result

  const entryPattern = /\[(\d+)\]\s*=\s*"([^"]+)"/g
  let entry = parseNextEntry(entryPattern, body)
  while (entry !== null) {
    result[Number(entry.numKey)] = entry.value
    entry = parseNextEntry(entryPattern, body)
  }
  return result
}

function mapsMatch(existing: Record<number, string>, desired: Record<number, string>): boolean {
  const existingKeys = Object.keys(existing)
  const desiredKeys = Object.keys(desired)
  if (existingKeys.length !== desiredKeys.length) return false
  for (const key of desiredKeys) {
    if (existing[Number(key)] !== desired[Number(key)]) return false
  }
  return true
}

export interface ExportCompanionBuildsResult {
  content: string
  modified: boolean
  companionsConfigSideFileHash: string | null
}

export async function runExportCompanionBuilds(
  content: string,
  supabase: SupabaseServiceRoleClient,
  options: { userId?: string; companionsConfigPath?: string } = {}
): Promise<ExportCompanionBuildsResult> {
  const companionsConfigPath = options.companionsConfigPath

  let userId = options.userId
  if (userId == null) {
    const userResult = await supabase.auth.getUser()
    if (userResult.error || !userResult.data.user) {
      throw new Error(
        `runExportCompanionBuilds: not authenticated (${userResult.error?.message ?? "no user"})`
      )
    }
    userId = userResult.data.user.id
  }

  const companionRows = await collectPages({
    pageTypeSlug: "temper-companion-progress",
    where: [{ key: "accountPage", eq: userId }],
    pageSize: 1000,
  })

  const targetBuilds: Record<number, string> = {}
  const targetTimestamps: Record<number, number> = {}

  for (const row of companionRows) {
    const companionId = row.companionId
    if (typeof companionId !== "string") continue
    const targetBuildId = row.targetBuildId
    if (typeof targetBuildId !== "string") continue

    const build = await getPage({
      pageTypeSlug: "companion-build",
      where: [{ key: "id", eq: targetBuildId }],
    })
    if (!build) continue
    const buildHash = build.buildHash
    if (typeof buildHash !== "string") continue

    if (!companions.has(companionId)) {
      console.warn(`  Unknown companion ID ${companionId}, skipping`)
      continue
    }
    const defId = getDefIdByCompanionId(companionId)
    if (defId === undefined) {
      console.warn(`  Unknown companion ID ${companionId}, skipping`)
      continue
    }

    const updatedAtRaw = build.updatedAt
    const updatedAtMs =
      typeof updatedAtRaw === "string"
        ? Date.parse(updatedAtRaw)
        : typeof updatedAtRaw === "number"
          ? updatedAtRaw
          : Date.now()

    targetBuilds[defId] = buildHash
    targetTimestamps[defId] = Math.floor(updatedAtMs / 1000)
  }

  let companionsConfigSideFileHash: string | null = null
  if (companionsConfigPath != null) {
    const sideFileContent = serializeCompanionsConfigFile({
      companionTargetBuilds: targetBuilds,
      companionTargetTimestamps: targetTimestamps,
    })
    companionsConfigSideFileHash = writeSideFileIfChanged(companionsConfigPath, sideFileContent)
  }

  if (Object.keys(targetBuilds).length === 0) {
    console.log("No target companion builds to export.")
    return { content, modified: false, companionsConfigSideFileHash }
  }

  const existingBuilds = parseExistingTargetBuilds(content)
  if (mapsMatch(existingBuilds, targetBuilds)) {
    console.log("Target builds already up to date in Lua file.")
    return { content, modified: false, companionsConfigSideFileHash }
  }

  console.log(`Exporting ${Object.keys(targetBuilds).length} target build(s).\n`)

  let lines: readonly string[] = content.split("\n")
  const indent = detectIndent(lines, "companionTargetBuilds", TEMPER_COMPANIONS_SIBLINGS)

  const buildsBlock = serializeNumericKeyedBlock("companionTargetBuilds", targetBuilds, indent)
  const timestampsBlock = serializeNumericKeyedBlock(
    "companionTargetTimestamps",
    targetTimestamps,
    indent
  )

  lines = replaceOrInsertLuaBlock(
    lines,
    "companionTargetBuilds",
    buildsBlock,
    TEMPER_COMPANIONS_SIBLINGS
  )
  lines = replaceOrInsertLuaBlock(
    lines,
    "companionTargetTimestamps",
    timestampsBlock,
    TEMPER_COMPANIONS_SIBLINGS
  )

  const modifiedContent = lines.join("\n")

  for (const [defId, hash] of Object.entries(targetBuilds)) {
    console.log(`  Companion ${defId}: ${hash}`)
  }

  return { content: modifiedContent, modified: true, companionsConfigSideFileHash }
}

function writeSideFileIfChanged(path: string, desired: string): string {
  let current: string | null = null
  try {
    current = readFileSync(path, "utf-8")
  } catch {}
  if (current !== desired) {
    writeFileSync(path, desired)
  }
  return createHash("sha256").update(desired).digest("hex")
}
