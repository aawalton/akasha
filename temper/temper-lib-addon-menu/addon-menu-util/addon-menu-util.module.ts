import type { Module } from "@akasha/code-system/module"

export const addonMenuUtil = {
  id: "01a06100-0000-7000-8000-000000000012",
  pageTypeSlug: "module",
  slug: "addon-menu-util",
  definition: "the widget scaffolding and bookkeeping the library publishes as LAM.util",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Half-width controls place the label above the container instead of beside the container.",
    },
    {
      invariantKind: "departure",
      statement: "A help URL becomes a clickable FAQ icon anchored beside the label.",
    },
    {
      invariantKind: "departure",
      statement: "Controls flagged as requiring reload record their value at creation time.",
    },
    {
      invariantKind: "constraint",
      statement: "The published util table is filled in at the bottom of the module.",
    },
  ],
} as const satisfies Module
