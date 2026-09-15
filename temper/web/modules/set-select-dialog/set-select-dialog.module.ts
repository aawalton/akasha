import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setSelectDialog = {
  id: "01a0642d-9a17-737e-aba1-6edefa44c29f",
  type: "page-type/module",
  slug: "set-select-dialog",
  definition: "the dialog a gear set is chosen in, searched and filtered by where it drops",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A set shows the wildcard icon the set has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set with no wildcard icon shows its weapon wildcard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set with no weapon wildcard shows its armor wildcard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set with no armor wildcard shows the icon of its alphabetically first slot.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "No set has a wildcard icon today.",
    },
  ],
} as const satisfies Module
