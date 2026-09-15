import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudAddonHideInit = {
  id: "01a061c5-18dd-700d-bb0a-48630caac89d",
  type: "page-type/module",
  slug: "hud-addon-hide-init",
  definition:
    "the registration of every catalog part as hideable under the player's stored setting",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A part the player has said nothing about is shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The performance meter is the one part hidden by default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hiding is carried out again whenever the HUD scene changes state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hiding is carried out again whenever the player is activated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Registration happens once.",
    },
  ],
} as const satisfies Module
