import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const radiantWard22182 = {
  id: "019e6f53-a590-7ad5-a8dc-4a7fb6794869",
  type: "page-type/temper-skill",
  slug: "radiant-ward-22182",
  title: "Radiant Ward",
  key: "radiant-ward-22182",
  baseName: "Sun Shield",
  description:
    "Surround yourself with solar rays, dealing |cffffff6401|r Magic Damage to nearby enemies and applying Minor Maim to them for |cffffff10|r seconds, reducing their damage done by |cffffff5|r%.\n\nThe rays then protect you, granting a damage shield that absorbs up to |cffffff7026|r damage for |cffffff6|r seconds, increasing by |cffffff20|r% for each enemy hit, up to |cffffff120|r%. This portion of the ability scales off your Max Health.",
  icon: "/esoui/art/icons/ability_templar_radiant_ward.dds",
  esoSkillId: 22182,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 967,
  createdAt: "2026-05-28T16:03:33.392Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = Minor Maim (Constant)",
    "<<3>> = 10 seconds (Constant)",
    "<<4>> = 5% (Constant)",
    "<<5>> = 0.3 Health (Health, RankMod(1), DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<6>> = 6 seconds (Constant)",
    "<<7>> = 20 (Constant)",
  ],
} as const satisfies TemperSkill
