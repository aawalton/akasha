import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const radiatingRegeneration = {
  id: "019e6226-0107-756d-ad7c-60b34ff02ea8",
  type: "page-type/temper-skill",
  slug: "radiating-regeneration",
  title: "Radiating Regeneration",
  key: "radiating-regeneration",
  baseName: "Regeneration",
  description:
    "Share your staff's life-giving energy, healing you or up to 3 nearby allies for 3594 over 10 seconds.",
  icon: "/esoui/art/icons/ability_restorationstaff_002a.dds",
  esoSkillId: 41288,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 968,
  createdAt: "2026-05-26T02:38:38.343Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.026677225 MaxStat + 0.280111379 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Heal, SingleTarget, DOT, 10s duration, 2s tick, R2 = 1)",
    "<<2>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
