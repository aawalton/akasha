import type { Module } from "@akasha/code/module"

export const temperDeclaredEffects = {
  id: "01a0640f-8510-7199-93a8-3fa778720f68",
  pageTypeSlug: "module",
  slug: "temper-declared-effects",
  definition: "the action verb Temper registers for effects a page declares",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Loading this module is for registering the verb.",
    },
    {
      invariantKind: "departure",
      statement: "The handler does nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The registration takes the verb id alone.",
    },
  ],
} as const satisfies Module
