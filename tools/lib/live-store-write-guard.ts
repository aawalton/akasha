import { canonicalize } from "../../repo/path/path.ts"
import { checkoutBeside, REPOS } from "../../repo/roots/roots.ts"

/**
 * The mark a test run puts in the environment so everything it spawns knows it is a test run.
 *
 * IT IS AN ENVIRONMENT VARIABLE BECAUSE NOTHING ELSE CROSSES A SPAWN. `Bun.main` names the test
 * file in the process `bun test` runs and the CLI's own path in anything that process starts, so a
 * test detected that way is undetectable across exactly the boundary a test crosses to write.
 */
export const TEST_RUN = "AKASHA_TEST_RUN"

/**
 * Whether a test run is what is asking, in this process or in the one that started it.
 *
 * BOTH SIGNALS ARE KEPT BECAUSE NEITHER COVERS THE OTHER'S CASE. The variable is put there by the
 * `bun test` preload and carried down every spawn, and reads nothing where a test file is run
 * straight under `bun`. `Bun.main` reads that case and no spawned one.
 */
function inATestRun(): boolean {
  if (process.env[TEST_RUN] === "1") return true
  return typeof Bun !== "undefined" && /\.test\.tsx?$/.test(Bun.main)
}

/**
 * Which repository of Alan's this root is the real checkout of, or nothing where it is not one.
 *
 * THE COMPARISON IS AGAINST THE CHECKOUT THIS CODE ITSELF SITS IN, never against the roots the
 * caller resolved. A test that states `AKASHA_ROOT` to write into a fixture has moved its roots and
 * not this, so the two read apart and the fixture write is let through. A test that states nothing
 * gets Alan's own copy by default, and the two read the same.
 */
function liveCheckoutAt(root: string): string | null {
  const at = canonicalize(root)
  for (const repo of REPOS) {
    if (canonicalize(checkoutBeside(repo)) === at) return repo
  }
  return null
}

/**
 * Refuse a write a test run would land in Alan's own repository, and let every other write past.
 *
 * IT NAMES THE ROUTE IT WAS REACHED BY, because there is more than one and they are guarded apart:
 * `written` covers every write shaped as a request — the in-process answerer `ops` installs, the
 * client at `tools/lib/page-query-client.ts`, and the editor extension — while `landOne` and
 * `commitAll` cover a caller that reaches `page-write.ts` directly and never becomes a request. A
 * refusal that named no route would claim to hold ground it does not.
 */
export function refuseALiveTestWrite(root: string, what: string, route: string): void {
  if (!inATestRun()) return
  const repo = liveCheckoutAt(root)
  if (repo === null) return
  throw new Error(
    `a test run asked to ${what} in \`${repo}\` at ${canonicalize(root)}, which is Alan's own ` +
      `checkout, so the write is refused: it would land and commit real data about his real days. ` +
      `This is the ${route} route. A test that means to write states where its pages are — set ` +
      `\`${repo.replaceAll("-", "_").toUpperCase()}_ROOT\` to a fixture checkout and this write is ` +
      `let through untouched.`
  )
}
