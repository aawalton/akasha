/**
 * The call that carries the day pages into akasha.
 *
 * Nothing writes under `akasha/` but akasha's own verbs, and `akasha write` takes many
 * `--file-path`/`--content-file` pairs and lands them as one commit — which is the whole landing's
 * shape in one call: gated together, landed or refused together. So a destination inside `akasha/`
 * is written by composing that call rather than by touching the disk, and taking it back is the same
 * verb with `--remove`.
 *
 * The argv is built here, apart from anything that runs it, so what would be run can be read and
 * dry-run without a landing happening.
 *
 * There is no call here that takes the pages back. `akasha write --remove` is the same gated verb as
 * `akasha write`, so an undo built on it can be refused for a reading the caller owes — which is what
 * happened, mid-undo, leaving the day pages standing and the landing printing `STUCK`. The landing
 * now does the ungated half first and this gated half last, and its undo restores plain files rather
 * than asking this verb for anything.
 */

import { join, relative, resolve } from "node:path"

export type Carry = {
  readonly command: string
  readonly args: readonly string[]
}

/** Whether a destination is akasha's, and so is written by akasha's verb rather than by a file write. */
export function isAkashaPath(akashaDir: string, at: string): boolean {
  const said = resolve(at)
  return said === resolve(akashaDir) || said.startsWith(`${resolve(akashaDir)}/`)
}

/**
 * `akasha write` landing every named file, each body read from the staged tree.
 *
 * Paths are stated against the repository root, which is what the verb reads them against.
 */
export function carryIn(
  repoRoot: string,
  into: string,
  staged: string,
  names: readonly string[],
  message: string
): Carry {
  const args: string[] = []
  for (const name of names) {
    args.push("--file-path", relative(repoRoot, join(into, name)))
    args.push("--content-file", join(staged, name))
  }
  args.push("--message", message)
  return { command: "akasha", args }
}
