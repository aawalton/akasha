import { existsSync, readFileSync } from "node:fs"
import { bashEnvInside } from "./audits/bash-env-inside.ts"
import { categoryRulesCover } from "./audits/category-rules-cover.ts"
import { categoryRulesDisjoint } from "./audits/category-rules-disjoint.ts"
import { checksGoverned } from "./audits/checks-reached.ts"
import { cliHelpFlagReferences } from "./audits/cli-help-flag-references.ts"
import { commandHelpBound } from "./audits/command-help-bound.ts"
import { defaultsNotRequired } from "./audits/defaults-not-required.ts"
import { domainEdges } from "./audits/domain-edges.ts"
import { editorExtensionSingle } from "./audits/editor-extension-single.ts"
import { emailRulesCover } from "./audits/email-rules-cover.ts"
import { emailRulesDisjoint } from "./audits/email-rules-disjoint.ts"
import { hooksAgree } from "./audits/hooks-agree.ts"
import { hooksDelivered } from "./audits/hooks-delivered.ts"
import { hooksUncopied } from "./audits/hooks-uncopied.ts"
import { relationsResolve } from "./audits/relations-resolve.ts"
import { lintScopeCoverage } from "./audits/lint-scope-coverage.ts"
import { pagesHoldProperties } from "./audits/pages-hold-properties.ts"
import { pagesHoldShape } from "./audits/pages-hold-shape.ts"
import { pagesNamedAsStated } from "./audits/pages-named-as-stated.ts"
import { personaValues } from "./audits/persona-values.ts"
import { positionalsCoverIdentifiers } from "./audits/positionals-cover-identifiers.ts"
import { propertyTypesBind } from "./audits/property-types-bind.ts"
import { refusalsBound } from "./audits/refusals-bound.ts"
import { resumeNotices } from "./audits/resume-notices.ts"
import { statuslineConstants } from "./audits/statusline-constants.ts"
import { suiteRuns } from "./audits/suite-runs.ts"
import { testsBounded } from "./audits/tests-bounded.ts"
import { typecheckRepo } from "./audits/typecheck-repo.ts"
import { commandsDeclareHelp } from "./audits/commands-declare-help.ts"
import { commandsDeclareSummary } from "./audits/commands-declare-summary.ts"
import type { Repo } from "../page/document/types.ts"
import { CHECKS_CEILING_MS, CHECK_BAND, type RepoView, type Levy, listDocuments } from "./lib/check.ts"
import { refusalText } from "../refusal/refusal.ts"
import { anyRefused, over, type Outcome, render, skip } from "../outcome/outcome.ts"
import { CEILING_MS, type Band, seconds, cpuMs } from "./lib/run-cost.ts"
import { headSha, writeGreen } from "./lib/test-selection.ts"
import { AKASHA, resolveRoots, rootFor } from "../repo/roots/roots.ts"

export const CHECKS: Readonly<Record<string, Levy>> = {
  "bash-env-inside": { repos: ["akasha"], run: bashEnvInside },
  "category-rules-cover": { repos: ["akasha"], run: categoryRulesCover },
  "category-rules-disjoint": { repos: ["akasha"], run: categoryRulesDisjoint },
  "checks-reached": { repos: ["akasha"], run: checksGoverned },
  "cli-help-flag-references": { repos: ["akasha"], run: cliHelpFlagReferences },
  "command-help-bound": { repos: ["akasha"], run: commandHelpBound },
  "defaults-not-required": { repos: ["akasha"], run: defaultsNotRequired },
  "domain-edges": { repos: ["akasha"], run: domainEdges },
  "editor-extension-single": { repos: ["akasha"], run: editorExtensionSingle },
  "email-rules-cover": { repos: ["akasha"], run: emailRulesCover },
  "email-rules-disjoint": { repos: ["akasha"], run: emailRulesDisjoint },
  "hooks-agree": { repos: ["akasha"], run: hooksAgree },
  "hooks-delivered": { repos: ["akasha"], run: hooksDelivered },
  "hooks-uncopied": { repos: ["akasha"], run: hooksUncopied },
  "relations-resolve": { repos: ["akasha"], run: relationsResolve },
  "lint-scope-coverage": { repos: ["akasha"], run: lintScopeCoverage },
  "pages-hold-properties": { repos: ["akasha"], run: pagesHoldProperties },
  "pages-hold-shape": { repos: ["akasha"], run: pagesHoldShape },
  "pages-named-as-stated": { repos: ["akasha"], run: pagesNamedAsStated },
  "persona-values": { repos: ["akasha"], run: personaValues },
  "positionals-cover-identifiers": { repos: ["akasha"], run: positionalsCoverIdentifiers },
  "property-types-bind": { repos: ["akasha"], run: propertyTypesBind },
  "refusals-bound": { repos: ["akasha"], run: refusalsBound },
  "resume-notices": { repos: ["akasha"], run: resumeNotices },
  "statusline-constants": { repos: ["akasha"], run: statuslineConstants },
  "suite-runs": { repos: ["akasha"], run: suiteRuns, band: "painful" },
  "tests-bounded": { repos: ["akasha"], run: testsBounded },
  "commands-declare-help": { repos: ["akasha"], run: commandsDeclareHelp },
  "commands-declare-summary": { repos: ["akasha"], run: commandsDeclareSummary },
  "typecheck-repo": { repos: ["akasha"], run: typecheckRepo, band: "slow" },
}

function certified(outcome: Outcome): Outcome {
  const { population } = outcome
  if (population === undefined) {
    return {
      ...outcome,
      verdict: "fail",
      messages: [
        ...outcome.messages,
        `${outcome.name} declared no population, so nothing says whether its verdict came out ` +
          `of a walk of the repo or out of a walk of nothing`,
      ],
    }
  }
  if (population.measured > 0) return outcome
  if (outcome.verdict !== "pass" && outcome.verdict !== "advisory") return outcome
  return {
    ...outcome,
    verdict: "fail",
    messages: [
      ...outcome.messages,
      `${outcome.name} measured 0 ${population.unit}, so it certifies nothing — an empty search ` +
        `reports no violations for the same reason a clean repo does, and this verdict cannot ` +
        `tell you which of the two it saw`,
    ],
  }
}

const SPREAD = "checks-spread"

const NAMED = 5

export function spread(outcomes: readonly Outcome[], elapsedMs: number): Outcome {
  const timed = outcomes
    .filter((outcome) => outcome.elapsedMs !== undefined)
    .toSorted((a, b) => (b.elapsedMs ?? 0) - (a.elapsedMs ?? 0))
  if (timed.length === 0) {
    return { name: SPREAD, verdict: "not-applicable", detail: "nothing ran, so nothing was timed", messages: [] }
  }
  const slowest = timed.slice(0, NAMED)
  const rest = timed.slice(NAMED).reduce((sum, outcome) => sum + (outcome.elapsedMs ?? 0), 0)
  return {
    name: SPREAD,
    verdict: "advisory",
    detail:
      `${timed.length} check run(s) over ${seconds(elapsedMs)}, ` +
      `slowest ${seconds(slowest[0]?.elapsedMs ?? 0)}`,
    messages: [
      ...slowest.map((outcome) => `${seconds(outcome.elapsedMs ?? 0).padStart(7)}  ${outcome.name}`),
      `${seconds(rest).padStart(7)}  the remaining ${timed.length - slowest.length} run(s) together`,
    ],
  }
}

export function within(outcome: Outcome, band: Band): Outcome {
  const ceilingMs = CEILING_MS[band]
  const elapsedMs = outcome.elapsedMs ?? 0
  if (elapsedMs <= ceilingMs) return outcome
  return {
    ...outcome,
    verdict: "fail",
    bandReplaced: outcome.verdict,
    detail: `${outcome.detail} — ${seconds(elapsedMs)} against a ${band} ceiling of ${seconds(ceilingMs)}`,
    messages: [
      ...outcome.messages,
      `${outcome.name} took ${seconds(elapsedMs)}, past the ${seconds(ceilingMs)} a ${band} check is ` +
        `held to. Every seat pays this on every landing. Make it faster, narrow what it looks at, ` +
        `or take a looser band to Alan.`,
    ],
  }
}

export const SUITE = "suite-runs (akasha)"

export function suitePassed(outcomes: readonly Outcome[]): boolean {
  return outcomes.some(
    (outcome) =>
      outcome.name === SUITE && (outcome.verdict === "pass" || outcome.bandReplaced === "pass")
  )
}

export async function runChecks(
  includes: Readonly<Record<string, Levy>>,
  repoViewOf: (repo: Repo) => RepoView,
  only: readonly string[],
  ceilingMs: number = CHECKS_CEILING_MS,
  now: () => number = Date.now
): Promise<readonly Outcome[]> {
  const startedAt = now()
  const deadlineAt = startedAt + ceilingMs
  const names = only.length === 0 ? Object.keys(includes) : only
  const outcomes: Outcome[] = []
  for (const name of names) {
    const levied = includes[name]
    if (levied === undefined) {
      outcomes.push({
        name,
        verdict: "fail" as const,
        detail: "no such check",
        messages: [`\`${name}\` is not one of: ${Object.keys(includes).join(", ")}`],
      })
      continue
    }
    for (const repo of levied.repos) {
      const view = repoViewOf(repo)
      if (view.roots[repo] === undefined) {
        outcomes.push(
          within(
            {
              ...skip(
                `${name} (${repo})`,
                `no \`${repo}\` repository is cloned here, so this was not run over it`
              ),
              population: over(0, "document(s)"),
            },
            levied.band ?? CHECK_BAND
          )
        )
        continue
      }
      const at = cpuMs()
      const outcome = await levied.run({ ...view, deadlineAt })
      const took = cpuMs() - at
      const named = certified({ ...outcome, name: `${outcome.name} (${repo})`, elapsedMs: took })
      outcomes.push(within(named, levied.band ?? CHECK_BAND))
    }
  }
  const elapsedMs = now() - startedAt
  if (elapsedMs > ceilingMs) {
    outcomes.push({
      name: "checks-ceiling",
      verdict: "fail" as const,
      detail: `${(elapsedMs / 1000).toFixed(1)}s against a ${(ceilingMs / 1000).toFixed(0)}s ceiling`,
      messages: [
        refusalText(
          "checks-ceiling",
          { elapsed: (elapsedMs / 1000).toFixed(1), ceiling: (ceilingMs / 1000).toFixed(0) },
          rootFor(repoViewOf("akasha").roots, AKASHA)
        ),
      ],
    })
  }
  return outcomes
}

if (import.meta.main) {
  const argv = process.argv.slice(2)
  const only: string[] = []
  for (let i = 0; i < argv.length; i += 1) {
    const argument = argv[i]!
    if (argument === "--check") {
      const value = argv[i + 1]
      if (value === undefined) {
        process.stderr.write("error: --check needs a value\n")
        process.exit(1)
      }
      only.push(value)
      i += 1
    } else if (argument === "--help" || argument === "-h") {
      process.stdout.write(
        `bun tools/run-checks.ts — run every check across the repo\n\n` +
          `Usage:\n  bun ~/repos/akasha/tools/run-checks.ts [<name> …]\n\n` +
          `A bare name is the check to run, and so is --check's value; naming none runs them all.\n` +
          `A name no check carries is refused rather than dropped, because a whole suite run green\n` +
          `reads as the answer to a question about the one check that was named.\n\n` +
          `Checks: ${Object.keys(CHECKS).join(", ")}\n\n` +
          `A whole run is bounded at ${CHECKS_CEILING_MS / 1000}s. Over that the run itself is a failure,\n` +
          `whatever each check found, and the suite is killed at whatever is left of the budget.\n\n` +
          `Flags:\n  --check <name>  Run only this one. Repeatable.\n` +
          `  --help          This.\n\n` +
          `Exit codes:\n  0  every check passed over a population it measured\n` +
          `  1  at least one check found something, or could not measure anything to look in\n`
      )
      process.exit(0)
    } else if (argument.startsWith("-")) {
      process.stderr.write(`error: \`${argument}\` is not a flag this takes — run it with --help\n`)
      process.exit(1)
    } else {
      only.push(argument)
    }
  }
  const roots = resolveRoots()
  const repoViewOf = (repo: Repo): RepoView => {
    const root = roots[repo]
    return {
      roots,
      name: repo,
      documents: root === undefined ? [] : listDocuments(root),
      read: (relPath) => readFileSync(`${rootFor(roots, repo)}/${relPath}`, "utf8"),
      exists: existsSync,
    }
  }
  const at = cpuMs()
  const startedOn = headSha(rootFor(roots, AKASHA))
  const outcomes = await runChecks(CHECKS, repoViewOf, only)
  const took = cpuMs() - at
  const shown = only.length === 0 ? [...outcomes, spread(outcomes, took)] : outcomes
  process.stdout.write(`${render(shown).join("\n")}\n`)
  if (anyRefused(outcomes)) process.exitCode = 1
  if (only.length === 0 && startedOn !== null && suitePassed(outcomes)) writeGreen(startedOn)
}
