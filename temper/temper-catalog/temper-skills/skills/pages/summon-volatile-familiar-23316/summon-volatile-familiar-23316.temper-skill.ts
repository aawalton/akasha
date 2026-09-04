import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const summonVolatileFamiliar23316 = {
  id: "019e6f53-a7ec-7e27-9a66-0c859675f6e8",
  pageTypeSlug: "temper-skill",
  slug: "summon-volatile-familiar-23316",
  title: "Summon Volatile Familiar",
  key: "summon-volatile-familiar-23316",
  baseName: "Summon Unstable Familiar",
  description:
    "\"Command the powers of Oblivion to send a Daedric familiar to fight at your side. The familiar's attacks deal |cffffff1250|r Shock Damage.\\n\\nOnce summoned, you can activate the familiar's special ability for |cffffff3615|r Magicka, dealing |cffffff1516|r Shock Damage every |cffffff2|r seconds for |cffffff20|r seconds to enemies near them. The second hit stuns enemies hit for |cffffff3|r seconds.\\n\\nThe familiar remains until killed or unsummoned.\"",
  icon: "/esoui/art/icons/ability_sorcerer_speedy_familiar.dds",
  esoSkillId: 23316,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
} as const satisfies TemperSkill
