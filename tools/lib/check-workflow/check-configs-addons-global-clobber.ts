import type { CheckConfig } from "./check-configs-types"

export const ADDON_GLOBAL_CLOBBER_CHECKS: CheckConfig[] = [
  {
    name: "addon-owned-global-clobber",
    dispatchNodeTypes: [{ kind: "ts-file", under: "packages/temper" }],
    dispatchNodes: [
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-addon-owned-global-clobber.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/addon-global-ownership.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/addon-control-name-global-collision.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/addon-control-name-resolve.ts",
    ],
    script: "packages/temper/shared/build-deploy/checks/src/check-addon-owned-global-clobber.ts",
  },
]
