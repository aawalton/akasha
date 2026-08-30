import { type CheckConfig, treeShaArgs } from "./check-configs-types"

export const acyclicityChecks = (): readonly CheckConfig[] => [
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
