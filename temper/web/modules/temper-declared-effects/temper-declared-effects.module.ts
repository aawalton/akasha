import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const temperDeclaredEffects = {
  id: "01a0640f-8510-7199-93a8-3fa778720f68",
  type: "module",
  slug: "temper-declared-effects",
  definition: "the action verb Temper registers for effects a page declares",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Loading this module is for registering the verb.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The handler does nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The registration takes the verb id alone.",
    },
  ],
} as const satisfies Module
