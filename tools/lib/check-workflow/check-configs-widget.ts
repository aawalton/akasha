import type { CheckConfig } from "./check-configs-types.ts"
import { PAYLOAD_MIRRORS } from "./widget-payload-shape-mirror.ts"

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
    dispatchNodeTypes: [
      { kind: "swift-file", under: "akasha:native-shell/alanwalton/ios-widget" },
      { kind: "swift-file", under: "akasha:akasha/code-system/ios-component/ios-components" },
    ],
    dispatchNodes: [...CANONICAL_SEEDS, ...DECLARED_SEEDS],
    script: "infra/cluster-checks/src/checks/check-widget-payload-shape-mirror.ts",
  },
]
