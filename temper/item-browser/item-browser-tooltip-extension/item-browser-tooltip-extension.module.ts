import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const itemBrowserTooltipExtension = {
  id: "01a06178-3722-761a-a485-c7c7a934b42e",
  type: "module",
  slug: "item-browser-tooltip-extension",
  definition: "the collection lines this add-on adds under an item's tooltip",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A collection slot is typed as an id64 here rather than as a number.",
    },
  ],
} as const satisfies Module
