import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const solarBarrage22095 = {
  id: "019e6f53-a748-742d-99ac-3c9de4458acb",
  type: "page-type/temper-skill",
  slug: "solar-barrage-22095",
  title: "Solar Barrage",
  key: "solar-barrage-22095",
  baseName: "Solar Flare",
  description:
    "Conjure solar energy to blast enemies around you, dealing |cffffff1516|r Magic Damage every |cffffff2|r seconds and increasing your damage done with class abilities by |cffffff5|r% for |cffffff20|r seconds.\n\nWhile this ability is active you gain Empower, increasing the damage of your Heavy Attacks against monsters by |cffffff70|r%.",
  icon: "/esoui/art/icons/ability_templar_solar_power.dds",
  esoSkillId: 22095,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/active",
  hashPlace: 1213,
  createdAt: "2026-05-28T16:03:33.832Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.018782 MaxStat + 0.19721 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, DOT, 2s tick, R2 = 1)",
    "<<2>> = 2 seconds (Constant)",
    "<<3>> = 5% (Constant)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = Empower (Constant)",
    "<<6>> = 150% (Constant)",
  ],
} as const satisfies TemperSkill
