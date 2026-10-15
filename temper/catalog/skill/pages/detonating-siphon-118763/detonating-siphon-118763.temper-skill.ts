import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const detonatingSiphon118763 = {
  id: "019e6f53-a0c9-7249-9d92-af032ab3d14d",
  type: "page-type/temper-skill",
  slug: "detonating-siphon-118763",
  title: "Detonating Siphon",
  key: "detonating-siphon-118763",
  baseName: "Shocking Siphon",
  description:
    "Violently drain the last spark of life from a corpse, dealing |cffffff21510|r Disease Damage over |cffffff20|r seconds to all enemies around the corpse and between you and the corpse. You also gain Major Savagery and Prophecy for |cffffff20|r seconds, increasing your Weapon and Spell Critical rating by |cffffff2629|r.\n\nWhen the siphon ends the corpse explodes, dealing an additional |cffffff6611|r Disease Damage to all enemies nearby.\n\nWhile slotted, your damage done is increased by |cffffff3|r%.",
  icon: "/esoui/art/icons/ability_necromancer_005_b.dds",
  esoSkillId: 118763,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/active",
  hashPlace: 363,
  createdAt: "2026-05-28T16:03:32.169Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.009182 MaxStat + 0.096413 MaxPower (Ultimate, ratio = 10.50, Dmg, Disease, AOE, DOT, 19.333s duration, 0.666s tick, R2 = 1)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = Major Savagery (Constant)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = 12% (Constant)",
    "<<6>> = 0.077475 MaxStat + 0.813488 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Disease, AOE, Direct, Melee, R2 = 1)",
    "<<7>> = 3% (Constant)",
  ],
} as const satisfies TemperSkill
