import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const panelControlsCreated = {
  id: "01a0909d-e44e-780b-9375-2b6c9bcfcb42",
  pageTypeSlug: "module",
  slug: "panel-controls-created",
  definition: "what runs once the add-on menu has built a panel's controls",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The callback manager is handed in rather than reached as a global.",
    },
    {
      invariantKind: "departure",
      statement: "What was handed in runs for the panel it was given and for no other.",
    },
    {
      invariantKind: "departure",
      statement: "A registration is dropped as what was handed in runs.",
    },
  ],
} as const satisfies Module
