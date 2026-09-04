import type { Module } from "@akasha/code-system/module"

export const questsSlashCommands = {
  id: "01a0635f-391c-7ae6-a1ab-5e89ac12419c",
  pageTypeSlug: "module",
  slug: "quests-slash-commands",
  definition: "the words the player types to turn answering dialogue and tracing on and off",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command is registered with the game whether or not the hud is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "A command is announced to the hud only where the hud is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "The hud is told the name of the addon each command belongs to.",
    },
  ],
} as const satisfies Module
