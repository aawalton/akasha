import type { Module } from "@akasha/code-system/module"

export const mainMenuLibrary = {
  id: "01a0605b-c804-7925-99e3-20309a00f020",
  pageTypeSlug: "module",
  slug: "main-menu-library",
  definition: "the menu entries, categories, scenes and scene groups an addon adds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An addon reaches this library only through the methods on the published object.",
    },
    {
      invariantKind: "departure",
      statement: "A category is named by a descriptor rather than by its position on the bar.",
    },
    {
      invariantKind: "departure",
      statement: "A scene group remembers the scene last shown inside that group.",
    },
    {
      invariantKind: "departure",
      statement: "The library sets itself up on the first call that needs the bars.",
    },
  ],
} as const satisfies Module
