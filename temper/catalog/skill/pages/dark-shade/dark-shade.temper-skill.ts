import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const darkShade = {
  id: "019e6245-a63d-770e-b60b-61e5b0eb6a7e",
  type: "page-type/temper-skill",
  slug: "dark-shade",
  title: "Dark Shade",
  key: "dark-shade",
  baseName: "Summon Shade",
  description:
    "Summon a shade version of yourself to attack an enemy and fight at your side for 20 seconds. \n\nThe shade attacks nearby enemies within 9 meters of it, dealing 623 Magic Damage once every 2 seconds and afflicting them with Minor Maim for 4 seconds, reducing their damage done by 5%.",
  icon: "/esoui/art/icons/ability_nightblade_001_a.dds",
  esoSkillId: 36283,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/nightblade-shadow",
  skillType: "temper-skill-type/active",
  hashPlace: 311,
  createdAt: "2026-05-26T03:13:12.253Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 20 seconds (Constant)",
    "<<2>> = 0.027744314 MaxStat + 0.29131633 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<3>> = 2 seconds (Constant)",
    "<<4>> = Minor Maim (Constant)",
    "<<5>> = 4 seconds (Constant)",
    "<<6>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill
