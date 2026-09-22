import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const hunterSEye = {
  id: "019e6f53-a330-757a-a035-d0a3a682b611",
  type: "page-type/temper-skill",
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
  skillLineId: "temper-skill-line/racial-wood-elf-skills",
  skillType: "temper-skill-type/passive",
} as const satisfies TemperSkill
