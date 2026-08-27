import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { pageTypePathIn } from "../../../page/page-types.ts"
import { readNextSeqOf, type SeqSource } from "../page-seq.ts"
import { resolveRoots } from "../../../repo/roots/roots"
import { toolArgv } from "../tool-argv.ts"

const pageTypeAt = (slug: string): string => pageTypePathIn(resolveRoots().akasha, slug)

const SCRATCH_ROOT = "/var/tmp"

const NEXT_SEQ_KEY = "next-seq"

const ATTEMPTS = 3

export const PIPELINE_SEQS: SeqSource = {
  pageTypeRelPath: pageTypeAt("pipeline"),
  noun: "pipeline",
}

export const WORKFLOW_SEQS: SeqSource = {
  pageTypeRelPath: pageTypeAt("workflow"),
  noun: "workflow",
}

export const STEP_SEQS: SeqSource = { pageTypeRelPath: pageTypeAt("step"), noun: "step" }

interface Advance {
  readonly code: number
  readonly output: string
}

function advance(source: SeqSource, first: number, count: number): Advance {
  const root = resolveRoots().akasha
  const scratch = mkdtempSync(join(SCRATCH_ROOT, "main-pipeline-creator-seqs-"))
  const payloadPath = join(scratch, "advance.json")
  writeFileSync(
    payloadPath,
    JSON.stringify({
      file_path: join(root, source.pageTypeRelPath),
      old_string: `${NEXT_SEQ_KEY}: ${first}`,
      new_string: `${NEXT_SEQ_KEY}: ${first + count}`,
    })
  )
  const proc = Bun.spawnSync(
    [
      process.execPath,
      ...toolArgv(
        "edit.ts",
        [
          "--repo",
          "akasha",
          "--mechanical",
          "--input-file",
          payloadPath,
          "--message",
          `${source.noun}: #${first} to #${first + count - 1} are taken`,
        ],
        root
      ),
    ],
    { cwd: root, stdout: "pipe", stderr: "pipe", env: { ...process.env } }
  )
  const decode = (raw: Uint8Array | null): string =>
    raw === null ? "" : new TextDecoder().decode(raw)
  const run = {
    code: proc.exitCode ?? 1,
    output: `${decode(proc.stdout)}${decode(proc.stderr)}`.trim(),
  }
  rmSync(scratch, { recursive: true, force: true })
  return run
}

export function takeSeqBlock(source: SeqSource, count: number): number {
  if (!Number.isInteger(count) || count <= 0) {
    throw new Error(
      `no ${source.noun} seq was taken: a block of ${count} is not a whole number above zero`
    )
  }
  let last = ""
  for (let attempt = 0; attempt < ATTEMPTS; attempt += 1) {
    const first = readNextSeqOf(source)
    const run = advance(source, first, count)
    if (run.code === 0) return first
    last = run.output
  }
  throw new Error(
    `no ${source.noun} seq was taken: ${ATTEMPTS} attempts to advance \`${NEXT_SEQ_KEY}\` in ` +
      `${source.pageTypeRelPath} by ${count} were each refused, and nothing was created. ` +
      `The last refusal said:\n${last}`
  )
}
