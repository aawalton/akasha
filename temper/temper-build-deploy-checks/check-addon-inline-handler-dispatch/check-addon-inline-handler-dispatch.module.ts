import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkAddonInlineHandlerDispatch = {
  id: "01a062a8-e76a-7a87-8a19-f63843b41826",
  pageTypeSlug: "module",
  slug: "check-addon-inline-handler-dispatch",
  definition: "the run judging whether every governed inline markup handler is a single dispatch",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The population the run states is the markup the roster's add-ons hold.",
    },
    {
      invariantKind: "constraint",
      statement: "Markup a build wrote is counted and left unjudged.",
    },
    {
      invariantKind: "constraint",
      statement: "A run judging no markup still says how much markup the add-ons held.",
    },
    {
      invariantKind: "constraint",
      statement: "The run names every namespace the run governs.",
    },
  ],
} as const satisfies Module
