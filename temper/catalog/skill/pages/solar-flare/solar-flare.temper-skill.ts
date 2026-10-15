import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const solarFlare = {
  id: "019e6f53-a74d-741b-86e0-471490092dd0",
  type: "page-type/temper-skill",
  slug: "solar-flare",
  title: "Solar Flare",
  key: "solar-flare",
  baseName: "Solar Flare",
  description:
    "Conjure a ball of solar energy to heave at an enemy, dealing |cffffff8359|r Magic Damage and increasing your damage done with class abilities by |cffffff5|r% for |cffffff10|r seconds.\n\nAlso grants you Empower for |cffffff10|r seconds, increasing the damage of your Heavy Attacks against monsters by |cffffff70|r%.",
  icon: "/esoui/art/icons/ability_templar_solar_flare.dds",
  esoSkillId: 22057,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/active",
  hashPlace: 1216,
  createdAt: "2026-05-28T16:03:33.837Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1035 MaxStat + 1.08675 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, 0.8s cooldown, R2 = 1)",
    "<<2>> = 5% (Constant)",
    "<<3>> = 10 seconds (Constant)",
    "<<4>> = Empower (Constant)",
    "<<5>> = 10 seconds (Constant)",
    "<<6>> = 150% (Constant)",
  ],
} as const satisfies TemperSkill
