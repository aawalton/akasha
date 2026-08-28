import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import { CHECKS_CEILING_MS, type AsyncCheck, type CheckOutcome } from "../lib/check.ts"
import { judge, over, skip } from "../../outcome/outcome"
import { refusalText } from "../../refusal/refusal.ts"
import { withSuiteTree } from "../lib/suite-tree.ts"
import { headSha, selection } from "../lib/test-selection.ts"
import { DEFAULT_CEILING_MS } from "./tests-bounded.ts"

const NAME = "suite-runs"

export const SUITE_MARK = "INSTRUCTIONS_SUITE_RUNNING"

const RAN = /Ran (\d+) tests? across (\d+) files?/
const FAILED = /^\s*(\d+) fail/m

const SUITE_GLOB = "tools/**/*.test.ts"

export const ON_DEMAND_SUFFIX = ".on-demand.test.ts"

export const BATCH = 8

const NAMED = 20

export function unitFiles(root: string): readonly string[] {
  const paths: string[] = []
  for (const relPath of new Bun.Glob(SUITE_GLOB).scanSync({ cwd: root })) {
    if (relPath.endsWith(ON_DEMAND_SUFFIX)) continue
    paths.push(relPath)
  }
  return paths.sort()
}

export function onDemandFiles(root: string): readonly string[] {
  const paths: string[] = []
  for (const relPath of new Bun.Glob(SUITE_GLOB).scanSync({ cwd: root })) {
    if (relPath.endsWith(ON_DEMAND_SUFFIX)) paths.push(relPath)
  }
  return paths.sort()
}

const seconds = (ms: number): string => (ms / 1000).toFixed(0)

export interface Tally {
  readonly tests: number
  readonly files: number
  readonly failed: number
  readonly worstExit: number
  readonly unread: number
  readonly killed: number
  readonly killedFiles: number
  readonly named: readonly string[]
}

export const NOTHING: Tally = {
  tests: 0,
  files: 0,
  failed: 0,
  worstExit: 0,
  unread: 0,
  killed: 0,
  killedFiles: 0,
  named: [],
}

export function tallyOf(out: string, exitCode: number | null, asked = 0): Tally {
  const named = out
    .split("\n")
    .filter((line) => line.includes("(fail)"))
    .map((line) => line.trim())
  if (exitCode === null) return { ...NOTHING, killed: 1, killedFiles: asked, named }
  const ran = RAN.exec(out)
  if (ran === null) return { ...NOTHING, worstExit: exitCode, unread: 1, named }
  return {
    tests: Number(ran[1]),
    files: Number(ran[2]),
    failed: Number(FAILED.exec(out)?.[1] ?? 0),
    worstExit: exitCode,
    unread: 0,
    killed: 0,
    killedFiles: 0,
    named,
  }
}

export function added(before: Tally, after: Tally): Tally {
  return {
    tests: before.tests + after.tests,
    files: before.files + after.files,
    failed: before.failed + after.failed,
    worstExit: Math.max(before.worstExit, after.worstExit),
    unread: before.unread + after.unread,
    killed: before.killed + after.killed,
    killedFiles: before.killedFiles + after.killedFiles,
    named: [...before.named, ...after.named],
  }
}

export function report(tally: Tally, asked: number, root: string): CheckOutcome {
  const neverStarted = Math.max(0, asked - tally.files - tally.killedFiles)
  const messages: string[] = []
  if (tally.failed > 0 || tally.worstExit > 0) {
    messages.push(
      refusalText("suite-failed", { failed: `${tally.failed}`, exit: `${tally.worstExit}` }, root)
    )
  }
  if (tally.unread > 0) {
    messages.push(refusalText("suite-summary-unread", { exit: `${tally.worstExit}` }, root))
  }
  if (tally.killed > 0) {
    messages.push(
      refusalText(
        "suite-batch-killed",
        { batches: `${tally.killed}`, files: `${tally.killedFiles}` },
        root
      )
    )
  }
  if (neverStarted > 0) {
    messages.push(
      refusalText(
        "suite-unfinished",
        { reached: `${tally.files}`, unreached: `${neverStarted}` },
        root
      )
    )
  }
  if (messages.length > 0) messages.push(...tally.named.slice(0, NAMED))
  const killedSaid =
    tally.killed === 0
      ? ""
      : `, ${tally.killed} batch(es) killed at the deadline taking ${tally.killedFiles} file(s) with them`
  return {
    ...judge(
      NAME,
      `${tally.tests} test(s) across ${tally.files} of ${asked} file(s), each bounded at ` +
        `${seconds(DEFAULT_CEILING_MS)}s${killedSaid}`,
      messages
    ),
    population: over(tally.files, "test file(s)"),
  }
}

export const suiteRuns: AsyncCheck = async (repo) => {
  if (process.env[SUITE_MARK] !== undefined) {
    return {
      ...skip(NAME, `${SUITE_MARK} is set, so this run is already inside the suite`),
      population: over(0, "test file(s)"),
    }
  }
  const startedOn = headSha(rootFor(repo.roots, AKASHA))
  if (startedOn === null) {
    return {
      ...judge(
        NAME,
        "git could not read HEAD here, so there is no commit whose suite this could run",
        ["the standard suite runs a worktree of one commit, and nothing names one"]
      ),
      population: over(0, "test file(s)"),
    }
  }
  return withSuiteTree(rootFor(repo.roots, AKASHA), startedOn, async (tree) => {
    const considered = unitFiles(tree.at)
    const chosen = selection(tree.at, considered)
    const files = chosen.files
    if (considered.length === 0) {
      return {
        ...judge(NAME, `no file under \`${SUITE_GLOB}\` is a unit test`, [
          `every test file matching \`${SUITE_GLOB}\` is held back by its suffix, so this check ` +
            `would have run the whole tree rather than the standard suite`,
        ]),
        population: over(0, "test file(s)"),
      }
    }
    if (files.length === 0) {
      return {
        ...judge(NAME, `no test could be invalidated — ${chosen.reason}`, []),
        population: over(considered.length, "test file(s) weighed"),
      }
    }
    const deadlineAt = repo.deadlineAt ?? Date.now() + CHECKS_CEILING_MS
    let tally = NOTHING
    for (let at = 0; at < files.length; at += BATCH) {
      const budgetMs = deadlineAt - Date.now()
      if (budgetMs <= 0) break
      const handed = files.slice(at, at + BATCH)
      const run = Bun.spawnSync({
        cmd: ["bun", "test", "--timeout", `${DEFAULT_CEILING_MS}`, ...handed],
        cwd: tree.at,
        env: { ...tree.env, [SUITE_MARK]: "1" },
        stdout: "pipe",
        stderr: "pipe",
        timeout: budgetMs,
      })
      tally = added(
        tally,
        tallyOf(run.stdout.toString() + run.stderr.toString(), run.exitCode, handed.length)
      )
    }
    const outcome = report(tally, files.length, rootFor(repo.roots, AKASHA))
    const onDemand = onDemandFiles(tree.at)
    const held =
      onDemand.length === 0
        ? ""
        : `; ${onDemand.length} file(s) held back and not run here, each run by naming it`
    return {
      ...outcome,
      detail: `${outcome.detail} at ${startedOn.slice(0, 8)} — ${chosen.reason}${held}`,
    }
  })
}
