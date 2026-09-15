import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shortenedToWords = {
  id: "01a08dda-ba3d-7755-aec3-5b1b18ab7233",
  type: "module",
  slug: "shortened-to-words",
  definition: "a dash-parted name shortened to the whole words that fit inside a length",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name already inside the length is given back as that name is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word is dropped whole rather than parted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A first word filling the length on its own is parted mid-word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shortened name ends in no dash.",
    },
  ],
} as const satisfies Module
