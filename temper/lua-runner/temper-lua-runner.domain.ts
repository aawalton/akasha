import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperLuaRunner = {
  id: "01a06059-248e-7afb-9115-253f8636048f",
  type: "domain",
  slug: "temper-lua-runner",
  definition: "a Lua 5.1 interpreter kept alive in a subprocess and talked to over a pipe",
  parts: [
    "lua-module/eso-sandbox-prelude",
    "lua-module/lua-driver",
    "module/lua-marshal",
    "module/lua-number-string",
    "module/lua-protocol",
    "module/lua-vm",
    "module/persistent-vm",
    "module/sandboxed-lua-vm",
  ],
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "The interpreter is the `lua5.1` binary on the path rather than a binary bundled here.",
    },
    {
      invariantKind: "departure",
      statement: "One subprocess answers many scripts in turn.",
    },
    {
      invariantKind: "departure",
      statement: "A value crosses back from Lua as JSON.",
    },
    {
      invariantKind: "departure",
      statement: "A value crosses into Lua as a Lua literal written out here.",
    },
    {
      invariantKind: "departure",
      statement: "The Lua the subprocess loads first is a file beside a page rather than a string.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here compiles TypeScript to Lua.",
    },
  ],
} as const satisfies Domain
