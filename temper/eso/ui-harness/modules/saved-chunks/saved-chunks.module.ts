import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const savedChunks = {
  id: "01a15057-cee6-7b18-bcb4-8087e42a33a0",
  type: "page-type/module",
  slug: "saved-chunks",
  definition: "a player's saved variables file parted into chunks the sandbox's Lua takes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "LuaJIT refuses a chunk holding more than 65536 constants.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A table over the chunk size is set empty, then set entry by entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every key and value keeps the text its file wrote, so nothing is read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry with no key is set at the place it holds among the keyless entries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Statements share a chunk while together they fit the chunk size.",
    },
  ],
  createdAt: "2026-10-18T18:48:14.309Z",
  updatedAt: "2026-10-18T18:48:14.309Z",
} as const satisfies Module
