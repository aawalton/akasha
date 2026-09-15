import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const potionControlsIngredients = {
  id: "01a08e6b-e041-7bef-ba7a-afd8c380848d",
  type: "page-type/module",
  slug: "potion-controls-ingredients",
  definition: "builds the solvent and reagent buttons the potion window is filtered by",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A button is built once and hidden again rather than built a second time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reagents are ordered by stack or by name as the account settings say.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reagent already ticked stays ticked when the buttons are laid out again.",
    },
  ],
} as const satisfies Module
