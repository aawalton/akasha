import type { CheckConfig } from "./check-configs-types"

export const ADDON_TI_CLEAN_CHECKS: CheckConfig[] = [
  {
    name: "ti-clean-source-zero",
    dispatchNodeTypes: [{ kind: "ts-file", under: "packages/temper" }],
    dispatchNodes: [
      "ts-file:instructions:tools/commands/check-ti-clean-source-zero.ts",
      "ts-file:instructions:tools/lib/check-workflow/ti-clean-source-zero.ts",
      "ts-file:instructions:tools/lib/check-workflow/territory-map.ts",
      "json-file:instructions:tools/lib/check-workflow/territory-map.json",
    ],
    script: "tools/commands/check-ti-clean-source-zero.ts",
    args: (ci) => ["--code-root", ci.workspace],
  },
]
