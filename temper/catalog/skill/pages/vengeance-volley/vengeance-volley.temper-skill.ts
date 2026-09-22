import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceVolley = {
  id: "019e6f53-a9ad-73ac-8803-1031264f2dac",
  type: "page-type/temper-skill",
  slug: "vengeance-volley",
  title: "Vengeance Volley",
  key: "vengeance-volley",
  baseName: "Vengeance Volley",
  description:
    '"Launch a multitude of arrows into the sky to rain down, dealing |cffffff11760|r Physical Damage to up to 3 enemies in the target area after a |cffffff2|r second delay."',
  icon: "/esoui/art/icons/ability_bow_003.dds",
  esoSkillId: 241258,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-weapon-bow",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
