import { type CheckConfig, treeShaArgs } from "./check-configs-types"

export const K8S_CHECKS: CheckConfig[] = [
  {
    name: "k8s-node-selector",
    dispatchNodeTypes: ["yaml-file", "yml-file", "ts-file", "tsx-file"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-k8s-node-selector.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/k8s-node-selector.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/non-test-population.ts",
      "ts-file:instructions:akasha/infrastructure/k8s-types/k8s-manifest-scanner/k8s-manifest-scanner.module.code.ts",
      "ts-file:instructions:akasha/infrastructure/k8s-types/hostnames/hostnames.module.code.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-k8s-node-selector.ts",
    args: treeShaArgs,
  },
  {
    name: "checksum-annotation-substitution",
    alwaysRun: true,
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-checksum-annotation-substitution.ts",
      "ts-file:instructions:tools/lib/check-workflow/checksum-annotation-substitution.ts",
      "ts-file:instructions:tools/lib/check-workflow/blank-comments.ts",
      "ts-file:instructions:tools/lib/check-workflow/checksum-annotation-pairing.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-checksum-annotation-substitution.ts",
  },
]
