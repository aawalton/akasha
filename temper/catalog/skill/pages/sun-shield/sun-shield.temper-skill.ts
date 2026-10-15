import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const sunShield = {
  id: "019e6f53-a7f4-7603-9ff0-0edf7b26cca9",
  type: "page-type/temper-skill",
  slug: "sun-shield",
  title: "Sun Shield",
  key: "sun-shield",
  baseName: "Sun Shield",
  description:
    "Surround yourself with solar rays, dealing |cffffff6400|r Magic Damage to nearby enemies and applying Minor Maim to them for |cffffff10|r seconds, reducing their damage done by |cffffff5|r%.\n\nThe rays then protect you, granting a damage shield that absorbs up to |cffffff6802|r damage for |cffffff6|r seconds, increasing by |cffffff10|r% for each enemy hit, up to |cffffff60|r%. This portion of the ability scales off your Max Health.",
  icon: "/esoui/art/icons/ability_templar_sun_shield.dds",
  esoSkillId: 22178,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 42,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 1304,
  createdAt: "2026-05-28T16:03:34.004Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.075 MaxStat + 0.7875 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = Minor Maim (Constant)",
    "<<3>> = 10 seconds (Constant)",
    "<<4>> = 5% (Constant)",
    "<<5>> = 0.3 Health (Health, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<6>> = 6 seconds (Constant)",
    "<<7>> = 10 (Constant)",
  ],
} as const satisfies TemperSkill
