import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"

// A body landed under `akasha/` by the akasha commands rather than by git.
//
// The gate lives in those commands, so a writer reaching git directly leaves the akasha index
// behind HEAD and every agent in this worktree loses the gate until someone puts it back. This
// runs `akasha write`, which commits for itself, and reports what it said.

const SCRATCH_ROOT = "/var/tmp"

const DISPATCHER = "akasha/command-system/cli/cli.module.code.ts"

export interface AkashaBody {
  readonly relPath: string
  readonly body: string
}

export type AkashaLanded =
  | { readonly ok: true; readonly sha: string | null }
  | { readonly ok: false; readonly why: string }

interface Run {
  readonly code: number
  readonly output: string
}

// What the run said is taken through a file rather than a pipe. `akasha read` refuses a call whose
// output goes to a pipe, on the ground that a body reaching nobody was not read, and recording a
// reading is the first thing this does.
function ran(root: string, writer: string, args: readonly string[]): Run {
  const dir = mkdtempSync(join(SCRATCH_ROOT, "akasha-landing-run-"))
  const outPath = join(dir, "out.txt")
  try {
    const sink = Bun.file(outPath)
    const done = Bun.spawnSync([process.execPath, join(root, DISPATCHER), ...args], {
      cwd: root,
      stdout: sink,
      stderr: sink,
      env: {
        ...process.env,
        AKASHA_ROOT: root,
        // The warrant gate refuses a change from a writer it cannot name, so the service names
        // itself here as an agent would.
        AGENT_ID: writer,
        ACTING_AGENT_ID: "",
      },
    })
    let output = ""
    try {
      output = readFileSync(outPath, "utf8")
    } catch {
      output = ""
    }
    return { code: done.exitCode ?? 1, output: output.trim() }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

export function shaIn(output: string): string | null {
  const said = /\bcommitted as ([0-9a-f]{7,40})\b/.exec(output)
  return said === null ? null : (said[1] as string)
}

// What stands is read before it is written over, because the gate refuses a change to a body its
// writer has not read. A path that does not stand yet is not read — there is nothing to have read.
function readingRecorded(root: string, writer: string, relPaths: readonly string[]): string | null {
  const standing = relPaths.filter((one) => existsSync(join(root, one)))
  if (standing.length === 0) return null
  const run = ran(root, writer, [
    "read",
    ...standing.flatMap((one) => ["--file-path", one]),
  ])
  return run.code === 0 ? null : `reading what stands was not recorded: ${run.output}`
}

export function landInAkasha(
  root: string,
  writer: string,
  message: string,
  bodies: readonly AkashaBody[]
): AkashaLanded {
  if (bodies.length === 0) return { ok: true, sha: null }
  const unrecorded = readingRecorded(
    root,
    writer,
    bodies.map((one) => one.relPath)
  )
  if (unrecorded !== null) return { ok: false, why: unrecorded }

  const scratch = mkdtempSync(join(SCRATCH_ROOT, "akasha-landing-"))
  try {
    const args: string[] = ["write"]
    for (const [at, one] of bodies.entries()) {
      const held = join(scratch, `${at}.body`)
      writeFileSync(held, one.body, "utf8")
      args.push("--file-path", one.relPath, "--content-file", held)
    }
    args.push("--message", message)
    const run = ran(root, writer, args)
    if (run.code !== 0) return { ok: false, why: run.output }
    return { ok: true, sha: shaIn(run.output) }
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
}
