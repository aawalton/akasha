import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperBuildSupport = {
  id: "01a0609f-53f7-7460-afb2-168bb75adada",
  pageTypeSlug: "workspace-package",
  slug: "temper-build-support",
  definition: "what a character build and a companion build are both handled with",
  manifest: "json",
  partSlugs: [
    "module/automation-settings",
    "module/build-url",
    "module/eso-name",
    "module/row-grouping",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A character build and a companion build are handled alike wherever the two agree.",
    },
    {
      invariantKind: "absence",
      statement: "No build is worked out here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies WorkspacePackage
