import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const isobelIsobelEnchanted = {
  id: "019e6484-386f-7567-8aaf-ef9cc2e1dc6c",
  pageTypeSlug: "temper-companion-skill",
  slug: "isobel-isobel-enchanted",
  key: "isobel-enchanted",
  title: "Cunning",
  icon: "/esoui/art/icons/ability_companion_templar_cunning.dds",
  description: "Decreases ability cooldowns by 3% and damage taken by 3%.",
  companionId: "isobel",
  abilityId: 169474,
  skillLineId: "companion-isobel",
  skillType: "passive",
  validRoles: ["tank"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
