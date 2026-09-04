import type { LuaModule } from "@akasha/code-system/lua-module"

export const inventoryConfigFile = {
  id: "01a06258-b536-7417-855d-e9bd5aa14816",
  pageTypeSlug: "lua-module",
  slug: "inventory-config-file",
  definition: "the one name the inventory add-on's config is read back into",
  lua: "lua",
  loadedAs: "TemperInventoryConfig.lua",
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
