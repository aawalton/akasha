import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const purifyingLight21765 = {
  id: "019e6f53-a569-73cc-9836-519e6753da7c",
  type: "page-type/temper-skill",
  slug: "purifying-light-21765",
  title: "Purifying Light",
  key: "purifying-light-21765",
  baseName: "Backlash",
  description:
    "Summon an expanding beam of pure sunlight to doom an enemy, dealing |cffffff4038|r Magic Damage immediately and marking them for |cffffff6|r seconds.\n\nAfter the duration ends, the sunlight bursts, dealing |cffffff4469|r Magic Damage, which increases based on the amount of damage you dealt to them over the duration, up to |cffffff200|r%. Also heals you and nearby allies in the area for |cffffff1886|r Health every |cffffff2|r seconds, over |cffffff10|r seconds.\n\nYou can have only one Purifying Light at a time.",
  icon: "/esoui/art/icons/ability_templar_purifying_light.dds",
  esoSkillId: 21765,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "temper-skill-line/templar-dawns-wrath",
  skillType: "temper-skill-type/active",
  hashPlace: 948,
  createdAt: "2026-05-28T16:03:33.353Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.051612 MaxStat + 0.542543 MaxPower - 0.879855 (Ultimate, ratio = 10.51, Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 6 seconds (Constant)",
    "<<3>> = 0.0571312 MaxStat + 0.600358 MaxPower - 1.05682 (Ultimate, ratio = 10.51, Dmg, Magic, SingleTarget, Direct, R2 = 0.999999)",
    "<<4>> = 200% (Constant)",
    "<<5>> = 0.025825 MaxStat + 0.271163 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Heal, AOE, Direct, 2s tick, R2 = 1)",
    "<<6>> = 2 seconds (Constant)",
    "<<7>> = 10 seconds (Constant)",
    "<<8>> = Purifying Light (Constant)",
  ],
} as const satisfies TemperSkill
