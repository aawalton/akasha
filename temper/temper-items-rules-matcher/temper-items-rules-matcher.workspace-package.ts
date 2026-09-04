import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperItemsRulesMatcher = {
  id: "01a06151-370e-7f21-be1d-3df9be256684",
  pageTypeSlug: "workspace-package",
  slug: "temper-items-rules-matcher",
  definition: "every item the rules affect, found over the captured holdings",
  manifest: "json",
  partSlugs: [
    "module/compile-rules",
    "module/inventory-item-classifier",
    "module/inventory-rule-matcher",
    "module/inventory-rule-matcher-allocators",
    "module/inventory-rule-matcher-cache",
    "module/inventory-rule-matcher-exclude",
    "module/inventory-rule-matcher-fill-once",
    "module/inventory-rule-matcher-property-fixtures",
    "module/rule-matcher-context",
    "module/rule-matcher-context-can-level-morphs",
    "module/rule-matcher-context-curse-state",
    "module/rule-matcher-context-equipment",
    "module/rule-matcher-context-knowledge",
    "module/rule-matcher-context-skill-lines",
    "module/web-eval-env",
    "module/web-item-facts",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A matcher answers which items each rule takes and how many.",
    },
    {
      invariantKind: "absence",
      statement: "No code here reaches the game.",
    },
  ],
} as const satisfies WorkspacePackage
