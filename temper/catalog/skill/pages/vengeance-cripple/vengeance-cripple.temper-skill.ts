import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceCripple = {
  id: "019e6f53-a8db-7577-9419-9ebc2a71c765",
  type: "page-type/temper-skill",
  slug: "vengeance-cripple",
  title: "Vengeance Cripple",
  key: "vengeance-cripple",
  baseName: "Vengeance Cripple",
  description:
    '"Sap an enemy\'s agility and wrack them with pain, dealing |cffffff14178|r Magic Damage over |cffffff5|r seconds and reducing their Movement Speed by |cffffff30|r% for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_006.dds",
  esoSkillId: 237713,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-nightblade-siphoning",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
