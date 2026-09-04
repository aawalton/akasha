import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const feralGuardian = {
  id: "019e6f53-a1ea-79d4-b95e-f171d06ac391",
  pageTypeSlug: "temper-skill",
  slug: "feral-guardian",
  title: "Feral Guardian",
  key: "feral-guardian",
  baseName: "Feral Guardian",
  description:
    '"Rouse a grizzly to fight by your side. The grizzly swipes at an enemy, dealing |cffffff2017|r Magic Damage, and sometimes swipes all enemies in front of it, dealing |cffffff8533|r Magic Damage and stunning them for |cffffff2|r seconds.\\n\\nOnce summoned you can activate Guardian\'s Wrath for |cffffff79|r Ultimate, causing the grizzly to maul an enemy for |cffffff11308|r Magic Damage. Deals |cffffff100|r% more damage to enemies below |cffffff25|r% Health."',
  icon: "/esoui/art/icons/ability_warden_018.dds",
  esoSkillId: 85982,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "warden-animal-companions",
  skillType: "ultimate",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill
