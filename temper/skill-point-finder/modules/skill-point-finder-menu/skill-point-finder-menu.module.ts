import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillPointFinderMenu = {
  id: "01a060ec-5840-75bd-916c-91a32fd40413",
  type: "page-type/module",
  slug: "skill-point-finder-menu",
  definition: "the skill point window's settings inside the game's own add-on menu",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A setting is held per character rather than per account.",
    },
  ],
} as const satisfies Module
