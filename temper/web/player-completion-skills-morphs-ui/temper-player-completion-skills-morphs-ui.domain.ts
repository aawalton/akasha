import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperPlayerCompletionSkillsMorphsUi = {
  id: "01a06270-883d-7002-9d36-997c74946d96",
  type: "page-type/domain",
  slug: "temper-player-completion-skills-morphs-ui",
  definition: "the cards giving a player's skill morph progress in a browser",
  parts: ["module/skill-morphs-progress-panel-card", "module/subclassing-skill-morphs-panel-card"],
  createdAt: "2026-09-02T14:05:37.213Z",
  updatedAt: "2026-09-22T13:54:11.000Z",
} as const satisfies Domain
