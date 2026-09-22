import type { TemperCompletionCategory } from "akasha/temper/player/progress/temper-completion-category/temper-completion-category.page-type.types.ts"

export const accountSubclassingSkillLines = {
  id: "01a05fcb-e4bd-7777-823a-e444492b0f35",
  type: "page-type/temper-completion-category",
  slug: "account-subclassing-skill-lines",
  title: "Subclassing Skill Lines",
  nodeId: "subclassing-skill-lines",
  tab: "account",
  displayOrder: 15,
  parent: "temper-completion-category/account",
} as const satisfies TemperCompletionCategory
