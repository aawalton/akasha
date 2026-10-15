import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const spitewardOfTheLucidMind185901 = {
  id: "019e6f53-a7a5-7cf5-9497-fb5f5ba78eb9",
  type: "page-type/temper-skill",
  slug: "spiteward-of-the-lucid-mind-185901",
  title: "Spiteward of the Lucid Mind",
  key: "spiteward-of-the-lucid-mind-185901",
  baseName: "Runespite Ward",
  description:
    "Like the rune knights of old, summon a shield that absorbs |cffffff6802|r damage for |cffffff6|r seconds, scaling off your Max Health.\n\nThe first time you take direct damage, the shield retaliates and deals |cffffff1951|r Magic Damage to the attacker, scaling off your Armor.\n\nConsume Crux to heal yourself |cffffff2010|r Health, scaling off your Max Health, and refund |cffffff30|r% of Spiteward of the Lucid Mind cost per Crux spent.",
  icon: "/esoui/art/icons/ability_arcanist_008_a.dds",
  esoSkillId: 185901,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/active",
  hashPlace: 1261,
  createdAt: "2026-05-28T16:03:33.925Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.3 Health (Health, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 6 seconds (Constant)",
    "<<3>> = 0.16267 MaxResist - 0.49712 (Max Resistance, SingleTarget, Direct, R2 = 1)",
    "<<4>> = 0.1 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
    "<<5>> = 21% of Spiteward (Constant)",
    "<<6>> = the Lucid Mind (Constant)",
  ],
} as const satisfies TemperSkill
