import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const pounce = {
  id: "019e6f53-a51d-73d7-8943-d55d98631c6b",
  type: "page-type/temper-skill",
  slug: "pounce",
  title: "Pounce",
  key: "pounce",
  baseName: "Pounce",
  description:
    "Pounce on an enemy with primal fury, dealing |cffffff4901|r Bleed Damage and applying the Hemorrhaging status effect.\n\nWhen you are |cffffff7|r meters or closer this ability becomes Carnage, which causes you to rip into an enemy and deal |cffffff4893|r Bleed Damage over |cffffff12|r seconds, dealing up to |cffffff450|r% more damage to enemies under |cffffff100|r% Health.",
  icon: "/esoui/art/icons/u50_ability_werewolf_pounce.dds",
  esoSkillId: 32632,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "temper-skill-line/world-werewolf",
  skillType: "temper-skill-type/active",
  hashPlace: 907,
  createdAt: "2026-05-28T16:03:33.277Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.078 MaxStat + 0.63 MaxPower (Ultimate, ratio = 8.08, RankMod(1), Dmg, Bleed, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = Hemorrhaging (Constant)",
    "<<3>> = 7 (Constant)",
    "<<4>> = Carnage (Constant)",
    "<<5>> = 0.011818 MaxStat + 0.095455 MaxPower (Ultimate, ratio = 8.08, RankMod(1), Dmg, Bleed, SingleTarget, DOT, 12s duration, 2s tick, R2 = 1)",
    "<<6>> = 12 seconds (Constant)",
    "<<7>> = 450 (Constant)",
    "<<8>> = 100 (Constant)",
  ],
} as const satisfies TemperSkill
