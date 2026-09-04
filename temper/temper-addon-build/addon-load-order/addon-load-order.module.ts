import type { Module } from "@akasha/code-system/module"

export const addonLoadOrder = {
  id: "01a062d1-4a70-7b3c-9e21-6d0a51f4c7e8",
  pageTypeSlug: "module",
  slug: "addon-load-order",
  definition: "the manifest the game reads to decide what an addon loads and in what order",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The manifest is written from what the addon's own manifest declares.",
    },
    {
      invariantKind: "departure",
      statement: "The Lua the manifest names is the bundle the compiler settings declare.",
    },
    {
      invariantKind: "departure",
      statement:
        "An addon folder carrying no compiler settings has settings written before the bundle is read.",
    },
    {
      invariantKind: "departure",
      statement: "The catalog addon alone takes its api version from the catalog domain pages.",
    },
    {
      invariantKind: "departure",
      statement: "That version is the lowest any domain being collected last ran a generator for.",
    },
    {
      invariantKind: "absence",
      statement: "A catalog domain left alone counts toward no version.",
    },
    {
      invariantKind: "constraint",
      statement: "A domain being collected that states no version refuses the call.",
    },
    {
      invariantKind: "gap",
      statement: "The catalog version is as current as the last rebuild of the index.",
    },
    {
      invariantKind: "departure",
      statement: "A dependency floor of zero is written as the bare addon name.",
    },
    {
      invariantKind: "departure",
      statement: "The build stamp is the first eight hex of the commit the addon folder is at.",
    },
    {
      invariantKind: "departure",
      statement: "A stamp the environment names holds over the commit.",
    },
    {
      invariantKind: "departure",
      statement: "Markup is listed only where the addon's metadata folder holds that markup.",
    },
  ],
} as const satisfies Module
