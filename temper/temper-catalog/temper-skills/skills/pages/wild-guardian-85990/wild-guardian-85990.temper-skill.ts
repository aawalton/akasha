import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const wildGuardian85990 = {
  id: "019e6f53-a9f1-76e0-987a-392c33bf0160",
  pageTypeSlug: "temper-skill",
  slug: "wild-guardian-85990",
  title: "Wild Guardian",
  key: "wild-guardian-85990",
  baseName: "Feral Guardian",
  description:
    '"Rouse a grizzly to fight by your side. The grizzly swipes at an enemy, dealing |cffffff2294|r Bleed Damage, and sometimes swipes all enemies in front of it, dealing |cffffff9697|r Bleed Damage and stunning them for |cffffff2|r seconds.\\n\\nOnce summoned you can activate Guardian\'s Savagery for |cffffff79|r Ultimate, to maul an enemy for |cffffff12849|r Bleed Damage. Deals |cffffff100|r% more damage to enemies below |cffffff25|r% Health.\\n\\nThe damage has a higher chance to apply the Hemorrhaging status effect."',
  icon: "/esoui/art/icons/ability_warden_018_c.dds",
  esoSkillId: 85990,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-animal-companions",
  skillType: "ultimate",
  subcategoryId: "warden-animal-companions",
} as const satisfies TemperSkill
