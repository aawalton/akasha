import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const crystalShard = {
  id: "019e6f53-a04a-7044-a482-9164ccd44a57",
  type: "page-type/temper-skill",
  slug: "crystal-shard",
  title: "Crystal Shard",
  key: "crystal-shard",
  baseName: "Crystal Shard",
  description:
    "Conjure dark crystals to bombard an enemy, dealing |cffffff8359|r Magic Damage. Your next non-Ultimate ability cast within |cffffff3|r seconds costs |cffffff10|r% less.",
  icon: "/esoui/art/icons/ability_sorcerer_thunderclap.dds",
  esoSkillId: 43714,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "temper-skill-line/sorcerer-dark-magic",
  skillType: "temper-skill-type/active",
  hashPlace: 275,
  createdAt: "2026-05-28T16:03:32.042Z",
  updatedAt: "2026-10-21T05:07:57.689Z",
  equations: [
    "<<1>> = 0.10690255 MaxStat + 1.1224768 MaxPower (Ultimate, RankMod(1), Dmg, Magic, SingleTarget, Direct, 0.8s cooldown)",
    "<<2>> = 3 seconds (Constant)",
    "<<3>> = 10% (Constant)",
  ],
} as const satisfies TemperSkill
