import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperExplain = {
  id: "01a06036-188b-7300-a40a-cf64d7d65a8b",
  pageTypeSlug: "workspace-package",
  slug: "temper-explain",
  definition: "an account of what the inventory rules did to one item",
  manifest: "json",
  partSlugs: ["module/explain-walk"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An account here covers one item.",
    },
    {
      invariantKind: "departure",
      statement:
        "An account names every rule the item met rather than the rule that took the item.",
    },
  ],
} as const satisfies WorkspacePackage
