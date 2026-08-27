import { IMAGES } from "../workflow-dsl/images"
import type { CheckConfig } from "./check-configs-types.ts"

export const SHELL_CHECKS: CheckConfig[] = [
  {
    name: "shellcheck",
    image: IMAGES.UNIVERSAL,
    dispatchNodeTypes: ["sh-file"],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-shellcheck.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/shellcheck-violations.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-shellcheck.ts",
  },
]
