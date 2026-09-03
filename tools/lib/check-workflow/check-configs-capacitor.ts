import type { RouterApp } from "../../../akasha/checks/cluster-checks/modules/router-app-discovery/router-app-discovery.module.code.ts"
import type { NodeId } from "../graph/types.ts"
import type { CheckConfig } from "./check-configs-types.ts"

export const CAPACITOR_CHECKS: readonly CheckConfig[] = [
  {
    name: "app-capacitor-parity",
    dispatchNodeTypes: [
      { kind: "ts-file", under: "akasha/alan/web" },
      { kind: "tsx-file", under: "akasha/alan/web" },
      { kind: "ts-file", under: "akasha/alan/web-capacitor" },
      { kind: "tsx-file", under: "akasha/alan/web-capacitor" },
    ],
    dispatchNodes: [
      "ts-file:instructions:infra/cluster-checks/src/checks/check-app-capacitor-parity.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/app-capacitor-parity.ts",
      "ts-file:instructions:infra/cluster-checks/src/lib/app-capacitor-parity.divergences.ts",
    ],
    script: "infra/cluster-checks/src/checks/check-app-capacitor-parity.ts",
  },
]

const CLIENT_ENV_INLINED_INPUTS: readonly NodeId[] = [
  "ts-file:instructions:infra/cluster-checks/src/checks/check-client-env-inlined.ts",
  "ts-file:instructions:infra/cluster-checks/src/lib/client-env-inlined.ts",
  "ts-file:instructions:tools/lib/check-workflow/router-apps.ts",
  "ts-file:instructions:tools/lib/check-workflow/rr-server-module-imports.ts",
  "ts-file:code:packages/shared/supabase/rr/src/vite.ts",
  "ts-file:code:packages/shared/pages/ui/src/vite.ts",
]

export function buildClientEnvInlinedCheck(apps: readonly RouterApp[]): CheckConfig {
  if (apps.length === 0) {
    throw new Error(
      "buildClientEnvInlinedCheck: no React Router app discovered (no react-router.config.ts on disk). The client-env-inlined gate would be composed with an empty watch and dispatch on nothing; repair the discovery rather than composing the workflow without it."
    )
  }
  return {
    name: "client-env-inlined",
    dispatchNodeTypes: apps.flatMap((app) => [
      { kind: "ts-file", under: app.appDir },
      { kind: "tsx-file", under: app.appDir },
    ]),
    dispatchNodes: [
      ...CLIENT_ENV_INLINED_INPUTS,
      ...apps.map((app): NodeId => `ts-file:code:${app.configPath}`),
    ],
    script: "infra/cluster-checks/src/checks/check-client-env-inlined.ts",
  }
}

const RR_SERVER_MODULE_INPUTS: readonly NodeId[] = [
  "ts-file:instructions:infra/cluster-checks/src/checks/check-rr-server-module-in-client.ts",
  "ts-file:instructions:tools/lib/check-workflow/rr-server-module-imports.ts",
  "ts-file:instructions:tools/lib/check-workflow/router-apps.ts",
  "ts-file:instructions:tools/lib/check-workflow/unbuilt-router-apps.ts",
  "ts-file:code:tools/lib/check-workflow/check-configs-app-build.ts",
  "json-file:code:package.json",
]

export function buildRrServerModuleInClientCheck(unbuiltApps: readonly RouterApp[]): CheckConfig {
  if (unbuiltApps.length === 0) {
    throw new Error(
      "buildRrServerModuleInClientCheck: every React Router app on disk has a pre-merge `bun run build` covering it, so this gate would be composed with an empty watch and dispatch on nothing. Retire the check rather than composing the workflow without it."
    )
  }
  return {
    name: "rr-server-module-in-client",
    dispatchNodeTypes: unbuiltApps.flatMap((app) => [
      { kind: "ts-file", under: app.appDir },
      { kind: "tsx-file", under: app.appDir },
    ]),
    dispatchNodes: [
      ...RR_SERVER_MODULE_INPUTS,
      ...unbuiltApps.flatMap((app): readonly NodeId[] => [
        `ts-file:code:${app.configPath}`,
        `json-file:code:${app.buildRoot}/package.json`,
      ]),
    ],
    script: "infra/cluster-checks/src/checks/check-rr-server-module-in-client.ts",
  }
}
