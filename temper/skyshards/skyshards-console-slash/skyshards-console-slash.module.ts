import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const skyshardsConsoleSlash = {
  id: "01a061a8-9c62-78e5-91ec-72c7e0cd50ec",
  pageTypeSlug: "module",
  type: "module",
  slug: "skyshards-console-slash",
  definition: "the slash command that prints where the player is",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Both a console and a computer print the player's position from this one rule.",
    },
  ],
} as const satisfies Module
