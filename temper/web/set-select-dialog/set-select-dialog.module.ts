import type { Module } from "@akasha/code/module"

export const setSelectDialog = {
  id: "01a0642d-9a17-737e-aba1-6edefa44c29f",
  pageTypeSlug: "module",
  slug: "set-select-dialog",
  definition: "the dialog a gear set is chosen in, searched and filtered by where it drops",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A set shows the wildcard icon the set has.",
    },
    {
      invariantKind: "departure",
      statement: "A set with no wildcard icon shows its weapon wildcard.",
    },
    {
      invariantKind: "departure",
      statement: "A set with no weapon wildcard shows its armor wildcard.",
    },
    {
      invariantKind: "departure",
      statement: "A set with no armor wildcard shows the icon of its alphabetically first slot.",
    },
    {
      invariantKind: "constraint",
      statement: "No set has a wildcard icon today.",
    },
  ],
} as const satisfies Module
