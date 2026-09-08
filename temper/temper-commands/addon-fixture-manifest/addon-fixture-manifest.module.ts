import type { Module } from "@akasha/code/module"

export const addonFixtureManifest = {
  id: "01a07c93-f240-7b33-9d06-f8459b129064",
  pageTypeSlug: "module",
  slug: "addon-fixture-manifest",
  definition: "the addon manifest a test writes into a scratch world",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fixture manifest is named and titled for the addon named.",
    },
    {
      invariantKind: "departure",
      statement: "A fixture manifest depends on nothing and saves nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A fixture manifest has the fields the addon roster reads.",
    },
    {
      invariantKind: "departure",
      statement: "A test writing a manifest to disk takes the manifest as JSON text.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
