import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setIds = {
  id: "01a060d5-2f12-7886-bf98-e23a2afc639d",
  type: "module",
  slug: "set-ids",
  definition: "every Elder Scrolls Online gear set a character may wear, named as one type",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "This union is written out from the set pages rather than by hand.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "This union names exactly the set keys the set pages have.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "One module with all 707 set ids would pass the byte ceiling.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A set page added while this union is left alone cannot be named in typed code.",
    },
  ],
} as const satisfies Module
