import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const fcoMap = {
  id: "01a06115-1acf-7c2b-b2a3-d70d8fd0f32b",
  type: "module",
  slug: "fco-map",
  definition: "the world map behaviour the interface tweaks change",
  code: "ts",
  invariants: [
    { invariantKind: "absence", statement: "No shared guard stands behind the table guards here." },
  ],
} as const satisfies Module
