import type { EsoAddon } from "@akasha/code-system/eso-addon"

export const temperLibMainMenu = {
  id: "01a0605b-c805-73f4-b1b0-5aa7831a19d4",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-main-menu",
  definition: "a shared library adding entries to the game's main menu bar",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "main-menu-entry",
  partSlugs: [
    "module/main-menu-casts",
    "module/main-menu-entry",
    "module/main-menu-keyboard",
    "module/main-menu-library",
    "module/main-menu-publish",
    "module/main-menu-setup",
    "module/main-menu-shape",
    "module/main-menu-version",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An addon reaches this library through a global name rather than by importing.",
    },
    {
      invariantKind: "departure",
      statement: "The bars this library puts up are built in code rather than declared in XML.",
    },
    {
      invariantKind: "constraint",
      statement: "A console client is handed no library.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing here reaches a Date.",
    },
  ],
} as const satisfies EsoAddon
