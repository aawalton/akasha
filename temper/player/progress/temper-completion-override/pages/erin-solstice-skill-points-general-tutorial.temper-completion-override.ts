import type { TemperCompletionOverride } from "akasha/temper/player/progress/temper-completion-override/temper-completion-override.page-type.types.ts"

export const erinSolsticeSkillPointsGeneralTutorial = {
  id: "01a05fd0-4dea-7a8b-bb2b-3a41e8320847",
  type: "page-type/temper-completion-override",
  slug: "erin-solstice-skill-points-general-tutorial",
  title: "Skill Points general/tutorial for Erin Solstice",
  accountPage: "9ba554f7-cb18-48bb-a709-ec935a895ca7",
  character: "temper-account-character/erin-solstice",
  completionCard: "temper-completion-category/characters-skill-points",
  completionItemPath: ["general", "tutorial"],
  floor: 1,
  overrideReason: "ESO under-reports; complete in-game (Erin Solstice) #12019",
} as const satisfies TemperCompletionOverride
