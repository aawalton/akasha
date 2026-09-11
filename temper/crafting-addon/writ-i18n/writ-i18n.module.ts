import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const writI18n = {
  id: "01a061c7-e896-7e6c-9bf8-02b9e70effd6",
  type: "module",
  slug: "writ-i18n",
  definition: "turns an id into the name the player's client shows",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key no table and no lookup answers is shown as itself.",
    },
  ],
} as const satisfies Module
