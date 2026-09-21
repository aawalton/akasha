import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const base64url = {
  id: "01a060b3-77c9-7461-8481-e41383ba9583",
  type: "page-type/module",
  slug: "base64url",
  definition: "the sixty-four characters a byte array is carried by, safe inside a URL",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Three bytes are written as four characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A last group short of three bytes is written without padding.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last two characters of the alphabet are the hyphen and the underscore.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character outside the alphabet is read as zero.",
    },
  ],
} as const satisfies Module
