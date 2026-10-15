import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const summonVolatileFamiliar23316 = {
  id: "019e6f53-a7ec-7e27-9a66-0c859675f6e8",
  type: "page-type/temper-skill",
  slug: "summon-volatile-familiar-23316",
  title: "Summon Volatile Familiar",
  key: "summon-volatile-familiar-23316",
  baseName: "Summon Unstable Familiar",
  description:
    "Command the powers of Oblivion to send a Daedric familiar to fight at your side. The familiar's attacks deal |cffffff1250|r Shock Damage.\n\nOnce summoned, you can activate the familiar's special ability for |cffffff3615|r Magicka, dealing |cffffff1516|r Shock Damage every |cffffff2|r seconds for |cffffff20|r seconds to enemies near them. The second hit stuns enemies hit for |cffffff3|r seconds.\n\nThe familiar remains until killed or unsummoned.",
  icon: "/esoui/art/icons/ability_sorcerer_speedy_familiar.dds",
  esoSkillId: 23316,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "temper-skill-line/sorcerer-daedric-summoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1299,
  createdAt: "2026-05-28T16:03:33.996Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.015495 MaxStat + 0.162697 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Shock, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 3510 (Constant)",
    "<<3>> = 0.018782 MaxStat + 0.19721 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Shock, AOE, DOT, 2s tick, R2 = 1)",
    "<<4>> = 2 seconds (Constant)",
    "<<5>> = 20 seconds (Constant)",
    "<<6>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
