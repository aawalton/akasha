import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperItemsRulesEval = {
  id: "01a06137-f96e-7a28-9f74-f5d1bea03036",
  pageTypeSlug: "workspace-package",
  slug: "temper-items-rules-eval",
  definition:
    "whether a compiled inventory rule matches one item, and where a matching rule sends that item",
  manifest: "json",
  partSlugs: [
    "module/build-item-facts-from-inventory-item",
    "module/category-match",
    "module/check-classification",
    "module/check-container",
    "module/check-container-fixtures",
    "module/check-cross-character-craft",
    "module/check-equip-target",
    "module/check-flags",
    "module/check-knowledge",
    "module/check-location",
    "module/check-numeric",
    "module/check-potion-effects",
    "module/check-result",
    "module/check-stack-fullness",
    "module/check-stock",
    "module/compute-stock-groups",
    "module/craft-inference",
    "module/destination-resolve",
    "module/eval-env",
    "module/eval-result",
    "module/evaluator",
    "module/item-facts",
    "module/rule-condition-eval",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A condition answers with a verdict of four kinds rather than with true or false.",
    },
    {
      invariantKind: "departure",
      statement:
        "A signal the environment cannot answer makes the condition indeterminate rather than failed.",
    },
    {
      invariantKind: "departure",
      statement: "The environment holding every lookup is handed in rather than reached for.",
    },
    {
      invariantKind: "absence",
      statement: "No code here reaches the game client.",
    },
  ],
} as const satisfies WorkspacePackage
