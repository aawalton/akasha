import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const heroicSlash = {
  id: "019e6226-00fa-7ee6-83ff-916e3c19cfe6",
  type: "page-type/temper-skill",
  slug: "heroic-slash",
  title: "Heroic Slash",
  key: "heroic-slash",
  baseName: "Low Slash",
  description:
    "Surprise an enemy with a deep lunge, dealing 1438 Physical Damage and afflicting them with Minor Maim, reducing their damage done by 5% for 15 seconds. \n\nYou gain Minor Heroism, granting you 1 Ultimate every 1.5 seconds for 15 seconds.",
  icon: "/esoui/art/icons/ability_1handed_001_a.dds",
  esoSkillId: 41414,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 627,
  createdAt: "2026-05-26T02:38:38.330Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06402534 MaxStat + 0.67226607 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Physical, SingleTarget, Direct, Melee, R2 = 1)",
    "<<2>> = Minor Maim (Constant)",
    "<<3>> = 5% (Constant)",
    "<<4>> = 15 seconds (Constant)",
    "<<5>> = Minor Heroism (Constant)",
    "<<6>> = 1 (Constant)",
    "<<7>> = 15 seconds (Constant)",
  ],
} as const satisfies TemperSkill
