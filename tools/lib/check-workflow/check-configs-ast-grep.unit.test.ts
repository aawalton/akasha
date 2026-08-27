import { describe, expect, test } from "bun:test"
import { codeRoot as ownCodeRoot } from "../code-root.ts"
import {
  astGrepCheck,
  astGrepWatchPlan,
  listAstGrepWorkspaces,
  readAstGrepRules,
} from "./check-configs-ast-grep.ts"
import { type AstGrepRule, parseRuleDoc, planAstGrepWatch } from "./ast-grep-rules.ts"

const codeRoot = process.env.WORKSPACE ?? ownCodeRoot()

const LEAST_WORKSPACES = 50

const FIXTURE_DIR = "fixture/thing"

const FIXTURE_WORKSPACE = { name: "@fixture/thing", dir: FIXTURE_DIR }

const FIXTURE_PATH = `${FIXTURE_DIR}/rules/fixture-rule.yml`

const ruleDoc = (files: string) =>
  `id: fixture-rule\nlanguage: ts\n${files}rule:\n  pattern: exampleCall($$$)\n`

const ruleOver = (globs: readonly string[]): AstGrepRule =>
  parseRuleDoc(
    ruleDoc(globs.length === 0 ? "" : `files:\n${globs.map((g) => `  - ${g}\n`).join("")}`),
    FIXTURE_PATH
  )

describe("the ast-grep watch derivation, over rules this file supplies", () => {
  test("seeds the workspace owning a rule's glob", () => {
    expect(planAstGrepWatch([ruleOver([`${FIXTURE_DIR}/**/*.ts`])], [FIXTURE_WORKSPACE])).toEqual({
      seeds: ["package:code:@fixture/thing"],
      repoWide: false,
    })
  })

  test("widens to the whole repo when no workspace owns the glob, rather than seeding nothing", () => {
    expect(planAstGrepWatch([ruleOver([`${FIXTURE_DIR}/**/*.ts`])], [])).toEqual({
      seeds: [],
      repoWide: true,
    })
  })

  test("widens to the whole repo for a rule omitting files entirely", () => {
    expect(planAstGrepWatch([ruleOver([])], [FIXTURE_WORKSPACE])).toEqual({
      seeds: [],
      repoWide: true,
    })
  })

  test("refuses a rule whose files key stands empty, rather than reading it as every file", () => {
    expect(() => parseRuleDoc(ruleDoc("files:\n"), FIXTURE_PATH)).toThrow(
      /cannot be run or reported on/
    )
  })

  test("derives nothing from no rules, so a seed below is a rule read and not a default", () => {
    expect(planAstGrepWatch([], [FIXTURE_WORKSPACE])).toEqual({ seeds: [], repoWide: false })
  })
})

describe("the ast-grep table, composed against the tree it will run over", () => {
  const read = readAstGrepRules(codeRoot)
  const workspaces = listAstGrepWorkspaces(codeRoot)

  test(`lists at least ${LEAST_WORKSPACES} workspaces to attribute those rules to`, () => {
    expect(workspaces.length).toBeGreaterThanOrEqual(LEAST_WORKSPACES)
  })

  test("runs always exactly while some rule reaches past the workspaces named", () => {
    expect(astGrepCheck(codeRoot).alwaysRun).toBe(astGrepWatchPlan(codeRoot).repoWide)
  })

  test("treats an unreadable rule as reason to run over everything", () => {
    expect(astGrepWatchPlan(codeRoot).repoWide || read.gaps.length === 0).toBe(true)
  })

  test("watches both yaml spellings, so a rule added under either dispatches it", () => {
    expect(astGrepCheck(codeRoot).dispatchNodeTypes).toEqual(["yaml-file", "yml-file"])
  })

  test("seeds each file the check is built from, so changing the route re-runs the rules", () => {
    expect(astGrepCheck(codeRoot).dispatchNodes).toEqual(
      expect.arrayContaining([
        "ts-file:instructions:infra/cluster-checks/src/checks/check-ast-grep.ts",
        "ts-file:instructions:tools/lib/check-workflow/ast-grep-rules.ts",
        "ts-file:instructions:tools/lib/check-workflow/check-configs-ast-grep.ts",
      ])
    )
  })

  test("names the script it runs through", () => {
    expect(astGrepCheck(codeRoot).script).toBe(
      "infra/cluster-checks/src/checks/check-ast-grep.ts"
    )
  })
})
