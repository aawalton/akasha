import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const wholeNumberIn = {
  id: "01a08dfa-83ab-7057-b41a-60b238c8d728",
  type: "module",
  slug: "whole-number-in",
  definition: "the whole number text spells, or nothing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A whole number is digits alone.",
    },
    {
      invariantKind: "departure",
      statement: "A sign, a point or a space makes the text no whole number.",
    },
    {
      invariantKind: "departure",
      statement: "Digits running past the largest number there is are no whole number.",
    },
    {
      invariantKind: "gap",
      statement: "Digits naming a number past the last exact one are answered rounded.",
    },
  ],
} as const satisfies Module
