import type { PopulationEntry } from "../graph/queries/membership.ts"
import type { CheckConfig } from "./check-configs-types"
import { astGrepCheck } from "./check-configs-ast-grep.ts"
import { WORKFLOW_DSL_POPULATION, WORKFLOW_SURFACE_POPULATION } from "./check-configs-types.ts"

const WORKFLOW_DEFINITION_DISPATCH_NODE_TYPES: readonly (
  | PopulationEntry
  | typeof WORKFLOW_SURFACE_POPULATION
)[] = ["workflow", WORKFLOW_SURFACE_POPULATION, WORKFLOW_DSL_POPULATION]

export const ciMetaChecks = (codeRoot: string): CheckConfig[] => [
  {
    name: "ci-workflow-graph",
    dispatchNodeTypes: [
      ...WORKFLOW_DEFINITION_DISPATCH_NODE_TYPES,
      { kind: "ts-file", under: "packages/infra/ci" },
    ],
    dispatchNodes: [
      "ts-file:instructions:tools/commands/check-ci-workflow-graph.ts",
      "ts-file:instructions:tools/lib/workflow-surface/graph.ts",
    ],
    script: "tools/commands/check-ci-workflow-graph.ts",
  },
  {
    name: "ci-naming-conventions",
    dispatchNodeTypes: WORKFLOW_DEFINITION_DISPATCH_NODE_TYPES,
    dispatchNodes: [
      "ts-file:instructions:tools/commands/check-ci-naming-conventions.ts",
      "ts-file:instructions:tools/lib/workflow-surface/naming.ts",
      "ts-file:instructions:tools/lib/pipeline-run/pod-name.ts",
    ],
    script: "tools/commands/check-ci-naming-conventions.ts",
  },
  {
    name: "run-check-routing",
    alwaysRun: true,
    dispatchNodeTypes: WORKFLOW_DEFINITION_DISPATCH_NODE_TYPES,
    dispatchNodes: [
      "ts-file:instructions:tools/commands/check-run-check-routing.ts",
      "ts-file:instructions:tools/lib/check-workflow/run-check-routing.ts",
      "ts-file:instructions:infra/cluster-checks/src/run-check.ts",
    ],
    script: "tools/commands/check-run-check-routing.ts",
    args: (ci) => ["--code-root", ci.workspace],
  },
  astGrepCheck(codeRoot),
  {
    name: "bare-ts-population-seeds",
    dispatchNodeTypes: [{ kind: "ts-file", under: "tools/lib/check-workflow" }],
    dispatchNodes: [
      "ts-file:instructions:tools/commands/check-bare-ts-population-seeds.ts",
      "ts-file:instructions:tools/lib/check-workflow/bare-ts-population-seeds.ts",
      "ts-file:instructions:tools/lib/check-workflow/declared-check-configs.ts",
      "ts-file:instructions:tools/lib/check-workflow/repo-wide-ts-scanners.ts",
    ],
    script: "tools/commands/check-bare-ts-population-seeds.ts",
    args: (ci) => ["--code-root", ci.workspace],
  },
]
