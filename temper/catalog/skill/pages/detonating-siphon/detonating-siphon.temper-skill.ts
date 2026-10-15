import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const detonatingSiphon = {
  id: "019e6245-a652-7c31-8c2f-031fe3e58169",
  type: "page-type/temper-skill",
  slug: "detonating-siphon",
  title: "Detonating Siphon",
  key: "detonating-siphon",
  baseName: "Shocking Siphon",
  description:
    "Violently drain the last spark of life from a corpse, dealing 6180 Disease Damage over 20 seconds to all enemies around the corpse and between you and the corpse. You also gain Major Savagery and Prophecy for 20 seconds, increasing your Weapon and Spell Critical rating by 2629.\n\nWhen the siphon ends the corpse explodes, dealing an additional 1799 Disease Damage to all enemies nearby.\n\nWhile slotted, your damage done is increased by 3%.",
  icon: "/esoui/art/icons/ability_necromancer_005_b.dds",
  esoSkillId: 40118763,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "temper-skill-line/necromancer-grave-lord",
  skillType: "temper-skill-type/active",
  effects: "jsonl",
  hashPlace: 362,
  createdAt: "2026-05-26T03:13:12.274Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.009182 MaxStat + 0.096413 MaxPower (Ultimate, ratio = 10.50, Dmg, Disease, AOE, DOT, 19.333s duration, 0.666s tick, R2 = 1)",
    "<<2>> = 20 seconds (Constant)",
    "<<3>> = Major Savagery (Constant)",
    "<<4>> = 20 seconds (Constant)",
    "<<5>> = 12% (Constant)",
    "<<6>> = 0.080031675 MaxStat + 0.840333104 MaxPower (Ultimate, ratio = 10.50, RankMod(1.033), Dmg, Disease, AOE, Direct, Melee, R2 = 1)",
    "<<7>> = 3% (Constant)",
  ],
} as const satisfies TemperSkill
