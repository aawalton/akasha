import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersMountTrainingStamina = {
  id: "01a0e252-6fb5-7bd2-a7ee-9e225f8b60c9",
  type: "page-type/temper-completion-category",
  slug: "characters-mount-training-stamina",
  title: "Stamina",
  nodeId: "stamina",
  tab: "characters",
  displayOrder: 2,
  parent: "temper-completion-category/characters-mount-training",
} as const satisfies TemperCompletionCategory
