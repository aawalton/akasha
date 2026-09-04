import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const summonTwilightTormentor24636 = {
  id: "019e6f53-a7e4-78e5-a20a-51fd6eb095b2",
  pageTypeSlug: "temper-skill",
  slug: "summon-twilight-tormentor-24636",
  title: "Summon Twilight Tormentor",
  key: "summon-twilight-tormentor-24636",
  baseName: "Summon Winged Twilight",
  description:
    "\"Call on Azura to send a twilight tormentor to fight at your side. The twilight tormentor's zap deals |cffffff1667|r Shock Damage and its kick deals |cffffff1667|r Shock Damage.\\n\\nOnce summoned, you can activate the twilight tormentor's special ability for |cffffff2781|r Magicka, causing it to deal |cffffff60|r% more damage to enemies above |cffffff50|r% Health for |cffffff20|r seconds.\\n\\nThe twilight tormentor remains until killed or unsummoned.\"",
  icon: "/esoui/art/icons/ability_sorcerer_lightning_matriarch.dds",
  esoSkillId: 24636,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
