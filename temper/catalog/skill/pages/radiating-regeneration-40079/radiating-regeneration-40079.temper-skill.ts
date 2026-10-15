import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const radiatingRegeneration40079 = {
  id: "019e6f53-a594-7095-8189-a3b326b3b8f9",
  type: "page-type/temper-skill",
  slug: "radiating-regeneration-40079",
  title: "Radiating Regeneration",
  key: "radiating-regeneration-40079",
  baseName: "Regeneration",
  description:
    "Share your staff's life-giving energy, healing you or up to |cffffff3|r nearby allies for |cffffff11316|r over |cffffff10|r seconds.",
  icon: "/esoui/art/icons/ability_restorationstaff_002a.dds",
  esoSkillId: 40079,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 969,
  createdAt: "2026-05-28T16:03:33.396Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.025825 MaxStat + 0.271163 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, DOT, 10s duration, 2s tick, R2 = 1)",
    "<<2>> = 10 seconds (Constant)",
  ],
} as const satisfies TemperSkill
