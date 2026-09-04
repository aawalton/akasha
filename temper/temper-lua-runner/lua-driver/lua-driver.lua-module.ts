import type { LuaModule } from "@akasha/code-system/lua-module"

export const luaDriver = {
  id: "01a06059-248f-7c70-9dae-f3a0aaf537b3",
  pageTypeSlug: "lua-module",
  slug: "lua-driver",
  definition: "the loop a Lua subprocess runs, reading scripts in and writing answers back",
  lua: "lua",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A script arrives as lines closed by a run sentinel of its own.",
    },
    {
      invariantKind: "departure",
      statement: "An answer is one JSON document closed by a done sentinel of its own.",
    },
    {
      invariantKind: "departure",
      statement: "An answer says whether the script ran and carries either a value or an error.",
    },
    {
      invariantKind: "departure",
      statement: "A script that fails to compile answers as an error rather than ending the loop.",
    },
    {
      invariantKind: "departure",
      statement: "A script that throws answers as an error rather than ending the loop.",
    },
    {
      invariantKind: "departure",
      statement: "A table whose keys run one upward with no gap is written as a JSON array.",
    },
    {
      invariantKind: "departure",
      statement: "Every other table is written as a JSON object.",
    },
    {
      invariantKind: "departure",
      statement: "A number JSON cannot carry is written as a tagged object.",
    },
    {
      invariantKind: "departure",
      statement: "A function is written as a tagged object rather than as a value.",
    },
    {
      invariantKind: "departure",
      statement: "Closed input ends the loop.",
    },
  ],
} as const satisfies LuaModule
