import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const rally = {
  id: "019e6226-0108-7262-8f47-f52e5498cffa",
  pageTypeSlug: "temper-skill",
  slug: "rally",
  title: "Rally",
  key: "rally",
  baseName: "Momentum",
  description:
    '"Focus your strength and resolve to gain Major Brutality and Sorcery, increasing your Weapon and Spell Damage by 20%, as well as gaining Minor Endurance, increasing your Stamina Recovery by 15% for 20 seconds.\\n\\nYou heal for 1199 Health when Rally ends. The final heal is increased by 15% every 1 second, up to a maximum of 300%."',
  icon: "/esoui/art/icons/ability_2handed_005_b.dds",
  esoSkillId: 39904,
  isMorph: true,
  learnedLevel: 38,
  lineRankNeeded: 38,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
