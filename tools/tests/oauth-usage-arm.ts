
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { mock } from "bun:test"
import { rows } from "./oauth-usage-drive.ts"
import { seam, type Bound } from "./oauth-usage-harness.ts"
import { PAGED_ACCOUNTS } from "./oauth-usage-vectors.ts"
import { installRepos } from "./fixture.ts"

const here = new URL(".", import.meta.url).pathname
const dir = process.argv[2] ?? `${here}../lib`

const uncommittedAt = `${here}../../page/uncommitted/uncommitted.ts`

const root = mkdtempSync(`${tmpdir()}/oauth-usage-pages-`)
// NOT AN `afterAll`: this arm is spawned as a plain `bun` process rather than under the test
// runner, and `afterAll` throws outside it. An exit hook is what takes the root away, and it
// stands here rather than at the tail so a failure anywhere below still clears the root.
process.on("exit", () => rmSync(root, { recursive: true, force: true }))
mkdirSync(`${root}/pages/claude-account`, { recursive: true })
for (const account of PAGED_ACCOUNTS) {
  writeFileSync(`${root}/pages/claude-account/${account}.claude-account.md`, "---\nslug: page\n---\n")
}
// THE PAGES STAND IN AKASHA, and `pagesRoot()` reads `AKASHA_ROOT` for them at call time. Pointed
// anywhere else this arm keeps its pacing off a page that is not there, and every write it was
// written to record is silently none.
//
// THE REPO PAGES SAY WHICH REPOSITORIES THERE ARE, read out of this root, so `roots.ts` throws as
// it loads unless they stand here too — and it loads under the dynamic import below, after this.
installRepos(root)
process.env.AKASHA_ROOT = root

const realUncommittedFile = await import(uncommittedAt)
mock.module(uncommittedAt, () => ({
  ...realUncommittedFile,
  patchUncommitted: (pagePath: string, values: Record<string, unknown>) => seam.pacing({ pagePath, values }),
}))

mock.module(`${dir}/oauth-page-mark.ts`, () => ({
  holdMarksOnPage: (account: string, marks: Record<string, string | null>) => {
    seam.mark({ account, marks })
    return { kind: "unchanged", account }
  },
}))

const subject = (await import(`${dir}/oauth-usage.ts`)) as unknown as Bound
const bound: Bound = {
  parseUsageResponse: subject.parseUsageResponse,
  fetchUsage: subject.fetchUsage,
  pushPacingToPage: subject.pushPacingToPage,
  markAccountAtLimit: subject.markAccountAtLimit,
  repollUsageAfter429: subject.repollUsageAfter429,
  resetRepollGateForTests: subject.resetRepollGateForTests,
}

process.stdout.write(`${JSON.stringify(await rows(bound))}\n`)
