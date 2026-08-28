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
process.on("exit", () => rmSync(root, { recursive: true, force: true }))
mkdirSync(`${root}/pages/claude-account`, { recursive: true })
for (const account of PAGED_ACCOUNTS) {
  writeFileSync(`${root}/pages/claude-account/${account}.claude-account.md`, "---\nslug: page\n---\n")
}
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
