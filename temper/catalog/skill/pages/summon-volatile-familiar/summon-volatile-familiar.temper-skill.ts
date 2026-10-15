import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const summonVolatileFamiliar = {
  id: "019e6245-a749-7de0-a4a7-8155acef1155",
  type: "page-type/temper-skill",
  slug: "summon-volatile-familiar",
  title: "Summon Volatile Familiar",
  key: "summon-volatile-familiar",
  baseName: "Summon Unstable Familiar",
  description:
    "Command the powers of Oblivion to send a Daedric familiar to fight at your side. The familiar's attacks deal 358 Shock Damage.\n\nOnce summoned, you can activate the familiar's special ability for 3510 Magicka, dealing 435 Shock Damage every 2 seconds for 20 seconds to enemies near them. The second hit stuns enemies hit for 3 seconds.\n\nThe familiar remains until killed or unsummoned.",
  icon: "/esoui/art/icons/ability_sorcerer_speedy_familiar.dds",
  esoSkillId: 30674,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/sorcerer-daedric-summoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1298,
  createdAt: "2026-05-26T03:13:12.521Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.016006335 MaxStat + 0.168066001 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Shock, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 3510 (Constant)",
    "<<3>> = 0.019401806 MaxStat + 0.20371793 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Shock, AOE, DOT, 2s tick, R2 = 1)",
    "<<4>> = 2 seconds (Constant)",
    "<<5>> = 20 seconds (Constant)",
    "<<6>> = 3 seconds (Constant)",
  ],
} as const satisfies TemperSkill
