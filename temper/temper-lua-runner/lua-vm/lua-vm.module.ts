import type { Module } from "@akasha/code-system/module"

export const luaVm = {
  id: "01a06059-2493-7198-a53e-089da757ff6e",
  pageTypeSlug: "module",
  slug: "lua-vm",
  definition: "a Lua subprocess handed out as something to run scripts on and read globals from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A script that fails throws the error Lua gave rather than answering.",
    },
    {
      invariantKind: "departure",
      statement: "A global is read by running a return of that global's name.",
    },
    {
      invariantKind: "departure",
      statement: "Stubs the caller hands in are loaded before the caller gets the VM.",
    },
    {
      invariantKind: "departure",
      statement:
        "Stubs that fail to load close the subprocess rather than leaving the subprocess half set up.",
    },
    {
      invariantKind: "departure",
      statement: "A VM handed to a callback is closed once that callback settles either way.",
    },
  ],
} as const satisfies Module
