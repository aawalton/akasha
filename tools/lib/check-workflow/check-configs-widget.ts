import { PAYLOAD_MIRRORS } from "../../../akasha/checks/cluster-checks/modules/widget-payload-shape-mirror/widget-payload-shape-mirror.module.code.ts"
import type { CheckConfig } from "./check-configs-types.ts"

const CANONICAL_SEEDS: readonly string[] = [
  ...new Set(PAYLOAD_MIRRORS.map((mirror) => `ts-file:code:${mirror.canonical.file}`)),
]

const DECLARED_SEEDS: readonly string[] = [
  "ts-file:code:packages/shared/status-bar-access/src/stoplight-circle.ts",
  "ts-file:instructions:infra/cluster-checks/src/checks/check-widget-payload-shape-mirror.ts",
  "ts-file:instructions:tools/lib/check-workflow/widget-payload-shape-mirror.ts",
  "ts-file:instructions:tools/lib/check-workflow/widget-payloads.ts",
  "ts-file:instructions:tools/lib/check-workflow/widget-wire-vocabulary.ts",
]

export const WIDGET_MIRROR_CHECKS: CheckConfig[] = [
  {
    name: "widget-payload-shape-mirror",
    // One place. Every widget's Swift is an ios-component in akasha; the shells'
    // own ios-widget directories emptied and are gone. Bare, like every other
    // `under` in the tree: this is matched against a repo-relative listing as
    // written, so a repo prefix here selects nothing rather than selecting it.
    dispatchNodeTypes: [{ kind: "swift-file", under: "akasha/code-system/ios-components/pages" }],
    dispatchNodes: [...CANONICAL_SEEDS, ...DECLARED_SEEDS],
    script: "infra/cluster-checks/src/checks/check-widget-payload-shape-mirror.ts",
  },
]
