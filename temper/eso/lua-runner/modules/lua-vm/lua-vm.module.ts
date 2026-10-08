import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const luaVm = {
  id: "01a06059-2493-7198-a53e-089da757ff6e",
  type: "page-type/module",
  slug: "lua-vm",
  definition: "a Lua subprocess handed out as something that runs scripts and reads globals",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A script that fails throws the error Lua gave rather than answering.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A global is read by running a return of that global's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Stubs the caller hands in are loaded before the caller gets the VM.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Stubs that fail to load close the subprocess rather than leaving the subprocess half set up.",
    },
  ],
  createdAt: "2026-09-02T04:20:49.939Z",
  updatedAt: "2026-09-22T14:05:53.000Z",
} as const satisfies Module
