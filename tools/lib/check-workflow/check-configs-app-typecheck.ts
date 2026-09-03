import type { AppBuildTarget } from "../../../akasha/checks/cluster-checks/modules/app-build-packages/app-build-packages.module.code.ts"
import type { CheckConfig } from "./check-configs-types"

const POPULATION_PREFIX = "[app-typecheck] population:"

function populationCommand(apps: readonly AppBuildTarget[]): string {
  if (apps.length === 0)
    return `echo '${POPULATION_PREFIX} 0 deployed apps. No workspace declares a build script, so this gate examined nothing and certifies nothing.' >&2 && exit 1`
  const dirs = apps.map((a) => a.dir).join(" ")
  return `echo '${POPULATION_PREFIX} ${apps.length} deployed app(s): ${dirs}'`
}

export function buildAppTypecheckChecks(
  apps: readonly AppBuildTarget[]
): readonly [CheckConfig, ...(readonly CheckConfig[])] {
  const sorted = [...apps].sort((a, b) => a.dir.localeCompare(b.dir))
  return [
    {
      name: "app-typecheck",
      dependsOn: ["typecheck"],
      dispatchNodes: [
        ...sorted.map((a) => `package:code:${a.name}`),
        "ts-file:code:tools/lib/check-workflow/check-configs-app-typecheck.ts",
      ],
      environment: {
        NEXT_PUBLIC_SUPABASE_URL: "https://placeholder.invalid",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "placeholder-anon-key",
        NEXT_PUBLIC_ELECTRIC_URL: "https://placeholder.invalid/electric/v1/shape",
      },
      backendOptions: {
        kubernetes: {
          resources: { requests: { cpu: "1500m", memory: "1500Mi" }, limits: { memory: "4Gi" } },
        },
      },
      commands: (ci) => [
        populationCommand(sorted),
        ...sorted.map(
          (a) => `cd ${ci.workspace}/${a.dir} && mkdir -p node_modules && bun run typecheck`
        ),
      ],
    },
  ]
}
