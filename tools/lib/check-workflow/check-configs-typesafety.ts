import type { PopulationEntry } from "../graph/queries/membership.ts"
import { type CheckConfig, treeShaArgs } from "./check-configs-types.ts"

const TS_POPULATION: readonly PopulationEntry[] = ["ts-file", "tsx-file"]

export const TYPESAFETY_CHECKS: CheckConfig[] = [
  {
    name: "syntax-bundle",
    alwaysRun: true,
    dispatchNodeTypes: TS_POPULATION,
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-syntax-bundle.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/syntax-scanner-entry.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/ts-file-iteration.ts",
      "ts-file:instructions:infra/cluster-checks/src/checks/check-type-assertions.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/ts-type-assertions.ts",
      "ts-file:instructions:infra/cluster-checks/src/checks/check-no-void-return.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/ts-void-declarations.ts",
      "ts-file:instructions:infra/cluster-checks/src/checks/check-readonly-collections.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/ts-collection-types.ts",
      "ts-file:instructions:infra/cluster-checks/src/checks/check-exhaustive-dispatch.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/ts-exhaustive-dispatch.ts",
      "ts-file:instructions:infra/cluster-checks/src/checks/check-boundary-parse.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/ts-boundary-reads.ts",
      "ts-file:instructions:infra/cluster-checks/src/checks/check-timezone-handling.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/ts-timezone-violations.ts",
      "ts-file:instructions:infra/cluster-checks/src/checks/check-population-read-swallow.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/ts-population-read-swallow.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/population.ts",
    ],
    backendOptions: {
      kubernetes: {
        resources: { requests: { cpu: "1", memory: "2Gi" }, limits: { memory: "4Gi" } },
      },
    },
    script: "infra/cluster-checks/src/checks/check-syntax-bundle.ts",
    args: treeShaArgs,
  },
  {
    name: "mock-module-surface",
    dispatchNodeTypes: TS_POPULATION,
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-mock-module-surface.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/runtime-export-surface.ts",
      "ts-file:code:packages/shared/graph/producers/src/file/ts-file/parse-mock-module.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-mock-module-surface.ts",
    args: treeShaArgs,
  },
  {
    name: "mock-module-leak",
    dispatchNodeTypes: TS_POPULATION,
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-mock-module-leak.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/mock-module-leak-context.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/runtime-export-surface.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/barrel-rebinding.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/fetch-seam-leak.ts",
      "ts-file:code:packages/shared/graph/producers/src/file/ts-file/parse-mock-module.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-mock-module-leak.ts",
    args: treeShaArgs,
  },
]
