import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const burningTalons20252 = {
  id: "019e6f53-9fa4-7c4b-bf88-824e2c4486b5",
  type: "page-type/temper-skill",
  slug: "burning-talons-20252",
  title: "Burning Talons",
  key: "burning-talons-20252",
  baseName: "Dark Talons",
  description:
    "Call forth talons from the ground, dealing |cffffff6611|r Flame Damage to enemies near you, an additional |cffffff5375|r Flame Damage over |cffffff5|r seconds, and immobilizing them for |cffffff4|r seconds. \n\nAn ally near the talons can activate the Ignite synergy, dealing |cffffff10328|r Flame Damage to all enemies held within them.",
  icon: "/esoui/art/icons/ability_dragonknight_010_b.dds",
  esoSkillId: 20252,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/dragonknight-draconic-power",
  skillType: "temper-skill-type/active",
  hashPlace: 175,
  createdAt: "2026-05-28T16:03:31.876Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.0140536 MaxStat + 0.148192 MaxPower + 0.12468 (Ultimate, ratio = 10.54, Dmg, Flame, SingleTarget, DOT, 4s duration, 1s tick, R2 = 0.999993)",
    "<<3>> = 5 seconds (Constant)",
    "<<4>> = 4 seconds (Constant)",
    "<<5>> = Ignite (Constant)",
    "<<6>> = 0.125 MaxStat + 1.3125 MaxPower (Ultimate, ratio = 10.50, Dmg, Flame, AOE, Direct, Melee, R2 = 1)",
  ],
} as const satisfies TemperSkill
