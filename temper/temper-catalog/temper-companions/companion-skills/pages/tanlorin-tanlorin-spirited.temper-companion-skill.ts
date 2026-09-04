import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const tanlorinTanlorinSpirited = {
  id: "019e6484-38a9-7fb5-9cff-d790373b306c",
  pageTypeSlug: "temper-companion-skill",
  slug: "tanlorin-tanlorin-spirited",
  key: "tanlorin-spirited",
  title: "Spirited",
  icon: "/esoui/art/icons/ability_companion_tanlorin_passive.dds",
  description: "Decreases damage taken by 3% and increases damage done by 3%.",
  companionId: "tanlorin",
  abilityId: 214685,
  skillLineId: "companion-tanlorin",
  skillType: "passive",
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
