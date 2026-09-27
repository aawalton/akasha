import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const webPhraseLoading = {
  id: "01a0e2a6-e1dc-7c8e-9a60-88c8c76d187c",
  type: "page-type/module",
  slug: "web-phrase-loading",
  definition:
    "the web phrases a route's loader reads on the server, with their names in braces filled",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A loader reads only the phrase pages it names, by slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug no phrase page carries is refused rather than shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A screen a signed-out reader sees reads its phrases here, since that reader reads no page.",
    },
  ],
} as const satisfies Module
