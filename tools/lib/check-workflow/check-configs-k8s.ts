import { type CheckConfig, treeShaArgs } from "./check-configs-types"

export const K8S_CHECKS: CheckConfig[] = [
  {
    name: "k8s-node-selector",
    dispatchNodeTypes: ["yaml-file", "yml-file", "ts-file", "tsx-file"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-k8s-node-selector.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/k8s-node-selector.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/non-test-population.ts",
      "ts-file:instructions:infra/k8s-types/src/k8s-manifest-scanner.ts",
      "ts-file:instructions:infra/k8s-types/src/hostnames.ts",
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
