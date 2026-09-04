import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const ballista85451 = {
  id: "019e6f53-9ee8-70a4-b0a7-8634992edf5a",
  pageTypeSlug: "temper-skill",
  slug: "ballista-85451",
  title: "Ballista",
  key: "ballista-85451",
  baseName: "Rapid Fire",
  description:
    '"Create a turret to unleash a barrage of arrows at an enemy, dealing |cffffff54210|r Physical Damage over |cffffff5|r seconds."',
  icon: "/esoui/art/icons/ability_bow_006_a.dds",
  esoSkillId: 85451,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 2,
  rank: 50,
  skillLineId: "weapon-bow",
  skillType: "ultimate",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
