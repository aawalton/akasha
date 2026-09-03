import { SECRETS, secret } from "@akasha/workflow-language/secrets"
import {
  ADDON_BUNDLE_BUILD_PACKAGES,
  type AppBuildTarget,
  appBuildSlug,
} from "../../../akasha/checks/cluster-checks/modules/app-build-packages/app-build-packages.module.code.ts"
import { BUNDLE_REUSE_DIST_ENV } from "./addons-resolve.ts"
import type { CheckConfig } from "./check-configs-types"

const ADDON_BUILD_CHECK_NAME = "addon-build"

export function buildAppBuildChecks(packages: readonly AppBuildTarget[]): readonly CheckConfig[] {
  return [...packages]
    .sort((a, b) => a.dir.localeCompare(b.dir))
    .map((p) => {
      const chainsAddonBundle = ADDON_BUNDLE_BUILD_PACKAGES.has(p.name)
      return {
        name: `app-build-${appBuildSlug(p.dir)}`,
        dispatchNodes: [
          `package:code:${p.name}`,
          "ts-file:code:tools/lib/check-workflow/check-configs-app-build.ts",
        ],
        ...(chainsAddonBundle ? { dependsOn: [ADDON_BUILD_CHECK_NAME] } : {}),
        environment: {
          NEXT_PUBLIC_SUPABASE_URL: "https://placeholder.invalid",
          NEXT_PUBLIC_SUPABASE_ANON_KEY: "placeholder-anon-key",
          NEXT_PUBLIC_ELECTRIC_URL: "https://placeholder.invalid/electric/v1/shape",
          ...(chainsAddonBundle
            ? {
                SUPABASE_URL: secret(SECRETS.SUPABASE_URL),
                SUPABASE_SERVICE_ROLE_KEY: secret(SECRETS.SUPABASE_SERVICE_ROLE_KEY),
                [BUNDLE_REUSE_DIST_ENV]: "1",
              }
            : {}),
        },
        backendOptions: {
          kubernetes: {
            resources: {
              requests: { cpu: "2000m", memory: chainsAddonBundle ? "2Gi" : "1500Mi" },
              limits: { memory: "4Gi" },
            },
          },
        },
        commands: (ci) => [`cd ${ci.workspace}/${p.dir} && mkdir -p node_modules && bun run build`],
      }
    })
}
