import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const crystalFragments46324 = {
  id: "019e6f53-a048-7e2a-8594-ab2ebbe8b350",
  type: "page-type/temper-skill",
  slug: "crystal-fragments-46324",
  title: "Crystal Fragments",
  key: "crystal-fragments-46324",
  baseName: "Crystal Shard",
  description:
    "Conjure dark crystals to bombard an enemy, dealing |cffffff8635|r Magic Damage. Your next non-Ultimate ability cast within |cffffff3|r seconds costs |cffffff10|r% less.\n\nWhile slotted on either bar, casting a non-Ultimate ability has a |cffffff33|r% chance of causing your next Crystal Fragments to be instant cast at half cost, dealing |cffffff14335|r Magic Damage.",
  icon: "/esoui/art/icons/ability_sorcerer_thunderstomp.dds",
  esoSkillId: 46324,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 274,
  createdAt: "2026-05-28T16:03:32.040Z",
  updatedAt: "2026-10-21T05:44:15.210Z",
  equations: [
    "<<1>> = 0.11043513 MaxStat + 1.1595689 MaxPower (Ultimate, RankMod(1), Dmg, Magic, SingleTarget, Direct, 0.8s cooldown)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = 10% (Constant)",
    "<<5>> = 33% (Constant)",
    "<<4>> = 0.17748 MaxStat + 1.86354 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, R2 = 1)",
  ],
  variants: [
    {
      esoSkillId: 114716,
      equations: [
        "<<1>> = 0.17748 MaxStat + 1.86354 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, R2 = 1)",
        "<<2>> = 3 seconds (Constant)",
        "<<3>> = 10% (Constant)",
      ],
    },
  ],
} as const satisfies TemperSkill
