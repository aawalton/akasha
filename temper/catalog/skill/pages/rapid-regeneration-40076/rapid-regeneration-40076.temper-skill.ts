import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const rapidRegeneration40076 = {
  id: "019e6f53-a5a9-726e-8963-b21385044e8a",
  type: "page-type/temper-skill",
  slug: "rapid-regeneration-40076",
  title: "Rapid Regeneration",
  key: "rapid-regeneration-40076",
  baseName: "Regeneration",
  description:
    "Share your staff's life-giving energy, healing you or a nearby ally for |cffffff11316|r Health over |cffffff5|r seconds.\n\nThe healing increases by up to |cffffff50|r% more on targets under |cffffff100|r% Health.",
  icon: "/esoui/art/icons/ability_restorationstaff_002b.dds",
  esoSkillId: 40076,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/weapon-restoration-staff",
  skillType: "temper-skill-type/active",
  hashPlace: 980,
  createdAt: "2026-05-28T16:03:33.417Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.025825 MaxStat + 0.271163 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, SingleTarget, DOT, 5s duration, 1s tick, R2 = 1)",
    "<<2>> = 5 seconds (Constant)",
  ],
} as const satisfies TemperSkill
