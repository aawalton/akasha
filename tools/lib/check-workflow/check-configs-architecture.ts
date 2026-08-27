import { type CheckConfig, treeShaArgs } from "./check-configs-types"

export const ARCHITECTURE_CHECKS: CheckConfig[] = [
  {
    name: "functional-type",
    dispatchNodeTypes: ["ts-file", "tsx-file", "package"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-functional-type.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/functional-type.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/functional-type-rules.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/functional-type-discriminators.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/functional-type-purity-scan.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-functional-type.ts",
  },
  {
    name: "start-script",
    dispatchNodeTypes: ["ts-file", "package"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-start-script.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/start-script-rules.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-start-script.ts",
  },
  {
    name: "layer-monotonicity",
    dispatchNodeTypes: ["json-file"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-layer-monotonicity.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/layer-monotonicity.ts",
      "ts-file:instructions:tools/lib/check-workflow/functional-type.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-layer-monotonicity.ts",
    args: treeShaArgs,
  },
  {
    name: "temper-type-tier-monotonicity",
    dispatchNodeTypes: [{ kind: "json-file", under: "temper" }],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-temper-type-tier-monotonicity.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/temper-type-tier.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/layer-monotonicity.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-temper-type-tier-monotonicity.ts",
    args: treeShaArgs,
  },
]
