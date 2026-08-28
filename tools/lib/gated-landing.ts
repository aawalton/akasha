import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { resolveRoots, rootEnvName, rootFor } from "../../repo/roots/roots.ts"
import { toolArgv } from "./tool-argv.ts"

const SCRATCH_ROOT = "/var/tmp"

export type GatedRepo = "akasha"

export interface GatedBody {
  readonly relPath: string
  readonly body: string
}

export interface GatedAct {
  readonly repo: GatedRepo
  readonly writer: string
  readonly message: string
  readonly root?: string
}

export type Landed =
  | { readonly ok: true; readonly sha: string | null; readonly unpushed: string | null }
  | { readonly ok: false; readonly why: string }

interface Run {
  readonly code: number
  readonly output: string
}

function rootOf(act: GatedAct): string {
  return act.root ?? rootFor(resolveRoots(), act.repo)
}

const TOOLS_ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..", "..")

function runTool(act: GatedAct, tool: string, args: readonly string[]): Run {
  const env: Record<string, string | undefined> = {
    ...process.env,
    AGENT_ID: act.writer,
    ACTING_AGENT_ID: "",
  }
  if (act.root !== undefined) env[rootEnvName(act.repo)] = act.root
  const dir = mkdtempSync(join(SCRATCH_ROOT, "gated-landing-run-"))
  const outPath = join(dir, "out.txt")
  try {
    const sink = Bun.file(outPath)
    const proc = Bun.spawnSync([process.execPath, ...toolArgv(tool, args, TOOLS_ROOT)], {
      cwd: rootOf(act),
      stdout: sink,
      stderr: sink,
      env,
    })
    let output = ""
    try {
      output = readFileSync(outPath, "utf8")
    } catch {
      output = ""
    }
    return { code: proc.exitCode ?? 1, output: output.trim() }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

const COMMITTED = /^commit: /m

export function shaIn(output: string): string | null {
  const said = /^commit:\s+([0-9a-f]{7,40})\s*$/m.exec(output)
  return said === null ? null : (said[1] as string)
}

function outcomeOf(run: Run): Landed {
  if (run.code === 0) return { ok: true, sha: shaIn(run.output), unpushed: null }
  if (run.code === 3 && COMMITTED.test(run.output)) {
    return { ok: true, sha: shaIn(run.output), unpushed: run.output }
  }
  return { ok: false, why: run.output }
}

export function recordReading(act: GatedAct, relPaths: readonly string[]): string | null {
  if (relPaths.length === 0) return null
  const root = rootOf(act)
  const run = runTool(
    act,
    "read.ts",
    relPaths.flatMap((relPath) => ["--file-path", join(root, relPath)])
  )
  return run.code === 0 ? null : `reading what stands was not recorded: ${run.output}`
}

export function landBodies(
  act: GatedAct,
  bodies: readonly GatedBody[],
  removing: readonly string[] = []
): Landed {
  if (bodies.length === 0 && removing.length === 0) return { ok: true, sha: null, unpushed: null }
  const root = act.root
  const standing = [...bodies.map((one) => one.relPath), ...removing].filter((relPath) =>
    root === undefined ? true : existsSync(join(root, relPath))
  )
  const unrecorded = recordReading(act, standing)
  if (unrecorded !== null) return { ok: false, why: unrecorded }

  const scratch = mkdtempSync(join(SCRATCH_ROOT, "gated-landing-"))
  try {
    const input = join(scratch, "write.json")
    const at = rootOf(act)
    writeFileSync(
      input,
      JSON.stringify(bodies.map((one) => ({ file_path: join(at, one.relPath), content: one.body }))),
      "utf8"
    )
    return outcomeOf(
      runTool(act, "write.ts", [
        "--repo",
        act.repo,
        "--mechanical",
        "--input-file",
        input,
        ...removing.flatMap((relPath) => ["--remove", join(at, relPath)]),
        "--message",
        act.message,
      ])
    )
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
}

export function landRemovals(act: GatedAct, relPaths: readonly string[]): Landed {
  if (relPaths.length === 0) return { ok: true, sha: null, unpushed: null }
  const at = rootOf(act)
  return outcomeOf(
    runTool(act, "rm.ts", [
      ...relPaths.map((relPath) => join(at, relPath)),
      "--repo",
      act.repo,
      "--message",
      act.message,
    ])
  )
}
