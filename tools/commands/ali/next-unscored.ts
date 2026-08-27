export const summary = "Hand back one never-opened leaf (status == unopened) for the audit sweep — the disjoint complement of the rotation queue; deterministic first or --random, branch-scopable via --under"

import { randomInt } from "node:crypto"
import type { CommandHelp } from "../../ops/surface.ts"
import { flattenLeaves } from "../../lib/book-of-everything-coverage-status.ts"
import {
  filterByStatus,
  type Rng,
  selectWithoutReplacement,
} from "../../lib/book-of-everything-random-leaf-select.ts"
import { readStatusTree, resolveBookDir } from "../../lib/book-of-everything-status-tree.ts"
import { inputError, isInputError, isOperationalError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--random",
      description:
        "Draw a uniformly-random unopened leaf (real OS entropy) instead of the deterministic first",
    },
    {
      name: "--under",
      argLabel: "<branch>",
      valueShape: "token",
      description:
        "Scope to a book-root-relative subtree (e.g. 04-human-life). Default: the whole book",
    },
    {
      name: "--json",
      description:
        "Emit the leaf as single-line JSON ({path,label,status}) instead of the TSV line",
    },
  ],
  exits: [
    { code: 0, meaning: "an unopened leaf was found and printed" },
    { code: 1, meaning: "input error — --under is not a node directory" },
    {
      code: 3,
      meaning: "operational error — no unopened leaf in scope, or the tree failed to read",
    },
  ],
  examples: [
    "ops ali next-unscored",
    "ops ali next-unscored --random",
    "ops ali next-unscored --under 04-human-life",
    "ops ali next-unscored --random --under 04-human-life --json",
  ],
}

export default async function aliNextUnscored(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const random = parsed.boolean("--random")
  const under = parsed.string("--under")
  const json = parsed.boolean("--json")

  let chosen: { path: string; label: string; status: string }
  let start: string | undefined
  if (under !== undefined) {
    const resolved = resolveBookDir(under)
    if (resolved === undefined) {
      throw inputError(`--under "${under}" is not a node directory (no profile.md)`)
    }
    start = resolved
  }

  try {
    const leaves = flattenLeaves(readStatusTree(start))
    const unopened = filterByStatus(leaves, "unopened")
    if (unopened.length === 0) {
      const scope = under ?? "the whole book"
      throw operationalError(
        `no unopened leaves under ${scope} (${leaves.length} leaf node(s) in scope)`
      )
    }
    const rng: Rng = (bound) => randomInt(bound)
    const picked = random ? selectWithoutReplacement(unopened, 1, rng)[0] : unopened[0]
    if (picked === undefined) throw operationalError("internal: no leaf selected")
    chosen = { path: picked.path, label: picked.label, status: picked.status }
  } catch (e) {
    if ((isInputError(e)) || (isOperationalError(e))) throw e
    throw operationalError(e instanceof Error ? e.message : String(e))
  }

  process.stdout.write(
    json ? `${JSON.stringify(chosen)}\n` : `${chosen.path}\t${chosen.label}\t${chosen.status}\n`
  )
}
