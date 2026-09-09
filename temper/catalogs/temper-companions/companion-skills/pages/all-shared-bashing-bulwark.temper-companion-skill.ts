import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedBashingBulwark = {
  id: "019e668d-c556-7c1b-9e3e-194cd0bcbbec",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-bashing-bulwark",
  key: "shared-bashing-bulwark",
  title: "Bashing Bulwark",
  icon: "/esoui/art/icons/ability_companion_1handed_003.dds",
  description: "Your Companion rushes an enemy and rams them, stunning them for $$1 seconds.",
  companionId: "all",
  abilityId: 155326,
  skillLineId: "weapon-one-hand-shield",
  skillType: "active",
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
