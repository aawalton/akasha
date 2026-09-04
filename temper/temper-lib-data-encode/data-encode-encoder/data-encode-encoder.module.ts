import type { Module } from "@akasha/code-system/module"

export const dataEncodeEncoder = {
  id: "01a06061-969e-7a22-9872-bfd327e2b7c1",
  pageTypeSlug: "module",
  slug: "data-encode-encoder",
  definition: "a Lua value written out as lines of the alphabet with control characters between",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value found in the dictionary is written as an index rather than in full.",
    },
    {
      invariantKind: "departure",
      statement: "An index takes as many characters as the size of that index needs.",
    },
    {
      invariantKind: "departure",
      statement: "A table whose keys run one upward with no gaps is written as an array.",
    },
    {
      invariantKind: "departure",
      statement: "A whole number below 68719476736 is written in the alphabet's own base.",
    },
    {
      invariantKind: "departure",
      statement: "Any other number is written as the text the game gives for that number.",
    },
    {
      invariantKind: "constraint",
      statement: "A string longer than 996 characters is trimmed and the trim is logged.",
    },
    {
      invariantKind: "departure",
      statement: "A line is broken before a control character would carry the line past 998.",
    },
  ],
} as const satisfies Module
