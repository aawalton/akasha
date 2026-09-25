import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const windowSpacing = {
  id: "01a0d970-0df8-7349-bf06-01a5d4515f5c",
  type: "page-type/module",
  slug: "window-spacing",
  definition: "the web's spacing steps, named as a Temper window spaces its controls by them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A step is read from the web's own table rather than written out here.",
    },
  ],
} as const satisfies Module
