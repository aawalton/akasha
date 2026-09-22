import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperPlayerCompletionSkillsMorphsUi = {
  id: "01a06270-883d-7002-9d36-997c74946d96",
  type: "page-type/domain",
  slug: "temper-player-completion-skills-morphs-ui",
  definition: "the cards a browser gives a player's skill morph progress in",
  parts: ["module/skill-morphs-progress-panel-card", "module/subclassing-skill-morphs-panel-card"],
} as const satisfies Domain
