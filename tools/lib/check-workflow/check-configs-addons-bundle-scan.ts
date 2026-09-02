import type { CheckConfig } from "./check-configs-types"
import { addonPackageSeeds } from "./check-configs-addons-seeds.ts"

export const addonBundleScanChecks = (codeRoot: string): CheckConfig[] => [
  {
    name: "tstl-range-double-shift",
    dependsOn: ["addon-build"],
    dispatchNodes: [
      ...addonPackageSeeds(codeRoot),
      "ts-file:code:temper/shared-build-deploy-checks/src/check-tstl-range-double-shift.ts",
      "ts-file:code:temper/shared-build-deploy-checks/src/tstl-range-double-shift.ts",
    ],
    closurePolicy: "import-graph",
    script: "temper/shared-build-deploy-checks/src/check-tstl-range-double-shift.ts",
  },
  {
    name: "tstl-anytable-length",
    dependsOn: ["addon-build"],
    dispatchNodes: [
      ...addonPackageSeeds(codeRoot),
      "ts-file:code:temper/shared-build-deploy-checks/src/check-tstl-anytable-length.ts",
      "ts-file:code:temper/shared-build-deploy-checks/src/tstl-anytable-length.ts",
    ],
    closurePolicy: "import-graph",
    script: "temper/shared-build-deploy-checks/src/check-tstl-anytable-length.ts",
  },
  {
    name: "tstl-colon-dot-self-shift",
    dependsOn: ["addon-build"],
    dispatchNodes: [
      ...addonPackageSeeds(codeRoot),
      "ts-file:code:temper/shared-build-deploy-checks/src/check-tstl-colon-dot-self-shift.ts",
      "ts-file:code:temper/shared-build-deploy-checks/src/tstl-colon-dot-self-shift.ts",
      "ts-file:code:temper/shared-build-deploy-checks/src/tstl-colon-dot-self-shift.manifest.ts",
    ],
    closurePolicy: "import-graph",
    script: "temper/shared-build-deploy-checks/src/check-tstl-colon-dot-self-shift.ts",
  },
]
