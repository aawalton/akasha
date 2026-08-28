export const summary = "Name a page type's files for their page type, and file them by that name"

import { existsSync, readdirSync, readFileSync } from "node:fs"
import { land } from "../../lib/command.ts"
import { inputError, operationalError } from "../../lib/exit.ts"
import {
  ID,
  identityOf,
  locationFreeGlob,
  READINGS,
  rekeyReadings,
  suffixedPath,
} from "../../lib/page-suffix.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { type Roots } from "../../../page/page.ts"
import { AKASHA, resolveRoots, rootFor, targetRoot } from "../../../repo/roots/roots.ts"
import { diskFileTree } from "../../../page/file-tree.ts"
import { landMoves } from "../../../move/move.ts"
import { registryOf } from "../../../page/property/registry.ts"
import { pagesOf, type PageType, pageTypePathIn, soleRepoOf } from "../../../page/page-types.ts"
import { blockOf, stringAt } from "../../../page/text/text.ts"
import { pageTypeOf } from "../../../pages-system/page-type/page-type.ts"
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

function driftRefusal(repo: string, root: string, moves: ReadonlyMap<string, string>): string | null {
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
