import { ADDON_BUILD_CONCURRENCY } from "./addon-build-cache.ts"
import { addonPackageSeeds } from "./check-configs-addons-seeds.ts"
import { type CheckConfig, treeShaArgs } from "./check-configs-types"

export const addonBuildChecks = (codeRoot: string): CheckConfig[] => [
  {
    name: "addon-build",
    dispatchNodes: [
      ...addonPackageSeeds(codeRoot),
      "ts-file:instructions:infra/cluster-checks/src/checks/check-addon-build.ts",
    ],
    closurePolicy: "import-graph",
    backendOptions: {
      kubernetes: {
        resources: {
          requests: { cpu: `${ADDON_BUILD_CONCURRENCY * 1000}m`, memory: "6Gi" },
          limits: { memory: "6Gi" },
        },
      },
    },
    script: "infra/cluster-checks/src/checks/check-addon-build.ts",
    args: treeShaArgs,
  },
]
