import type { TemperCompletionOverride } from "akasha/temper/player/progress/temper-completion-override/temper-completion-override.page-type.types.ts"

export const erinSolsticeSkillPointsGeneralFoliumDiscognitum = {
  id: "01a05fd0-4dea-736e-8f9d-d29b91956f57",
  type: "page-type/temper-completion-override",
  slug: "erin-solstice-skill-points-general-folium-discognitum",
  title: "Skill Points general/foliumDiscognitum for Erin Solstice",
  accountPage: "temper-account/alanarre",
  character: "temper-account-character/erin-solstice",
  completionCard: "temper-completion-category/characters-skill-points",
  completionItemPath: ["general", "foliumDiscognitum"],
  floor: 2,
  overrideReason: "ESO under-reports; complete in-game (Erin Solstice) #12019",
} as const satisfies TemperCompletionOverride
