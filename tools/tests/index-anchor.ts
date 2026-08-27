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
 * THE INDEX HAS ONE PLACE FOR THE LIFE OF THE PROCESS. `page/index/place/place.ts` works it out on
 * the first ask and holds it, so it settles on whichever root asked first. A test file that names
 * its anchor at module scope wins that race only when nothing loaded before it asked — and `bun
 * test` runs every file in one process, so which file that is depends on the paths named.
 *
 * WHICH IS WHY `keep` REFUSES RATHER THAN WRITING. `keepPages` replaces `pages.jsonl` whole, so a
 * handful of fixture rows written against the live index erases every other page in it. That is not
 * a theory: it happened, and the live index went from 59,619 pages to 13 — the four page types one
 * of these files states, plus nine seat pages — until `ops index refresh` rebuilt it. Losing the
 * race must stop the test rather than the repository.
 */
export interface Anchor {
  readonly root: string
  keep(rows: readonly Stated[]): void
  discard(): void
}

export function anchorIndex(named: string): Anchor {
  const root = realpathSync(mkdtempSync(`${tmpdir()}/${named}-index-`))
  Bun.spawnSync(["git", "init", "-q", "-b", "main", "."], { cwd: root })
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
    discard: (): void => rmSync(root, { recursive: true, force: true }),
  }
}
