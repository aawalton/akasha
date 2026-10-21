import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const swarmingScion38932 = {
  id: "019e6f53-a806-79d7-a6c6-bc8f46ebe548",
  type: "page-type/temper-skill",
  slug: "swarming-scion-38932",
  title: "Swarming Scion",
  key: "swarming-scion-38932",
  baseName: "Blood Scion",
  description:
    "Transform into a monstrous creature of the night, instantly healing to full Health.\n\nWhile transformed, your Max Health, Magicka, and Stamina are increased by |cffffff10000|r, you heal for |cffffff15|r% of all damage you deal, and you can see enemies through walls. \n\nBats also swarm around you and shred enemies that come close, dealing |cffffff3028|r Magic Damage every |cffffff1|r second.",
  icon: "/esoui/art/icons/ability_u26_vampire_06_a.dds",
  esoSkillId: 38932,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 5,
  morphIndex: 1,
  rank: 5,
  skillLineId: "temper-skill-line/world-vampire",
  skillType: "temper-skill-type/ultimate",
  hashPlace: 1315,
  createdAt: "2026-05-28T16:03:34.022Z",
  updatedAt: "2026-10-21T15:59:41.296Z",
  equations: [
    "<<1>> = 10000 (Constant)",
    "<<2>> = 15% (Constant)",
    "<<3>> = 0.0375 MaxStat + 0.39375 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, AOE, DOT, 1s tick, R2 = 1, rank IV)",
    "<<4>> = 1 second (Constant)",
  ],
} as const satisfies TemperSkill
