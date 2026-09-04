import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const summonTwilightMatriarch = {
  id: "019e6245-a746-7a32-a85c-7df36b613e05",
  pageTypeSlug: "temper-skill",
  slug: "summon-twilight-matriarch",
  title: "Summon Twilight Matriarch",
  key: "summon-twilight-matriarch",
  baseName: "Summon Winged Twilight",
  description:
    "\"Call on Azura to send a twilight matriarch to fight at your side. The twilight matriarch's zap deals 347 Shock Damage and its kick deals 347 Shock Damage.\\n\\nOnce summoned, you can activate the twilight matriarch's special ability for 4590 Magicka, causing it to heal 2 friendly targets for 3600 and itself for 1799.\\n\\nThe twilight matriarch remains until killed or unsummoned.\"",
  icon: "/esoui/art/icons/ability_sorcerer_storm_prey.dds",
  esoSkillId: 30626,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
