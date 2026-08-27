import type { CheckConfig } from "./check-configs-types"
import { addonSourcePopulation } from "./check-configs-addons-seeds.ts"

export const addonRuntimeGateChecks = (codeRoot: string): CheckConfig[] => [
  {
    name: "addon-dependency-cycle",
    dispatchNodeTypes: [{ kind: "json-file", under: "packages/temper" }],
    dispatchNodes: [
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-addon-dependency-cycle.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/addon-dependency-cycle.ts",
    ],
    script: "packages/temper/shared/build-deploy/checks/src/check-addon-dependency-cycle.ts",
  },
  {
    name: "addon-dependency-floor",
    dispatchNodeTypes: [{ kind: "json-file", under: "packages/temper" }],
    dispatchNodes: [
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-addon-dependency-floor.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/addon-dependency-floor.ts",
    ],
    script: "packages/temper/shared/build-deploy/checks/src/check-addon-dependency-floor.ts",
  },
  {
    name: "addon-hook-eager-capture",
    dispatchNodeTypes: addonSourcePopulation(codeRoot),
    dispatchNodes: [
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-addon-hook-eager-capture.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/addon-hook-eager-capture.ts",
    ],
    script: "packages/temper/shared/build-deploy/checks/src/check-addon-hook-eager-capture.ts",
  },
  {
    name: "addon-hook-fires-before-assignment",
    dispatchNodeTypes: [{ kind: "ts-file", under: "packages/temper" }],
    dispatchNodes: [
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-addon-hook-fires-before-assignment.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/addon-hook-fires-before-assignment.ts",
    ],
    script:
      "packages/temper/shared/build-deploy/checks/src/check-addon-hook-fires-before-assignment.ts",
  },
  {
    name: "addon-cross-cluster-attach",
    dispatchNodeTypes: [{ kind: "ts-file", under: "packages/temper" }],
    dispatchNodes: [
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-addon-cross-cluster-attach.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/addon-cross-cluster-attach.ts",
    ],
    script: "packages/temper/shared/build-deploy/checks/src/check-addon-cross-cluster-attach.ts",
  },
]
