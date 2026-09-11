import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const compareKey = {
  id: "01a08dda-ba3d-771b-88b6-4c155f7decb0",
  type: "module",
  slug: "compare-key",
  definition: "text lowered to letters and digits parted by single spaces, for comparing against",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run of anything but a letter or a digit becomes one space.",
    },
    {
      invariantKind: "departure",
      statement: "A key carries no space at either end.",
    },
    {
      invariantKind: "departure",
      statement: "A letter outside the English alphabet is no letter here.",
    },
  ],
} as const satisfies Module
