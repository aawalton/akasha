import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const webBuildVersion = {
  id: "01a05c48-deeb-700d-9df1-fad9c81a0a32",
  pageTypeSlug: "workspace-package",
  slug: "web-build-version",
  definition: "the commit a running web build came from",
  manifest: "json",
  partSlugs: ["module/build-sha", "module/live-version", "module/build-sha-define"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A build that cannot say which commit the build came from says so rather than guessing.",
    },
  ],
} as const satisfies WorkspacePackage
