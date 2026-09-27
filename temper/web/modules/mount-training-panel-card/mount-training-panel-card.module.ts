import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mountTrainingPanelCard = {
  id: "01a06421-f74b-7aed-a3f9-5ade7268002e",
  type: "page-type/module",
  slug: "mount-training-panel-card",
  definition: "each selected character's mount training, by capacity, speed and stamina",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The card and each riding stat are titled by their completion pages.",
    },
  ],
} as const satisfies Module
