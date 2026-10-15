import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const healingWard40126 = {
  id: "019e6f53-a2ef-7d64-a80e-b7579614d1e0",
  type: "page-type/temper-skill",
  slug: "healing-ward-40126",
  title: "Healing Ward",
  key: "healing-ward-40126",
  baseName: "Steadfast Ward",
  description:
    "Call on your staff's strength to protect you or the lowest health ally around you with a damage shield that absorbs |cffffff8508|r damage.\n\nThe shield's strength is increased by up to |cffffff100|r%, depending on the severity of the target's wounds. \n\nWhile the shield persists, the target is healed for |cffffff34|r% of the shield's remaining strength every second.",
  icon: "/esoui/art/icons/ability_restorationstaff_001_a.dds",
  esoSkillId: 40126,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 20,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 612,
  createdAt: "2026-05-28T16:03:32.719Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.1033 MaxStat + 1.08465 MaxPower (Ultimate, ratio = 10.50, RankMod(1), DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 100 (Constant)",
    "<<3>> = 33 (Constant)",
  ],
} as const satisfies TemperSkill
