import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const summonUnstableFamiliar = {
  id: "019e6f53-a7e9-75e4-98f9-c98e79de0da6",
  type: "page-type/temper-skill",
  slug: "summon-unstable-familiar",
  title: "Summon Unstable Familiar",
  key: "summon-unstable-familiar",
  baseName: "Summon Unstable Familiar",
  description:
    "Command the powers of Oblivion to send a Daedric familiar to fight at your side. The familiar's attacks deal |cffffff1211|r Shock Damage.\n\nOnce summoned, you can activate the familiar's special ability for |cffffff3615|r Magicka, dealing |cffffff1467|r Shock Damage every |cffffff2|r seconds for |cffffff20|r seconds to enemies near them.\n\nThe familiar remains until killed or unsummoned.",
  icon: "/esoui/art/icons/ability_sorcerer_unstable_fimiliar.dds",
  esoSkillId: 23304,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/sorcerer-daedric-summoning",
  skillType: "temper-skill-type/active",
  hashPlace: 1297,
  createdAt: "2026-05-28T16:03:33.993Z",
  updatedAt: "2026-10-21T05:00:21.269Z",
  equations: [
    "<<1>> = 0.01547866 MaxStat + 0.16252593 MaxPower (Ultimate, RankMod(1), Dmg, Shock, SingleTarget, Direct, Melee)",
    "<<2>> = 3510 (Constant)",
    "<<3>> = 0.0187632 MaxStat + 0.1970136 MaxPower (Ultimate, RankMod(1), Dmg, Shock, AOE, DOT, 2s tick)",
    "<<4>> = 2 seconds (Constant)",
    "<<5>> = 20 seconds (Constant)",
  ],
} as const satisfies TemperSkill
