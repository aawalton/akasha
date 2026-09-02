import { Glob } from "bun"
import { existsSync } from "node:fs"
import { AKASHA, rootFor } from "@akasha/pages-system/checkout-roots"
import { judge, over } from "@akasha/verdict/outcome"
import { gitIgnoring } from "../../repo/git/git.ts"
import type { Check } from "../lib/check.ts"

const NAME = "declarations-orphaned"

const DECLARATION = ".d.ts"

/**
 * Folders this walks past.
 *
 * `node_modules` holds a package's own published declarations, which answer for
 * a dependency rather than for anything of ours. `dist` holds emitted output
 * that nothing here imports by path: no live specifier, no `tsconfig` `paths`
 * entry and no `package.json` `types` field reaches into one, so a declaration
 * standing there shadows nothing. Both are also where the counts are large
 * enough that judging them would drown the one refusal that matters.
 */
const WALKED_PAST: ReadonlySet<string> = new Set(["node_modules", ".git", "dist"])

/**
 * The declaration React Router writes for `virtual:react-router/server-build`.
 *
 * It is source-less by design — the module it declares is synthesized by the
 * bundler and stands in no file — so the source this audit looks for could
 * never be there, and its absence is no trap.
 */
const SOURCELESS_BY_DESIGN = ".react-router/types/+server-build.d.ts"

function walkedPast(relPath: string): boolean {
  return relPath.split("/").some((part) => WALKED_PAST.has(part))
}

export function sourcelessByDesign(relPath: string): boolean {
  return relPath === SOURCELESS_BY_DESIGN || relPath.endsWith(`/${SOURCELESS_BY_DESIGN}`)
}

export function declarationsUnder(root: string): readonly string[] {
  const found: string[] = []
  for (const relPath of new Glob(`**/*${DECLARATION}`).scanSync({
    cwd: root,
    onlyFiles: true,
    dot: true,
  })) {
    if (walkedPast(relPath)) continue
    if (sourcelessByDesign(relPath)) continue
    found.push(relPath)
  }
  return found.sort()
}

/** The source a `foo.d.ts` would be the emitted declaration of, in the order tsc emits from. */
export function sourcesFor(relPath: string): readonly string[] {
  const stem = relPath.slice(0, -DECLARATION.length)
  return [`${stem}.ts`, `${stem}.tsx`]
}

export function orphanedAmong(
  root: string,
  relPaths: readonly string[]
): readonly string[] {
  return relPaths.filter((relPath) =>
    sourcesFor(relPath).every((source) => !existsSync(`${root}/${source}`))
  )
}

export function refusalFor(relPath: string): string {
  const [ts, tsx] = sourcesFor(relPath)
  return (
    `${relPath} — a gitignored declaration with neither \`${ts}\` nor \`${tsx}\` beside it. ` +
    `While its source stood, this file was silent, because a specifier naming the source resolves ` +
    `to the \`.ts\` ahead of the \`.d.ts\`. Now that the source is gone the specifier resolves ` +
    `here instead, so every import of a module that no longer exists typechecks green off what ` +
    `this file still declares. Delete it.`
  )
}

/**
 * Refuses a gitignored declaration standing where its source no longer does.
 *
 * `.gitignore` ignores `*.d.ts` because tsc emits declarations beside the code
 * they came from; the hand-written ones are named there by exception and stay
 * tracked, so asking git what it ignores separates emitted from hand-written
 * without this audit holding a second copy of that list.
 *
 * An emitted declaration mirroring a source that stands is inert: resolution
 * takes the `.ts` first, so the declaration answers nothing for the whole life
 * of its source. It speaks once, at the moment the source is deleted, and what
 * it says then is that the deleted module is still there. That is why this is
 * quiet against a whole tree of mirrors and loud against the few that outlived
 * what they mirrored.
 */
export const declarationsOrphaned: Check = (repo) => {
  const root = rootFor(repo.roots, AKASHA)
  const standing = declarationsUnder(root)
  const ignored = gitIgnoring(root, standing)
  if (ignored === null) {
    throw new Error(
      `git could not say which of the ${standing.length} declaration(s) under ${root} it ignores, ` +
        `so which are emitted and which are hand-written is unknown rather than answered`
    )
  }
  const judged = standing.filter((relPath) => ignored.has(relPath))
  const orphaned = orphanedAmong(root, judged)
  return {
    ...judge(
      NAME,
      `${judged.length} gitignored declaration(s) outside dist/, of ${standing.length} standing ` +
        `there, ${orphaned.length} of them outliving the source they were emitted from`,
      orphaned.map((relPath) => refusalFor(relPath))
    ),
    population: over(judged.length, "gitignored declaration(s) outside dist/"),
  }
}
