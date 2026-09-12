import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryEvalEnv = {
  id: "01a068e2-226d-7781-8c70-c328fa164cff",
  type: "module",
  slug: "inventory-eval-env",
  definition: "what a rule walk off the game can answer about a character and what it cannot",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fact only the running game knows is answered unknown rather than guessed.",
    },
    {
      invariantKind: "departure",
      statement: "A character knows a recipe or a motif or a script and nothing else.",
    },
    {
      invariantKind: "departure",
      statement:
        "A motif with no chapter named is known where every chapter of that motif is known.",
    },
    {
      invariantKind: "departure",
      statement: "A style the chapter table has never heard of is known by nobody.",
    },
    {
      invariantKind: "departure",
      statement: "A skill line rank comes from the characters capture rather than from the game.",
    },
    {
      invariantKind: "departure",
      statement:
        "A crafting rank and the two transmute crystal figures come from the inventory capture.",
    },
    {
      invariantKind: "departure",
      statement: "A cooldown group is worked out from the name of a container the capture holds.",
    },
    {
      invariantKind: "departure",
      statement: "A cooldown group the capture records no expiry for reads as expired.",
    },
    {
      invariantKind: "departure",
      statement: "A skill line the capture never names reads as absent rather than as rank zero.",
    },
    {
      invariantKind: "gap",
      statement: "Whether a character can level a morph is answered off the game.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here talks to the game.",
    },
  ],
} as const satisfies Module
