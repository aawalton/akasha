import type { Module } from "@akasha/code-system/module"

export const addonMenuWidgetIconpickerMenu = {
  id: "01a06100-0000-7000-8000-000000000024",
  pageTypeSlug: "module",
  slug: "addon-menu-widget-iconpicker-menu",
  definition: "the pooled grid of selectable icons shown as a floating window",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Icon controls are taken from an object pool and released together.",
    },
    {
      invariantKind: "departure",
      statement: "The menu closes after two global mouse-ups outside its own window.",
    },
    {
      invariantKind: "constraint",
      statement: "Icon size is never smaller than twenty-eight pixels.",
    },
    {
      invariantKind: "departure",
      statement: "The menu is a top-level window rather than a child of the picker control.",
    },
  ],
} as const satisfies Module
