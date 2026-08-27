import type { CheckConfig } from "./check-configs-types"

export const VERIFICATION_SURFACE_CHECKS: CheckConfig[] = [
  {
    name: "no-orphan-source",
    alwaysRun: true,
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-no-orphan-source.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/orphan-source.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-no-orphan-source.ts",
  },
  {
    name: "cli-json-contract-coupling",
    dispatchNodeTypes: ["ts-file", "tsx-file"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-cli-json-contract-coupling.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/cli-json-contract-coupling.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-cli-json-contract-coupling.ts",
  },
  {
    name: "git-guard-both-forms",
    alwaysRun: true,
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-git-guard-both-forms.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-git-guard-both-forms.ts",
  },
  {
    name: "guarded-resolve",
    dispatchNodeTypes: ["ts-file", "tsx-file"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-guarded-resolve.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/guarded-resolve.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-guarded-resolve.ts",
  },
  {
    name: "env-unset-bash",
    alwaysRun: true,
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-env-unset-bash.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/env-unset-bash.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-env-unset-bash.ts",
  },
]
