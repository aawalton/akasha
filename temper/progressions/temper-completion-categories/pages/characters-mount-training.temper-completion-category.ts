import type { TemperCompletionCategory } from "akasha/temper/progressions/temper-completion-categories/temper-completion-category.page-type.types.ts"

export const charactersMountTraining = {
  id: "01a05fcb-e4c0-7057-a561-6fcf12241b12",
  type: "temper-completion-category",
  slug: "characters-mount-training",
  title: "Mount Training",
  nodeId: "mount-training",
  tab: "characters",
  displayOrder: 10,
  parent: "characters",
} as const satisfies TemperCompletionCategory
