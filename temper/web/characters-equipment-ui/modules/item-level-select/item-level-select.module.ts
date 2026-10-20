import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemLevelSelect = {
  id: "01a15a89-71be-7c8b-9a76-96a6d798f458",
  type: "page-type/module",
  slug: "item-level-select",
  definition: "the control choosing a gear piece's item level in the build editor",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece stating no level is shown at CP160, the level it is priced at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The levels run from CP160 down to CP10, then from level fifty down to one.",
    },
  ],
  createdAt: "2026-10-20T18:18:39.422Z",
  updatedAt: "2026-10-20T18:18:39.422Z",
} as const satisfies Module
