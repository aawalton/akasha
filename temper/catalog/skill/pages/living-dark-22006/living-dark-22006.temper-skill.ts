import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const livingDark22006 = {
  id: "019e6f53-a410-7169-8c91-a809e0cb1f2f",
  type: "page-type/temper-skill",
  slug: "living-dark-22006",
  title: "Living Dark",
  key: "living-dark-22006",
  baseName: "Eclipse",
  description:
    "Envelop yourself in a lightless sphere for |cffffff10|r seconds to protect yourself. Anytime you take direct damage, the sphere lashes back at the attacker, reducing their Movement Speed by |cffffff40|r% for |cffffff3|r seconds and healing you for |cffffff2107|r Health. These effects can occur once every half second.",
  icon: "/esoui/art/icons/ability_templar_unstable_core.dds",
  esoSkillId: 22006,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/active",
  hashPlace: 761,
  createdAt: "2026-05-28T16:03:33.008Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 10 seconds (Constant)",
    "<<2>> = 40% (Constant)",
    "<<3>> = 3 seconds (Constant)",
    "<<4>> = 2000 (Constant)",
  ],
} as const satisfies TemperSkill
