import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ravenousGoliath118279 = {
  id: "019e6f53-a5b4-708f-9372-d00748f0c5c5",
  type: "page-type/temper-skill",
  slug: "ravenous-goliath-118279",
  title: "Ravenous Goliath",
  key: "ravenous-goliath-118279",
  baseName: "Bone Goliath Transformation",
  description:
    "Become a horrific Ravenous Goliath, increasing your Max Health by |cffffff30000|r for |cffffff20|r seconds and immediately restoring |cffffff30000|r Health. \n\nWhile transformed, your damaging Light Attacks restore |cffffff402|r Health and your fully-charged Heavy Attacks restore |cffffff1005|r Health. You deal |cffffff1078|r Magic Damage to nearby enemies every second and heal for that amount. These abilities scale off your Max Health.",
  icon: "/esoui/art/icons/ability_necromancer_012_b.dds",
  esoSkillId: 118279,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/necromancer-bone-tyrant",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 986,
  createdAt: "2026-05-28T16:03:33.428Z",
  updatedAt: "2026-10-21T06:27:53.152Z",
  equations: [
    "<<1>> = Ravenous Goliath (Constant)",
    "<<2>> = 30000 (Constant)",
    "<<3>> = 20 seconds (Constant)",
    "<<2>> = 30000 (Constant, Repeat)",
    "<<4>> = 0.019995344 Health (Health, Heal, SingleTarget, Direct)",
    "<<5>> = 0.0499945 Health (Health, Heal, SingleTarget, Direct)",
    "<<6>> = 0.05 Health (Health, RankMod(1), Dmg, Magic, AOE, DOT, 1s tick, R2 = 1)",
  ],
} as const satisfies TemperSkill
