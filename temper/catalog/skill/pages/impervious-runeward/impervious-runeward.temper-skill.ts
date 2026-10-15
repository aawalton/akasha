import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const imperviousRuneward = {
  id: "019e6245-a6b0-74ad-a17b-03dd6782ba35",
  type: "page-type/temper-skill",
  slug: "impervious-runeward",
  title: "Impervious Runeward",
  key: "impervious-runeward",
  baseName: "Runespite Ward",
  description:
    "Like the rune knights of old, summon a shield that absorbs 9916 damage for 1 second, and then 2203 damage for 5 seconds if the first shield persists. Both shields scale off your Max Health.\n\nThe first time you take direct damage, the shield retaliates and deals 0 Magic Damage to the attacker, scaling off your Armor.\n\nConsume Crux to heal yourself for 1600 Health, scaling off your Max Health, per Crux spent.",
  icon: "/esoui/art/icons/ability_arcanist_008_b.dds",
  esoSkillId: 40183241,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/arcanist-soldier-of-apocrypha",
  skillType: "temper-skill-type/active",
  hashPlace: 670,
  createdAt: "2026-05-26T03:13:12.368Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.6198 Health (Health, RankMod(1.033), DmgShield, SingleTarget, Direct, 1s duration, R2 = 1)",
    "<<2>> = 1 second (Constant)",
    "<<3>> = 0.13772989 Health (Health, RankMod(1.033), DmgShield, SingleTarget, Direct, 5s duration, R2 = 1)",
    "<<4>> = 5 seconds (Constant)",
    "<<5>> = 0.16267 MaxResist - 0.49712 (Max Resistance, SingleTarget, Direct, R2 = 1)",
    "<<6>> = 0.1 Health (Health, Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
