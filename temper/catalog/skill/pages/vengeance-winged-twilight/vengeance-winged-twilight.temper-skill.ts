import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const vengeanceWingedTwilight = {
  id: "019e6f53-a9b5-7d37-b684-22acb057e61e",
  type: "page-type/temper-skill",
  slug: "vengeance-winged-twilight",
  title: "Vengeance Winged Twilight",
  key: "vengeance-winged-twilight",
  baseName: "Vengeance Winged Twilight",
  description:
    '"Call on Azura to send a blessing to heal a friendly ally for |cffffff16065|r Health and yourself for |cffffff8033|r Health."',
  icon: "/esoui/art/icons/ability_sorcerer_storm_prey_summoned.dds",
  esoSkillId: 237915,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/vengeance-sorcerer-daedric-summoning",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
