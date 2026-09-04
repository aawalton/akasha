import type { Module } from "@akasha/code-system/module"

export const keybinderScrollList = {
  id: "01a06381-67c1-733c-93c4-841be62e7306",
  pageTypeSlug: "module",
  slug: "keybinder-scroll-list",
  definition: "the account-wide checkbox added to every row of the key-bind list",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row built before the hook was installed is given its checkbox on setup.",
    },
    {
      invariantKind: "departure",
      statement:
        "The checkbox reads indeterminate where the saved keys differ from the bound keys.",
    },
    {
      invariantKind: "departure",
      statement: "Clearing the checkbox drops the action from the account-wide set.",
    },
  ],
} as const satisfies Module
