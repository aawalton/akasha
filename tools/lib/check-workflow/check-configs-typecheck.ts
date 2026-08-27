import type { CheckConfig } from "./check-configs-types.ts"
import { TS_GRAPH_INPUT_POPULATION } from "./check-configs-types.ts"

const PACKAGE_POPULATION = ["package"] as const

const POPULATION_SCRIPT = "infra/cluster-checks/src/typecheck-population.ts"

export const TYPECHECK_CHECKS: CheckConfig[] = [
  {
    name: "typecheck",
    dispatchNodeTypes: [...TS_GRAPH_INPUT_POPULATION, ...PACKAGE_POPULATION, "lock-file"],
    dispatchNodes: ["json-file:code:package.json", `ts-file:instructions:${POPULATION_SCRIPT}`],
    backendOptions: {
      kubernetes: { resources: { requests: { cpu: "3" }, limits: { memory: "4Gi" } } },
    },
    commands: (ci) => [
      `cd ${ci.workspace} && bun "$AKASHA_ROOT/${POPULATION_SCRIPT}" || exit 1`,
      `cd ${ci.workspace} && bunx @typescript/native-preview -b`,
    ],
  },
]
