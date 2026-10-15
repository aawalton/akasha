import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const lotusFan25493 = {
  id: "019e6f53-a41f-7f0a-abe4-bdd02b265be5",
  type: "page-type/temper-skill",
  slug: "lotus-fan-25493",
  title: "Lotus Fan",
  key: "lotus-fan-25493",
  baseName: "Teleport Strike",
  description:
    "Flash through the shadows and ambush an enemy while unleashing a fan of knives, dealing |cffffff5888|r Magic Damage to them and enemies around you.\n\nAll enemies hit take an additional |cffffff6725|r Magic Damage over |cffffff5|r seconds and are afflicted with Minor Vulnerability for |cffffff10|r seconds, increasing their damage taken by |cffffff5|r%.",
  icon: "/esoui/art/icons/ability_nightblade_008_a.dds",
  esoSkillId: 25493,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/nightblade-assassination",
  skillType: "temper-skill-type/active",
  hashPlace: 770,
  createdAt: "2026-05-28T16:03:33.023Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.071277 MaxStat + 0.748408 MaxPower (Ultimate, ratio = 10.50, Dmg, Magic, AOE, Direct, Melee, R2 = 1)",
    "<<2>> = 0.017687 MaxStat + 0.185671 MaxPower - 1.04735 (Ultimate, ratio = 10.50, Dmg, Magic, SingleTarget, DOT, 4s duration, 1s tick, R2 = 0.999997)",
    "<<3>> = 5 seconds (Constant)",
    "<<4>> = Minor Vulnerability (Constant)",
    "<<5>> = 10 seconds (Constant)",
    "<<6>> = 5% (Constant)",
  ],
} as const satisfies TemperSkill
