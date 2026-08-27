import { existsSync, renameSync, unlinkSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { z } from "zod"
import { isSourceRuntime } from "./runtime"

export const SOURCE_UPDATE_EXIT_CODE = 75

export type CheckFailureReason = "unreachable" | "http-error" | "non-json" | "malformed-body"

export type UpdateCheck =
  | { readonly kind: "update-available"; readonly version: string }
  | { readonly kind: "up-to-date" }
  | { readonly kind: "check-failed"; readonly reason: CheckFailureReason; readonly detail: string }

const VersionResponseSchema = z.object({ version: z.string().trim().min(1) }).passthrough()

const BODY_SUMMARY_MAX = 200

function summarizeBody(status: number, contentType: string, body: string): string {
  const collapsed = body.replace(/\s+/g, " ").trim()
  const slice =
    collapsed.length > BODY_SUMMARY_MAX ? `${collapsed.slice(0, BODY_SUMMARY_MAX)}…` : collapsed
  return `HTTP ${status}, ${contentType === "" ? "no content-type" : contentType}: ${slice}`
}

function parseDeployedVersion(body: string): string | null {
  try {
    const parsed = VersionResponseSchema.safeParse(JSON.parse(body))
    return parsed.success ? parsed.data.version : null
  } catch {
    return null
  }
}

interface VersionResponseObservation {
  readonly ok: boolean
  readonly status: number
  readonly contentType: string
  readonly body: string
  readonly runningVersion: string
}

export function classifyVersionResponse(input: VersionResponseObservation): UpdateCheck {
  const failed = (reason: CheckFailureReason): UpdateCheck => ({
    kind: "check-failed",
    reason,
    detail: summarizeBody(input.status, input.contentType, input.body),
  })

  if (!input.ok) return failed("http-error")
  if (!input.contentType.includes("application/json")) return failed("non-json")

  const version = parseDeployedVersion(input.body)
  if (version === null) return failed("malformed-body")

  if (version === input.runningVersion) return { kind: "up-to-date" }
  return { kind: "update-available", version }
}

export async function checkForUpdate(
  serverUrl: string,
  runningVersion: string
): Promise<UpdateCheck> {
  try {
    const response = await fetch(`${serverUrl}/api/watcher/worker/version`)
    return classifyVersionResponse({
      ok: response.ok,
      status: response.status,
      contentType: response.headers.get("content-type") ?? "",
      body: await response.text(),
      runningVersion,
    })
  } catch (err) {
    return {
      kind: "check-failed",
      reason: "unreachable",
      detail: err instanceof Error ? err.message : String(err),
    }
  }
}

export async function performUpdate(serverUrl: string): Promise<void> {
  if (isSourceRuntime()) return

  const exeDir = dirname(process.execPath)
  const currentExe = process.execPath
  const newExe = join(exeDir, "temper-watcher-worker.new.exe")
  const oldExe = join(exeDir, "temper-watcher-worker.old.exe")

  const response = await fetch(`${serverUrl}/api/watcher/worker/download`)

  if (!response.ok) {
    throw new Error(`Download failed: HTTP ${response.status}`)
  }

  const buffer = await response.arrayBuffer()
  writeFileSync(newExe, Buffer.from(buffer))

  renameSync(currentExe, oldExe)
  renameSync(newExe, currentExe)

  process.exit(0)
}

export function cleanupOldExe(): undefined {
  if (isSourceRuntime()) return

  const exeDir = dirname(process.execPath)
  const oldExe = join(exeDir, "temper-watcher-worker.old.exe")

  if (existsSync(oldExe)) {
    try {
      unlinkSync(oldExe)
    } catch {}
  }
}

export type GitRelation = "equal" | "behind" | "ahead" | "diverged"

export function classifyGitRelation(input: {
  equal: boolean
  headIsAncestorOfTarget: boolean
  targetIsAncestorOfHead: boolean
}): GitRelation {
  if (input.equal) return "equal"
  if (input.headIsAncestorOfTarget) return "behind"
  if (input.targetIsAncestorOfHead) return "ahead"
  return "diverged"
}

function runGit(repoDir: string, args: readonly string[]): { ok: boolean; stdout: string } {
  const proc = Bun.spawnSync(["git", "-C", repoDir, ...args], { stdout: "pipe", stderr: "pipe" })
  return { ok: proc.exitCode === 0, stdout: proc.stdout.toString().trim() }
}

export function resolveSourceHeadSha(repoDir: string): string | null {
  const { ok, stdout } = runGit(repoDir, ["rev-parse", "HEAD"])
  return ok && stdout.length > 0 ? stdout : null
}

export interface SourceUpdateResult {
  advanced: boolean
  relation: GitRelation | "unknown"
  reason: string
}

export function performSourceUpdate(repoDir: string, targetSha: string): SourceUpdateResult {
  const head = resolveSourceHeadSha(repoDir)
  if (head === null) return { advanced: false, relation: "unknown", reason: "not-a-git-checkout" }
  if (head === targetSha) return { advanced: false, relation: "equal", reason: "up-to-date" }

  if (!runGit(repoDir, ["fetch", "origin", "--quiet"]).ok) {
    return { advanced: false, relation: "unknown", reason: "fetch-failed" }
  }
  if (!runGit(repoDir, ["cat-file", "-e", `${targetSha}^{commit}`]).ok) {
    return { advanced: false, relation: "unknown", reason: "target-not-fetched" }
  }

  const relation = classifyGitRelation({
    equal: false,
    headIsAncestorOfTarget: runGit(repoDir, ["merge-base", "--is-ancestor", head, targetSha]).ok,
    targetIsAncestorOfHead: runGit(repoDir, ["merge-base", "--is-ancestor", targetSha, head]).ok,
  })
  if (relation !== "behind") {
    return { advanced: false, relation, reason: `no-ff-${relation}` }
  }
  if (!runGit(repoDir, ["merge", "--ff-only", targetSha]).ok) {
    return { advanced: false, relation, reason: "ff-merge-failed" }
  }
  return { advanced: true, relation, reason: "advanced" }
}
