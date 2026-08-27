
import { describe, expect, test } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import {
  computeServersToClear,
  planDisableReconcile,
  type ReconcilePlan,
} from "../lib/mcp-disable-reconcile.ts"
import { shape } from "../lib/shape.ts"

const identity = (p: string): string => p

const AfterSchema = shape
  .object({
    numStartups: shape.number().optional(),
    trailingTopLevelKey: shape.boolean().optional(),
    projects: shape.record(shape.string(), shape.record(shape.string(), shape.unknown())),
  })
  .passthrough()

function parseAfter(text: string): {
  numStartups?: number
  trailingTopLevelKey?: boolean
  projects: Record<string, Record<string, unknown>>
} {
  return AfterSchema.parse(JSON.parse(text))
}

function assertPlan(p: ReconcilePlan | null): ReconcilePlan {
  if (p === null) throw new Error("expected a non-null reconcile plan")
  return p
}

interface Scenario {
  readonly name: string
  readonly observe: () => unknown
  readonly standing: unknown
}

function held(scenario: Scenario): void {
  const ported = decided("ported", { value: scenario.observe(), notice: null })
  expect(hold(scenario.name, scenario.standing, ported).matches).toBe(true)
}

const INTERSECTION: readonly Scenario[] = [
  {
    name: "registry-declared servers present in the disable list are returned",
    observe: () => computeServersToClear(["messages", "playwright"], ["playwright", "notion"]),
    standing: ["playwright"],
  },
  {
    name: "empty when the intersection is empty (only unrelated disables)",
    observe: () => computeServersToClear(["messages", "playwright"], ["notion"]),
    standing: [],
  },
  {
    name: "empty when nothing is disabled",
    observe: () => computeServersToClear(["messages", "playwright"], []),
    standing: [],
  },
  {
    name: "empty when nothing is declared",
    observe: () => computeServersToClear([], ["playwright", "notion"]),
    standing: [],
  },
  {
    name: "multiple registry servers cleared at once; order follows the disable list",
    observe: () =>
      computeServersToClear(["messages", "playwright"], ["notion", "messages", "playwright"]),
    standing: ["messages", "playwright"],
  },
]

describe("computeServersToClear, held against what the code repository asserts", () => {
  for (const scenario of INTERSECTION) {
    test(scenario.name, () => held(scenario))
  }
})

const CWD = "/var/home/walton/code"
const DECLARED = ["messages", "playwright"] as const

function configWith(disabled: readonly string[] | undefined): string {
  const entry = disabled === undefined ? {} : { disabledMcpServers: disabled }
  return `${JSON.stringify(
    {
      numStartups: 4956,
      projects: {
        [CWD]: { ...entry, someUnknownKey: "keep-me" },
        "/tmp": { disabledMcpServers: ["playwright"] },
      },
      trailingTopLevelKey: true,
    },
    null,
    2
  )}\n`
}

function planFor(disabled: readonly string[] | undefined): ReconcilePlan | null {
  return planDisableReconcile(configWith(disabled), CWD, DECLARED, identity)
}

function disabledIn(text: string, key: string): unknown {
  return parseAfter(text).projects[key]?.disabledMcpServers ?? null
}

const TRANSFORM: readonly Scenario[] = [
  {
    name: "intersection nonempty → clears the registry server, keeps unrelated disables",
    observe: () => {
      const plan = assertPlan(planFor(["playwright", "notion"]))
      return {
        clearedServers: plan.clearedServers,
        cwdDisabled: disabledIn(plan.nextConfigText, CWD),
      }
    },
    standing: { clearedServers: ["playwright"], cwdDisabled: ["notion"] },
  },
  {
    name: "preserves unknown keys AND their order (byte-faithful except the one field)",
    observe: () => {
      const plan = assertPlan(planFor(["playwright"]))
      const next = parseAfter(plan.nextConfigText)
      const text = plan.nextConfigText
      return {
        numStartups: next.numStartups ?? null,
        trailingTopLevelKey: next.trailingTopLevelKey ?? null,
        someUnknownKey: next.projects[CWD]?.someUnknownKey ?? null,
        startupsBeforeProjects: text.indexOf('"numStartups"') < text.indexOf('"projects"'),
        projectsBeforeTrailing:
          text.indexOf('"projects"') < text.indexOf('"trailingTopLevelKey"'),
      }
    },
    standing: {
      numStartups: 4956,
      trailingTopLevelKey: true,
      someUnknownKey: "keep-me",
      startupsBeforeProjects: true,
      projectsBeforeTrailing: true,
    },
  },
  {
    name: "leaves non-target project keys untouched even when they disable a registry server",
    observe: () => ({
      tmpDisabled: disabledIn(assertPlan(planFor(["playwright"])).nextConfigText, "/tmp"),
    }),
    standing: { tmpDisabled: ["playwright"] },
  },
  {
    name: "preserves the trailing newline and 2-space indent",
    observe: () => {
      const text = assertPlan(planFor(["playwright"])).nextConfigText
      return {
        endsWithNewline: text.endsWith("\n"),
        indentedNumStartups: text.includes('\n  "numStartups"'),
      }
    },
    standing: { endsWithNewline: true, indentedNumStartups: true },
  },
  {
    name: "intersection empty (only unrelated disable) → null, no rewrite",
    observe: () => ({ plan: planFor(["notion"]) }),
    standing: { plan: null },
  },
  {
    name: "disabledMcpServers key absent on the entry → null",
    observe: () => ({ plan: planFor(undefined) }),
    standing: { plan: null },
  },
  {
    name: "no project key resolves to the launch cwd → null",
    observe: () => ({
      plan: planDisableReconcile(configWith(["playwright"]), "/some/other/path", DECLARED, identity),
    }),
    standing: { plan: null },
  },
  {
    name: "malformed JSON → null (fail-open)",
    observe: () => ({ plan: planDisableReconcile("{ not json", CWD, DECLARED, identity) }),
    standing: { plan: null },
  },
  {
    name: "no projects object → null (fail-open on unexpected shape)",
    observe: () => ({
      plan: planDisableReconcile(JSON.stringify({ numStartups: 1 }), CWD, DECLARED, identity),
    }),
    standing: { plan: null },
  },
  {
    name: "disabledMcpServers wrong type (not an array) → null, not a throw",
    observe: () => {
      const raw = JSON.stringify({ projects: { [CWD]: { disabledMcpServers: "playwright" } } })
      return { plan: planDisableReconcile(raw, CWD, DECLARED, identity) }
    },
    standing: { plan: null },
  },
  {
    name: "matches by realpath: symlinked cwd resolves onto the config's resolved key",
    observe: () => {
      const raw = `${JSON.stringify(
        { projects: { "/var/home/walton/code": { disabledMcpServers: ["playwright", "notion"] } } },
        null,
        2
      )}\n`
      const resolve = (p: string): string =>
        p === "/home/walton/code" ? "/var/home/walton/code" : p
      const plan = assertPlan(planDisableReconcile(raw, "/home/walton/code", DECLARED, resolve))
      return {
        clearedServers: plan.clearedServers,
        realDisabled: disabledIn(plan.nextConfigText, "/var/home/walton/code"),
      }
    },
    standing: { clearedServers: ["playwright"], realDisabled: ["notion"] },
  },
]

describe("planDisableReconcile, held against what the code repository asserts", () => {
  for (const scenario of TRANSFORM) {
    test(scenario.name, () => held(scenario))
  }
})
