import type { Module } from "@akasha/code-system/module"

export const leadsGlobal = {
  id: "01a06274-b08a-7c2e-bec4-949ada692ff8",
  pageTypeSlug: "module",
  slug: "leads-global",
  definition: "the table the lead window's markup and other add-ons call into",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "A key on the global table is spelled as the markup that calls the key spells the key.",
    },
    {
      invariantKind: "departure",
      statement: "A key keeps the spelling that key had before this add-on came into akasha.",
    },
    {
      invariantKind: "departure",
      statement: "The function a key is bound to is named as akasha names a function.",
    },
  ],
} as const satisfies Module
