import type { LuaModule } from "@akasha/code-system/lua-module"

export const esoSandboxPrelude = {
  id: "01a06059-2490-71da-a837-990f36920c7e",
  pageTypeSlug: "lua-module",
  slug: "eso-sandbox-prelude",
  definition: "an environment that answers to every name the game's own Lua would reach for",
  lua: "lua",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name the environment does not know answers with a stub.",
    },
    {
      invariantKind: "departure",
      statement: "A stub answers to being called.",
    },
    {
      invariantKind: "departure",
      statement: "A stub answers to being joined onto text as the empty string.",
    },
    {
      invariantKind: "departure",
      statement: "A stub answers to arithmetic as zero.",
    },
    {
      invariantKind: "departure",
      statement: "A stub reached for a field answers with another stub.",
    },
    {
      invariantKind: "departure",
      statement: "A name the caller bans answers with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A banned name is taken off the real globals as well.",
    },
    {
      invariantKind: "departure",
      statement: "A game function known to answer text answers with the empty string.",
    },
    {
      invariantKind: "departure",
      statement: "A game function known to answer a count answers with zero.",
    },
    {
      invariantKind: "departure",
      statement:
        "A game constant the loaded Lua branches on carries the value the game gives that constant.",
    },
    {
      invariantKind: "departure",
      statement: "Loaded Lua runs with this environment in place of the real globals.",
    },
    {
      invariantKind: "departure",
      statement: "A value seeded by the caller is read before any stub is made.",
    },
  ],
} as const satisfies LuaModule
