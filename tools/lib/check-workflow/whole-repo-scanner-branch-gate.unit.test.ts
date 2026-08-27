import { describe, expect, test } from "bun:test"
import { codeRoot as ownCodeRoot } from "../code-root.ts"
import { checkWorkflow } from "./index.ts"

const codeRoot = process.env.WORKSPACE ?? ownCodeRoot()

const LEAST_STEPS = 80

const WHOLE_REPO_SCANNERS = [
  "check-lint",
  "check-no-orphan-source",
  "check-phantom-deps",
  "check-service-dockerfiles-gitignored",
  "check-syntax-bundle",
  "check-tsconfig",
] as const

const workflow = checkWorkflow(codeRoot)

const steps = workflow.steps ?? []

const flagAt = (holder: unknown, key: string): unknown =>
  typeof holder === "object" && holder !== null && key in holder
    ? (holder as Record<string, unknown>)[key]
    : undefined

describe("the check workflow, as a branch push reaches it", () => {
  test(`carries at least ${LEAST_STEPS} steps, so the names below are looked for in a populated workflow`, () => {
    expect(steps.length).toBeGreaterThanOrEqual(LEAST_STEPS)
  })

  test("runs on a push to any branch but main, which is the gate these scanners stand behind", () => {
    expect(flagAt(workflow, "when")).toEqual({ event: "push", branch: "!main" })
  })

  test("runs always as a whole, so a step's own flag is what decides it and not the workflow's", () => {
    expect(flagAt(workflow, "alwaysRun")).toBe(true)
  })
})

describe("every scanner reading the whole repository", () => {
  for (const name of WHOLE_REPO_SCANNERS) {
    test(`${name} stands in the workflow and runs whatever changed`, () => {
      const step = steps.find((candidate) => candidate.name === name)
      expect(step).toBeDefined()
      expect(flagAt(step, "alwaysRun")).toBe(true)
    })
  }

  test("names no scanner the workflow has since dropped", () => {
    const present = new Set(steps.map((step) => step.name))
    expect(WHOLE_REPO_SCANNERS.filter((name) => !present.has(name))).toEqual([])
  })
})
