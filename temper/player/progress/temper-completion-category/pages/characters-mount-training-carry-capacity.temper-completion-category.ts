import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const charactersMountTrainingCarryCapacity = {
  id: "01a0e252-6fb5-7d29-8723-dba8a1cce97e",
  type: "page-type/temper-completion-category",
  slug: "characters-mount-training-carry-capacity",
  title: "Carry Capacity",
  nodeId: "carryCapacity",
  tab: "characters",
  displayOrder: 1,
  parent: "temper-completion-category/characters-mount-training",
} as const satisfies TemperCompletionCategory
