export const summary = "Draw uniformly-random leaf node(s) from the Book of Everything using real OS entropy — filtered by status, scopable to a part or subtree, drawn without replacement"

import { randomInt } from "node:crypto"
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join, relative } from "node:path"
import type { CommandHelp } from "../../ops/surface.ts"
import { readNodeLabel, readStatusField } from "../../lib/book-of-everything-profile.ts"
import {
  filterByStatus,
  type Leaf,
  type Rng,
  type StatusFilter,
  selectWithoutReplacement,
} from "../../lib/book-of-everything-random-leaf-select.ts"
import { bookRoot } from "../../lib/book-of-everything-root.ts"
import { inputError, isInputError, isOperationalError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--status",
      argLabel: "<filter>",
      valueShape: "token",
      description: "Which leaves to draw from: unopened, resting, or any (default: unopened)",
    },
    {
      name: "--count",
      argLabel: "<n>",
      valueShape: "token",
      description: "How many leaves to draw, without replacement (default: 1)",
    },
    {
      name: "--part",
      argLabel: "<1-10>",
      valueShape: "token",
      description: "Scope the draw to one Propaedia Part by its number",
    },
    {
      name: "--subtree",
      argLabel: "<rel>",
      valueShape: "token",
      description: "Scope the draw to a book-root-relative subtree (e.g. 04-human-life)",
    },
  ],
  mutuallyExclusive: [["--part", "--subtree"]],
  exits: [
    { code: 0, meaning: "the drawn leaves were printed, one per line" },
    { code: 1, meaning: "input error — a flag value was out of range or named no node directory" },
    { code: 3, meaning: "operational error — no matching leaf in scope, or the tree failed to read" },
  ],
  examples: [
    "ops ali random-leaf",
    "ops ali random-leaf --status resting --count 3",
    "ops ali random-leaf --part 4",
    "ops ali random-leaf --subtree 04-human-life --status any",
  ],
}

const CHILD_DIR = /^\d{2}-/

export default async function aliRandomLeaf(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const statusRaw = parsed.string("--status") ?? "unopened"
  const countRaw = parsed.string("--count")
  const partRaw = parsed.string("--part")
  const subtree = parsed.string("--subtree")

  if (statusRaw !== "unopened" && statusRaw !== "resting" && statusRaw !== "any") {
    throw inputError(`--status must be unopened|resting|any, got ${statusRaw}`)
  }
  const status: StatusFilter = statusRaw

  let count = 1
  if (countRaw !== undefined) {
    const n = Number(countRaw)
    if (!Number.isInteger(n) || n < 1) {
      throw inputError(`--count must be an integer >= 1, got ${countRaw}`)
    }
    count = n
  }

  let part: number | undefined
  if (partRaw !== undefined) {
    const n = Number(partRaw)
    if (!Number.isInteger(n) || n < 1 || n > 10) {
      throw inputError(`--part must be 1-10, got ${partRaw}`)
    }
    part = n
  }

  const BOOK_ROOT = bookRoot("book-of-everything")

  const isNodeDir = (dir: string): boolean => existsSync(join(dir, "profile.md"))

  const childNodeDirs = (dir: string): readonly string[] =>
    readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isDirectory() && CHILD_DIR.test(e.name))
      .map((e) => e.name)
      .sort()
      .map((name) => join(dir, name))
      .filter(isNodeDir)

  const collectLeaves = (dir: string): readonly Leaf[] => {
    const children = childNodeDirs(dir)
    if (children.length === 0) {
      const content = readFileSync(join(dir, "profile.md"), "utf-8")
      const rel = relative(BOOK_ROOT, dir)
      return [
        {
          path: rel === "" ? "." : rel,
          label: readNodeLabel(content),
          status: readStatusField(content),
        },
      ]
    }
    return children.flatMap(collectLeaves)
  }

  let drawn: readonly Leaf[]
  try {
    let start = BOOK_ROOT
    if (subtree !== undefined) {
      const dir = join(BOOK_ROOT, subtree)
      if (!isNodeDir(dir)) {
        throw inputError(`--subtree "${subtree}" is not a node directory (no profile.md)`)
      }
      start = dir
    } else if (part !== undefined) {
      const prefix = String(part).padStart(2, "0")
      const match = readdirSync(BOOK_ROOT, { withFileTypes: true }).find(
        (e) => e.isDirectory() && e.name.startsWith(`${prefix}-`) && isNodeDir(join(BOOK_ROOT, e.name))
      )
      if (match === undefined) throw inputError(`no part directory found for --part ${part}`)
      start = join(BOOK_ROOT, match.name)
    }

    const allLeaves = collectLeaves(start)
    const candidates = filterByStatus(allLeaves, status)
    if (candidates.length === 0) {
      const scope = subtree ?? (part === undefined ? "the whole book" : `part ${part}`)
      throw operationalError(
        `no ${status} leaves under ${scope} (${allLeaves.length} leaf node(s) in scope)`
      )
    }
    const rng: Rng = (bound) => randomInt(bound)
    drawn = selectWithoutReplacement(candidates, count, rng)
  } catch (e) {
    if ((isInputError(e)) || (isOperationalError(e))) throw e
    throw operationalError(e instanceof Error ? e.message : String(e))
  }

  for (const leaf of drawn) {
    process.stdout.write(`${leaf.path}\t${leaf.label}\t${leaf.status}\n`)
  }
}
