import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { landedMechanically } from "@akasha/command-system/asking"
import {
  type Outcome,
  type Run,
  whyRefused,
} from "../../akasha/command-system/gated-write/gated-write.module.code.ts"

const CLI = "akasha/command-system/cli/cli.module.code.ts"

const SCRATCH = "/var/tmp"

// The gate asks for a record of every page a body answers to, and names each one it wants read.
// The set is the page's type and everything that type extends, which changes as the type does, so
// it is taken from what the refusal names rather than listed here.
const WANTED = /--file-path\s+(\S+)/g

const ROUNDS = 4

export function runInAkasha(writer: string, root: string, args: readonly string[]): Run {
  const dir = mkdtempSync(join(SCRATCH, "akasha-landing-"))
  const outPath = join(dir, "out.txt")
  try {
    const sink = Bun.file(outPath)
    const proc = Bun.spawnSync([process.execPath, `${root}/${CLI}`, ...args], {
      stdout: sink,
      stderr: sink,
      env: { ...process.env, AGENT_ID: writer, ACTING_AGENT_ID: "" },
    })
    let output = ""
    try {
      output = readFileSync(outPath, "utf8")
    } catch {
      output = ""
    }
    return { code: proc.exitCode ?? 1, output }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

// A read whose output reaches nobody records nothing, and the door refuses one that is piped. The
// output here lands in a file the writer reads back, which the door takes, so the record stands.
function reading(writer: string, root: string, paths: readonly string[]): string | null {
  for (const path of paths) {
    const read = runInAkasha(writer, root, ["read", "--file-path", path])
    if (read.code !== 0) return whyRefused(read.output)
  }
  return null
}

function wantedIn(output: string): readonly string[] {
  const found = new Set<string>()
  for (const [, path] of output.matchAll(WANTED)) if (path !== undefined) found.add(path)
  return [...found]
}

export function landInAkasha(writer: string, root: string, args: readonly string[]): Outcome {
  let asked = runInAkasha(writer, root, args)
  for (let round = 0; round < ROUNDS && asked.code !== 0; round += 1) {
    const wanted = wantedIn(asked.output)
    if (wanted.length === 0) break
    const refused = reading(writer, root, wanted)
    if (refused !== null) return { kind: "refused", detail: refused }
    asked = runInAkasha(writer, root, args)
  }
  if (asked.code !== 0) return { kind: "refused", detail: whyRefused(asked.output) }
  return { kind: "written" }
}

// A program composes this body, so it lands without the checks and without owing a reading. The
// bytes go straight in: only the command line needed them written to a file first.
export function landMechanically(
  root: string,
  calledAs: string,
  relPath: string,
  body: string,
  message: string
): Outcome {
  const said = landedMechanically(
    root,
    calledAs,
    [{ path: relPath, body: new TextEncoder().encode(body) }],
    message
  )
  if (said.code === 0) return { kind: "written" }
  return { kind: "refused", detail: whyRefused(said.refusals.join("\n")) }
}
