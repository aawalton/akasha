import type { EsoAddon } from "@akasha/code-system/eso-addon"

export const temperKeybinderAddon = {
  id: "01a06381-67c1-79b7-93fa-01801fc096e7",
  pageTypeSlug: "eso-addon",
  slug: "temper-keybinder-addon",
  definition: "the add-on keeping one set of key bindings across every character on the account",
  manifest: "json",
  addonManifest: "json",
  bindings: "xml",
  bundleEntrySlug: "keybinder-entry",
  partSlugs: [
    "module/keybinder-constants",
    "module/keybinder-casts",
    "module/keybinder-state",
    "module/keybinder-keybind-manager",
    "module/keybinder-binding-fns",
    "module/keybinder-binding-utils",
    "module/keybinder-ui-strings",
    "module/keybinder-filter",
    "module/keybinder-scroll-list",
    "module/keybinder-search-box",
    "module/keybinder-share",
    "module/keybinder-keybind-events",
    "module/keybinder-init",
    "module/keybinder-saved-variables",
    "module/keybinder-public-api",
    "module/keybinder-entry",
    "type-declaration/keybinder-declarations",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A binding the player shares is kept for the user profile rather than the character.",
    },
    {
      invariantKind: "departure",
      statement: "Which actions are shared is chosen per action rather than for the whole set.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shared binding is written onto a character the first time that character logs in.",
    },
    {
      invariantKind: "departure",
      statement: "The key-bind window gains a search field the game does not supply.",
    },
    {
      invariantKind: "constraint",
      statement: "The game protects rebinding.",
    },
    {
      invariantKind: "constraint",
      statement: "The game reloads an addon only when the whole client reloads.",
    },
  ],
} as const satisfies EsoAddon
