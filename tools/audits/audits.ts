import { existsSync, readFileSync } from "node:fs"
import type { Repo } from "@akasha/pages-system/markdown-document"
import { over, type Outcome } from "@akasha/verdict/outcome"
import { resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { cpuMs, seconds } from "../lib/run-cost.ts"
import { listDocuments, type Levy, type RepoView } from "../lib/check.ts"

import { bashEnvInside } from "./bash-env-inside.ts"
import { categoryRulesCover } from "./category-rules-cover.ts"
import { categoryRulesDisjoint } from "./category-rules-disjoint.ts"
import { cliHelpFlagReferences } from "./cli-help-flag-references.ts"
import { commandHelpBound } from "./command-help-bound.ts"
import { commandsDeclareHelp } from "./commands-declare-help.ts"
import { commandsDeclareSummary } from "./commands-declare-summary.ts"
import { defaultsNotRequired } from "./defaults-not-required.ts"
import { domainEdges } from "./domain-edges.ts"
import { editorExtensionSingle } from "./editor-extension-single.ts"
import { emailRulesCover } from "./email-rules-cover.ts"
import { emailRulesDisjoint } from "./email-rules-disjoint.ts"
import { hooksAgree } from "./hooks-agree.ts"
import { hooksDelivered } from "./hooks-delivered.ts"
import { hooksUncopied } from "./hooks-uncopied.ts"
import { pagesHoldProperties } from "./pages-hold-properties.ts"
import { pagesHoldShape } from "./pages-hold-shape.ts"
import { pagesNamedAsStated } from "./pages-named-as-stated.ts"
import { personaValues } from "./persona-values.ts"
import { positionalsCoverIdentifiers } from "./positionals-cover-identifiers.ts"
import { propertyTypesBind } from "./property-types-bind.ts"
import { refusalsBound } from "./refusals-bound.ts"
import { relationsResolve } from "./relations-resolve.ts"
import { resumeNotices } from "./resume-notices.ts"
import { seatValuesDeclared } from "./seat-values-declared.ts"
import { statuslineConstants } from "./statusline-constants.ts"
import { suiteRuns } from "./suite-runs.ts"
import { testsBounded } from "./tests-bounded.ts"

/**
 * Every audit standing under this folder, each named by its file stem.
 *
 * An audit added here and left out of this map runs nowhere, so the map is the
 * whole account of what is watched. `audits-registered` refuses when the two
 * disagree.
 */
export const AUDITS: Readonly<Record<string, Levy>> = {
  "bash-env-inside": { repos: ["akasha"], run: bashEnvInside },
  "category-rules-cover": { repos: ["akasha"], run: categoryRulesCover },
  "category-rules-disjoint": { repos: ["akasha"], run: categoryRulesDisjoint },
  "cli-help-flag-references": { repos: ["akasha"], run: cliHelpFlagReferences },
  "command-help-bound": { repos: ["akasha"], run: commandHelpBound },
  "commands-declare-help": { repos: ["akasha"], run: commandsDeclareHelp },
  "commands-declare-summary": { repos: ["akasha"], run: commandsDeclareSummary },
  "defaults-not-required": { repos: ["akasha"], run: defaultsNotRequired },
  "domain-edges": { repos: ["akasha"], run: domainEdges },
  "editor-extension-single": { repos: ["akasha"], run: editorExtensionSingle },
  "email-rules-cover": { repos: ["akasha"], run: emailRulesCover },
  "email-rules-disjoint": { repos: ["akasha"], run: emailRulesDisjoint },
  "hooks-agree": { repos: ["akasha"], run: hooksAgree },
  "hooks-delivered": { repos: ["akasha"], run: hooksDelivered },
  "hooks-uncopied": { repos: ["akasha"], run: hooksUncopied },
  "pages-hold-properties": { repos: ["akasha"], run: pagesHoldProperties },
  "pages-hold-shape": { repos: ["akasha"], run: pagesHoldShape },
  "pages-named-as-stated": { repos: ["akasha"], run: pagesNamedAsStated },
  "persona-values": { repos: ["akasha"], run: personaValues },
  "positionals-cover-identifiers": { repos: ["akasha"], run: positionalsCoverIdentifiers },
  "property-types-bind": { repos: ["akasha"], run: propertyTypesBind },
  "refusals-bound": { repos: ["akasha"], run: refusalsBound },
  "relations-resolve": { repos: ["akasha"], run: relationsResolve },
  "resume-notices": { repos: ["akasha"], run: resumeNotices },
  "seat-values-declared": { repos: ["akasha"], run: seatValuesDeclared },
  "statusline-constants": { repos: ["akasha"], run: statuslineConstants },
  "suite-runs": { repos: ["akasha"], run: suiteRuns },
  "tests-bounded": { repos: ["akasha"], run: testsBounded },
}

/** Files under this folder that hold no audit, so their absence from `AUDITS` is no gap. */
const NOT_AUDITS = new Set(["audits.ts", "audits.test.ts", "run-one.ts", "run-one.test.ts"])

export function auditFileStems(at: string): readonly string[] {
  const stems: string[] = []
  for (const name of new Bun.Glob("*.ts").scanSync({ cwd: at })) {
    if (NOT_AUDITS.has(name)) continue
    stems.push(name.slice(0, -".ts".length))
  }
  return stems.sort()
}

/**
 * An audit standing in this folder and named by no entry of `AUDITS` runs
 * nowhere, and an entry naming no file is a name that will never answer. Both
 * read as a green board over something unwatched, which is the defect this
 * whole watchdog stands against, so both refuse.
 */
export function registered(stems: readonly string[]): Outcome {
  const named = new Set(Object.keys(AUDITS))
  const standing = new Set(stems)
  const messages = [
    ...stems
      .filter((stem) => !named.has(stem))
      .map(
        (stem) =>
          `\`tools/audits/${stem}.ts\` stands in the audit folder and no entry of \`AUDITS\` names ` +
          `it, so it runs nowhere and whatever it guards is unwatched`
      ),
    ...[...named]
      .filter((name) => !standing.has(name))
      .map(
        (name) =>
          `\`AUDITS\` names \`${name}\` and no \`tools/audits/${name}.ts\` stands there, so the ` +
          `name will never answer`
      ),
  ]
  return {
    name: "audits-registered",
    verdict: messages.length === 0 ? "pass" : "fail",
    detail: `${Object.keys(AUDITS).length} audit(s) registered against ${stems.length} file(s)`,
    messages,
    population: over(stems.length, "audit file(s)"),
  }
}

/**
 * An audit that measured nothing and passed certifies nothing: an empty search
 * reports no violations for the same reason a clean tree does, and the verdict
 * cannot tell you which of the two it saw. Such a pass is turned into a refusal.
 */
export function certified(outcome: Outcome): Outcome {
  const { population } = outcome
  if (population === undefined) {
    return {
      ...outcome,
      verdict: "fail",
      messages: [
        ...outcome.messages,
        `${outcome.name} declared no population, so nothing says whether its verdict came out ` +
          `of a walk of the tree or out of a walk of nothing`,
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
        `reports no violations for the same reason a clean tree does, and this verdict cannot ` +
        `tell you which of the two it saw`,
    ],
  }
}

/** What an audit that threw answers, so one thrown error costs one audit rather than the run. */
export function threw(name: string, repo: Repo, thrown: unknown): Outcome {
  const said = thrown instanceof Error ? `${thrown.message}\n${thrown.stack ?? ""}` : `${thrown}`
  return {
    name: `${name} (${repo})`,
    verdict: "fail",
    detail: "the audit threw rather than judging",
    messages: [
      `${name} threw, so it judged nothing and what it guards went unwatched on this run:`,
      said.trim(),
    ],
    population: over(0, "throw(s)"),
  }
}

const SAID = 12

/**
 * What an audit whose process left without writing a verdict answers.
 *
 * A `process.exit` inside a module an audit loads cannot be caught, so an audit
 * that reaches one takes its whole process with it. Each runs in its own, and
 * this is what the parent writes in its place: a refusal naming the exit code
 * and the tail of what it said, rather than a gap in the board.
 */
export function died(name: string, code: number | null, said: string): Outcome {
  const tail = said.trim().split("\n").slice(-SAID).join("\n")
  return {
    name,
    verdict: "fail",
    detail:
      code === null
        ? "the audit's process was killed at its deadline without writing a verdict"
        : `the audit's process left with code ${code} without writing a verdict`,
    messages: [
      `${name} judged nothing: its process ended before it wrote an outcome, so what it guards ` +
        `went unwatched on this run. What it said last:`,
      tail === "" ? "(it said nothing)" : tail,
    ],
    population: over(0, "verdict(s)"),
  }
}

/** What an audit the budget never reached answers, so an unfinished run is never a clean one. */
export function unrun(names: readonly string[], budgetMs: number): Outcome {
  return {
    name: "audits-unrun",
    verdict: "fail",
    detail: `${names.length} audit(s) the ${seconds(budgetMs)} budget never reached`,
    messages: [
      `the budget ran out with ${names.length} audit(s) not yet run, so this board is short of ` +
        `the whole account rather than clean over it: ${names.join(", ")}`,
    ],
    population: over(names.length, "unrun audit(s)"),
  }
}

export const DRAWN = 10

/**
 * Holds back the tail of a long message list so one audit with thousands of
 * refusals does not bury the other twenty-seven.
 *
 * This narrows what is DRAWN and nothing else: the verdict, the counts in the
 * detail line and the exit code are untouched, and the number held back is
 * stated beside the way to see them. A board that hid the count instead would
 * be the defect this narrowing is against.
 */
export function shortened(outcome: Outcome, limit: number = DRAWN): Outcome {
  const held = outcome.messages.length - limit
  if (held <= 0) return outcome
  return {
    ...outcome,
    messages: [
      ...outcome.messages.slice(0, limit),
      `… and ${held} further message(s), not drawn here. Run ` +
        `\`bun tools/audits/run-one.ts ${outcome.name.split(" ")[0]} --out <path>\` for all of them.`,
    ],
  }
}

const NAMED = 5

/** Where the wall time went, so a run growing past its budget can be read before it does. */
export function spread(outcomes: readonly Outcome[], elapsedMs: number): Outcome {
  const timed = outcomes
    .filter((outcome) => outcome.elapsedMs !== undefined)
    .toSorted((a, b) => (b.elapsedMs ?? 0) - (a.elapsedMs ?? 0))
  if (timed.length === 0) {
    return {
      name: "audits-spread",
      verdict: "not-applicable",
      detail: "nothing ran, so nothing was timed",
      messages: [],
    }
  }
  const slowest = timed.slice(0, NAMED)
  const rest = timed.slice(NAMED).reduce((sum, outcome) => sum + (outcome.elapsedMs ?? 0), 0)
  return {
    name: "audits-spread",
    verdict: "advisory",
    detail:
      `${timed.length} audit run(s) over ${seconds(elapsedMs)}, ` +
      `slowest ${seconds(slowest[0]?.elapsedMs ?? 0)}`,
    messages: [
      ...slowest.map((each) => `${seconds(each.elapsedMs ?? 0).padStart(9)}  ${each.name}`),
      `${seconds(rest).padStart(9)}  the remaining ${timed.length - slowest.length} run(s) together`,
    ],
  }
}

export function viewsOf(): (repo: Repo) => RepoView {
  const roots = resolveRoots()
  return (repo) => {
    const root = roots[repo]
    return {
      roots,
      name: repo,
      documents: root === undefined ? [] : listDocuments(root),
      read: (relPath) => readFileSync(`${rootFor(roots, repo)}/${relPath}`, "utf8"),
      exists: existsSync,
    }
  }
}

/**
 * Runs one audit in this process and answers what it judged, one outcome per
 * repository it is levied on.
 *
 * Nothing here writes: no green mark is laid down, nothing is notified, and no
 * verdict changes what any other run will do.
 */
export async function judgeOne(
  name: string,
  levied: Levy,
  repoViewOf: (repo: Repo) => RepoView,
  deadlineAt: number
): Promise<readonly Outcome[]> {
  const outcomes: Outcome[] = []
  for (const repo of levied.repos) {
    const view = repoViewOf(repo)
    if (view.roots[repo] === undefined) {
      outcomes.push({
        name: `${name} (${repo})`,
        verdict: "fail",
        detail: `no \`${repo}\` checkout stands here`,
        messages: [
          `${name} wants the \`${repo}\` checkout and none is resolved here, so it judged ` +
            `nothing rather than judging a clean tree`,
        ],
        population: over(0, "document(s)"),
      })
      continue
    }
    const spent = cpuMs()
    let judged: Outcome
    try {
      const answered = await levied.run({ ...view, deadlineAt })
      judged = certified({ ...answered, name: `${answered.name} (${repo})` })
    } catch (thrown) {
      judged = threw(name, repo, thrown)
    }
    outcomes.push({ ...judged, elapsedMs: cpuMs() - spent })
  }
  return outcomes
}
