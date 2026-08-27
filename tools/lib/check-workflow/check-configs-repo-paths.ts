import type { CheckConfig } from "./check-configs-types.ts"

export const REPO_PATH_CHECKS: CheckConfig[] = [
  {
    name: "repo-paths",
    alwaysRun: true,
    dispatchNodeTypes: ["md-file"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-repo-paths.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/repo-files.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/repo-path-resolver.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/ts-path-literals.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-repo-paths.ts",
  },
]
