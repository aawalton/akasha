import { readFile } from "node:fs/promises"
import type { ErrorEntry } from "@akasha/temper-capture-errors/errors-payload"
import { addonsFile } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { z } from "zod"
import { inferCulpritAddon } from "../errors-crash-signatures/errors-crash-signatures.module.code.ts"
import {
  classifyTriage,
  type InferredCulprit,
  type Triage,
  type TriageReason,
} from "../errors-triage/errors-triage.module.code.ts"

const DEPLOYED_BUILD_ID_RE = /TemperBuildIds\[\s*"[^"]*"\s*\]\s*=\s*"([0-9a-f]{8}|unknown)"/
const DeployedBuildIdMatchSchema = z
  .tuple([z.string(), z.string().regex(/^(?:[0-9a-f]{8}|unknown)$/)])
  .rest(z.string())
  .nullable()

export async function readDeployedBuildId(
  folder: string,
  cache: Map<string, string | null>
): Promise<string | undefined> {
  const cached = cache.get(folder)
  if (cached !== undefined) return cached ?? undefined
  let result: string | null = null
  try {
    const content = await readFile(addonsFile(`${folder}/build-id.lua`), "utf8")
    const parsed = DeployedBuildIdMatchSchema.safeParse(content.match(DEPLOYED_BUILD_ID_RE))
    if (parsed.success && parsed.data !== null) {
      result = parsed.data[1]
    }
  } catch {
    result = null
  }
  cache.set(folder, result)
  return result ?? undefined
}

export interface GatheredTriage {
  readonly triage: Triage
  readonly reason: TriageReason
  readonly inferred?: InferredCulprit
}

export async function gatherTriage(
  entry: ErrorEntry,
  deployedFor: (folder: string) => Promise<string | undefined>
): Promise<GatheredTriage> {
  let deployedBuildId: string | undefined
  let inferred: InferredCulprit | undefined
  if (entry.attributedAddon !== undefined) {
    deployedBuildId = await deployedFor(entry.attributedAddon)
  } else {
    const culprit = inferCulpritAddon(entry.message, entry.traceback)
    if (culprit !== undefined) {
      inferred = {
        addon: culprit,
        loadedBuildId: entry.buildIds?.[culprit],
        deployedBuildId: await deployedFor(culprit),
      }
    }
  }
  const { triage, reason } = classifyTriage({
    attributedAddon: entry.attributedAddon,
    loadedBuildId: entry.attributedBuildId,
    deployedBuildId,
    inferredCulprit: inferred,
  })
  return { triage, reason, inferred }
}
