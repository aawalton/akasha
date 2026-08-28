import { spawnSync } from "node:child_process"
import { accessSync, constants, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { exclusively } from "../../exclusive/exclusive.ts"
import { parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"
import { toolArgv } from "./tool-argv.ts"

const OUTPUT_CEILING = 64 * 1024 * 1024

function runner(): string {
  if (process.versions.bun !== undefined) return process.execPath
  for (const dir of (process.env["PATH"] ?? "").split(":")) {
    if (dir === "") continue
    const at = join(dir, "bun")
    try {
      accessSync(at, constants.X_OK)
      return at
    } catch {
      continue
    }
  }
  throw new Error("no `bun` is on PATH, and what this runs is TypeScript")
}

const SCRATCH_ROOT = "/var/tmp"

const NEXT_SEQ_KEY = "next-seq"

const ALLOCATING = ".seq"

export interface SeqSource {
  readonly pageTypeRelPath: string
  readonly noun: string
}

function readNextSeqOf(source: SeqSource): number {
  const absolute = join(rootFor(resolveRoots(), AKASHA), source.pageTypeRelPath)
  const stated = textField(parseFrontmatter(readFileSync(absolute, "utf8")), NEXT_SEQ_KEY)
  if (stated === null) {
    throw new Error(
      `${source.pageTypeRelPath} states no \`${NEXT_SEQ_KEY}\`, so there is no seq to take`
    )
  }
  const seq = Number(stated)
  if (!Number.isInteger(seq) || seq <= 0) {
    throw new Error(
      `${source.pageTypeRelPath} states \`${NEXT_SEQ_KEY}: ${stated}\`, ` +
        "which is not a whole number above zero"
    )
  }
  return seq
}

export function statesNextSeq(root: string, pageTypeRelPath: string): boolean {
  const absolute = join(root, pageTypeRelPath)
  if (!existsSync(absolute)) return false
  return textField(parseFrontmatter(readFileSync(absolute, "utf8")), NEXT_SEQ_KEY) !== null
}

interface Advance {
  readonly code: number
  readonly output: string
}

function uncommitted(relPath: string): boolean {
  const proc = spawnSync(
    "git",
    ["-C", rootFor(resolveRoots(), AKASHA), "status", "--porcelain", "--", relPath],
    { maxBuffer: OUTPUT_CEILING, stdio: ["ignore", "pipe", "pipe"] }
  )
  if (proc.status !== 0) return false
  return new TextDecoder().decode(proc.stdout ?? new Uint8Array()).trim() !== ""
}

function runOf(first: number, count: number): string {
  return count === 1 ? `#${first}` : `#${first} to #${first + count - 1}`
}

function advance(source: SeqSource, first: number, count: number): Advance {
  const root = rootFor(resolveRoots(), AKASHA)
  const scratch = mkdtempSync(join(SCRATCH_ROOT, "page-seq-"))
  const payloadPath = join(scratch, "advance.json")
  writeFileSync(
    payloadPath,
    JSON.stringify({
      file_path: join(root, source.pageTypeRelPath),
      old_string: `${NEXT_SEQ_KEY}: ${first}`,
      new_string: `${NEXT_SEQ_KEY}: ${first + count}`,
    })
  )
  const proc = spawnSync(
    runner(),
    [
      ...toolArgv(
        "edit.ts",
        [
          "--repo",
          "akasha",
          "--mechanical",
          "--input-file",
          payloadPath,
          "--message",
          `${source.noun}: ${runOf(first, count)} ${count === 1 ? "is" : "are"} taken`,
        ],
        root
      ),
    ],
    { cwd: root, maxBuffer: OUTPUT_CEILING, stdio: ["ignore", "pipe", "pipe"], env: { ...process.env } }
  )
  const decode = (raw: Uint8Array | null | undefined): string =>
    raw === null || raw === undefined ? "" : new TextDecoder().decode(raw)
  const run = {
    code: proc.status ?? 1,
    output: `${decode(proc.stdout)}${decode(proc.stderr)}`.trim(),
  }
  rmSync(scratch, { recursive: true, force: true })
  return run
}

export function takeSeqsOf(source: SeqSource, count: number): number {
  if (!Number.isInteger(count) || count <= 0) {
    throw new Error(
      `no ${source.noun} seq was taken: a run of ${count} is not a whole number above zero`
    )
  }
  const absolute = join(rootFor(resolveRoots(), AKASHA), source.pageTypeRelPath)
  return exclusively(`${absolute}${ALLOCATING}`, () => {
    const stoodChanged = uncommitted(source.pageTypeRelPath)
    const first = readNextSeqOf(source)
    const run = advance(source, first, count)
    if (run.code === 0) return first
    if (!stoodChanged && uncommitted(source.pageTypeRelPath)) {
      throw new Error(
        `nothing was created and ${count === 1 ? "seq" : "seqs"} ${runOf(first, count)} cannot be ` +
          `given back: the edit advancing \`${NEXT_SEQ_KEY}\` in ${source.pageTypeRelPath} ` +
          "reached disk and the commit that should have carried it did not, so that file stands " +
          "changed and uncommitted. Land or undo the change before asking again. What the attempt " +
          `said:\n${run.output}`
      )
    }
    throw new Error(
      `no ${source.noun} seq was taken: advancing \`${NEXT_SEQ_KEY}\` in ` +
        `${source.pageTypeRelPath} by ${count} was refused with the counter left where it stood, ` +
        "and nothing was created. Asking again reads the same number and meets the same refusal, " +
        `so read what it said and fix that:\n${run.output}`
    )
  })
}

export function takeSeqOf(source: SeqSource): number {
  return takeSeqsOf(source, 1)
}
