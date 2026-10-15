import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const wallOfElements = {
  id: "019e6f53-a9d2-763a-98d1-71646bafa204",
  type: "page-type/temper-skill",
  slug: "wall-of-elements",
  title: "Wall of Elements",
  key: "wall-of-elements",
  baseName: "Wall of Elements",
  description:
    "Slam your staff down to create an elemental barrier in front of you, dealing |cffffff977|r Magic Damage to enemies in the target area every |cffffff1|r second.\n\nWall of Fire deals additional damage to Burning enemies.\n\nWall of Frost costs more, but snares and reduces armor against Chilled enemies and grants damage shields.\n\nWall of Storms sets Concussed enemies Off Balance.",
  icon: "/esoui/art/icons/ability_destructionstaff_002.dds",
  esoSkillId: 28858,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "temper-skill-line/weapon-destruction-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 1606,
  createdAt: "2026-05-28T16:03:34.482Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.012121 MaxStat + 0.127273 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, DOT, 10s duration, 1s tick, R2 = 1)",
    "<<2>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
