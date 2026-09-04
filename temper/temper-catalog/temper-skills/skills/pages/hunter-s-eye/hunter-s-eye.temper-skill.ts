import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hunterSEye = {
  id: "019e6f53-a330-757a-a035-d0a3a682b611",
  pageTypeSlug: "temper-skill",
  slug: "hunter-s-eye",
  title: "Hunter's Eye",
  key: "hunter-s-eye",
  baseName: "Hunter's Eye",
  description:
    '"Increases your Stealth Detection radius by |cffffff1|r meter.  \\n\\nIncreases your Movement Speed by |cffffff1|r% and your Physical and Spell Penetration by |cffffff300|r."',
  icon: "/esoui/art/icons/ability_armor_011.dds",
  esoSkillId: 36022,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 0,
  rank: 5,
  skillLineId: "racial-wood-elf-skills",
  skillType: "passive",
  subcategoryId: "racial-wood-elf-skills",
} as const satisfies TemperSkill
