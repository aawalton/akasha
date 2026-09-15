import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const unpackColor = {
  id: "01a090aa-4938-7f89-a924-2a3c86c77dd2",
  type: "module",
  slug: "unpack-color",
  definition: "a color's four numbers handed back as four separate values",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A color is four numbers, in red, green, blue, alpha order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A number a color is missing reads as full.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A red, green or blue the color is missing is handed back as full.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An alpha the color is missing is handed back as nothing.",
    },
  ],
} as const satisfies Module
