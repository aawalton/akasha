import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const rapidRegeneration = {
  id: "019e6226-010a-7b8e-9236-42d4c2df11ad",
  type: "page-type/temper-skill",
  slug: "rapid-regeneration",
  title: "Rapid Regeneration",
  key: "rapid-regeneration",
  baseName: "Regeneration",
  description:
    "Share your staff's life-giving energy, healing you or a nearby ally for 3594 Health over 5 seconds.\n\nThe healing increases by up to 50% more on targets under 100% Health.",
  icon: "/esoui/art/icons/ability_restorationstaff_002b.dds",
  esoSkillId: 41276,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 979,
  createdAt: "2026-05-26T02:38:38.346Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.026677225 MaxStat + 0.280111379 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, DOT, 5s duration, 1s tick, R2 = 1)",
    "<<2>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
