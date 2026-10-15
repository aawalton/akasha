import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const radiantWard = {
  id: "019e6245-a6fb-7b83-985e-5360e448d2ae",
  type: "page-type/temper-skill",
  slug: "radiant-ward",
  title: "Radiant Ward",
  key: "radiant-ward",
  baseName: "Sun Shield",
  description:
    "Surround yourself with solar rays, dealing 1742 Magic Damage to nearby enemies and applying Minor Maim to them for 10 seconds, reducing their damage done by 5%.\n\nThe rays then protect you, granting a damage shield that absorbs up to 4958 damage for 6 seconds, increasing by 20% for each enemy hit, up to 120%. This portion of the ability scales off your Max Health.",
  icon: "/esoui/art/icons/ability_templar_radiant_ward.dds",
  esoSkillId: 27514,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 966,
  createdAt: "2026-05-26T03:13:12.443Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = Minor Maim (Constant)",
    "<<3>> = 10 seconds (Constant)",
    "<<4>> = 5% (Constant)",
    "<<5>> = 0.3099 Health (Health, RankMod(1.033), DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<6>> = 6 seconds (Constant)",
    "<<7>> = 20 (Constant)",
  ],
} as const satisfies TemperSkill
