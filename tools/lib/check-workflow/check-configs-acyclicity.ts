import { type CheckConfig, treeShaArgs } from "./check-configs-types"
import { TS_GRAPH_INPUT_POPULATION } from "./check-configs-types.ts"
import { curationDispatchNodes } from "./curation-dispatch.ts"

export const acyclicityChecks = (): readonly CheckConfig[] => [
  {
    name: "acyclic-imports",
    dispatchNodeTypes: TS_GRAPH_INPUT_POPULATION,
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-acyclic-imports.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/ts-adapter-roles.ts",
      ...curationDispatchNodes(),
    ],
    backendOptions: {
      kubernetes: { resources: { limits: { memory: "2Gi" } } },
    },
    script: "infra/cluster-checks/src/checks/check-acyclic-imports.ts",
    args: treeShaArgs,
  },
  {
    name: "acyclic-packages",
    dispatchNodeTypes: ["package"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-acyclic-packages.ts",
      "ts-file:code:infra/cluster-checks/src/lib/workspace-deps.ts",
      "ts-file:code:infra/cluster-checks/src/lib/graph-cycles.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-acyclic-packages.ts",
    args: treeShaArgs,
  },
]
