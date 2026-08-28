import { canonicalize } from "../../repo/path/path.ts"
import { checkoutBeside, REPOS } from "../../repo/roots/roots.ts"

export const TEST_RUN = "AKASHA_TEST_RUN"

function inATestRun(): boolean {
  if (process.env[TEST_RUN] === "1") return true
  return typeof Bun !== "undefined" && /\.test\.tsx?$/.test(Bun.main)
}

function liveCheckoutAt(root: string): string | null {
  const at = canonicalize(root)
  for (const repo of REPOS) {
    if (canonicalize(checkoutBeside(repo)) === at) return repo
  }
  return null
}

export function refuseALiveTestWriteIn(
  roots: Readonly<Record<string, string | undefined>>,
  what: string,
  route: string
): void {
  if (!inATestRun()) return
  for (const [key, root] of Object.entries(roots)) {
    if (key === "target" || root === undefined) continue
    refuseALiveTestWrite(root, what, route)
  }
}

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
