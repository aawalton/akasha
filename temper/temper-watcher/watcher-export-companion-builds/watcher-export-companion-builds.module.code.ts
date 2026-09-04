import { getPage } from "@akasha/pages-access/get"
import { collectPages } from "@akasha/pages-access/iterate"
import type { Page } from "@akasha/pages-core/page-types"
import { companions, getDefIdByCompanionId } from "@akasha/temper-companions-core/companions"
import type { CompanionsConfigFileInputs } from "../watcher-config-file/watcher-config-file.module.code.ts"
import {
  numericKeyedBlock,
  serializeCompanionsConfigFile,
} from "../watcher-config-file/watcher-config-file.module.code.ts"
import { log, logError } from "../watcher-logging/watcher-logging.module.code.ts"
import {
  detectIndent,
  replaceOrInsertLuaBlock,
} from "../watcher-settings-lua-block/watcher-settings-lua-block.module.code.ts"
import { writeSideFileIfChanged } from "../watcher-side-file/watcher-side-file.module.code.ts"
import {
  type SignedInReader,
  userIdFor,
} from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"

export const COMPANION_PROGRESS_PAGE_TYPE = "temper-companion-progress"

export const COMPANION_BUILD_PAGE_TYPE = "companion-build"

export const TARGET_BUILDS_KEY = "companionTargetBuilds"

export const TARGET_TIMESTAMPS_KEY = "companionTargetTimestamps"

export const COMPANION_SIBLING_KEYS = ["companions", "selectedCompanionId"] as const

const PROGRESS_PAGE_SIZE = 1000

const MILLIS_IN_A_SECOND = 1000

const TARGET_BUILDS_BLOCK = new RegExp(`\\["${TARGET_BUILDS_KEY}"\\]\\s*=\\s*\\{([^}]*)\\}`)

const NUMBERED_STRING_ENTRY = /\[(\d+)\]\s*=\s*"([^"]+)"/g

export function readTargetBuilds(content: string): Record<number, string> {
  const body = TARGET_BUILDS_BLOCK.exec(content)?.[1]
  if (body === undefined) return {}
  const found: Record<number, string> = {}
  for (const [, numKey, value] of body.matchAll(NUMBERED_STRING_ENTRY)) {
    if (numKey === undefined || value === undefined) continue
    found[Number(numKey)] = value
  }
  return found
}

export function sameTargetBuilds(
  existing: Readonly<Record<number, string>>,
  desired: Readonly<Record<number, string>>
): boolean {
  const desiredKeys = Object.keys(desired)
  if (Object.keys(existing).length !== desiredKeys.length) return false
  return desiredKeys.every((key) => existing[Number(key)] === desired[Number(key)])
}

export function withTargetBuilds(content: string, targets: CompanionsConfigFileInputs): string {
  const lines = content.split("\n")
  const indent = detectIndent(lines, TARGET_BUILDS_KEY, COMPANION_SIBLING_KEYS)
  const blocks = [
    [TARGET_BUILDS_KEY, targets.companionTargetBuilds],
    [TARGET_TIMESTAMPS_KEY, targets.companionTargetTimestamps],
  ] as const
  let written: readonly string[] = lines
  for (const [key, data] of blocks) {
    written = replaceOrInsertLuaBlock(
      written,
      key,
      numericKeyedBlock(key, data, indent),
      COMPANION_SIBLING_KEYS
    )
  }
  return written.join("\n")
}

function millisOf(updatedAt: unknown): number | null {
  if (typeof updatedAt === "number") return updatedAt
  if (typeof updatedAt !== "string") return null
  const parsed = Date.parse(updatedAt)
  return Number.isNaN(parsed) ? null : parsed
}

export function updatedAtSeconds(updatedAt: unknown, now: number): number {
  const millis = millisOf(updatedAt)
  return Math.floor((millis === null ? now : millis) / MILLIS_IN_A_SECOND)
}

export interface CompanionTarget {
  readonly defId: number
  readonly buildHash: string
  readonly seconds: number
}

export function targetsAsConfigInputs(
  targets: readonly CompanionTarget[]
): CompanionsConfigFileInputs {
  const companionTargetBuilds: Record<number, string> = {}
  const companionTargetTimestamps: Record<number, number> = {}
  for (const target of targets) {
    companionTargetBuilds[target.defId] = target.buildHash
    companionTargetTimestamps[target.defId] = target.seconds
  }
  return { companionTargetBuilds, companionTargetTimestamps }
}

export interface CompanionBuildsSurroundings {
  readonly progressPages: (userId: string) => Promise<readonly Page[]>
  readonly buildPage: (buildId: string) => Promise<Page | null>
  readonly writeSideFile: (path: string, desired: string) => string
  readonly now: () => number
  readonly note: (message: string) => undefined
  readonly noteError: (message: string) => undefined
}

export const WATCHER_SURROUNDINGS: CompanionBuildsSurroundings = {
  progressPages: (userId) =>
    collectPages({
      pageTypeSlug: COMPANION_PROGRESS_PAGE_TYPE,
      where: [{ key: "accountPage", eq: userId }],
      pageSize: PROGRESS_PAGE_SIZE,
    }),
  buildPage: (buildId) =>
    getPage({ pageTypeSlug: COMPANION_BUILD_PAGE_TYPE, where: [{ key: "id", eq: buildId }] }),
  writeSideFile: (path, desired) => writeSideFileIfChanged(path, desired),
  now: () => Date.now(),
  note: log,
  noteError: logError,
}

async function companionTargetOf(
  row: Page,
  surroundings: CompanionBuildsSurroundings
): Promise<CompanionTarget | null> {
  const companionId = row.companionId
  const targetBuildId = row.targetBuildId
  if (typeof companionId !== "string") return null
  if (typeof targetBuildId !== "string") return null

  const build = await surroundings.buildPage(targetBuildId)
  if (build === null) return null
  const buildHash = build.buildHash
  if (typeof buildHash !== "string") return null

  if (!companions.has(companionId)) {
    surroundings.noteError(
      `no companion is known by the id ${companionId}, so its target build is left out`
    )
    return null
  }
  const defId = getDefIdByCompanionId(companionId)
  if (defId === undefined) {
    surroundings.noteError(
      `the companion ${companionId} has no in-game id, so its target build is left out`
    )
    return null
  }

  return { defId, buildHash, seconds: updatedAtSeconds(build.updatedAt, surroundings.now()) }
}

export async function collectCompanionTargets(
  userId: string,
  surroundings: CompanionBuildsSurroundings = WATCHER_SURROUNDINGS
): Promise<readonly CompanionTarget[]> {
  const targets: CompanionTarget[] = []
  for (const row of await surroundings.progressPages(userId)) {
    const target = await companionTargetOf(row, surroundings)
    if (target !== null) targets.push(target)
  }
  return targets
}

export interface ExportCompanionBuildsResult {
  readonly content: string
  readonly modified: boolean
  readonly companionsConfigSideFileHash: string | null
}

export interface ExportCompanionBuildsOptions {
  readonly userId?: string
  readonly companionsConfigPath?: string
}

export async function runExportCompanionBuilds(
  content: string,
  supabase: SignedInReader,
  options: ExportCompanionBuildsOptions = {},
  surroundings: CompanionBuildsSurroundings = WATCHER_SURROUNDINGS
): Promise<ExportCompanionBuildsResult> {
  const userId = await userIdFor(supabase, options.userId, "export these companion builds")
  const targets = await collectCompanionTargets(userId, surroundings)
  const inputs = targetsAsConfigInputs(targets)

  const path = options.companionsConfigPath
  const companionsConfigSideFileHash =
    path == null ? null : surroundings.writeSideFile(path, serializeCompanionsConfigFile(inputs))

  const unchanged = { content, modified: false, companionsConfigSideFileHash }

  if (targets.length === 0) {
    surroundings.note("no companion target build is set, so none is exported")
    return unchanged
  }
  if (sameTargetBuilds(readTargetBuilds(content), inputs.companionTargetBuilds)) {
    surroundings.note("the saved-variables file already holds every companion target build")
    return unchanged
  }

  surroundings.note(`exporting ${targets.length} companion target build(s)`)
  for (const target of targets) {
    surroundings.note(`companion ${target.defId} takes build ${target.buildHash}`)
  }

  return {
    content: withTargetBuilds(content, inputs),
    modified: true,
    companionsConfigSideFileHash,
  }
}
