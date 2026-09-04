import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setIdsPToZ = {
  id: "01a060d5-2f13-7e21-ba0a-cad84c827372",
  pageTypeSlug: "module",
  slug: "set-ids-p-to-z",
  definition: "the gear sets keyed under the letters p through z",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One module holding all 707 set ids would pass the byte ceiling.",
    },
  ],
} as const satisfies Module
