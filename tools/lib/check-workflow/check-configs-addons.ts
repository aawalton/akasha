import { withAddonBuildCoDep } from "./addon-build-co-dep.ts"
import type { CheckConfig } from "./check-configs-types"
import { addonBuildChecks } from "./check-configs-addons-build.ts"
import { addonBundleScanChecks } from "./check-configs-addons-bundle-scan.ts"
import { ADDON_GLOBAL_CLOBBER_CHECKS } from "./check-configs-addons-global-clobber.ts"
import { ADDON_HELD_TERRITORY_CHECKS } from "./check-configs-addons-held-territory.ts"
import { addonRuntimeGateChecks } from "./check-configs-addons-runtime-gates.ts"
import { ADDON_TI_CLEAN_CHECKS } from "./check-configs-addons-ti-clean.ts"
import { ADDON_XML_HANDLER_CHECKS } from "./check-configs-addons-xml-handlers.ts"

export const addonChecks = (codeRoot: string): readonly CheckConfig[] =>
  withAddonBuildCoDep([
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
  ...ADDON_GLOBAL_CLOBBER_CHECKS,
  ...addonRuntimeGateChecks(codeRoot),
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
    name: "tstl-this-void-colon-method",
    dispatchNodeTypes: [{ kind: "ts-file", under: "temper" }],
    dispatchNodes: [
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-tstl-this-void-colon-method.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/tstl-this-void-colon-method.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/tstl-this-void-colon-method.manifest.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/eso-colon-methods.generated.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/eso-base-game-globals.generated.ts",
    ],
    script: "temper/shared-build-deploy-checks/src/check-tstl-this-void-colon-method.ts",
  },
  {
    name: "eso-typings-fresh",
    dispatchNodeTypes: [{ kind: "ts-file", under: "temper" }],
    script: "temper/shared-build-deploy-checks/src/check-eso-typings-fresh.ts",
  },
  {
    name: "addon-fingerprint-residue",
    dispatchNodeTypes: [{ kind: "ts-file", under: "temper" }],
    dispatchNodes: [
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/check-addon-fingerprint-residue.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/addon-fingerprint-residue.ts",
      "ts-file:code:packages/temper/shared/build-deploy/checks/src/addon-fingerprint-residue.manifest.ts",
    ],
    script: "temper/shared-build-deploy-checks/src/check-addon-fingerprint-residue.ts",
  },
  {
    name: "lib-sets-stale-capture",
    dispatchNodeTypes: [{ kind: "ts-file", under: "temper" }],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-lib-sets-stale-capture.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-lib-sets-stale-capture.ts",
  },
  ...addonBundleScanChecks(codeRoot),
  ...ADDON_HELD_TERRITORY_CHECKS,
  ...ADDON_TI_CLEAN_CHECKS,
  ...ADDON_XML_HANDLER_CHECKS,
])
