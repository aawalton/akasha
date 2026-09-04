import type { EsoAddon } from "../../code-system/eso-addons/eso-addon.page-type.ts"

export const temperLibCustomMenu = {
  id: "01a0605a-581c-7eb1-aaf7-831f236462fa",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-custom-menu",
  definition: "an addon library adding sub-menus, dividers and headers to the game's context menus",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "custom-menu-main",
  partSlugs: [
    "module/custom-menu-casts",
    "module/custom-menu-constants",
    "module/eso-menu",
    "module/custom-menu-hooks",
    "module/custom-menu-lib",
    "module/custom-menu-main",
    "module/menu-row-factories",
    "module/custom-menu-public-api",
    "module/submenu-item",
    "module/submenu-window",
    "module/submenu-text-colors",
    "module/submenu-timeout",
    "module/custom-menu-types",
    "module/menu-row-setup",
    "type-declaration/custom-menu-declarations",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The game's own menu functions are wrapped rather than replaced.",
    },
    {
      invariantKind: "departure",
      statement: "A custom entry is drawn from a control pool this library owns.",
    },
    {
      invariantKind: "departure",
      statement: "Context menu callbacks fire in category order from early to late.",
    },
    {
      invariantKind: "departure",
      statement: "A sub-menu opens once the mouse has rested on its parent row.",
    },
    {
      invariantKind: "departure",
      statement: "The player and social list menus are hooked only on the keyboard interface.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller reaches this library through a game global rather than an import.",
    },
  ],
} as const satisfies EsoAddon
