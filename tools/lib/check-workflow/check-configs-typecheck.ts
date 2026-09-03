import type { AppBuildTarget } from "../../../akasha/checks/cluster-checks/modules/app-build-packages/app-build-packages.module.code.ts"
import type { CheckConfig } from "./check-configs-types.ts"
import { TS_GRAPH_INPUT_POPULATION } from "./check-configs-types.ts"

const PACKAGE_POPULATION = ["package"] as const

const POPULATION_SCRIPT = "infra/cluster-checks/src/typecheck-population.ts"

function typegenCommand(workspace: string, dir: string): string {
  return `cd ${workspace}/${dir} && mkdir -p node_modules && bunx react-router typegen`
}

export function buildTypecheckChecks(
  apps: readonly AppBuildTarget[]
): readonly [CheckConfig, ...(readonly CheckConfig[])] {
  const sorted = [...apps].sort((a, b) => a.dir.localeCompare(b.dir))
  return [
    {
      name: "typecheck",
      dispatchNodeTypes: [...TS_GRAPH_INPUT_POPULATION, ...PACKAGE_POPULATION, "lock-file"],
      dispatchNodes: [
        "json-file:code:package.json",
        `ts-file:instructions:${POPULATION_SCRIPT}`,
        "ts-file:code:tools/lib/check-workflow/check-configs-typecheck.ts",
      ],
      backendOptions: {
        kubernetes: { resources: { requests: { cpu: "3" }, limits: { memory: "4Gi" } } },
      },
      commands: (ci) => [
        `cd ${ci.workspace} && bun "$AKASHA_ROOT/${POPULATION_SCRIPT}" || exit 1`,
        ...sorted.map((a) => typegenCommand(ci.workspace, a.dir)),
        `cd ${ci.workspace} && bunx @typescript/native-preview -b`,
      ],
    },
  ]
}
