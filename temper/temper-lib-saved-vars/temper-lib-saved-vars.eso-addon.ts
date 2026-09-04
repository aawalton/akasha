import type { EsoAddon } from "@akasha/code-system/eso-addon"

export const temperLibSavedVars = {
  id: "01a06177-abf7-7c8b-83f6-be2b40de177e",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-saved-vars",
  definition: "one addon's settings kept per character, per account or per server",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "saved-vars-main",
  partSlugs: [
    "module/saved-vars-types",
    "module/saved-vars-casts",
    "module/saved-vars-constants",
    "module/saved-vars-registry",
    "module/saved-vars-lib-state",
    "module/saved-vars-ui-strings",
    "module/saved-vars-protected-migrate",
    "module/saved-vars-protected",
    "module/saved-vars-lib-core",
    "module/saved-vars-manager-state",
    "module/saved-vars-manager-core",
    "module/saved-vars-manager",
    "module/saved-vars-data-state",
    "module/saved-vars-data-helpers",
    "module/saved-vars-data-active",
    "module/saved-vars-data-constructors",
    "module/saved-vars-data-iterator",
    "module/saved-vars-data-migrate",
    "module/saved-vars-data-settings",
    "module/saved-vars-data",
    "module/saved-vars-lib-overrides",
    "module/saved-vars-public-api",
    "module/saved-vars-main",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A setting is read from the character scope or from the account scope.",
    },
    {
      invariantKind: "departure",
      statement: "The account-wide scope and the character scope hold the same setting names.",
    },
    {
      invariantKind: "departure",
      statement: "A saved variable table is read the first time a setting is asked for.",
    },
    {
      invariantKind: "departure",
      statement: "The game's own saved variable constructors are wrapped rather than replaced.",
    },
    {
      invariantKind: "departure",
      statement: "A setting equal to the default is dropped as the player logs out.",
    },
    {
      invariantKind: "departure",
      statement: "A dropped default is put back where the logout is cancelled.",
    },
    {
      invariantKind: "departure",
      statement: "A version number rises only once the settings that version renames have moved.",
    },
    {
      invariantKind: "departure",
      statement: "An addon switches scope through a checkbox this library hands that addon.",
    },
    {
      invariantKind: "departure",
      statement: "A migration leaves the table the migration read from empty.",
    },
    {
      invariantKind: "constraint",
      statement: "A table is iterated raw only where LibLua5.2 is loaded.",
    },
  ],
} as const satisfies EsoAddon
