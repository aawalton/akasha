import type { TemperCompanionSkill } from "akasha/temper/catalog/temper-companions/temper-companion-skills/temper-companion-skill.page-type.types.ts"

export const allNoSkill = {
  id: "019e6451-1209-7d71-83b7-bfc64a8b5914",
  type: "temper-companion-skill",
  slug: "all-no-skill",
  key: "no-skill",
  title: "No Skill",
  description: "No skill selected",
  companionId: "all",
  abilityId: 0,
  skillLineId: "weapon-two-handed",
  skillType: "active",
} as const satisfies TemperCompanionSkill
