import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterImport = {
  id: "01a0640f-8510-7c04-b799-f12ba75125ab",
  type: "page-type/module",
  slug: "character-import",
  definition: "a character build decoded from a hash and filed against the reader's account",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader who is not signed in imports nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build is filed under the address of the reader's account page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader with no account page imports nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hash the codec will not decode is refused rather than part-imported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hash the reader already has gives back the build already filed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build named against a game character is live.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build named against no game character is private.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The build name is the race and the class rather than the name the hash had.",
    },
  ],
} as const satisfies Module
