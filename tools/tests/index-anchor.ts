import { mkdtempSync, realpathSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import type { Stated } from "../../page/index/identity/identity.ts"
import { indexRoot } from "../../page/index/place/place.ts"
import { keepPages } from "../../page/index/store/store.ts"

/**
 * A page index of a test file's own, and a refusal where it did not get one.
 *
 * THE REGISTRY IS READ OFF THE INDEX RATHER THAN GLOBBED. `page/property/registry.ts` builds every
 * page type out of `loadPages()`, so a fixture carrying no index states no page type at all. A test
 * that needs its fixture's page types seen has to put rows in an index.
 *
 * THE INDEX FOLLOWS `AKASHA_ROOT`. `page/index/place/place.ts` works out its place against whichever
 * root is named when it is asked, so setting that variable here moves the index here. `bun test`
 * loads and runs one file at a time, so a file anchoring at module scope holds the index for its own
 * cases and gives it back on `discard`.
 *
 * WHICH IS WHY `keep` REFUSES RATHER THAN WRITING WHERE THE ANCHOR DID NOT TAKE. `keepPages` replaces `pages.jsonl` whole, so a
 * handful of fixture rows written against the live index erases every other page in it. That is not
 * a theory: it happened, and the live index went from 59,619 pages to 13 — the four page types one
 * of these files states, plus nine seat pages — until `ops index refresh` rebuilt it. An anchor that
 * did not take must stop the test rather than the repository.
 */
export interface Anchor {
  readonly root: string
  keep(rows: readonly Stated[]): void
  discard(): void
}

export function anchorIndex(named: string): Anchor {
  const root = realpathSync(mkdtempSync(`${tmpdir()}/${named}-index-`))
  Bun.spawnSync(["git", "init", "-q", "-b", "main", "."], { cwd: root })
  // `AKASHA_ROOT` IS PUT BACK ON DISCARD, being the one variable every root is read through. It was
  // set and left, and `bun test` runs every file in one process, so every later file in the batch
  // resolved akasha to this anchor — a directory `discard` had already removed — and failed on a
  // root that is not cloned. Nothing showed it while the file that would have caught it could not
  // run. Restoring it puts `indexRoot` back on the live index as well, which is what a later file
  // anchoring nothing of its own should be reading.
  const priorRoot = process.env.AKASHA_ROOT
  process.env.AKASHA_ROOT = root
  const stands = indexRoot()
  const won = stands === root || stands.startsWith(`${root}/`)
  return {
    root,
    keep: (rows: readonly Stated[]): void => {
      if (!won) {
        throw new Error(
          `the page index stands at ${stands}, outside this file's anchor at ${root}, so some other file in this process asked for it first. Writing these rows would replace that index whole. Run this file on its own.`
        )
      }
      keepPages(rows)
    },
    discard: (): void => {
      if (priorRoot === undefined) delete process.env.AKASHA_ROOT
      else process.env.AKASHA_ROOT = priorRoot
      rmSync(root, { recursive: true, force: true })
    },
  }
}
