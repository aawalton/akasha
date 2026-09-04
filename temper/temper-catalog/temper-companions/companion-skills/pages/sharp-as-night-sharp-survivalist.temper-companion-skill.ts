import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const sharpAsNightSharpSurvivalist = {
  id: "019e6484-389f-7385-af6f-a9666f9ad128",
  pageTypeSlug: "temper-companion-skill",
  slug: "sharp-as-night-sharp-survivalist",
  key: "sharp-survivalist",
  title: "Survivalist",
  icon: "/esoui/art/icons/ability_companion_warden_passive.dds",
  description: "Increases Physical and Spell Resistance by 3% and healing done by 3%.",
  companionId: "sharp-as-night",
  abilityId: 193973,
  skillLineId: "companion-sharp-as-night",
  skillType: "passive",
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
