import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lotusFan = {
  id: "019e6245-a6c1-7f60-b263-e4f51d36adda",
  type: "page-type/temper-skill",
  slug: "lotus-fan",
  title: "Lotus Fan",
  key: "lotus-fan",
  baseName: "Teleport Strike",
  description:
    "Flash through the shadows and ambush an enemy while unleashing a fan of knives, dealing 1603 Magic Damage to them and enemies around you.\n\nAll enemies hit take an additional 2050 Magic Damage over 5 seconds and are afflicted with Minor Vulnerability for 10 seconds, increasing their damage taken by 5%.",
  icon: "/esoui/art/icons/ability_nightblade_008_a.dds",
  esoSkillId: 35882,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/active",
  hashPlace: 769,
  createdAt: "2026-05-26T03:13:12.385Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.071277 MaxStat + 0.748408 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.0182636 MaxStat + 0.191603 MaxPower - 1.04222 (Ultimate, ratio = 10.49, Dmg, Magic, SingleTarget, DOT, 4s duration, 1s tick, R2 = 0.999993)",
    "<<3>> = 5 seconds (Constant)",
    "<<4>> = Minor Vulnerability (Constant)",
    "<<5>> = 10 seconds (Constant)",
    "<<6>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill
