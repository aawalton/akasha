import type { LuaModule } from "@akasha/code-system/lua-module"

export const companionsConfig = {
  id: "01a0611d-84d1-7c75-9512-d3ca1613f0bb",
  pageTypeSlug: "lua-module",
  slug: "companions-config",
  definition: "the one name the companion add-on's saved variables are read back into",
  lua: "lua",
  loadedAs: "TemperCompanionsConfig.lua",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The name starts out empty and the game fills the name from the saved variables file.",
    },
    {
      invariantKind: "departure",
      statement:
        "The game loads the file before the compiled add-on rather than compiling the two as one.",
    },
  ],
} as const satisfies LuaModule
