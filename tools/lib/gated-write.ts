import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { dirname, join } from "node:path"
import { toolArgv } from "./tool-argv.ts"

const SCRATCH = "/var/tmp"

const TOOLS_ROOT = dirname(dirname(import.meta.dir))

const FAILED = /^\s*\[[a-z-]+\]\s+fail\b/

export interface Run {
  readonly code: number
  readonly output: string
}

export type Outcome =
  | { readonly kind: "unstated" }
  | { readonly kind: "unchanged" }
  | { readonly kind: "written" }
  | { readonly kind: "removed" }
  | { readonly kind: "refused"; readonly detail: string }

export function whyRefused(report: string): string {
  const failed = report.split("\n").filter((line) => FAILED.test(line))
  return (failed.length === 0 ? report.trim() : failed.join("; ")).trim()
}

export function writerFor(writer: string): (tool: string, args: readonly string[]) => Run {
  return (tool, args) => {
    const dir = mkdtempSync(join(SCRATCH, "page-write-"))
    const outPath = join(dir, "out.txt")
    try {
      const sink = Bun.file(outPath)
      const proc = Bun.spawnSync([process.execPath, ...toolArgv(tool, args, TOOLS_ROOT)], {
        stdout: sink,
        stderr: sink,
        // THE AGENT SLOT CARRIES A WRITE-PATH NAME, MEANT NOT TO RESOLVE. `writer` names code
        // rather than an agent, so `agentPageFor` finds no page for it and this child cannot pass
        // `read-before-write` at all; these calls land because they are mechanical, which drops the
        // checks `needsAuthor` marks. A real agent here resolves, and the seat's read record then
        // absorbs pages a program composed, which is a gate's input rather than a label on it.
        //
        // CLEARING `ACTING_AGENT_ID` GUARDS THE CASE WHERE `AGENT_ID` HOLDS AN AGENT. Every reader
        // tests `acting.startsWith(seat + "--")`, which no delegate id satisfies against a
        // write-path name, so the clear is redundant only while the line beside it stands.
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
}
