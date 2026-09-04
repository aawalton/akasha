import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const webStaticAssets = {
  id: "01a05c48-deeb-7005-87e8-e99206ff06ca",
  pageTypeSlug: "workspace-package",
  slug: "web-static-assets",
  definition: "a built file handed back from disk with the cache lifetime it is given",
  manifest: "json",
  partSlugs: ["module/serve-static"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hashed asset is cached for a year and everything else for an hour.",
    },
  ],
} as const satisfies WorkspacePackage
