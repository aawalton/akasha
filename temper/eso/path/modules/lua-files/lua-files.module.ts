import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const luaFiles = {
  id: "01a06919-a938-7c99-866b-0f9382740997",
  type: "page-type/module",
  slug: "lua-files",
  definition: "every Lua file under a directory, however deep it sits",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A directory that cannot be read answers with no files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry that cannot be examined is left out rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file is answered as the path that file was found at.",
    },
  ],
  createdAt: "2026-09-03T21:08:04.536Z",
  updatedAt: "2026-09-21T14:14:20.000Z",
} as const satisfies Module
