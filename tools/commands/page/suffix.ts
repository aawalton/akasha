export const summary = "Name a page type's files for their page type, and file them by that name"

import { existsSync, readdirSync, readFileSync } from "node:fs"
import { diskFileTree } from "@akasha/markdown-pages/file-tree"
import {
  ID,
  identityOf,
  locationFreeGlob,
  MARKDOWN,
  READINGS,
  rekeyReadings,
  suffixedPath,
} from "@akasha/markdown-pages/page-suffix"
import {
  type PageType,
  pagesOf,
  pageTypePathIn,
  soleRepoOf,
} from "@akasha/markdown-pages/page-types"
import { registryOf } from "@akasha/markdown-pages/property-registry"
import { blockOf, stringAt } from "@akasha/markdown-pages/text-at"
import { AKASHA, resolveRoots, rootFor, targetRoot } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { pageTypeOf } from "@akasha/pages-system/markdown-page-type"
import { landMoves } from "../../../move/move.ts"
import { land } from "../../lib/command.ts"
import { inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--page-type",
      argLabel: "<slug>",
      valueShape: "token",
      required: true,
      description: "The page type whose files take its name.",
    },
    { name: "--dry-run", description: "Report what would land; rename and commit nothing." },
  ],
  exits: [
    {
      code: 0,
      meaning:
        "renamed, rekeyed, refiled and committed (or dry-run). A page type backed by no file yet " +
        "is refiled alone",
    },
    {
      code: 1,
      meaning:
        "input error — a slug naming no page type, a page type stating `files: none`, a file " +
        "already carrying a second suffix, a file stating no `id:`, or a rename that would not " +
        "hold a slug or an id. Nothing was renamed",
    },
    { code: 3, meaning: "operational: the write or the commit failed" },
  ],
  examples: [
    "ops page suffix --page-type file-purpose --dry-run",
    "ops page suffix --page-type file-purpose",
  ],
}

function alreadyNamed(relPath: string, slug: string): boolean {
  return pageTypeOf(relPath) === slug
}

function refusalsFor(root: string, relPaths: readonly string[], slug: string): readonly string[] {
  const refusals: string[] = []
  for (const relPath of relPaths) {
    /**
     * An akasha page was read as markdown and refused for "declaring nothing".
     *
     * It declares a great deal — an id, a slug and a date — but as TypeScript, and `blockOf` looks
     * for a YAML fence. The message sent the reader after frontmatter that was never going to be
     * there, when the true answer is that this command has nothing to do with the file at all.
     */
    if (!relPath.endsWith(MARKDOWN)) {
      refusals.push(
        `${relPath} is no markdown page — an akasha page is \`<slug>.<page-type>.ts\` and so ` +
          "carries its page type from birth, leaving this nothing to rename"
      )
      continue
    }
    if (pageTypeOf(relPath) !== null && !alreadyNamed(relPath, slug)) {
      refusals.push(`${relPath} already carries a second suffix, so it is not a bare page file`)
      continue
    }
    const { fm, why } = blockOf(readFileSync(`${root}/${relPath}`, "utf8"))
    if (why !== null) {
      refusals.push(`${relPath} declares nothing: ${why}`)
      continue
    }
    if (stringAt(fm, ID) === null) {
      refusals.push(
        `${relPath} states no \`id:\`, and an unstated id is derived from the path, so renaming ` +
          "it would mint a different page rather than carry this one"
      )
    }
  }
  return refusals
}

function driftRefusal(
  repo: string,
  root: string,
  moves: ReadonlyMap<string, string>
): string | null {
  const drifted: string[] = []
  for (const [from, to] of moves) {
    const body = readFileSync(`${root}/${from}`, "utf8")
    const was = identityOf(repo, from, body)
    const now = identityOf(repo, to, body)
    if (was.slug === now.slug && was.id === now.id) continue
    drifted.push(`${from}: ${was.slug}/${was.id} becomes ${now.slug}/${now.id}`)
  }
  if (drifted.length === 0) return null
  return (
    "renaming these would replace a page rather than carry it — its slug or its id is read off " +
    `its path:\n       ${drifted.join("\n       ")}`
  )
}

function carryReadings(
  roots: Roots,
  root: string,
  moves: ReadonlyMap<string, string>,
  dryRun: boolean
): number {
  const dir = `${rootFor(roots, AKASHA)}/pages/seat`
  if (!existsSync(dir)) return 0
  const absolute = new Map(
    [...moves].map(([from, to]): [string, string] => [`${root}/${from}`, `${root}/${to}`])
  )
  const entries: { relPath: string; body: string }[] = []
  for (const one of readdirSync(dir).filter((each) => each.endsWith(READINGS))) {
    const rewritten = rekeyReadings(readFileSync(`${dir}/${one}`, "utf8"), absolute)
    if (rewritten !== null) entries.push({ relPath: `pages/seat/${one}`, body: rewritten })
  }
  if (entries.length === 0) return 0
  land(
    resolveRoots(AKASHA),
    entries,
    `akasha: carry ${entries.length} reading record(s) to the pages they recorded`,
    dryRun
  )
  return entries.length
}

function refileType(type: PageType, glob: string, dryRun: boolean): string {
  const roots = resolveRoots("akasha")
  const relPath = pageTypePathIn(rootFor(roots, AKASHA), type.slug)
  const body = readFileSync(`${rootFor(roots, AKASHA)}/${relPath}`, "utf8")
  const line = body.split("\n").find((one) => one.startsWith("files:"))
  if (line === undefined) throw operationalError(`${type.relPath} states no \`files:\` to refile`)
  const next = `files: ${glob}`
  if (line === next) return `${relPath} already files by name`
  land(
    roots,
    [{ relPath, body: body.replace(line, next) }],
    `akasha: file every \`${type.slug}\` by its name rather than its folder`,
    dryRun
  )
  return `${line}  ->  ${next}`
}

export default async function pageSuffix(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const slug = parsed.requireString("--page-type")
  const dryRun = parsed.boolean("--dry-run")

  const type = registryOf(diskFileTree(resolveRoots())).find((one) => one.slug === slug)
  if (type === undefined) throw inputError(`no page type here is slugged \`${slug}\``)
  const repo = soleRepoOf(type)
  if (repo === null) {
    throw inputError(`\`${slug}\` states no one repo for its files, so it has no file set to name`)
  }
  /**
   * Refused here, before anything moves, because `refileType` cannot write this key correctly.
   *
   * It finds the first line beginning `files:` and replaces it with one glob. Where the key holds a
   * list that line is the bare `files:`, so the replacement leaves a scalar with the old list
   * dangling under it: one glob, then the two original `- ` entries with nothing to belong to. That
   * is not valid frontmatter, and what it drops is the akasha half of a type part way through a
   * migration — 133 pages for `daily-tracking` and 211 for `eso-daily-tracking` today.
   */
  if (type.filed.length > 1) {
    throw inputError(
      `\`${slug}\` states ${type.filed.length} \`files:\` entries and this writes one. A type part ` +
        "way through a migration files its markdown half and its akasha half separately, and " +
        "replacing the key with a single glob would drop one of them. Nothing was renamed"
    )
  }

  const roots = resolveRoots(repo)
  const root = targetRoot(roots)
  const relPaths = pagesOf(root, type, repo)
  if (relPaths.length === 0) {
    process.stderr.write(`no file of \`${slug}\` stands yet, so only its filing changes\n`)
    process.stderr.write(`${refileType(type, locationFreeGlob(repo, slug), dryRun)}\n`)
    return
  }

  const refusals = refusalsFor(root, relPaths, slug)
  if (refusals.length > 0) throw inputError(refusals.join("\n       "))

  const moves = new Map(
    relPaths
      .filter((relPath) => !alreadyNamed(relPath, slug))
      .map((relPath): [string, string] => [relPath, suffixedPath(relPath, slug)])
  )
  if (moves.size === 0) {
    process.stderr.write(
      `every file of \`${slug}\` already carries its name, so only its filing changes\n`
    )
    process.stderr.write(`${refileType(type, locationFreeGlob(repo, slug), dryRun)}\n`)
    return
  }
  const drift = driftRefusal(repo, root, moves)
  if (drift !== null) throw inputError(drift)

  process.stderr.write(
    `${relPaths.length} file(s) of \`${slug}\` take its name, every slug and id holding across\n` +
      [...moves].map(([from, to]) => `      ${from}  ->  ${to}\n`).join("")
  )

  const where = { repo, root }
  landMoves({
    moves,
    source: where,
    destination: where,
    message: `${repo}: name every \`${slug}\` file for its page type`,
    dryRun,
  })

  const carried = carryReadings(roots, root, moves, dryRun)
  const refiled = refileType(type, locationFreeGlob(repo, slug), dryRun)
  process.stderr.write(`${carried} reading record(s) carried\n${refiled}\n`)
}
