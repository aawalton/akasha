import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const equipmentSignatureCompiler = {
  id: "01a06276-e3e7-73dc-b7c5-e02a70f1c789",
  type: "page-type/module",
  slug: "equipment-signature-compiler",
  definition: "a build's wanted gear written as the game's own item numbers",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot with no trait yields no signature.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shield is read as an off-hand with an armor trait.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A two-handed main hand leaves the off-hand unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A player weapon type, armor weight or quality takes the number its constant page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An equip type or companion quality takes the number its constant page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A player armor or jewelry slot takes the number of the equip type page it links.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon or shield takes the number of its one-hand, two-hand or off-hand page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quality no constant page numbers takes the default quality's number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The weapon bars walked are the weapon bar pages, in their display order.",
    },
  ],
} as const satisfies Module
