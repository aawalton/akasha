import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillEquation = {
  id: "01a1403d-d551-75df-ac1b-9f48985d15c4",
  type: "page-type/module",
  slug: "skill-equation",
  definition: "a number a skill's tooltip names, worked out from the equation UESP fit for it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An equation sums each stat times its coefficient, and a constant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stat is the higher of Magicka and Stamina, the power the higher of the two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An equation naming a variable no stat here reads gives no number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tooltip's numbers are the ones the game colors, in the order the text gives them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tooltip's numbers pair in order with the equations that name a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tooltip naming more or fewer numbers than those equations is left unpaired.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A number scaling off a stat is rounded to a whole number, and a constant is kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A constant tagged `+N seconds with <passive>` grows N seconds where the build holds that passive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A damage shield is rounded down, after the bonuses the build holds multiply it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Bastion slotted makes a damage shield 15% stronger.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Bonuses the build holds add to each other before they multiply the number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shield tagged `at most half Health` stops at half the build's Max Health.",
    },
  ],
  createdAt: "2026-10-15T15:45:56.553Z",
  updatedAt: "2026-10-21T02:50:41.512Z",
} as const satisfies Module
