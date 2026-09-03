import { addonBuildChecks } from "./check-configs-addons-build.ts"
import { ADDON_HELD_TERRITORY_CHECKS } from "./check-configs-addons-held-territory.ts"
import type { CheckConfig } from "./check-configs-types"

export const addonChecks = (codeRoot: string): readonly CheckConfig[] => [
  ...addonBuildChecks(codeRoot),
  {
    name: "eso-global-decl-consistency",
    dispatchNodeTypes: [{ kind: "ts-file", under: "temper" }],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-eso-global-decl-consistency.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/eso-global-decl-consistency.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-eso-global-decl-consistency.ts",
  },
  {
    name: "tstl-this-void-self-drop",
    dispatchNodeTypes: [{ kind: "ts-file", under: "temper" }],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-tstl-this-void-self-drop.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/ts-tstl-this-void-self-drop.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-tstl-this-void-self-drop.ts",
  },
  {
    name: "lib-sets-stale-capture",
    dispatchNodeTypes: [{ kind: "ts-file", under: "temper" }],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-lib-sets-stale-capture.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-lib-sets-stale-capture.ts",
  },
  ...ADDON_HELD_TERRITORY_CHECKS,
]
