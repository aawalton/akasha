import type { Module } from "@akasha/code-system/module"

export const hudAddonCommandRegistry = {
  id: "01a061c5-18dd-7005-aefe-12af16504617",
  pageTypeSlug: "module",
  slug: "hud-addon-command-registry",
  definition: "the Temper subcommands every add-on has registered, kept in registration order",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command registered twice under one name replaces the earlier command in place.",
    },
    {
      invariantKind: "departure",
      statement: "A command is found by the name that command registered under.",
    },
  ],
} as const satisfies Module
