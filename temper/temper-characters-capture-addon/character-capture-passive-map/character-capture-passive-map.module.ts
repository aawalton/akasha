import type { Module } from "@akasha/code/module"

export const characterCapturePassiveMap = {
  id: "01a0616b-18bf-7c2e-9cbf-644b6da6a01a",
  pageTypeSlug: "module",
  slug: "character-capture-passive-map",
  definition: "which bit of a build hash's passive field each passive skill holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A place in this table is the number a saved build hash has.",
    },
  ],
} as const satisfies Module
