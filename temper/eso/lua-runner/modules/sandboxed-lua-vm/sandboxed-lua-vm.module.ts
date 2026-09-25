import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sandboxedLuaVm = {
  id: "01a06059-2493-7f9b-a205-1e78ff949f76",
  type: "page-type/module",
  slug: "sandboxed-lua-vm",
  definition: "a Lua VM whose globals answer as the game's globals would",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The prelude is loaded from the file beside the prelude's own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The prelude file is read once and kept for every VM after the first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The banned names are handed over before the prelude loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the game strips is banned as the sandbox manifest names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The VM bans `debug`, `os` and `loadstring` too, in a list of its own.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The interpreter's own `debug` and `os` reach the machine the VM runs on.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A chunk `loadstring` makes runs among the interpreter's globals, not the game's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lua the caller names is loaded among the real globals after the prelude.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seeded value waits until the next source is loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seeded value no Lua literal can carry is seeded as a stub instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seeded function is seeded as a stub.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Source is handed over as one long literal rather than as an escaped string.",
    },
  ],
} as const satisfies Module
