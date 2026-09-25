import { existsSync, renameSync, unlinkSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { isSourceRuntime } from "akasha/temper/watcher/modules/watcher-runtime/watcher-runtime.module.code.ts"
import { z } from "zod"

const BODY_SUMMARY_MAX = 200

const WORKER_EXE_STEM = "temper-watcher-worker"

type CheckFailureReason = "unreachable" | "http-error" | "non-json" | "malformed-body"

type UpdateCheck =
  | { readonly kind: "update-available"; readonly version: string }
  | { readonly kind: "up-to-date" }
  | { readonly kind: "check-failed"; readonly reason: CheckFailureReason; readonly detail: string }

const VersionBody = z.object({ version: z.string().trim().min(1) }).passthrough()

function summarizeBody(status: number, contentType: string, body: string): string {
  const collapsed = body.replace(/\s+/g, " ").trim()
  const shortened =
    collapsed.length > BODY_SUMMARY_MAX ? `${collapsed.slice(0, BODY_SUMMARY_MAX)}…` : collapsed
  return `HTTP ${String(status)}, ${contentType === "" ? "no content-type" : contentType}: ${shortened}`
}

function parseDeployedVersion(body: string): string | null {
  try {
    const parsed = VersionBody.safeParse(JSON.parse(body))
    return parsed.success ? parsed.data.version : null
  } catch {
    return null
  }
}

export interface VersionResponseObservation {
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

function versionUrl(serverUrl: string): string {
  return `${serverUrl}/api/watcher/worker/version`
}

function downloadUrl(serverUrl: string): string {
  return `${serverUrl}/api/watcher/worker/download`
}

interface FetchedText {
  readonly ok: boolean
  readonly status: number
  readonly contentType: string
  readonly body: string
}

interface FetchedBytes {
  readonly ok: boolean
  readonly status: number
  readonly body: Uint8Array
}

export type FetchingText = (url: string) => Promise<FetchedText>

export type FetchingBytes = (url: string) => Promise<FetchedBytes>

const textOverHttp: FetchingText = async (url) => {
  const response = await fetch(url)
  return {
    ok: response.ok,
    status: response.status,
    contentType: response.headers.get("content-type") ?? "",
    body: await response.text(),
  }
}

const bytesOverHttp: FetchingBytes = async (url) => {
  const response = await fetch(url)
  return {
    ok: response.ok,
    status: response.status,
    body: new Uint8Array(await response.arrayBuffer()),
  }
}

interface VersionCheckDeps {
  readonly fetchText?: FetchingText
}

export async function checkForUpdate(
  serverUrl: string,
  runningVersion: string,
  deps: VersionCheckDeps = {}
): Promise<UpdateCheck> {
  const fetchText = deps.fetchText ?? textOverHttp
  try {
    const answered = await fetchText(versionUrl(serverUrl))
    return classifyVersionResponse({
      ok: answered.ok,
      status: answered.status,
      contentType: answered.contentType,
      body: answered.body,
      runningVersion,
    })
  } catch (thrown) {
    return {
      kind: "check-failed",
      reason: "unreachable",
      detail: thrown instanceof Error ? thrown.message : String(thrown),
    }
  }
}

interface ExeSwapPaths {
  readonly current: string
  readonly next: string
  readonly previous: string
}

export function exeSwapPaths(execPath: string): ExeSwapPaths {
  const exeDir = dirname(execPath)
  return {
    current: execPath,
    next: join(exeDir, `${WORKER_EXE_STEM}.new.exe`),
    previous: join(exeDir, `${WORKER_EXE_STEM}.old.exe`),
  }
}

function writeFileAt(path: string, body: Uint8Array): undefined {
  writeFileSync(path, body)
  return undefined
}

function renameFile(from: string, to: string): undefined {
  renameSync(from, to)
  return undefined
}

function removeFile(path: string): undefined {
  unlinkSync(path)
  return undefined
}

function exitProcess(code: number): undefined {
  process.exit(code)
}

interface ExeUpdateDeps {
  readonly sourceRuntime?: () => boolean
  readonly execPath?: string
  readonly fetchBytes?: FetchingBytes
  readonly writeFile?: (path: string, body: Uint8Array) => undefined
  readonly rename?: (from: string, to: string) => undefined
  readonly exit?: (code: number) => undefined
}

export async function performUpdate(
  serverUrl: string,
  deps: ExeUpdateDeps = {}
): Promise<undefined> {
  const sourceRuntime = deps.sourceRuntime ?? isSourceRuntime
  if (sourceRuntime()) return undefined

  const paths = exeSwapPaths(deps.execPath ?? process.execPath)
  const fetchBytes = deps.fetchBytes ?? bytesOverHttp
  const answered = await fetchBytes(downloadUrl(serverUrl))

  if (!answered.ok) {
    throw new Error(`Download failed: HTTP ${String(answered.status)}`)
  }

  const writeFile = deps.writeFile ?? writeFileAt
  const rename = deps.rename ?? renameFile
  const exit = deps.exit ?? exitProcess

  writeFile(paths.next, answered.body)
  rename(paths.current, paths.previous)
  rename(paths.next, paths.current)
  exit(0)
  return undefined
}

interface ExeCleanupDeps {
  readonly sourceRuntime?: () => boolean
  readonly execPath?: string
  readonly present?: (path: string) => boolean
  readonly remove?: (path: string) => undefined
}

export function cleanupOldExe(deps: ExeCleanupDeps = {}): undefined {
  const sourceRuntime = deps.sourceRuntime ?? isSourceRuntime
  if (sourceRuntime()) return undefined

  const present = deps.present ?? existsSync
  const remove = deps.remove ?? removeFile
  const { previous } = exeSwapPaths(deps.execPath ?? process.execPath)

  if (!present(previous)) return undefined
  try {
    remove(previous)
  } catch {
    return undefined
  }
  return undefined
}

interface HeadReading {
  readonly headSha?: (repoDir: string) => string | null
}

function headShaAt(repoDir: string): string | null {
  const answered = ran(["git", "-C", repoDir, "rev-parse", "HEAD"])
  const sha = answered.out.trim()
  return answered.code === 0 && sha.length > 0 ? sha : null
}

export function resolveSourceHeadSha(repoDir: string, deps: HeadReading = {}): string | null {
  return (deps.headSha ?? headShaAt)(repoDir)
}
