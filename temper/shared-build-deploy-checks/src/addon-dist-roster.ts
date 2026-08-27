import { readdirSync, readFileSync, statSync } from "node:fs"
import { basename, join } from "node:path"
import { optionalEnv } from "../../../shared/utils-narrow/src/require-env"
import { listAllAddons } from "@temper/shared-build-deploy-addons-resolve"
import { z } from "zod"

export const BUILD_ID_FILE = "build-id.lua"

export const UNKNOWN_BUILD_ID = "unknown"

export function toBuildId(rawSha: string): string {
  const hex = rawSha.toLowerCase().replace(/[^0-9a-f]/g, "")
  return hex.length >= 8 ? hex.slice(0, 8) : UNKNOWN_BUILD_ID
}

export function resolveHeadBuildId(cwd: string): string | null {
  const fromEnv = optionalEnv("CI_COMMIT_SHA")
  if (fromEnv !== undefined) {
    const id = toBuildId(fromEnv)
    return id === UNKNOWN_BUILD_ID ? null : id
  }
  try {
    const proc = Bun.spawnSync(["git", "rev-parse", "HEAD"], { cwd, stderr: "ignore" })
    if (proc.exitCode !== 0) return null
    const id = toBuildId(proc.stdout.toString().trim())
    return id === UNKNOWN_BUILD_ID ? null : id
  } catch {
    return null
  }
}

const BUILD_ID_STAMP_RE = /TemperBuildIds\[\s*"([^"]+)"\s*\]\s*=\s*"([^"]*)"/

const BUILD_ID_STAMP_MATCH_SCHEMA = z.tuple([z.string(), z.string().min(1), z.string()])

export function parseBuildIdStamp(text: string): { addon: string; buildId: string } | null {
  const stamp = BUILD_ID_STAMP_MATCH_SCHEMA.safeParse(BUILD_ID_STAMP_RE.exec(text))
  if (!stamp.success) return null
  const [, addon, buildId] = stamp.data
  return { addon, buildId }
}

export function readDistBuildIdStamps(distRoot: string): ReadonlyMap<string, string> {
  const out = new Map<string, string>()
  let entries: readonly string[]
  try {
    entries = readdirSync(distRoot)
  } catch {
    return out
  }
  for (const entry of entries) {
    const stampPath = join(distRoot, entry, BUILD_ID_FILE)
    try {
      if (!statSync(stampPath).isFile()) continue
      const parsed = parseBuildIdStamp(readFileSync(stampPath, "utf8"))
      if (parsed !== null) out.set(parsed.addon, parsed.buildId)
    } catch {}
  }
  return out
}

const TSTL_LUA_BUNDLE_SCHEMA = z.object({ tstl: z.object({ luaBundle: z.string().min(1) }) })
const ADDITIONAL_LUA_FILES_SCHEMA = z.object({ additionalLuaFiles: z.array(z.unknown()) })

function readJsonFile<T extends z.ZodType>(path: string, schema: T): z.infer<T> | null {
  try {
    const parsed = schema.safeParse(JSON.parse(readFileSync(path, "utf8")))
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

function readTstlLuaBundle(path: string): string | null {
  return readJsonFile(path, TSTL_LUA_BUNDLE_SCHEMA)?.tstl.luaBundle ?? null
}

function readAdditionalLuaFiles(path: string): readonly string[] {
  const declared = readJsonFile(path, ADDITIONAL_LUA_FILES_SCHEMA)?.additionalLuaFiles ?? []
  return declared.filter((v): v is string => typeof v === "string")
}

export function listEmittableLuaBasenames(repoRoot: string): ReadonlySet<string> {
  const out = new Set<string>([BUILD_ID_FILE])
  for (const addon of listAllAddons({ repoRoot })) {
    out.add(`${addon.canonicalName}.lua`)
    const tstlBundle = readTstlLuaBundle(join(addon.dir, "tsconfig.json"))
    if (tstlBundle !== null) out.add(basename(tstlBundle))
    for (const extra of readAdditionalLuaFiles(join(addon.dir, "addon.json"))) {
      out.add(basename(extra))
    }
  }
  return out
}

export function listRosterAddonNames(repoRoot: string): ReadonlySet<string> {
  return new Set(listAllAddons({ repoRoot }).map((a) => a.canonicalName))
}

export interface DistTreeCurrency {
  readonly unstamped: readonly string[]
  readonly foreign: readonly string[]
  readonly buildIds: readonly string[]
  readonly headBuildId: string | null
}

export function assessDistTreeCurrency(
  stamps: ReadonlyMap<string, string>,
  rosterNames: ReadonlySet<string>,
  headBuildId: string | null
): DistTreeCurrency {
  return {
    unstamped: [...rosterNames].filter((n) => !stamps.has(n)).sort(),
    foreign: [...stamps.keys()].filter((n) => !rosterNames.has(n)).sort(),
    buildIds: [...new Set(stamps.values())].sort(),
    headBuildId,
  }
}

export function describeDistTreeFaults(currency: DistTreeCurrency): readonly string[] {
  const faults: string[] = []
  if (currency.unstamped.length > 0) {
    faults.push(
      `${currency.unstamped.length} roster addon(s) carry no ${BUILD_ID_FILE} in the tree, so this build emitted nothing for them: ${currency.unstamped.join(", ")}`
    )
  }
  if (currency.foreign.length > 0) {
    faults.push(
      `${currency.foreign.length} stamped bundle(s) name an addon the roster does not carry, so the tree holds output that outlasted its addon: ${currency.foreign.join(", ")}`
    )
  }
  if (currency.buildIds.length > 1) {
    faults.push(
      `the tree carries ${currency.buildIds.length} different build ids (${currency.buildIds.join(", ")}), so it is a patchwork of separate builds rather than one full build`
    )
  }
  if (currency.buildIds.includes(UNKNOWN_BUILD_ID)) {
    faults.push(
      `at least one bundle is stamped \`${UNKNOWN_BUILD_ID}\`, so the source it was built from cannot be named`
    )
  }
  if (currency.headBuildId === null) {
    faults.push(
      "the build id of the source in hand could not be resolved, so no stamp can be held against it"
    )
  } else if (currency.buildIds.length === 1 && currency.buildIds[0] !== currency.headBuildId) {
    faults.push(
      `the tree was built at ${currency.buildIds[0]} and the source in hand is ${currency.headBuildId}, so every bundle predates it`
    )
  }
  return faults
}
