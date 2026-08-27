import { ADDON_BUILD_CONCURRENCY } from "./addon-build-cache.ts"
import { type CheckConfig, treeShaArgs } from "./check-configs-types"
import { addonPackageSeeds } from "./check-configs-addons-seeds.ts"

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
  {
    name: "addon-sandbox-safety",
    dependsOn: ["addon-build"],
    dispatchNodes: [
      ...addonPackageSeeds(codeRoot),
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-addon-sandbox-safety.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/addon-banned-symbols.ts",
    ],
    closurePolicy: "import-graph",
    script: "packages/temper/shared/build-deploy/checks/src/check-addon-sandbox-safety.ts",
  },
  {
    name: "addon-sandbox-load",
    dependsOn: ["addon-build"],
    dispatchNodes: [
      ...addonPackageSeeds(codeRoot),
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-addon-sandbox-load.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/addon-sandbox-load.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/eso-sandbox-globals.ts",
    ],
    closurePolicy: "import-graph",
    script: "packages/temper/shared/build-deploy/checks/src/check-addon-sandbox-load.ts",
  },
  {
    name: "addon-removed-refs",
    dependsOn: ["addon-build"],
    dispatchNodes: [
      ...addonPackageSeeds(codeRoot),
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-addon-removed-refs.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/addon-removed-refs.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/addon-removed-refs.manifest.ts",
    ],
    closurePolicy: "import-graph",
    script: "packages/temper/shared/build-deploy/checks/src/check-addon-removed-refs.ts",
  },
]
