import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const wardAlly = {
  id: "019e6226-011f-79cd-95e8-738cdbc813d2",
  type: "page-type/temper-skill",
  slug: "ward-ally",
  title: "Ward Ally",
  key: "ward-ally",
  baseName: "Steadfast Ward",
  description:
    "Call on your staff's strength to protect you and the lowest health ally around you with a damage shield that absorbs 2323 damage.\n\nThe shield's strength is increased by up to 100%, depending on the severity of the target's wounds.",
  icon: "/esoui/art/icons/ability_restorationstaff_001_b.dds",
  esoSkillId: 41302,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 1608,
  createdAt: "2026-05-26T02:38:38.367Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1033 MaxStat + 1.08465 MaxPower (Ultimate, ratio = 10.50, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 100 (Constant)",
  ],
} as const satisfies TemperSkill
