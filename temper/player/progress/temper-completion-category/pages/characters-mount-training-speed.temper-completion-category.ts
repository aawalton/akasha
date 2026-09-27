import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersMountTrainingSpeed = {
  id: "01a0e252-6fb5-7067-b9c9-f3df3dab23cf",
  type: "page-type/temper-completion-category",
  slug: "characters-mount-training-speed",
  title: "Speed",
  nodeId: "speed",
  tab: "characters",
  displayOrder: 0,
  parent: "temper-completion-category/characters-mount-training",
} as const satisfies TemperCompletionCategory
