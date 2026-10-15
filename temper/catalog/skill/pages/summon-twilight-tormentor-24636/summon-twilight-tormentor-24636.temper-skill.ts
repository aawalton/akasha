import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const summonTwilightTormentor24636 = {
  id: "019e6f53-a7e4-78e5-a20a-51fd6eb095b2",
  type: "page-type/temper-skill",
  slug: "summon-twilight-tormentor-24636",
  title: "Summon Twilight Tormentor",
  key: "summon-twilight-tormentor-24636",
  baseName: "Summon Winged Twilight",
  description:
    "Call on Azura to send a twilight tormentor to fight at your side. The twilight tormentor's zap deals |cffffff1667|r Shock Damage and its kick deals |cffffff1667|r Shock Damage.\n\nOnce summoned, you can activate the twilight tormentor's special ability for |cffffff2781|r Magicka, causing it to deal |cffffff60|r% more damage to enemies above |cffffff50|r% Health for |cffffff20|r seconds.\n\nThe twilight tormentor remains until killed or unsummoned.",
  icon: "/esoui/art/icons/ability_sorcerer_lightning_matriarch.dds",
  esoSkillId: 24636,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "temper-skill-line/sorcerer-daedric-summoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1294,
  createdAt: "2026-05-28T16:03:33.988Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.02066 MaxStat + 0.21693 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Shock, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = 0.02066 MaxStat + 0.21693 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Shock, SingleTarget, Direct, Melee, R2 = 1)",
    "<<3>> = 2700 (Constant)",
    "<<4>> = 60% (Constant)",
    "<<5>> = 50% (Constant)",
    "<<6>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
