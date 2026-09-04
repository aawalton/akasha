import type { Module } from "@akasha/code-system/module"

export const hudComponentRecord = {
  id: "01a060a4-fa39-7073-a59e-f1228678be33",
  pageTypeSlug: "module",
  slug: "hud-component-record",
  definition: "what is known about one part of the game's HUD",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A record names the ESO global the part is reached by.",
    },
    {
      invariantKind: "departure",
      statement: "A record names which of the three HUD scenes show the part.",
    },
    {
      invariantKind: "departure",
      statement: "A record names the line of the game source the part was found on.",
    },
    {
      invariantKind: "departure",
      statement: "A record carrying a field beyond the named ones is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
