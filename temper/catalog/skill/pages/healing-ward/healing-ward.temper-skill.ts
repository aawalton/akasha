import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const healingWard = {
  id: "019e6226-00f9-73cf-9ad0-e90f3fd3d1a1",
  type: "page-type/temper-skill",
  slug: "healing-ward",
  title: "Healing Ward",
  key: "healing-ward",
  baseName: "Steadfast Ward",
  description:
    "Call on your staff's strength to protect you or the lowest health ally around you with a damage shield that absorbs 2399 damage.\n\nThe shield's strength is increased by up to 100%, depending on the severity of the target's wounds. \n\nWhile the shield persists, the target is healed for 33% of the shield's remaining strength every second.",
  icon: "/esoui/art/icons/ability_restorationstaff_001_a.dds",
  esoSkillId: 41320,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 611,
  createdAt: "2026-05-26T02:38:38.329Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1067089 MaxStat + 1.12044345 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 100 (Constant)",
    "<<3>> = 33 (Constant)",
  ],
} as const satisfies TemperSkill
