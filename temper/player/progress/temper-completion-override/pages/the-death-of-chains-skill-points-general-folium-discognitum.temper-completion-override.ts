import type { TemperCompletionOverride } from "akasha/temper/player/progress/temper-completion-override/temper-completion-override.page-type.types.ts"

export const theDeathOfChainsSkillPointsGeneralFoliumDiscognitum = {
  id: "01a0b6d1-d02b-72d2-9e05-e59a15b08a51",
  type: "page-type/temper-completion-override",
  slug: "the-death-of-chains-skill-points-general-folium-discognitum",
  title: "Skill Points general/foliumDiscognitum for The Death of Chains",
  accountPage: "temper-account/alanarre",
  character: "temper-account-character/the-death-of-chains",
  completionCard: "temper-completion-category/characters-skill-points",
  completionItemPath: ["general", "foliumDiscognitum"],
  floor: 2,
  overrideReason:
    "Unreachable: the wrong quest branch was taken and cannot be undone, so this counts as done rather than as a gap",
} as const satisfies TemperCompletionOverride
