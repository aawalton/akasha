import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersMountTraining = {
  id: "01a05fcb-e4c0-7057-a561-6fcf12241b12",
  type: "page-type/temper-completion-category",
  slug: "characters-mount-training",
  title: "Mount Training",
  nodeId: "mount-training",
  tab: "characters",
  displayOrder: 10,
  parent: "temper-completion-category/characters",
} as const satisfies TemperCompletionCategory
