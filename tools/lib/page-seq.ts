import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { exclusively } from "../../exclusive/exclusive.ts"
import { parseFrontmatter, textField } from "../../page/frontmatter.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"
import { toolArgv } from "./tool-argv.ts"

const SCRATCH_ROOT = "/var/tmp"

const NEXT_SEQ_KEY = "next-seq"

const ALLOCATING = ".seq"

export interface SeqSource {
  readonly pageTypeRelPath: string
  readonly noun: string
}

export function readNextSeqOf(source: SeqSource): number {
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
  const proc = Bun.spawnSync(
    ["git", "-C", rootFor(resolveRoots(), AKASHA), "status", "--porcelain", "--", relPath],
    { stdout: "pipe", stderr: "pipe" }
  )
  if ((proc.exitCode ?? 1) !== 0) return false
  return new TextDecoder().decode(proc.stdout ?? new Uint8Array()).trim() !== ""
}

function advance(source: SeqSource, seq: number): Advance {
  const root = rootFor(resolveRoots(), AKASHA)
  const scratch = mkdtempSync(join(SCRATCH_ROOT, "page-seq-"))
  const payloadPath = join(scratch, "advance.json")
  writeFileSync(
    payloadPath,
    JSON.stringify({
      file_path: join(root, source.pageTypeRelPath),
      old_string: `${NEXT_SEQ_KEY}: ${seq}`,
      new_string: `${NEXT_SEQ_KEY}: ${seq + 1}`,
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
          `${source.noun}: #${seq} is taken`,
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

export function takeSeqOf(source: SeqSource): number {
  const absolute = join(rootFor(resolveRoots(), AKASHA), source.pageTypeRelPath)
  return exclusively(`${absolute}${ALLOCATING}`, () => {
    const stoodChanged = uncommitted(source.pageTypeRelPath)
    const seq = readNextSeqOf(source)
    const run = advance(source, seq)
    if (run.code === 0) return seq
    if (!stoodChanged && uncommitted(source.pageTypeRelPath)) {
      throw new Error(
        `seq ${seq} is spent and nothing was created with it: the edit advancing \`${NEXT_SEQ_KEY}\` ` +
          `in ${source.pageTypeRelPath} reached disk and the commit that should have carried it did ` +
          "not, so that file stands changed and uncommitted. Land or undo the change before asking " +
          `again. What the attempt said:\n${run.output}`
      )
    }
    throw new Error(
      `no seq was taken: advancing \`${NEXT_SEQ_KEY}\` in ${source.pageTypeRelPath} was refused ` +
        `with the counter left where it stood, and nothing was created. Asking again reads the same ` +
        `number and meets the same refusal, so read what it said and fix that:\n${run.output}`
    )
  })
}
