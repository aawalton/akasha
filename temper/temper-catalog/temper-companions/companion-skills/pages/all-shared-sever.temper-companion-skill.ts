import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedSever = {
  id: "019e668d-c55b-714d-a309-a49c299f2574",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-sever",
  key: "shared-sever",
  title: "Sever",
  icon: "/esoui/art/icons/ability_companion_2handed_004.dds",
  description: "Your Companion spins around and strikes an enemy down, dealing $1 Physical Damage.",
  companionId: "all",
  abilityId: 152624,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
