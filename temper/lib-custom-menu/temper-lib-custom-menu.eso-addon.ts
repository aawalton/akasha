import type { EsoAddon } from "akasha/code/eso-addon/eso-addon.page-type.types.ts"

export const temperLibCustomMenu = {
  id: "01a0605a-581c-7eb1-aaf7-831f236462fa",
  type: "eso-addon",
  slug: "temper-lib-custom-menu",
  definition: "an addon library adding sub-menus, dividers and headers to the game's context menus",

  addonManifest: "json",
  bundleEntry: "module/custom-menu-main",
  parts: [
    "module/custom-menu-casts",
    "module/custom-menu-constants",
    "module/custom-menu-hooks",
    "module/custom-menu-lib",
    "module/custom-menu-main",
    "module/custom-menu-public-api",
    "module/custom-menu-types",
    "module/eso-menu",
    "module/menu-row-factories",
    "module/menu-row-setup",
    "module/submenu-item",
    "module/submenu-text-colors",
    "module/submenu-timeout",
    "module/submenu-window",
    "type-declaration/custom-menu-declarations",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The game's own menu functions are wrapped rather than replaced.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A custom entry is drawn from a control pool this library owns.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Context menu callbacks fire in category order from early to late.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sub-menu opens once the mouse has rested on its parent row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The player and social list menus are hooked only on the keyboard interface.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller reaches this library through a game global rather than an import.",
    },
  ],
} as const satisfies EsoAddon
