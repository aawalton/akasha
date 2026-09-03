import { spawnSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { landBodies } from "@akasha/command-system/gated-landing"
import { exclusively } from "@akasha/file-system/exclusive"
import { parseFrontmatter, textField } from "@akasha/markdown-pages/frontmatter"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"

const OUTPUT_CEILING = 64 * 1024 * 1024

const WRITER = "page-seq-writer"

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

// The counter is advanced by substituting one line, which is what the old `edit` tool was handed
// as an old_string and a new_string. The substitution is done here and the whole body lands
// mechanically: a program composes this body rather than authoring it, so it owes no read record,
// and the caller holds the seq lock across the landing either way.
function advance(source: SeqSource, first: number, count: number): Advance {
  const root = rootFor(resolveRoots(), AKASHA)
  const was = `${NEXT_SEQ_KEY}: ${first}`
  const now = `${NEXT_SEQ_KEY}: ${first + count}`
  let text: string
  try {
    text = readFileSync(join(root, source.pageTypeRelPath), "utf8")
  } catch (err) {
    return { code: 1, output: `${source.pageTypeRelPath} would not open: ${String(err)}` }
  }
  const parts = text.split(was)
  if (parts.length !== 2) {
    return {
      code: 1,
      output:
        `\`${was}\` stands ${parts.length - 1} time(s) in ${source.pageTypeRelPath}, and the ` +
        "counter is advanced only where it stands exactly once",
    }
  }
  const landed = landBodies(
    {
      repo: AKASHA,
      writer: WRITER,
      root,
      message: `${source.noun}: ${runOf(first, count)} ${count === 1 ? "is" : "are"} taken`,
    },
    [{ relPath: source.pageTypeRelPath, body: parts.join(now) }]
  )
  return landed.ok ? { code: 0, output: "" } : { code: 1, output: landed.why }
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
