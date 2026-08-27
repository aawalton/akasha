import type { CheckConfig } from "./check-configs-types"

export const ADDON_HELD_TERRITORY_CHECKS: CheckConfig[] = [
  {
    name: "held-addon-structure",
    dispatchNodeTypes: [{ kind: "ts-file", under: "temper" }],
    dispatchNodes: [
      "ts-file:instructions:tools/commands/check-held-addon-structure.ts",
      "ts-file:instructions:tools/lib/check-workflow/held-addon-structure.ts",
      "ts-file:instructions:tools/lib/check-workflow/territory-map.ts",
      "json-file:instructions:tools/lib/check-workflow/territory-map.json",
    ],
    script: "tools/commands/check-held-addon-structure.ts",
    args: (ci) => ["--code-root", ci.workspace],
  },
]
